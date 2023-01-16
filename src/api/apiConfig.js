const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4e44d9029b1270a757cddc766a1bcb63',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;