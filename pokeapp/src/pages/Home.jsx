import { useState } from 'react'
import { usePokemonList, useSearch } from '../hooks/usePokemon'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import styles from './Home.module.css'

export default function Home() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const isSearching = query.trim().length > 0

  const { pokemon, totalPages, loading, error } = usePokemonList(isSearching ? 0 : page)
  const { result: searchResult, loading: searchLoading, error: searchError } = useSearch(query)

  const displayList = isSearching ? searchResult : pokemon
  const isLoading = isSearching ? searchLoading : loading
  const currentError = isSearching ? searchError : error

  function handleQueryChange(val) {
    setQuery(val)
    setPage(1)
  }

  function handlePageChange(newPage) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Pokédex</h1>
        <p className={styles.subtitle}>
          Explorá los {isSearching ? '' : '1000+'} Pokémon de todas las generaciones
        </p>
        <SearchBar value={query} onChange={handleQueryChange} />
      </section>

      {isLoading && <Loader message="Cargando Pokémon..." />}

      {!isLoading && currentError && (
        <ErrorMessage message={currentError} />
      )}

      {!isLoading && !currentError && displayList && displayList.length === 0 && (
        <div className={styles.empty}>
          <span>😔</span>
          <p>No se encontraron resultados para <strong>"{query}"</strong>.</p>
        </div>
      )}

      {!isLoading && !currentError && displayList && displayList.length > 0 && (
        <>
          {isSearching && (
            <p className={styles.searchInfo}>
              {displayList.length} resultado{displayList.length !== 1 ? 's' : ''} para "{query}"
            </p>
          )}
          <div className={styles.grid}>
            {displayList.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        </>
      )}

      {!isSearching && !isLoading && totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <p className={styles.pageInfo}>
            Página {page} de {totalPages}
          </p>
        </div>
      )}
    </main>
  )
}
