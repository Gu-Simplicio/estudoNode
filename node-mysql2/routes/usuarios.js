const conn = require('../config/db'); //importa a conexão

const express = require('express'); //importa a biblioteca express
const router = express.Router(); //instância um Router

// Rota para listar todos os usuários (READ)
router.get("/", (req, res) => {
    //executa uma query para pegar os usuários
    conn.query("SELECT * FROM usuarios", (erro, resultados) => { //função executada após a query
        if(erro){ //caso tenha ocorrido algum erro
            res.status(500).send("Erro ao buscar usuários");
            console.error(`Erro: ${erro}`);
            return;
        }

        //caso dê tudo certo
        res.json(resultados);
    });
});

// Rota para adicionar um novo usuário (CREATE)
router.post("/", (req, res) => {
    //separa o nome e a idade enviados
    const { nome, idade } = req.body;
    //query que será enviada ao banco
    const sql = "INSERT INTO usuarios(nome, idade) VALUES (?, ?)";

    // executa a query preparada, passando os valores corretos e uma função que lida com o resultado
    conn.query(sql, [nome, idade], (erro, resultados) => {
        if(erro){ // caso tenha ocorrido algum erro
            res.status(500).send("Erro ao inserir usuário!");
            console.error(`Erro: ${erro}`);
            return;
        }

        // caso dê tudo certinho
        res.status(201).send("Usuário inserido com sucesso!");
    })
});

// Rota para atualizar um usuário (UPDATE)
router.put("/:id", (req, res) => {
    //retira o id dos parametros
    const { id } = req.params;
    //retira os valores do body
    const { nome, idade } = req.body;

    // query de atualização do usuário
    const sql = "UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?";
    
    // executa a query preparada, passando os valores corretos e uma função que lida com o resultado
    conn.query(sql, [nome, idade, id], (erro, resultados) => {
        if(erro) { //caso tenha ocorrido algum erro
            res.status(500).send("Erro ao atualizar usuário");
            console.error(`Erro: ${erro}`);
            return;
        }

        if(resultados.affectedRows === 0){ //caso nenhuma linha da tabela tenha sido alterada
            res.status(404).send("Usuário não encontrado!");
            return;
        }

        //caso tenha dado tudo certo
        res.send("Usuário atualizado com sucesso!");
    });
});

// Rota para deletar um usuário (DELETE)
router.delete("/:id", (req, res) => {
    const { id } = req.params; //captura o id à ser deletado
    // query à ser utilizada 
    const sql = "DELETE FROM usuarios WHERE id = ?";   

    conn.query(sql, [id], (erro, resultados) => {
        if(erro){ //caso tenha ocorrido algum erro 
            res.status(500).send("Erro ao deletar usuário");
            console.error(`Erro: ${erro}`);
            return;
        }

        if(resultados.affectedRows === 0){ //caso nenhuma linha tenha sido alterada
            res.status(404).send("Usuário não enciontrado");
            return;
        }

        // caso tenha dado tudo certo
        res.send("Usuário deletado com sucesso!");
    });
});

//exporta o router
module.exports = router;