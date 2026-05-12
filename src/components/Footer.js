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
        <p class="footer-heading">Navigate</p>
        <ul class="footer-links">
          <li><a href="/"            data-link>Home</a></li>
          <li><a href="/movies"      data-link>Movies</a></li>
          <li><a href="/series"      data-link>Series</a></li>
          <li><a href="/celebrities" data-link>Celebrities</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Discover</p>
        <ul class="footer-links">
          <li><a href="/movies"      data-link>Now Playing</a></li>
          <li><a href="/series"      data-link>On The Air</a></li>
          <li><a href="/celebrities" data-link>Trending People</a></li>
        </ul>
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