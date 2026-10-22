const { spawnSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const exceptions = require('../security/exceptions.json');

function allowed(name, ghsa, nodes, lock, now = new Date()) {
  return exceptions.some(exception =>
    exception.package === name && exception.ghsa === ghsa && exception.devOnly &&
    now < new Date(`${exception.expires}T00:00:00Z`) && nodes.length > 0 &&
    nodes.every(node => lock.packages[node]?.dev === true &&
      lock.packages[node].version === exception.version));
}

function evaluate(report, lock, now = new Date()) {
  if (report.error || !report.metadata || !report.vulnerabilities) {
    throw new Error('Audit did not return a valid vulnerability report');
  }
  const blocked = [];
  const accepted = [];
  // npm reports parent metavulnerabilities as well. Evaluate every originating
  // advisory at the affected package so a known exception cannot hide a new CVE.
  for (const [name, item] of Object.entries(report.vulnerabilities)) {
    for (const via of item.via) {
      if (typeof via === 'string') {
        if (!report.vulnerabilities[via]) throw new Error(`Missing advisory: ${via}`);
        continue;
      }
      const ghsa = via.url?.match(/GHSA-[\w-]+/)?.[0];
      (allowed(name, ghsa, item.nodes, lock, now) ? accepted : blocked)
        .push({ package: name, ghsa, severity: via.severity, url: via.url });
    }
  }
  return { blocked, accepted };
}

if (require.main === module) {
  try {
    const cwd = path.resolve(process.argv[2] || '.');
    const lock = JSON.parse(readFileSync(path.join(cwd, 'package-lock.json'), 'utf8'));
    const result = spawnSync('npm', ['audit', '--json', '--fetch-timeout=60000', '--fetch-retries=1'],
      { cwd, encoding: 'utf8', timeout: 150000, maxBuffer: 16 * 1024 * 1024 });
    if (result.error || ![0, 1].includes(result.status)) {
      throw new Error(result.error?.message || result.stderr || 'npm audit failed');
    }
    const report = JSON.parse(result.stdout);
    const evaluation = evaluate(report, lock);
    console.log(JSON.stringify({ vulnerabilities: report.metadata.vulnerabilities, ...evaluation }, null, 2));
    process.exitCode = evaluation.blocked.length ? 1 : 0;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { allowed, evaluate };
