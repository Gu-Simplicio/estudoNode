// importa o express
const express = require("express");
//importa o objeto de conexão ao banco
const connDB = require("./config/db");
// importa as rotas para o usuário
const usuarioRoutes = require("./routes/usuarioRoutes");
// importa a biblioteca para exibir os dados das requisições
const morgan = require("morgan");
// cria a aplicação do express;
const app = express();
// salva a porta onde a aplicação vai rodar
const PORT = 3000;

// conecta ao MongoDB
connDB();

//middleware para receber status apropriados 
app.use(morgan("dev"));

//middleware para interpretação de JSON
app.use(express.json());

//rotas..
app.use("/usuarios", usuarioRoutes);

//inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});