import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface MovieStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    set => ({
      searchTerm: '',
      setSearchTerm: term => set({searchTerm: term}),
    }),
    {
      name: 'movie-search',
    },
  ),
);
