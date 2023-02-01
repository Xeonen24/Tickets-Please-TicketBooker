import React, { useState, useEffect } from 'react';
import './movie-grid.scss';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader'

const MovieCarde = (props) => {
    const [movies, setMovies] = useState([]);
    const currentDate = new Date();
    const startDate = new Date(currentDate.setMonth(currentDate.getMonth()-1));
    const endDate = new Date().toISOString().slice(0, 10);
    const apiKey = '4e44d9029b1270a757cddc766a1bcb63';
    
    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=IN&with_original_language=en|hi&primary_release_date.gte=${startDate.toISOString().slice(0, 10)}&primary_release_date.lte=${endDate}&sort_by=popular.desc&page=1`);
          const data = await res.json();
          setMovies(data.results);
        };
      
        fetchData();
      }, []);
      
      const apiConfig = {
          baseUrl: 'https://api.themoviedb.org/3/',
          apiKey: '4e44d9029b1270a757cddc766a1bcb63',
          originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
          w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
        };

  return (
    <>
    <PageHeader />
    <h2>Currently in cinemas</h2>
    <div className="movie-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div className="movie-card" style={{backgroundImage: `url(${apiConfig.w500Image(movie.poster_path || movie.backdrop_path)})`}}>
              <div className="itemOverview">
                <p className="cardDesc">
                  <h3>{movie.title || movie.name}</h3>
                  {movie.overview.substring(0, 120)}...
                </p>
              </div>
            </div>
          </Link>
      ))}
     </div>
    </>
  )
}

export default MovieCarde