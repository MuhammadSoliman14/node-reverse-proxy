const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Response from Backend 2',
    port: 3002,
    path: req.url
  }));
}).listen(3002, () => {
  console.log('Backend 2 running on port 3002');
});