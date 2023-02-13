import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router';
import './movie-grid.scss';
import './movie-card.scss';
import PageHeader from '../../components/page-header/PageHeader'
import tmdbApi2, { categorys, movieType} from '../../api/tmdbApi2';
import {OutlineButton} from '../../components/button/Button';
import ActualMovieCard from './ActualMovieCard';

const MovieCarde = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
      const getList = async () => {
          let response = null;
          if (keyword === undefined) {
              const params = {};
              switch(props.categorys) {
                  case categorys.movies:
                      break;
                  default:
                    response = await tmdbApi2.getMoviezList(movieType.now_playing, {params});
              }
          } else {
              const params = {
                  query: keyword
              }
              response = await tmdbApi2.search(props.categorys, {params});
          }
          setItems(response.results);
          console.log(response.results);
          setTotalPage(response.total_pages);
      }
      getList();
  }, [props.categorys, keyword]);

  const loadMore = async () => {
      let response = null;
      let startingPage = 2;
      if (keyword === undefined) {
          const params = {
              page: startingPage
          };
          switch(props.categorys) {
              case categorys.movies:
                  break;
              default:
                response =  await tmdbApi2.getMoviezList(movieType.popular, {params});
          }
      } else {
          const params = {
              page: startingPage,
              query: keyword
          }
          response = await tmdbApi2.search(props.categorys, {params});
      }
      setItems([...items, ...response.results]);
      setPage(page => page + 1);
  }
  return (
    <>
    <PageHeader />
    <h2>Currently in cinemas</h2>
    <div className="movie-grid">
        {
          items.map((item, i) => <ActualMovieCard category={props.categorys} movie={item} key={i} />)
        }
        </div>
       {
          page < totalPage ? (
            <div className="movie-grid__loadmore">
              <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
            </div>
          ) : null
        }
    </>
  )
}

export default MovieCarde;
