import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMovie: (id) => {
        const url = 'movie/' + id + '?api_key=' + apiConfig.apiKey + '&language=en-US';
        return axiosClient.get(url);
    },
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getMoviesListBySearch: (movie) => {
        const url = apiConfig.baseUrl + 'search/movie?api_key='+ apiConfig.apiKey + '&language=en-US&query=' + movie
        return axiosClient.get(url);
    },
    getMovieByCategory: (genres, params) => {
        const url = apiConfig.baseUrl + 'discover/movie?api_key=' + apiConfig.apiKey + '&language=en-US&with_genres=' + genres;
        return axiosClient.get(url, params)
    },
    getCollection: (id) => {
        const url = apiConfig.baseUrl + 'collection/' + id + '?api_key=' + apiConfig.apiKey + '&language=en-US';
        return axiosClient.get(url)
    },
    // getTvList: (type, params) => {
    //     const url = 'tv/' + tvType[type];
    //     return axiosClient.get(url, params);
    // },
    // getVideos: (cate, id) => {
    //     const url = category[cate] + '/' + id + '/videos';
    //     return axiosClient.get(url, {params: {}});
    // },
    // search: (cate, params) => {
    //     const url = 'search/' + category[cate];
    //     return axiosClient.get(url, params);
    // },
    // detail: (cate, id, params) => {
    //     const url = category[cate] + '/' + id;
    //     return axiosClient.get(url, params);
    // },
    // credits: (cate, id) => {
    //     const url = category[cate] + '/' + id + '/credits';
    //     return axiosClient.get(url, {params: {}});
    // },
    // similar: (cate, id) => {
    //     const url = category[cate] + '/' + id + '/similar';
    //     return axiosClient.get(url, {params: {}});
    // },
}

export default tmdbApi;