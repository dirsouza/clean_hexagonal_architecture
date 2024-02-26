import 'reflect-metadata';

import expressListRoutes from 'express-list-routes';

import { app } from '@/app';
import { envConfig } from '@/config/environment.config';

import { Logger } from './config/logger.config';

async function bootstrap(): Promise<void> {
  const logger = Logger.getLogger('Server');

  app.listen(envConfig.API_PORT, () => {
    expressListRoutes(app, {
      logger: (method, space, path) => {
        logger.info(`${method} ${space}${path}`);
      }
    });
    logger.info(`Server running at ${envConfig.API_PORT}`);
  });
}

bootstrap();
