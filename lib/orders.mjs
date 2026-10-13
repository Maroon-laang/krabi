// Shared order persistence for both the website form and the Telegram bot.
// Stores each order under order:<id> and indexes it in the sorted set "orders".

import { redis, redisConfigured } from './redis.mjs';

export async function saveOrder(o) {
    if (!redisConfigured()) return null;
    const ts = Date.now();
    const id = `${ts}-${Math.random().toString(36).slice(2, 7)}`;
    const record = {
        id,
        ts,
        source: o.source || 'site',
        region: o.region || '',
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
    return record;
}
