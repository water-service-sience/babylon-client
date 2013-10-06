exports.definition = {
    config: {
        columns: {
            name: "string",
            latitude: "double",
            longitude: "double"
        },
        adapter: {
            type: "sql",
            collection_name: "land"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("land", exports.definition, []);

collection = Alloy.C("land", exports.definition, model);

exports.Model = model;

exports.Collection = collection;