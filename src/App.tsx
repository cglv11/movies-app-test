import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './presentation/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
