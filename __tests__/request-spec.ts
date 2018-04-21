import { PoolRequest } from '../src/pool-request';

import * as nock from 'nock';

const req = new PoolRequest({}, {}, {});

test('Should create', () => {
  expect(req).toBeTruthy();
});

test('Should request pool', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .get('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {
      url,
    },
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.pool('/resource', 'hello');
  expect(json.error).toBe('ok');
});

test('Should request pool without method', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .get('/resource1')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {
      url,
    },
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.pool('/resource1');
  expect(json.error).toBe('ok');
});

test('Should request wallet', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com:8080/')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {
      url,
    },
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.wallet('/resource', 'hello', { soso: 100 });
  expect(json.error).toBe('ok');
});

test('Should request daemon', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {
      url,
    },
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.daemon('/resource', 'hello', { soso: 100 });
  expect(json.error).toBe('ok');
});

test('Should request daemon 1', async () => {
  const url = 'http://localhost';
  let scope = nock('http://localhost')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {},
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.daemon('/resource', 'hello', { soso: 100 });
  expect(json.error).toBe('ok');
});

test('Should request daemonArray', async () => {
  const url = 'http://www.example.com';
  let scope = nock('http://www.example.com')
    .post('/resource')
    .reply(200, { error: 'ok' });
  const req = new PoolRequest(
    {
      url,
    },
    { host: 'www.example.com', port: 8080 },
    { host: 'www.example.com', port: 80 }
  );
  const json = await req.daemonArray('/resource', [['hello', { soso: 100 }]]);
  expect(json.error).toBe('ok');
});
