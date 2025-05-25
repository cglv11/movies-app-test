import {moviesApi} from '../config/api/moviesApi';
import {MovieCastEntity} from '../domain/entities/cast';
import {MovieCastAPI} from '../infraestructure/interfaces/moviesapi-movie-cast.response';
import {MovieCastMapper} from '../infraestructure/mappers/moviesCast.mapper';

const API_KEY = process.env.MOVIE_DB_API_KEY;

export const getMovieCast = async (id: number): Promise<MovieCastEntity[]> => {
  try {
    const {data} = await moviesApi.get<MovieCastAPI>(`/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'es',
      },
    });

    const movieMovieCastEntity = MovieCastMapper.movieCastToEntityList(data);
    return movieMovieCastEntity;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw new Error('Error fetching movie by ID');
  }
};
