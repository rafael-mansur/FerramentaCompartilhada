import { Prisma } from '../generated/prisma/client.ts';

export class ErroHttp extends Error {
  constructor(status, erro, mensagem) {
    super(mensagem);
    this.status = status;
    this.erro = erro;
  }
}

export function exigir(condicao, mensagem, status = 400, erro = 'DADOS_INVALIDOS') {
  if (!condicao) throw new ErroHttp(status, erro, mensagem);
}

export function idValido(valor) {
  exigir(/^\d+$/.test(String(valor)) && Number.isSafeInteger(Number(valor)) && Number(valor) > 0, 'Identificador inválido.');
  return Number(valor);
}

export function texto(valor, nome, max = 200) {
  exigir(typeof valor === 'string' && valor.trim().length > 0 && valor.trim().length <= max, `${nome} é obrigatório e deve ter até ${max} caracteres.`);
  return valor.trim();
}

export function dinheiro(valor) {
  exigir(typeof valor === 'string' || typeof valor === 'number', 'Informe o preço por diária.');
  const str = String(valor);
  exigir(/^\d{1,8}(\.\d{1,2})?$/.test(str), 'Preço deve ter até duas casas decimais.');
  const preco = new Prisma.Decimal(str);
  exigir(preco.greaterThan(0), 'Preço por diária deve ser positivo.');
  return preco;
}

export function hoje() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const campo = (tipo) => partes.find((p) => p.type === tipo).value;
  return `${campo('year')}-${campo('month')}-${campo('day')}`;
}

export function dataValida(valor) {
  exigir(typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor), 'Use datas no formato AAAA-MM-DD.');
  const data = new Date(`${valor}T00:00:00.000Z`);
  exigir(!Number.isNaN(data.valueOf()) && data.toISOString().slice(0, 10) === valor, 'Data inválida.');
  return data;
}
