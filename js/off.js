// Daftarkan Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// Listen for messages from Service Worker
navigator.serviceWorker.addEventListener('message', event => {
  if (event.data === 'redirect-to-index' && navigator.onLine) {
    window.location.href = 'index.html';
  }
});

// Cek status koneksi secara periodik
setInterval(() => {
  if (navigator.onLine) {
    window.location.href = 'index.html';
  }
}, 5000); // Cek setiap 5 detik


