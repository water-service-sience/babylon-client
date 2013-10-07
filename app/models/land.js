exports.definition = {
	config: {
		columns: {
			"id" : "INTEGER PRIMARY KEY",
		    "name": "TEXT",
		    "latitude": "REAL",
		    "longitude": "REAL"
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
			comparator : function(land) {
        	    return land.get('id');
            }
		});

		return Collection;
	}
};