import { somenteNumeros } from "./utils.js";

const ok = (condicao, mensagem) => (condicao ? "" : mensagem);

// Confere os dois dígitos verificadores do CPF
function validarCpf(cpf) {
  const n = somenteNumeros(cpf);
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(n[t])) return false;
  }
  return true;
}

// Cada regra devolve "" (válido) ou a mensagem de erro
export const regras = {
  nome: (v) => ok(/^[A-Za-zÀ-ÿ']+( [A-Za-zÀ-ÿ']+)+$/.test(v), "Informe nome e sobrenome, usando apenas letras."),
  email: (v) => ok(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Digite um e-mail válido, como nome@email.com."),
  nascimento: (v) => ok(new Date(v) <= new Date(), "A data de nascimento não pode ser no futuro."),
  cpf: (v) => {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v)) return "Use o formato 000.000.000-00.";
    return ok(validarCpf(v), "Este CPF não é válido.");
  },
  telefone: (v) => ok(/^\(\d{2}\) \d{5}-\d{4}$/.test(v), "Use o formato (11) 99999-9999."),
  senha: (v) => ok(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v), "Use no mínimo 8 caracteres, com letras e números."),
  endereco: (v) => ok(v.length >= 5, "Informe o endereço completo."),
  cidade: (v) => ok(/^[A-Za-zÀ-ÿ' .-]{2,}$/.test(v), "Informe o nome da cidade."),
  estado: (v) => ok(/^[A-Za-z]{2}$/.test(v), "Use a sigla do estado, como SP."),
  cep: (v) => ok(/^\d{5}-\d{3}$/.test(v), "Use o formato 00000-000."),
};

// Aplica (ou limpa) o estado visual e a mensagem de um campo
function mostrarEstado(campo, mensagem, ancora = campo, posicao = "afterend") {
  const chave = campo.id || campo.name;
  document.getElementById(`erro-${chave}`)?.remove();
  campo.classList.toggle("invalido", mensagem !== "");
  campo.classList.toggle("valido", mensagem === "");
  campo.setAttribute("aria-invalid", mensagem !== "");
  if (mensagem) {
    ancora.insertAdjacentHTML(posicao, `<p class="mensagem-erro" id="erro-${chave}">${mensagem}</p>`);
    campo.setAttribute("aria-describedby", `erro-${chave}`);
  } else {
    campo.removeAttribute("aria-describedby");
  }
}

export function validarCampo(campo) {
  const valor = campo.type === "password" ? campo.value : campo.value.trim();
  const mensagem = valor === "" ? "Preencha este campo." : regras[campo.id](valor);
  mostrarEstado(campo, mensagem);
  return mensagem === "";
}

function validarParticipacao(form) {
  const radios = form.querySelectorAll('input[name="participacao"]');
  const escolhido = form.querySelector('input[name="participacao"]:checked');
  const mensagem = escolhido ? "" : "Escolha uma forma de participação.";
  mostrarEstado(radios[0], mensagem, radios[0].closest("fieldset"), "beforeend");
  return mensagem === "";
}

function validarTermos(form) {
  const campo = form.querySelector('input[name="termos"]');
  const mensagem = campo.checked ? "" : "É necessário aceitar os termos.";
  mostrarEstado(campo, mensagem, campo.closest("p"), "afterend");
  return mensagem === "";
}

// Valida tudo (mesmo que o primeiro campo falhe) e diz se o formulário está correto
export function validarFormulario(form) {
  const resultados = [...form.querySelectorAll("input")]
    .filter((campo) => regras[campo.id])
    .map((campo) => validarCampo(campo));
  resultados.push(validarParticipacao(form), validarTermos(form));
  return resultados.every(Boolean);
}

export function limparEstados(form) {
  form.querySelectorAll(".invalido, .valido").forEach((campo) => {
    campo.classList.remove("invalido", "valido");
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
  });
  form.querySelectorAll(".mensagem-erro").forEach((mensagem) => mensagem.remove());
}