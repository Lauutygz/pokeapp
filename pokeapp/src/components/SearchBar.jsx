import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar por nombre o número..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  )
}
