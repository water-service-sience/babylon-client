function Controller() {
    function changePassword() {
        var username = $.username.value;
        var oldPassword = $.old_password.value;
        var password = $.new_password.value;
        var confirm = $.confirm_password.value;
        if (password != confirm) {
            var dialog = Titanium.UI.createAlertDialog({
                title: "パスワードエラー",
                message: "確認用のパスワードが一致していません。新しいパスワードと新しいパスワード(確認)には、同じパスワードを入力してください。"
            });
            dialog.show();
        }
        $.changePassword.enable = false;
        client.changePassword(username, oldPassword, password, function(result) {
            $.changePassword.enable = true;
            if (null != result && result.success) {
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
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ユーザー名とパスワードの変更",
        id: "__alloyId0"
    });
    $.__views.change_password.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId1"
    });
    $.__views.change_password.add($.__views.__alloyId1);
    $.__views.username_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ユーザー名",
        id: "username_label"
    });
    $.__views.__alloyId1.add($.__views.username_label);
    $.__views.username = Ti.UI.createTextField({
        width: "50%",
        right: "2dp",
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "username"
    });
    $.__views.__alloyId1.add($.__views.username);
    $.__views.__alloyId2 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId2"
    });
    $.__views.change_password.add($.__views.__alloyId2);
    $.__views.old_password_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "以前のパスワード",
        id: "old_password_label"
    });
    $.__views.__alloyId2.add($.__views.old_password_label);
    $.__views.old_password = Ti.UI.createTextField({
        width: "50%",
        right: "2dp",
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "old_password",
        passwordMask: "true"
    });
    $.__views.__alloyId2.add($.__views.old_password);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId3"
    });
    $.__views.change_password.add($.__views.__alloyId3);
    $.__views.new_password_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "新しいパスワード",
        id: "new_password_label"
    });
    $.__views.__alloyId3.add($.__views.new_password_label);
    $.__views.new_password = Ti.UI.createTextField({
        width: "50%",
        right: "2dp",
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "new_password",
        passwordMask: "true"
    });
    $.__views.__alloyId3.add($.__views.new_password);
    $.__views.__alloyId4 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId4"
    });
    $.__views.change_password.add($.__views.__alloyId4);
    $.__views.confirm_password_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "新しいパスワード(確認)",
        id: "confirm_password_label"
    });
    $.__views.__alloyId4.add($.__views.confirm_password_label);
    $.__views.confirm_password = Ti.UI.createTextField({
        width: "50%",
        right: "2dp",
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "confirm_password",
        passwordMask: "true"
    });
    $.__views.change_password.add($.__views.confirm_password);
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
    $.__views.__alloyId5 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "auto",
        width: "100%",
        text: "パスワードの入力ミスの無いよう、同じパスワードを2回入力してください。",
        color: "red",
        id: "__alloyId5"
    });
    $.__views.change_password.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "auto",
        width: "100%",
        text: "パスワードは、４文字以上で設定してください。",
        color: "red",
        id: "__alloyId6"
    });
    $.__views.change_password.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "auto",
        width: "100%",
        text: "ユーザー名を変更しない場合は、空白のままにしてください。",
        id: "__alloyId7"
    });
    $.__views.change_password.add($.__views.__alloyId7);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    $.change_password.addEventListener("open", function() {
        client.username && ($.username.value = client.username);
    });
    __defers["$.__views.changePassword!click!changePassword"] && $.__views.changePassword.addEventListener("click", changePassword);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;