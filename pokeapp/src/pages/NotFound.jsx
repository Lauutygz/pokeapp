import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.number}>404</div>
      <h1 className={styles.title}>¡Pokémon no encontrado!</h1>
      <p className={styles.subtitle}>
        Esta ruta no existe en nuestra Pokédex. ¿Escapó hacia la hierba alta?
      </p>
      <Link to="/" className={styles.btn}>← Volver al Pokédex</Link>
    </main>
  )
}
