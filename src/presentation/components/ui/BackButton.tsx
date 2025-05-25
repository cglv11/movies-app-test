import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.backButton}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 50,
    left: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
