exports.definition = {
	config: {
		columns: {
		    "name": "string",
		    "latitude": "double",
		    "longitude": "double"
		},
		adapter: {
			type: "sql",
			collection_name: "land"
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