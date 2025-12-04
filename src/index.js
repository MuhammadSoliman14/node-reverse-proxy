const http = require('http');
const BACKEND  = {
    host: 'localhost',
    port: 3001
}

const proxy = http.createServer((clientReq, clientRes) => {
    const options = {
        hostname: BACKEND.host,
        port: BACKEND.port,
        path: clientReq.url,
        method: clientReq.method,
        headers: clientReq.headers
    };

    const backendReq = http.request(options, (backendRes) => {
        console.log(`${backendRes.statusCode}`);
        clientRes.writeHead(backendRes.statusCode, backendRes.headers);
        backendRes.pipe(clientRes);
    });

    backendReq.on('error', (err) => {
        console.error('Error:', err.message);
        clientRes.writeHead(502);
        clientRes.end('Bad Gateway');
    });

    clientReq.pipe(backendReq);
});

proxy.listen (8080, () => {
    console.log('Proxy: http://localhost:8080');
    console.log(`Backend: http://localhost:${BACKEND.port}`);
  });
