function Controller() {
    function onPostClicked() {
        var view = Alloy.createController("post_image").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onLookClicked() {
        var view = Alloy.createController("look_menu").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.status_message = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "red",
        top: "3%",
        text: "管理者からの通知が１件あります",
        id: "status_message"
    });
    $.__views.index.add($.__views.status_message);
    $.__views.post = Ti.UI.createButton({
        width: "80%",
        height: Ti.UI.SIZE,
        color: "#000000",
        top: "15%",
        title: "農地情報を送信する",
        id: "post"
    });
    $.__views.index.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.look = Ti.UI.createButton({
        width: "80%",
        height: Ti.UI.SIZE,
        color: "#000000",
        top: "35%",
        title: "周辺の情報を見る",
        id: "look"
    });
    $.__views.index.add($.__views.look);
    onLookClicked ? $.__views.look.addEventListener("click", onLookClicked) : __defers["$.__views.look!click!onLookClicked"] = true;
    $.__views.setting = Ti.UI.createButton({
        width: "30%",
        height: Ti.UI.SIZE,
        color: "#550000",
        bottom: "10%",
        right: "5%",
        title: "設定",
        id: "setting"
    });
    $.__views.index.add($.__views.setting);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    $.index.addEventListener("open", function() {
        if (!client.isLogin) {
            var view = Alloy.createController("create_account").getView();
            view.open();
        }
    });
    Alloy.Globals.naviCon.open($.index);
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.look!click!onLookClicked"] && $.__views.look.addEventListener("click", onLookClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;