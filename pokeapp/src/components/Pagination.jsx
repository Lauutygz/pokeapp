import styles from './Pagination.module.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = []

  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <nav className={styles.nav} aria-label="Paginación">
      <button
        className={styles.btn}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Primera página"
      >
        «
      </button>
      <button
        className={styles.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {start > 1 && <span className={styles.ellipsis}>…</span>}

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.btn} ${p === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && <span className={styles.ellipsis}>…</span>}

      <button
        className={styles.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        ›
      </button>
      <button
        className={styles.btn}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Última página"
      >
        »
      </button>
    </nav>
  )
}
