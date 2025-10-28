const mongoose = require("mongoose"); //importa a biblioteca mongoose

//função assíncrona para conectar ao mongoDB
const connMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/exemplo_nosql");

        console.log("Conectado com sucesso!");
    } catch(erro){
        console.error(`Erro ao conectar-se: ${erro}`);
        process.exit(1); //encerra o processo em caso de falha
    }
};

//inicia a conexão
connMongoDB();