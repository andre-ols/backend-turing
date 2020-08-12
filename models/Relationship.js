const Orders = require("./OrdersModels");
const Customers = require('./CustomersModels');
const Details = require('./DetailsModels');
const Restaurants = require("./RestaurantsModels");

Customers.hasMany(Orders, {foreignKey: 'cliente_id'});
Orders.belongsTo(Customers, {foreignKey: 'cliente_id'});
Orders.hasMany(Details, {foreignKey: 'pedido_id'});
Details.belongsTo(Orders, {foreignKey: 'pedido_id'});

module.exports = { 
    Orders,
    Customers,
    Details,
    Restaurants
};
