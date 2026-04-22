// Bharat AI Factory — lead capture worker
// Lead flow (fire-and-forget):
//   If env.SLACK_WEBHOOK_URL is set → POST to Slack incoming webhook
//   Else → console.warn (visible via `wrangler tail`)

function buildBlocks(lead) {
  const fields = Object.entries(lead)
    .filter(([k]) => !['ua', 'ip'].includes(k))
    .map(([k, v]) => `*${k}:* ${v}`)
    .join('\n');
  return [
    { type: 'header', text: { type: 'plain_text', text: 'New lead — bharataifactory.com' } },
    { type: 'section', text: { type: 'mrkdwn', text: fields || '_(empty)_' } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `IP: ${lead.ip} · UA: ${lead.ua}` }] },
  ];
}

async function postToSlackWebhook(url, text, blocks) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, blocks }),
  });
  const txt = await res.text().catch(() => '');
  if (!res.ok) console.error('Slack webhook failed:', res.status, txt.slice(0, 200));
  else console.log('Slack webhook OK:', res.status);
  return { ok: res.ok, http: res.status, body: txt.slice(0, 200) };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Diagnostic — GET /api/debug/slack reveals what env vars the Worker actually sees
    // (keys only, no secret values), tests the webhook, and posts a probe message.
    if (url.pathname === '/api/debug/slack' && request.method === 'GET') {
      const envKeys = Object.keys(env).sort();
      const webhook = env.SLACK_WEBHOOK_URL;
      const diag = {
        env_keys_visible_to_worker: envKeys,
        has_SLACK_WEBHOOK_URL: !!webhook,
        webhook_host: webhook ? new URL(webhook).host : null,
        webhook_prefix: webhook ? webhook.slice(0, 38) + '...' : null,
      };
      if (webhook) {
        diag.post_test = await postToSlackWebhook(
          webhook,
          ':white_check_mark: Debug probe from /api/debug/slack — if you see this, lead capture is wired correctly.',
          []
        );
      }
      return new Response(JSON.stringify(diag, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (url.pathname === '/api/lead' && request.method === 'POST') {
      try {
        const lead = await request.json();
        lead.ts = new Date().toISOString();
        lead.ip = request.headers.get('cf-connecting-ip') || '';
        lead.ua = request.headers.get('user-agent') || '';
        lead.referer = request.headers.get('referer') || '';

        const blocks = buildBlocks(lead);
        const summary = `:factory: New Bharat AI Factory lead`;

        // Always log the lead so we never lose one, even if Slack fails.
        console.log('LEAD:', JSON.stringify(lead));

        if (env.SLACK_WEBHOOK_URL) {
          ctx.waitUntil(postToSlackWebhook(env.SLACK_WEBHOOK_URL, summary, blocks));
        } else {
          console.warn('No SLACK_WEBHOOK_URL configured — lead only in console log');
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (e) {
        console.error('Lead endpoint error:', e.message, e.stack);
        return new Response(JSON.stringify({ ok: false, err: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
