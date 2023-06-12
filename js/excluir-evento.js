const bsUrl = "https://soundgarden-api.vercel.app";
const id = window.location.search.substring(4);

window.onload = function() {
  carregamentoEvento();
}

async function carregamentoEvento() {
  try {
    const response = await fetch(`${bsUrl}/events/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const evento = await response.json();
      formularioDell(evento);
    } else {
      console.error("Erro!");
    }
  } catch (error) {
    console.error("Erro!", error);
  }
}

function formularioDell(evento) {
  document.querySelector('#nome').value = evento.name;
  document.querySelector('#banner').value = evento.poster;
  document.querySelector('#atracoes').value = evento.attractions.join(', ');
  document.querySelector('#descricao').value = evento.description;
  document.querySelector('#data').value = new Date(evento.scheduled).toLocaleString("pt-br");
  document.querySelector('#lotacao').value = evento.number_tickets;
}

document.getElementById("excluirEvento").addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(`${bsUrl}/events/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log("Evento Deletado!");
      } else {
        console.error("Erro!");
      }
    })
    .catch(error => {
      console.error("Erro!", error);
    });
});