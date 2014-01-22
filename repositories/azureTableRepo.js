/* 
 * An Azure table repository
 *
 */

var azure = require('azure');
var uuid = require('node-uuid');

// ctor
function AzureTableRepo(storageClient, tableName, partitionKey) {
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    // Create table for repo if it doesn't exist
    this.storageClient.createTableIfNotExists(tableName, function(error) {
        if (error) {
            throw error;
        }
    });
};

// methods
AzureTableRepo.prototype = {
    add: function(item, callback) {
        var self = this;
        // Azure ids - needs to have Uppercased beginning
        item.RowKey = item.slug;
        item.PartitionKey = self.partitionKey;
        console.log(item);
        // Insert item
        self.storageClient.insertEntity(self.tableName, item, function(error) {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    },
    get: function(id, callback) {
        var self = this;
        self.storageClient.queryEntity(self.tableName, self.partitionKey, id, function(error, entity) {
            if (error) {
                callback(error);
            } else {
                callback(entity);
            }
        });
    },
    getList: function(callback) {
        var self = this;
        var query = azure.TableQuery
            .select()
            .from(self.tableName);
        self.storageClient.queryEntities(query, function(error, items) {
            if (error) {
                callback(error);
            } else {
                callback(items);
            }
        });
    } 
};

module.exports = AzureTableRepo;