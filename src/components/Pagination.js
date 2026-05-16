import '../styles/Pagination.css';

// Renders the pagination HTML string.
// delta-based window to show current pages and an ellipsis for the last page.
export const Pagination = (currentPage, totalPages) => {
  const safeTotal = Math.min(totalPages, 50);
  if (safeTotal <= 1) return '';

  const pages = [];
  const delta = 2;
  const start = Math.max(1, currentPage - delta);
  const end = Math.min(safeTotal, currentPage + delta);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('…');
  }

  // Add the range of pages around current
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (end < safeTotal) {
    if (end < safeTotal - 1) pages.push('…');
    pages.push(safeTotal);
  }

  // Map the pages array to HTML buttons
  const pageButtons = pages.map(p =>
    p === '…'
      ? `<span class="page-info">…</span>`
      : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
  ).join('');

  return `
    <div class="pagination-container">
      <div class="pagination" id="pagination">
        <!-- Previous Arrow -->
        <button class="page-btn nav-btn" id="prev-btn" ${currentPage <= 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            &lsaquo;
        </button>
        
        ${pageButtons}
        
        <!-- Next Arrow -->
        <button class="page-btn nav-btn" id="next-btn" ${currentPage >= safeTotal ? 'disabled' : ''} data-page="${currentPage + 1}">
            &rsaquo;
        </button>
      </div>
    </div>
  `;
};


export const initPagination = (onPageChange) => {
  const paginationEl = document.getElementById('pagination');
  if (!paginationEl) return;

  paginationEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(btn.dataset.page);
      if (!isNaN(page)) {
        onPageChange(page);
        window.scrollTo({ top: 550, behavior: 'smooth' });
      }
    });
  });
};

