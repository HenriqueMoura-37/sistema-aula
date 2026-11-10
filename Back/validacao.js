// Valida e limpa os dados de uma pessoa recebidos no corpo da requisição.
// Retorna { erro, dados }. Se "erro" vier preenchido, a requisição é inválida.
function validarPessoa(corpo) {
    const nome = String(corpo?.pes_nome ?? '').trim();
    const email = String(corpo?.pes_email ?? '').trim();
    const telefone = String(corpo?.pes_telefone ?? '').trim();
    const nascimento = String(corpo?.pes_data_nascimento ?? '').trim();

    if (!nome) {
        return { erro: 'O nome é obrigatório.' };
    }
    if (nome.length > 100) {
        return { erro: 'O nome deve ter no máximo 100 caracteres.' };
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { erro: 'E-mail inválido.' };
    }
    if (telefone.length > 20) {
        return { erro: 'O telefone deve ter no máximo 20 caracteres.' };
    }
    if (nascimento) {
        const data = new Date(`${nascimento}T00:00:00`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(nascimento) || Number.isNaN(data.getTime())) {
            return { erro: 'Data de nascimento inválida (use AAAA-MM-DD).' };
        }
    }

    // Campos vazios viram NULL no banco.
    return {
        dados: {
            pes_nome: nome,
            pes_email: email || null,
            pes_telefone: telefone || null,
            pes_data_nascimento: nascimento || null,
        },
    };
}

module.exports = { validarPessoa };
