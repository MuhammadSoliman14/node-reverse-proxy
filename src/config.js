// Configuration with multiple backends per route
const config = {
  port: 8080,
  routes: {
    '/api/users': {
      backends: [
        { hostname: 'localhost', port: 3004 },
        { hostname: 'localhost', port: 3002 },
        { hostname: 'localhost', port: 3003 }
      ],
      strategy: 'round-robin'  // For now, only round-robin
    },
    '/api/posts': {
      backends: [
        { hostname: 'localhost', port: 4001 }
      ],
      strategy: 'round-robin'
    }
  }
};

module.exports = config;