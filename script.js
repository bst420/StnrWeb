
let cart = [];

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
    total.textContent = 'Итого: ' + sum + ' USDT';
    if (cart.length > 0) {
        payment.style.display = 'block';
    }
}

function showWallet(currency) {
    const walletDiv = document.getElementById('wallet-info');
    walletDiv.innerHTML = `
        <p>Отправьте оплату на адрес: <b>${currency === 'USDT' ? 'USDT_WALLET_HERE' : 'UQDw3OAFj_Z1-h3ZcYkliun5q_bmZEH_WW9zf3J18p-695rL'}</b></p>
        <p><input id="tg-contact" placeholder="Ваш контакт в Telegram (обязательно)" style="padding:5px; width:100%;" /></p>
        <button onclick="confirmPayment()">Платёж отправлен</button>
    `;
}

function confirmPayment() {
    const contact = document.getElementById('tg-contact').value.trim();
    if (!contact) {
        alert("Пожалуйста, укажите ваш контакт в Telegram.");
        return;
    }

    let sum = 0;
    let orderText = cart.map((item, i) => {
        sum += item.price;
        return `${i + 1}. ${item.name} — ${item.price} USDT`;
    }).join('%0A');

    const message = encodeURIComponent(`💸 Новый заказ подтверждён на сайте!%0A🛒 Состав заказа:%0A${orderText}%0A💰 Итого: ${sum} USDT%0A👤 Контакт: @${contact}`);
    const telegramAPI = `https://api.telegram.org/bot7607141949:AAHd0skdpY988Dsl0XwuWmWFWCQaIXGfvnY/sendMessage?chat_id=386851663&text=${message}`;

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
