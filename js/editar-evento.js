const baseURL = "https://soundgarden-api.vercel.app";

const getEvent = async (id) => {
  try {
    const response = await fetch(`${baseURL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao obter o evento');
    }
    const evento = await response.json();
    return evento;
  } catch (error) {
    console.log(error);
  }
};

const fillForm = (evento) => {
  document.querySelector('#nome').value = evento.name;
  document.querySelector('#banner').value = evento.poster;
  document.querySelector('#atracoes').value = evento.attractions.join(', ');
  document.querySelector('#descricao').value = evento.description;
  const scheduledDate = new Date(evento.scheduled).toISOString().split('T')[0];
  const scheduledTime = new Date(evento.scheduled).toISOString().split('T')[1].split('.')[0];
  document.querySelector('#data').value = `${scheduledDate}T${scheduledTime}`;
  document.querySelector('#lotacao').value = evento.number_tickets;
};

const atualizaEvento = async () => {
  event.preventDefault();

  const nameInput = document.querySelector('#nome').value;
  const attractionsInput = document.querySelector('#atracoes').value.split(", ");
  const descriptionInput = document.querySelector('#descricao').value;
  const scheduledInput = new Date(document.querySelector('#data').value).toISOString();
  const capacityInput = document.querySelector('#lotacao').value;
  
  const corpo = {
    name: nameInput,
    poster: "https://i.imgur.com/fQHuZuv.png",
    attractions: attractionsInput,
    description: descriptionInput,
    scheduled: scheduledInput,
    number_tickets: capacityInput
  };

  const okToEdit = confirm("Tem certeza que deseja editar este evento?");
  if (okToEdit) {
    try {
      const ID = window.location.search.substring(4);
      const response = await fetch(`${baseURL}/events/${ID}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT, POST, PATCH. DELETE, GET',
        },
        body: JSON.stringify(corpo)
      });
      if (!response.ok) {
        throw new Error('Erro ao editar o evento');
      }
      console.log(JSON.stringify(corpo));
      alert('Evento Editado com Sucesso');
      window.location.href = "admin.html";
    } catch (error) {
      console.log('error', error);
      alert('Não foi possível realizar a edição deste evento, tente novamente');
    }
  }
};

window.onload = async function() {
  const ID = window.location.search.substring(4);
  const evento = await getEvent(ID);
  fillForm(evento);
};

const btnSubmit = document.querySelector(".btn-primary");
btnSubmit.addEventListener("click", atualizaEvento);







