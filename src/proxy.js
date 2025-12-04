// Core proxy logic - forwards requests to backend
const http = require('http');
const router = require('./router');

function forwardRequest(clientReq, clientRes) {
  // Get backend using load balancer
  const backend = router.getBackend(clientReq.url);
  
  if (!backend) {
    clientRes.writeHead(404);
    clientRes.end('Route not found');
    return;
  }

  console.log(`→ ${clientReq.method} ${clientReq.url} → ${backend.hostname}:${backend.port}`);

  // Prepare request to backend
  const options = {
    hostname: backend.hostname,
    port: backend.port,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  // Make request to backend
  const backendReq = http.request(options, (backendRes) => {
    console.log(`← ${backendRes.statusCode} from ${backend.hostname}:${backend.port}`);
    clientRes.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(clientRes);
  });

  // Handle errors
  backendReq.on('error', (err) => {
    console.error(`Backend error (${backend.hostname}:${backend.port}):`, err.message);
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