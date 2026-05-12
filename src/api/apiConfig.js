// Single Responsibility: centralizes API configuration and data fetching logic.

export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

export const fetchData = async (endpoint) => {
    try {
        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};