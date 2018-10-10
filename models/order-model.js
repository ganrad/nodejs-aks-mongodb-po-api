let MongoClient = require('mongodb').MongoClient;

function OrderModel(urlId, databaseId, collectionId) {
  this.url = urlId;
  this.dbname = databaseId;
  this.collection = collectionId;
}

OrderModel.prototype = {

find: function(querySpec, callback) {
    let self = this;

    MongoClient.connect(self.url, {useNewUrlParser : true}, function(err, client) {
      console.log("find() - Connected successfully to MDB server");

      const db = client.db(self.dbname);

      const col = db.collection(self.collection);
      col.find(querySpec).toArray(function(err, docs) {
        if (err) {
          client.close();
	  self.handleError(err);
          callback(err);
        }
        else {
          client.close();
          callback(null, docs);
        }
      });
    });
},

getItem: function(querySpec, callback) {
    let self = this;

    MongoClient.connect(self.url, {useNewUrlParser : true}, function(err, client) {
      console.log("getItem() - Connected successfully to MDB server");

      const db = client.db(self.dbname);

      const col = db.collection(self.collection);
      col.findOne(querySpec,function(err, result) {
        if (err) {
	  client.close();
	  self.handleError(err);
          callback(err);
        }
        else {
	  client.close();
          callback(null, result);
        }
      });
    });
},

addItem: function(item, callback) {
    let self = this;

    item.date = Date.now();
    item.completed = false;

    MongoClient.connect(self.url, {useNewUrlParser : true}, function(err, client) {
      console.log("addItem() - Connected successfully to MDB server");

      const db = client.db(self.dbname);

      const col = db.collection(self.collection);
      col.insertOne(item,function(err, result) {
        if (err) {
	  client.close();
	  self.handleError(err);
          callback(err);
        }
        else {
	  client.close();
          console.log("Inserted purchase order into the collection");
          callback(null, result);
        }
      });
    });
},

updateItem: function(querySpec, inDoc, callback) {
    let self = this;

    MongoClient.connect(self.url, { useNewUrlParser : true}, function(err, client) {
      console.log("updateItem() - Connected successfully to MDB server");

      const db = client.db(self.dbname);

      const col = db.collection(self.collection);
      let newValues = { $set: inDoc };
      col.updateOne(querySpec,newValues,function(err, result) {
        if (err) {
	  client.close();
	  self.handleError(err);
          callback(err);
        }
        else {
	  client.close();
          console.log("Updated purchase order in the collection");
          callback(null, result);
        }
      });
    });
},

deleteItem: function(querySpec, callback) {
    let self = this;

    MongoClient.connect(self.url, {useNewUrlParser : true}, function(err, client) {
      console.log("deleteItem() - Connected successfully to MDB server");

      const db = client.db(self.dbname);

      const col = db.collection(self.collection);
      col.deleteOne(querySpec,function(err, result) {
        if (err) {
	  client.close();
	  self.handleError(err);
          callback(err);
        }
        else {
	  client.close();
          console.log("Deleted purchase order in the collection");
          callback(null, result);
        }
      });
    });
},

handleError: function(error) {
	console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    	console.log('\t' + JSON.parse(error.body).message);
}
};

module.exports = OrderModel;
