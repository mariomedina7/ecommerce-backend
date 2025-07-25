document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('products-grid');
  const cartCount = document.getElementById('cart-count');

  const res = await fetch('/api/products');
  const data = await res.json();
  const products = data.products || [];

  grid.innerHTML = products.map(prod => `
    <div class="product-card" style="border:1px solid #ddd;padding:1rem;border-radius:8px;box-shadow:0 2px 8px #eee;cursor:pointer;transition:box-shadow .2s;" onclick="window.location='/products/${prod._id}'">
      <h2 style="font-size:1.2rem;">${prod.title}</h2>
      <p style="color:#888;">${prod.category}</p>
      <p>${prod.description}</p>
      <p><b>Precio:</b> $${prod.price}</p>
      <p><b>Stock:</b> ${prod.stock}</p>
    </div>
  `).join('');

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }
  updateCartCount();
  window.addEventListener('cart-updated', updateCartCount);
}); 