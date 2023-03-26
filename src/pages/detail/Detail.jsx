import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import {OutlineButton} from '../../components/button/Button';
import { Link } from 'react-router-dom';
import {loggedIN} from '../../App'
import CircularRate from './CircularRate';

const Detail = () => {

    const {category, id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id ,{params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);
    const ShowBookButton = () => {
      const handleClick = () => {
        localStorage.setItem("bookingItemTitle", JSON.stringify(item.title || item.name));
        localStorage.setItem("bookingItemId", JSON.stringify(id));        
      }
  
      if (loggedIN) {
          return (
              <>
                  <Link to={`/select-theatre`}>
                      <OutlineButton className="buttons" onClick={handleClick}>
                          Book Now
                      </OutlineButton>
                  </Link>
              </>
          )
      } else {
          return (
              <>
              </>
          )
      }
  }
  

    return (
      <>
        {item && (
          <>
            <div
              className="banner"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  item.backdrop_path || item.poster_path
                )})`,
              }}
            ></div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div
                  className="movie-content__poster__img"
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      item.poster_path || item.backdrop_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className="movie-content__info">
                <h1 className="title">{item.title || item.name}</h1>
                <hr className="fadedHR" />
                <div className="genres">
                  <span className="genres__items">Genres:</span>
                  {item.genres &&
                    item.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="genres__item">
                        {genre.name}
                      </span>
                    ))}
                </div>
                <ShowBookButton />
                <h2 className="movie__releaseDate">
                  {item ? "Release date: " + item.release_date : ""}
                </h2>
                <h2>
                  Rating :&nbsp;&nbsp;&nbsp;
                  <CircularRate value={item.vote_average} />
                </h2>
                &nbsp;
                <p className="overview">{item.overview}</p>
                <div className="cast">
                  <div className="section__header">
                    <h2>Cast</h2>
                  </div>
                  <CastList id={item.id} />
                </div>
                <div className="movie__production">
                  <h2>Production Companies</h2>
                  {item &&
                    item.production_companies &&
                    item.production_companies.map((company) => (
                      <>
                        {
                          <span className="productionCompanyImage">
                            <img
                              className="movie__productionComapany"
                              src={
                                "https://image.tmdb.org/t/p/original" +
                                company.logo_path
                              }
                            />
                            <h3 className='companyText'>{company.name}</h3>
                          </span>
                        }
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="section mb-3">
                <VideoList id={item.id} />
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default Detail;
