const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

//Criando a tabela pacientes
const criarBanco = async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(
    `
        CREATE TABLE IF NOT EXISTS paciente(

            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade INTEGER,
            descricao TEXT,
            estado_saude TEXT,
            autonomia TEXT,
            medicamentos TEXT,
            alergias TEXT,
            data_atendimento TEXT,
            endereco_residencia TEXT,
            contato_emergencia TEXT                            
        )
    `,
  );

  //console.log("Banco de dados e tabela prontos!");

  //**************************
  //INSERT - C - CRUD - Create
  //**************************

  await db.exec(`
    INSERT INTO paciente (nome, idade, descricao, estado_saude, autonomia, medicamentos, alergias, data_atendimento, endereco_residencia, contato_emergencia) VALUES
    ("João Silva", "75", "Medicado conforme prescrição, o paciente estava bastante disposto e alimentou-se adequadamente em todas as refeições.", "Houve uma melhora referente à circulação nas pernas.", "Paciente comeu sozinho e realizou seus alongamentos de forma independente.", "Losartana (08:00, 50mg, para Hipertensão)", "Alergia a Penicilina", "20/04/2026", "Rua das Flores, 123 - Centro", "(11) 98765-4321"),
    ("Maria Oliveira", "82", "Foi dada a medicação no horário, paciente teve uma tarde muito alegre ouvindo música, com clara melhora em seu estado geral de saúde.", "Houve uma melhora expressiva na glicemia, que se manteve estável o dia todo.", "Paciente comeu sozinha e se vestiu com pouquíssima ajuda.", "Metformina (12:00, 850mg, para Diabetes)", "Alergia a Dipirona", "21/04/2026", "Av. Paulista, 987 - Bela Vista", "(11) 91234-5678"),
    ("Antônio Santos", "78", "Foi dada a medicação correta, paciente aproveitou o sol da manhã no pátio e manteve uma ótima hidratação.", "Houve uma melhora referente ao sono, tendo dormido a noite toda sem interrupções.", "Paciente comeu sozinho e realizou suas leituras de forma totalmente independente.", "Omeprazol (06:00, 20mg, para Refluxo Gastroesofágico)", "Intolerância à Lactose e Alergia a Corantes", "22/04/2026", "Rua XV de Novembro, 45 - Vila Rica", "(11) 99887-7665"),
    ("Ana Costa", "80", "Medicação servida pontualmente, paciente ajudou a cuidar das plantas internas, demonstrando grande autonomia e bem-estar.", "Houve uma melhora referente ao vigor físico geral.", "Paciente comeu sozinha, tomou banho sozinha e caminhou sem nenhum acompanhamento.", "Sinvastatina (20:00, 20mg, para Colesterol Alto)", "Alergia a Frutos do Mar e Ácaros", "23/04/2026", "Rua Augusta, 321 - Consolação", "(11) 94567-8901")
  
  `);

  //console.log("Tabela criada e inserido os nomes dos pacientes!")


  //**************************
  //SELECT - R - CRUD - Read
  //**************************

    const listaPacientes = await db.all(`SELECT * FROM paciente`);

    //console.table(listaPacientes);

    const pacienteEspecifico = await db.all(`
      SELECT descricao FROM paciente WHERE id = 3
    `)
    //console.table(pacienteEspecifico);

  //**************************
  //UPDATE - U - CRUD - Update
  //**************************
    //Run - ação
    await db.run(`
      UPDATE paciente
      SET descricao = "Paciente teve um dia e refeições de forma tranquila."
      WHERE id = 2      
    `)

    const infoPacienteAtualizado = await db.get(`
      
      SELECT * FROM paciente WHERE id = 2
    `)

    //console.table(infoPacienteAtualizado);



  //***************************
  //REMOVER - D - CRUD - Delete
  //***************************

  await db.run(`
    
    DELETE FROM paciente
    WHERE id = 3    
  `)

};

criarBanco();