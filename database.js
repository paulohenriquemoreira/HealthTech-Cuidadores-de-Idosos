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
        CREATE TABLE IF NOT EXISTS pacientes(

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

  console.log("Banco de dados e tabela prontos!");

  //************************
  //Create - C CRUD
  //************************

  await db.exec(`
    INSERT INTO pacientes (nome, idade, descricao, estado_saude, autonomia, medicamentos, alergias, data_atendimento, endereco_residencia, contato_emergencia) VALUES
    ("João Silva", "75", "Foi dada a medicação no horário correto, paciente descansou bem à tarde, obtendo uma melhora no seu estado de saúde geral e disposição.", "Houve uma melhora referente à fraqueza nas pernas e cansaço.", "Paciente comeu sozinho e conseguiu realizar a caminhada matinal com acompanhamento.", "Losartana (08:00, 50mg, para Hipertensão)", "Alergia a Penicilina", "06/04/2026", "Rua das Flores, 123 - Centro", "(11) 98765-4321"),
    ("Maria Oliveira", "82", "Foi dada a medicação no horário correto, paciente se alimentou de forma adequada e interagiu bem, obtendo uma melhora em sua autonomia.", "Houve uma melhora referente à dor nas articulações.", "Paciente comeu com leve auxílio e realizou exercícios de alongamento sozinha.", "Metformina (12:00, 850mg, para Diabetes)", "Alergia a Dipirona", "07/04/2026", "Av. Paulista, 987 - Bela Vista", "(11) 91234-5678"),
    ("Antônio Santos", "78", "Foi dada a medicação no horário correto, paciente teve um dia calmo com leitura, refletindo uma melhora no seu estado de saúde digestivo.", "Houve uma melhora referente ao refluxo e azia.", "Paciente comeu sozinho e tomou banho de forma independente.", "Omeprazol (06:00, 20mg, para Refluxo Gastroesofágico)", "Intolerância à Lactose e Alergia a Corantes", "08/04/2026", "Rua XV de Novembro, 45 - Vila Rica", "(11) 99887-7665"),
    ("Ana Costa", "80", "Foi dada a medicação noturna corretamente, paciente esteve bastante comunicativa, mantendo uma excelente autonomia durante o dia.", "Houve uma melhora referente aos picos de pressão arterial.", "Paciente comeu sozinha e conseguiu realizar suas atividades de rotina sem acompanhamento.", "Sinvastatina (20:00, 20mg, para Colesterol Alto)", "Alergia a Frutos do Mar e Ácaros", "09/04/2026", "Rua Augusta, 321 - Consolação", "(11) 94567-8901"),
    ("Carlos Pereira", "85", "Foi dada a medicação no horário correto, paciente apresentou comportamento tranquilo e foco nas atividades lúdicas, melhorando seu estado de saúde mental.", "Houve uma melhora referente à agitação matinal.", "Paciente precisou de auxílio para se alimentar, mas realizou os exercícios motores sozinho.", "Donepezila (22:00, 10mg, para Alzheimer)", "Alergia a Ácido Acetilsalicílico (Aspirina)", "10/04/2026", "Av. Brasil, 1500 - Jardim América", "(11) 93322-1144"),
    ("Teresa Lima", "77", "Foi dada a medicação preventiva, paciente teve um ótimo apetite no almoço, obtendo uma melhora na energia para fisioterapia.", "Houve uma melhora referente à dor lombar.", "Paciente comeu sozinha e realizou os exercícios de fortalecimento com acompanhamento.", "Alendronato (07:00, 70mg, para Osteoporose)", "Alergia a Poeira e Ibuprofeno", "11/04/2026", "Rua da Paz, 77 - Santo Amaro", "(11) 97788-9900"),
    ("João Silva", "75", "Foi dada a medicação no horário, paciente participou ativamente das conversas no jardim, obtendo excelente melhora no estado de saúde.", "Houve uma melhora referente à fadiga crônica.", "Paciente comeu sozinho e andou pelo jardim sem necessidade de acompanhamento.", "Losartana (08:00, 50mg, para Hipertensão)", "Alergia a Penicilina", "13/04/2026", "Rua das Flores, 123 - Centro", "(11) 98765-4321"),
    ("Maria Oliveira", "82", "Medicação administrada na hora, refeições bem aceitas. A paciente apresentou grande melhora na sua autonomia durante o banho.", "Houve uma melhora referente a um leve resfriado adquirido dias antes.", "Paciente comeu sozinha e realizou a higiene pessoal com mínimo acompanhamento.", "Metformina (12:00, 850mg, para Diabetes)", "Alergia a Dipirona", "14/04/2026", "Av. Paulista, 987 - Bela Vista", "(11) 91234-5678"),
    ("Antônio Santos", "78", "Foi dada a medicação no horário correto, o paciente descansou adequadamente e obteve uma digestão tranquila.", "Houve estabilidade referente à digestão, sem novos episódios de desconforto gástrico.", "Paciente alimentou-se sozinho e caminhou de forma independente.", "Omeprazol (06:00, 20mg, para Refluxo Gastroesofágico)", "Intolerância à Lactose e Alergia a Corantes", "15/04/2026", "Rua XV de Novembro, 45 - Vila Rica", "(11) 99887-7665"),
    ("Ana Costa", "80", "Recebeu a medicação pontualmente, teve um dia sociável e alimentou-se muito bem, obtendo melhora em sua autonomia e estado de saúde.", "Houve uma melhora referente a episódios de tontura.", "Paciente comeu sozinha e conseguiu realizar as atividades de coordenação motora sozinha.", "Sinvastatina (20:00, 20mg, para Colesterol Alto)", "Alergia a Frutos do Mar e Ácaros", "16/04/2026", "Rua Augusta, 321 - Consolação", "(11) 94567-8901"),
    ("Carlos Pereira", "85", "Foi dada a medicação no horário correto, paciente assistiu televisão e manteve um bom nível de atenção.", "Houve uma melhora referente à leve confusão mental noturna.", "Paciente alimentou-se com leve acompanhamento e caminhou sozinho pelo corredor.", "Donepezila (22:00, 10mg, para Alzheimer)", "Alergia a Ácido Acetilsalicílico (Aspirina)", "17/04/2026", "Av. Brasil, 1500 - Jardim América", "(11) 93322-1144"),
    ("Teresa Lima", "77", "Foi dada a medicação no horário correto, paciente participou da aula de artesanato, melhorando seu humor e estado de saúde.", "Houve uma melhora contínua referente à rigidez matinal nas mãos.", "Paciente comeu sozinha e fez os exercícios manuais sem acompanhamento.", "Alendronato (07:00, 70mg, para Osteoporose)", "Alergia a Poeira e Ibuprofeno", "18/04/2026", "Rua da Paz, 77 - Santo Amaro", "(11) 97788-9900")

  `);

  console.log("Tabela criada e lista de pacientes inserida")


  //************************
  //Select - R CRUD  Read
  //************************

    const paciente = await db.all(`SELECT * FROM pacientes`);
    console.table(paciente);
    
    const pacienteEspecifico = await db.all(`SELECT descricao FROM pacientes WHERE id = 2`);
    console.log(pacienteEspecifico);



  //************************
  //Update - U CRUD  Update
  //************************


    await db.run(`
        UPDATE pacientes
        SET descricao = "Medicação em horário correto, paciente se alimentou sozinho, melhorou a autonomia"
        WHERE id = 2 
        
    `)

    console.log("Descrição do id 2 atualizada")


    const infoPacienteAtualizada = await db.get(`
        SELECT * FROM pacientes WHERE id = 2    
        
    `)

    //console.log(infoPacienteAtualizada);

    await db.run (`
        UPDATE pacientes
        SET descricao = "Medicação tomada, alimentação com auxilio",
        autonomia = "Teve leve redução na autonomia."
        WHERE id = 1;        
    `)

    console.log("Descrições e auntonomias atualizadas.")


  //************************
  //Remover - D CRUD  Delete
  //************************


  await db.all(`DELETE FROM pacientes WHERE id = 5`)

  console.log("Paciente removido da lista");


};

criarBanco();
