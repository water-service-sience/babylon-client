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
        backgroundColor: "#ddddff",
        id: "create_account"
    });
    $.__views.create_account && $.addTopLevelView($.__views.create_account);
    $.__views.title = Ti.UI.createLabel({
        top: "10%",
        height: Ti.UI.SIZE,
        text: "アカウント作成",
        id: "title"
    });
    $.__views.create_account.add($.__views.title);
    $.__views.nickname_label = Ti.UI.createLabel({
        left: "5%",
        width: "20%",
        top: "35%",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: "ニックネーム",
        id: "nickname_label"
    });
    $.__views.create_account.add($.__views.nickname_label);
    $.__views.nickname = Ti.UI.createTextField({
        left: "30%",
        width: "65%",
        top: "35%",
        backgroundColor: "#ffffff",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        id: "nickname"
    });
    $.__views.create_account.add($.__views.nickname);
    $.__views.create = Ti.UI.createButton({
        bottom: "20%",
        width: "70%",
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