export interface MovieDetailEntity {
  id: number;
  title: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  releaseDate: string;
  releaseYear: string;
  genres: string[];
  runtime: string;
  rating: number;
  budget: string;
  revenue: string;
  status: string;
  tagline?: string;
  originalLanguage: string;
  spokenLanguages: string[];
  homepage?: string;
  imdbId?: string;
}
