function Controller() {
    function onSelectOwnLand(e) {
        var land = e.section.items[e.itemIndex].properties.land;
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
        height: "38dp",
        title: "周辺を地図で見る",
        id: "show_map"
    });
    $.__views.look_menu.add($.__views.show_map);
    onShowMapClicked ? $.__views.show_map.addEventListener("click", onShowMapClicked) : __defers["$.__views.show_map!click!onShowMapClicked"] = true;
    var __alloyId6 = {};
    var __alloyId9 = [];
    var __alloyId10 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            font: {
                fontSize: "18dp"
            },
            text: "aaa",
            bindId: "name"
        }
    };
    __alloyId9.push(__alloyId10);
    var __alloyId8 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId9
    };
    __alloyId6["template"] = __alloyId8;
    $.__views.my_lands = Ti.UI.createListView({
        left: "3%",
        right: "3%",
        height: "50%",
        templates: __alloyId6,
        id: "my_lands",
        defaultItemTemplate: "template"
    });
    $.__views.look_menu.add($.__views.my_lands);
    onSelectOwnLand ? $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand) : __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.look_menu.addEventListener("open", function() {
        var lands = Alloy.Globals.api.landManager.getOwnLands();
        var dataSet = [];
        for (var i in lands) {
            var l = lands[i];
            dataSet.push({
                properties: {
                    height: "20dp",
                    land: l
                },
                name: {
                    text: l.name
                }
            });
        }
        var section = Ti.UI.createListSection({
            headerTitle: "農地"
        });
        section.setItems(dataSet);
        $.my_lands.sections = [ section ];
    });
    __defers["$.__views.show_map!click!onShowMapClicked"] && $.__views.show_map.addEventListener("click", onShowMapClicked);
    __defers["$.__views.my_lands!itemclick!onSelectOwnLand"] && $.__views.my_lands.addEventListener("itemclick", onSelectOwnLand);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;