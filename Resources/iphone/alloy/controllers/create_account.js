function Controller() {
    function createAccount() {
        client.createAccount($.nickname.value, function(success) {
            success ? $.create_account.close() : alert("Fail to create account");
        });
    }
    function login() {
        client.login($.username.value, $.password.value, function(success) {
            if (success) $.create_account.close(); else {
                var dialog = Titanium.UI.createAlertDialog({
                    title: "ログイン失敗",
                    message: "ユーザー名、パスワードが間違っています。"
                });
                dialog.show();
            }
        });
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
        text: "アカウント作成",
        id: "title"
    });
    $.__views.create_account.add($.__views.title);
    $.__views.center_panel = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "center_panel"
    });
    $.__views.create_account.add($.__views.center_panel);
    $.__views.nickname_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ニックネーム",
        id: "nickname_label"
    });
    $.__views.center_panel.add($.__views.nickname_label);
    $.__views.nickname = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "50%",
        id: "nickname"
    });
    $.__views.center_panel.add($.__views.nickname);
    $.__views.create = Ti.UI.createButton({
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
        title: "アカウント作成",
        id: "create"
    });
    $.__views.create_account.add($.__views.create);
    createAccount ? $.__views.create.addEventListener("click", createAccount) : __defers["$.__views.create!click!createAccount"] = true;
    $.__views.__alloyId8 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId8"
    });
    $.__views.create_account.add($.__views.__alloyId8);
    $.__views.username_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ユーザー名",
        id: "username_label"
    });
    $.__views.__alloyId8.add($.__views.username_label);
    $.__views.username = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "50%",
        id: "username"
    });
    $.__views.__alloyId8.add($.__views.username);
    $.__views.__alloyId9 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId9"
    });
    $.__views.create_account.add($.__views.__alloyId9);
    $.__views.password_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "パスワード",
        id: "password_label"
    });
    $.__views.__alloyId9.add($.__views.password_label);
    $.__views.password = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "50%",
        id: "password",
        passwordMask: "true"
    });
    $.__views.__alloyId9.add($.__views.password);
    $.__views.login = Ti.UI.createButton({
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
        title: "ログイン",
        id: "login"
    });
    $.__views.create_account.add($.__views.login);
    login ? $.__views.login.addEventListener("click", login) : __defers["$.__views.login!click!login"] = true;
    $.__views.__alloyId10 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "お問い合わせ先:XXX-XXX-XXXX",
        id: "__alloyId10"
    });
    $.__views.create_account.add($.__views.__alloyId10);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    __defers["$.__views.create!click!createAccount"] && $.__views.create.addEventListener("click", createAccount);
    __defers["$.__views.login!click!login"] && $.__views.login.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;