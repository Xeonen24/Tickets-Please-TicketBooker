import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

    const { category,categorys } = useParams();
    let headerText = '';
    if (categorys === cate.movie) {
        headerText = 'Latest Movies';
    }else if(category === cate.movie){
        document.title = `TicketsPlease | Trending Movies`
        headerText = 'Trending Movies';
    }else if (category === cate.tv) {
        document.title = `TicketsPlease | TV Series`
        headerText = 'TV Series';
    }

return (
    <>
    <PageHeader>{headerText}</PageHeader>
    <div className="container">
        <div className="section mb-3">
            {category === cate.movie ? <MovieGrid category={category} /> : null}
            {category === cate.tv ? <MovieGrid category={category} /> : null}
        </div>
    </div>
    </>
);
}

export default Catalog;