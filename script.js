
const translations = {
  en: {
    cart: "Cart",
    payment: "Payment:",
    contact: "Contact"
  },
  cz: {
    cart: "Košík",
    payment: "Platba:",
    contact: "Kontakt"
  },
  ru: {
    cart: "Корзина",
    payment: "Оплата:",
    contact: "Контакт"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || el.textContent;
  });
}

window.onload = () => {
  const lang = localStorage.getItem("lang") || "en";
  setLang(lang);
  loadCatalog();
};

function loadCatalog() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = `
    <h2>🛍️ Catalog</h2>
    <div class="product-card">
      <img src="https://i.imgur.com/MYhJjE7.png" alt="Essential Oil" width="100">
      <h3>Essential Oil Bottle</h3>
      <p>30ml essential oil</p>
      <strong>20 USDT</strong><br>
      <button>Add to Cart</button>
    </div>
    <div class="product-card">
      <img src="https://i.imgur.com/Z1qW8Yl.png" alt="Sachet" width="100">
      <h3>Scented Pouch</h3>
      <p>Handmade pouch with herbs</p>
      <strong>10 USDT</strong><br>
      <button>Add to Cart</button>
    </div>
  `;
}
