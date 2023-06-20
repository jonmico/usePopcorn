export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMovie = Movie & {
  runtime: number;
  imdbRating: number;
  userRating: number;
};
