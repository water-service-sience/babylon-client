function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_position_on_map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_position_on_map = Ti.UI.createView({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "post_position_on_map"
    });
    $.__views.post_position_on_map && $.addTopLevelView($.__views.post_position_on_map);
    $.__views.label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 2,
        text: "Hoge",
        id: "label"
    });
    $.__views.post_position_on_map.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.onClick | function(post) {
        Ti.API.debug("Click post:" + post.id);
    };
    var post = args.post;
    var util = Alloy.Globals.util;
    $.label.text = util.niceTimeString(post.posted);
    $.label.backgroundColor = 30 > post.goodness ? "red" : post.goodness > 70 ? "green" : "white";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;