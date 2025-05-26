import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FadeInImage} from '../ui/FadeInImage';
import BackButton from '../ui/BackButton';
import {MovieDetailEntity} from '../../../domain/entities/movieDetail';
import {useMovieStore} from '../../store/movieStore';

interface Props {
  movie: MovieDetailEntity;
}

export const MovieHeader = ({movie}: Props) => {
  const {height: screenHeight} = useWindowDimensions();
  const {addToWatchlist, removeFromWatchlist, isInWatchlist} = useMovieStore();
  const inWatch = isInWatchlist(movie.id);

  const toggleWatch = () => {
    inWatch ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };
  return (
    <>
      <View style={{...styles.imageContainer, height: screenHeight * 0.7}}>
        <View style={styles.imageBorder}>
          <FadeInImage style={styles.posterImage} uri={movie.posterUrl} />
        </View>
      </View>

      <View style={styles.headerRow}>
        <View style={styles.marginContainer}>
          <Text style={styles.subTitle}>{movie.original_title}</Text>
          <Text style={styles.title}>{movie.title}</Text>
        </View>

        <Pressable
          onPress={toggleWatch}
          hitSlop={8}
          style={styles.bookmarkButton}>
          <Icon
            name={inWatch ? 'bookmark' : 'bookmark-border'}
            size={35}
            color={inWatch ? '#ffd700' : '#000'}
          />
        </Pressable>
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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  bookmarkButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
  },
});
