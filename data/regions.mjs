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

    phuket: {
        id: 'phuket',
        name: { en: 'Phuket', ru: 'Пхукет', de: 'Phuket', zh: '普吉岛' },
        currency: 'THB',
        delivery: 300,
        hours: '10:00 – 03:00',
        operatorChatId: '1697831219', // TODO: set Phuket operator's own chat id
        groups: {
            mbar: { name: { en: 'M BAR 9000' } },
            novo14k: { name: { en: 'RELX NOVO14K 14000' } },
            infy: { name: { en: 'INFY 20000' } },
            lumi3: { name: { en: 'RELX Lumi 18000 · NIC 3%' } },
            lumi5: { name: { en: 'RELX Lumi 18000 · NIC 5%' } },
            marbo: { name: { en: 'M Bar 10000', ru: 'M Bar 10000' } },
        },
        products: [
            { id: 1, group: 'mbar', price: 1100, name: { en: 'Peach strawberry' }, imgUrl: 'https://static.tildacdn.one/stor3333-3632-4766-b230-323865353438/ff918fbd95a1d23e02aa6493f53add6c.png' },
            { id: 2, group: 'mbar', price: 1100, name: { en: 'Apple aloe' }, imgUrl: 'https://static.tildacdn.one/stor3461-3466-4965-b837-333366376332/958f27ac4f6b2113fc8f2e7ccb2c4369.png' },
            { id: 3, group: 'mbar', price: 1100, name: { en: 'Orange sour' }, imgUrl: 'https://static.tildacdn.one/stor3635-6363-4630-a262-323463303033/8361943ad7f519fe95784a5f65f15699.png' },
            { id: 4, group: 'mbar', price: 1100, name: { en: 'Cola' }, imgUrl: 'https://static.tildacdn.one/stor3033-3934-4037-b361-326437336466/0dfae3fc1a616cf8c4ba96b1e7e5b1f8.png' },
            { id: 5, group: 'mbar', price: 1100, name: { en: 'Grape' }, imgUrl: 'https://static.tildacdn.one/stor3739-6336-4463-a332-343665613935/63b1c92771f30ab2cd20df7a40a1f962.png' },
            { id: 6, group: 'mbar', price: 1100, name: { en: 'Peach' }, imgUrl: 'https://static.tildacdn.one/stor3830-3739-4438-b930-303133343462/4d243e8ec0d11e938b67e1aae25caa29.png' },
            { id: 7, group: 'mbar', price: 1100, name: { en: 'Zapple' }, imgUrl: 'https://static.tildacdn.one/stor6464-3036-4635-b135-633138303835/af6861ca1921dab8f7ff798ad7bd92e6.png' },
            { id: 8, group: 'mbar', price: 1100, name: { en: 'Doblemint' }, imgUrl: 'https://static.tildacdn.one/stor6638-3264-4330-b031-633663623639/e976590ebbb7e59ced48049bb2c01502.png' },

            { id: 43, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Sea Salt Lemon' } },
            { id: 44, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Sour berry' } },
            { id: 45, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Cola' } },
            { id: 46, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Doublemint' } },
            { id: 47, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Spearmint' } },
            { id: 48, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Orange soda' } },
            { id: 49, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Pink Guava' } },
            { id: 50, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Grape' } },
            { id: 51, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Longjing ice-tea' } },
            { id: 52, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Sour Bubblegum' } },
            { id: 53, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Pinkberry' } },
            { id: 54, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Watermelon' } },
            { id: 55, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Watermelon lychee' } },
            { id: 56, group: 'novo14k', price: 1200, img: 'novo14k.jpg', name: { en: 'Apple' } },

            { id: 57, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Milk tea' } },
            { id: 58, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Matcha' } },
            { id: 59, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Strawberry banana' } },
            { id: 60, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Peach' } },
            { id: 61, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Yoyo Grape' } },
            { id: 62, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Kyoho Grape' } },
            { id: 63, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Watermelon Lychee' } },
            { id: 64, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Lychee' } },
            { id: 65, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Cola' } },
            { id: 66, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Strawberry kiwi' } },
            { id: 67, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Grape Aloe' } },
            { id: 68, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Blueberry' } },
            { id: 69, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Apple Aloe' } },
            { id: 70, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Sparkling Lemon' } },
            { id: 71, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Mint' } },
            { id: 72, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Mix Berry' } },
            { id: 73, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Mineral water' } },
            { id: 74, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Grape apple' } },
            { id: 75, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Watermelon bubblegum' } },
            { id: 76, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Menthol freeze' } },
            { id: 77, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Grape bubblegum' } },
            { id: 78, group: 'infy', price: 1300, img: 'infy.jpg', name: { en: 'Strawberry Watermelon' } },

            { id: 79, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Grape' } },
            { id: 80, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Watermelon' } },
            { id: 81, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Pink guava' } },
            { id: 82, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Jasmine green tea' } },
            { id: 83, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Cola' } },
            { id: 84, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Double Mint' } },
            { id: 85, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Mineral Water' } },
            { id: 86, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Grape Aloe' } },
            { id: 87, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Lychee' } },
            { id: 88, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Gummy' } },
            { id: 89, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Apple aloe' } },
            { id: 90, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Mix Berry' } },
            { id: 91, group: 'lumi3', price: 1400, img: 'lumi.jpg', name: { en: 'Sea salt lemon candy' } },

            { id: 92, group: 'lumi5', price: 1400, img: 'lumi.jpg', name: { en: 'Grape' } },
            { id: 93, group: 'lumi5', price: 1400, img: 'lumi.jpg', name: { en: 'Watermelon' } },
            { id: 94, group: 'lumi5', price: 1400, img: 'lumi.jpg', name: { en: 'Double Mint' } },

            { id: 95, group: 'marbo', price: 1200, img: 'blue-ice.jpg', name: { en: 'Blue Ice', ru: 'Личи' } },
            { id: 96, group: 'marbo', price: 1200, img: 'menthol-blast.jpg', name: { en: 'Menthol Blast', ru: 'Ментоловый леденец' } },
            { id: 97, group: 'marbo', price: 1200, img: 'yellow-mint.jpg', name: { en: 'Yellow Mint', ru: 'Мята' } },
            { id: 98, group: 'marbo', price: 1200, img: 'grape.jpg', name: { en: 'Grape', ru: 'Виноград' } },
            { id: 99, group: 'marbo', price: 1200, img: 'kyoho-grape.jpg', name: { en: 'Kyoho Grape', ru: 'Зелёный виноград' } },
            { id: 100, group: 'marbo', price: 1200, img: 'watermelon.jpg', name: { en: 'Watermelon', ru: 'Арбуз' } },
            { id: 101, group: 'marbo', price: 1200, img: 'watermelon-mint.jpg', name: { en: 'Watermelon Mint', ru: 'Арбуз с мятой' } },
            { id: 102, group: 'marbo', price: 1200, img: 'strawberry-kiwi.jpg', name: { en: 'Strawberry Kiwi', ru: 'Клубника-киви' } },
            { id: 103, group: 'marbo', price: 1200, img: 'cola.jpg', name: { en: 'Cola', ru: 'Кола' } },
            { id: 104, group: 'marbo', price: 1200, img: 'pink-berry.jpg', name: { en: 'Pink Berry', ru: 'Розовые ягоды' } },
            { id: 105, group: 'marbo', price: 1200, img: 'all-berry.jpg', name: { en: 'All Berry', ru: 'Ассорти ягод' } },
        ],
    },
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
