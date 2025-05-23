import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesScreen from '../screens/home/MoviesScreen';
import MovieScreen from '../screens/details/MovieScreen';

export type RootStackParams = {
  Home: undefined;
  Movie: {movieId: number};
};

const Stack = createStackNavigator<RootStackParams>();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={MoviesScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
    </Stack.Navigator>
  );
}
