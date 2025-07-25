document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
  
        if (res.ok) {
          Toastify({
            text: result.message,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#4caf50"
          }).showToast();
          setTimeout(() => window.location.href = '/login', 2600);
        } else {
          Toastify({
            text: result.message || 'Ocurrió un error',
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#e53935"
          }).showToast();
        }
      } catch {
        Toastify({
          text: 'Ocurrió un error inesperado',
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#e53935"
        }).showToast();
      }
    });
});