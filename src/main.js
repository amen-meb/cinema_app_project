// SPA router

import './styles/main.css';
import { themeManager } from './utils/theme.js';
import { Navbar, initNavbar } from './components/Navbar.js';
import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderSeries } from './pages/series.js';
import { renderCelebrities } from './pages/celebrities.js';
import { renderDetails } from './pages/details.js';
import { renderSearch } from './pages/search.js';

// Apply saved theme before first paint
themeManager.init();

// Router map
const routes = {
  '/': renderHome,
  '/movies': renderMovies,
  '/series': renderSeries,
  '/celebrities': renderCelebrities,
  '/details': renderDetails,
  '/search': renderSearch,
};

//  Router
const appContainer = document.getElementById('app');

const renderPage = async () => {
  const path = window.location.pathname;
  const renderFunc = routes[path] || renderHome;

  // Paint navbar
  appContainer.innerHTML = Navbar();
  initNavbar();

  // Create page con tent div below navbar
  const pageContent = document.createElement('div');
  pageContent.id = 'page-content';
  appContainer.appendChild(pageContent);

  // Render matching page
  try {
    await renderFunc(pageContent);
  } catch (err) {
    console.error('Page render error:', err);
    pageContent.innerHTML = `
      <div style="text-align:center;padding:120px 20px;">
        <h1 style="font-size:4rem;color:var(--accent);margin-bottom:16px;">Oops!</h1>
        <p style="color:var(--text-secondary);font-size:1.1rem;margin-bottom:32px;">
          Something went wrong loading this page. Check your API key in the <code>.env</code> file.
        </p>
        <a href="/" data-link style="color:var(--accent);font-weight:700;">← Go Home</a>
      </div>
    `;
  }

  // Remove initial loader
  document.getElementById('initial-loader')?.remove();
};

// Navigation
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (!link) return;
  e.preventDefault();
  const href = link.getAttribute('href');
  if (href) {
    if (href !== window.location.pathname) {
      window.history.pushState(null, null, href);
      renderPage();
    }
    window.scrollTo(0, 0);
    document.getElementById('nav-menu')?.classList.remove('open');
  }
});

// Back/forward buttons
window.addEventListener('popstate', renderPage);

// Custom navigate event from components
window.addEventListener('navigate', renderPage);

// Boot
renderPage();
