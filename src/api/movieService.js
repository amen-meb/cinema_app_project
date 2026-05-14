// Single Responsibility: provides a clean interface for fetching movie-related data.

import { fetchData } from './apiConfig';

export const movieService = {
    getNowPlaying: (page = 1) =>
        fetchData(`/movie/now_playing?language=en-US&page=${page}`),

    getTrending: () =>
        fetchData('/trending/movie/week'),

    getMoviesByGenre: (genreId, page = 1) =>
        fetchData(`/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`),

    getPopular: (page = 1) =>
        fetchData(`/movie/popular?language=en-US&page=${page}`)
};
