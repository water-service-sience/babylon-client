exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "userId" : "int",
		    "comment" : "string",
		    "posted" : "int" 
		},
		adapter: {
			type: "sql",
			collection_name: "UserPost"
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

