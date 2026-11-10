import { useEffect, useState } from 'react';
import { api } from './services/api.js';
import { Aviso, Catalogo, Detalhes, FormularioFerramenta, MeusAnuncios, Reservas } from './components/Marketplace.jsx';

export default function App() {
  const [tentativa, setTentativa] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [pagina, setPagina] = useState('catalogo');
  const [selecionado, setSelecionado] = useState(null);
  const [revisao, setRevisao] = useState(0);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([api('/usuarios-demo', { signal: controller.signal }), api('/categorias', { signal: controller.signal })])
      .then(([perfis, grupos]) => {
        if (controller.signal.aborted) return;
        setUsuarios(perfis); setCategorias(grupos); setErro('');
        setUsuarioId((atual) => perfis.some((u) => String(u.id) === String(atual)) ? atual : String(perfis[0]?.id || ''));
      }).catch((e) => { if (!controller.signal.aborted) setErro(e.message); });
    return () => controller.abort();
  }, [tentativa]);

  function navegar(destino) { setPagina(destino); setSelecionado(null); setMensagem(''); }
  function atualizado(texto, destino) {
    setMensagem(texto); setRevisao((n) => n + 1);
    if (destino) setPagina(destino);
  }

  return (
    <div className="page">
      <header className="header">
        <a className="brand" href="/" aria-label="FerramentaCompartilhada — início">
          <span className="brand-mark" aria-hidden="true">FC</span>
          <span>Ferramenta<span className="brand-accent">Compartilhada</span></span>
        </a>
        <label className="profile">Perfil de demonstração
          <select value={usuarioId} onChange={(e) => { setUsuarioId(e.target.value); navegar('catalogo'); }}>
            {!usuarios.length && <option value="">Aguardando perfis</option>}
            {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nome}</option>)}
          </select>
        </label>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">Ferramentas que aproximam vizinhos</p>
          <h1 id="intro-title">Compartilhe mais.<br /><span>Compre menos.</span></h1>
          <p className="lead">Uma ferramenta parada pode dar vida ao próximo projeto de alguém.
            Alugue por diária ou empreste gratuitamente no mesmo dia, com aprovação do proprietário.</p>
        </section>

        <nav className="tabs" aria-label="Navegação principal">
          {[['catalogo', 'Catálogo'], ['anunciar', 'Anunciar'], ['proprietario', 'Meus anúncios'], ['recebidas', 'Solicitações recebidas'], ['reservas', 'Minhas reservas']].map(([id, nome]) =>
            <button key={id} className={pagina === id ? 'active' : 'secondary'} aria-current={pagina === id ? 'page' : undefined} disabled={!usuarioId && id !== 'catalogo'} onClick={() => navegar(id)}>{nome}</button>)}
        </nav>
        <Aviso erro={erro} mensagem={mensagem} />
        {erro && <button className="secondary back" onClick={() => { setTentativa((n) => n + 1); setRevisao((n) => n + 1); }}>Tentar novamente</button>}
        <div className="workspace" key={`${pagina}-${usuarioId}-${selecionado?.id || selecionado || ''}`}>
          {pagina === 'catalogo' && <Catalogo categorias={categorias} revisao={revisao} abrir={(id) => { setSelecionado(id); setPagina('detalhes'); setMensagem(''); }} />}
          {pagina === 'detalhes' && <><button className="secondary back" onClick={() => navegar('catalogo')}>Voltar ao catálogo</button><Detalhes id={selecionado} usuarioId={usuarioId} revisao={revisao} atualizado={atualizado} /></>}
          {pagina === 'anunciar' && <FormularioFerramenta categorias={categorias} usuarioId={usuarioId} item={selecionado} salvo={(texto) => { setTentativa((n) => n + 1); atualizado(texto, 'proprietario'); }} />}
          {pagina === 'proprietario' && <MeusAnuncios usuarioId={usuarioId} revisao={revisao} atualizado={atualizado} editar={(item) => { setSelecionado(item); setPagina('anunciar'); setMensagem(''); }} />}
          {['recebidas', 'reservas'].includes(pagina) && <Reservas recebidas={pagina === 'recebidas'} usuarioId={usuarioId} revisao={revisao} atualizado={atualizado} />}
        </div>
      </main>
      <footer>FerramentaCompartilhada · Protótipo acadêmico em desenvolvimento</footer>
    </div>
  );
}
