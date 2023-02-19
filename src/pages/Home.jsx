import React,{useEffect} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';
import LatestMovies from './LatestMovies';
import {loggedIN} from '../App'

const Home = () => {
    const history = useHistory();
    useEffect(() => {
      const unlisten = history.listen(() => {
          if (!history.location.pathname.startsWith("/booking-page")) {
              localStorage.removeItem("bookingItemTitle");
              localStorage.removeItem("bookingItemId");
              localStorage.removeItem("selectedTheatre")
          }
      });
      return () => {
          unlisten();
      };
  }, [history]);
    const NotLoggedIn = () =>{
      if(loggedIN){
            return(
                <>
                    <LatestMovies />
                </>
            )
        }else{
            return (
              <>
                <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Top Rated Movies</h2>
                    <Link to="/movie">
                      <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                  </div>
                  <MovieList
                    category={category.movie}
                    type={movieType.top_rated}
                  />
                </div>

                <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Trending TV</h2>
                    <Link to="/tv">
                      <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                  </div>
                  <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Top Rated TV</h2>
                    <Link to="/tv">
                      <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                  </div>
                  <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
              </>
            );
        }
    }
    return (
        <>
            <HeroSlide/>
            <div className="container">
                <NotLoggedIn />
            </div>
        </>
    );
}


export default Home;
