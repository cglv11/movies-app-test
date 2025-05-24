import {View, Text} from 'react-native';
import React from 'react';
import {MOVIE_DB_API_KEY} from '@env';
import {getMovies} from '../../../actions/get-movies';

export default function MoviesScreen() {
  getMovies(1);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
