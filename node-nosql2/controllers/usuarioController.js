//importa o Schema de usuarios
const Usuario = require("../models/Usuario");

//criar novo usuário
exports.criarUsuario = async (req, res) => {
    try {
        //recebe os dados do usuário
        const usuario = new Usuario(req.body);
        
        //espera o dado ser salvo
        await usuario.save();

        //retorna a resposta
        res.status(201).json(usuario);
    }catch(erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};


//obtém os usuários salvos
exports.obterUsuarios = async (req, res) => {
    try {
        //recebe os usuários salvos
        const usuarios = await Usuario.find();

        res.status(200).json(usuarios); //retorna a resposta
    } catch(erro){
        res.status(500).json({ message: `Erro ao buscar usuários: ${erro}` });
    }
};

//atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params; //recebe o id à ser alterado

        //atualiza usuário pelo Id
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        //caso o usuário não seja atualizado
        if(!usuarioAtualizado) return res.status(404).json({ message: "Usuário não encontrado" });

        res.status(200).json(usuarioAtualizado);
    } catch(erro){
        res.status(400).json({ message: `Erro ao atuazar usuário ${erro}` });
    }
}; 

// deletar um usuário
exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params; //recebe o id do usuário a ser deletado
        //deleta o usuário
        const usuarioDeletado = await Usuario.findByIdAndDelete(id);

        //caso o usuário não seja encontrado..
        if(!usuarioDeletado) return res.status(404).json({ message: "Usuário não encontrado!" });

        res.status(200).json({ message: "Usuário deltado com sucesso!" });
    } catch(erro){
        res.status(500).json({ message: `Erro ao deletar usuário: ${erro}` });
    }
};