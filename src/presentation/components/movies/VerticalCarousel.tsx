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

interface Proos {
  movies: MovieListEntity[] | undefined;
  heightCard?: number;
  widthCard?: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
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

  const filteredMovies = React.useMemo(() => {
    if (!searchTerm) return movies;
    return movies?.filter(m =>
      m.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
  }, [movies, searchTerm]);

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
              fetchNextPage();
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
