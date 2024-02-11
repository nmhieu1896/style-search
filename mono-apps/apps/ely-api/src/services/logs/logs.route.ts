import { Elysia } from 'elysia';
import { baseLog, infoLog, errorLog } from './logs.service';

export const logsPlugin = new Elysia()
  .get('/log', baseLog)
  .get('/log/info', infoLog)
  .get('/log/error', errorLog);
