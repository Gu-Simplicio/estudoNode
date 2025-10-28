const express = require("express"); // importa o módulo express 
const app = express(); //inicia o app express
const rotasUsuario = require("./routes/usuarios"); //importa as rotas de usuário
const PORTA = 3000; //porta onde o projeto vai rodar

//middleware para interpretar JSON no corpo da requisição
app.use(express.json());

//configura as rotas para usuários
app.use("/usuarios", rotasUsuario);

// inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
})