const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Response from Backend 1',
    port: 3004,
    path: req.url
  }));
}).listen(3004, () => {
  console.log('Backend 1 running on port 3004');
});