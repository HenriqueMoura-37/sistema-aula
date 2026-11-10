// Rotas do CRUD de pessoas.
// Create -> POST   /pessoas
// Read   -> GET    /pessoas  e  GET /pessoas/:id
// Update -> PUT    /pessoas/:id
// Delete -> DELETE /pessoas/:id
const express = require('express');
const { pool } = require('../db');
const { validarPessoa } = require('../validacao');

const router = express.Router();

// to_char devolve a data como texto "AAAA-MM-DD", sem problemas de fuso horário.
const COLUNAS = `
    pes_id,
    pes_nome,
    pes_email,
    pes_telefone,
    to_char(pes_data_nascimento, 'YYYY-MM-DD') AS pes_data_nascimento
`;

// Converte erros do banco em respostas amigáveis.
function tratarErro(erro, res) {
    if (erro.code === '23505') {
        return res.status(409).json({ erro: 'Já existe uma pessoa com esse e-mail.' });
    }
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
}

// READ - listar todas
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT ${COLUNAS} FROM pessoas ORDER BY pes_nome`
        );
        res.json(resultado.rows);
    } catch (erro) {
        tratarErro(erro, res);
    }
});

// READ - buscar uma
router.get('/:id', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT ${COLUNAS} FROM pessoas WHERE pes_id = $1`,
            [req.params.id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Pessoa não encontrada.' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        tratarErro(erro, res);
    }
});

// CREATE - cadastrar
router.post('/', async (req, res) => {
    const { erro, dados } = validarPessoa(req.body);
    if (erro) return res.status(400).json({ erro });

    try {
        const resultado = await pool.query(
            `INSERT INTO pessoas (pes_nome, pes_email, pes_telefone, pes_data_nascimento)
             VALUES ($1, $2, $3, $4)
             RETURNING ${COLUNAS}`,
            [dados.pes_nome, dados.pes_email, dados.pes_telefone, dados.pes_data_nascimento]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (e) {
        tratarErro(e, res);
    }
});

// UPDATE - alterar
router.put('/:id', async (req, res) => {
    const { erro, dados } = validarPessoa(req.body);
    if (erro) return res.status(400).json({ erro });

    try {
        const resultado = await pool.query(
            `UPDATE pessoas
                SET pes_nome = $1,
                    pes_email = $2,
                    pes_telefone = $3,
                    pes_data_nascimento = $4
              WHERE pes_id = $5
              RETURNING ${COLUNAS}`,
            [
                dados.pes_nome,
                dados.pes_email,
                dados.pes_telefone,
                dados.pes_data_nascimento,
                req.params.id,
            ]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Pessoa não encontrada.' });
        }
        res.json(resultado.rows[0]);
    } catch (e) {
        tratarErro(e, res);
    }
});

// DELETE - excluir
router.delete('/:id', async (req, res) => {
    try {
        const resultado = await pool.query(
            'DELETE FROM pessoas WHERE pes_id = $1',
            [req.params.id]
        );
        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: 'Pessoa não encontrada.' });
        }
        res.status(204).end();
    } catch (erro) {
        tratarErro(erro, res);
    }
});

module.exports = router;
