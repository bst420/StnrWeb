const translations = {
  en: {
    catalog: "🛍️ Catalog",
    cart: "🧺 Cart",
    payment: "💳 Payment:",
    walletText: "Send payment to the following wallet:",
    guideTitle: "💰 How to pay with TON or USDT",
    guide: `
      <strong>💰 How to pay with TON or USDT:</strong><br>
      1. Choose a product and proceed to payment<br>
      2. Send the exact amount to the shown wallet<br>
      3. Click “Payment Sent” after transfer<br>
      4. Wait for operator confirmation<br><br>
      <strong>💱 How to buy TON or USDT:</strong><br>
      You can buy crypto via exchange apps (e.g., Binance, Bybit, or Telegram Wallet)<br>
      Use card or P2P (peer-to-peer) to buy crypto directly<br>
      Then send TON or USDT to the wallet address shown on the site`,
    contact: "📞 Contact",
    contactInfo: "Write to <strong>@MisterrrA</strong> on Telegram",
    products: [
      { name: "Essential Oil", img: "essential_oil.png", desc: "30ml essential oil", price: 20 },
      { name: "Scented Pouch", img: "scented_pouch.png", desc: "Handmade herbs", price: 10 }
    ]
  },
  cz: {
    catalog: "🛍️ Katalog",
    cart: "🧺 Košík",
    payment: "💳 Platba:",
    walletText: "Odešlete platbu na tuto peněženku:",
    guideTitle: "💰 Jak zaplatit pomocí TON nebo USDT",
    guide: `
      <strong>💰 Jak zaplatit pomocí TON nebo USDT:</strong><br>
      1. Vyberte produkt a pokračujte k platbě<br>
      2. Odešlete přesnou částku na zobrazenou peněženku<br>
      3. Klikněte na „Platba odeslána“<br>
      4. Počkejte na potvrzení od operátora<br><br>
      <strong>💱 Jak koupit TON nebo USDT:</strong><br>
      Můžete použít burzy jako Binance, Bybit nebo Telegram Wallet<br>
      Použijte kartu nebo P2P pro přímý nákup krypta<br>
      Poté odešlete TON nebo USDT na zobrazenou peněženku`,
    contact: "📞 Kontakt",
    contactInfo: "Napište nám na <strong>@MisterrrA</strong>",
    products: [
      { name: "Esenciální olej", img: "essential_oil.png", desc: "30ml vůně", price: 20 },
      { name: "Vonný sáček", img: "scented_pouch.png", desc: "Bylinný sáček", price: 10 }
    ]
  },
  ru: {
    catalog: "🛍️ Каталог",
    cart: "🧺 Корзина",
    payment: "💳 Оплата:",
    walletText: "Отправьте оплату на кошелёк:",
    guideTitle: "💰 Как оплатить TON или USDT",
    guide: `
      <strong>💰 Как оплатить TON или USDT:</strong><br>
      1. Выберите товар и перейдите к оплате<br>
      2. Отправьте точную сумму на указанный кошелёк<br>
      3. Нажмите «Оплата совершена»<br>
      4. Дождитесь подтверждения от оператора<br><br>
      <strong>💱 Как купить TON или USDT:</strong><br>
      Вы можете использовать Binance, Bybit или Telegram Wallet<br>
      Купите крипту через карту или P2P<br>
      Переведите TON или USDT на адрес, указанный на сайте`,
    contact: "📞 Контакт",
    contactInfo: "Напишите нам в <strong>@MisterrrA</strong>",
    products: [
      { name: "Эфирное масло", img: "essential_oil.png", desc: "30мл масла", price: 20 },
      { name: "Арома-мешочек", img: "scented_pouch.png", desc: "С травами", price: 10 }
    ]
  }
};

let lang = "en";
let cart = [];
let selectedMethod = "";
let wallets = {
  TON: "UQDw3OAFj_Z1-h3ZcYkliun5q_bmZEH_WW9zf3J18p-695rL",
  USDT: "USDT_WALLET_HERE"
};

function setLang(l) {
  lang = l;
  const t = translations[l];
  document.getElementById("catalog-title").innerHTML = t.catalog;
  document.getElementById("cart-title").innerHTML = t.cart;
  document.getElementById("payment-title").innerHTML = t.payment;
  document.getElementById("guide-title").innerHTML = t.guideTitle;
  document.getElementById("payment-guide").innerHTML = t.guide;
  document.getElementById("contact-title").innerHTML = t.contact;
  document.getElementById("contact-info").innerHTML = t.contactInfo;

  const container = document.getElementById("catalog-container");
  container.innerHTML = "";
  t.products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>${p.price} USDT</strong><br>
      <button class="add-to-cart" onclick="addToCart(${i})">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  renderCart();
}

function addToCart(i) {
  cart.push(translations[lang].products[i]);
  renderCart();
}

function renderCart() {
  const area = document.getElementById("cart");
  area.innerHTML = "";
  let total = 0;
  cart.forEach(p => {
    area.innerHTML += `<p>${p.name} — ${p.price} USDT</p>`;
    total += p.price;
  });
  if (cart.length) area.innerHTML += `<p><strong>Total: ${total} USDT</strong></p>`;
}

function pay(method) {
  selectedMethod = method;
  const wallet = wallets[method];
  const t = translations[lang];
  document.getElementById("payment-form").style.display = "block";
  document.getElementById("wallet-label").innerText = t.walletText;
  document.getElementById("wallet-address").innerText = wallet;
  document.getElementById("payment-status").innerText = "";
}

function submitPayment() {
  const tg = document.getElementById("telegram-contact").value.trim();
  if (!tg) {
    document.getElementById("payment-status").innerText = "Please enter your Telegram contact.";
    return;
  }
  const total = cart.reduce((s, p) => s + p.price, 0);
  const items = cart.map(p => `${p.name} — ${p.price} USDT`).join("\n");
  const msg = `🛒 New Order:\n${items}\nTotal: ${total} USDT\n💬 Contact: @${tg}\n💱 Method: ${selectedMethod}`;

  fetch(`https://api.telegram.org/bot7607141949:AAHd0skdpY988Dsl0XwuWmWFWCQaIXGfvnY/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "386851663",
      text: msg
    })
  }).then(r => {
    cart = [];
    renderCart();
    document.getElementById("payment-status").innerText = "✅ Payment info sent. Wait for confirmation.";
    document.getElementById("telegram-contact").value = "";
  });
}

document.addEventListener("DOMContentLoaded", () => setLang("en"));