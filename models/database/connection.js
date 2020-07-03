const Sequelize = require('sequelize');
const connection = new Sequelize('pitburguer', 'adminpitburguer', '12345678a', {
    host: 'mysql669.umbler.com',
    dialect: 'mysql'
});

module.exports = connection;

