// Single Responsibility: renders + manages the navigation bar and theme toggle.

import { themeManager } from '../utils/theme.js';

import '../styles/Navbar.css';
export const Navbar = () => `
  <nav class="navbar" id="main-navbar">
    <a href="/" data-link class="navbar-logo">
      <img src="./image.png" alt="CineVerse Logo">
    </a>
    <ul class="nav-links" id="nav-menu">
      <li><a href="/"            data-link id="nav-home">Home</a></li>
      <li><a href="/movies"      data-link id="nav-movies">Movies</a></li>
      <li><a href="/series"      data-link id="nav-series">Series</a></li>
      <li><a href="/celebrities" data-link id="nav-celebrities">Celebrities</a></li>
    </ul>
    <div class="nav-right">
      <form id="nav-search-form" class="nav-search">
        <input type="text" id="nav-search-input" placeholder="Search for a movie or shows" autocomplete="off" aria-label="Search" required>
        <button type="submit" aria-label="Submit search">
            <i class="fa-solid fa-magnifying-glass"></i>
            🔍
        </button>
      </form>
      <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
`;

export const initNavbar = () => {
  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => menu.classList.toggle('open'));
  }


  // Search form logic
  const searchForm = document.getElementById('nav-search-form');
  const searchInput = document.getElementById('nav-search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.history.pushState(null, null, `/search?q=${encodeURIComponent(query)}`);
        const navEvent = new CustomEvent('navigate');
        window.dispatchEvent(navEvent);
      }
    });
  }

  // Highlight active nav link
  const path = window.location.pathname;
  const map = {
    '/': 'nav-home',
    '/movies': 'nav-movies',
    '/series': 'nav-series',
    '/celebrities': 'nav-celebrities',
  };
  const activeId = map[path];
  if (activeId) {
    document.getElementById(activeId)?.classList.add('active');
  }
};