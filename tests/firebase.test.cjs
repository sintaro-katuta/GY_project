const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('../src/node_modules/typescript');
const { createRequire } = require('node:module');
const path = require('node:path');

function loadSource(file, mocks = {}) {
  const filename = path.resolve(__dirname, '../src', file);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  const requireSource = createRequire(filename);
  new Function('require', 'exports', compiled)(name =>
    Object.hasOwn(mocks, name) ? mocks[name] : requireSource(name), exports);
  return exports;
}

test('updated Firebase SDK initializes app/auth/firestore/storage without network access', () => {
  process.env.NEXT_PUBLIC_APIKEY = 'AIzaSySecurityTestKey0000000000000000000';
  process.env.NEXT_PUBLIC_PROJECTID = 'demo-gy-security';
  process.env.NEXT_PUBLIC_STORAGEBUCKET = 'demo-gy-security.appspot.com';
  process.env.NEXT_PUBLIC_APPID = '1:123456789:web:securitytest';
  const config = loadSource('lib/firebase.config.js');
  const { getAuth } = require('../src/node_modules/firebase/auth');
  const { doc } = require('../src/node_modules/firebase/firestore');
  assert.equal(config.initializeFirebaseApp(), config.firebase);
  assert.equal(getAuth(config.firebase).app, config.firebase);
  assert.equal(config.storage.app, config.firebase);
  assert.equal(doc(config.db, 'posts', 'sample').path, 'posts/sample');
});

test('relocated upload helper skips empty selections, awaits upload and returns its URL', async () => {
  const calls = [];
  const api = loadSource('lib/upload.js', {
    './firebase.config': { storage: 'test-storage' },
    'firebase/storage': {
      ref: (parent, file) => file || parent,
      uploadBytes: async (ref, image) => { calls.push({ ref, image }); },
      getDownloadURL: async ref => { assert.equal(calls.length, 1); return `https://example.invalid${ref}`; },
    },
  });
  assert.equal(await api.postImage({}), '');
  assert.equal(calls.length, 0);
  const image = { name: 'photo.jpg' };
  const url = await api.postImage(image);
  assert.match(url, /^https:\/\/example\.invalid\/images\/.+\.jpg$/);
  assert.equal(calls[0].image, image);
});

test('upload failures propagate instead of reporting success', async () => {
  const api = loadSource('lib/upload.js', {
    './firebase.config': { storage: 'test-storage' },
    'firebase/storage': { ref: () => 'ref', uploadBytes: async () => { throw new Error('denied'); } },
  });
  await assert.rejects(api.postImage({ name: 'photo.jpg' }), /denied/);
});
