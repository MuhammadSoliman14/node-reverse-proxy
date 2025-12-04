
const roundRobinState = new Map();

function roundRobin(backends, routePath){
    //get current index for this roure
    if (!roundRobinState.has(routePath)){
        roundRobinState.set(routePath, 0);
    }
    


const currentIndex = roundRobinState.get(routePath);
const backend = backends[currentIndex];

const nextIndex = (currentIndex +1) % backends.length;
roundRobinState.set(routePath, nextIndex);

return backend;

}

function selectBackend (route, routePath){
    if (!route.backends || route.backends.length == 0){
        return null;
    }

    if (route.backends.length == 1){
        return route.backends[0];
    }
    
    if (route.backends.length === 1){
        return route.backends[0];
    }

    switch (route.strategy) {
        case 'round-robin':
            return roundRobin(route.backends, routePath);
        default:
            return roundRobin(route.backends, routePath); 
    }
}

module.exports = { selectBackend };