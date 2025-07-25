// public/js/logout.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');
    if (!logoutLink) return;
  
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/api/sessions/logout', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await res.json();
  
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: res.ok ? "#4caf50" : "#e53935"
        }).showToast();
  
        if (res.ok) {
          setTimeout(() => window.location.href = '/login', 3200);
        }
      } catch (err) {
        Toastify({
          text: 'Error al cerrar sesión',
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#e53935"
        }).showToast();
      }
    });
  });
  