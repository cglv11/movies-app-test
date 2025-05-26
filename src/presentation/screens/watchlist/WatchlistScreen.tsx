import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useMovieStore} from '../../store/movieStore';
import MovieCard from '../../components/movies/MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from '../../components/ui/BackButton';

export default function WatchlistScreen() {
  const {watchlist} = useMovieStore();
  const {top} = useSafeAreaInsets();

  return (
    <>
      <BackButton />
      <View style={[styles.container, {marginTop: top + 50}]}>
        <Text style={styles.title}>Películas por ver</Text>
        {watchlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tienes películas en tu lista.
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={watchlist}
            keyExtractor={m => m.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <MovieCard movie={item} width={180} height={300} />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
