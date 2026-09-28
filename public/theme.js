// Applies the saved theme before first paint. External file so the CSP (script-src 'self') allows it.
try {
  if (localStorage.getItem('theme') === 'light') document.documentElement.dataset.theme = 'light';
} catch (e) {}
