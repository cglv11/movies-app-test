import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesScreen from '../screens/home/MoviesScreen';
import MovieScreen from '../screens/details/MovieScreen';
import SearchScreen from '../screens/search/SearchScreen';
import WatchlistScreen from '../screens/watchlist/WatchlistScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  MovieScreen: {movieId: number};
  WatchlistScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={MoviesScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
    </Stack.Navigator>
  );
}
