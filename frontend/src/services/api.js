export async function api(path, { usuarioId, method = 'GET', body, signal } = {}) {
  const multipart = body instanceof FormData;
  let response;
  try { response = await fetch(`/api${path}`, {
    method, signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000),
    headers: {
      ...(body && !multipart ? { 'Content-Type': 'application/json' } : {}),
      ...(usuarioId ? { 'x-usuario-demo': String(usuarioId) } : {}),
    },
    ...(body ? { body: multipart ? body : JSON.stringify(body) } : {}),
  }); } catch (e) {
    if (signal?.aborted) throw e;
    throw new Error('Não foi possível acessar o servidor. Verifique a conexão e tente novamente.');
  }
  let data;
  try { data = await response.json(); } catch { throw new Error('Não foi possível carregar os dados. Tente novamente em instantes.'); }
  if (!response.ok) throw new Error(data.mensagem || 'Não foi possível concluir a operação.');
  return data;
}
