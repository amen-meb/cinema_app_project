// Single Responsibility: renders genre sidebar and returns its HTML.

import '../styles/Sidebar.css';
export const Sidebar = (genres = [], activeId = null) => `
  <aside class="sidebar" id="genre-sidebar">
    <p class="sidebar-title">Genres</p>
    <ul class="genre-list" id="genre-list">
      <li>
        <button class="genre-btn ${!activeId ? 'active' : ''}" data-id="" id="genre-all">
          All
        </button>
      </li>
      ${genres.map(g => `
        <li>
          <button class="genre-btn ${activeId == g.id ? 'active' : ''}"
                  data-id="${g.id}" id="genre-${g.id}">
            ${g.name}
          </button>
        </li>
      `).join('')}
    </ul>
  </aside>
`;

// Attaches click handlers. onGenreSelect(genreId) is called with the selected genre id (or '' for All).
export const initSidebar = (onGenreSelect) => {
  document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onGenreSelect(btn.dataset.id);
    });
  });
};