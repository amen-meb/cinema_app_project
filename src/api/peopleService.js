// Single Responsibility: provides a clean interface for fetching people-related data.
import { fetchData } from './apiConfig';

export const peopleService = {
    // For Hero Section
    getTrending: () => 
        fetchData('/trending/person/week'),

    // For Celebrities Page List (with Pagination)
    getPopular: (page = 1) => 
        fetchData(`/person/popular?language=en-US&page=${page}`)
};