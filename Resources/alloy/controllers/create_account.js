function Controller() {
    function createAccount() {
        client.createAccount($.nickname.value, function(success) {
            success ? $.create_account.close() : alert("Fail to create account");
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
        height: "50%",
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
        left: "10dp",
        right: "10dp",
        title: "アカウント作成",
        id: "create"
    });
    $.__views.create_account.add($.__views.create);
    createAccount ? $.__views.create.addEventListener("click", createAccount) : __defers["$.__views.create!click!createAccount"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("api");
    var client = api.client;
    __defers["$.__views.create!click!createAccount"] && $.__views.create.addEventListener("click", createAccount);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;