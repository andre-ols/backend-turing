const Sequelize = require("sequelize");
const sequelize = require("./database/connection");

const Restaurant = sequelize.define("restaurantes", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/* Cria a tabela no banco
* Restaurant.sync({force: true});
*/

module.exports = Restaurant;