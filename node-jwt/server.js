//cria a instância do express e seu app, além de configurar o morgan
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

//importa as rotas de autenticação
const authRoutes = require("./routes/authRoutes");

//carrega as variáveis de ambiente do arquivo .env para process
require('dotenv').config();

//middleware para processas requisições com payload em formato JSON
app.use(express.json());

// define a rota base '/api' para rotas de autenticação
app.use('/api', authRoutes);

//importa a configuração da porta do arquivo de configuração
const { PORTA } = require('./config/config');
//inicia o servidor
app.listen(PORTA, () => {
    console.warn(`Servidor rodando em http://localhost:${PORTA}`);
})