// Single Responsibility: provides a clean interface for fetching people-related data.
import { fetchData } from './apiConfig';

export const peopleService = {
    getTrending: () =>
        fetchData('/trending/person/week'),

    getPopular: (page = 1) =>
        fetchData(`/person/popular?language=en-US&page=${page}`)
};