/*
 * Shopping list storage module
 *
 */

var azure = require('azure');
var uuid = require('node-uuid');

// Properties
function ShoppingListRepo(storageClient, tableName, partitionKey) {
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;

    // Create table for this shoppinglist
    this.storageClient.createTableIfNotExists(tableName, function(error) {
        if (error) {
            throw error;
        }
    });
};

// Methods
ShoppingListRepo.prototype.findById = function(id, callback) {
    var self = this;
};

ShoppingListRepo.prototype.find = function(query, callback) {
    var self = this;
    self.storageClient.queryEntities(query, function(error, entities) {
        if (error) {
            callback(error);
        } else {
            callback(null, entities);
        }
    });
};

ShoppingListRepo.prototype.addShoppingList = function(shoppingList, callback){
    var self = this;
    item.rowkey = uuid.v4();
    item.partitionKey = self.partitionKey;
    self.storageClient.insertEntity(self.tableName, item, function() {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
};

// Export
module.exports = ShoppingListRepo;
