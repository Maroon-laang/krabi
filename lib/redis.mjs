// Minimal Upstash Redis REST client (no dependencies).
// Reads connection from env vars injected by the Vercel storage integration.
// Supports both the "KV_*" names and the "UPSTASH_*" names.

function cfg() {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    return { url, token };
}

export function redisConfigured() {
    const { url, token } = cfg();
    return Boolean(url && token);
}

// Run a single Redis command, e.g. redis(['SET', 'key', 'value'])
export async function redis(command) {
    const { url, token } = cfg();
    if (!url || !token) throw new Error('Redis not configured');

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.result;
}
