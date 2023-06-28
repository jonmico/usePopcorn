import { useEffect, useState } from 'react';
import { Movie, WatchedMovie } from './types';

import MovieDetails from './components/MovieDetails';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import Logo from './components/Logo';
import Search from './components/Search';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

interface MainProps {
  children: React.ReactNode;
}
function Main({ children }: MainProps) {
  return <main className='main'>{children}</main>;
}

interface ListBoxProps {
  children: React.ReactNode;
}

function Box({ children }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

interface MovieItemProps {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}

function MovieItem({ movie, onSelectMovie }: MovieItemProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

interface WatchedSummaryProps {
  watched: WatchedMovie[];
}

function WatchedSummary({ watched }: WatchedSummaryProps) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

interface WatchedMovieListProps {
  watched: WatchedMovie[];
  onDeleteWatched: (movie: WatchedMovie) => void;
}

function WatchedMovieList({ watched, onDeleteWatched }: WatchedMovieListProps) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

interface WatchedMovieItemProps {
  movie: WatchedMovie;
  onDeleteWatched: (movie: WatchedMovie) => void;
}

function WatchedMovieItem({ movie, onDeleteWatched }: WatchedMovieItemProps) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button onClick={() => onDeleteWatched(movie)} className='btn-delete'>
          X
        </button>
      </div>
    </li>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>(
    [],
    'watched'
  );

  function handleSelectMovie(id: string) {
    setSelectedId((s) => (id === s ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((currWatched: WatchedMovie[]) => [...currWatched, movie]);
  }

  function handleDeleteWatched(movie: WatchedMovie) {
    setWatched((currWatched: WatchedMovie[]) =>
      currWatched.filter((watchedMovie) => watchedMovie.imdbID !== movie.imdbID)
    );
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
