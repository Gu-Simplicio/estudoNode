// importa biblioteca para conectar-se ao mongoDB
const mongoose = require("mongoose");

//cria um Schema para usuários
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    idade: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    }
});

module.exports = mongoose.model("Usuario", usuarioSchema);