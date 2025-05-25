import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {getMovies} from '../../../actions/get-movies';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, FAB, Text} from 'react-native-paper';
import {useMoviesInfinite} from '../../hooks/useMoviesInfinite';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigation';

export default function MoviesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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

  const popularMovies = popularQ.data!.pages.flat();
  const topRatedMovies = topRatedQ.data!.pages.flat();
  const upcomingMovies = upcomingQ.data!.pages.flat();

  return (
    <>
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
      <FAB
        label="Buscar película"
        style={style.fab}
        mode="elevated"
        color="#fff"
        onPress={() => navigation.navigate('SearchScreen')}></FAB>
    </>
  );
}

export const style = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
  },
});
