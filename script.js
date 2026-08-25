document.addEventListener("DOMContentLoaded", () => {
  const hubView = document.getElementById("hub-view");
  const cartaView = document.getElementById("carta-view");
  const cartasList = document.getElementById("cartas-list");
  const voltarBtn = document.getElementById("voltar-btn");

  const cartaTitulo = document.getElementById("carta-titulo");
  const cartaData = document.getElementById("carta-data");
  const cartaTexto = document.getElementById("carta-texto");

  // Busca o arquivo JSON de índice
  fetch("cartas/cartas.json")
    .then((res) => {
      if (!res.ok) throw new Error("Não foi possível carregar cartas.json");
      return res.json();
    })
    .then((cartas) => renderizarHub(cartas))
    .catch((err) => console.error("Erro ao carregar o hub:", err));

  function renderizarHub(cartas) {
    cartasList.innerHTML = "";
    cartas.forEach((carta) => {
      const li = document.createElement("li");
      li.className = "card-item";
      li.innerHTML = `
        <h3>${carta.titulo}</h3>
        <time>${formatarData(carta.data)}</time>
      `;
      li.addEventListener("click", () => abrirCarta(carta));
      cartasList.appendChild(li);
    });
  }

  function abrirCarta(carta) {
    fetch(`cartas/${carta.arquivo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Carta não encontrada");
        return res.text();
      })
      .then((texto) => {
        cartaTitulo.textContent = carta.titulo;
        cartaData.textContent = formatarData(carta.data);
        cartaTexto.textContent = texto;

        hubView.classList.add("hidden");
        cartaView.classList.remove("hidden");
      })
      .catch((err) => console.error("Erro ao abrir carta:", err));
  }

  voltarBtn.addEventListener("click", () => {
    cartaView.classList.add("hidden");
    hubView.classList.remove("hidden");
  });

  function formatarData(dataIso) {
    const [ano, mes, dia] = dataIso.split("-");
    return `${dia}/${mes}/${ano}`;
  }
});

