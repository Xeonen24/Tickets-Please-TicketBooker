import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
            <div className="itemOverview">
                <p className="cardDesc"><h3>{item.title || item.name}</h3>{item.overview.substring(0, 119)}...</p>
                </div>
                <Button>
                    <span className="viewMore">More</span>
                </Button>
            </div>
        </Link>
    );
}

export default MovieCard;
