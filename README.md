# Alimento que Abraça

Site de uma ONG fictícia que combate a fome entre famílias com crianças e adolescentes em situação de rua. Projeto acadêmico da disciplina de Desenvolvimento Front-end (Engenharia de Software, Universidade Cruzeiro do Sul).

## Demonstração

Site publicado: https://krhistinaluana.github.io/alimento-que-abraca/

## Sobre o projeto

O Alimento que Abraça nasceu de pessoas que já viveram a fome e decidiram transformar essa experiência em ajuda. O site apresenta a ONG, suas ações (marmitas prontas e mini cestas básicas) e as formas de contribuir: doação de alimentos, voluntariado, doação financeira e divulgação.

## Funcionalidades

- Página única (SPA) com rotas por hash: início, projetos, cadastro e componentes.
- Menu responsivo com dropdown no computador e hambúrguer no celular.
- Layout com Grid de 12 colunas e 5 breakpoints (480, 768, 1024, 1280 e 1600 px).
- Formulário de cadastro com máscaras (CPF, telefone e CEP), validação com RegEx e mensagens de erro.
- Rascunho do formulário e cadastros enviados guardados no navegador (localStorage).
- Componentes de feedback: badges, alertas e modal.

## Tecnologias

- HTML5 semântico
- CSS3: variáveis (design system), Grid, Flexbox e media queries
- JavaScript com ES Modules (sem framework)
- Day.js (formatação de datas, via CDN)
- Git e GitHub (versionamento, GitFlow)

## Estrutura de pastas

```
Alimento-que-abraca/
├── index.html          # página inicial (shell da SPA)
├── css/
│   └── style.css       # design system, layout e componentes
├── html/               # versões estáticas das páginas
├── imagens/            # marmitas e cestas (JPG e PNG)
└── js/
    ├── main.js         # ponto de entrada
    ├── router.js       # rotas e renderização
    ├── templates.js    # HTML de cada página
    ├── componentes.js  # cartão, badge e alerta
    ├── dados.js        # conteúdos reutilizáveis
    ├── storage.js      # localStorage
    ├── mascaras.js     # máscaras de digitação
    ├── validacao.js    # regras e estados de erro
    ├── formulario.js   # eventos do formulário
    ├── menu.js         # menu mobile e tecla Esc
    └── utils.js        # funções auxiliares
```

## Como executar

**Pré-requisitos:** Visual Studio Code com a extensão Live Server (ou qualquer servidor local).

1. Clone o repositório:
   ```
   git clone https://github.com/Krhistinaluana/alimento-que-abraca.git
   ```
2. Abra a pasta no VS Code.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

O projeto usa módulos ES, que não funcionam abrindo o arquivo com duplo clique (`file://`). Não há dependências para instalar nem etapa de build.

## Testes

Não há testes automatizados. Os testes foram feitos manualmente:

- Navegação por todas as rotas, pelo menu e pelo submenu.
- Formulário com campos vazios, CPF inválido e dados corretos.
- Persistência: recarregar a página e conferir rascunho e lista de cadastros.
- Validação do HTML no W3C Markup Validator.

## Versionamento

O projeto segue o GitFlow:

- `main`: versões estáveis, marcadas com tag (ex.: v1.0.0).
- `develop`: desenvolvimento contínuo.
- `feature/*`: cada funcionalidade em uma branch própria.
- `release/*` e `hotfix/*`: preparação de versões e correções urgentes.

As mensagens de commit seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`).

## Manutenção

- Textos, imagens e listas: `js/dados.js` e `js/templates.js`.
- Cores, tipografia e espaçamentos: variáveis no início de `css/style.css`.
- Para contribuir, crie uma branch `feature/nome` a partir da `develop` e abra um pull request.

## Autoria

Luana ([@Krhistinaluana](https://github.com/Krhistinaluana)), estudante de Engenharia de Software. Projeto de fins educacionais; a ONG e os dados de contato são fictícios.