import { Elysia } from 'elysia';
import { baseHello, helloAfter2s, helloError } from './hello.service';

export const helloPlugin = new Elysia()
  .get('/hello', baseHello)
  .get('/hello/2s', helloAfter2s)
  .get('/hello/error', helloError);
