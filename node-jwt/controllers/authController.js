//importa a biblioteca para manipulação de JWT (JSON Web Token)
const jwt = require("jsonwebtoken");

//importa a biblioteca para criptografia e comparação de senhas
const bcrypt = require("bcryptjs");

//importa o array de usuários simulados do modelo de dados
const { users } = require("../models/userModel");

//importa a chave secreta do arquivo de configuração
const { CHAVE_SECRETA } = require('../config/config');

//função para registrar um novo usuário
exports.registerUser = async (req, res) => {
    //extrai o username, password e roles do body da req
    const { username, password, roles } = req.body;

    //criptografa a senha fornecida usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //cria um novo objeto de usuário com um ID inacremental e a senha criptografada
    const newUser = {
        id: users.length + 1, //simulação de um ID incremental
        username: username,
        password: hashedPassword,
        roles: roles || ["user"], //define 'user como papel padrão
    }

    //adiciona um novo usuário à lista de usuários
    users.push(newUser);

    //retorna uma resposta de sucesso
    res.status(201).json({ message: "usuário registrado!" });
};

//função para autenticar um usuário e gerar um token JWT
exports.loginUser = async (req, res) => {
    //extrai o username e password do body da req
    const { username, password } = req.body;
    //procura o usuário na lista pelo nome de usuário
    const user = users.find((user) => user.username === username);

    //retorna erro caso o usuário não seja encontrado
    if(!user) return res.status(401).json({ message: "Usuário não encontrado!" });

    //compara a senha fornecida com a senha armazenada (criptografa);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //retorna erro caso a senha esteja incorreta
    if(!isPasswordValid) return res.status(401).json({ message: "Senha incorreta!" });

    //gera um token JWT com os dados do usuário e define um tempo de expiração
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            roles: user.roles
        },
        CHAVE_SECRETA,
        {
            expiresIn: "1h"
        }
    );

    //retorna o token como resposta
    res.json({ token });
}