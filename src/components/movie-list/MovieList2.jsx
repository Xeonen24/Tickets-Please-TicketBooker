import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import tmdbApi2,{categorys} from '../../api/tmdbApi2';
import MovieCard2 from '../movie-card/MovieCard2';

const MovieList2 = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.categorys) {
                    case categorys.movies:
                        response = await tmdbApi2.getMoviezList(props.type, {params});
                        break;
                    default:
                }
            } else {
                response = await tmdbApi2.similar(props.categorys, props.id);
            }
            setItems(response.results);
        }
        getList(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard2 key={i} item={item} categorys={props.categorys}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

MovieList2.propTypes = {
    categorys: PropTypes.string.isRequired
}

export default MovieList2;
