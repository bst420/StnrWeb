
let cart = [];
let currentLang = "en";

const translations = {
  en: {
    catalog: "Catalog",
    info: "Info",
    contact: "Contact",
    cart: "Cart",
    pay_with: "Payment:",
    contact_us: "Write us:",
    guide: `
💰 <b>How to pay with TON or USDT:</b><br>
1. Choose a product and proceed to payment<br>
2. Send the exact amount to the shown wallet<br>
3. Click “Payment Sent” after transfer<br>
4. Wait for operator confirmation<br><br>
💱 <b>How to buy TON or USDT:</b><br>
- Use exchange apps (Binance, Bybit, Telegram Wallet)<br>
- Buy with card or P2P<br>
- Then send funds to the wallet address<br><br>
✅ <b>Recommended wallets:</b><br>
- TON: <a href='https://wallet.tg' target='_blank'>wallet.tg</a><br>
- USDT (TRC20): Trust Wallet, Binance, OKX`
  },
  ru: {
    catalog: "Каталог",
    info: "Инфо",
    contact: "Связаться",
    cart: "Корзина",
    pay_with: "Оплата:",
    contact_us: "Напишите нам:",
    guide: `
💰 <b>Как оплатить через TON или USDT:</b><br>
1. Выберите товар и перейдите к оплате<br>
2. Отправьте точную сумму на указанный кошелёк<br>
3. Нажмите “Платёж отправлен”<br>
4. Ожидайте подтверждение от оператора<br><br>
💱 <b>Как купить TON или USDT:</b><br>
- Через Binance, Bybit или Telegram Wallet<br>
- Используйте карту или P2P<br>
- Переведите сумму на кошелёк<br><br>
✅ <b>Рекомендуемые кошельки:</b><br>
- TON: <a href='https://wallet.tg' target='_blank'>wallet.tg</a><br>
- USDT (TRC20): Trust Wallet, Binance, OKX`
  },
  cz: {
    catalog: "Katalog",
    info: "Info",
    contact: "Kontakt",
    cart: "Košík",
    pay_with: "Platba:",
    contact_us: "Napište nám:",
    guide: `
💰 <b>Jak zaplatit přes TON nebo USDT:</b><br>
1. Vyberte produkt a pokračujte k platbě<br>
2. Odešlete přesnou částku na zobrazenou peněženku<br>
3. Klikněte na „Platba odeslána“<br>
4. Počkejte na potvrzení operátorem<br><br>
💱 <b>Jak koupit TON nebo USDT:</b><br>
- Přes Binance, Bybit nebo Telegram Wallet<br>
- Kartou nebo P2P<br>
- Odeslání částky na peněženku<br><br>
✅ <b>Doporučené peněženky:</b><br>
- TON: <a href='https://wallet.tg' target='_blank'>wallet.tg</a><br>
- USDT (TRC20): Trust Wallet, Binance, OKX`
  }
};

const products = [
  {
    name: { en: "Aroma Pouch", ru: "Ароматный мешочек", cz: "Aromatický pytlík" },
    desc: { en: "Handmade herbs", ru: "Ручная работа, травы", cz: "Ručně vyráběné bylinky" },
    price: 10
  },
  {
    name: { en: "Oil Bottle 30ml", ru: "Флакон масла 30мл", cz: "Láhev oleje 30ml" },
    desc: { en: "Essential oil", ru: "Эфирное масло", cz: "Esenciální olej" },
    price: 20
  }
];

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="item">
        <img src="https://via.placeholder.com/150" alt="img${i}" />
        <h3>${p.name[currentLang]}</h3>
        <p>${p.desc[currentLang]}</p>
        <p class="price">${p.price} USDT</p>
        <button onclick="addToCart('${p.name.en}', ${p.price})">🛒 Order</button>
      </div>`;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total');
  const payment = document.getElementById('payment');
  cartItems.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} USDT`;
    cartItems.appendChild(li);
    sum += item.price;
  });
  total.textContent = 'Total: ' + sum + ' USDT';
  if (cart.length > 0) {
    payment.style.display = 'block';
  }
}

function showWallet(currency) {
  const walletDiv = document.getElementById('wallet-info');
  walletDiv.innerHTML = `
    <p>Send payment to: <b>${currency === 'USDT' ? 'USDT_WALLET_HERE' : 'UQDw3OAFj_Z1-h3ZcYkliun5q_bmZEH_WW9zf3J18p-695rL'}</b></p>
    <input id="tg-contact" placeholder="Your Telegram (required)" style="width:100%; padding:5px;" />
    <button onclick="confirmPayment()">Payment Sent</button>
  `;
}

function confirmPayment() {
  const contact = document.getElementById("tg-contact").value.trim();
  if (!contact) {
    alert("Please enter your Telegram contact.");
    return;
  }
  let sum = 0;
  const message = cart.map((item, i) => {
    sum += item.price;
    return `${i + 1}. ${item.name} — ${item.price} USDT`;
  }).join('%0A');
  const fullMsg = encodeURIComponent(`💸 Order confirmed!%0A${message}%0ATotal: ${sum} USDT%0AContact: @${contact}`);
  fetch(`https://api.telegram.org/bot7607141949:AAHd0skdpY988Dsl0XwuWmWFWCQaIXGfvnY/sendMessage?chat_id=386851663&text=${fullMsg}`);
  document.getElementById('wallet-info').innerHTML = 'Thanks! Operator will contact you soon.';
  cart = [];
  renderCart();
}

function showSection(sectionId) {
  document.querySelectorAll("main > section").forEach(s => s.className = "hidden");
  document.getElementById(sectionId).className = "visible";
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerText = translations[lang][key];
  });
  document.getElementById("payment-guide").innerHTML = translations[lang].guide;
  renderProducts();
}

// init
window.onload = () => {
  setLang("en");
  renderProducts();
};
