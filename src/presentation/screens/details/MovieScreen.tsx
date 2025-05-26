import {Text, ScrollView} from 'react-native';
import React from 'react';
import {RootStackParams} from '../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {useMovieDetails} from '../../hooks/useMovieDetails';

interface Props extends StackScreenProps<RootStackParams, 'MovieScreen'> {}

export default function MovieScreen({route}: Props) {
  const {movieId} = route.params;

  const {movie, cast, isLoading, error} = useMovieDetails(movieId);

  if (isLoading) return <FullScreenLoader />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MovieHeader movie={movie!} />
      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
}
