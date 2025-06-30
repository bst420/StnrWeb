
const translations = {
  en: {
    title: "My Retro Shop",
    catalog: "Catalog",
    cart: "🧺 Cart",
    payment: "💳 Payment:",
    info: "ℹ️ How to Pay",
    contact: "📞 Contact",
    contactText: "For any questions write to @MisterrrA on Telegram",
    contactLabel: "Your Telegram contact:",
    paymentGuide: "Send TON to UQDw3OAFj... or USDT (TRC20). You can buy crypto via Binance or Trust Wallet using your bank card. Then send payment and click the button below.",
    products: [
      { name: "Scented Pouch", desc: "Handmade pouch with herbs", price: 10, img: "https://i.imgur.com/mZ1uIYV.png" },
      { name: "Oil Bottle", desc: "Essential oil, 30ml", price: 20, img: "https://i.imgur.com/zllRTZ2.png" }
    ]
  },
  cz: {
    title: "Můj Retro Obchod",
    catalog: "Katalog",
    cart: "🧺 Košík",
    payment: "💳 Platba:",
    info: "ℹ️ Jak zaplatit",
    contact: "📞 Kontakt",
    contactText: "Pro dotazy napište @MisterrrA na Telegramu",
    contactLabel: "Váš kontakt na Telegramu:",
    paymentGuide: "Pošlete TON na UQDw3OAF... nebo USDT (TRC20). Můžete si koupit kryptoměnu přes Binance nebo Trust Wallet. Poté potvrďte platbu tlačítkem níže.",
    products: [
      { name: "Vonný sáček", desc: "Ručně vyráběný sáček s bylinkami", price: 10, img: "https://i.imgur.com/mZ1uIYV.png" },
      { name: "Lahvička oleje", desc: "Esenciální olej, 30 ml", price: 20, img: "https://i.imgur.com/zllRTZ2.png" }
    ]
  },
  ru: {
    title: "Мой Ретро Магазин",
    catalog: "Каталог",
    cart: "🧺 Корзина",
    payment: "💳 Оплата:",
    info: "ℹ️ Как оплатить",
    contact: "📞 Контакты",
    contactText: "По вопросам пишите @MisterrrA в Telegram",
    contactLabel: "Ваш Telegram-контакт:",
    paymentGuide: "Переведите TON на UQDw3OAF... или USDT (TRC20). Купить криптовалюту можно через Binance или Trust Wallet. После перевода нажмите кнопку ниже.",
    products: [
      { name: "Ароматный мешочек", desc: "Мешочек с травами ручной работы", price: 10, img: "https://i.imgur.com/mZ1uIYV.png" },
      { name: "Флакон с маслом", desc: "Эфирное масло, 30 мл", price: 20, img: "https://i.imgur.com/zllRTZ2.png" }
    ]
  }
};

let currentLang = 'en';
let cart = [];

function setLanguage(lang) {
  currentLang = lang;
  render();
}

function render() {
  const t = translations[currentLang];
  document.getElementById("shop-title").textContent = t.title;
  document.getElementById("catalog-title").textContent = t.catalog;
  document.getElementById("cart-title").textContent = t.cart;
  document.getElementById("payment-title").textContent = t.payment;
  document.getElementById("info-title").textContent = t.info;
  document.getElementById("contact-title").textContent = t.contact;
  document.getElementById("contact-text").textContent = t.contactText;
  document.getElementById("contact-label").textContent = t.contactLabel;
  document.getElementById("info-text").textContent = t.paymentGuide;

  const list = document.getElementById("product-list");
  list.innerHTML = "";
  t.products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p><strong>${p.price} USDT</strong><br><button onclick="addToCart(${i})">Add to Cart</button>`;
    list.appendChild(div);
  });

  renderCart();
}

function addToCart(index) {
  cart.push(translations[currentLang].products[index]);
  renderCart();
}

function renderCart() {
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} USDT`;
    ul.appendChild(li);
    total += item.price;
  });
  document.getElementById("total").textContent = cart.length ? `Total: ${total} USDT` : "";
}

function pay(method) {
  document.getElementById("contact-input").style.display = "block";
}

function confirmPayment() {
  const contact = document.getElementById("contact").value.trim();
  if (!contact) return alert("Please enter your Telegram contact");
  let summary = cart.map(i => `${i.name} — ${i.price} USDT`).join("\n");
  let total = cart.reduce((sum, i) => sum + i.price, 0);
  alert("Thank you! Your order has been sent.");
  fetch(`https://api.telegram.org/bot7607141949:AAHd0skdpY988Dsl0XwuWmWFWCQaIXGfvnY/sendMessage`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: 386851663,
      text: `🛒 New order from website:\nContact: ${contact}\n${summary}\nTotal: ${total} USDT`
    })
  });
  cart = [];
  renderCart();
}
