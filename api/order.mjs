// Vercel serverless function: proxies orders to Telegram.
// The bot token never reaches the browser — it lives only in
// Vercel Environment Variables (BOT_TOKEN, CHAT_ID).
// If a storage integration is connected, orders are also saved for the admin panel.

import { redis, redisConfigured } from '../lib/redis.mjs';

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

    // Save to storage for the admin panel (best-effort — never blocks the order).
    await saveOrder(order).catch((err) => console.error('saveOrder failed:', err));

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
            return res.status(502).json({ ok: false, error: 'Telegram rejected the message' });
        }
        return res.status(200).json({ ok: true });
    } catch (e) {
        console.error('Proxy error:', e);
        return res.status(502).json({ ok: false, error: 'Upstream request failed' });
    }
}

async function saveOrder(o) {
    if (!redisConfigured()) return;
    const ts = Date.now();
    const id = `${ts}-${Math.random().toString(36).slice(2, 7)}`;
    const record = {
        id,
        ts,
        name: String(o.name || ''),
        contact: String(o.contact || ''),
        contactLabel: String(o.contactLabel || ''),
        address: String(o.address || ''),
        payment: String(o.payment || ''),
        comment: String(o.comment || ''),
        items: Array.isArray(o.items) ? o.items : [],
        total: Number(o.total) || 0,
        status: 'new',
    };
    await redis(['SET', `order:${id}`, JSON.stringify(record)]);
    await redis(['ZADD', 'orders', String(ts), id]);
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
