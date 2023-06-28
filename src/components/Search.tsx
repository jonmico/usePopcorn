import { useRef, useEffect } from 'react';
import { useKey } from '../useKey';

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey('Enter', () => {
    if (!inputEl.current) return;

    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
