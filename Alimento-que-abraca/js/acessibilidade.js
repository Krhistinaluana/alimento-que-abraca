export function iniciarDialogoAcessivel() {
  const localizarDialogo = () => document.querySelector('[role="dialog"][aria-modal="true"]');

  function sincronizarDialogo() {
    const dialogo = localizarDialogo();
    if (!dialogo) return;

    const gatilho = document.querySelector(`a[href="#${dialogo.id}"]`);
    const caixa = dialogo.querySelector(".modal-caixa");
    caixa.tabIndex = -1;
    const aberto = location.hash === `#${dialogo.id}`;
    if (aberto) {
      const primeiroControle = dialogo.querySelector("a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex='-1'])");
      (primeiroControle || caixa).focus();
    } else if (dialogo.dataset.aberto === "true") {
      gatilho?.focus();
    }
    dialogo.dataset.aberto = String(aberto);
  }

  window.addEventListener("hashchange", sincronizarDialogo);
  document.addEventListener("keydown", (evento) => {
    const dialogo = localizarDialogo();
    if (!dialogo) return;
    if (location.hash !== `#${dialogo.id}`) return;
    const caixa = dialogo.querySelector(".modal-caixa");

    if (evento.key === "Escape") {
      evento.preventDefault();
      location.hash = "#modais";
      return;
    }

    if (evento.key !== "Tab") return;
    const controles = [...dialogo.querySelectorAll("a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex='-1'])")];
    if (controles.length === 0) {
      evento.preventDefault();
      caixa.focus();
      return;
    }

    const primeiro = controles[0];
    const ultimo = controles[controles.length - 1];
    if (evento.shiftKey && (document.activeElement === primeiro || !dialogo.contains(document.activeElement))) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && (document.activeElement === ultimo || !dialogo.contains(document.activeElement))) {
      evento.preventDefault();
      primeiro.focus();
    }
  });

  sincronizarDialogo();
}