import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

test('porta ocupada apresenta orientação sem anunciar API disponível', async () => {
  const ocupado = createServer();
  ocupado.listen(0, '127.0.0.1');
  await once(ocupado, 'listening');
  try {
    const result = spawnSync(process.execPath, ['src/server.js'], {
      cwd: fileURLToPath(new URL('../', import.meta.url)),
      env: { ...process.env, HOST: '127.0.0.1', PORT: String(ocupado.address().port) },
      encoding: 'utf8', timeout: 10000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /já está em uso/);
    assert.doesNotMatch(result.stdout, /API disponível/);
  } finally {
    await new Promise((resolve) => ocupado.close(resolve));
  }
});
