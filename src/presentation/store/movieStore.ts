import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {MovieListEntity} from '../../domain/entities/movieList';
import {MovieDetailEntity} from '../../domain/entities/movieDetail';

interface MovieStore {
  // Búsqueda
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Watchlist
  watchlist: MovieDetailEntity[];
  addToWatchlist: (movie: MovieDetailEntity) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      // --- search term ---
      searchTerm: '',
      setSearchTerm: term => set({searchTerm: term}),

      // --- watchlist slice ---
      watchlist: [],
      addToWatchlist: movie =>
        set(state => ({
          watchlist: state.watchlist.find(m => m.id === movie.id)
            ? state.watchlist
            : [...state.watchlist, movie],
        })),
      removeFromWatchlist: movieId =>
        set(state => ({
          watchlist: state.watchlist.filter(m => m.id !== movieId),
        })),
      isInWatchlist: movieId => get().watchlist.some(m => m.id === movieId),
    }),
    {
      name: 'movie-search',
    },
  ),
);
