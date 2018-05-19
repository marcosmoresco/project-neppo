import restify from 'restify';
import server from '../config/server';
import loadService from '../services/loadService';

server.get('/', (req, res, next) => {
  loadService.load('index.html', req, res, next);
  next();
});