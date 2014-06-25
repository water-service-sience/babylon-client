function Controller() {
    function onLogoutClicked() {
        var alert = Titanium.UI.createAlertDialog({
            title: "ログアウト確認",
            message: "ログアウトしてもよろしいですか？(以前設定したユーザー名とパスワードで再ログイン可能です。)",
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        alert.show();
        alert.addEventListener("click", function(event) {
            event.cancel;
            if (0 == event.index) {
                Alloy.Globals.api.client.logout();
                util.questionnaire.delete();
                util.userLoginInfo.delete();
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
    function onChangePasswordClicked() {
        var view = Alloy.createController("change_password").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSendQuestionnaireClicked() {
        var view = Alloy.createController("questionnaire").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onManualClicked() {
        Ti.Platform.openURL("http://de24.digitalasia.chubu.ac.jp/babylon_files/index.html");
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
    $.__views.__alloyId212 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId212"
    });
    $.__views.setting.add($.__views.__alloyId212);
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
    $.__views.__alloyId212.add($.__views.user_id_label);
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
    $.__views.__alloyId212.add($.__views.user_id);
    $.__views.__alloyId213 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId213"
    });
    $.__views.setting.add($.__views.__alloyId213);
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
    $.__views.__alloyId213.add($.__views.nickname_label);
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
    $.__views.__alloyId213.add($.__views.nickname);
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
        width: "95%",
        title: "所有地設定",
        id: "select_land"
    });
    $.__views.setting.add($.__views.select_land);
    onSelectLandClicked ? $.__views.select_land.addEventListener("click", onSelectLandClicked) : __defers["$.__views.select_land!click!onSelectLandClicked"] = true;
    $.__views.change_password = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        title: "パスワードを設定",
        id: "change_password"
    });
    $.__views.setting.add($.__views.change_password);
    onChangePasswordClicked ? $.__views.change_password.addEventListener("click", onChangePasswordClicked) : __defers["$.__views.change_password!click!onChangePasswordClicked"] = true;
    $.__views.sendQuestionnaire = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        title: "アンケートに答える",
        id: "sendQuestionnaire"
    });
    $.__views.setting.add($.__views.sendQuestionnaire);
    onSendQuestionnaireClicked ? $.__views.sendQuestionnaire.addEventListener("click", onSendQuestionnaireClicked) : __defers["$.__views.sendQuestionnaire!click!onSendQuestionnaireClicked"] = true;
    $.__views.__alloyId214 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId214"
    });
    $.__views.setting.add($.__views.__alloyId214);
    $.__views.manual = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        title: "更新/マニュアル",
        id: "manual"
    });
    $.__views.setting.add($.__views.manual);
    onManualClicked ? $.__views.manual.addEventListener("click", onManualClicked) : __defers["$.__views.manual!click!onManualClicked"] = true;
    $.__views.__alloyId215 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId215"
    });
    $.__views.setting.add($.__views.__alloyId215);
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
        width: "95%",
        title: "ログアウト",
        id: "logout_button"
    });
    $.__views.setting.add($.__views.logout_button);
    onLogoutClicked ? $.__views.logout_button.addEventListener("click", onLogoutClicked) : __defers["$.__views.logout_button!click!onLogoutClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var util = Alloy.Globals.util;
    $.setting.addEventListener("open", function() {
        var api = Alloy.Globals.api;
        $.nickname.text = api.client.nickname;
        $.user_id.text = api.client.userId;
    });
    __defers["$.__views.select_land!click!onSelectLandClicked"] && $.__views.select_land.addEventListener("click", onSelectLandClicked);
    __defers["$.__views.change_password!click!onChangePasswordClicked"] && $.__views.change_password.addEventListener("click", onChangePasswordClicked);
    __defers["$.__views.sendQuestionnaire!click!onSendQuestionnaireClicked"] && $.__views.sendQuestionnaire.addEventListener("click", onSendQuestionnaireClicked);
    __defers["$.__views.manual!click!onManualClicked"] && $.__views.manual.addEventListener("click", onManualClicked);
    __defers["$.__views.logout_button!click!onLogoutClicked"] && $.__views.logout_button.addEventListener("click", onLogoutClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;