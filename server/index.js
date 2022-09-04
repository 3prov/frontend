const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const compression = require('compression');

app.use('/api/*', createProxyMiddleware({target: 'http://localhost:8023', changeOrigin: true}));

app.use(compression({chunkSize: 16256}))
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.listen(4000)