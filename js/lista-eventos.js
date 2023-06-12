const baseURL = "https://soundgarden-api.vercel.app";
let botaoReserva = [];

window.onload = function() {
  loadEvents();
};

async function loadEvents() {
  let eventos;
  await fetch(`${baseURL}/events`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao obter os eventos');
    }
  })
  .then(data => {
    eventos = data;
    for (let i = 0; i < eventos.length; i++) {
      createCard(eventos[i], i);
    }
    listarEventosFazerReserva();
  })
  .then(() => {
    var modal = document.getElementById("myModal");
    for (let index = 0; index < botaoReserva.length; index++) {
      document.getElementById(`${botaoReserva[index].id}`).addEventListener("click", (event) => {
        const botaoAlvo = event.target
        const idevento = botaoAlvo.getAttribute("idevento")
        document.querySelector("#id").value = idevento;
        event.preventDefault()
        modal.style.display = "block";
      })
    }
  })
  .catch(error => console.log(error));
}

function createCard(element, i) {
  const divEventos = document.getElementById('divEventos');
  if (divEventos) {
    divEventos.insertAdjacentHTML("beforeEnd", `
      <article class="evento card p-5 m-3">
        <h2>${element.name} - ${element.scheduled}</h2>
        <h4>${element.attractions}</h4>
        <p>${element.description}</p>
        <a idevento="${element._id}" id="botao-reservar${i}" class="btn btn-primary">reservar ingresso</a>
      </article>
    `);
    botaoReserva.push(document.getElementById(`botao-reservar${i}`));
  }
}

const listarEventosFazerReserva = async () => {
  await fetch(`${baseURL}/events`)
    .then(response => response.json())
    .then(listaDeEventos => {
      listaDeEventos.sort((a, b) => {
        return new Date(a.scheduled) - new Date(b.scheduled);
      });

      const eventosFuturos = listaDeEventos.filter(data => {
        const agora = new Date();
        return new Date(data.scheduled) > agora;
      });

      modalReservarIngresso();
    })
    .catch(error => console.log('error', error));
}

const modalReservarIngresso = () => {
  const modal = document.getElementById("myModal");
  if (modal) {
    const formIngresso = document.querySelector("#reserva");

    const botaoConfirmar = document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-primary");
    botaoConfirmar.addEventListener("click", (event) => {
      event.preventDefault();
      const corpoPost = {
        owner_name: formIngresso[2].value,
        owner_email: formIngresso[3].value,
        number_tickets: formIngresso[1].value,
        event_id: formIngresso[0].value
      }

      fetch(`${baseURL}/bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corpoPost),
      })
      .then(() => {
        alert("Parabéns, sua reserva está concluída!");
      })
      .then(() => window.location.href = "admin.html")
      .catch(error => console.log('error', error));
    });
  }
};
