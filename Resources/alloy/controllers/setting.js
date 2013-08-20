function Controller() {
    function onLogoutClicked() {
        Alloy.Globals.api.client.logout();
        Alloy.Globals.naviCon.home();
        var view = Alloy.createController("create_account").getView();
        view.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setting";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.setting = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "setting"
    });
    $.__views.setting && $.addTopLevelView($.__views.setting);
    $.__views.user_id_label = Ti.UI.createLabel({
        top: "5%",
        left: "2%",
        width: "40%",
        textAlign: "left",
        text: "UserID:",
        id: "user_id_label"
    });
    $.__views.setting.add($.__views.user_id_label);
    $.__views.user_id = Ti.UI.createLabel({
        top: "5%",
        left: "45%",
        width: "40%",
        textAlign: "left",
        text: "203",
        id: "user_id"
    });
    $.__views.setting.add($.__views.user_id);
    $.__views.nickname_label = Ti.UI.createLabel({
        top: "15%",
        left: "2%",
        width: "40%",
        textAlign: "left",
        text: "ニックネーム:",
        id: "nickname_label"
    });
    $.__views.setting.add($.__views.nickname_label);
    $.__views.nickname = Ti.UI.createLabel({
        top: "15%",
        left: "45%",
        width: "40%",
        textAlign: "left",
        text: "hoge",
        id: "nickname"
    });
    $.__views.setting.add($.__views.nickname);
    $.__views.logout_button = Ti.UI.createButton({
        bottom: "5%",
        width: "80%",
        title: "ログアウト",
        id: "logout_button"
    });
    $.__views.setting.add($.__views.logout_button);
    onLogoutClicked ? $.__views.logout_button.addEventListener("click", onLogoutClicked) : __defers["$.__views.logout_button!click!onLogoutClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.setting.addEventListener("open", function() {
        var api = Alloy.Globals.api;
        $.nickname.text = api.client.nickname;
        $.user_id.text = api.client.userId;
    });
    __defers["$.__views.logout_button!click!onLogoutClicked"] && $.__views.logout_button.addEventListener("click", onLogoutClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;