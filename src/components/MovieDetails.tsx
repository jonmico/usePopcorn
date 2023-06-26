import { useEffect, useState } from 'react';
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

  const indexOfRated = watched.findIndex(
    (movie) => movie.imdbID === selectedId
  );

  function handleAdd() {
    const newWatchedMovie: WatchedMovie = {
      imdbRating: Number(imdbRating),
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
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
