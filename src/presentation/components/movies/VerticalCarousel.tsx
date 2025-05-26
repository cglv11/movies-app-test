import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {MovieListEntity} from '../../../domain/entities/movieList';
import MovieCard from './MovieCard';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {useMovieStore} from '../../store/movieStore';
import {MovieCastEntity} from '../../../domain/entities/cast';
import {useQueries} from '@tanstack/react-query';
import {getMovieCast} from '../../../actions/get-movie-cast';

interface Proos {
  movies: MovieListEntity[] | undefined;
  heightCard?: number;
  widthCard?: number;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function VerticalCarousel({
  movies,
  heightCard,
  widthCard,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Proos) {
  const {searchTerm, setSearchTerm} = useMovieStore();

  const castQueries = useQueries({
    queries: (movies ?? []).map(movie => ({
      queryKey: ['movieCast', movie.id],
      queryFn: () => getMovieCast(movie.id),
      enabled: !!movie.id,
      staleTime: Infinity,
    })),
  });

  const moviesWithCast = React.useMemo(
    () =>
      movies?.map((movie, idx) => ({
        ...movie,
        cast: castQueries[idx]?.data || [],
      })),
    [movies, castQueries],
  );

  const filteredMovies = React.useMemo(() => {
    if (!searchTerm) return moviesWithCast;
    const letter = searchTerm.charAt(0).toLowerCase();
    return moviesWithCast?.filter(movie => {
      if (!movie.title.toLowerCase().startsWith(letter)) return false;
      if (!movie.genres || movie.genres.length <= 2) return false;
      const femaleCount = movie.cast.filter(
        (actor: MovieCastEntity) => actor.gender === 1,
      ).length;
      const maleCount = movie.cast.filter(
        (actor: MovieCastEntity) => actor.gender === 2,
      ).length;
      return femaleCount >= 3 && maleCount >= 3;
    });
  }, [moviesWithCast, searchTerm]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={style.containerCarousel}>
        <TextInput
          placeholder="Buscar Película"
          mode="flat"
          autoFocus
          autoCorrect={false}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{width: '90%', marginBottom: 10}}
          placeholderTextColor="#999"
          underlineColor="transparent"
          activeUnderlineColor="#00388c"
        />

        <FlatList
          data={filteredMovies}
          keyExtractor={(movie, index) => `${movie.id}-${index}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({item: movie}) => (
            <MovieCard movie={movie} height={heightCard} width={widthCard} />
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage?.();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{margin: 10}} />
            ) : null
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export const style = StyleSheet.create({
  containerCarousel: {
    alignItems: 'center',
    marginTop: 10,
  },
});
