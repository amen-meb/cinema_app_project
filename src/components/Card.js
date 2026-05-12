// Single Responsibility: render a single media card.
// Liskov: MovieCard, SeriesCard, and PeopleCard all share this base.

import '../styles/Card.css';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://placehold.co/300x450/12122a/9898bb?text=No+Image';
const PERSON_PH   = 'https://placehold.co/300x300/12122a/9898bb?text=No+Photo';

export const Card = (item, type = 'default') => {
  const isPerson = type === 'people' || (!item.poster_path && item.profile_path);
  const title    = item.title || item.name || 'Unknown';
  const imgPath  = item.poster_path || item.profile_path;
  const img      = imgPath
    ? `${IMG_BASE}${imgPath}`
    : (isPerson ? PERSON_PH : PLACEHOLDER);
  const rating   = item.vote_average
    ? `<span class="card-rating">⭐ ${Number(item.vote_average).toFixed(1)}</span>`
    : '';
  const year     = item.release_date || item.first_air_date
    ? (item.release_date || item.first_air_date).slice(0, 4)
    : '';
  const overview = item.overview || item.known_for_department || '';
  const metaText = isPerson
    ? (item.known_for_department || '')
    : year;

  const itemType = isPerson ? 'person' : (item.first_air_date ? 'tv' : 'movie');

  return `
    <a href="/details?type=${itemType}&id=${item.id}" 
       class="card ${isPerson ? 'people-card' : ''}" 
       data-link 
       aria-label="${title}">
      <div class="card-poster-wrap">
        <img src="${img}" alt="${title}" loading="lazy">
        ${rating}
        ${overview ? `<div class="card-overlay"><p class="card-overlay-text">${overview.slice(0, 120)}${overview.length > 120 ? '…' : ''}</p></div>` : ''}
      </div>
      <div class="card-info">
        <p class="card-title" title="${title}">${title}</p>
        ${metaText ? `<p class="card-meta">${metaText}</p>` : ''}
      </div>
    </a>
  `;
};

export const SkeletonGrid = (count = 10) => `
  <div class="skeleton-grid">
    ${'<div class="skeleton-card"><div class="skeleton-poster"></div><div class="skeleton-info"><div class="skeleton-line"></div><div class="skeleton-line short"></div></div></div>'.repeat(count)}
  </div>
`;