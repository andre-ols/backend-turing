const Sequelize = require("sequelize");
const sequelize = require("./database/connection");

const Details = sequelize.define("detalhes", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model: 'pedidos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    item: {
        type: Sequelize.STRING
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    adicional: {
        type: Sequelize.STRING
    }
});

/* Cria a tabela no banco
* Details.sync({force: true});
*/

module.exports = Details;
