// Route matching logic
const config = require('./config');
const loadbalancer = require ('./loadbalancer');

function findRoute(url) {
  for (const [path, route] of Object.entries(config.routes)) {
    if (url.startsWith(path)) {
      return {
        path: path,
        route: route
      };
    }
  }
  return null;
}

function getBackend (url){
    const match = findRoute(url);

    if (!match){
        return null;
    }

    const backend = loadbalancer.selectBackend(match.route, match.path);
    return backend;
}

module.exports = { getBackend };