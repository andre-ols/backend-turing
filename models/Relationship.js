const Orders = require("./OrdersModels");
const Customers = require('./CustomersModels');
const Details = require('./DetailsModels');

Customers.hasMany(Orders, {foreignKey: 'cliente_id'});
Orders.belongsTo(Customers, {foreignKey: 'cliente_id'});
Orders.hasMany(Details, {foreignKey: 'pedido_id'});
Details.belongsTo(Orders, {foreignKey: 'pedido_id'});

exports.Orders = Orders;
exports.Customers = Customers;
exports.Details = Details;
