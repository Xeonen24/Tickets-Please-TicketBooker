import React from 'react';
import axios from 'axios';
const Latest=()=>{
    const axios = require('axios');
    const apiKey = '4e44d9029b1270a757cddc766a1bcb63';
    const currentDate = new Date();
    const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    const endDate = new Date().toISOString().slice(0, 10);

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&primary_release_date.gte=${startDate.toISOString().slice(0, 10)}&primary_release_date.lte=${endDate}&sort_by=popularity.desc&page=1`)
    .then(response => {
        console.log(response.data.results);
    })
    .catch(error => {
        console.log(error);
    });
    return(
        <div></div>
    );
}
export default Latest;