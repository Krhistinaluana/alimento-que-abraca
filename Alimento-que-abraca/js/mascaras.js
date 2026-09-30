import { somenteNumeros } from "./utils.js";

function mascararCpf(valor) {
  const n = somenteNumeros(valor).slice(0, 11);
  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`;
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`;
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`;
}

function mascararTelefone(valor) {
  const n = somenteNumeros(valor).slice(0, 11);
  if (n.length === 0) return "";
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function mascararCep(valor) {
  const n = somenteNumeros(valor).slice(0, 8);
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n;
}

// Liga o id de cada campo à sua máscara
export const mascaras = {
  cpf: mascararCpf,
  telefone: mascararTelefone,
  cep: mascararCep,
  estado: (valor) => valor.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase(),
};