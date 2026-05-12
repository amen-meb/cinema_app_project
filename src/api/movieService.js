// Single Responsibility: provides a clean interface for fetching movie-related data.

import { fetchData } from './apiConfig';

export const movieService = {
    // For Homepage & Movies Page Hero
    getNowPlaying: (page = 1) => 
        fetchData(`/movie/now_playing?language=en-US&page=${page}`),

    // For Trending Section
    getTrending: () => 
        fetchData('/trending/movie/week'),

    // For Genre Filtering and Pagination
    getMoviesByGenre: (genreId, page = 1) => 
        fetchData(`/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`),

    // For "View All" lists
    getPopular: (page = 1) => 
        fetchData(`/movie/popular?language=en-US&page=${page}`)
};
