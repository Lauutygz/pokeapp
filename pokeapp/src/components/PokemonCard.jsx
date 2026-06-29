import { Link } from 'react-router-dom'
import { getTypeColor, formatId, capitalize } from '../utils/pokemon'
import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon }) {
  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <Link to={`/pokemon/${pokemon.name}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {sprite ? (
          <img src={sprite} alt={pokemon.name} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.noImage}>?</div>
        )}
        <span className={styles.id}>{formatId(pokemon.id)}</span>
      </div>

      <div className={styles.body}>
        <h2 className={styles.name}>{capitalize(pokemon.name)}</h2>

        <div className={styles.types}>
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={styles.badge}
              style={{ background: getTypeColor(type.name) }}
            >
              {capitalize(type.name)}
            </span>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Altura</span>
            <span className={styles.statValue}>{(pokemon.height / 10).toFixed(1)} m</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Peso</span>
            <span className={styles.statValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>HP</span>
            <span className={styles.statValue}>
              {pokemon.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? '—'}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Exp. Base</span>
            <span className={styles.statValue}>{pokemon.base_experience ?? '—'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
