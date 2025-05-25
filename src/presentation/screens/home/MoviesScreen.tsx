import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import {getMovies} from '../../../actions/get-movies';
import {useQuery} from '@tanstack/react-query';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MoviesScreen() {
  const {top} = useSafeAreaInsets();

  const {
    data: pupularMovies,
    error: pupularMoviesError,
    isLoading: isPopularMoviesLoading,
  } = useQuery({
    queryKey: ['movies', 'popular', 1],
    queryFn: () => getMovies(1, 'popular'),
  });

  const {
    data: topRatedMovies,
    error: topRatedMoviesError,
    isLoading: topRatedMoviesIsLoading,
  } = useQuery({
    queryKey: ['movies', 'top_rated', 1],
    queryFn: () => getMovies(1, 'top_rated'),
  });

  const {
    data: upcomingMovies,
    error: upcomingMoviesError,
    isLoading: upcomingMoviesIsLoading,
  } = useQuery({
    queryKey: ['movies', 'upcoming', 1],
    queryFn: () => getMovies(1, 'upcoming'),
  });

  return (
    <ScrollView>
      <View style={{marginTop: top + 30, paddingBottom: 30}}>
        <HorizontalCarousel movies={pupularMovies} title="Todas" />
        <HorizontalCarousel
          movies={topRatedMovies}
          title="Mejor valoradas"
          heightCard={200}
          widthCard={140}
        />
        <HorizontalCarousel
          movies={upcomingMovies}
          title="Cartelera"
          heightCard={200}
          widthCard={140}
        />
      </View>
    </ScrollView>
  );
}
