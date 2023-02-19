const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/serv',
    createProxyMiddleware({
      target: 'https://in.bookmyshow.com',
      changeOrigin: true,
    })
  );
};