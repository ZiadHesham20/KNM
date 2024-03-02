const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Configure the proxy middleware
const apiProxy = createProxyMiddleware('/public/api', {
  target: 'https://knm.knm-travels.com',
  changeOrigin: true,
  pathRewrite: {
    '^/public/api': '',  // Remove '/public/api' from the URL path
  },
});

// Use the proxy middleware for the '/public/api' path
app.use('/public/api', apiProxy);

// Handle other routes or static files as needed

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
