// Entry point - starts the proxy server
const proxy = require('./proxy');
const config = require('./config');

const server = proxy.createServer();

server.listen(config.port, () => {
  console.log(`Proxy listening on http://localhost:${config.port}`);
  console.log('Routes:');
  
  Object.entries(config.routes).forEach(([path, route]) => {
    console.log(`  ${path}:`);
    route.backends.forEach((backend, i) => {
      console.log(`    [${i}] ${backend.hostname}:${backend.port}`);
    });
  });
});