const Sequelize = require("sequelize");
const sequelize = require("./database/connection");

const Customers = sequelize.define("clientes", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    }
});

/* Cria a tabela no banco
* Customers.sync({force: true});
*/

module.exports = Customers;
