// Conexão com o PostgreSQL.
// Os dados vêm do arquivo .env (veja .env.example).
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'sistema_aula',
});

// Cria a tabela "pessoas" caso ela ainda não exista.
async function criarTabelas() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS pessoas (
            pes_id              SERIAL PRIMARY KEY,
            pes_nome            VARCHAR(100) NOT NULL,
            pes_email           VARCHAR(120) UNIQUE,
            pes_telefone        VARCHAR(20),
            pes_data_nascimento DATE
        )
    `);
}

module.exports = { pool, criarTabelas };
