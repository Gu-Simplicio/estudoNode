// importa a biblioteca express
const express = require("express");

//instância um router
const router = express.Router();

//importa o controller de usuário
const usuarioController = require("../controllers/usuarioController");

//SETA AS ROTAS PARA O USUÁRIOS
router.post("/", usuarioController.criarUsuario);
router.get("/", usuarioController.obterUsuarios);
router.put("/:id", usuarioController.atualizarUsuario);
router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;