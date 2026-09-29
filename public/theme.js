// Runs before first paint. External file so the CSP (script-src 'self') allows it.
// Marks JS as available (global.css shows the theme/menu buttons and closes the drawer)
// and applies the theme: light unless the visitor chose dark.
document.documentElement.classList.add('js');
document.documentElement.dataset.theme = 'light';
try {
  if (localStorage.getItem('theme') === 'dark') delete document.documentElement.dataset.theme;
} catch (e) {}
