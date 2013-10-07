exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER",
		    "nickname": "TEXT",
		    "accessKey": "TEXT",
		    "secretKey": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "user"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
};

