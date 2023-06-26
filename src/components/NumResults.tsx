import { Movie } from '../types';

interface NumResultsProps {
  movies: Movie[];
}

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
