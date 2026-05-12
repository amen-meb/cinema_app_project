// Single Responsibility: provides a clean interface for fetching TV series-related data.
import { fetchData } from './apiConfig';

export const seriesService = {
    // For Series Page Hero
    getOnTheAir: (page = 1) => 
        fetchData(`/tv/on_the_air?language=en-US&page=${page}`),

    // For Trending Section
    getTrending: () => 
        fetchData('/trending/tv/week'),

    // For Genre Filtering and Pagination
    getSeriesByGenre: (genreId, page = 1) => 
        fetchData(`/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`),

    // For "View All" lists
    getPopular: (page = 1) => 
        fetchData(`/tv/popular?language=en-US&page=${page}`)
};