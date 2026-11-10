import { Router } from 'express';
import { usuarioDemo } from '../middlewares/usuario-demo.js';
import { receberCapa } from '../middlewares/capa.js';
import * as controller from '../controllers/marketplace.js';

const routes = Router();
routes.get('/categorias', controller.categorias);
routes.get('/usuarios-demo', controller.usuariosDemo);
routes.get('/ferramentas', controller.listar);
routes.get('/ferramentas/minhas', usuarioDemo, controller.minhas);
routes.get('/ferramentas/:id', controller.detalhes);
routes.post('/ferramentas', usuarioDemo, receberCapa, controller.criar);
routes.put('/ferramentas/:id', usuarioDemo, receberCapa, controller.editar);
routes.patch('/ferramentas/:id/desativar', usuarioDemo, controller.desativar);
routes.post('/reservas', usuarioDemo, controller.solicitar);
routes.get('/reservas/minhas', usuarioDemo, controller.minhasReservas);
routes.get('/reservas/recebidas', usuarioDemo, controller.recebidas);
for (const acao of ['aprovar', 'recusar', 'cancelar', 'concluir']) {
  routes.patch(`/reservas/:id/${acao}`, usuarioDemo, controller.decidir(acao));
}

export default routes;
