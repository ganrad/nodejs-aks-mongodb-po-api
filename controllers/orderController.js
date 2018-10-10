let async = require('async');
let ObjectId = require('mongodb').ObjectId;

function OrderController(orderModel) {
	this.orderModel = orderModel;
}

OrderController.prototype = {
	// Display the list of all Purchase Orders.
	getOrderList: function(req, res) {
		console.log("OrderController.getOrderList()");
		let self = this;
		let querySpec = {};

		self.orderModel.find(querySpec, function(err, items) {
			if (err) {
				throw err;
			}
			else {
				res.json(items);
			};
		});
	},
	// Get the details of a single Purchase Order
	getOrderDetails: function(req, res) {
		console.log("OrderController.getOrderDetails() - ID=" + req.params.id);
		let self = this;
	
		let o_id = new ObjectId(req.params.id);

		let query = {
			_id : o_id
			};

		self.orderModel.getItem(query, function(err, item) {
			if (err) {
				throw err;
			}
			else {
				res.json(item);
			};
		});
	},
	// Create a Purchase Order
	createOrder: function(req, res) {
		console.log("OrderController.createOrder()");
		let self = this;
		let item = req.body;

		self.orderModel.addItem(item, function(err, result) {
			if (err) {
				throw err;
			}
			else
				console.log("Saved Purchase Order ID [" + result.insertedId + "] in MongoDB");
			res.redirect('/');
		});
	},
	// Update a Purchase Order by _id
	updateOrder: function(req, res) {
		console.log("OrderController.updateOrder() - ID=" + req.params.id);
		let self = this;
		let item = req.body;
		let o_id = new ObjectId(req.params.id);

		let query = {
			_id : o_id
			};

		self.orderModel.updateItem(query, item, function(err, doc) {
			if (err) {
				throw err;
			}
			else
				console.log("Updated Purchase Order [ID=" + req.params.id + "] in MongoDB");
			res.json(doc);
		});
	},
	// Delete a Purchase Order
	deleteOrder: function(req, res) {
		console.log("OrderController.deleteOrder() - ID=" + req.params.id);
		let self = this;

		let o_id = new ObjectId(req.params.id);

		let query = {
			_id : o_id
			};

		self.orderModel.deleteItem(query, function(err, doc) {
			if (err) {
				throw err;
			}
			else
				console.log("Deleted Purchase Order [ID=" + req.params.id + "] in MongoDB");
			res.redirect('/');
		});
	}
};

module.exports = OrderController;
