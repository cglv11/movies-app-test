import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useMoviesInfinite} from '../../hooks/useMoviesInfinite';
import VerticalCarousel from '../../components/movies/VerticalCarousel';
import BackButton from '../../components/ui/BackButton';

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();

  const popularQ = useMoviesInfinite('popular');

  if (popularQ.isLoading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  if (popularQ.error) {
    return <Text style={{padding: 16}}>Error al cargar películas.</Text>;
  }

  const popularMovies = popularQ.data!.pages.flat();

  return (
    <>
      <BackButton />
      <View style={{marginTop: top + 40, paddingBottom: 30}}>
        <VerticalCarousel
          movies={popularMovies}
          heightCard={300}
          widthCard={180}
          fetchNextPage={popularQ.fetchNextPage}
          hasNextPage={!!popularQ.hasNextPage}
          isFetchingNextPage={popularQ.isFetchingNextPage}
        />
      </View>
    </>
  );
}
