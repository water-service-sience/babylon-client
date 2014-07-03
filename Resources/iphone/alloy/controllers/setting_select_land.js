function Controller() {
    function onSelectLand(e) {
        var item = e.section.getItemAt(e.itemIndex);
        if (1 == e.sectionIndex && 1 == e.itemIndex) {
            $.land_list.sections[0].setItems([ {
                name: {
                    text: "Loading"
                }
            } ]);
            api.landManager.forceUpdate(function() {
                refresh();
            });
            return;
        }
        var controller = Alloy.createController("edit_land", {
            land: item.land,
            callback: function() {
                refresh();
                Alloy.Globals.naviCon.pop();
            }
        });
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
    }
    function refresh() {
        var lands = api.landManager.getOwnLands().map(function(land) {
            var l = land.toJSON();
            return {
                land: l,
                name: {
                    text: l.name
                },
                height: "30dp"
            };
        });
        $.land_list.sections[0].setItems(lands);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setting_select_land";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.setting_select_land = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "setting_select_land"
    });
    $.__views.setting_select_land && $.addTopLevelView($.__views.setting_select_land);
    var __alloyId219 = {};
    var __alloyId222 = [];
    var __alloyId223 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            textAlign: "left",
            font: {
                fontSize: "18dp"
            },
            height: "24dp",
            text: "aaa",
            bindId: "name"
        }
    };
    __alloyId222.push(__alloyId223);
    var __alloyId221 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId222
    };
    __alloyId219["template"] = __alloyId221;
    var __alloyId226 = [];
    $.__views.__alloyId227 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId227"
        }
    };
    __alloyId226.push($.__views.__alloyId227);
    $.__views.__alloyId224 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId224"
    });
    $.__views.__alloyId224.items = __alloyId226;
    var __alloyId228 = [];
    __alloyId228.push($.__views.__alloyId224);
    var __alloyId231 = [];
    $.__views.__alloyId232 = {
        properties: {
            height: "30dp",
            id: "__alloyId232"
        },
        name: {
            text: "新しく登録する"
        }
    };
    __alloyId231.push($.__views.__alloyId232);
    $.__views.__alloyId233 = {
        properties: {
            height: "30dp",
            sync: "true",
            id: "__alloyId233"
        },
        name: {
            text: "サーバーと同期"
        }
    };
    __alloyId231.push($.__views.__alloyId233);
    $.__views.__alloyId229 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId229"
    });
    $.__views.__alloyId229.items = __alloyId231;
    __alloyId228.push($.__views.__alloyId229);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId228,
        templates: __alloyId219,
        id: "land_list",
        defaultItemTemplate: "template"
    });
    $.__views.setting_select_land.add($.__views.land_list);
    onSelectLand ? $.__views.land_list.addEventListener("itemclick", onSelectLand) : __defers["$.__views.land_list!itemclick!onSelectLand"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    api.landManager.cache(refresh);
    $.setting_select_land.addEventListener("open", function() {});
    __defers["$.__views.land_list!itemclick!onSelectLand"] && $.__views.land_list.addEventListener("itemclick", onSelectLand);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;