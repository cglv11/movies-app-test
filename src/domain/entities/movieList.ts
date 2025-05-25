export interface MovieListEntity {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: string;
  rating: number;
  genres?: number[];
}
