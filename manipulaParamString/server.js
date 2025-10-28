const express = require('express'); //importa o express
const app = express(); //instancia a aplicação
const morgan = require('morgan'); //importa a bibliteca morgan 
const PORT = 3000; //importa a porta onde o projeto vai rodar

//configura o morgan para dar log nas requisições
app.use(morgan("dev"));

// rota com parâmetros de rota :id
app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params; // extrai o parâmetro id da URL

    res.json({
        message: `Buscando usuário ${id}`
    })
});

//rota com queryStrings
app.get("/produtos", (req, res) => {
    // extrai os dados enviados através de queryStrings
    const { categoria, precoMaximo } = req.query;

    res.status(200).json({
        message: "Listando produtos",
        filtros: {
            categoria: categoria || "Todas",
            precoMaximo: precoMaximo || "Sem Limite"
        }
    });
});

//bota o projeto pra rodar
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})