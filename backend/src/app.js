import express from 'express';
import { getPrisma } from './lib/prisma.js';
import marketplace from './routes/marketplace.js';
import { pastaUploads } from './middlewares/capa.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use('/uploads', express.static(pastaUploads));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', servico: 'FerramentaCompartilhada API' });
});

app.get('/api/health/db', async (_req, res) => {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    res.json({ status: 'ok', banco: 'PostgreSQL' });
  } catch {
    res.status(503).json({
      erro: 'BANCO_INDISPONIVEL',
      mensagem: 'Não foi possível acessar o banco de dados.',
    });
  }
});

app.use('/api', marketplace);

app.use((_req, res) => {
  res.status(404).json({
    erro: 'ROTA_NAO_ENCONTRADA',
    mensagem: 'A rota solicitada não existe.',
  });
});

app.use((err, _req, res, _next) => {
  if (err.name === 'MulterError') {
    const mensagem = err.code === 'LIMIT_FILE_SIZE' ? 'A capa deve ter no máximo 5 MB.'
      : err.code === 'TIPO_IMAGEM_INVALIDO' ? 'Envie uma capa JPG, PNG ou WebP.' : 'Envie somente uma imagem de capa no campo capa.';
    return res.status(400).json({ erro: 'CAPA_INVALIDA', mensagem });
  }
  if (err.status && err.erro) return res.status(err.status).json({ erro: err.erro, mensagem: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ erro: 'JSON_INVALIDO', mensagem: 'Envie um JSON válido.' });
  console.error('Falha na API:', err.code || err.name);
  res.status(500).json({ erro: 'ERRO_INTERNO', mensagem: 'Não foi possível concluir a operação. Confira o servidor e o banco.' });
});

export default app;
