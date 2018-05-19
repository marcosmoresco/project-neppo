import restify from 'restify';
import server from '../config/server';

server.get(/\/.dist\/?.*/, restify.serveStatic({
  'directory': __dirname + '/../../'
}));
