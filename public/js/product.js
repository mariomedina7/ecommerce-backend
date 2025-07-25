document.addEventListener('DOMContentLoaded', async () => {
  const cartCount = document.getElementById('cart-count');
  const detail = document.getElementById('product-detail');

  const productId = window.location.pathname.split('/').pop();

  const res = await fetch(`/api/products/${productId}`);
  const data = await res.json();
  const prod = data.product;
  if (!prod) {
    detail.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }
  detail.innerHTML = `
    <h2>${prod.title}</h2>
    <p><b>Categoría:</b> ${prod.category}</p>
    <p><b>Descripción:</b> ${prod.description}</p>
    <p><b>Precio:</b> $${prod.price}</p>
    <p><b>Stock:</b> ${prod.stock}</p>
    <div style="margin:1rem 0;">
      <label for="qty">Cantidad:</label>
      <input type="number" id="qty" min="1" max="${prod.stock}" value="1" style="width:60px;">
      <button id="add-to-cart">Agregar al carrito</button>
    </div>
    <div id="add-msg" style="color:green;"></div>
  `;

  document.getElementById('add-to-cart').onclick = () => {
    const qty = parseInt(document.getElementById('qty').value, 10);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const idx = cart.findIndex(item => item.productId === prod._id);
    if (idx !== -1) {
      cart[idx].quantity += qty;
    } else {
      cart.push({ productId: prod._id, title: prod.title, price: prod.price, quantity: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('add-msg').textContent = '¡Agregado al carrito!';
    window.dispatchEvent(new Event('cart-updated'));
    setTimeout(() => document.getElementById('add-msg').textContent = '', 1500);
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }
  updateCartCount();
  window.addEventListener('cart-updated', updateCartCount);
}); 