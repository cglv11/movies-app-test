import {useQuery} from '@tanstack/react-query';
import {MovieDetailEntity} from '../../domain/entities/movieDetail';
import {getMovieById} from '../../actions/get-movie-by-id';
import {getMovieCast} from '../../actions/get-movie-cast';
import {MovieCastEntity} from '../../domain/entities/cast';

export function useMovieDetails(movieId?: number) {
  const movieQuery = useQuery<MovieDetailEntity, Error>({
    queryKey: ['movieDetails', movieId],
    queryFn: () => {
      if (!movieId) throw new Error('movieId is required');
      return getMovieById(movieId);
    },
    enabled: !!movieId,
  });

  const castQuery = useQuery<MovieCastEntity[], Error>({
    queryKey: ['movieCast', movieId],
    queryFn: () => {
      if (!movieId) throw new Error('movieId is required');
      return getMovieCast(movieId);
    },
    enabled: !!movieId,
  });

  return {
    movie: movieQuery.data,
    cast: castQuery.data || [],
    isLoading: movieQuery.isLoading || castQuery.isLoading,
    error: movieQuery.error ?? castQuery.error,
  };
}
