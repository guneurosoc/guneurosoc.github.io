// Runs before first paint. External file so the CSP (script-src 'self') allows it.
// Marks JS as available (global.css shows the theme/menu buttons and closes the drawer)
// and applies the saved theme.
document.documentElement.classList.add('js');
try {
  if (localStorage.getItem('theme') === 'light') document.documentElement.dataset.theme = 'light';
} catch (e) {}
