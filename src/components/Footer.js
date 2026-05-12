// Single Responsibility: renders the site footer only.

import '../styles/Footer.css';

export const Footer = () => `
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-logo"><a href="/" data-link>CineVerse</a></div>
        <p class="footer-brand-desc">
          Your ultimate cinema discovery platform. Explore trending movies,
          binge-worthy series, and the most celebrated celebrities — all in one place.
        </p>
      </div>
      <div>
        <p class="footer-heading">Quick Links</p>
        <ul class="footer-links">
          <li><a href="/" data-link>Home</a></li>
          <li><a href="/movies" data-link>Movies</a></li>
          <li><a href="/series" data-link>Series</a></li>
          <li><a href="/celebrities" data-link>Celebrities</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Discover By:</p>
        <div class="footer-contact">
          <p>Amanuel Mebratu Awacho</p>
          <p>Email: <a href="mailto:amanuelmebratu1@gmail.com">amanuelmebratu1@gmail.com</a></p>
          <p>Tel: +251925386342</p>
          <p>Addis Ababa, Ethiopia</p>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="portfolio-link">
            My Portfolio
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 5px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 22 3 22 10"></polyline><line x1="14" y1="10" x2="22" y2="2"></line></svg>
          </a>
        </div>
      </div>
      <div>
        <p class="footer-heading">Show Your Support</p>
        <div class="footer-socials">
          <a href="https://github.com/amen-meb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://t.me/@amen_meb" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
          <a href="mailto:amanuelmebratu1@gmail.com" aria-label="Gmail">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://instagram.com/amen_meb" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} CineVerse. All rights reserved.</span>
      <span class="footer-tmdb">
        Data provided by
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" style="color: var(--accent2); margin-left:4px;">TMDB</a>
      </span>
    </div>
  </footer>
`;