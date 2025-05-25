import {MovieCastEntity} from '../../domain/entities/cast';
import {MovieCastAPI, Cast} from '../interfaces/moviesapi-movie-cast.response';

export class MovieCastMapper {
  static castToEntity(c: Cast): MovieCastEntity {
    return {
      id: c.id,
      name: c.name,
      character: c.character ?? '',
      avatar: c.profile_path
        ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
        : '',
    };
  }

  static movieCastToEntityList(movieCast: MovieCastAPI): MovieCastEntity[] {
    return movieCast.cast.map(this.castToEntity);
  }
}
