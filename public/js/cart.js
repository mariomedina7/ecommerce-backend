document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutMsg = document.getElementById('checkout-msg');

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>El carrito está vacío.</p>';
      cartTotal.textContent = '';
      checkoutBtn.disabled = true;
      return;
    }
    cartItems.innerHTML = cart.map((item, idx) => `
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;border-bottom:1px solid #eee;padding-bottom:1rem;">
        <div style="flex:1;">
          <b>${item.title}</b><br>
          <span>Precio: $${item.price}</span><br>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <button class="qty-btn" data-idx="${idx}" data-action="dec">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-idx="${idx}" data-action="inc">+</button>
        </div>
        <button class="remove-btn" data-idx="${idx}" style="color:red;">Eliminar</button>
      </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
  }

  cartItems.addEventListener('click', e => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (e.target.classList.contains('qty-btn')) {
      const idx = +e.target.dataset.idx;
      const action = e.target.dataset.action;
      if (action === 'inc') cart[idx].quantity++;
      if (action === 'dec' && cart[idx].quantity > 1) cart[idx].quantity--;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      window.dispatchEvent(new Event('cart-updated'));
    }
    if (e.target.classList.contains('remove-btn')) {
      const idx = +e.target.dataset.idx;
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      window.dispatchEvent(new Event('cart-updated'));
    }
  });

  checkoutBtn.onclick = () => {
    localStorage.removeItem('cart');
    renderCart();
    window.dispatchEvent(new Event('cart-updated'));
    checkoutMsg.textContent = '¡Compra confirmada!';
    setTimeout(() => checkoutMsg.textContent = '', 2000);
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }

  renderCart();
  updateCartCount();
  window.addEventListener('cart-updated', updateCartCount);
}); 