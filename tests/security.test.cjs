const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const semver = require('../src/node_modules/semver');
const { allowed, evaluate } = require('../scripts/audit.cjs');
const baseline = require('../security/baseline-advisories.json');
const root = path.resolve(__dirname, '..');
const now = new Date('2026-10-22T00:00:00Z');

test('all recorded vulnerable versions are removed, except the tracked dev-only upstream issue', () => {
  const blocked = [];
  for (const project of ['src', 'public']) {
    const lock = JSON.parse(readFileSync(path.join(root, project, 'package-lock.json')));
    for (const [node, item] of Object.entries(lock.packages)) {
      if (!node || !item.version) continue;
      const name = node.split('node_modules/').at(-1);
      for (const advisory of baseline.advisories.filter(a => a.package === name)) {
        if (semver.satisfies(item.version, advisory.range) &&
          !allowed(name, advisory.ghsa, [node], lock)) {
          blocked.push(`${project}:${name}@${item.version}:${advisory.ghsa}`);
        }
      }
    }
  }
  assert.deepEqual(blocked, []);
});

const advisory = { url: 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm', severity: 'high' };
const lock = { packages: { 'node_modules/braces': { version: '3.0.3', dev: true } } };
const report = { metadata: {}, vulnerabilities: {
  braces: { nodes: ['node_modules/braces'], via: [advisory] },
  micromatch: { nodes: ['node_modules/micromatch'], via: ['braces'] },
} };

test('audit accepts only the tracked advisory in development', () => {
  assert.equal(evaluate(report, lock, now).blocked.length, 0);
  assert.equal(evaluate(report, lock, now).accepted.length, 1);
});
test('the exception cannot cover runtime dependencies, another CVE or version, or expiration', () => {
  const nodes = ['node_modules/braces'];
  assert.equal(allowed('braces', 'GHSA-vfj7-8cjw-p6xm', nodes,
    { packages: { [nodes[0]]: { version: '3.0.3' } } }, now), false);
  assert.equal(allowed('braces', 'GHSA-new-vulnerability', nodes, lock, now), false);
  assert.equal(allowed('braces', 'GHSA-vfj7-8cjw-p6xm', nodes,
    { packages: { [nodes[0]]: { version: '3.0.2', dev: true } } }, now), false);
  assert.equal(allowed('braces', 'GHSA-vfj7-8cjw-p6xm', nodes, lock,
    new Date('2026-11-22T00:00:00Z')), false);
});
test('network errors or incomplete audit results fail closed', () => {
  assert.throws(() => evaluate({ error: { code: 'TIMEOUT' } }, lock));
  assert.throws(() => evaluate({ metadata: {} }, lock));
  assert.throws(() => evaluate({ ...report, vulnerabilities: {
    broken: { via: ['missing'], nodes: [] },
  } }, lock));
});
