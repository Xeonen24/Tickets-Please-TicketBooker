import React, { useState, useEffect } from 'react';
import './movie-grid.scss';
import './movie-card.scss';
import MovieCarde from './MovieCarde';

const BookMovie = (props) => {
  
    return (
      <>
        <ul>
          <MovieCarde/>
        </ul>
      </>
    );
  };
  

export default BookMovie;
