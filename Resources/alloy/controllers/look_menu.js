function Controller() {
    function onSelectOwnLand() {
        var view = Alloy.createController("show_map").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onShowMapClicked() {
        var view = Alloy.createController("show_map").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onShowSelfPostClicked() {
        var view = Alloy.createController("my_post_list").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "look_menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.look_menu = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "look_menu"
    });
    $.__views.look_menu && $.addTopLevelView($.__views.look_menu);
    $.__views.my_lands = Ti.UI.createListView({
        top: "3%",
        left: "3%",
        right: "3%",
        bottom: "43%",
        id: "my_lands"
    });
    $.__views.look_menu.add($.__views.my_lands);
    onSelectOwnLand ? $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand) : __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] = true;
    $.__views.show_map = Ti.UI.createButton({
        height: "38dp",
        top: "65%",
        title: "周辺を地図で見る",
        id: "show_map"
    });
    $.__views.look_menu.add($.__views.show_map);
    onShowMapClicked ? $.__views.show_map.addEventListener("click", onShowMapClicked) : __defers["$.__views.show_map!click!onShowMapClicked"] = true;
    $.__views.show_self_posts = Ti.UI.createButton({
        height: "38dp",
        top: "80%",
        title: "自分の投稿を見る",
        id: "show_self_posts"
    });
    $.__views.look_menu.add($.__views.show_self_posts);
    onShowSelfPostClicked ? $.__views.show_self_posts.addEventListener("click", onShowSelfPostClicked) : __defers["$.__views.show_self_posts!click!onShowSelfPostClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.look_menu.addEventListener("open", function() {
        var lands = Alloy.Globals.api.landManager.getOwnLands();
        var dataSet = [];
        for (var i in lands) {
            var l = lands[i];
            dataSet.push({
                properties: l
            });
        }
        var section = Ti.UI.createListSection({
            headerTitle: "農地"
        });
        section.setItems(dataSet);
        $.my_lands.sections = [ section ];
    });
    __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] && $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand);
    __defers["$.__views.show_map!click!onShowMapClicked"] && $.__views.show_map.addEventListener("click", onShowMapClicked);
    __defers["$.__views.show_self_posts!click!onShowSelfPostClicked"] && $.__views.show_self_posts.addEventListener("click", onShowSelfPostClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;