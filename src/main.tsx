import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx'
// import './index.css'

import StarRating from './StarRating';

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color='blue' maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={['terrible', 'bad', 'okay', 'good', 'amazing']}
    />
    <StarRating maxRating={10} />
    <StarRating size={24} color='red' className='test' defaultRating={3} />
    <Test />
  </React.StrictMode>
);
