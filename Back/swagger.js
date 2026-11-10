// Documentação da API (Swagger). Abra http://localhost:3000/api-docs
const pessoaExemplo = {
    pes_nome: 'Maria da Silva',
    pes_email: 'maria@email.com',
    pes_telefone: '(42) 99999-0000',
    pes_data_nascimento: '2000-05-20',
};

const corpoPessoa = {
    required: true,
    content: {
        'application/json': {
            schema: { $ref: '#/components/schemas/PessoaEntrada' },
        },
    },
};

const parametroId = {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'integer' },
};

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'API - Sistema de Pessoas',
        version: '1.0.0',
        description: 'CRUD de pessoas com Express e PostgreSQL.',
    },
    servers: [{ url: 'http://localhost:3000' }],
    paths: {
        '/pessoas': {
            get: {
                tags: ['Pessoas'],
                summary: 'Listar todas as pessoas',
                responses: { 200: { description: 'Lista de pessoas' } },
            },
            post: {
                tags: ['Pessoas'],
                summary: 'Cadastrar uma pessoa',
                requestBody: corpoPessoa,
                responses: {
                    201: { description: 'Pessoa criada' },
                    400: { description: 'Dados inválidos' },
                    409: { description: 'E-mail já cadastrado' },
                },
            },
        },
        '/pessoas/{id}': {
            get: {
                tags: ['Pessoas'],
                summary: 'Buscar uma pessoa pelo id',
                parameters: [parametroId],
                responses: {
                    200: { description: 'Pessoa encontrada' },
                    404: { description: 'Pessoa não encontrada' },
                },
            },
            put: {
                tags: ['Pessoas'],
                summary: 'Alterar uma pessoa',
                parameters: [parametroId],
                requestBody: corpoPessoa,
                responses: {
                    200: { description: 'Pessoa atualizada' },
                    400: { description: 'Dados inválidos' },
                    404: { description: 'Pessoa não encontrada' },
                    409: { description: 'E-mail já cadastrado' },
                },
            },
            delete: {
                tags: ['Pessoas'],
                summary: 'Excluir uma pessoa',
                parameters: [parametroId],
                responses: {
                    204: { description: 'Pessoa excluída' },
                    404: { description: 'Pessoa não encontrada' },
                },
            },
        },
    },
    components: {
        schemas: {
            PessoaEntrada: {
                type: 'object',
                required: ['pes_nome'],
                properties: {
                    pes_nome: { type: 'string', example: pessoaExemplo.pes_nome },
                    pes_email: { type: 'string', example: pessoaExemplo.pes_email },
                    pes_telefone: { type: 'string', example: pessoaExemplo.pes_telefone },
                    pes_data_nascimento: {
                        type: 'string',
                        format: 'date',
                        example: pessoaExemplo.pes_data_nascimento,
                    },
                },
            },
        },
    },
};
