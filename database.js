const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

// CRIAR CONEXÃO COM O BANCO
async function conectar() {
  if (!db) {
    db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
  }
  return db;
}

// CRIAR TABELA (RODA UMA VEZ)
async function criarTabela() {
  const database = await conectar();

  await database.exec(`
    CREATE TABLE IF NOT EXISTS paciente (
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
  `);
}

// LISTAR PACIENTES
async function listarPacientes() {
  const database = await conectar();
  return database.all("SELECT * FROM paciente");
}

// BUSCAR POR ID
async function buscarPaciente(id) {
  const database = await conectar();
  return database.get("SELECT * FROM paciente WHERE id = ?", [id]);
}

// INSERIR PACIENTE
async function inserirPaciente(paciente) {
  const database = await conectar();

  const {
    nome,
    idade,
    descricao,
    estado_saude,
    autonomia,
    medicamentos,
    alergias,
    data_atendimento,
    endereco_residencia,
    contato_emergencia,
  } = paciente;

  return database.run(
    `INSERT INTO paciente 
    (nome, idade, descricao, estado_saude, autonomia, medicamentos, alergias, data_atendimento, endereco_residencia, contato_emergencia)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    
    [
      nome,
      idade,
      descricao,
      estado_saude,
      autonomia,
      medicamentos,
      alergias,
      data_atendimento,
      endereco_residencia,
      contato_emergencia,
    ]
    
  );
}

// EXPORTA TUDO
module.exports = {
  conectar,
  criarTabela,
  listarPacientes,
  buscarPaciente,
  inserirPaciente,
};
