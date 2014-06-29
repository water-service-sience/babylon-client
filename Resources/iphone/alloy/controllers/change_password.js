function Controller() {
    function changePassword() {
        var nickname = $.nickname.value;
        var username = removeSpaceThenHash(nickname);
        if (null == username) {
            alert("氏名が入力されていません。");
            return;
        }
        var phoneNumber = normalizeAndValidatePhoneNumber($.phoneNumber.value);
        if (null == phoneNumber) {
            alert("不正な電話番号です。");
            return;
        }
        var password = phoneNumber;
        $.changePassword.enable = false;
        client.changePassword(username, nickname, password, function(result) {
            $.changePassword.enable = true;
            if (null != result && result.success) {
                client.setPhoneNumber(phoneNumber);
                var dialog = Titanium.UI.createAlertDialog({
                    title: "変更完了",
                    message: "変更完了しました。"
                });
                dialog.show();
            } else if (null != result) {
                var dialog = Titanium.UI.createAlertDialog({
                    title: "変更失敗",
                    message: result.message
                });
                dialog.show();
            }
        });
    }
    function removeSpaceThenHash(name) {
        var re = /\s/;
        var r = name.replace(re, "");
        Ti.API.log(r);
        return 0 == r.length ? null : Titanium.Utils.md5HexDigest(r);
    }
    function normalizeAndValidatePhoneNumber(phoneNumber) {
        var v = phoneNumber.replace(/-/g, "");
        var re = /^[0-9]{7,11}$/;
        if (!re.test(v)) return null;
        return v;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "change_password";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.change_password = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "change_password"
    });
    $.__views.change_password && $.addTopLevelView($.__views.change_password);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        left: 0,
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "氏名と電話番号の変更",
        id: "__alloyId0"
    });
    $.__views.change_password.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        left: 0,
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "氏名",
        id: "__alloyId1"
    });
    $.__views.change_password.add($.__views.__alloyId1);
    $.__views.nickname = Ti.UI.createTextField({
        width: "80%",
        right: 0,
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "nickname"
    });
    $.__views.change_password.add($.__views.nickname);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        left: 0,
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "電話番号",
        id: "__alloyId2"
    });
    $.__views.change_password.add($.__views.__alloyId2);
    $.__views.phoneNumber = Ti.UI.createTextField({
        width: "80%",
        right: 0,
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "phoneNumber"
    });
    $.__views.change_password.add($.__views.phoneNumber);
    $.__views.__alloyId3 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId3"
    });
    $.__views.change_password.add($.__views.__alloyId3);
    $.__views.changePassword = Ti.UI.createButton({
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
        title: "変更する",
        id: "changePassword"
    });
    $.__views.change_password.add($.__views.changePassword);
    changePassword ? $.__views.changePassword.addEventListener("click", changePassword) : __defers["$.__views.changePassword!click!changePassword"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    Alloy.Globals.util;
    $.change_password.addEventListener("open", function() {
        $.nickname.value = client.nickname;
        $.phoneNumber.value = client.phoneNumber;
    });
    __defers["$.__views.changePassword!click!changePassword"] && $.__views.changePassword.addEventListener("click", changePassword);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;