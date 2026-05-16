import '../styles/Hero.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/original';

// Helper to simulate genres if not provided by API
const getPlaceholderGenres = (item) => {
  if (item.genre_names) return item.genre_names;
  return ['Action', 'Adventure', 'Drama'];
};
//
const buildSlide = (item, index) => {
  const bg = item.backdrop_path ? `${IMG_BASE}${item.backdrop_path}` : '';
  const title = item.title || item.name || 'Untitled';
  const overview = item.overview || '';
  const genres = getPlaceholderGenres(item);

  return `
    <div class="hero-slide ${index === 0 ? 'active' : ''}"
         style="background-image: url('${bg}')"
         data-index="${index}">
      <div class="hero-content">
        <div class="hero-badges-container">
            ${genres.map(g => `<span class="hero-badge">${g}</span>`).join('')}
        </div>
        <h2 class="hero-title">${title}</h2>
        <p class="hero-overview">${overview}</p>
        <a href="/details?id=${item.id}" data-link class="hero-btn">
            Detail <span style="margin-left:5px">></span>
        </a>
      </div>
    </div>
  `;
};
//
export const Hero = (items = []) => {
  const slides = items.slice(0, 5);
  if (!slides.length) return '';

  return `
    <section class="hero">
      <div class="hero-carousel" id="hero-carousel">
        ${slides.map((item, i) => buildSlide(item, i)).join('')}
      </div>
      
      <!-- Positioned at the sides -->
      <button class="hero-arrow" id="hero-prev" aria-label="Previous">❮</button>
      <button class="hero-arrow" id="hero-next" aria-label="Next">❯</button>
    </section>
  `;
};

export const initHeroCarousel = () => {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  const goTo = (n) => {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
  };

  const startAuto = () => timer = setInterval(() => goTo(current + 1), 6000);
  const stopAuto = () => clearInterval(timer);

  document.getElementById('hero-next')?.addEventListener('click', () => {
    stopAuto(); goTo(current + 1); startAuto();
  });
  document.getElementById('hero-prev')?.addEventListener('click', () => {
    stopAuto(); goTo(current - 1); startAuto();
  });

  startAuto();
};