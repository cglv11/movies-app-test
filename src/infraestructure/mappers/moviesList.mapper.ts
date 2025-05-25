import {MovieListEntity} from '../../domain/entities/movieList';
import {
  MovieSummaryAPI,
  MoviesListAPI,
} from '../interfaces/moviesapi-movies.response';

export class MoviesListMapper {
  static movieSummaryToEntity(movie: MovieSummaryAPI): MovieListEntity {
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdropUrl: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
      releaseYear: new Date(movie.release_date).getFullYear().toString(),
      overview: movie.overview,
      rating: movie.vote_average,
      genres: movie.genre_ids,
    };
  }

  static moviesListToEntityList(moviesList: MoviesListAPI): MovieListEntity[] {
    return moviesList.results.map(this.movieSummaryToEntity);
  }
}
