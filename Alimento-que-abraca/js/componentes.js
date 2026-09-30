export function criarCartao({ titulo, texto, coluna = 6, nivel = 3, id = "", itens = [], imagem = null }) {
  const atributoId = id ? ` id="${id}"` : "";
  const lista = itens.length ? `<ul>${itens.map((item) => `<li>${item}</li>`).join("")}</ul>` : "";
  const figura = imagem ? `<img class="imagem" src="imagens/${imagem.arquivo}" alt="${imagem.alt}">` : "";
  return `
<article class="cartao col-${coluna}"${atributoId}>
<h${nivel}>${titulo}</h${nivel}>
<p>${texto}</p>
${lista}
${figura}
</article>`;
}

export function criarBadge(tipo, texto) {
  return `<span class="badge badge-${tipo}">${texto}</span>`;
}

export function criarAlerta(tipo, titulo, texto, role = "status") {
  return `
<div class="alerta alerta-${tipo}" role="${role}">
<div><strong>${titulo}</strong> ${texto}</div>
</div>`;
}