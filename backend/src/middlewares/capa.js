import multer from 'multer';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { exigir } from '../utils/validacao.js';

export const pastaUploads = fileURLToPath(new URL('../../uploads/', import.meta.url));
export const receberCapa = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 20 },
  fileFilter: (_req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) cb(null, true);
    else cb(new multer.MulterError('TIPO_IMAGEM_INVALIDO'));
  },
}).single('capa');

export async function gravarCapa(file) {
  const buffer = file.buffer;
  const extensao = buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ? 'png'
    : buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255 ? 'jpg'
    : buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP' ? 'webp' : null;
  exigir(extensao, 'O arquivo deve ser uma imagem JPG, PNG ou WebP válida.');
  const nome = `${randomUUID()}.${extensao}`;
  await mkdir(pastaUploads, { recursive: true });
  await writeFile(new URL(`../../uploads/${nome}`, import.meta.url), buffer);
  return `/uploads/${nome}`;
}

export async function removerCapa(url) {
  if (!/^\/uploads\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(url || '')) return;
  try { await unlink(new URL(`../../uploads/${url.split('/').pop()}`, import.meta.url)); }
  catch (err) { if (err.code !== 'ENOENT') console.error('Não foi possível remover uma capa local:', err.code); }
}
