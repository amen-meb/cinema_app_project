import { fetchData } from '../api/apiConfig.js';
import { Card, SkeletonGrid } from '../components/Card.js';

export const renderSearch = async (container) => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';

  if (!query) {
    container.innerHTML = `
      <div class="section-wrapper" style="text-align: center; padding: 100px 20px;">
        <h2>Please enter a search term</h2>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="section-wrapper">
      <div class="section-header">
        <h2 class="section-title">Search Results for "${query}"</h2>
      </div>
      ${SkeletonGrid(10)}
    </div>
  `;

  try {
    const data = await fetchData(`/search/multi?query=${encodeURIComponent(query)}`);
    
    if (!data || !data.results || data.results.length === 0) {
      container.innerHTML = `
        <div class="section-wrapper" style="text-align: center; padding: 100px 20px;">
          <h2>No results found for "${query}"</h2>
          <p style="color: var(--text-secondary); margin-top: 10px;">Try adjusting your search term.</p>
        </div>
      `;
      return;
    }

    // Filter out items without an image if needed, or just show them
    const validResults = data.results.filter(item => 
      item.media_type !== 'person' || (item.media_type === 'person' && item.profile_path)
    );

    container.innerHTML = `
      <div class="section-wrapper">
        <div class="section-header">
          <h2 class="section-title">Search Results for "${query}"</h2>
        </div>
        <div class="grid">
          ${validResults.map(item => Card(item, item.media_type === 'person' ? 'people' : item.media_type)).join('')}
        </div>
      </div>
    `;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (err) {
    console.error('Search error:', err);
    container.innerHTML = `
      <div class="section-wrapper" style="text-align: center; padding: 100px 20px;">
        <h2 style="color: var(--accent);">Failed to load search results</h2>
      </div>
    `;
  }
};
