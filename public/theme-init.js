(function() {
  try {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
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
