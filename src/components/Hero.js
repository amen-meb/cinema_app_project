// Single Responsibility: renders the auto-playing hero carousel only.

import '../styles/Hero.css';
const IMG_BASE = 'https://image.tmdb.org/t/p/original';

const formatRating = (v) => v ? `⭐ ${Number(v).toFixed(1)}` : '';
const formatYear   = (item) => {
  const raw = item.release_date || item.first_air_date || '';
  return raw ? raw.slice(0, 4) : '';
};

const buildSlide = (item, index) => {
  const bg    = item.backdrop_path ? `${IMG_BASE}${item.backdrop_path}` : '';
  const title = item.title || item.name || 'Untitled';
  const overview = item.overview ? item.overview.slice(0, 200) + (item.overview.length > 200 ? '…' : '') : '';
  const year  = formatYear(item);
  const rating = formatRating(item.vote_average);
  const type  = item.media_type === 'tv' ? 'SERIES' : item.first_air_date ? 'SERIES' : 'MOVIE';
  const linkType = type === 'SERIES' ? 'tv' : 'movie';

  return `
    <div class="hero-slide ${index === 0 ? 'active' : ''}"
         style="background-image: url('${bg}')"
         data-index="${index}">
      <div class="hero-content">
        <span class="hero-badge">${type}</span>
        <h2 class="hero-title">${title}</h2>
        ${overview ? `<p class="hero-overview">${overview}</p>` : ''}
        <div class="hero-meta">
          ${rating ? `<span class="hero-rating">${rating}</span>` : ''}
          ${year   ? `<span class="hero-year">${year}</span>` : ''}
        </div>
        <a href="/details?type=${linkType}&id=${item.id}" data-link class="hero-btn">ℹ️ &nbsp;View Details</a>
      </div>
    </div>
  `;
};

export const Hero = (items = [], badgeOverride = '') => {
  const slides = items.slice(0, 5);
  if (!slides.length) return '';

  const dots = slides.map((_, i) => `
    <button class="hero-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>
  `).join('');

  return `
    <section class="hero" id="hero-section">
      <div class="hero-carousel" id="hero-carousel">
        ${slides.map((item, i) => buildSlide(item, i)).join('')}
      </div>
      <div class="hero-dots" id="hero-dots">${dots}</div>
      <div class="hero-arrows">
        <button class="hero-arrow" id="hero-prev" aria-label="Previous">&#8592;</button>
        <button class="hero-arrow" id="hero-next" aria-label="Next">&#8594;</button>
      </div>
    </section>
  `;
};

export const initHeroCarousel = () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;

  const goTo = (n) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const startAuto = () => {
    timer = setInterval(() => goTo(current + 1), 5000);
  };
  const stopAuto = () => clearInterval(timer);

  document.getElementById('hero-next')?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  document.getElementById('hero-prev')?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(parseInt(dot.dataset.slide));
      startAuto();
    });
  });

  startAuto();
};