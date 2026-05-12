// App entry point — SPA router (Dependency Inversion: pages depend on services, not raw fetch).

import './styles/main.css';
import { themeManager } from './utils/theme.js';
import { Navbar, initNavbar } from './components/Navbar.js';
import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderSeries } from './pages/series.js';
import { renderCelebrities } from './pages/celebrities.js';
import { renderDetails } from './pages/details.js';
import { renderSearch } from './pages/search.js';

// Apply saved/preferred theme before first paint (prevents FOUC)
themeManager.init();

//  Route Map 
// Open/Closed: add a new route here without touching existing pages.
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

  // 1. Paint the navbar immediately (fast feedback)
  appContainer.innerHTML = Navbar();
  initNavbar();

  // 2. Create a dedicated content div below the navbar
  const pageContent = document.createElement('div');
  pageContent.id = 'page-content';
  appContainer.appendChild(pageContent);

  // 3. Render the matching page into that content div
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

  // 4. Remove the initial full-screen loader (only runs once)
  document.getElementById('initial-loader')?.remove();
};

// Navigation (client-side, no full reload)
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
    // Close mobile menu if open
    document.getElementById('nav-menu')?.classList.remove('open');
  }
});

// Back/forward browser buttons
window.addEventListener('popstate', renderPage);

// Custom navigate event from components
window.addEventListener('navigate', renderPage);

// Boot
renderPage();
