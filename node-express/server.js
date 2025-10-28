const express = require("express"); // importa o módulo Express
const app = express(); // cria uma instância do app Express
const morgan = require('morgan');//importa o morgan para log de requisições
const PORT = 3000; // define a porta em que o servidor irá rodar

//middleware de aplicação, que registra um log para toda rota
app.use(morgan("dev")); //configura o morgan para log de requisições

//define a rota GET para listar todos os produtos
app.get("/produtos", (req, res) => {
    res.json({
        message: "Listando todos os produtos",
        produtos: [] //exemplo usando um array visível
    });
});

// define rota POST para criar um novo produto
app.post("/produtos", (req, res) => {
    res.json({
        message: "Criando um novo produto..",
        produto: { //exemplo de criação de um objeto produto
            id: Date.now(),
            nome: "Produto exemplo"
        }
    });
});

// define a rota PUT para atualizar um produto por ID
app.put("/produtos/:id", (req, res) => {
    // separa o id enviada pelos parâmetros
    const { id } = req.params;

    res.json({
        message: `Atualizando o ${id}° produto!`,
        produto: { //exemplo de atualização
            id: id,
            nome: "Produto atualizado"
        }
    });
});

// define a rota DELETE para excluir um produto por ID
app.delete("/produtos/:id", (req, res) => {
    // separa o id enviada pelos parâmetros
    const { id } = req.params;

    res.json({
        message: `Excluindo o produto ${id}`,
        produtoId: id
    });
});

// inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
    // exibe uma msg no console informando que o servidor está na porta especificada
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

// OUTROS TIPOS DE ROTA 

//define a rota GET para rota /sobre
app.get("/sobre", (req, res) => {
    res.send("Página sobre")
});

//função middleware para verificar autenticação
const checaAutenticacao = (
    req, //requisição da chamada 
    res, //resposta da chamada
    next //função que permite passar o controle para o próximo middleware
) => {
    //exemplo para o caso de o usuário ser autenticado
    const autenticado = false; 

    //caso o usuário seja autenticado, a função next() passa para o próximo middleware
    //caso ele não seja, retorna um erro
    autenticado ? next() : res.status(401).json({ message: "Você não pode entrar" });
}

app.get("/perfil", checaAutenticacao, (req, res) => {
    res.json({
        message: "Carregando informações.."
    })
});