const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

app.use('/api/*', createProxyMiddleware({target: 'http://localhost:8023', changeOrigin: true}));

app.get('*.js', (req, res, next) => {
  if (!req.headers['accept-encoding']) {
    next()
  }
  else if (req.headers['accept-encoding'].includes('br')) {
    req.url = req.url + '.br'
    res.set('Content-Encoding', 'br')
    res.set('Content-Type', 'text/javascript')
    next()
  }
  else {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gz')
    res.set('Content-Type', 'text/javascript')
    next()
  }
})
app.get('*.css', (req, res, next) => {
  if (!req.headers['accept-encoding']) {
    next()
  }
  else if (req.headers['accept-encoding'].includes('br')) {
    req.url = req.url + '.br'
    res.set('Content-Encoding', 'br')
    res.set('Content-Type', 'text/css')
    next()
  }
  else {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gz')
    res.set('Content-Type', 'text/css')
    next()
  }
})
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.listen(4000)