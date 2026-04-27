# 🩺 Desafio 2 – HealthTech (Cuidadores de Idosos)

### A proposta é trabalhar a partir de um cenário inspirado no mundo profissional, onde o problema não está totalmente definido, e cabe a você interpretar, analisar e propor uma solução.

## 🚀 Tecnologias Utilizadas

<p align="left">
    <img
        height="65"
        src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png"
        title="Express"
    />
    <img
        height="65"
        src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png"
        title="Nodejs"
    />
    <img
        height="65"
        src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postman.png"
        title="Postman"
    />
    <img
        height="65"
        src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/sqlite.png"
        title="SQLite/SQLite3"
    />
</p>

## ▶️ Como Rodar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

**1º Clone esse repositório:**

   ```
   git clone https://github.com/paulohenriquemoreira/HealthTech-Cuidadores-de-Idosos

   cd HealthTech-Cuidadores-de-Idosos
   ```

**2º Instale as dependências:**

   ```
   npm install
   npm express
   npm sqlite3
   npm sqlite
   ```

**3º Inicie o servidor de desenvolvimento:**

   ```
   node serve.js
   **Servidor rodando na porta http:localhost:3000
   ```

## 🗄️ Banco de Dados

O banco de dados é criado automaticamente ao iniciar o projeto

```
paciente.db
```

## 📋 Estrutura da Tabela (Paciente)

| Campo            | Descrição                 |
| ---------------- | ------------------------- |
| id               | Identificador único       |
| nome             | Nome do(a) Paciente       |
| idade            | Idade do(a) Paciente      |
| descricao        | Informações do(a) Paciente |
| estado_saude     | Estado atual saúde do Paciente |
| autonomia        | Autonomia do Paciente     |
| medicamentos     | Medicamentos em uso       |
| alergias         | Tipos de alergia          |
| data_atendimento | Data do atendimento       |
| endereco_residencia | Endereço de moradia    |
| contato_emergencia  | Contato para emergência|


## 🔗 Endpoints

### 📍 Rota inicial

```
GET /
```
Retorna uma página HTML com informações da API

### 📄 Listar Paciente

```
GET /paciente
```

### 🔍 Buscar Paciente (id)

```
GET /paciente/:id
```

Ex: <code>/paciente/1</code>

### ➕ Criar cadastro de paciente

```
POST /paciente
```

### ✏️ Atualizar cadastro de paciente

```
PUT /paciente/:id
```

### ❌ Deletar cadastro de paciente

```
DELETE /paciente/:id
```

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em aprendizado de Back End utilizando Node.js e boas práticas no desenvolvimento de APIs.
