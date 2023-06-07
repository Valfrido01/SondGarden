const base_URL = `https://soundgarden-api.vercel.app/`;


async function listaEvento(){
    var mensagemErro = document.getElementById('erro')
    try{
        var consultaDb = await fetch(`${base_URL}events`)
        var convertDb = await consultaDb.json()
        return convertDb
    }catch{
        mensagemErro.innerHTML`Evento nao encontrado`
        return[];
    }
};

const creatRow = (convertDb)=> { 
    var newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${convertDb.scheduled}</td>
    <td>${convertDb.name}</td>
    <td>${convertDb.attractions}</td>
    <td>
        <a href="reservas.html" class="btn btn-dark">ver reservas</a>
        <a href="editar.html" class="btn btn-secondary">editar</a>
        <a href="editar.html" class="btn btn-danger">excluir</a>
    </td>
    `
    document.querySelector('#tableEventos>tbody').oppendChild(newRow)
}


const updateTabela = () =>{
    var eventos = listaEvento()
    eventos.forEach(creatRow)
}

updateTabela()





// convertDb.forEach(element => {
//     const newItem = document.createElement('tr')
//     newItem.textContent = element.getElementById('row')

// });



// usar o GET
// const parametro = param =>{
//     return{
//         _id: param.location._id,
//         name: param.location.name,
//         poster: param.location.poter,
//         attractions: param.location.attractions,
//         description: param.location.description,
//         scheduled: param.location.scheduled,
//         number_tickets: param.location.number_tickets,
//         created_at: param.location.number_tickets,
//         updated_at: param.location.updated_at,
//         __v: param.location.__v
//     };
// };
