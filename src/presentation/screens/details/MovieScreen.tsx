import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {getMovieById} from '../../../actions/get-movie-by-id';
import {useQuery} from '@tanstack/react-query';
import {RootStackParams} from '../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {getMovieCast} from '../../../actions/get-movie-cast';

interface Props extends StackScreenProps<RootStackParams, 'MovieScreen'> {}

export default function MovieScreen({route}: Props) {
  const {movieId} = route.params;

  const {
    data: movie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useQuery({
    queryKey: ['movieDetatils', movieId],
    queryFn: () => getMovieById(movieId),
  });

  const {
    data: cast = [],
    isLoading: isCastLoading,
    error: castError,
  } = useQuery({
    queryKey: ['movieCast', movieId],
    queryFn: () => getMovieCast(movieId),
    enabled: !!movieId,
  });

  if (isMovieLoading || isCastLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MovieHeader
        originalTitle={movie!.original_title}
        title={movie!.title}
        poster={movie!.posterUrl}
      />
      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
}
