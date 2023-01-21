import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../button/Button';
import MovieList from '../movie-list/MovieList';
import { category, movieType, tvType } from '../../api/tmdbApi';
const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

const Latest = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => setMovies(response.data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='container'>
    <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Currently in cinemas</h2>
                <Link to="/movie">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <div>
            {movies.map(movie => (
            <MovieList key={movie.id} movies={movies.id} category={category.movie.id}/>
            ))}
            </div>
            </div>
            </div>
  );
};
export default Latest;