import restify from 'restify';

var server = restify.createServer({
  name: 'project',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
  mapParams: false,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: false, 
  multiples: true,
  hash: 'sha1'
}));

module.exports = server;
