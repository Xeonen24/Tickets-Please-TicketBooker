import React, { useState, useEffect } from 'react';
import './movie-grid.scss';
import './movie-card.scss';
import MovieCarde from './MovieCarde';

const BookMovie = (props) => {
  const [title, setTitle] = useState('TicketsPlease | Booking');

	useEffect(() => {
	  document.title = title;
	}, [title]);
  
    return (
      <>
        <ul>
          <MovieCarde/>
        </ul>
      </>
    );
  };
  

export default BookMovie;
