// Core proxy logic - forwards requests to backend
const http = require('http');
const router = require('./router');

function forwardRequest(clientReq, clientRes) {
  // Find which backend to use
  const route = router.findRoute(clientReq.url);
  
  if (!route) {
    clientRes.writeHead(404);
    clientRes.end('Route not found');
    return;
  }

  console.log(`→ ${clientReq.method} ${clientReq.url} → ${route.hostname}:${route.port}`);

  // Prepare request to backend
  const options = {
    hostname: route.hostname,
    port: route.port,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  // Make request to backend
  const backendReq = http.request(options, (backendRes) => {
    console.log(`← ${backendRes.statusCode}`);
    clientRes.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(clientRes);
  });

  // Handle errors
  backendReq.on('error', (err) => {
    console.error('Backend error:', err.message);
    clientRes.writeHead(502);
    clientRes.end('Bad Gateway');
  });

  // Forward client request to backend
  clientReq.pipe(backendReq);
}

function createServer() {
  return http.createServer(forwardRequest);
}

module.exports = { createServer };