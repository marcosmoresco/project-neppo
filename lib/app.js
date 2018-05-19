import server from './config/server';
import logger from './config/logger';
import routes from './config/routes';

/*
 * Run server
 */

server.listen((process.env.PORT || 3000), () => {
  logger.info('%s listening at %s', server.name, server.url);
});
