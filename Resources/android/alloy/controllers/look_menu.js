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
        width: "95%",
        color: "#000",
        disabledColor: "#888888",
        title: "周辺を地図で見る",
        id: "show_map"
    });
    $.__views.look_menu.add($.__views.show_map);
    onShowMapClicked ? $.__views.show_map.addEventListener("click", onShowMapClicked) : __defers["$.__views.show_map!click!onShowMapClicked"] = true;
    var __alloyId23 = {};
    var __alloyId26 = [];
    var __alloyId28 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId29 = [];
            var __alloyId30 = {
                type: "Ti.UI.Label",
                bindId: "name",
                properties: {
                    textAlign: "left",
                    font: {
                        fontSize: "20dp"
                    },
                    height: "24dp",
                    backgroundColor: "#ffffff",
                    color: "#000",
                    text: "aaa",
                    bindId: "name"
                }
            };
            __alloyId29.push(__alloyId30);
            return __alloyId29;
        }(),
        properties: {
            backgroundColor: "#ffffff"
        }
    };
    __alloyId26.push(__alloyId28);
    var __alloyId25 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId26
    };
    __alloyId23["template"] = __alloyId25;
    $.__views.my_lands = Ti.UI.createListView({
        left: "3%",
        right: "3%",
        height: "80%",
        templates: __alloyId23,
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