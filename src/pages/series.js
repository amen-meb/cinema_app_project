
// Mirrors movies.js but for TV series — reuses same components (LSP, OCP).

import { seriesService } from '../api/seriesService.js';
import { genreService }  from '../api/genreService.js';
import { Hero, initHeroCarousel }    from '../components/Hero.js';
import { Card, SkeletonGrid }        from '../components/Card.js';
import { Sidebar, initSidebar }      from '../components/Sidebar.js';
import { Pagination, initPagination} from '../components/Pagination.js';
import { Footer }                    from '../components/Footer.js';

export const renderSeries = async (container) => {
  let currentGenre = '';
  let currentPage  = 1;
  let genreName    = 'Popular Series';
  let genres       = [];

  container.innerHTML = `<div class="section-wrapper">${SkeletonGrid(10)}</div>${Footer()}`;

  const [genreData, onAir, trending] = await Promise.all([
    genreService.getTVGenres(),
    seriesService.getOnTheAir(),
    seriesService.getTrending(),
  ]);

  genres = genreData?.genres || [];
  const heroItems  = onAir?.results   || [];
  const trendItems = trending?.results || [];

  const renderContent = async () => {
    const data = currentGenre
      ? await seriesService.getSeriesByGenre(currentGenre, currentPage)
      : await seriesService.getPopular(currentPage);

    const results    = data?.results     || [];
    const totalPages = data?.total_pages || 1;

    const gridHTML = results.length
      ? results.map(s => Card(s, 'tv')).join('')
      : '<p style="color:var(--text-secondary);padding:40px 0;">No series found.</p>';

    const contentArea = document.getElementById('series-content');
    if (contentArea) {
      contentArea.innerHTML = `
        <h2 class="section-title" style="margin-bottom:20px;">${genreName}</h2>
        <div class="grid" id="series-grid">${gridHTML}</div>
        ${Pagination(currentPage, totalPages)}
      `;
      initPagination((page) => { currentPage = page; renderContent(); });
    }
  };

  container.innerHTML = `
    ${Hero(heroItems)}
    <section class="section-wrapper">
      <div class="section-header">
        <h2 class="section-title">Trending This Week</h2>
      </div>
      <div class="grid">${trendItems.slice(0,10).map(s => Card(s,'tv')).join('')}</div>
    </section>
    <div class="main-layout">
      ${Sidebar(genres, '')}
      <div class="content-area" id="series-content">
        <h2 class="section-title" style="margin-bottom:20px;">Popular Series</h2>
        <div class="grid" id="series-grid">${SkeletonGrid(10)}</div>
      </div>
    </div>
    ${Footer()}
  `;

  initHeroCarousel();

  initSidebar((genreId) => {
    currentGenre = genreId;
    currentPage  = 1;
    const genre  = genres.find(g => String(g.id) === String(genreId));
    genreName    = genre ? `${genre.name} Series` : 'Popular Series';
    renderContent();
  });

  await renderContent();
};
