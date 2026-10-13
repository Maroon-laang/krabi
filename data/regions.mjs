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
            relx: { name: { en: 'RELX SMASH GO 12000' } },
            raya: { name: { en: 'ELFBAR RAYA S1 15000' } },
            nexbar: { name: { en: 'WOTOFO NEXBAR 18000' } },
            iceking: { name: { en: 'ELFBAR ICE KING 40000' } },
            novo14k: { name: { en: 'RELX NOVO14K 14000' } },
            infy: { name: { en: 'INFY 20000' } },
            lumi3: { name: { en: 'RELX Lumi 18000 · NIC 3%' } },
            lumi5: { name: { en: 'RELX Lumi 18000 · NIC 5%' } },
            marbo: { name: { en: 'Marbo Bar 10K', ru: 'Marbo Bar 10K' } },
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
            { id: 9, group: 'relx', price: 1200, name: { en: 'Watermelon' }, imgUrl: 'https://static.tildacdn.one/stor6631-6234-4266-b230-663861336161/74409f70e8683660b02139bc5d7e574d.png' },
            { id: 10, group: 'relx', price: 1200, name: { en: 'Double mint' }, imgUrl: 'https://static.tildacdn.one/stor6538-3365-4332-a431-316434393361/99eb57c3ed70ce5d84f4a9227305aaab.png' },
            { id: 11, group: 'relx', price: 1200, name: { en: 'Peach strawberry' }, imgUrl: 'https://static.tildacdn.one/stor3239-3538-4966-b636-373261393939/0b4a2d99d60cd0388b558aeaa4ea5f76.png' },
            { id: 12, group: 'relx', price: 1200, name: { en: 'Green mango' }, imgUrl: 'https://static.tildacdn.one/stor6631-6365-4138-b463-356365376630/f15e1c77a62dbeaf2a327ab508c7b90b.png' },
            { id: 13, group: 'relx', price: 1200, name: { en: 'Apple' }, imgUrl: 'https://static.tildacdn.one/stor6463-6337-4330-a638-313837393331/cffcfbb9c96d0a8a7fc12f3e4ed944a3.png' },
            { id: 14, group: 'relx', price: 1200, name: { en: 'Cola' }, imgUrl: 'https://static.tildacdn.one/stor3834-3466-4163-a638-376162353733/68bd017be3ab6a9ab37a1d882d69b645.png' },
            { id: 15, group: 'relx', price: 1200, name: { en: 'Grape' }, imgUrl: 'https://static.tildacdn.one/stor3034-6537-4166-a166-366164383265/2d8407254d0d44000a530ebf46ccb366.png' },
            { id: 16, group: 'relx', price: 1200, name: { en: 'Tobacco' }, imgUrl: 'https://static.tildacdn.one/stor3735-3435-4734-b761-306463396430/c1833f980589aa850912e615a934f8ca.png' },
            { id: 17, group: 'relx', price: 1200, name: { en: 'Mixberry' }, imgUrl: 'https://static.tildacdn.one/stor6234-3866-4137-b763-333830666532/006da3729ca224cbfa568dd3402b8846.png' },
            { id: 18, group: 'relx', price: 1200, name: { en: 'Pink Guava' }, imgUrl: 'https://static.tildacdn.one/stor3366-6231-4565-a464-653338383532/c109af037b5d418e6db9fd22856929da.png' },
            { id: 19, group: 'raya', price: 1300, name: { en: 'Strawberry ice' }, imgUrl: 'https://static.tildacdn.one/stor3064-3563-4633-a562-616663376266/8c33b3b46085bb9fe3ee65ec17db4980.png' },
            { id: 20, group: 'raya', price: 1300, name: { en: 'Blueberry ice' }, imgUrl: 'https://static.tildacdn.one/stor3964-3232-4836-b133-363234623930/bc9e58730ef3c12fe6e0c5ff98f31d6a.png' },
            { id: 21, group: 'raya', price: 1300, name: { en: 'Grape ice' }, imgUrl: 'https://static.tildacdn.one/stor6533-3935-4965-b831-396237396237/5219eee31c1dcc3901cc40d1200cb097.png' },
            { id: 22, group: 'raya', price: 1300, name: { en: 'Guava ice' }, imgUrl: 'https://static.tildacdn.one/stor6466-6332-4435-a164-323730363735/903ef2fcad750c8b93db2cc4cf398ebf.png' },
            { id: 23, group: 'raya', price: 1300, name: { en: 'Sakura Grape' }, imgUrl: 'https://static.tildacdn.one/stor6632-3334-4263-b539-323635646439/87ecdbff48136838f79378482c1144a3.png' },
            { id: 24, group: 'raya', price: 1300, name: { en: 'Super berries' }, imgUrl: 'https://static.tildacdn.one/stor6365-6232-4365-b162-613830613039/2cac99f9bbc352123c1307169e261a0a.png' },
            { id: 25, group: 'raya', price: 1300, name: { en: 'Aloe grape' }, imgUrl: 'https://static.tildacdn.one/stor3833-6239-4832-b736-336564313932/8fab1d3643a6c0b2ee2282082c251bde.png' },
            { id: 26, group: 'raya', price: 1300, name: { en: 'Grape jelly' }, imgUrl: 'https://static.tildacdn.one/stor3835-3530-4130-b137-383461643761/7774cb1accf1496aa75937694b8eb214.png' },
            { id: 27, group: 'raya', price: 1300, name: { en: 'Lychee funta' }, imgUrl: 'https://static.tildacdn.one/stor6336-3564-4163-b832-646335353534/28be58c6cbb92978931e7f572dbf574b.png' },
            { id: 28, group: 'raya', price: 1300, name: { en: 'Lemon tea' }, imgUrl: 'https://static.tildacdn.one/stor6639-3861-4663-b038-303334346630/e4b8e5b35982e5b93533f78881eb6662.png' },
            { id: 29, group: 'raya', price: 1300, name: { en: 'Green mango' }, imgUrl: 'https://static.tildacdn.one/stor6330-6665-4233-b632-383665343432/a78bbc2e1ccbc327c0862b82f7e2f16a.png' },
            { id: 30, group: 'nexbar', price: 1400, name: { en: 'Honeydew melon' }, imgUrl: 'https://static.tildacdn.one/stor6461-6231-4130-b961-336334643434/639a77abc5722570399c2c86f65471b0.png' },
            { id: 31, group: 'nexbar', price: 1400, name: { en: 'Lychee ice' }, imgUrl: 'https://static.tildacdn.one/stor6534-3239-4361-b465-643139343231/66f19bfb73d6854ee70579dbb23edce9.png' },
            { id: 32, group: 'nexbar', price: 1400, name: { en: 'Grape ice' }, imgUrl: 'https://static.tildacdn.one/stor6631-3733-4537-b635-393935376365/035b8351b6ca79d2625dc51a7b2e9742.png' },
            { id: 33, group: 'nexbar', price: 1400, name: { en: 'Cola ice' }, imgUrl: 'https://static.tildacdn.one/stor3164-3362-4364-a562-613238306461/b53dedefa332bffecfa4f9ca6217bea6.png' },
            { id: 34, group: 'nexbar', price: 1400, name: { en: 'Grape lychee' }, imgUrl: 'https://static.tildacdn.one/stor3431-6462-4536-b138-383861656435/6fcec17d8e8be16e816773af8658f03d.png' },
            { id: 35, group: 'nexbar', price: 1400, name: { en: 'Funta grape' }, imgUrl: 'https://static.tildacdn.one/stor6466-6363-4532-a136-313861356136/0f7c4533ac25e84afe8773f3cd6a6554.png' },
            { id: 36, group: 'nexbar', price: 1400, name: { en: 'Mineral' }, imgUrl: 'https://static.tildacdn.one/stor3663-3263-4664-a231-343266386139/0511dd03eef1a42dfc6657570f1e3230.png' },
            { id: 37, group: 'iceking', price: 1600, name: { en: 'Watermelon ice' }, imgUrl: 'https://static.tildacdn.one/stor3063-3261-4533-b263-306166626164/90ac5f1c023fc236e3f3a9ae0fb582cf.png' },
            { id: 38, group: 'iceking', price: 1600, name: { en: 'Green Grape Ice' }, imgUrl: 'https://static.tildacdn.one/stor3661-3464-4864-b839-376131346666/a504b1559a8c9eed33a0551d5318a78b.png' },
            { id: 39, group: 'iceking', price: 1600, name: { en: 'Cola Ice' }, imgUrl: 'https://static.tildacdn.one/stor6536-3663-4238-b739-306433653665/faa6327ef1b419ac8a485e23ad7e395a.png' },
            { id: 40, group: 'iceking', price: 1600, name: { en: 'Triple Mint' }, imgUrl: 'https://static.tildacdn.one/stor3832-3233-4630-b261-323564636666/ca96514583d55e7af716d1f27951c7d8.png' },
            { id: 41, group: 'iceking', price: 1600, name: { en: 'Mineral Water' }, imgUrl: 'https://static.tildacdn.one/stor6435-6335-4539-b565-396438393734/f6a26d374e4fa949c7402d5e69614ce1.png' },
            { id: 42, group: 'iceking', price: 1600, name: { en: 'Jasmine Tea' }, imgUrl: 'https://static.tildacdn.one/stor6262-3931-4234-b735-313365393861/2515dddec23e1b41f817ff5810a424ab.png' },

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
