import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <img src="/pokeball.svg" alt="PokéApp" className={styles.logo} />
        <span className={styles.brandName}>PokéApp</span>
      </Link>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Pokédex
        </NavLink>
      </nav>
    </header>
  )
}
