import axiosClient2 from "./axiosClient2";

export const categorys = {
    movies: 'movies',
}

export const movieType = {
    now_playing : 'now_playing'
}


const tmdbApi2 = {
    getMoviezList: (type, params) => {
        const url = 'movies/' + movieType[type];
        return axiosClient2.get(url, params);
    },
    getVideos: (cates, id) => {
        const url = categorys[cates] + '/' + id + '/videos';
        return axiosClient2.get(url, {params: {}});
    },
    search: (cates, params) => {
        const url = 'search/' + categorys[cates];
        return axiosClient2.get(url, params);
    },
    detail: (cates, id, params) => {
        const url = categorys[cates] + '/' + id;
        return axiosClient2.get(url, params);
    },
    credits: (cates, id) => {
        const url = categorys[cates] + '/' + id + '/credits';
        return axiosClient2.get(url, {params: {}});
    },
    similar: (cates, id) => {
        const url = categorys[cates] + '/' + id + '/similar';
        return axiosClient2.get(url, {params: {}});
    },
}

export default tmdbApi2;