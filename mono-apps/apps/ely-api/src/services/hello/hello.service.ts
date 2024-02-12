import { logger } from '#services/logs/logs.service';

export function baseHello() {
  return 'Hello, World!';
}

export async function helloAfter2s() {
  logger.info('helloAfter2s');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 'Hello, World!';
}

export async function helloError() {
  try {
    throw new Error('Hello, World!');
  } catch (e) {
    logger.error(e);
    return e;
  }
}
