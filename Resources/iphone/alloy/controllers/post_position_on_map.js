function Controller() {
    function onClickHandler() {
        Ti.API.debug("Clicked!");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_position_on_map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
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
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 2,
        text: "Hoge",
        id: "label"
    });
    $.__views.post_position_on_map.add($.__views.label);
    onClickHandler ? $.__views.label.addEventListener("click", onClickHandler) : __defers["$.__views.label!click!onClickHandler"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.onClick | function(posts) {
        Ti.API.debug("Click post:" + posts);
    };
    var posts = args.posts;
    Alloy.Globals.util;
    $.label.text = "投稿" + posts.length + "件";
    var post = posts[0];
    $.label.backgroundColor = 30 > post.goodness ? "red" : post.goodness > 70 ? "green" : "white";
    __defers["$.__views.label!click!onClickHandler"] && $.__views.label.addEventListener("click", onClickHandler);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;