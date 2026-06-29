import { useParams, Link } from 'react-router-dom'
import { usePokemonDetail } from '../hooks/usePokemon'
import { getTypeColor, formatId, capitalize, getFlavorText } from '../utils/pokemon'
import StatBar from '../components/StatBar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import styles from './PokemonDetail.module.css'

export default function PokemonDetail() {
  const { name } = useParams()
  const { data, species, loading, error } = usePokemonDetail(name)

  if (loading) return <Loader message={`Cargando ${capitalize(name)}...`} />

  if (error) {
    return (
      <div className={styles.centered}>
        <ErrorMessage message={error} />
        <Link to="/" className={styles.backLink}>← Volver al Pokédex</Link>
      </div>
    )
  }

  if (!data) return null

  const sprite =
    data.sprites?.other?.['official-artwork']?.front_default ||
    data.sprites?.front_default
  const shinySprite =
    data.sprites?.other?.['official-artwork']?.front_shiny ||
    data.sprites?.front_shiny

  const flavorText = getFlavorText(species)
  const generation = species?.generation?.name?.replace('generation-', '').toUpperCase()
  const habitat = species?.habitat?.name

  return (
    <main className={styles.main}>
      <Link to="/" className={styles.back}>← Volver al Pokédex</Link>

      <article className={styles.card}>
        <div className={styles.header}>
          <div className={styles.sprites}>
            {sprite && (
              <div className={styles.spriteWrapper}>
                <img src={sprite} alt={data.name} className={styles.sprite} />
                <span className={styles.spriteLabel}>Normal</span>
              </div>
            )}
            {shinySprite && shinySprite !== sprite && (
              <div className={styles.spriteWrapper}>
                <img src={shinySprite} alt={`${data.name} shiny`} className={styles.sprite} />
                <span className={styles.spriteLabel}>✨ Shiny</span>
              </div>
            )}
          </div>

          <div className={styles.info}>
            <span className={styles.id}>{formatId(data.id)}</span>
            <h1 className={styles.name}>{capitalize(data.name)}</h1>

            <div className={styles.types}>
              {data.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={styles.typeBadge}
                  style={{ background: getTypeColor(type.name) }}
                >
                  {capitalize(type.name)}
                </span>
              ))}
            </div>

            {flavorText && <p className={styles.flavor}>{flavorText}</p>}

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Altura</span>
                <span className={styles.metaValue}>{(data.height / 10).toFixed(1)} m</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Peso</span>
                <span className={styles.metaValue}>{(data.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Exp. Base</span>
                <span className={styles.metaValue}>{data.base_experience ?? '—'}</span>
              </div>
              {generation && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Generación</span>
                  <span className={styles.metaValue}>{generation}</span>
                </div>
              )}
              {habitat && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Hábitat</span>
                  <span className={styles.metaValue}>{capitalize(habitat)}</span>
                </div>
              )}
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Felicidad base</span>
                <span className={styles.metaValue}>{species?.base_happiness ?? '—'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Estadísticas base</h2>
            <div className={styles.stats}>
              {data.stats.map(({ stat, base_stat }) => (
                <StatBar key={stat.name} stat={stat.name} value={base_stat} />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <div className={styles.abilities}>
              {data.abilities.map(({ ability, is_hidden }) => (
                <div key={ability.name} className={styles.ability}>
                  <span className={styles.abilityName}>{capitalize(ability.name.replace('-', ' '))}</span>
                  {is_hidden && <span className={styles.hiddenTag}>Oculta</span>}
                </div>
              ))}
            </div>
          </section>

          {data.moves.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Movimientos ({data.moves.length} totales)</h2>
              <div className={styles.moves}>
                {data.moves.slice(0, 20).map(({ move }) => (
                  <span key={move.name} className={styles.move}>
                    {capitalize(move.name.replace('-', ' '))}
                  </span>
                ))}
                {data.moves.length > 20 && (
                  <span className={styles.moreMoves}>+{data.moves.length - 20} más</span>
                )}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
