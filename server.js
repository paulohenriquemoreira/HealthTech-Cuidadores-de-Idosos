//Importar o framework express
const express = require('express');
const cors = require("cors");

//Criando a aplicação (servidor)
const app = express();
app.use(cors());

//Configura o express para entender os dados enviados no formato JSON.
app.use(express.json());

//Rota principal (/)
app.get("/", (req, res) => {

    res.send(`
        <body>
            <h1>HealthTech (Cuidadores de Idosos)</h1>
            <h2>Rotina Fragmentada de Atendimento Individual a Idosos</h2>
            <p> Endpoint que leva aos pacientes cadastrados: /pacientes</p>
        </body>
    `)

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//Rota de Pacientes


const listaPacientes = [
    {
        id:1,
        nome:"João Roberto",
        idade:"55 anos",
        descricao:"Foi medicado corretamente,paciente teve um dia calmo com leitura.",
        estado_saude:"Houve uma melhora referente aos picos de pressão arterial",
        autonomia:"Se alimentou e fez atividades sem auxílio.",
        medicamentos:"Sinvastatina (20:00, 20mg, para Colesterol Alto) e Losartana (08:00, 50mg, para Hipertensão)",
        alergias:"Penicilina",
        data_atendimento:"06/04/2026",
        endereco_residencia:"Rua das Flores, 123 - Centro",
        contato_emergencia:"(11) 98765-4321",
    },
    {
        id:2,
        nome:"Ana Castela",
        idade:"67 anos",
        descricao:"Foi medicada no horário,paciente teve um dia sem intercorrências.",
        estado_saude:"Demonstrou piora no quadro de Alzheimer.",
        autonomia:"Se alimentou e fez atividades sem auxílio.",
        medicamentos:"Donepezila (22:00, 10mg, para Alzheimer)",
        alergias:"Ácido Acetilsalicílico (Aspirina)",
        data_atendimento:"07/04/2026",
        endereco_residencia:"Av. Brasil, 1500 - Jardim América",
        contato_emergencia:"(11) 93322-1144",
    }
]


app.get("/pacientes", (req, res) => {
  
    res.json(listaPacientes);

});

//Parâmetros de Rota de Pacientes
app.get("/pacientes/:id", (req, res) => {

    const idPegoURL = Number(req.params.id);
    const pacienteEncontrado = listaPacientes.find((listaPacientes) => listaPacientes.id === idPegoURL);

    res.json(pacienteEncontrado);

});


//Rota de Novos Pacientes (Verbo POST)

app.post("/pacientes",(req, res) => {

  const novoPaciente = {
    id: listaPacientes.length + 1,
    nome: req.body.nome,
    idade:req.body.idade,
    descricao:req.body.descricao,
    estado_saude:req.body.estado_saude,
    autonomia:req.body.autonomia,
    medicamentos:req.body.medicamentos,
    alergias:req.body.alergias,
    data_atendimento:req.body.data_atendimento,
    endereco_residencia:req.body.endereco_residencia,
    contato_emergencia:req.body.contato_emergencia,
  };

  listaPacientes.push(novoPaciente);
  res.send(`Paciente ${novoPaciente.nome} cadastrado com sucesso!`);
});


