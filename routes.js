const express = require('express');
const routes = express.Router();

const OrdersConstroller = require('./controllers/OrdersController');
const DetailsController = require('./controllers/DetailsController');
const CustomersController = require('./controllers/CustomersController');
const ordersConstroller = new OrdersConstroller();
const detailsController = new DetailsController();
const customersController = new CustomersController();

const { send, init, destroy } = require("./controllers/whatsapp");
const { authenticate, register } = require("./controllers/authController");


routes.post('/authenticate', authenticate);

routes.post("/register", register);

routes.get("/orders/:id/status", ordersConstroller.status);

routes.post("/orders", ordersConstroller.create);

routes.get('/customers/:id', customersController.show);

routes.post('/customers', customersController.create);

routes.put('/customers', customersController.update);

//Rotas com token

routes.get("/dashboard/summation", ordersConstroller.summation);

routes.get("/dashboard/paymentCard", ordersConstroller.PaymentCard);

routes.get("/dashboard/paymentMoney", ordersConstroller.PaymentMoney);

routes.get("/dashboard/solditems", detailsController.soldItems);

routes.get("/dashboard/chart", ordersConstroller.chart);

routes.put("/dashboard/changestatus/:id/:status", ordersConstroller.updateStatus);

routes.post('/dashboard/whatsapp/:cliente_id', send);

routes.get('/dashboard/whatsapp/destroy', destroy);

routes.get('/dashboard/whatsapp/init', init);

routes.get("/dashboard/orders/:id", detailsController.show);

routes.get("/dashboard/orders", ordersConstroller.index);

routes.get('/dashboard/customers', customersController.index);

module.exports = routes;
