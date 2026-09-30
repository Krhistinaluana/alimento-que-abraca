import {
  templateInicio,
  templateProjetos,
  templateCadastro,
  templateComponentes,
  templateNaoEncontrada,
} from "./templates.js";
import { restaurarRascunho } from "./formulario.js";

const areaConteudo = document.getElementById("conteudo");

const rotas = {
  "/": { titulo: "Início", template: templateInicio },
  "/projetos": { titulo: "Projetos", template: templateProjetos },
  "/cadastro": { titulo: "Cadastro", template: templateCadastro },
  "/componentes": { titulo: "Componentes", template: templateComponentes },
};
const paginaNaoEncontrada = { titulo: "Página não encontrada", template: templateNaoEncontrada };

// "#/projetos/alimentos" vira { rota: "/projetos", secao: "alimentos" }
function lerRota() {
  const partes = location.hash.slice(1).split("/");
  return { rota: "/" + (partes[1] || ""), secao: partes[2] || "" };
}

function atualizarMenu(rota) {
  document.querySelectorAll(".menu a[data-rota]").forEach((link) => {
    if (link.dataset.rota === rota) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderizar() {
  const { rota, secao } = lerRota();
  const pagina = rotas[rota] || paginaNaoEncontrada;

  areaConteudo.innerHTML = pagina.template();
  restaurarRascunho();
  document.title = pagina.titulo + " - Alimento que Abraça";
  atualizarMenu(rota);
  document.getElementById("menu-toggle").checked = false;

  const alvo = secao ? document.getElementById(secao) : null;
  if (alvo) alvo.scrollIntoView();
  else window.scrollTo(0, 0);
  areaConteudo.focus({ preventScroll: true });
}

export function iniciarRoteador() {
  window.addEventListener("hashchange", () => {
    if (location.hash && !location.hash.startsWith("#/")) return;
    renderizar();
  });
  renderizar();
}