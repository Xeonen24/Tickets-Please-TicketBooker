import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
const apiKey = '4e44d9029b1270a757cddc766a1bcb63';
const currentDate = new Date();
const startDate = new Date(currentDate.setMonth(currentDate.getMonth()-1));
const endDate = new Date().toISOString().slice(0, 10);

const axiosClient2 = axios.create({
    baseURL: `${baseUrl}?api_key=${apiKey}&language=en&region=IN&with_original_language=hi|en&primary_release_date.gte=${startDate.toISOString().slice(0, 10)}&primary_release_date.lte=${endDate}&sort_by=popular`,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient2.interceptors.request.use(async (config) => config);

axiosClient2.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient2;