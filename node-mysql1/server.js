const mysql = require("mysql2"); // importa a biblioteca que lida com o MySQL

const conn = mysql.createConnection({
    host: "localhost", //endereço do servidor 
    user: "root", //usuário do mySQL
    password: '', //senha do usuário
    database: "banco_api_nodejs" //nome do banco de dados
});

//conecta ao banco de dados
conn.connect((erro) => { 
    if(erro){//caso ocorra um erro
        console.error(`Erro ao se conectar: ${erro}`);
        return;
    }

    //mostra um aviso de  que deu tudo certo
    console.log("Conectado ao banco de dados MySQL com sucesso!");

    //fecha a conexão após o teste
    conn.end((erroFim) => { 
        if(erroFim){ //caso ocorra um erro no fechamento
            console.error(`Erro ao encerrar a conexão: ${erroFim}`);
        } else {
            console.log("Conexão encerrada com sucesso!");
        }
    })
});