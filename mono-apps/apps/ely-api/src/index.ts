import { Elysia } from 'elysia';
import { logsPlugin } from '#services/logs/logs.route';
import { helloPlugin } from '#services/hello/hello.route';

const app = new Elysia()
  .get('/', (arg) => {
    return `Hello Elysia \n ${JSON.stringify(arg, null, 2)}`;
  })
  .use(logsPlugin)
  .use(helloPlugin)
  .listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
