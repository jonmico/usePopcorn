import { useEffect, useState, useRef } from 'react';
import { KEY } from '../../config.json';
import { WatchedMovie } from '../types';
import StarRating from '../StarRating';
import Loader from './Loader';

interface MovieDetailsProps {
  selectedId: string;
  watched: WatchedMovie[];
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
}

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const indexOfRated = watched.findIndex(
    (movie) => movie.imdbID === selectedId
  );

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie: WatchedMovie = {
      imdbRating: Number(imdbRating),
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
    // setAvgRating(Number(imdbRating));
    // setAvgRating((currAvgRating) => (currAvgRating + userRating) / 2);
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    function callback(evt: KeyboardEvent) {
      if (evt.code === 'Escape') {
        onCloseMovie();
      }
    }
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className='rating'>
              {indexOfRated === -1 ? (
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              ) : (
                <p>You rated this movie {watched[indexOfRated].userRating}.</p>
              )}
            </div>
            {userRating > 0 && (
              <button className='btn-add' onClick={handleAdd}>
                + Add to list
              </button>
            )}

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
