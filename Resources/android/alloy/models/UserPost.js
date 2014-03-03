exports.definition = {
    config: {
        columns: {
            id: "int",
            userId: "int",
            comment: "string",
            posted: "int"
        },
        adapter: {
            type: "sql",
            collection_name: "UserPost"
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

model = Alloy.M("UserPost", exports.definition, []);

collection = Alloy.C("UserPost", exports.definition, model);

exports.Model = model;

exports.Collection = collection;