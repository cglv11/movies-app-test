import {Image, StyleSheet, Text, View} from 'react-native';
import {MovieCastEntity} from '../../../domain/entities/cast';
import {FadeInImage} from '../ui/FadeInImage';

interface Props {
  actor: MovieCastEntity;
}

export const CastActor = ({actor}: Props) => {
  return (
    <View style={styles.container}>
      <FadeInImage
        uri={actor.avatar}
        style={{width: 100, height: 150, borderRadius: 10}}
      />

      <View style={styles.actorInfo}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{actor.name}</Text>
        <Text style={{fontSize: 12, opacity: 0.7}}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
});
