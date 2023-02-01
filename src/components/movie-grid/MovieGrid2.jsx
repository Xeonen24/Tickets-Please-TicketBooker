import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'
import tmdbApi2, { categorys, movieType, tvType } from '../../api/tmdbApi2';

const MovieGrid2 = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch(props.category) {
                    case categorys.movies:
                        response = await tmdbApi2.getMoviezList(movieType.popular, {params});
                        break;
                    default:
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi2   .search(props.category, {params});
            }
            setItems(response && response.results);
            setTotalPage(response && response.total_pages);
        }
        getList();
    }, [props.categorys, keyword]);

    const loadMore = async () => {
        let response = null;
        let startingPage = 1;
        if (keyword === undefined) {
            const params = {
                page: startingPage
            };
            switch(props.categorys) {
                case categorys.movies:
                    response =  await tmdbApi2.getMoviezList(movieType.now_playing, {params});
                    break;
                default:
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
            <div className="section mb-3">
                <MovieSearch categorys={props.categorys} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard categorys={props.categorys} item={item} key={i}/>)
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
    );
}

const MovieSearch = props => {

    let history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${categorys[props.categorys]}/search/${keyword}`);
            }
        },
        [keyword, props.categorys, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid2;
