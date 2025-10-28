//importa o módulo de conexão ao banco
const mongoose = require("mongoose");

// variável assíncrona que conecta ao banco 
const connDB = async ()=> {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/exemplo_nosql");

        console.log("Conectado ao mongoDB com sucesso!");
    } catch(erro){
        console.error(`Erro ao conectar-se: ${erro}`);

        //finaliza a aplicação em caso de falha
        process.exit(1);
    }
};

module.exports = connDB;