const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 2, name: "Smart Watch", price: 1999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 3, name: "Backpack", price: 899, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
  { id: 4, name: "Sneakers", price: 1299, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 5, name: "Water Bottle", price: 499, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8" },
  { id: 6, name: "Coffee Mug", price: 299, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd" },
  { id: 7, name: "Sunglasses", price: 699, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f" },
  { id: 8, name: "Desk Lamp", price: 799, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(filterText = '') {
  const grid = document.getElementById('product-grid');
  const noProducts = document.getElementById('no-products');
  grid.innerHTML = '';

  const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase().trim()));

  if (filtered.length === 0) {
    noProducts.style.display = 'block';
    return;
  }
  noProducts.style.display = 'none';

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">₹${p.price}</div>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function addToCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  saveAndUpdate();
  showToast();
}

function changeQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  saveAndUpdate();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveAndUpdate();
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItemsDiv.innerHTML = '';

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <strong>${item.name}</strong><br>
            <small>₹${item.price}</small>
          </div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="btn btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsDiv.appendChild(row);
    });
  }

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function saveAndUpdate() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  cart = [];
  saveAndUpdate();
  document.getElementById('order-modal').classList.add('show');
}

const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
});

document.getElementById('search-input').addEventListener('input', (e) => {
  displayProducts(e.target.value);
});

document.getElementById('place-order-btn').addEventListener('click', placeOrder);

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('order-modal').classList.remove('show');
});

displayProducts();
updateCart();
