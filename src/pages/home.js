// Renders the homepage: Hero (now playing), Trending Movies, Series, People.

import { movieService } from '../api/movieService.js';
import { seriesService } from '../api/seriesService.js';
import { peopleService } from '../api/peopleService.js';
import { Hero, initHeroCarousel } from '../components/Hero.js';
import { Card, SkeletonGrid } from '../components/Card.js';
import { Footer } from '../components/Footer.js';

const SectionRow = (title, id, cards) => `
  <section class="section-wrapper" id="${id}">
    <div class="section-header">
      <h2 class="section-title">${title}</h2>
    </div>
    <div class="grid">${cards}</div>
  </section>
`;

export const renderHome = async (container) => {
  container.innerHTML = `
    <div class="section-wrapper"><div class="skeleton-grid">${SkeletonGrid(10)}</div></div>
    ${Footer()}
  `;

  const [nowPlaying, trendingMovies, trendingSeries, trendingPeople] = await Promise.all([
    movieService.getNowPlaying(),
    movieService.getTrending(),
    seriesService.getTrending(),
    peopleService.getTrending(),
  ]);

  const heroItems = nowPlaying?.results || [];
  const moviesItems = trendingMovies?.results || [];
  const seriesItems = trendingSeries?.results || [];
  const peopleItems = trendingPeople?.results || [];

  container.innerHTML = `
    ${Hero(heroItems)}
    ${SectionRow('Trending Movies', 'trending-movies', moviesItems.slice(0, 10).map(m => Card(m, 'movie')).join(''))}
    ${SectionRow('Trending Series', 'trending-series', seriesItems.slice(0, 10).map(s => Card(s, 'tv')).join(''))}
    ${SectionRow('Trending Celebs', 'trending-people', peopleItems.slice(0, 10).map(p => Card(p, 'people')).join(''))}
    ${Footer()}
  `;

  initHeroCarousel();
};