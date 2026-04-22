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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/lead' && request.method === 'POST') {
      try {
        const lead = await request.json();
        lead.ts = new Date().toISOString();
        lead.ip = request.headers.get('cf-connecting-ip') || '';
        lead.ua = request.headers.get('user-agent') || '';
        lead.referer = request.headers.get('referer') || '';

        const blocks = buildBlocks(lead);
        const summary = `:factory: New Bharat AI Factory lead`;

        if (env.SLACK_BOT_TOKEN) {
          // Preferred path — chat.postMessage to explicit channel
          const channel = env.SLACK_LEAD_CHANNEL || DEFAULT_LEAD_CHANNEL;
          ctx.waitUntil(
            fetch('https://slack.com/api/chat.postMessage', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.SLACK_BOT_TOKEN}`,
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({ channel, text: summary, blocks, unfurl_links: false, unfurl_media: false }),
            })
          );
        } else if (env.SLACK_WEBHOOK_URL) {
          // Fallback — incoming webhook
          ctx.waitUntil(
            fetch(env.SLACK_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: summary, blocks }),
            })
          );
        } else {
          console.log('LEAD (no Slack configured):', JSON.stringify(lead));
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, err: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
