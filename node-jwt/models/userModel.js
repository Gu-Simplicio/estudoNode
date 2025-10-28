const users = [
    {
        id: 1,
        username: "Gustavo",
        password: "$2a$10$XVVcKH6X5jHZYxdK9h2O7uHfkDYU/ZM8CrDZp4hNgZjNxK2hLO2qW", // Senha hash de 'senha123'
        roles: ["user"], //permissões associadas ao usuário
    },
    {
        id: 2,
        username: "adminuser",
        password: "$2a$10$VHg4Xs7bRhJNkz5.eMUKtOGlRhL3WZABPiHKEE1o3djG1gp6K2veS", // Senha hash de 'admin123'
        roles: ["admin", "user"], //permissões de adm e uer
    }
];

module.exports = {
    users
}