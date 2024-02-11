import { type Context } from 'elysia';

import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${JSON.stringify(message)}`
);

const logger = winston.createLogger({
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

export const baseLog = async (arg: Context) => {
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
