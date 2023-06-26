export type Movie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
};

export type WatchedMovie = Movie & {
  runtime: number;
  imdbRating: number;
  userRating?: number;
};
