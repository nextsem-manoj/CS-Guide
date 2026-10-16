(function() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch (e) {}
})();
window.addEventListener('error', function(e) {
  var target = e.target;
  if (target && target.tagName === 'LINK' && target.rel === 'stylesheet') {
    console.warn('CSS Chunk load failed. Force reloading client...');
    if ('caches' in window) {
      caches.keys().then(function(names) {
        names.forEach(function(name) { caches.delete(name); });
      }).then(function() {
        window.location.reload(true);
      });
    } else {
      window.location.reload(true);
    }
  }
}, true);
