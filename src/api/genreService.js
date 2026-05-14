// Provides movie and TV genres

import { fetchData } from './apiConfig';

export const genreService = {
    getMovieGenres: () =>
        fetchData('/genre/movie/list?language=en'),

    getTVGenres: () =>
        fetchData('/genre/tv/list?language=en')
};