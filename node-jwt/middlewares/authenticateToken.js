// importa a biblioteca para manipulação de JWT (JSON Web Token)
const jwt = require("jsonwebtoken");

// importa a chave secreta do arquivo de configuração 
const { CHAVE_SECRETA } = require("../config/config");

//middleware de autenticação para verificar o token JWT
module.exports = (req, res, next) => {
    //obtém o cabeçalho de autorização da req
    const authHeader = req.headers.authorization;

    //extrai o token do cabeçalho, assumindo o formato 'Bearer <token>'
    const token = authHeader?.split(" ")[1];

    //verifica se o token está presente
    if(!token) return res.status(403).json({ message: "Token não fornecido!" });

    try {
        //verifica a validade do token JWT usando a chave secreta
        const decodeUser = jwt.verify(token, CHAVE_SECRETA);

        //anexa as informações do usuário decodificadas à req
        req.user = decodeUser;

        //passa o controle para o próximo middleware da rota
        next();
    } catch(erro){
        //retorna um erro se o token for inválido ou houver falha na verificação
        return res.status(403).json({ message: "Token inválido!" });
    }
};