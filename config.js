let config = {}

config.host = process.env.TEST_MONGO_JSMONGO_SERVICE_HOST;
config.port = process.env.TEST_MONGO_JSMONGO_SERVICE_PORT;
config.url = "mongodb://" + config.host + ":" + config.port;
config.dbname = "OrderDB";
config.collection = "PurchaseOrders";

module.exports = config;
