import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesScreen from '../screens/home/MoviesScreen';
import MovieScreen from '../screens/details/MovieScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  MovieScreen: {movieId: number};
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
    </Stack.Navigator>
  );
}
