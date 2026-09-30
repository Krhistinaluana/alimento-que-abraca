export function iniciarMenu() {
  const alternador = document.getElementById("menu-toggle");
  const atualizarEstado = () => alternador.setAttribute("aria-expanded", String(alternador.checked));

  alternador.addEventListener("change", atualizarEstado);

  // click: fecha o menu mobile ao escolher um link
  document.addEventListener("click", (evento) => {
    if (evento.target.closest(".menu a")) {
      alternador.checked = false;
      atualizarEstado();
    }
  });

  // keydown: a tecla Esc fecha o menu e o modal
  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    alternador.checked = false;
    atualizarEstado();
    if (location.hash === "#modal-voluntario") location.hash = "#modais";
  });
}