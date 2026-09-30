const CHAVE_CADASTROS = "aqa:cadastros";
const CHAVE_RASCUNHO = "aqa:rascunho";

/* ===== FUNÇÕES BÁSICAS: SET, GET E REMOVE ===== */
function gravarStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor)); // objeto/array vira texto JSON
  } catch (erro) {
    console.warn("Não foi possível gravar no localStorage:", erro);
  }
}

function lerStorage(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : padrao; // texto JSON volta a ser objeto/array
  } catch (erro) {
    return padrao; // dado corrompido ou localStorage bloqueado
  }
}

function removerStorage(chave) {
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
    console.warn("Não foi possível remover do localStorage:", erro);
  }
}

/* ===== API DO MÓDULO (sem nenhum acesso ao DOM) ===== */
export function lerCadastros() {
  return lerStorage(CHAVE_CADASTROS, []);
}
export function salvarCadastro(cadastro) {
  const lista = lerCadastros();
  lista.push(cadastro);
  gravarStorage(CHAVE_CADASTROS, lista);
}
export function limparCadastros() {
  removerStorage(CHAVE_CADASTROS);
}

export function lerRascunho() {
  return lerStorage(CHAVE_RASCUNHO, null);
}
export function salvarRascunho(rascunho) {
  gravarStorage(CHAVE_RASCUNHO, rascunho);
}
export function limparRascunho() {
  removerStorage(CHAVE_RASCUNHO);
}