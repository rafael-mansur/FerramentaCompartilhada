import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export const brl = (valor) => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const dataBr = (valor) => valor.slice(0, 10).split('-').reverse().join('/');
const imagens = [
  ['/imagens/furadeira.svg', 'Furadeira'], ['/imagens/escada.svg', 'Escada'], ['/imagens/jardinagem.svg', 'Jardinagem'],
];

function useDados(path, usuarioId, revisao) {
  const [estado, setEstado] = useState({ dados: null, erro: '', carregando: true });
  useEffect(() => {
    const controller = new AbortController();
    setEstado({ dados: null, erro: '', carregando: true });
    api(path, { usuarioId, signal: controller.signal }).then((dados) => {
      if (!controller.signal.aborted) setEstado({ dados, erro: '', carregando: false });
    }).catch((e) => {
      if (!controller.signal.aborted) setEstado({ dados: null, erro: e.message, carregando: false });
    });
    return () => controller.abort();
  }, [path, usuarioId, revisao]);
  return estado;
}

export function Aviso({ erro, mensagem }) {
  return erro ? <p className="notice notice-error" role="alert">{erro}</p>
    : mensagem ? <p className="notice" role="status">{mensagem}</p> : null;
}

function Estado({ carregando, erro }) {
  return carregando ? <p role="status">Carregando…</p> : <Aviso erro={erro} />;
}

export function Catalogo({ categorias, revisao, abrir }) {
  const [filtro, setFiltro] = useState('');
  const estado = useDados(`/ferramentas${filtro}`, null, revisao);
  return <section>
    <div className="section-heading"><h2>Catálogo da comunidade</h2><span>Aluguel por diária ou empréstimo no mesmo dia</span></div>
    <form className="filters" onSubmit={(e) => {
      e.preventDefault();
      const parametros = new URLSearchParams();
      for (const [key, value] of new FormData(e.currentTarget)) if (value.trim()) parametros.set(key, value.trim());
      setFiltro(`?${parametros}`);
    }}>
      <label>Buscar ferramenta<input name="nome" placeholder="Ex.: furadeira" maxLength={100} /></label>
      <label>Categoria<select name="categoriaId"><option value="">Todas</option>{categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></label>
      <label>Bairro<input name="bairro" placeholder="Qualquer bairro" maxLength={100} /></label>
      <label>Modalidade<select name="modalidade"><option value="">Todas</option><option value="ALUGUEL">Aluguel</option><option value="EMPRESTIMO">Gratuito</option></select></label>
      <button>Buscar</button>
    </form>
    <Estado {...estado} />
    {estado.dados?.length === 0 && <p className="empty">Nenhuma ferramenta encontrada. Experimente outros filtros ou anuncie uma ferramenta.</p>}
    <div className="tool-grid">{estado.dados?.map((item) => <article className="tool-card" key={item.id}>
      <img src={item.imagemUrl} alt={item.titulo} />
      <div className="tool-content"><p className="eyebrow">{item.categoria.nome}</p><h3>{item.titulo}</h3>
        <p>{item.bairro} · {item.cidade}</p><p className="price">{item.modalidade === 'EMPRESTIMO' ? 'Grátis · mesma data' : `${brl(item.precoDiaria)} / dia`}</p>
        <button onClick={() => abrir(item.id)}>Ver detalhes</button></div>
    </article>)}</div>
  </section>;
}

export function FormularioFerramenta({ categorias, usuarioId, item, salvo }) {
  const [modalidade, setModalidade] = useState(item?.modalidade || 'ALUGUEL');
  const [categoriaId, setCategoriaId] = useState(String(item?.categoriaId || ''));
  const [modoCapa, setModoCapa] = useState(item?.imagemUrl?.startsWith('/uploads/') ? 'arquivo' : 'ilustracao');
  const [ilustracao, setIlustracao] = useState(imagens.some(([src]) => src === item?.imagemUrl) ? item.imagemUrl : imagens[0][0]);
  const [arquivo, setArquivo] = useState(null);
  const [previaArquivo, setPreviaArquivo] = useState('');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  useEffect(() => {
    if (!arquivo) { setPreviaArquivo(''); return; }
    const url = URL.createObjectURL(arquivo);
    setPreviaArquivo(url);
    return () => URL.revokeObjectURL(url);
  }, [arquivo]);
  const previa = modoCapa === 'ilustracao' ? ilustracao : previaArquivo || (item?.imagemUrl?.startsWith('/uploads/') ? item.imagemUrl : '');
  const campo = (nome, titulo, props = {}) => <label>{titulo}<input name={nome} defaultValue={item?.[nome] || ''} required {...props} /></label>;
  return <section><h2>{item ? 'Editar anúncio' : 'Anunciar ferramenta'}</h2>
    <p>Use somente dados fictícios nesta demonstração. O catálogo mostra bairro e cidade.</p>
    <form className="form-grid" onSubmit={async (e) => {
      e.preventDefault(); setErro(''); setOcupado(true);
      try {
        const body = new FormData(e.currentTarget);
        body.delete('capa');
        if (modoCapa === 'arquivo') {
          if (!arquivo && !item?.imagemUrl?.startsWith('/uploads/')) throw new Error('Escolha uma imagem de capa.');
          if (arquivo) body.append('capa', arquivo);
          body.set('imagemUrl', item?.imagemUrl || '');
        } else body.set('imagemUrl', ilustracao);
        await api(item ? `/ferramentas/${item.id}` : '/ferramentas', { usuarioId, method: item ? 'PUT' : 'POST', body });
        salvo(item ? 'Anúncio atualizado.' : 'Ferramenta anunciada.');
      } catch (e) { setErro(e.message); } finally { setOcupado(false); }
    }}>
      {campo('titulo', 'Título', { maxLength: 100 })}
      <label>Categoria<select name="categoriaId" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required><option value="" disabled>Selecione</option>{categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}<option value="OUTRA">Outra categoria…</option></select></label>
      {categoriaId === 'OUTRA' && <label className="full">Nome da categoria<input name="categoriaNome" required maxLength={60} placeholder="Ex.: Pintura" /></label>}
      <label className="full">Descrição<textarea name="descricao" defaultValue={item?.descricao || ''} required maxLength={2000} rows={3} /></label>
      <label>Modalidade<select name="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}><option value="ALUGUEL">Aluguel pago</option><option value="EMPRESTIMO">Empréstimo gratuito</option></select></label>
      {modalidade === 'ALUGUEL' ? campo('precoDiaria', 'Diária (R$)', { type: 'number', min: '0.01', step: '0.01', max: '99999999.99' }) : <p>Grátis, com retirada e devolução na mesma data.</p>}
      <label className="full">Imagem de capa<select value={modoCapa} onChange={(e) => { setModoCapa(e.target.value); setErro(''); }}><option value="ilustracao">Usar imagem ilustrativa</option><option value="arquivo">Enviar imagem do computador</option></select></label>
      {modoCapa === 'ilustracao' ? <label className="full">Escolha a ilustração<select value={ilustracao} onChange={(e) => setIlustracao(e.target.value)}>{imagens.map(([src, nome]) => <option key={src} value={src}>{nome}</option>)}</select></label>
        : <label className="full">{item?.imagemUrl?.startsWith('/uploads/') ? 'Substituir capa (opcional)' : 'Selecionar capa'}<input type="file" name="capa" accept="image/jpeg,image/png,image/webp" onChange={(e) => {
          const escolhido = e.target.files[0];
          setErro('');
          if (escolhido && (!['image/jpeg', 'image/png', 'image/webp'].includes(escolhido.type) || escolhido.size > 5 * 1024 * 1024)) {
            setErro('Selecione uma imagem JPG, PNG ou WebP de até 5 MB.'); setArquivo(null); e.target.value = ''; return;
          }
          setArquivo(escolhido || null);
        }} /><span className="muted">Uma única capa, JPG, PNG ou WebP de até 5 MB. Na edição, deixe sem novo arquivo para manter a capa atual.</span></label>}
      {previa && <div className="full cover-preview"><img src={previa} alt="Prévia da capa do anúncio" /></div>}
      {campo('logradouro', 'Rua', { maxLength: 200 })}{campo('numero', 'Número (ou s/n)', { maxLength: 20 })}
      {campo('bairro', 'Bairro', { maxLength: 100 })}{campo('cidade', 'Cidade', { maxLength: 100 })}
      {campo('uf', 'UF', { minLength: 2, maxLength: 2, placeholder: 'SC' })}{campo('cep', 'CEP', { maxLength: 9, placeholder: '00000-000' })}
      {campo('complemento', 'Complemento (opcional)', { required: false, maxLength: 200 })}
      <div className="full"><Aviso erro={erro} /><button disabled={ocupado}>{ocupado ? 'Salvando…' : 'Salvar anúncio'}</button></div>
    </form>
  </section>;
}

export function Detalhes({ id, usuarioId, revisao, atualizado }) {
  const estado = useDados(`/ferramentas/${id}`, null, revisao);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const item = estado.dados;
  if (!item) return <Estado {...estado} />;
  const gratis = item.modalidade === 'EMPRESTIMO';
  const diarias = inicio && fim ? Math.round((Date.parse(fim) - Date.parse(inicio)) / 86400000) + 1 : 0;
  return <section className="detail"><img className="detail-image" src={item.imagemUrl} alt={item.titulo} />
    <div><p className="eyebrow">{item.categoria.nome}</p><h2>{item.titulo}</h2><p className="description">{item.descricao}</p>
      <p>{item.bairro} · {item.cidade}</p><p>Proprietário: {item.proprietario.nome}</p>
      <p className="price">{gratis ? 'Grátis · retirada e devolução na mesma data' : `${brl(item.precoDiaria)} por diária`}</p>
      {Number(usuarioId) === item.proprietario.id ? <p>Esta ferramenta é sua. Gerencie-a em Meus anúncios.</p> : <form className="booking" onSubmit={async (e) => {
        e.preventDefault(); setErro(''); setOcupado(true);
        try {
          await api('/reservas', { usuarioId, method: 'POST', body: { ferramentaId: id, dataRetirada: inicio, dataDevolucao: fim } });
          atualizado('Solicitação enviada. Aguarde a aprovação do proprietário.', 'reservas');
        } catch (e) { setErro(e.message); } finally { setOcupado(false); }
      }}>
        <label>Retirada<input type="date" required value={inicio} onChange={(e) => { setInicio(e.target.value); if (gratis) setFim(e.target.value); }} /></label>
        <label>Devolução<input type="date" required min={inicio || undefined} value={fim} readOnly={gratis} onChange={(e) => setFim(e.target.value)} /></label>
        <p>{diarias > 0 ? `${diarias} diária(s) · Prévia: ${gratis ? brl(0) : brl(diarias * Number(item.precoDiaria))}` : 'Escolha as datas para consultar o total.'}</p>
        <p className="muted">O total é confirmado pelo servidor. O pedido depende de aprovação; não há pagamento online.</p>
        <Aviso erro={erro} /><button disabled={ocupado || !usuarioId}>{ocupado ? 'Enviando…' : 'Solicitar reserva'}</button>
      </form>}
    </div>
  </section>;
}

export function MeusAnuncios({ usuarioId, revisao, editar, atualizado }) {
  const estado = useDados('/ferramentas/minhas', usuarioId, revisao);
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  return <section><h2>Meus anúncios</h2><Estado {...estado} /><Aviso erro={erro} />
    {estado.dados?.length === 0 && <p className="empty">Você ainda não anunciou ferramentas.</p>}
    <div className="list">{estado.dados?.map((item) => <article className="list-item" key={item.id}>
      <div><h3>{item.titulo}</h3><p>{item.ativa ? 'Ativo' : 'Desativado'} · {item.modalidade === 'EMPRESTIMO' ? 'Grátis' : `${brl(item.precoDiaria)} / dia`}</p>
        <p>{item.logradouro}, {item.numero} · {item.bairro}, {item.cidade}/{item.uf}</p></div>
      <div className="actions"><button className="secondary" onClick={() => editar(item)}>Editar</button>
        {item.ativa && <button disabled={ocupado} onClick={async () => {
          setOcupado(true); setErro('');
          try { await api(`/ferramentas/${item.id}/desativar`, { usuarioId, method: 'PATCH' }); atualizado('Anúncio desativado. Histórico preservado.'); }
          catch (e) { setErro(e.message); } finally { setOcupado(false); }
        }}>Desativar</button>}</div>
    </article>)}</div>
  </section>;
}

const nomesStatus = { PENDENTE: 'Pendente', APROVADA: 'Aprovada', RECUSADA: 'Recusada', CANCELADA: 'Cancelada', CONCLUIDA: 'Concluída' };
export function Reservas({ recebidas, usuarioId, revisao, atualizado }) {
  const estado = useDados(`/reservas/${recebidas ? 'recebidas' : 'minhas'}`, usuarioId, revisao);
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  async function agir(id, acao) {
    setOcupado(true); setErro('');
    try { await api(`/reservas/${id}/${acao}`, { usuarioId, method: 'PATCH' }); atualizado(acao === 'cancelar' ? 'Reserva cancelada. O período foi liberado.' : 'Reserva atualizada.'); }
    catch (e) { setErro(e.message); } finally { setOcupado(false); }
  }
  return <section><h2>{recebidas ? 'Solicitações recebidas' : 'Minhas reservas'}</h2><Estado {...estado} /><Aviso erro={erro} />
    {estado.dados?.length === 0 && <p className="empty">Nenhuma reserva por aqui ainda.</p>}
    <div className="list">{estado.dados?.map((item) => <article className="list-item" key={item.id}>
      <div><span className={`badge badge-${item.status.toLowerCase()}`}>{nomesStatus[item.status]}</span><h3>{item.ferramenta.titulo}</h3>
        <p>{recebidas ? `Solicitante: ${item.solicitante.nome}` : `Proprietário: ${item.ferramenta.proprietario.nome}`}</p>
        <p>{dataBr(item.dataRetirada)} a {dataBr(item.dataDevolucao)} · {item.diarias} diária(s) · {brl(item.valorTotal)}</p>
        {item.endereco && <p className="address">Retirada: {item.endereco.logradouro}, {item.endereco.numero}{item.endereco.complemento ? `, ${item.endereco.complemento}` : ''} · {item.endereco.bairro}, {item.endereco.cidade}/{item.endereco.uf} · CEP {item.endereco.cep}</p>}
      </div>
      <div className="actions">
        {item.status === 'PENDENTE' && (recebidas ? <><button disabled={ocupado} onClick={() => agir(item.id, 'aprovar')}>Aprovar</button><button className="secondary" disabled={ocupado} onClick={() => agir(item.id, 'recusar')}>Recusar</button></> : <button className="secondary" disabled={ocupado} onClick={() => agir(item.id, 'cancelar')}>Cancelar pedido</button>)}
        {item.status === 'APROVADA' && <>
          {recebidas && <button disabled={ocupado} onClick={() => agir(item.id, 'concluir')}>Concluir devolução</button>}
          <button className="secondary" disabled={ocupado} onClick={() => agir(item.id, 'cancelar')}>Cancelar reserva</button>
        </>}
      </div>
    </article>)}</div>
  </section>;
}
