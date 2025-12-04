// Configuration for routes and backends
const config = {
  port: 8080,
  routes: {
    '/api/users': { hostname: 'localhost', port: 3001 },
    '/api/posts': { hostname: 'localhost', port: 3002 }
  }
};

module.exports = config;