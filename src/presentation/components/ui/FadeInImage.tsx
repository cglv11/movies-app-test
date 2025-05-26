// components/ui/FadeInImage.tsx
import {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View,
  StyleSheet,
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const validUri = uri?.trim().length ? uri : null;

  return (
    <View style={[style, styles.container]}>
      {isLoading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color="grey"
          size={30}
        />
      )}
      {validUri ? (
        <Animated.Image
          source={{uri: validUri}}
          onLoadEnd={() => {
            fadeIn({});
            setIsLoading(false);
          }}
          style={[StyleSheet.absoluteFill, {opacity: animatedOpacity}]}
          resizeMode="cover"
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.placeholder]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: '#ccc',
  },
});
