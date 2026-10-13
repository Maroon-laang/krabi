// Telegram shop bot (webhook). Multi-region, EN/RU.
// Env: CLIENT_BOT_TOKEN (bot token), BOT_WEBHOOK_SECRET (optional webhook secret),
//      storage vars (Upstash/KV) for per-user state and order saving.

import { redis, redisConfigured } from '../lib/redis.mjs';
import { saveOrder } from '../lib/orders.mjs';
import { regions, regionList, getRegion, getProduct, SITE_URL } from '../data/regions.mjs';

const TOKEN = process.env.CLIENT_BOT_TOKEN;
const API = TOKEN ? `https://api.telegram.org/bot${TOKEN}` : null;

const T = {
    en: {
        brand: '🛒 <b>Vapebaza</b> — vape delivery. 18+',
        chooseLang: '🌐 Please choose your language:',
        welcome: (r) => `Welcome! Region: <b>${r}</b>\nWhat would you like to do?`,
        chooseRegion: '📍 Choose your region:',
        menuCatalog: '🛍 Catalog',
        menuCart: '🛒 Cart',
        menuRegion: '📍 Change region',
        menuLang: '🌐 Language',
        catalogTitle: '🛍 <b>Choose a flavor:</b>',
        back: '⬅ Back',
        backCatalog: '⬅ Back to catalog',
        addToCart: '➕ Add to cart',
        added: 'Added to cart ✓',
        goToCart: '🛒 Go to cart',
        cartTitle: '🛒 <b>Your cart:</b>',
        emptyCart: '🛒 Your cart is empty.',
        remove: '🗑',
        delivery: 'Delivery',
        total: 'Total',
        checkout: '✅ Checkout',
        askName: '👤 Please enter your name:',
        askContactMethod: '📱 How should we contact you?',
        whatsapp: '📱 WhatsApp',
        telegram: '✈️ Telegram',
        askWhatsapp: '📱 Enter your WhatsApp number (with country code, e.g. +66...):',
        askTelegram: '✈️ Enter your Telegram @username:',
        askAddress: '📍 Enter your delivery address or a Google Maps link:',
        askPayment: '💳 Choose payment method:',
        cash: '💵 Cash', card: '💳 Card', crypto: '₿ Crypto',
        askComment: '💬 Add a comment (or press Skip):',
        skip: 'Skip ⏭',
        summaryTitle: '🧾 <b>Please confirm your order:</b>',
        name: 'Name', contact: 'Contact', address: 'Address', payment: 'Payment', comment: 'Comment', order: 'Order',
        confirm: '✅ Confirm order',
        cancel: '✖ Cancel',
        cancelled: 'Order cancelled. /start to begin again.',
        thanks: '✅ <b>Thank you!</b>\nYour order has been received. A manager will contact you shortly.',
        startOver: 'Use the menu below 👇',
        qty: 'Qty',
    },
    ru: {
        brand: '🛒 <b>Vapebaza</b> — доставка вейпов. 18+',
        chooseLang: '🌐 Выберите язык:',
        welcome: (r) => `Добро пожаловать! Регион: <b>${r}</b>\nЧто хотите сделать?`,
        chooseRegion: '📍 Выберите регион:',
        menuCatalog: '🛍 Каталог',
        menuCart: '🛒 Корзина',
        menuRegion: '📍 Сменить регион',
        menuLang: '🌐 Язык',
        catalogTitle: '🛍 <b>Выберите вкус:</b>',
        back: '⬅ Назад',
        backCatalog: '⬅ К каталогу',
        addToCart: '➕ В корзину',
        added: 'Добавлено ✓',
        goToCart: '🛒 Перейти в корзину',
        cartTitle: '🛒 <b>Ваша корзина:</b>',
        emptyCart: '🛒 Корзина пуста.',
        remove: '🗑',
        delivery: 'Доставка',
        total: 'Итого',
        checkout: '✅ Оформить заказ',
        askName: '👤 Введите ваше имя:',
        askContactMethod: '📱 Как с вами связаться?',
        whatsapp: '📱 WhatsApp',
        telegram: '✈️ Telegram',
        askWhatsapp: '📱 Введите номер WhatsApp (с кодом страны, напр. +66...):',
        askTelegram: '✈️ Введите ваш @username в Telegram:',
        askAddress: '📍 Введите адрес доставки или ссылку на точку в Google Maps:',
        askPayment: '💳 Выберите способ оплаты:',
        cash: '💵 Наличные', card: '💳 Карта', crypto: '₿ Крипто',
        askComment: '💬 Добавьте комментарий (или нажмите «Пропустить»):',
        skip: 'Пропустить ⏭',
        summaryTitle: '🧾 <b>Подтвердите заказ:</b>',
        name: 'Имя', contact: 'Контакт', address: 'Адрес', payment: 'Оплата', comment: 'Комментарий', order: 'Заказ',
        confirm: '✅ Подтвердить',
        cancel: '✖ Отмена',
        cancelled: 'Заказ отменён. /start — начать заново.',
        thanks: '✅ <b>Спасибо!</b>\nВаш заказ принят. Менеджер свяжется с вами в ближайшее время.',
        startOver: 'Используйте меню ниже 👇',
        qty: 'Кол-во',
    },
    de: {
        brand: '🛒 <b>Vapebaza</b> — Vape-Lieferung. 18+',
        chooseLang: '🌐 Bitte wählen Sie Ihre Sprache:',
        welcome: (r) => `Willkommen! Region: <b>${r}</b>\nWas möchten Sie tun?`,
        chooseRegion: '📍 Wählen Sie Ihre Region:',
        menuCatalog: '🛍 Katalog',
        menuCart: '🛒 Warenkorb',
        menuRegion: '📍 Region ändern',
        menuLang: '🌐 Sprache',
        catalogTitle: '🛍 <b>Geschmack wählen:</b>',
        back: '⬅ Zurück',
        backCatalog: '⬅ Zum Katalog',
        addToCart: '➕ In den Warenkorb',
        added: 'Hinzugefügt ✓',
        goToCart: '🛒 Zum Warenkorb',
        cartTitle: '🛒 <b>Ihr Warenkorb:</b>',
        emptyCart: '🛒 Ihr Warenkorb ist leer.',
        remove: '🗑',
        delivery: 'Lieferung',
        total: 'Gesamt',
        checkout: '✅ Zur Kasse',
        askName: '👤 Bitte geben Sie Ihren Namen ein:',
        askContactMethod: '📱 Wie sollen wir Sie kontaktieren?',
        whatsapp: '📱 WhatsApp',
        telegram: '✈️ Telegram',
        askWhatsapp: '📱 Geben Sie Ihre WhatsApp-Nummer ein (mit Ländervorwahl, z. B. +66...):',
        askTelegram: '✈️ Geben Sie Ihren Telegram-@Benutzernamen ein:',
        askAddress: '📍 Geben Sie Ihre Lieferadresse oder einen Google-Maps-Link ein:',
        askPayment: '💳 Zahlungsart wählen:',
        cash: '💵 Bargeld', card: '💳 Karte', crypto: '₿ Krypto',
        askComment: '💬 Kommentar hinzufügen (oder „Überspringen“):',
        skip: 'Überspringen ⏭',
        summaryTitle: '🧾 <b>Bitte bestätigen Sie Ihre Bestellung:</b>',
        name: 'Name', contact: 'Kontakt', address: 'Adresse', payment: 'Zahlung', comment: 'Kommentar', order: 'Bestellung',
        confirm: '✅ Bestellung bestätigen',
        cancel: '✖ Abbrechen',
        cancelled: 'Bestellung abgebrochen. /start zum Neustart.',
        thanks: '✅ <b>Danke!</b>\nIhre Bestellung ist eingegangen. Ein Manager meldet sich in Kürze bei Ihnen.',
        startOver: 'Bitte nutzen Sie das Menü unten 👇',
        qty: 'Menge',
    },
    zh: {
        brand: '🛒 <b>Vapebaza</b> — 电子烟配送。18+',
        chooseLang: '🌐 请选择语言：',
        welcome: (r) => `欢迎！地区：<b>${r}</b>\n请问您想做什么？`,
        chooseRegion: '📍 请选择您的地区：',
        menuCatalog: '🛍 商品目录',
        menuCart: '🛒 购物车',
        menuRegion: '📍 更换地区',
        menuLang: '🌐 语言',
        catalogTitle: '🛍 <b>选择口味：</b>',
        back: '⬅ 返回',
        backCatalog: '⬅ 返回目录',
        addToCart: '➕ 加入购物车',
        added: '已加入购物车 ✓',
        goToCart: '🛒 前往购物车',
        cartTitle: '🛒 <b>您的购物车：</b>',
        emptyCart: '🛒 您的购物车是空的。',
        remove: '🗑',
        delivery: '配送',
        total: '合计',
        checkout: '✅ 结算',
        askName: '👤 请输入您的姓名：',
        askContactMethod: '📱 我们如何与您联系？',
        whatsapp: '📱 WhatsApp',
        telegram: '✈️ Telegram',
        askWhatsapp: '📱 请输入您的 WhatsApp 号码（含国家代码，例如 +66...）：',
        askTelegram: '✈️ 请输入您的 Telegram @用户名：',
        askAddress: '📍 请输入配送地址或 Google 地图位置链接：',
        askPayment: '💳 请选择支付方式：',
        cash: '💵 现金', card: '💳 银行卡', crypto: '₿ 加密货币',
        askComment: '💬 添加备注（或点击"跳过"）：',
        skip: '跳过 ⏭',
        summaryTitle: '🧾 <b>请确认您的订单：</b>',
        name: '姓名', contact: '联系方式', address: '地址', payment: '支付', comment: '备注', order: '订单',
        confirm: '✅ 确认订单',
        cancel: '✖ 取消',
        cancelled: '订单已取消。/start 重新开始。',
        thanks: '✅ <b>谢谢！</b>\n您的订单已收到。客服将尽快与您联系。',
        startOver: '请使用下方菜单 👇',
        qty: '数量',
    },
};

function esc(s = '') {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function tg(method, params) {
    const res = await fetch(`${API}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    return res.json();
}

// ---------- bot presentation (description shown before START, About, commands) ----------
const BOT_DESC = {
    en: '🛒 Vapebaza — vape delivery in Krabi (and more regions).\nOrder online and get your vape in about 1 hour — to your hotel, villa or apartment. Payment on delivery: cash, card or crypto.\n\nTap START to choose your region and flavors. 18+',
    ru: '🛒 Vapebaza — доставка вейпов в Краби (и другие регионы).\nЗакажите онлайн и получите вейп примерно за 1 час — в отель, на виллу или в квартиру. Оплата при получении: наличные, карта или крипто.\n\nНажмите СТАРТ, чтобы выбрать регион и вкусы. 18+',
    de: '🛒 Vapebaza — Vape-Lieferung in Krabi (und weiteren Regionen).\nOnline bestellen und in etwa 1 Stunde erhalten — ins Hotel, zur Villa oder Wohnung. Zahlung bei Lieferung: Bargeld, Karte oder Krypto.\n\nTippen Sie auf START, um Region und Geschmack zu wählen. 18+',
    zh: '🛒 Vapebaza — 甲米（及更多地区）电子烟配送。\n在线下单，约 1 小时送达酒店、别墅或公寓。货到付款：现金、银行卡或加密货币。\n\n点击 START 选择地区和口味。18+',
};
const BOT_SHORT = {
    en: 'Vape delivery 🛵 Order right here in the bot. 18+',
    ru: 'Доставка вейпов 🛵 Заказ прямо в боте. 18+',
    de: 'Vape-Lieferung 🛵 Direkt im Bot bestellen. 18+',
    zh: '电子烟配送 🛵 直接在机器人中下单。18+',
};
const BOT_CMDS = {
    en: [
        { command: 'start', description: 'Open the shop' },
        { command: 'menu', description: 'Main menu' },
        { command: 'help', description: 'How to order' },
    ],
    ru: [
        { command: 'start', description: 'Открыть магазин' },
        { command: 'menu', description: 'Главное меню' },
        { command: 'help', description: 'Как заказать' },
    ],
    de: [
        { command: 'start', description: 'Shop öffnen' },
        { command: 'menu', description: 'Hauptmenü' },
        { command: 'help', description: 'Bestellhilfe' },
    ],
    zh: [
        { command: 'start', description: '打开商店' },
        { command: 'menu', description: '主菜单' },
        { command: 'help', description: '如何下单' },
    ],
};
const HELP = {
    en: '🛍 <b>How to order</b>\n1) Choose language and region\n2) Open <b>Catalog</b> and add flavors to cart\n3) Open <b>Cart</b> → <b>Checkout</b>\n4) Enter your name, contact, address and payment\n5) Confirm — a manager will contact you shortly.\n\n/start — open the shop',
    ru: '🛍 <b>Как заказать</b>\n1) Выберите язык и регион\n2) Откройте <b>Каталог</b> и добавьте вкусы в корзину\n3) Откройте <b>Корзину</b> → <b>Оформить заказ</b>\n4) Укажите имя, контакт, адрес и оплату\n5) Подтвердите — менеджер свяжется с вами.\n\n/start — открыть магазин',
    de: '🛍 <b>Wie bestellen</b>\n1) Sprache und Region wählen\n2) <b>Katalog</b> öffnen und Geschmack in den Warenkorb legen\n3) <b>Warenkorb</b> → <b>Zur Kasse</b>\n4) Name, Kontakt, Adresse und Zahlung angeben\n5) Bestätigen — ein Manager meldet sich in Kürze.\n\n/start — Shop öffnen',
    zh: '🛍 <b>如何下单</b>\n1) 选择语言和地区\n2) 打开<b>商品目录</b>，将口味加入购物车\n3) 打开<b>购物车</b> → <b>结算</b>\n4) 填写姓名、联系方式、地址和支付方式\n5) 确认 — 客服将尽快与您联系。\n\n/start — 打开商店',
};

function isOperator(chatId) {
    return regionList().map((r) => String(r.operatorChatId)).includes(String(chatId));
}

async function configureBot() {
    // Default (English) + per-language versions
    await tg('setMyDescription', { description: BOT_DESC.en });
    await tg('setMyShortDescription', { short_description: BOT_SHORT.en });
    await tg('setMyCommands', { commands: BOT_CMDS.en });
    for (const lc of ['ru', 'de', 'zh']) {
        await tg('setMyDescription', { description: BOT_DESC[lc], language_code: lc });
        await tg('setMyShortDescription', { short_description: BOT_SHORT[lc], language_code: lc });
        await tg('setMyCommands', { commands: BOT_CMDS[lc], language_code: lc });
    }
    await tg('setChatMenuButton', { menu_button: { type: 'commands' } });
}

// ---------- state ----------
const DEFAULT_STATE = () => ({ lang: null, region: null, cart: {}, step: null, draft: {} });

async function loadState(chatId) {
    try {
        const raw = await redis(['GET', `botstate:${chatId}`]);
        if (raw) return { ...DEFAULT_STATE(), ...JSON.parse(raw) };
    } catch (e) { console.error('loadState', e); }
    return DEFAULT_STATE();
}

async function saveState(chatId, state) {
    try {
        await redis(['SET', `botstate:${chatId}`, JSON.stringify(state), 'EX', '604800']);
    } catch (e) { console.error('saveState', e); }
}

// ---------- cart helpers ----------
function productFullName(region, p, lang) {
    const flavor = p.name[lang] || p.name.en;
    const g = p.group && region.groups && region.groups[p.group];
    if (g) {
        const gname = g.name[lang] || g.name.en;
        return `${gname} ${flavor}`;
    }
    return flavor;
}

function productImage(p) {
    return p.imgUrl || (p.img ? `${SITE_URL}/images/${p.img}` : null);
}

function cartLines(region, cart, lang) {
    const lines = [];
    let subtotal = 0;
    for (const [pid, qty] of Object.entries(cart || {})) {
        const p = getProduct(region.id, pid);
        if (!p || qty <= 0) continue;
        const sum = p.price * qty;
        subtotal += sum;
        lines.push({ id: p.id, name: productFullName(region, p, lang), qty, price: p.price, sum });
    }
    const delivery = lines.length ? region.delivery : 0;
    return { lines, subtotal, delivery, total: subtotal + delivery };
}

function cartCount(cart) {
    return Object.values(cart || {}).reduce((a, b) => a + b, 0);
}

// ---------- screens ----------
function mainMenuKb(t) {
    return {
        inline_keyboard: [
            [{ text: t.menuCatalog, callback_data: 'catalog' }, { text: t.menuCart, callback_data: 'cart' }],
            [{ text: t.menuRegion, callback_data: 'changeregion' }, { text: t.menuLang, callback_data: 'changelang' }],
        ],
    };
}

async function showLangChoice(chatId) {
    const text = '🌐 Choose language / Выберите язык / Sprache wählen / 选择语言:';
    await tg('sendMessage', {
        chat_id: chatId,
        text,
        reply_markup: {
            inline_keyboard: [
                [{ text: 'English 🇬🇧', callback_data: 'lang:en' }, { text: 'Русский 🇷🇺', callback_data: 'lang:ru' }],
                [{ text: 'Deutsch 🇩🇪', callback_data: 'lang:de' }, { text: '中文 🇨🇳', callback_data: 'lang:zh' }],
            ],
        },
    });
}

async function showRegionChoice(chatId, lang) {
    const t = T[lang] || T.en;
    const rows = regionList().map((r) => [{ text: r.name[lang] || r.name.en, callback_data: `region:${r.id}` }]);
    await tg('sendMessage', { chat_id: chatId, text: `${t.brand}\n\n${t.chooseRegion}`, parse_mode: 'HTML', reply_markup: { inline_keyboard: rows } });
}

async function showMenu(chatId, state, edit, msgId) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const text = t.welcome(region ? (region.name[state.lang] || region.name.en) : '-');
    const params = { chat_id: chatId, text, parse_mode: 'HTML', reply_markup: mainMenuKb(t) };
    if (edit && msgId) {
        const r = await tg('editMessageText', { ...params, message_id: msgId });
        if (!r.ok) await tg('sendMessage', params);
    } else await tg('sendMessage', params);
}

async function showCatalog(chatId, state, msgId) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    let rows;
    if (region.groups) {
        rows = Object.entries(region.groups).map(([gid, g]) => [{
            text: g.name[state.lang] || g.name.en,
            callback_data: `grp:${gid}`,
        }]);
    } else {
        rows = region.products.map((p) => [{
            text: `${productFullName(region, p, state.lang)} — ${p.price} ${region.currency}`,
            callback_data: `prod:${p.id}`,
        }]);
    }
    rows.push([{ text: `${t.menuCart} (${cartCount(state.cart)})`, callback_data: 'cart' }, { text: t.back, callback_data: 'menu' }]);
    const params = { chat_id: chatId, text: t.catalogTitle, parse_mode: 'HTML', reply_markup: { inline_keyboard: rows } };
    if (msgId) {
        const r = await tg('editMessageText', { ...params, message_id: msgId });
        if (!r.ok) await tg('sendMessage', params);
    } else await tg('sendMessage', params);
}

async function showGroup(chatId, state, gid, msgId) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const g = region.groups && region.groups[gid];
    if (!g) return showCatalog(chatId, state, msgId);
    const rows = region.products.filter((p) => p.group === gid).map((p) => [{
        text: `${p.name[state.lang] || p.name.en} — ${p.price} ${region.currency}`,
        callback_data: `prod:${p.id}`,
    }]);
    rows.push([{ text: `${t.menuCart} (${cartCount(state.cart)})`, callback_data: 'cart' }, { text: t.backCatalog, callback_data: 'catalog' }]);
    const params = { chat_id: chatId, text: `🛍 <b>${esc(g.name[state.lang] || g.name.en)}</b>`, parse_mode: 'HTML', reply_markup: { inline_keyboard: rows } };
    if (msgId) {
        const r = await tg('editMessageText', { ...params, message_id: msgId });
        if (!r.ok) await tg('sendMessage', params);
    } else await tg('sendMessage', params);
}

async function showProduct(chatId, state, pid) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const p = getProduct(region.id, pid);
    if (!p) return;
    const fullName = productFullName(region, p, state.lang);
    const desc = p.desc ? (p.desc[state.lang] || p.desc.en || '') : '';
    const caption = `<b>${esc(fullName)}</b>${desc ? '\n' + esc(desc) : ''}\n\n💰 <b>${p.price} ${region.currency}</b>`;
    const backData = (p.group && region.groups) ? `grp:${p.group}` : 'catalog';
    const kb = {
        inline_keyboard: [
            [{ text: t.addToCart, callback_data: `add:${p.id}` }],
            [{ text: t.goToCart, callback_data: 'cart' }, { text: t.backCatalog, callback_data: backData }],
        ],
    };
    const photo = productImage(p);
    if (photo) await tg('sendPhoto', { chat_id: chatId, photo, caption, parse_mode: 'HTML', reply_markup: kb });
    else await tg('sendMessage', { chat_id: chatId, text: caption, parse_mode: 'HTML', reply_markup: kb });
}

function cartText(state) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const { lines, delivery, total } = cartLines(region, state.cart, state.lang);
    if (!lines.length) return { text: t.emptyCart, kb: { inline_keyboard: [[{ text: t.menuCatalog, callback_data: 'catalog' }, { text: t.back, callback_data: 'menu' }]] } };
    let text = `${t.cartTitle}\n\n`;
    const rows = [];
    for (const l of lines) {
        text += `• ${esc(l.name)} — ${l.qty} × ${l.price} = <b>${l.sum} ${region.currency}</b>\n`;
        rows.push([
            { text: '➖', callback_data: `dec:${l.id}` },
            { text: `${l.name} (${l.qty})`, callback_data: `noop` },
            { text: '➕', callback_data: `inc:${l.id}` },
            { text: t.remove, callback_data: `rm:${l.id}` },
        ]);
    }
    text += `\n🚚 ${t.delivery}: ${delivery} ${region.currency}\n💰 <b>${t.total}: ${total} ${region.currency}</b>`;
    rows.push([{ text: t.checkout, callback_data: 'checkout' }]);
    rows.push([{ text: t.menuCatalog, callback_data: 'catalog' }, { text: t.back, callback_data: 'menu' }]);
    return { text, kb: { inline_keyboard: rows } };
}

async function showCart(chatId, state, msgId) {
    const { text, kb } = cartText(state);
    const params = { chat_id: chatId, text, parse_mode: 'HTML', reply_markup: kb };
    if (msgId) { params.message_id = msgId; const r = await tg('editMessageText', params); if (!r.ok) await tg('sendMessage', params); }
    else await tg('sendMessage', params);
}

// ---------- checkout ----------
async function askPayment(chatId, t) {
    await tg('sendMessage', {
        chat_id: chatId, text: t.askPayment,
        reply_markup: { inline_keyboard: [[
            { text: t.cash, callback_data: 'pay:cash' },
            { text: t.card, callback_data: 'pay:card' },
            { text: t.crypto, callback_data: 'pay:crypto' },
        ]] },
    });
}

async function showSummary(chatId, state) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const { lines, delivery, total } = cartLines(region, state.cart, state.lang);
    const d = state.draft;
    let text = `${t.summaryTitle}\n\n`;
    text += `👤 <b>${t.name}:</b> ${esc(d.name)}\n`;
    text += `📱 <b>${esc(d.contactLabel)}:</b> ${esc(d.contact)}\n`;
    text += `📍 <b>${t.address}:</b> ${esc(d.address)}\n`;
    text += `💳 <b>${t.payment}:</b> ${esc(d.payment)}\n`;
    if (d.comment) text += `💬 <b>${t.comment}:</b> ${esc(d.comment)}\n`;
    text += `\n📦 <b>${t.order}:</b>\n`;
    for (const l of lines) text += `• ${esc(l.name)} × ${l.qty} — ${l.sum} ${region.currency}\n`;
    text += `\n🚚 ${t.delivery}: ${delivery} ${region.currency}\n💰 <b>${t.total}: ${total} ${region.currency}</b>`;
    await tg('sendMessage', {
        chat_id: chatId, text, parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: t.confirm, callback_data: 'confirm' }, { text: t.cancel, callback_data: 'cancel' }]] },
    });
}

function operatorMessage(state, from) {
    const region = getRegion(state.region);
    const { lines, delivery, total } = cartLines(region, state.cart, state.lang);
    const d = state.draft;
    const items = lines.map((l) => `▪️ ${esc(l.name)} x${l.qty} — ${l.sum} ${region.currency}`).join('\n');
    const uname = from && from.username ? `@${from.username}` : '';
    return (
        `🤖 <b>New order (bot)</b> — ${esc(region.name.ru || region.name.en)}\n\n` +
        `👤 <b>Name:</b> ${esc(d.name)}\n` +
        `📱 <b>${esc(d.contactLabel)}:</b> ${esc(d.contact)}\n` +
        `📍 <b>Address:</b> ${esc(d.address)}\n` +
        `💳 <b>Payment:</b> ${esc(d.payment)}\n` +
        (d.comment ? `💬 <b>Comment:</b> ${esc(d.comment)}\n` : '') +
        (uname ? `👥 <b>TG:</b> ${esc(uname)}\n` : '') +
        `\n📦 <b>Order:</b>\n${items}\n\n` +
        `🚚 Delivery: ${delivery} ${region.currency}\n` +
        `💰 <b>Total: ${total} ${region.currency}</b>`
    );
}

async function placeOrder(chatId, state, from) {
    const t = T[state.lang];
    const region = getRegion(state.region);
    const { lines, total } = cartLines(region, state.cart, state.lang);
    if (!lines.length) { await tg('sendMessage', { chat_id: chatId, text: t.emptyCart }); return; }
    const d = state.draft;

    // Notify operator
    if (region.operatorChatId) {
        await tg('sendMessage', { chat_id: region.operatorChatId, text: operatorMessage(state, from), parse_mode: 'HTML' })
            .catch((e) => console.error('notify operator', e));
    }
    // Save to admin storage
    await saveOrder({
        source: 'bot',
        region: region.id,
        name: d.name,
        contact: d.contact,
        contactLabel: d.contactLabel,
        address: d.address,
        payment: d.payment,
        comment: d.comment || '',
        items: lines.map((l) => ({ name: l.name, qty: l.qty, sum: l.sum })),
        total,
    }).catch((e) => console.error('saveOrder bot', e));

    // Reset cart + draft, keep lang/region
    state.cart = {};
    state.draft = {};
    state.step = null;
    await saveState(chatId, state);

    await tg('sendMessage', { chat_id: chatId, text: t.thanks, parse_mode: 'HTML', reply_markup: mainMenuKb(t) });
}

// ---------- main handler ----------
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).json({ ok: true });
    if (!TOKEN) return res.status(500).json({ ok: false, error: 'CLIENT_BOT_TOKEN not set' });

    const secret = process.env.BOT_WEBHOOK_SECRET;
    if (secret && req.headers['x-telegram-bot-api-secret-token'] !== secret) {
        return res.status(401).json({ ok: false });
    }
    if (!redisConfigured()) return res.status(500).json({ ok: false, error: 'Storage not configured' });

    let update = req.body;
    if (typeof update === 'string') { try { update = JSON.parse(update); } catch { update = {}; } }

    try {
        if (update.callback_query) await onCallback(update.callback_query);
        else if (update.message) await onMessage(update.message);
    } catch (e) {
        console.error('bot handler error:', e);
    }
    // Always 200 so Telegram doesn't retry endlessly.
    return res.status(200).json({ ok: true });
}

async function onMessage(msg) {
    const chatId = msg.chat.id;
    const text = (msg.text || '').trim();
    const state = await loadState(chatId);

    if (text === '/setup') {
        if (isOperator(chatId)) {
            await configureBot().catch((e) => console.error('configureBot', e));
            return tg('sendMessage', { chat_id: chatId, text: '✅ Бот оформлен: описание (видно рядом с кнопкой START), About и меню команд обновлены.\nОткройте профиль бота, чтобы проверить.' });
        }
        return tg('sendMessage', { chat_id: chatId, text: 'Команда доступна только оператору.' });
    }

    if (text === '/help') {
        const lang = state.lang || 'en';
        return tg('sendMessage', { chat_id: chatId, text: HELP[lang], parse_mode: 'HTML' });
    }

    if (text === '/start' || text === '/menu') {
        state.step = null;
        if (!state.lang) state.lang = 'en'; // default language
        if (!state.region) { await saveState(chatId, state); return showRegionChoice(chatId, state.lang); }
        await saveState(chatId, state);
        return showMenu(chatId, state);
    }

    // Checkout text steps
    if (state.step) {
        const t = T[state.lang] || T.en;
        if (state.step === 'name') {
            state.draft.name = text.slice(0, 100);
            state.step = null;
            await saveState(chatId, state);
            return tg('sendMessage', {
                chat_id: chatId, text: t.askContactMethod,
                reply_markup: { inline_keyboard: [[{ text: t.whatsapp, callback_data: 'cm:whatsapp' }, { text: t.telegram, callback_data: 'cm:telegram' }]] },
            });
        }
        if (state.step === 'contact') {
            state.draft.contact = text.slice(0, 100);
            state.step = 'address';
            await saveState(chatId, state);
            return tg('sendMessage', { chat_id: chatId, text: t.askAddress });
        }
        if (state.step === 'address') {
            state.draft.address = text.slice(0, 500);
            state.step = null;
            await saveState(chatId, state);
            return askPayment(chatId, t);
        }
        if (state.step === 'comment') {
            state.draft.comment = text.slice(0, 500);
            state.step = null;
            await saveState(chatId, state);
            return showSummary(chatId, state);
        }
    }

    // Fallback
    if (!state.lang) state.lang = 'en';
    await saveState(chatId, state);
    if (!state.region) return showRegionChoice(chatId, state.lang);
    const t = T[state.lang];
    return tg('sendMessage', { chat_id: chatId, text: t.startOver, reply_markup: mainMenuKb(t) });
}

async function onCallback(cq) {
    const chatId = cq.message.chat.id;
    const msgId = cq.message.message_id;
    const data = cq.data || '';
    const state = await loadState(chatId);
    const ack = (text) => tg('answerCallbackQuery', { callback_query_id: cq.id, text: text || undefined });

    // language / region selection
    if (data.startsWith('lang:')) {
        const L = data.split(':')[1];
        state.lang = ['en', 'ru', 'de', 'zh'].includes(L) ? L : 'en';
        await saveState(chatId, state);
        await ack();
        if (!state.region) return showRegionChoice(chatId, state.lang);
        return showMenu(chatId, state);
    }
    if (data === 'changelang') { await ack(); return showLangChoice(chatId); }

    if (data.startsWith('region:')) {
        const rid = data.split(':')[1];
        if (getRegion(rid)) {
            if (state.region !== rid) state.cart = {}; // avoid mixing product ids across regions
            state.region = rid;
            await saveState(chatId, state);
        }
        await ack();
        return showMenu(chatId, state);
    }
    if (data === 'changeregion') { await ack(); return showRegionChoice(chatId, state.lang || 'en'); }

    if (!state.lang) { state.lang = 'en'; await saveState(chatId, state); }
    if (!state.region) { await ack(); return showRegionChoice(chatId, state.lang); }
    const t = T[state.lang];

    if (data === 'menu') { await ack(); return showMenu(chatId, state, true, msgId); }
    if (data === 'catalog') { await ack(); return showCatalog(chatId, state, msgId); }
    if (data === 'noop') { return ack(); }

    if (data.startsWith('grp:')) { await ack(); return showGroup(chatId, state, data.split(':')[1], msgId); }
    if (data.startsWith('prod:')) { await ack(); return showProduct(chatId, state, data.split(':')[1]); }

    if (data.startsWith('add:')) {
        const pid = data.split(':')[1];
        state.cart[pid] = (state.cart[pid] || 0) + 1;
        await saveState(chatId, state);
        return ack(t.added);
    }

    if (data === 'cart') { await ack(); return showCart(chatId, state, msgId); }

    if (data.startsWith('inc:') || data.startsWith('dec:') || data.startsWith('rm:')) {
        const [op, pid] = data.split(':');
        if (op === 'inc') state.cart[pid] = (state.cart[pid] || 0) + 1;
        if (op === 'dec') state.cart[pid] = Math.max(0, (state.cart[pid] || 0) - 1);
        if (op === 'rm') delete state.cart[pid];
        if (state.cart[pid] === 0) delete state.cart[pid];
        await saveState(chatId, state);
        await ack();
        return showCart(chatId, state, msgId);
    }

    if (data === 'checkout') {
        const { lines } = cartLines(getRegion(state.region), state.cart, state.lang);
        if (!lines.length) { return ack(t.emptyCart); }
        state.step = 'name';
        state.draft = {};
        await saveState(chatId, state);
        await ack();
        return tg('sendMessage', { chat_id: chatId, text: t.askName });
    }

    if (data.startsWith('cm:')) {
        const method = data.split(':')[1];
        state.draft.contactLabel = method === 'telegram' ? 'Telegram' : 'WhatsApp';
        state.step = 'contact';
        await saveState(chatId, state);
        await ack();
        return tg('sendMessage', { chat_id: chatId, text: method === 'telegram' ? t.askTelegram : t.askWhatsapp });
    }

    if (data.startsWith('pay:')) {
        const m = data.split(':')[1];
        const PAY = {
            en: { cash: 'Cash', card: 'Card', crypto: 'Crypto' },
            ru: { cash: 'Наличные', card: 'Карта', crypto: 'Крипто' },
            de: { cash: 'Bargeld', card: 'Karte', crypto: 'Krypto' },
            zh: { cash: '现金', card: '银行卡', crypto: '加密货币' },
        };
        state.draft.payment = (PAY[state.lang] || PAY.en)[m] || m;
        state.step = 'comment';
        await saveState(chatId, state);
        await ack();
        return tg('sendMessage', {
            chat_id: chatId, text: t.askComment,
            reply_markup: { inline_keyboard: [[{ text: t.skip, callback_data: 'skipcomment' }]] },
        });
    }

    if (data === 'skipcomment') {
        state.draft.comment = '';
        state.step = null;
        await saveState(chatId, state);
        await ack();
        return showSummary(chatId, state);
    }

    if (data === 'confirm') {
        await ack();
        return placeOrder(chatId, state, cq.from);
    }
    if (data === 'cancel') {
        state.step = null;
        state.draft = {};
        await saveState(chatId, state);
        await ack();
        return tg('sendMessage', { chat_id: chatId, text: t.cancelled, reply_markup: mainMenuKb(t) });
    }

    return ack();
}
