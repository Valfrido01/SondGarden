const btnSubmit = document.querySelector(".btn-primary");
const descriptionSelector = document.querySelector('#descricao');

btnSubmit.addEventListener("click", () => cadastrarEvento());


async function cad(Url, corpo) {
    await fetch(Url,{
        method: 'POST',
        headers: { 'Content-type': 'application/json', },
        body: JSON.stringify(corpo),
    })
        .then(() => console.log(JSON.stringify(corpo)))
        .then(() => alert('Evento Cadastrado com Sucesso!'))
        .then(() => window.location.href = "admin.html")
        .catch((error) => alert('Não foi possível realizar o cadastro, tente novamente'))
}


function cadastrarEvento() {
    event.preventDefault()
    const Url = `https://soundgarden-api.vercel.app/events`;
    const nameSelector = document.querySelector('#nome').value;
    const attractionsSelector = document.querySelector('#atracoes').value.split(", ");
    const descriptionSelector = document.querySelector('#descricao').value;
    const dateSelector = document.querySelector('#data').value;
    const capacitySelector = document.querySelector('#lotacao').value;

    corpo =
    {
        "name": nameSelector,
        "poster": "https://i.imgur.com/fQHuZuv.png",
        "attractions": attractionsSelector,
        "description": descriptionSelector,
        "scheduled": dateSelector,
        "number_tickets": capacitySelector
    }
    cad(Url,corpo);
}