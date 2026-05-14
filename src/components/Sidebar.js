import '../styles/Sidebar.css';

export const Sidebar = (genres = [], activeId = null) => `
  <aside class="sidebar">
    <h3 class="sidebar-title">Genres</h3>
    <ul class="genre-list" id="genre-list">
      <li>
        <button class="genre-btn ${!activeId ? 'active' : ''}" data-id="">
          All Movies
        </button>
      </li>
      ${genres.map(g => `
        <li>
          <button class="genre-btn ${String(activeId) === String(g.id) ? 'active' : ''}"
                  data-id="${g.id}">
            ${g.name}
          </button>
        </li>
      `).join('')}
    </ul>
  </aside>
`;

export const initSidebar = (onGenreSelect) => {
  document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onGenreSelect(btn.dataset.id);
    });
  });
};