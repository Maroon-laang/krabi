// Admin API for the orders panel.
// Protected by ADMIN_PASSWORD (sent as the "x-admin-key" header).
// GET  -> list orders (newest first)
// POST -> { action: 'status', id, status } | { action: 'delete', id }

import { redis, redisConfigured } from '../lib/redis.mjs';

export default async function handler(req, res) {
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminPass) {
        return res.status(500).json({ ok: false, error: 'Admin not configured (set ADMIN_PASSWORD)' });
    }

    const key = req.headers['x-admin-key'] || (req.query && req.query.key);
    if (!key || key !== adminPass) {
        return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    if (!redisConfigured()) {
        return res.status(500).json({ ok: false, error: 'Storage not configured' });
    }

    try {
        if (req.method === 'GET') {
            const ids = await redis(['ZREVRANGE', 'orders', '0', '199']);
            if (!ids || ids.length === 0) {
                return res.status(200).json({ ok: true, orders: [] });
            }
            const vals = await redis(['MGET', ...ids.map((id) => `order:${id}`)]);
            const orders = (vals || [])
                .filter(Boolean)
                .map((v) => {
                    try { return JSON.parse(v); } catch { return null; }
                })
                .filter(Boolean);
            return res.status(200).json({ ok: true, orders });
        }

        if (req.method === 'POST') {
            let body = req.body;
            if (typeof body === 'string') {
                try { body = JSON.parse(body); } catch { body = {}; }
            }
            const { action, id, status } = body || {};
            if (!id) return res.status(400).json({ ok: false, error: 'Missing id' });

            if (action === 'delete') {
                await redis(['DEL', `order:${id}`]);
                await redis(['ZREM', 'orders', id]);
                return res.status(200).json({ ok: true });
            }

            if (action === 'status') {
                const raw = await redis(['GET', `order:${id}`]);
                if (!raw) return res.status(404).json({ ok: false, error: 'Order not found' });
                const rec = JSON.parse(raw);
                rec.status = status === 'handled' ? 'handled' : 'new';
                await redis(['SET', `order:${id}`, JSON.stringify(rec)]);
                return res.status(200).json({ ok: true });
            }

            return res.status(400).json({ ok: false, error: 'Unknown action' });
        }

        res.setHeader('Allow', 'GET, POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    } catch (e) {
        console.error('orders API error:', e);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
}
