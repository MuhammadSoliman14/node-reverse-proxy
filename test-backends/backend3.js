const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Response from Backend 3',
    port: 3003,
    path: req.url
  }));
}).listen(3003, () => {
  console.log('Backend 3 running on port 3003');
});