// Single Responsibility: provides a clean interface for fetching TV series-related data.
import { fetchData } from './apiConfig';

export const seriesService = {
    getOnTheAir: (page = 1) =>
        fetchData(`/tv/on_the_air?language=en-US&page=${page}`),

    getTrending: () =>
        fetchData('/trending/tv/week'),

    getSeriesByGenre: (genreId, page = 1) =>
        fetchData(`/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`),

    getPopular: (page = 1) =>
        fetchData(`/tv/popular?language=en-US&page=${page}`)
};