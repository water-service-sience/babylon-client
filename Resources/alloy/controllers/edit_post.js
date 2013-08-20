function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.edit_post = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "edit_post"
    });
    $.__views.edit_post && $.addTopLevelView($.__views.edit_post);
    $.__views.photo = Ti.UI.createImageView({
        id: "photo"
    });
    $.__views.edit_post.add($.__views.photo);
    $.__views.category_label = Ti.UI.createLabel({
        text: "内容",
        id: "category_label"
    });
    $.__views.edit_post.add($.__views.category_label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;