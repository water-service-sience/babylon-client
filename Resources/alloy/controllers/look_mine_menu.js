function Controller() {
    function onShowCalendarClicked() {
        var view = Alloy.createController("my_post_calendar").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "look_mine_menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.look_mine_menu = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "look_mine_menu"
    });
    $.__views.look_mine_menu && $.addTopLevelView($.__views.look_mine_menu);
    $.__views.show_calendar = Ti.UI.createButton({
        top: "30%",
        title: "カレンダー",
        id: "show_calendar"
    });
    $.__views.look_mine_menu.add($.__views.show_calendar);
    onShowCalendarClicked ? $.__views.show_calendar.addEventListener("click", onShowCalendarClicked) : __defers["$.__views.show_calendar!click!onShowCalendarClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.show_calendar!click!onShowCalendarClicked"] && $.__views.show_calendar.addEventListener("click", onShowCalendarClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;