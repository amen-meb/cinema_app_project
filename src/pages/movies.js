// Renders: Hero (now playing) + Trending row + Sidebar genres + Genre movies + Pagination

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
  let genreName = 'Popular Movies';
  let genres = [];

  // Initial skeleton
  container.innerHTML = `<div class="section-wrapper">${SkeletonGrid(10)}</div>${Footer()}`;

  // Fetch genres + hero data in parallel
  const [genreData, nowPlaying, trending] = await Promise.all([
    genreService.getMovieGenres(),
    movieService.getNowPlaying(),
    movieService.getTrending(),
  ]);

  genres = genreData?.genres || [];
  const heroItems = nowPlaying?.results || [];
  const trendItems = trending?.results || [];

  const renderContent = async () => {
    document.getElementById('movies-grid')?.replaceWith(
      Object.assign(document.createElement('div'), { id: 'movies-grid', innerHTML: SkeletonGrid(10) })
    );

    const data = currentGenre
      ? await movieService.getMoviesByGenre(currentGenre, currentPage)
      : await movieService.getPopular(currentPage);

    const results = data?.results || [];
    const totalPages = data?.total_pages || 1;

    const gridHTML = results.length
      ? results.map(m => Card(m, 'movie')).join('')
      : '<p style="color:var(--text-secondary);padding:40px 0;">No movies found.</p>';

    // Replace only the content area (sidebar stays mounted)
    const contentArea = document.getElementById('movies-content');
    if (contentArea) {
      contentArea.innerHTML = `
        <h2 class="section-title" style="margin-bottom:20px;">${genreName}</h2>
        <div class="grid" id="movies-grid">${gridHTML}</div>
        ${Pagination(currentPage, totalPages)}
      `;
      initPagination((page) => { currentPage = page; renderContent(); });
    }
  };

  // Build full page layout once
  container.innerHTML = `
    ${Hero(heroItems)}
    <section class="section-wrapper">
      <div class="section-header">
        <h2 class="section-title">Trending This Week</h2>
      </div>
      <div class="grid">${trendItems.slice(0, 7).map(m => Card(m, 'movie')).join('')}</div>
    </section>
    <div class="main-layout">
      ${Sidebar(genres, '')}
      <div class="content-area" id="movies-content">
        <h2 class="section-title" style="margin-bottom:20px;">Popular Movies</h2>
        <div class="grid" id="movies-grid">${SkeletonGrid(10)}</div>
      </div>
    </div>
    ${Footer()}
  `;

  initHeroCarousel();

  // Wire up sidebar
  initSidebar((genreId) => {
    currentGenre = genreId;
    currentPage = 1;
    const genre = genres.find(g => String(g.id) === String(genreId));
    genreName = genre ? `${genre.name} Movies` : 'Popular Movies';
    renderContent();
  });

  await renderContent();
};