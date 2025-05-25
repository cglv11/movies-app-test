import {useInfiniteQuery} from '@tanstack/react-query';
import {getMovies} from '../../actions/get-movies';
import {MovieListEntity} from '../../domain/entities/movieList';
import {MovieCategory} from '../../domain/types/movieCategory';

export const useMoviesInfinite = (category: MovieCategory) => {
  return useInfiniteQuery<MovieListEntity[], Error>({
    queryKey: ['movies', category],
    queryFn: ({pageParam = 1}) => getMovies(pageParam, category),
    staleTime: 1000 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};
