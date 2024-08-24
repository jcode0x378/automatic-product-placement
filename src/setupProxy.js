const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://kd-doll.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // 重寫路徑
      },
    }),
  );
};
