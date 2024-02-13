import { type Context } from 'elysia';

import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} | ${level}: ${JSON.stringify(message)}`
);

export const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'What tf is label?' }), timestamp(), myFormat),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const loggerCtx = (arg: Context & { traceId?: string }) => {
  return {
    info(args: any) {
      logger.info({ ...args, traceId: arg.traceId });
    },
    error(args: any) {
      logger.error({ ...args, traceId: arg.traceId });
    },
    warn(args: any) {
      logger.warn({ ...args, traceId: arg.traceId });
    },
  };
};

export const baseLog = async (arg: Context) => {
  //@ts-ignore
  arg.store.a = (arg.store.a || 0) + 1;
  return 'ok';
};

export const infoLog = async (arg: Context) => {
  logger.info({ pathname: arg.path, store: arg.store });
  return 'ok';
};
export const errorLog = async (arg: Context) => {
  logger.error({ pathname: arg.path, store: arg.store });
  return 'ok';
};
