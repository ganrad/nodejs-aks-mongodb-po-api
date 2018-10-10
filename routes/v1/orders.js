var express = require('express');
var router = express.Router();

var config = require('../../config');
var OrderModel = require("../../models/order-model");
var OrderController = require('../../controllers/orderController');

console.log("Config URL => " + config.url);
console.log("Config DBNAME => " + config.dbname);
console.log("Config COLLECTION => " + config.collection);

let orderModel = new OrderModel(config.url, config.dbname, config.collection);

let orderController = new OrderController(orderModel);

// Routes
// Get a list of all purchase orders
router.get('/', orderController.getOrderList.bind(orderController));

// Get details of a single order
router.get('/:id', orderController.getOrderDetails.bind(orderController));

// Create a new purchase order
router.post('/create', orderController.createOrder.bind(orderController));

// Update an order
router.post('/:id/update', orderController.updateOrder.bind(orderController));

// Delete an order
router.post('/:id/delete', orderController.deleteOrder.bind(orderController));

module.exports = router;
