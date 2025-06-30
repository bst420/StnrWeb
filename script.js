
let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
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
    total.textContent = 'Итого: ' + sum + ' USDT';
    if (cart.length > 0) {
        payment.style.display = 'block';
    }
}

function showWallet(currency) {
    const walletDiv = document.getElementById('wallet-info');
    if (currency === 'USDT') {
        walletDiv.innerHTML = '<p>Отправьте оплату на адрес: <b>USDT-кошелёк-здесь</b></p><button onclick="confirmPayment()">Платёж отправлен</button>';
    } else {
        walletDiv.innerHTML = '<p>Отправьте оплату на адрес: <b>UQDw3OAFj_Z1-h3ZcYkliun5q_bmZEH_WW9zf3J18p-695rL</b></p><button onclick="confirmPayment()">Платёж отправлен</button>';
    }
}

function confirmPayment() {
    const message = encodeURIComponent("💸 Новый заказ подтверждён на сайте!");
    const chatId = "386851663";
    const telegramAPI = `https://api.telegram.org/bot7607141949:AAHd0skdpY988Dsl0XwuWmWFWCQaIXGfvnY/sendMessage?chat_id=${chatId}&text=${message}`;

    fetch(telegramAPI)
      .then(() => {
        document.getElementById('wallet-info').innerHTML = '<p>Спасибо! Ожидайте, с вами свяжется оператор.</p>';
        cart = [];
        renderCart();
        document.getElementById('payment').style.display = 'none';
      })
      .catch(() => {
        document.getElementById('wallet-info').innerHTML = '<p>Ошибка при отправке уведомления. Свяжитесь вручную: @MisterrrA</p>';
      });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(s => s.className = "hidden");
    document.getElementById(sectionId).className = "visible";
}
