function Controller() {
    function loginOrCreateAccount() {
        var username = removeSpaceThenHash($.name.value);
        if (null == username) {
            alert("氏名が入力されていません。");
            return;
        }
        var phoneNumber = normalizeAndValidatePhoneNumber($.phoneNumber.value);
        if (null == phoneNumber) {
            alert("不正な電話番号です。");
            return;
        }
        $.loginOrCreateAccount.enable = false;
        client.login(username, phoneNumber, function(success) {
            $.loginOrCreateAccount.enable = true;
            success ? $.create_account.close() : client.createAccount(username, $.name.value, function(success) {
                success ? client.changePassword(username, $.name.value, phoneNumber, function(success) {
                    if (success) {
                        client.setPhoneNumber(phoneNumber);
                        $.create_account.close();
                    } else alert("アカウント作成失敗。パスワードが不正です。");
                }) : alert("アカウント作成失敗。おそらく、電話番号が間違っています。");
            });
        });
        Ti.API.log(phoneNumber + " : " + username);
    }
    function normalizeAndValidatePhoneNumber(phoneNumber) {
        var v = phoneNumber.replace(/-/g, "");
        var re = /^[0-9]{7,11}$/;
        if (!re.test(v)) return null;
        return v;
    }
    function removeSpaceThenHash(name) {
        var re = /\s/;
        var r = name.replace(re, "");
        Ti.API.log(r);
        return 0 == r.length ? null : Titanium.Utils.md5HexDigest(r);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "create_account";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.create_account = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "create_account"
    });
    $.__views.create_account && $.addTopLevelView($.__views.create_account);
    $.__views.title = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        left: "5px",
        color: "#000",
        text: "アカウント作成/ログイン",
        id: "title"
    });
    $.__views.create_account.add($.__views.title);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        left: "5px",
        color: "#000",
        text: "氏名",
        id: "__alloyId4"
    });
    $.__views.create_account.add($.__views.__alloyId4);
    $.__views.name = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#000",
        backgroundColor: "white",
        width: "80%",
        right: "0px",
        id: "name"
    });
    $.__views.create_account.add($.__views.name);
    $.__views.__alloyId5 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId5"
    });
    $.__views.create_account.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        left: "5px",
        color: "#000",
        text: "携帯電話番号",
        id: "__alloyId6"
    });
    $.__views.create_account.add($.__views.__alloyId6);
    $.__views.phoneNumber = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#000",
        backgroundColor: "white",
        width: "80%",
        right: "0px",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "phoneNumber"
    });
    $.__views.create_account.add($.__views.phoneNumber);
    $.__views.__alloyId7 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId7"
    });
    $.__views.create_account.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId8"
    });
    $.__views.create_account.add($.__views.__alloyId8);
    $.__views.loginOrCreateAccount = Ti.UI.createButton({
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
        color: "#000",
        disabledColor: "#888888",
        title: "作成/ログイン",
        id: "loginOrCreateAccount"
    });
    $.__views.create_account.add($.__views.loginOrCreateAccount);
    loginOrCreateAccount ? $.__views.loginOrCreateAccount.addEventListener("click", loginOrCreateAccount) : __defers["$.__views.loginOrCreateAccount!click!loginOrCreateAccount"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    Alloy.Globals.util;
    __defers["$.__views.loginOrCreateAccount!click!loginOrCreateAccount"] && $.__views.loginOrCreateAccount.addEventListener("click", loginOrCreateAccount);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;