import { IMG_MARMITAS, IMG_CESTAS, FORMAS_CONTRIBUIR, BADGES, ALERTAS, ROTULOS_PARTICIPACAO } from "./dados.js";
import { criarCartao, criarBadge, criarAlerta } from "./componentes.js";
import { lerCadastros } from "./storage.js";
import { escaparHtml, formatarData } from "./utils.js";

export function templateInicio() {
  return `
<section class="secao container">
<h1>Alimento que Abraça</h1>
<p>Transformamos solidariedade em alimento para que ninguém precise enfrentar a fome sozinho.</p>
<p><a class="botao" href="#/cadastro">Quero ajudar</a></p>
</section>
<section class="secao container">
<h2>Quem somos?</h2>
<p>Somos uma organização movida pelo amor e pelo cuidado, nascida no seio da comunidade e formada por pessoas que já enfrentaram muitas dificuldades, incluindo aquela que hoje lutamos para combater: a fome.</p>
<p>Nosso objetivo é ajudar pessoas que realmente precisam, especialmente crianças e adolescentes em situação de rua, levando alimento, esperança, amor e alegria.</p>
</section>
<section class="secao container">
<h2>Nossa história</h2>
<p>A história do Alimento que Abraça começou a partir do desejo de um grupo de pessoas de transformar suas próprias experiências de dificuldade e fome em uma oportunidade de ajudar outras vidas.</p>
<p>Foi então que decidimos nos unir e transformar esse sentimento em ação, começando com a preparação e distribuição de refeições para quem precisava de ajuda.</p>
</section>
<section class="secao container">
<h2>O que fazemos</h2>
<div class="grid">
${criarCartao({ titulo: "Marmitas prontas", texto: "Preparamos e distribuímos marmitas prontas para pessoas em situação de rua, com cuidado e dignidade.", imagem: IMG_MARMITAS })}
${criarCartao({ titulo: "Mini cestas básicas", texto: "Montamos mini cestas com alimentos que não precisam de cozimento ou refrigeração.", imagem: IMG_CESTAS })}
</div>
</section>
<section class="secao container">
<h2>Formas de contribuir</h2>
<div class="grid">
${FORMAS_CONTRIBUIR.map((forma) => criarCartao({ ...forma, coluna: 3 })).join("")}
</div>
</section>`;
}

export function templateProjetos() {
  return `
<section class="secao container">
<h1>Nossos projetos</h1>
<p>Conheça as ações do Alimento que Abraça e descubra como participar.</p>
</section>
<div class="container grid">
${criarCartao({ nivel: 2, id: "alimentos", titulo: "Campanha de doação de alimentos", texto: "Arrecadamos alimentos para preparar marmitas e montar mini cestas básicas.", itens: ["Alimentos não perecíveis", "Alimentos que não precisam de cozimento ou refrigeração", "Embalagens para as marmitas"] })}
${criarCartao({ nivel: 2, id: "voluntariado", titulo: "Voluntariado", texto: "Voluntários ajudam a preparar, organizar e distribuir os alimentos.", itens: ["Preparação das refeições", "Montagem das mini cestas", "Distribuição nas ruas"] })}
${criarCartao({ nivel: 2, coluna: 12, titulo: "Campanha de doação financeira", texto: "Sua doação financeira ajuda a manter e ampliar as ações da ONG." })}
${criarCartao({ nivel: 2, id: "marmitas", titulo: "Distribuição de marmitas", texto: "Distribuímos marmitas prontas a pessoas em situação de rua, com cuidado e dignidade.", imagem: IMG_MARMITAS })}
${criarCartao({ nivel: 2, titulo: "Mini cestas básicas", texto: "As mini cestas reúnem alimentos que não precisam de cozimento ou refrigeração.", imagem: IMG_CESTAS })}
</div>
<section class="secao container">
<h2>Formas de participação</h2>
<p>Escolha como ajudar e faça seu cadastro.</p>
<p><a class="botao" href="#/cadastro">Quero participar</a></p>
</section>`;
}

export function templateListaCadastros() {
  const lista = lerCadastros();
  if (lista.length === 0) return "";
  const itens = lista
    .map((c) => {
      const rotulo = ROTULOS_PARTICIPACAO[c.participacao];
      const badge = rotulo ? criarBadge("sucesso", rotulo) : "";
      return `<li>${escaparHtml(c.nome)} (${escaparHtml(c.cidade)}) ${badge}<br><small>Enviado em ${formatarData(c.data)}</small></li>`;
    })
    .join("");
  return `
<section class="secao container" id="cadastros-salvos">
<h2>Cadastros recebidos neste navegador (${lista.length})</h2>
<ul>${itens}</ul>
<button type="button" class="botao botao-secundario" id="limpar-cadastros">Limpar cadastros</button>
</section>`;
}

export function templateCadastro() {
  return `
<section class="secao container">
<h1>Cadastro</h1>
<form id="form-cadastro" action="#" method="post" novalidate>
<fieldset>
<legend>Dados pessoais</legend>
<div class="grid">
<div class="campo col-12">
<label for="nome">Nome completo:</label>
<input type="text" id="nome" name="nome" required>
</div>
<div class="campo col-6">
<label for="email">E-mail:</label>
<input type="email" id="email" name="email" required>
</div>
<div class="campo col-6">
<label for="nascimento">Data de nascimento:</label>
<input type="date" id="nascimento" name="nascimento" required>
</div>
<div class="campo col-4">
<label for="cpf">CPF:</label>
<input type="text" id="cpf" name="cpf" inputmode="numeric" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" title="Use o formato 000.000.000-00" placeholder="000.000.000-00" required>
</div>
<div class="campo col-4">
<label for="telefone">Telefone:</label>
<input type="tel" id="telefone" name="telefone" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" title="Use o formato (11) 99999-9999" placeholder="(11) 99999-9999" required>
</div>
<div class="campo col-4">
<label for="senha">Senha:</label>
<input type="password" id="senha" name="senha" minlength="8" required>
</div>
</div>
</fieldset>
<fieldset>
<legend>Endereço</legend>
<div class="grid">
<div class="campo col-12">
<label for="endereco">Endereço:</label>
<input type="text" id="endereco" name="endereco" required>
</div>
<div class="campo col-5">
<label for="cidade">Cidade:</label>
<input type="text" id="cidade" name="cidade" required>
</div>
<div class="campo col-3">
<label for="estado">Estado:</label>
<input type="text" id="estado" name="estado" required>
</div>
<div class="campo col-4">
<label for="cep">CEP:</label>
<input type="text" id="cep" name="cep" inputmode="numeric" pattern="[0-9]{5}-[0-9]{3}" title="Use o formato 00000-000" placeholder="00000-000" required>
</div>
</div>
</fieldset>
<fieldset>
<legend>Forma de participação</legend>
<div class="grid">
<div class="campo col-4">
<label><input type="radio" name="participacao" value="alimentos" required> Doação de alimentos</label>
</div>
<div class="campo col-4">
<label><input type="radio" name="participacao" value="voluntariado"> Voluntariado</label>
</div>
<div class="campo col-4">
<label><input type="radio" name="participacao" value="financeira"> Doação financeira</label>
</div>
</div>
</fieldset>
<p><label><input type="checkbox" name="termos" required> Aceito os termos</label></p>
<button type="submit" class="botao">Enviar</button>
</form>
</section>
${templateListaCadastros()}`;
}

export function templateComponentes() {
  return `
<section class="secao container">
<h1>Componentes de feedback</h1>
<p>Guia de estilos com badges, alertas e modal, seguindo a paleta do design system.</p>
</section>
<section class="secao container" id="badges">
<h2>Badges</h2>
<p>${BADGES.map(([tipo, texto]) => criarBadge(tipo, texto)).join(" ")}</p>
</section>
<section class="secao container" id="alertas">
<h2>Alertas</h2>
${ALERTAS.map(([tipo, titulo, texto, role]) => criarAlerta(tipo, titulo, texto, role)).join("")}
</section>
<section class="secao container" id="modais">
<h2>Modal</h2>
<p><a class="botao" href="#modal-voluntario">Abrir modal</a></p>
<div class="modal" id="modal-voluntario" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
<div class="modal-caixa">
<h2 id="modal-titulo">Quero ser voluntário</h2>
<p>Ajude na preparação e na distribuição das marmitas. Faça seu cadastro e entraremos em contato.</p>
<div class="modal-acoes">
<a class="botao" href="#/cadastro">Ir para o cadastro</a>
<a class="botao botao-secundario" href="#modais">Fechar</a>
</div>
</div>
</div>
</section>`;
}

export function templateNaoEncontrada() {
  return `
<section class="secao container">
<h1>Página não encontrada</h1>
<p>O endereço que você tentou abrir não existe.</p>
<p><a class="botao" href="#/">Voltar ao início</a></p>
</section>`;
}