// Renders: Hero + Trending row + Sidebar genres + Genre movies + Pagination

import { movieService } from '../api/movieService.js';
import { genreService } from '../api/genreService.js';
import { Hero, initHeroCarousel } from '../components/Hero.js';
import { Card, SkeletonGrid } from '../components/Card.js';
import { Sidebar, initSidebar } from '../components/Sidebar.js';
import { Pagination, initPagination } from '../components/Pagination.js';
import { Footer } from '../components/Footer.js';

export const renderMovies = async (container) => {
  let currentGenre = '';
  let currentPage = 1;
  let genreName = 'Action & Adventure'; // Defaulting to design's title
  let genres = [];

  // Initial skeleton
  container.innerHTML = `<div class="section-wrapper">${SkeletonGrid(10)}</div>${Footer()}`;

  // Fetch data
  const [genreData, nowPlaying, trending] = await Promise.all([
    genreService.getMovieGenres(),
    movieService.getNowPlaying(),
    movieService.getTrending(),
  ]);

  genres = genreData?.genres || [];
  const heroItems = nowPlaying?.results || [];
  const trendItems = trending?.results || [];

  const renderContent = async () => {
    const moviesContent = document.getElementById('movies-content');
    if (!moviesContent) return;

    // Show skeleton while loading new genre/page
    moviesContent.innerHTML = `
        <h2 class="category-title">${genreName}</h2>
        <div class="grid">${SkeletonGrid(12)}</div>
    `;

    const data = currentGenre
      ? await movieService.getMoviesByGenre(currentGenre, currentPage)
      : await movieService.getPopular(currentPage);

    const results = data?.results || [];
    const totalPages = data?.total_pages || 1;

    // Logic: First card (index 0) is featured to match the "Mickey 17" look
    const gridHTML = results.length
      ? results.map((m, index) => Card(m, 'movie', index === 0)).join('')
      : '<p style="color:var(--text-secondary);padding:40px 0;">No movies found.</p>';

    moviesContent.innerHTML = `
        <h2 class="category-title">${genreName}</h2>
        <div class="grid" id="movies-grid">${gridHTML}</div>
        ${Pagination(currentPage, totalPages)}
    `;

    initPagination((page) => {
      currentPage = page;
      renderContent();
      // Scroll to top of section rather than whole page for better UX
      document.querySelector('.movies-page-container').scrollIntoView({ behavior: 'smooth' });
    });
  };

  // BUILD MAIN PAGE STRUCTURE
  container.innerHTML = `
    ${Hero(heroItems)}

    <!-- 1. Trending Section -->
    <section class="section-wrapper">
      <h2 class="section-title">Trending Movies</h2>
      <div class="grid">
        ${trendItems.slice(0, 5).map((m, i) => Card(m, 'movie', i === 0)).join('')}
      </div>
    </section>

    <!-- 2. Main Sidebar + Genre Grid Layout -->
    <div class="movies-page-container">
      ${Sidebar(genres, currentGenre)}
      
      <main class="movies-main-content" id="movies-content">
        <!-- Content injected by renderContent() -->
      </main>
    </div>

    ${Footer()}
  `;

  initHeroCarousel();

  initSidebar((genreId) => {
    currentGenre = genreId;
    currentPage = 1;
    const genre = genres.find(g => String(g.id) === String(genreId));
    genreName = genre ? genre.name : 'Popular Movies';
    renderContent();
  });

  // Load initial content
  await renderContent();
};