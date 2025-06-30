
const translations = {
  en: { ... },
  ru: { ... },
  cz: { ... }
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

  // Показать только нужный языковой гайд
  ["en", "ru", "cz"].forEach(lang => {
    const el = document.getElementById("info-text-" + lang);
    if (el) el.style.display = (lang === currentLang) ? "block" : "none";
  });

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

document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en");
});
