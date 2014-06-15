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
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "look_mine_menu"
    });
    $.__views.look_mine_menu && $.addTopLevelView($.__views.look_mine_menu);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "自分の投稿を見る",
        id: "__alloyId28"
    });
    $.__views.look_mine_menu.add($.__views.__alloyId28);
    $.__views.show_calendar = Ti.UI.createButton({
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
        title: "カレンダー",
        id: "show_calendar"
    });
    $.__views.look_mine_menu.add($.__views.show_calendar);
    onShowCalendarClicked ? $.__views.show_calendar.addEventListener("click", onShowCalendarClicked) : __defers["$.__views.show_calendar!click!onShowCalendarClicked"] = true;
    $.__views.show_self_posts = Ti.UI.createButton({
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
        title: "投稿一覧",
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