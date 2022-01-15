const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('dic2.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 1110;

server.use(middlewares);
server.use(router);
server.listen(port);