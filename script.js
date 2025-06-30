
const translations = {
  en: {
    catalog: "🛍️ Catalog",
    cart: "🧺 Cart",
    payment: "💳 Payment:",
    guide: `1. Add products to cart<br>
2. Choose payment method<br>
3. Send the exact amount<br>
4. Click "Payment Sent"<br>
5. Wait for confirmation`,
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
    guide: `1. Přidejte produkty do košíku<br>
2. Vyberte způsob platby<br>
3. Odešlete částku<br>
4. Klikněte na „Platba odeslána“<br>
5. Počkejte na potvrzení`,
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
    guide: `1. Добавьте товары<br>
2. Выберите способ оплаты<br>
3. Отправьте сумму<br>
4. Нажмите «Платёж отправлен»<br>
5. Ждите подтверждения`,
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

function setLang(l) {
  lang = l;
  const t = translations[l];
  document.getElementById("catalog-title").innerHTML = t.catalog;
  document.getElementById("cart-title").innerHTML = t.cart;
  document.getElementById("payment-title").innerHTML = t.payment;
  document.getElementById("guide-title").innerHTML = "💰 " + t.guideTitle;
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
  alert("Now send " + method + " to wallet and click Payment Sent");
}

document.addEventListener("DOMContentLoaded", () => setLang("en"));
