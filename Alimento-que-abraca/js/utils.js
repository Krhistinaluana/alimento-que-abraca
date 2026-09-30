export function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

// Texto digitado pela pessoa nunca entra cru no innerHTML
export function escaparHtml(texto) {
  const trocas = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(texto).replace(/[&<>"']/g, (caractere) => trocas[caractere]);
}

// Usa a biblioteca Day.js (CDN); se não carregar, usa o recurso nativo
export function formatarData(iso) {
  if (typeof dayjs === "undefined") return new Date(iso).toLocaleString("pt-BR");
  return dayjs(iso).locale("pt-br").format("D [de] MMMM [de] YYYY, HH:mm");
}