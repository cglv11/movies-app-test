import {moviesApi} from '../config/api/moviesApi';
import {MovieDetailEntity} from '../domain/entities/movieDetail';
import {MovieDetailAPI} from '../infraestructure/interfaces/moviesapi-movie.response';
import {MovieDetailMapper} from '../infraestructure/mappers/movieDetail.mapper';

const API_KEY = process.env.MOVIE_DB_API_KEY;

export const getMovieById = async (id: number): Promise<MovieDetailEntity> => {
  try {
    const {data} = await moviesApi.get<MovieDetailAPI>(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'es',
      },
    });

    const movieEntity = MovieDetailMapper.movieToEntity(data);
    return movieEntity;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw new Error('Error fetching movie by ID');
  }
};
