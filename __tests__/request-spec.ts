import { PoolRequest } from '../src/pool-request';

import * as nock from 'nock';

const req = new PoolRequest();

test('Should create', () => {
  expect(req).toBeTruthy();
});

test('Should request pool', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .get('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest();
  const json = await req.pool(url + '/resource', 'hello');
  expect(json.error).toBe('ok');
});

test('Should request wallet', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest();
  const json = await req.wallet(url + '/resource', 'hello', { soso: 100 });
  expect(json.error).toBe('ok');
});

test('Should request daemon', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest();
  const json = await req.daemon(url + '/resource', 'hello', { soso: 100 });
  expect(json.error).toBe('ok');
});

test('Should request daemonArray', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest();
  const json = await req.daemonArray(url + '/resource', [
    ['hello', { soso: 100 }],
  ]);
  expect(json.error).toBe('ok');
});
