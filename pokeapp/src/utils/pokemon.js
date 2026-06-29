export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}

export function getTypeColor(type) {
  return TYPE_COLORS[type] || '#777'
}

export function formatStatName(stat) {
  const names = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'At. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidad',
  }
  return names[stat] || stat
}

export function formatId(id) {
  return `#${String(id).padStart(4, '0')}`
}

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getFlavorText(species) {
  if (!species) return null
  const entry = species.flavor_text_entries?.find((e) => e.language.name === 'es') ||
    species.flavor_text_entries?.find((e) => e.language.name === 'en')
  return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : null
}
