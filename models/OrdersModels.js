const Sequelize = require("sequelize");
const sequelize = require("./database/connection");

const Orders = sequelize.define("pedidos", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cliente_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{ model: 'clientes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    total: {
        type: Sequelize.FLOAT
    },
    pagamento: {
        type: Sequelize.STRING
    },
    observacao: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

/* Cria a tabela no banco
* Orders.sync({force: true});
*/

module.exports = Orders;
