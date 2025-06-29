
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
    document.getElementById('wallet-info').innerHTML = '<p>Спасибо! Ожидайте, с вами свяжется оператор.</p>';
    cart = [];
    renderCart();
    document.getElementById('payment').style.display = 'none';
}
