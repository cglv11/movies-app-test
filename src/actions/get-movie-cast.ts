import {moviesApi} from '../config/api/moviesApi';
import {MovieCastEntity} from '../domain/entities/cast';
import {MovieDetailEntity} from '../domain/entities/movieDetail';
import {MovieCastAPI} from '../infraestructure/interfaces/moviesapi-movie-cast.response';
import {MovieDetailAPI} from '../infraestructure/interfaces/moviesapi-movie.response';
import {MovieDetailMapper} from '../infraestructure/mappers/movieDetail.mapper';
import {MovieCastMapper} from '../infraestructure/mappers/moviesCast.mapper';

const API_KEY = process.env.MOVIE_DB_API_KEY;

export const getMovieCast = async (id: number): Promise<MovieCastEntity[]> => {
  try {
    const {data} = await moviesApi.get<MovieCastAPI>(`/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    const movieMovieCastEntity = MovieCastMapper.movieCastToEntityList(data);
    return movieMovieCastEntity;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw new Error('Error fetching movie by ID');
  }
};
