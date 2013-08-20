exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "nickname": "string",
		    "accessKey": "string",
		    "secretKey": "string"
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
}

