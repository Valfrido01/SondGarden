const baseURL = "https://soundgarden-api.vercel.app";

window.onload = function() {
  loadEvents();
};

function loadEvents() {
  let eventos;
  fetch(`${baseURL}/events`, 
  {
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
    let maxCards = (eventos.length > 3) ? 3 : eventos.length; 
    for (let i = 0; i < maxCards; i++) {
      createCard(eventos[i], i);
    }
    listarReservaIngrssos();
  })
  .catch(error => console.log(error));
}

function createCard(element, i) {
  document.getElementById('divEventos').insertAdjacentHTML("beforeEnd", `
    <article class="evento card p-5 m-3">
      <h2>${element.name} - ${element.scheduled}</h2>
      <h4>${element.attractions}</h4>
      <p>${element.description}</p>
      <a idEvento="${element._id}" id="botao-reservar${i}" class="btn btn-primary">reservar ingresso</a>
    </article>
  `);
}

const listarReservaIngrssos = async() => {
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

  const formReservarIngresso = document.querySelector("#reserva");

  document.getElementById("botao-reservar0").addEventListener("click", (event) => {
    const botaoAlvo = event.target;
    const idevento = botaoAlvo.getAttribute("idevento");
    document.querySelector("#id").value = idevento;
  });

  document.getElementById("botao-reservar1").addEventListener("click", (event) => {
    const botaoAlvo = event.target;
    const idevento = botaoAlvo.getAttribute("idevento");
    document.querySelector("#id").value = idevento;
  });

  document.getElementById("botao-reservar2").addEventListener("click", (event) => {
    const botaoAlvo = event.target;
    const idevento = botaoAlvo.getAttribute("idevento");
    document.querySelector("#id").value = idevento;
  });

  const botaoConfirmar = document.querySelector("#myModal > div > div > div.modal-footer > button.btn.btn-primary");
  botaoConfirmar.addEventListener("click", (event) => {
    event.preventDefault();
    const corpoPost = {
      owner_name: formReservarIngresso[2].value,
      owner_email: formReservarIngresso[3].value,
      number_tickets: formReservarIngresso[1].value,
      event_id: formReservarIngresso[0].value
    };

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
};






