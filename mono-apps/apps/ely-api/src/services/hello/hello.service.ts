import { logger, loggerCtx } from '#services/logs/logs.service';
import type { Context } from 'elysia';

export function baseHello(arg: any) {
  loggerCtx(arg).info({ msg: 'baseHello' });
  return arg;
}

export async function helloAfter2s(arg: Context) {
  loggerCtx(arg).info({ msg: 'helloAfter2s' });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 'Hello, World!';
}

export async function helloError(arg: any) {
  loggerCtx(arg).error({ msg: 'helloAfter2s' });
  // try {
  throw new Error('Hello, World!');
  // } catch (e) {
  //   logger.error(e);
  //   return e;
  // }
}
