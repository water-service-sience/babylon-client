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
                }
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
    var __alloyId152 = {};
    var __alloyId155 = [];
    var __alloyId156 = {
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
    __alloyId155.push(__alloyId156);
    var __alloyId154 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId155
    };
    __alloyId152["template"] = __alloyId154;
    var __alloyId159 = [];
    $.__views.__alloyId160 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId160"
        }
    };
    __alloyId159.push($.__views.__alloyId160);
    $.__views.__alloyId157 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId157"
    });
    $.__views.__alloyId157.items = __alloyId159;
    var __alloyId161 = [];
    __alloyId161.push($.__views.__alloyId157);
    var __alloyId164 = [];
    $.__views.__alloyId165 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId165"
        }
    };
    __alloyId164.push($.__views.__alloyId165);
    $.__views.__alloyId166 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId166"
        }
    };
    __alloyId164.push($.__views.__alloyId166);
    $.__views.__alloyId162 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId162"
    });
    $.__views.__alloyId162.items = __alloyId164;
    __alloyId161.push($.__views.__alloyId162);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId161,
        templates: __alloyId152,
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