// Comunicação com o Back-end (rotas de pessoas).
import API_URL from './api.js';

// Faz a requisição e devolve o JSON.
// Se a API responder com erro, lança uma exceção com a mensagem dela.
async function requisitar(caminho, opcoes) {
    const resposta = await fetch(`${API_URL}${caminho}`, opcoes);

    if (resposta.status === 204) return null; // exclusão: sem corpo

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        throw new Error(dados?.erro || 'Erro ao comunicar com o servidor.');
    }
    return dados;
}

function comJson(metodo, pessoa) {
    return {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoa),
    };
}

// READ
export function listarPessoas() {
    return requisitar('/pessoas');
}

// CREATE
export function cadastrarPessoa(pessoa) {
    return requisitar('/pessoas', comJson('POST', pessoa));
}

// UPDATE
export function alterarPessoa(id, pessoa) {
    return requisitar(`/pessoas/${id}`, comJson('PUT', pessoa));
}

// DELETE
export function excluirPessoa(id) {
    return requisitar(`/pessoas/${id}`, { method: 'DELETE' });
}
