import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { URL_API, API } from '../utils/contants'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Network response was not ok')
  }
  return res.json()
}

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popular', page],
    queryFn: () => fetcher(`${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=${page}`),
    keepPreviousData: true,
  })
}

export const useNowPlaying = (page = 1) => {
  return useQuery({
    queryKey: ['now_playing', page],
    queryFn: () => fetcher(`${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=${page}`),
    keepPreviousData: true,
  })
}

export const useTopRated = (page = 1) => {
  return useQuery({
    queryKey: ['top_rated', page],
    queryFn: () => fetcher(`${URL_API}/movie/top_rated?api_key=${API}&language=es-ES&page=${page}`),
    keepPreviousData: true,
  })
}

export const useMovie = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetcher(`${URL_API}/movie/${id}?api_key=${API}&language=es-ES`),
    enabled: !!id,
  })
}

export const useMovieVideos = (id) => {
  return useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => fetcher(`${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`),
    enabled: !!id,
  })
}

export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => fetcher(`${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`),
    enabled: !!query,
    keepPreviousData: true,
  })
}

// Favorites (mock via localStorage) - usamos React Query para invalidar y sincronizar
const FAVORITES_KEY = 'favorites_v1'

const readFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')

const writeFavorites = (list) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(list))

export const useFavorites = () => {
  return useQuery({ queryKey: ['favorites'], queryFn: () => readFavorites() })
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (movie) => {
      const fav = readFavorites()
      if (!fav.find((m) => m.id === movie.id)) {
        fav.push(movie)
        writeFavorites(fav)
      }
      return movie
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] })
  })
}

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (movieId) => {
      const fav = readFavorites().filter((m) => m.id !== movieId)
      writeFavorites(fav)
      return movieId
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] })
  })
}

export default null
