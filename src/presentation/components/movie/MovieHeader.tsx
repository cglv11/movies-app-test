import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FadeInImage} from '../ui/FadeInImage';
import BackButton from '../ui/BackButton';

interface Props {
  poster: string;
  originalTitle: string;
  title: string;
}

export const MovieHeader = ({poster, originalTitle, title}: Props) => {
  const {height: screenHeight} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <>
      <View style={{...styles.imageContainer, height: screenHeight * 0.7}}>
        <View style={styles.imageBorder}>
          <FadeInImage style={styles.posterImage} uri={poster} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{originalTitle}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <BackButton />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
