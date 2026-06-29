import { formatStatName } from '../utils/pokemon'
import styles from './StatBar.module.css'

export default function StatBar({ stat, value }) {
  const max = 255
  const pct = Math.round((value / max) * 100)
  const color = value >= 80 ? '#4caf50' : value >= 50 ? '#ff9800' : '#e53935'

  return (
    <div className={styles.row}>
      <span className={styles.label}>{formatStatName(stat)}</span>
      <span className={styles.value}>{value}</span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
