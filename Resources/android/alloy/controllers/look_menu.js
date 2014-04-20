function Controller() {
    function onSelectOwnLand(e) {
        var land = e.section.items[e.itemIndex].land;
        Alloy.Globals.land = land;
        var view = Alloy.createController("show_map").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onShowMapClicked() {
        Alloy.Globals.land = null;
        var view = Alloy.createController("show_map").getView();
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
        layout: "vertical",
        id: "look_menu"
    });
    $.__views.look_menu && $.addTopLevelView($.__views.look_menu);
    $.__views.show_map = Ti.UI.createButton({
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
        color: "#000",
        title: "周辺を地図で見る",
        id: "show_map"
    });
    $.__views.look_menu.add($.__views.show_map);
    onShowMapClicked ? $.__views.show_map.addEventListener("click", onShowMapClicked) : __defers["$.__views.show_map!click!onShowMapClicked"] = true;
    var __alloyId20 = {};
    var __alloyId23 = [];
    var __alloyId24 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            textAlign: "left",
            font: {
                fontSize: "18dp"
            },
            height: "24dp",
            color: "#000",
            text: "aaa",
            bindId: "name"
        }
    };
    __alloyId23.push(__alloyId24);
    var __alloyId22 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId23
    };
    __alloyId20["template"] = __alloyId22;
    $.__views.my_lands = Ti.UI.createListView({
        left: "3%",
        right: "3%",
        height: "80%",
        templates: __alloyId20,
        id: "my_lands",
        defaultItemTemplate: "template"
    });
    $.__views.look_menu.add($.__views.my_lands);
    onSelectOwnLand ? $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand) : __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.look_menu.addEventListener("open", function() {
        var lands = api.landManager.getOwnLands().map(function(land) {
            var l = land.toJSON();
            return {
                land: l,
                name: {
                    text: l.name
                }
            };
        });
        var section = Ti.UI.createListSection({
            headerTitle: "農地"
        });
        section.setItems(lands);
        $.my_lands.sections = [ section ];
    });
    __defers["$.__views.show_map!click!onShowMapClicked"] && $.__views.show_map.addEventListener("click", onShowMapClicked);
    __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] && $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;