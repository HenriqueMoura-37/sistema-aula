// Arquivo principal da API.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { criarTabelas } = require('./db');
const swaggerDocument = require('./swagger');
const rotasPessoas = require('./rotas/pessoas');

const app = express();

app.use(cors());          // permite que o Front (porta 5173) acesse a API
app.use(express.json());  // permite ler o corpo das requisições em JSON

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/pessoas', rotasPessoas);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionando. Documentação em /api-docs' });
});

const PORT = Number(process.env.PORT) || 3000;

criarTabelas()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API: http://localhost:${PORT}`);
            console.log(`Swagger: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((erro) => {
        console.error('Não foi possível iniciar a API:', erro.message || erro);
        process.exit(1);
    });
