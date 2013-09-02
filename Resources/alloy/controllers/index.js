function Controller() {
    function onPostClicked() {
        var view = Alloy.createController("post_image").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onLookClicked() {
        var view = Alloy.createController("look_menu").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onLookMineClicked() {
        var view = Alloy.createController("look_mine_menu").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSettingClicked() {
        var view = Alloy.createController("setting").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.post = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "80%",
        color: "#000000",
        top: "15%",
        title: "農地情報を送信する",
        id: "post"
    });
    $.__views.index.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.look = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "80%",
        color: "#000000",
        top: "35%",
        title: "周辺の情報を見る",
        id: "look"
    });
    $.__views.index.add($.__views.look);
    onLookClicked ? $.__views.look.addEventListener("click", onLookClicked) : __defers["$.__views.look!click!onLookClicked"] = true;
    $.__views.look_mine = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "80%",
        color: "#000000",
        top: "55%",
        title: "自分の投稿を見る",
        id: "look_mine"
    });
    $.__views.index.add($.__views.look_mine);
    onLookMineClicked ? $.__views.look_mine.addEventListener("click", onLookMineClicked) : __defers["$.__views.look_mine!click!onLookMineClicked"] = true;
    $.__views.setting = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: "30%",
        color: "#550000",
        bottom: "10%",
        right: "5%",
        title: "設定",
        id: "setting"
    });
    $.__views.index.add($.__views.setting);
    onSettingClicked ? $.__views.setting.addEventListener("click", onSettingClicked) : __defers["$.__views.setting!click!onSettingClicked"] = true;
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
    __defers["$.__views.look_mine!click!onLookMineClicked"] && $.__views.look_mine.addEventListener("click", onLookMineClicked);
    __defers["$.__views.setting!click!onSettingClicked"] && $.__views.setting.addEventListener("click", onSettingClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;