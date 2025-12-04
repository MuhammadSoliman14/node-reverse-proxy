// Route matching logic
const config = require('./config');

function findRoute(url) {
  for (const [path, target] of Object.entries(config.routes)) {
    if (url.startsWith(path)) {
      return target;
    }
  }
  return null;
}

module.exports = { findRoute };