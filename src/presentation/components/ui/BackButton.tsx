import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.backButton}>
      <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
        <MaterialIcon
          name="arrow-back"
          size={45}
          color="#fff"
          style={styles.iconShadow}
        />
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
  iconShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
});
