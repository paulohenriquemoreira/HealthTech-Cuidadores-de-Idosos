//Importar o framework express
const express = require('express')

//Criando a aplicação (servidor)
const app = express()

//Configura o express para entender os dados enviados no formato JSON.
app.use(express.json());

//Rota principal
app.get("/", (req, res) => {

    res.send(`
        <body>
            <h1>HealthTech (Cuidadores de Idosos)</h1>
            <h2>Rotina Fragmentada de Atendimento Individual a Idosos</h2>
            <p> Endpoint que leva aos pacientes cadastrados: /pacientes</p>
        </body>
    `)

})


const PORT = 3000;

app.listen(PORT, () => {
    
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    
});



