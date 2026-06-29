import { useState, useEffect } from 'react'

const PAGE_SIZE = 20
const BASE_URL = 'https://pokeapi.co/api/v2'

export function usePokemonList(page) {
  const [pokemon, setPokemon] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const offset = (page - 1) * PAGE_SIZE

    fetch(`${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: no se pudo obtener la lista.`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setTotalPages(Math.ceil(data.count / PAGE_SIZE))
        return Promise.all(
          data.results.map((p) =>
            fetch(p.url).then((r) => {
              if (!r.ok) throw new Error(`Error al obtener ${p.name}`)
              return r.json()
            })
          )
        )
      })
      .then((details) => {
        if (cancelled) return
        setPokemon(details)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [page])

  return { pokemon, totalPages, loading, error }
}

export function usePokemonDetail(name) {
  const [data, setData] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)
    setSpecies(null)

    fetch(`${BASE_URL}/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error(`No se encontró el Pokémon "${name}".`)
        return res.json()
      })
      .then((pokemon) => {
        if (cancelled) return
        setData(pokemon)
        return fetch(pokemon.species.url)
      })
      .then((res) => {
        if (!res || cancelled) return
        if (!res.ok) return null
        return res.json()
      })
      .then((speciesData) => {
        if (cancelled) return
        setSpecies(speciesData)
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return { data, species, loading, error }
}

export function useSearch(query) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setResult(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setResult(null)

    const timeout = setTimeout(() => {
      fetch(`${BASE_URL}/pokemon/${query.toLowerCase().trim()}`)
        .then((res) => {
          if (!res.ok) throw new Error(`No se encontró "${query}".`)
          return res.json()
        })
        .then((data) => {
          if (cancelled) return
          setResult([data])
          setLoading(false)
        })
        .catch((err) => {
          if (cancelled) return
          setError(err.message)
          setResult([])
          setLoading(false)
        })
    }, 400)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [query])

  return { result, loading, error }
}
