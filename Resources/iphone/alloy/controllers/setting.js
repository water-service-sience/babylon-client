function Controller() {
    function onLogoutClicked() {
        var alert = Titanium.UI.createAlertDialog({
            title: "ログアウト確認",
            message: "ログアウトしてもよろしいですか？",
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        alert.show();
        alert.addEventListener("click", function(event) {
            event.cancel;
            if (0 == event.index) {
                Alloy.Globals.api.client.logout();
                Alloy.Globals.naviCon.home();
                var view = Alloy.createController("create_account").getView();
                view.open();
            }
        });
    }
    function onSelectLandClicked() {
        var view = Alloy.createController("setting_select_land").getView();
        Alloy.Globals.naviCon.open(view);
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
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "setting"
    });
    $.__views.setting && $.addTopLevelView($.__views.setting);
    $.__views.__alloyId124 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId124"
    });
    $.__views.setting.add($.__views.__alloyId124);
    $.__views.user_id_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        width: "40%",
        text: "ユーザーID:",
        id: "user_id_label"
    });
    $.__views.__alloyId124.add($.__views.user_id_label);
    $.__views.user_id = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        width: "60%",
        text: "203",
        id: "user_id"
    });
    $.__views.__alloyId124.add($.__views.user_id);
    $.__views.__alloyId125 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId125"
    });
    $.__views.setting.add($.__views.__alloyId125);
    $.__views.nickname_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        width: "40%",
        text: "ニックネーム:",
        id: "nickname_label"
    });
    $.__views.__alloyId125.add($.__views.nickname_label);
    $.__views.nickname = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        width: "60%",
        text: "hoge",
        id: "nickname"
    });
    $.__views.__alloyId125.add($.__views.nickname);
    $.__views.set_username = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
        title: "ユーザー設定",
        id: "set_username"
    });
    $.__views.setting.add($.__views.set_username);
    $.__views.select_land = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
        title: "所有地設定",
        id: "select_land"
    });
    $.__views.setting.add($.__views.select_land);
    onSelectLandClicked ? $.__views.select_land.addEventListener("click", onSelectLandClicked) : __defers["$.__views.select_land!click!onSelectLandClicked"] = true;
    $.__views.__alloyId126 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId126"
    });
    $.__views.setting.add($.__views.__alloyId126);
    $.__views.logout_button = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
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
    __defers["$.__views.select_land!click!onSelectLandClicked"] && $.__views.select_land.addEventListener("click", onSelectLandClicked);
    __defers["$.__views.logout_button!click!onLogoutClicked"] && $.__views.logout_button.addEventListener("click", onLogoutClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;