import { useRef, useEffect } from 'react';

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function callback(evt: KeyboardEvent) {
      if (!inputEl.current) return;

      if (document.activeElement === inputEl.current) return;

      if (evt.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

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
