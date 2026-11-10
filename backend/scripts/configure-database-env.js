import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

const composeEnvPath = new URL('../../.env', import.meta.url);
const backendEnvPath = new URL('../.env', import.meta.url);

try {
  const current = existsSync(backendEnvPath) ? readFileSync(backendEnvPath, 'utf8') : '';
  if (parseEnv(current).DATABASE_URL) {
    console.log('DATABASE_URL existente preservada.');
  } else {
    const config = parseEnv(readFileSync(composeEnvPath, 'utf8'));
    if (!config.POSTGRES_PASSWORD) throw new Error('Senha ausente.');

    const user = encodeURIComponent(config.POSTGRES_USER || 'ferramenta');
    const password = encodeURIComponent(config.POSTGRES_PASSWORD);
    const database = encodeURIComponent(config.POSTGRES_DB || 'ferramentacompartilhada');
    const port = config.POSTGRES_PORT || '5432';
    if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
      throw new Error('Porta inválida.');
    }
    const connection = `postgresql://${user}:${password}@127.0.0.1:${port}/${database}`;
    const content = current.replace(/^DATABASE_URL=.*(?:\r?\n|$)/gm, '');
    writeFileSync(backendEnvPath, `${content.trimEnd()}\nDATABASE_URL=${connection}\n`, 'utf8');
    console.log('backend/.env configurado a partir do .env da raiz, sem exibir credenciais.');
  }
} catch {
  console.error('Não foi possível configurar a conexão. Confira o .env da raiz e sua porta/senha.');
  process.exitCode = 1;
}
