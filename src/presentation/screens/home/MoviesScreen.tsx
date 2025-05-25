import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import {getMovies} from '../../../actions/get-movies';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useMoviesInfinite} from '../../hooks/useMoviesInfinite';

export default function MoviesScreen() {
  const {top} = useSafeAreaInsets();

  const popularQ = useMoviesInfinite('popular');
  const topRatedQ = useMoviesInfinite('top_rated');
  const upcomingQ = useMoviesInfinite('upcoming');

  if (popularQ.isLoading || topRatedQ.isLoading || upcomingQ.isLoading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  if (popularQ.error || topRatedQ.error || upcomingQ.error) {
    return <Text style={{padding: 16}}>Error al cargar películas.</Text>;
  }

  // Aplana pages → array
  const popularMovies = popularQ.data!.pages.flat();
  const topRatedMovies = topRatedQ.data!.pages.flat();
  const upcomingMovies = upcomingQ.data!.pages.flat();

  return (
    <ScrollView>
      <View style={{marginTop: top + 30, paddingBottom: 30}}>
        <HorizontalCarousel
          movies={popularMovies}
          title="Todas"
          fetchNextPage={popularQ.fetchNextPage}
          hasNextPage={!!popularQ.hasNextPage}
          isFetchingNextPage={popularQ.isFetchingNextPage}
        />
        <HorizontalCarousel
          movies={topRatedMovies}
          title="Mejor valoradas"
          fetchNextPage={topRatedQ.fetchNextPage}
          hasNextPage={!!topRatedQ.hasNextPage}
          isFetchingNextPage={topRatedQ.isFetchingNextPage}
          heightCard={200}
          widthCard={140}
        />
        <HorizontalCarousel
          movies={upcomingMovies}
          title="Cartelera"
          fetchNextPage={upcomingQ.fetchNextPage}
          hasNextPage={!!upcomingQ.hasNextPage}
          isFetchingNextPage={upcomingQ.isFetchingNextPage}
          heightCard={200}
          widthCard={140}
        />
      </View>
    </ScrollView>
  );
}
