export function iniciarMenu() {
  const alternador = document.getElementById("menu-toggle");

  // click: fecha o menu mobile ao escolher um link
  document.addEventListener("click", (evento) => {
    if (evento.target.closest(".menu a")) alternador.checked = false;
  });

  // keydown: a tecla Esc fecha o menu e o modal
  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    alternador.checked = false;
    if (location.hash === "#modal-voluntario") location.hash = "#modais";
  });
}