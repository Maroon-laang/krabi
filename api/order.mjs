// Vercel serverless function: proxies orders to Telegram.
// The bot token never reaches the browser — it lives only in
// Vercel Environment Variables (BOT_TOKEN, CHAT_ID).

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const { BOT_TOKEN, CHAT_ID } = process.env;
    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    let order = req.body;
    if (typeof order === 'string') {
        try { order = JSON.parse(order); } catch { order = null; }
    }

    const text = buildMessage(order);
    if (!text) {
        return res.status(400).json({ ok: false, error: 'Empty or invalid order' });
    }

    try {
        const tgResp = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
            }
        );
        const data = await tgResp.json();
        if (!data.ok) {
            console.error('Telegram API error:', data.description);
            // TEMP DEBUG: surface Telegram's reason — remove after diagnosing
            return res.status(502).json({ ok: false, error: 'Telegram rejected the message', detail: data.description, code: data.error_code });
        }
        return res.status(200).json({ ok: true });
    } catch (e) {
        console.error('Proxy error:', e);
        return res.status(502).json({ ok: false, error: 'Upstream request failed' });
    }
}

function esc(s = '') {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildMessage(o) {
    if (!o || !Array.isArray(o.items) || o.items.length === 0) return null;

    const items = o.items
        .map((i) => `▪️ ${esc(i.name)} x${Number(i.qty) || 0} — ${Number(i.sum) || 0} THB`)
        .join('\n');

    const label = esc(o.contactLabel || 'Contact');

    return (
        `🔥 <b>New Vape Order (Krabi)</b> 🔥\n\n` +
        `👤 <b>Name:</b> ${esc(o.name)}\n` +
        `📱 <b>${label}:</b> ${esc(o.contact)}\n` +
        `📍 <b>Address:</b> ${esc(o.address)}\n` +
        `💳 <b>Payment:</b> ${esc(o.payment)}\n` +
        (o.comment ? `💬 <b>Comment:</b> ${esc(o.comment)}\n` : '') +
        `\n📦 <b>Order:</b>\n${items}\n\n` +
        `🚚 Delivery: 300 THB\n` +
        `💰 <b>Total: ${Number(o.total) || 0} THB</b>`
    );
}
