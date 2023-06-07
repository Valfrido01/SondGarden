const base_URL = (`https://soundgarden-api.vercel.app/`)

async function createEvent(novoEvento){
    try{
        var consultaDb = await fetch(`${base_URL}events`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoEvento)
        });

        if(consultaDb.ok){
            console.log('Evento Cadastrado !');
        }else{
            console.error('Evento Nao Cadastrado !', consultaDb.status)
        }
    }catch(erro){
        alert.error('Erro no cadastro:', erro)
    }
};

const formulario = document.querySelectorAll('form')

formulario.addEventListener('submit', async () => {
    
    const nome = document.getElementById('name').value;
    const atracoes = document.getElementById('attractions').value;
    const descricao = document.getElementById('description').value;
    const data = document.getElementById('scheduled').value;
    const lotacao = document.getElementById('number_tickets').value;

    const evento_Db = {
        nome: nome,
        atracoes: atracoes,
        descricao: descricao,
        data: data,
        lotacao: lotacao
    };

    await cadastrarEvento(evento_Db);
});