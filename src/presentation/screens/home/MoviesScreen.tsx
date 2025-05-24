import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import {getMovies} from '../../../actions/get-movies';
import {useQuery} from '@tanstack/react-query';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MoviesScreen() {
  const {top} = useSafeAreaInsets();

  const {
    data: movies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['movies', 1],
    queryFn: () => getMovies(1),
  });

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        <HorizontalCarousel movies={movies} />
        <HorizontalCarousel
          movies={movies}
          title="Populares"
          heightCard={200}
          widthCard={140}
        />
      </View>
    </ScrollView>
  );
}
