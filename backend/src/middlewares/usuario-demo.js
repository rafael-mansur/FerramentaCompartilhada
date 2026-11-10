import { getPrisma } from '../lib/prisma.js';
import { exigir, idValido } from '../utils/validacao.js';

// Seletor de demonstração local. Não é autenticação.
export async function usuarioDemo(req, _res, next) {
  const id = idValido(req.get('x-usuario-demo'));
  const usuario = await getPrisma().usuario.findUnique({ where: { id } });
  exigir(usuario, 'Selecione um perfil de demonstração válido.', 403, 'PERFIL_INVALIDO');
  req.usuario = usuario;
  next();
}
