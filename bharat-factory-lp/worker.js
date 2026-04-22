// Bharat AI Factory — lead capture worker
// Lead flow (fire-and-forget):
//   1. If env.SLACK_BOT_TOKEN is set → post via chat.postMessage to SLACK_LEAD_CHANNEL (default C0AUBGC1USZ)
//   2. Else if env.SLACK_WEBHOOK_URL is set → post via incoming webhook
//   3. Else → console.log (visible via wrangler tail)

const DEFAULT_LEAD_CHANNEL = 'C0AUBGC1USZ';

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

async function postToSlackBot(env, text, blocks) {
  const channel = env.SLACK_LEAD_CHANNEL || DEFAULT_LEAD_CHANNEL;
  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ channel, text, blocks, unfurl_links: false, unfurl_media: false }),
  });
  const body = await res.json().catch(() => ({}));
  if (!body.ok) {
    console.error('Slack post failed:', JSON.stringify({ http: res.status, body, channel }));
  } else {
    console.log('Slack post OK:', body.ts, 'channel:', body.channel);
  }
  return { ok: body.ok, error: body.error, channel, http: res.status };
}

async function postToSlackWebhook(url, text, blocks) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, blocks }),
  });
  const ok = res.ok;
  const txt = await res.text().catch(() => '');
  if (!ok) console.error('Slack webhook failed:', res.status, txt.slice(0, 200));
  return { ok, http: res.status };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Debug endpoint — GET /api/debug/slack tests the Slack config without exposing secrets.
    // Safe to hit from anywhere: it returns whether token exists, its route, and Slack's response to a test post.
    if (url.pathname === '/api/debug/slack' && request.method === 'GET') {
      const diag = {
        has_SLACK_BOT_TOKEN: !!env.SLACK_BOT_TOKEN,
        has_SLACK_WEBHOOK_URL: !!env.SLACK_WEBHOOK_URL,
        SLACK_LEAD_CHANNEL: env.SLACK_LEAD_CHANNEL || DEFAULT_LEAD_CHANNEL,
        bot_token_prefix: env.SLACK_BOT_TOKEN ? env.SLACK_BOT_TOKEN.slice(0, 10) + '...' : null,
      };
      if (env.SLACK_BOT_TOKEN) {
        // Try auth.test to see if the token is even valid
        const auth = await fetch('https://slack.com/api/auth.test', {
          headers: { 'Authorization': `Bearer ${env.SLACK_BOT_TOKEN}` },
        }).then(r => r.json()).catch(e => ({ ok: false, error: String(e) }));
        diag.auth_test = auth;
        // Attempt a real post to confirm scope
        const test = await postToSlackBot(env, ':white_check_mark: Debug probe from /api/debug/slack — if you see this, lead capture is wired correctly.', []);
        diag.post_test = test;
      } else if (env.SLACK_WEBHOOK_URL) {
        const test = await postToSlackWebhook(env.SLACK_WEBHOOK_URL, ':white_check_mark: Debug probe (webhook path)', []);
        diag.post_test = test;
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

        if (env.SLACK_BOT_TOKEN) {
          // Await so errors surface in wrangler tail
          ctx.waitUntil(postToSlackBot(env, summary, blocks));
        } else if (env.SLACK_WEBHOOK_URL) {
          ctx.waitUntil(postToSlackWebhook(env.SLACK_WEBHOOK_URL, summary, blocks));
        } else {
          console.warn('No Slack transport configured — lead only in console log');
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
