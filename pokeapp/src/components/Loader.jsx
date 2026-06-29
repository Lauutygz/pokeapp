import styles from './Loader.module.css'

export default function Loader({ message = 'Cargando...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pokeball}>
        <div className={styles.top} />
        <div className={styles.divider} />
        <div className={styles.button} />
        <div className={styles.bottom} />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
