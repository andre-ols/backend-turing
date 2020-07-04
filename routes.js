const express = require('express');
const OrdersConstroller = require('./controllers/OrdersController');
const DetailsController = require('./controllers/DetailsController');
const CustomersController = require('./controllers/CustomersController');
const whatsapp = require("./controllers/whatsapp")

const routes = express.Router();
const ordersConstroller = new OrdersConstroller();
const detailsController = new DetailsController();
const customersController = new CustomersController();



routes.get("/summation", ordersConstroller.summation);

routes.get("/chart", ordersConstroller.chart);

routes.put("/changestatus/:id/:status", ordersConstroller.updateStatus);

routes.post('/whatsapp', whatsapp);

routes.get("/orders/:id/status", ordersConstroller.status);

routes.get("/orders/:id", detailsController.show);

routes.get("/orders", ordersConstroller.index);

routes.post("/orders", ordersConstroller.create);

routes.get('/customers/:id', customersController.show);

routes.get('/customers', customersController.index);

routes.post('/customers', customersController.create);

routes.put('/customers', customersController.update);

module.exports = routes;
