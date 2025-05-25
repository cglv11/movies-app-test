import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {MovieListEntity} from '../../../domain/entities/movieList';
import MovieCard from './MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native-paper';

interface Proos {
  movies: MovieListEntity[] | undefined;
  title?: string;
  heightCard?: number;
  widthCard?: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function HorizontalCarousel({
  movies,
  title,
  heightCard,
  widthCard,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Proos) {
  const {top} = useSafeAreaInsets();

  return (
    <View>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: '300',
            marginLeft: 10,
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies}
        keyExtractor={(movie, index) => `${movie.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
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
          isFetchingNextPage ? <ActivityIndicator style={{margin: 10}} /> : null
        }
      />
    </View>
  );
}
