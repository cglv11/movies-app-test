import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {MovieListEntity} from '../../../domain/entities/movieList';
import MovieCard from './MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Proos {
  movies: MovieListEntity[] | undefined;
  title?: string;
  heightCard?: number;
  widthCard?: number;
}

export default function HorizontalCarousel({
  movies,
  title,
  heightCard,
  widthCard,
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
      />
    </View>
  );
}
