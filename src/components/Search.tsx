interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function Search({ query, setQuery }: SearchProps) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
