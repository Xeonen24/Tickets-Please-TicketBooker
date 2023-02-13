import React from 'react'
import './movie-card.scss';
import { Link } from 'react-router-dom';


const ActualMovieCard= props => {
    const movie  = props.movie;
    const link = '/' + 'movie' + '/' + movie.id;

    const apiConfig = {
        baseUrl: 'https://api.themoviedb.org/3/',
        apiKey: '4e44d9029b1270a757cddc766a1bcb63',
        originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
         w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
    };

  return (
    <div><Link to={link}>
    <div className="movie-card" style={{backgroundImage: `url(${apiConfig.w500Image(movie.poster_path || movie.backdrop_path)})`}}>
      <div className="itemOverview">
        <p className="cardDesc">
          <h3>{movie.title || movie.name}</h3>
          {movie.overview.substring(0, 120)}...
        </p>
      </div>
    </div>
  </Link></div>
  )
}

export default ActualMovieCard