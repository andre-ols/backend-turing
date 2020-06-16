const Sequelize = require('sequelize');
const connection = new Sequelize('lachapa', 'adminlachapa', '12345678a', {
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    port: 41890
});

module.exports = connection;

