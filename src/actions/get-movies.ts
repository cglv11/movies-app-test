import {moviesApi} from '../config/api/moviesApi';
import {MovieListEntity} from '../domain/entities/movieList';
import {MoviesListAPI} from '../infraestructure/interfaces/moviesapi-movies.response';
import {MoviesListMapper} from '../infraestructure/mappers/moviesList.mapper';

const API_KEY = process.env.MOVIE_DB_API_KEY;

export const getMovies = async (
  page: number | unknown,
  category: string,
): Promise<MovieListEntity[]> => {
  try {
    const {data} = await moviesApi.get<MoviesListAPI>(`/movie/${category}`, {
      params: {
        api_key: API_KEY,
        page,
        language: 'es',
      },
    });

    const movies = MoviesListMapper.moviesListToEntityList(data);
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Error fetching movies');
  }
};
