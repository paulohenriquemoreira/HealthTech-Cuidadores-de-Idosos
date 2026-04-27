const express = require("express");
const { conectar, inicializarBanco } = require("./database");

const app = express();

// Middleware
app.use(express.json());

// ======================================
// INICIALIZAÇÃO DO BANCO
// ======================================
(async () => {
  try {
    await inicializarBanco();
    console.log("✅ Banco inicializado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco:", error);
  }
})();

// ======================================
// ROTA RAIZ (HEALTH CHECK)
// ======================================
app.get("/", (req, res) => {
  res.send("🚀 API de pacientes rodando com sucesso!");
});

// ======================================
// GET - LISTAR PACIENTES
// ======================================
app.get("/pacientes", async (req, res) => {
  try {
    const db = await conectar();
    const pacientes = await db.all("SELECT * FROM paciente");
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ======================================
// GET - PACIENTE POR ID
// ======================================
app.get("/pacientes/:id", async (req, res) => {
  try {
    const db = await conectar();
    const paciente = await db.get(
      "SELECT * FROM paciente WHERE id = ?",
      [req.params.id]
    );

    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ======================================
// POST - CRIAR PACIENTE
// ======================================
app.post("/pacientes", async (req, res) => {
  try {
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
    } = req.body;

    const db = await conectar();

    const result = await db.run(
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

    res.status(201).json({
      mensagem: "Paciente criado com sucesso",
      id: result.lastID,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ======================================
// PUT - ATUALIZAR PACIENTE
// ======================================
app.put("/pacientes/:id", async (req, res) => {
  try {
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
    } = req.body;

    const db = await conectar();

    const result = await db.run(
      `UPDATE paciente SET 
        nome = ?, 
        idade = ?, 
        descricao = ?, 
        estado_saude = ?, 
        autonomia = ?, 
        medicamentos = ?, 
        alergias = ?, 
        data_atendimento = ?, 
        endereco_residencia = ?, 
        contato_emergencia = ?
      WHERE id = ?`,
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
        req.params.id,
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    res.json({ mensagem: "Paciente atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ======================================
// DELETE - REMOVER PACIENTE
// ======================================
app.delete("/pacientes/:id", async (req, res) => {
  try {
    const db = await conectar();

    const result = await db.run(
      "DELETE FROM paciente WHERE id = ?",
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    res.json({ mensagem: "Paciente removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ======================================
// PORTA (RENDER FRIENDLY)
// ======================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
