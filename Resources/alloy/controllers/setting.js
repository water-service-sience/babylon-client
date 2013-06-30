function Controller() {
    function onLogoutClicked() {
        Alloy.Globals.api.client.logout();
        Alloy.Globals.naviCon.home();
        var view = Alloy.createController("create_account").getView();
        view.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.setting = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "setting"
    });
    $.__views.setting && $.addTopLevelView($.__views.setting);
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
    __defers["$.__views.logout_button!click!onLogoutClicked"] && $.__views.logout_button.addEventListener("click", onLogoutClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;