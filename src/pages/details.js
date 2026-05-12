import { fetchData } from '../api/apiConfig.js';
import { Card } from '../components/Card.js';

import '../styles/details.css';
const IMG_BASE = 'https://image.tmdb.org/t/p/w1280';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export const renderDetails = async (container) => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'movie';
  const id = urlParams.get('id');

  if (!id) {
    container.innerHTML = '<div style="padding: 100px; text-align: center;"><h2>Item not found</h2><a href="/" data-link>Go Home</a></div>';
    return;
  }

  container.innerHTML = `
    <div style="padding: 100px; text-align: center;">
      <div class="skeleton-poster" style="width: 200px; height: 300px; margin: 0 auto 20px;"></div>
      <h2>Loading details...</h2>
    </div>
  `;

  try {
    const append = type === 'person' ? 'combined_credits' : 'credits,videos,similar';
    const data = await fetchData(`/${type}/${id}?append_to_response=${append}`);
    
    if (!data) throw new Error('Failed to fetch details');

    const title = data.title || data.name || 'Unknown';
    const backdrop = data.backdrop_path ? `${IMG_BASE}${data.backdrop_path}` : '';
    const poster = data.poster_path || data.profile_path ? `${POSTER_BASE}${data.poster_path || data.profile_path}` : '';
    const overview = data.overview || data.biography || 'No overview available.';
    const releaseDate = data.release_date || data.first_air_date || data.birthday || '';
    const rating = data.vote_average ? `⭐ ${Number(data.vote_average).toFixed(1)}` : '';
    const tagline = data.tagline ? `<p style="font-style: italic; color: var(--text-muted); margin-bottom: 15px; font-size: 1.2rem;">"${data.tagline}"</p>` : '';
    const runtime = data.runtime ? `<span>⏳ ${data.runtime} min</span>` : '';
    const seasons = data.number_of_seasons ? `<span>📺 ${data.number_of_seasons} Seasons</span>` : '';

    // Cast / Known For
    let castHtml = '';
    if (type !== 'person' && data.credits && data.credits.cast && data.credits.cast.length > 0) {
      const topCast = data.credits.cast.slice(0, 8);
      castHtml = `
        <div class="details-section">
          <h2 class="section-title">Top Cast</h2>
          <div class="grid cast-grid">
            ${topCast.map(actor => Card(actor, 'people')).join('')}
          </div>
        </div>
      `;
    } else if (type === 'person' && data.combined_credits && data.combined_credits.cast) {
      const knownFor = data.combined_credits.cast.sort((a, b) => b.vote_count - a.vote_count).slice(0, 10);
      castHtml = `
        <div class="details-section">
          <h2 class="section-title">Known For</h2>
          <div class="grid">
            ${knownFor.map(item => Card(item)).join('')}
          </div>
        </div>
      `;
    }

    // Videos (Trailer)
    let trailerHtml = '';
    if (type !== 'person' && data.videos && data.videos.results) {
      const trailer = data.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') || data.videos.results[0];
      if (trailer && trailer.site === 'YouTube') {
        trailerHtml = `
          <div class="details-section">
            <h2 class="section-title">Trailer</h2>
            <div class="video-container">
              <iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>
            </div>
          </div>
        `;
      }
    }

    // Similar
    let similarHtml = '';
    if (type !== 'person' && data.similar && data.similar.results && data.similar.results.length > 0) {
      const similarItems = data.similar.results.slice(0, 10);
      similarHtml = `
        <div class="details-section similar-section">
          <h2 class="section-title">Similar ${type === 'tv' ? 'Shows' : 'Movies'}</h2>
          <div class="grid">
            ${similarItems.map(item => Card(item, type)).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="details-page">
        <button id="back-btn" class="back-btn" aria-label="Go Back">
          ← Back
        </button>

        ${backdrop ? `
          <div class="details-backdrop" style="background-image: url('${backdrop}')">
            <div class="details-backdrop-overlay"></div>
          </div>
        ` : ''}
        
        <div class="details-container ${backdrop ? 'has-backdrop' : ''}">
          <div class="details-header">
            ${poster ? `
              <div class="details-poster">
                <img src="${poster}" alt="${title}">
              </div>
            ` : ''}
            
            <div class="details-info">
              <h1 class="details-title">${title}</h1>
              ${tagline}
              
              <div class="details-meta">
                ${releaseDate ? `<span class="meta-item">📅 ${releaseDate}</span>` : ''}
                ${rating ? `<span class="meta-item">${rating}</span>` : ''}
                ${runtime ? `<span class="meta-item">${runtime}</span>` : ''}
                ${seasons ? `<span class="meta-item">${seasons}</span>` : ''}
              </div>
              
              <div class="details-overview-wrap">
                <h3 class="details-section-label">Overview</h3>
                <p class="details-overview">${overview}</p>
              </div>
              
              ${data.genres ? `
                <div class="details-genres">
                  ${data.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
          
          ${castHtml}
          ${trailerHtml}
          ${similarHtml}
        </div>
      </div>
    `;
    
    // Add event listener to back button
    const backBtn = container.querySelector('#back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  } catch (err) {
    console.error('Error rendering details:', err);
    container.innerHTML = `
      <div style="padding: 100px; text-align: center;">
        <h2 style="color: var(--accent);">Error loading details</h2>
        <a href="/" data-link>Go Home</a>
      </div>
    `;
  }
};
