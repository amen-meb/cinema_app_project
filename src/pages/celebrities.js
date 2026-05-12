// Renders: Trending celebs hero grid + All celebrities with pagination.

import { peopleService }             from '../api/peopleService.js';
import { Card, SkeletonGrid }        from '../components/Card.js';
import { Pagination, initPagination} from '../components/Pagination.js';
import { Footer }                    from '../components/Footer.js';

import '../styles/celebrities.css';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const PERSON_PH = 'https://placehold.co/300x300/12122a/9898bb?text=No+Photo';

const CelebHeroCard = (person) => {
  const img  = person.profile_path ? `${IMG_BASE}${person.profile_path}` : PERSON_PH;
  const name = person.name || 'Unknown';
  const dept = person.known_for_department || '';
  return `
    <div class="celeb-hero-card" data-id="${person.id}">
      <img src="${img}" alt="${name}" loading="lazy">
      <div class="celeb-hero-name">
        ${name}
        ${dept ? `<br><span class="celeb-hero-dept">${dept}</span>` : ''}
      </div>
    </div>
  `;
};

export const renderCelebrities = async (container) => {
  let currentPage = 1;

  container.innerHTML = `<div class="section-wrapper">${SkeletonGrid(10)}</div>${Footer()}`;

  // Fetch trending (for hero) and first page of popular simultaneously
  const [trending, popularFirst] = await Promise.all([
    peopleService.getTrending(),
    peopleService.getPopular(1),
  ]);

  const heroItems = trending?.results || [];

  const renderList = async () => {
    const data = await peopleService.getPopular(currentPage);
    const results    = data?.results     || [];
    const totalPages = data?.total_pages || 1;

    const listArea = document.getElementById('celebs-list');
    if (listArea) {
      listArea.innerHTML = `
        <div class="grid">${results.map(p => Card(p, 'people')).join('')}</div>
        ${Pagination(currentPage, totalPages)}
      `;
      initPagination((page) => { currentPage = page; renderList(); });
    }
  };

  container.innerHTML = `
    <section class="section-wrapper">
      <div class="section-header">
        <h2 class="section-title">Trending This Week</h2>
      </div>
      <div class="celebrities-hero-grid">
        ${heroItems.slice(0, 5).map(CelebHeroCard).join('')}
      </div>
    </section>
    <section class="section-wrapper" style="padding-top:0;" id="celebs-section">
      <div class="section-header">
        <h2 class="section-title">All Celebrities</h2>
      </div>
      <div id="celebs-list">
        <div class="grid">${SkeletonGrid(10)}</div>
      </div>
    </section>
    ${Footer()}
  `;

  await renderList();
};