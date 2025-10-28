//importa o framwwork Express e cria um roteador
const express = require('express');
const router = express.Router();

//importa o controlador de autenticação e o middleware de verificação de token
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

// rota para registro de usuários
router.post('/register', authController.registerUser);

//rota para login de usuários
router.post('/login', authController.loginUser);

//rota protegida que requer autenticação para acesso
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({
        message: `Olá, ${req.user.username}. Esta é uma rota protegida!`
    })
});

//exporta o roteador para uso em outras partes da aplicação
module.exports = router;