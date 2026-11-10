import { getPrisma } from '../lib/prisma.js';
import * as ferramentas from '../services/ferramentas.js';
import * as reservas from '../services/reservas.js';
import { idValido } from '../utils/validacao.js';

export const categorias = async (_req, res) => res.json(await getPrisma().categoria.findMany({ orderBy: { nome: 'asc' } }));
export const usuariosDemo = async (_req, res) => res.json(await getPrisma().usuario.findMany({ select: { id: true, nome: true }, orderBy: { id: 'asc' } }));
export const listar = async (req, res) => res.json(await ferramentas.listarFerramentas(req.query));
export const minhas = async (req, res) => res.json(await ferramentas.minhasFerramentas(req.usuario.id));
export const detalhes = async (req, res) => res.json(await ferramentas.detalharFerramenta(idValido(req.params.id)));
export const criar = async (req, res) => res.status(201).json(await ferramentas.salvarFerramenta(req.body, req.usuario.id, undefined, req.file));
export const editar = async (req, res) => res.json(await ferramentas.salvarFerramenta(req.body, req.usuario.id, idValido(req.params.id), req.file));
export const desativar = async (req, res) => res.json(await ferramentas.desativarFerramenta(idValido(req.params.id), req.usuario.id));
export const solicitar = async (req, res) => res.status(201).json(await reservas.solicitarReserva(req.body, req.usuario.id));
export const minhasReservas = async (req, res) => res.json(await reservas.listarReservas(req.usuario.id));
export const recebidas = async (req, res) => res.json(await reservas.listarReservas(req.usuario.id, true));
export const decidir = (acao) => async (req, res) => res.json(await reservas.decidirReserva(idValido(req.params.id), req.usuario.id, acao));
