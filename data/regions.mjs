// Region catalog config for the Telegram shop bot.
// Add a new region by copying the "krabi" block and editing it.
// Each product price is per-region. Images are served from the site: /images/<img>.

export const SITE_URL = 'https://www.vapebaza.com';

export const regions = {
    krabi: {
        id: 'krabi',
        name: { en: 'Krabi', ru: 'Краби' },
        currency: 'THB',
        delivery: 300,
        hours: '12:00 – 00:00',
        // Where orders from this region are sent (Telegram chat id of the operator):
        operatorChatId: '1697831219',
        products: [
            { id: 1, img: 'blue-ice.jpg', price: 1400, name: { en: 'Blue Ice', ru: 'Личи' }, desc: { en: 'Crisp lychee with a freezing menthol finish.', ru: 'Освежающий ледяной личи с мягким ментоловым финишем.' } },
            { id: 2, img: 'menthol-blast.jpg', price: 1400, name: { en: 'Menthol Blast', ru: 'Ментоловый леденец' }, desc: { en: 'Powerful burst of mint and icy freshness.', ru: 'Мощный взрыв мяты и ледяной свежести.' } },
            { id: 3, img: 'yellow-mint.jpg', price: 1400, name: { en: 'Yellow Mint', ru: 'Мята' }, desc: { en: 'Classic green mint with bright citrus notes.', ru: 'Классическая зелёная мята с цитрусовыми нотками.' } },
            { id: 4, img: 'grape.jpg', price: 1400, name: { en: 'Grape', ru: 'Виноград' }, desc: { en: 'Rich, juicy taste of ripe purple grapes.', ru: 'Насыщенный вкус спелого фиолетового винограда.' } },
            { id: 5, img: 'kyoho-grape.jpg', price: 1400, name: { en: 'Kyoho Grape', ru: 'Зелёный виноград' }, desc: { en: 'Sweet and aromatic Kyoho grape.', ru: 'Сладкий японский виноград Кёхо.' } },
            { id: 6, img: 'watermelon.jpg', price: 1400, name: { en: 'Watermelon', ru: 'Арбуз' }, desc: { en: 'Ripe, sweet watermelon with perfect freshness.', ru: 'Спелый сладкий арбуз.' } },
            { id: 7, img: 'watermelon-mint.jpg', price: 1400, name: { en: 'Watermelon Mint', ru: 'Арбуз с мятой' }, desc: { en: 'Juicy watermelon with cool minty aftertaste.', ru: 'Сочный арбуз с мятным послевкусием.' } },
            { id: 8, img: 'strawberry-kiwi.jpg', price: 1400, name: { en: 'Strawberry Kiwi', ru: 'Клубника-киви' }, desc: { en: 'Sweet strawberry with exotic kiwi notes.', ru: 'Сладкая клубника с киви.' } },
            { id: 9, img: 'cola.jpg', price: 1400, name: { en: 'Cola', ru: 'Кола' }, desc: { en: 'Classic fizzy cola with refreshing ice.', ru: 'Классическая кола со льдом.' } },
            { id: 10, img: 'pink-berry.jpg', price: 1400, name: { en: 'Pink Berry', ru: 'Розовые ягоды' }, desc: { en: 'Delicate berry mix with pink grape taste.', ru: 'Нежный ягодный микс.' } },
            { id: 11, img: 'all-berry.jpg', price: 1400, name: { en: 'All Berry', ru: 'Ассорти ягод' }, desc: { en: 'Explosive mix of forest berries.', ru: 'Взрывной микс лесных ягод.' } },
        ],
    },

    // --- Add more regions below (copy the block above) ---
    // phuket: { id: 'phuket', name: { en: 'Phuket', ru: 'Пхукет' }, currency: 'THB', delivery: 300, hours: '12:00 – 00:00', operatorChatId: '...', products: [ ... ] },
};

export function regionList() {
    return Object.values(regions);
}

export function getRegion(id) {
    return regions[id] || null;
}

export function getProduct(regionId, productId) {
    const r = getRegion(regionId);
    if (!r) return null;
    return r.products.find((p) => String(p.id) === String(productId)) || null;
}
