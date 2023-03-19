import React, { useState, useEffect } from "react";
import './fetchposter.scss'

const FetchPoster = () => {
  const [movie, setMovie] = useState(null);
  const [overview, setOverview] = useState('');

  const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4e44d9029b1270a757cddc766a1bcb63',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
  };
  
  const fetchMovieOverview = async (movieId) => {
    const url = `${apiConfig.baseUrl}movie/${movieId}?api_key=${apiConfig.apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.overview;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const itemId = localStorage.getItem("bookingItemId").replace(/"/g, "");
    const url = `${apiConfig.baseUrl}movie/${itemId}?api_key=${apiConfig.apiKey}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        fetchMovieOverview(data.id).then(overview => setOverview(overview));
      })
      .catch(error => console.error(error));
  }, []);

  if (!movie) return null;
  
  const { poster_path } = movie;
  
    return (
      <div
        className="banners"
        style={{
            backgroundImage: `url(${apiConfig.originalImage( poster_path)})`
        }}
      ></div>
    );
  };

  export default FetchPoster;