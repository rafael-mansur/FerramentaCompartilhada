import app from './app.js';
import { createServer } from 'node:http';

const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT deve ser um número inteiro entre 1 e 65535.');
  process.exit(1);
}

const server = createServer(app);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${port} já está em uso. Encerre a execução anterior do backend com Ctrl+C antes de iniciar outra.`);
  } else {
    console.error(`Não foi possível iniciar a API: ${error.message}`);
  }
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`API disponível em http://${host}:${port}/api/health`);
});
