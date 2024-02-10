import { Elysia } from 'elysia';
import { appendFile } from 'fs';

const logFile = Bun.file('logs'); // relative to cwd
const fileWriter = logFile.writer();

export const logsPlugin = new Elysia().get('/log', async (arg) => {
  appendFile('logs', JSON.stringify(arg) + '\n', (err) => {
    if (err) {
      console.error(err);
    }
  });
  arg.store.a = (arg.store.a || 0) + 1;
  return 'ok';
});
