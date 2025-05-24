import {MovieDetailEntity} from '../../domain/entities/movieDetail';
import {MovieDetailAPI} from '../interfaces/moviesapi-movie.response';

export class MovieDetailMapper {
  static movieToEntity(movie: MovieDetailAPI): MovieDetailEntity {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      backdropUrl: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      releaseDate: movie.release_date.toString(),
      releaseYear: new Date(movie.release_date).getFullYear().toString(),
      genres: movie.genres.map(g => g.name),
      runtime: `${movie.runtime} min`,
      rating: movie.vote_average,
      budget: `$${movie.budget.toLocaleString()}`,
      revenue: `$${movie.revenue.toLocaleString()}`,
      status: movie.status,
      tagline: movie.tagline,
      originalLanguage: movie.original_language,
      spokenLanguages: movie.spoken_languages.map(lang => lang.english_name),
      homepage: movie.homepage,
      imdbId: movie.imdb_id,
    };
  }
}
