function Controller() {
    function onShowCalendarClicked() {
        var view = Alloy.createController("my_post_calendar").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onShowSelfPostClicked() {
        var view = Alloy.createController("my_post_list").getView();
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
        height: "38dp",
        top: "30%",
        title: "カレンダーで見る",
        id: "show_calendar"
    });
    $.__views.look_mine_menu.add($.__views.show_calendar);
    onShowCalendarClicked ? $.__views.show_calendar.addEventListener("click", onShowCalendarClicked) : __defers["$.__views.show_calendar!click!onShowCalendarClicked"] = true;
    $.__views.show_self_posts = Ti.UI.createButton({
        height: "38dp",
        title: "自分の投稿一覧を見る",
        id: "show_self_posts"
    });
    $.__views.look_mine_menu.add($.__views.show_self_posts);
    onShowSelfPostClicked ? $.__views.show_self_posts.addEventListener("click", onShowSelfPostClicked) : __defers["$.__views.show_self_posts!click!onShowSelfPostClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.show_calendar!click!onShowCalendarClicked"] && $.__views.show_calendar.addEventListener("click", onShowCalendarClicked);
    __defers["$.__views.show_self_posts!click!onShowSelfPostClicked"] && $.__views.show_self_posts.addEventListener("click", onShowSelfPostClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;