import '@/config/container.config';

import compression from 'compression';
import express from 'express';
import path from 'path';
import { useExpressServer } from 'routing-controllers';

import { authorizationChecker } from '@/config/authorization-checker.config';
import { currentUserChecker } from '@/config/current-user-checker.config';

const app = useExpressServer<express.Express>(express(), {
  cors: true,
  validation: false,
  routePrefix: '/api',
  authorizationChecker,
  currentUserChecker,
  controllers: [path.join(__dirname, '/**/controller/*.{ts,js}')]
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

export { app };
