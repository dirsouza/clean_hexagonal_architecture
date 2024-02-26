import pino from 'pino';

import { envConfig } from '@/config/environment.config';

export class Logger {
  static getLogger(name?: unknown): pino.Logger {
    let hasName;
    if (typeof name === 'string') hasName = name;
    if (name instanceof Object) hasName = name?.constructor?.name;
    if (name instanceof Function) hasName = name?.name;

    return pino(this.loggerOptions(hasName));
  }

  private static loggerOptions(name?: string): pino.LoggerOptions | undefined {
    return envConfig.NODE_ENV === 'development'
      ? this.pinoOptions(name)
      : undefined;
  }

  private static pinoOptions(name?: string): pino.LoggerOptions {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      },
      name
    };
  }
}
