import React from 'react'
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import MovieList2 from '../components/movie-list/MovieList2';
import { categorys, movieType} from '../api/tmdbApi2';

function LatestMovies() {
  return (
      <div className="section mb-3">
          <div className="section__header mb-2">
              <h2>Currently in cinemas</h2>
              <Link to={`/now_playing`}>
                  <OutlineButton className="small">View more</OutlineButton>
              </Link>
          </div>
          <MovieList2 categorys={categorys.movies} type={movieType.popular} />
      </div>
  )
}

export default LatestMovies