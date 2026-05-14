// provides a clean interface for fetching people-related data.
import { fetchData } from './apiConfig';
// get people data from TMDB
export const peopleService = {
    getTrending: () =>
        fetchData('/trending/person/week'),

    getPopular: (page = 1) =>
        fetchData(`/person/popular?language=en-US&page=${page}`)
};