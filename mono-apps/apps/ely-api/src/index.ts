import { Elysia } from 'elysia';
import { logsPlugin } from '#services/logs/logs.route';
import { helloPlugin } from '#services/hello/hello.route';
import { logger, loggerCtx } from '#services/logs/logs.service';

const app = new Elysia()
  .get('/', (arg) => {
    return `Hello Elysia \n ${JSON.stringify(arg, null, 2)}`;
  })
  // .decorate('traceId', new Date().toISOString())
  .derive((arg) => {
    let traceId = new Date().toISOString();
    logger.info({ ...arg, traceId });
    return { traceId };
  })
  .onError((arg) => {
    console.log(JSON.stringify(arg.error, null, 2));
    loggerCtx(arg).error(arg.error);
    return arg.error;
  })
  .use(logsPlugin)
  .use(helloPlugin)
  .listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
