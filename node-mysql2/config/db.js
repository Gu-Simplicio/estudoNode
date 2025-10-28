const mysql = require("mysql2"); //importa a biblioteca para conectar-se ao mySQL

// cria a função que se conecta ao banco
const conn = mysql.createConnection({
    host: "localhost", //local onde está o banco
    user: "root", // usuário
    password: '', //senha
    database: 'banco_api_nodejs' //banco
});

//conecta com o banco
conn.connect((erro) => {
    if(erro){ //caso ocorra algum erro
        console.error(`Erro ao se conectar com o MySQL: ${erro}`);
        return;
    }

    // caso dê tudo certo
    console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = conn; //exporta a conexão com o banco