// Manages dark/light theme state and persistence.

const STORAGE_KEY = 'cineverse-theme';
const DARK = 'dark';
const LIGHT = 'light';

export const themeManager = {
  get() {
    return localStorage.getItem(STORAGE_KEY)
      || (window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK);
  },

  set(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  toggle() {
    const next = this.get() === DARK ? LIGHT : DARK;
    this.set(next);
    return next;
  },

  // Apply on page load (call once in main.js before rendering)
  init() {
    this.set(this.get());
  },

  isDark() { return this.get() === DARK; },
};
