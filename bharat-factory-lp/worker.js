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

        if (env.SLACK_WEBHOOK_URL) {
          const fields = Object.entries(lead)
            .filter(([k]) => !['ua', 'ip'].includes(k))
            .map(([k, v]) => `*${k}:* ${v}`)
            .join('\n');
          const slackPayload = {
            text: `:factory: New Bharat AI Factory lead`,
            blocks: [
              { type: 'header', text: { type: 'plain_text', text: 'New lead — bharataifactory.com' } },
              { type: 'section', text: { type: 'mrkdwn', text: fields || '_(empty)_' } },
              { type: 'context', elements: [{ type: 'mrkdwn', text: `IP: ${lead.ip} · UA: ${lead.ua}` }] },
            ],
          };
          // fire-and-forget so we don't block the response on Slack latency
          const slackReq = fetch(env.SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackPayload),
          });
          ctx.waitUntil(slackReq);
        } else {
          console.log('LEAD (no SLACK_WEBHOOK_URL set):', JSON.stringify(lead));
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
