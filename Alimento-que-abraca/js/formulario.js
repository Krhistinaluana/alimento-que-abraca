import { mascaras } from "./mascaras.js";
import { regras, validarCampo, validarFormulario, limparEstados } from "./validacao.js";
import { salvarCadastro, lerRascunho, salvarRascunho, limparRascunho, limparCadastros } from "./storage.js";
import { criarAlerta } from "./componentes.js";
import { templateListaCadastros } from "./templates.js";

const area = document.getElementById("conteudo");
// CPF e senha ficam de fora do rascunho de propósito
const CAMPOS_RASCUNHO = ["nome", "email", "nascimento", "telefone", "endereco", "cidade", "estado", "cep"];

function coletarRascunho(form) {
  const rascunho = {};
  CAMPOS_RASCUNHO.forEach((id) => {
    rascunho[id] = form.elements[id].value;
  });
  const escolhido = form.querySelector('input[name="participacao"]:checked');
  rascunho.participacao = escolhido ? escolhido.value : "";
  return rascunho;
}

// Chamada pelo roteador toda vez que a página é montada
export function restaurarRascunho() {
  const form = document.getElementById("form-cadastro");
  const rascunho = lerRascunho();
  if (!form || !rascunho) return;
  CAMPOS_RASCUNHO.forEach((id) => {
    if (rascunho[id]) form.elements[id].value = rascunho[id];
  });
  if (rascunho.participacao) {
    const radio = form.querySelector(`input[name="participacao"][value="${rascunho.participacao}"]`);
    if (radio) radio.checked = true;
  }
}

function montarCadastro(form) {
  const dados = Object.fromEntries(new FormData(form));
  return {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    cidade: dados.cidade.trim(),
    participacao: dados.participacao,
    data: new Date().toISOString(),
  };
}

function atualizarListaCadastros(form) {
  document.getElementById("cadastros-salvos")?.remove();
  form.closest("section").insertAdjacentHTML("afterend", templateListaCadastros());
}

export function iniciarFormulario() {
  // input: aplica a máscara, revalida campos com erro e salva o rascunho
  document.addEventListener("input", (evento) => {
    const campo = evento.target;
    const mascara = mascaras[campo.id];
    if (mascara) campo.value = mascara(campo.value);
    if (campo.classList.contains("invalido") && regras[campo.id]) validarCampo(campo);
    const form = campo.closest("#form-cadastro");
    if (form) salvarRascunho(coletarRascunho(form));
  });

  // focusout: valida o campo quando a pessoa sai dele
  document.addEventListener("focusout", (evento) => {
    const campo = evento.target;
    if (campo.closest("#form-cadastro") && regras[campo.id]) validarCampo(campo);
  });

  // submit: valida tudo, salva o cadastro e atualiza a lista
  document.addEventListener("submit", (evento) => {
    if (evento.target.id !== "form-cadastro") return;
    evento.preventDefault();
    const form = evento.target;
    area.querySelectorAll(".alerta").forEach((alerta) => alerta.remove());

    if (!validarFormulario(form)) {
      form.querySelector(".invalido")?.focus();
      form.insertAdjacentHTML("beforebegin", criarAlerta("erro", "Revise o formulário.", "Corrija os campos destacados e tente novamente.", "alert"));
      return;
    }

    salvarCadastro(montarCadastro(form));
    limparRascunho();
    form.insertAdjacentHTML("beforebegin", criarAlerta("sucesso", "Cadastro enviado!", "Obrigada por ajudar o Alimento que Abraça."));
    form.reset();
    limparEstados(form);
    atualizarListaCadastros(form);
  });

  // click: botão "Limpar cadastros"
  document.addEventListener("click", (evento) => {
    if (evento.target.id !== "limpar-cadastros") return;
    limparCadastros();
    document.getElementById("cadastros-salvos")?.remove();
  });
}