// Single Responsibility: renders pagination controls.
// Receives currentPage, totalPages and returns HTML + an init function.

import '../styles/main.css';
export const Pagination = (currentPage, totalPages) => {
  const safeTotal = Math.min(totalPages, 500); // TMDB caps at 500
  if (safeTotal <= 1) return '';

  // Build page number buttons (window of 5 around current)
  const pages = [];
  const delta = 2;
  const start = Math.max(1, currentPage - delta);
  const end = Math.min(safeTotal, currentPage + delta);

  if (start > 1) pages.push(1, start > 2 ? '…' : null);
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < safeTotal) pages.push(end < safeTotal - 1 ? '…' : null, safeTotal);

  const pageButtons = pages.filter(p => p !== null).map(p =>
    p === '…'
      ? `<span class="page-info">…</span>`
      : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}" ${p === currentPage ? 'aria-current="page"' : ''}>${p}</button>`
  ).join('');

  return `
    <div class="pagination" id="pagination">
      <button class="page-btn" id="prev-btn" ${currentPage <= 1 ? 'disabled' : ''} data-page="${currentPage - 1}">&#8592; Prev</button>
      ${pageButtons}
      <button class="page-btn" id="next-btn" ${currentPage >= safeTotal ? 'disabled' : ''} data-page="${currentPage + 1}">Next &#8594;</button>
    </div>
  `;
};

// Attaches click handlers to all page buttons. onPageChange(page) is called with the new page number.
export const initPagination = (onPageChange) => {
  document.getElementById('pagination')?.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      if (!isNaN(page)) {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
};