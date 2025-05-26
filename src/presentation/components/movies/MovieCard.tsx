import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {MovieListEntity} from '../../../domain/entities/movieList';
import {RootStackParams} from '../../navigation/Navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FadeInImage} from '../ui/FadeInImage';
import {MovieDetailEntity} from '../../../domain/entities/movieDetail';

interface Props {
  movie: MovieListEntity | MovieDetailEntity;
  height?: number;
  width?: number;
}

export default function MovieCard({movie, height = 420, width = 300}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('MovieScreen', {movieId: movie.id})}
      style={({pressed}) => ({
        width,
        height,
        marginHorizontal: 4,
        paddingBottom: 20,
        paddingHorizontal: 7,
        opacity: pressed ? 0.9 : 1,
      })}>
      <View style={styles.movieContainer}>
        <FadeInImage uri={movie.posterUrl} style={styles.image} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  movieContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
  },
});
