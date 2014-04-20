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
    var __alloyId171 = {};
    var __alloyId174 = [];
    var __alloyId175 = {
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
    __alloyId174.push(__alloyId175);
    var __alloyId173 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId174
    };
    __alloyId171["template"] = __alloyId173;
    var __alloyId178 = [];
    $.__views.__alloyId179 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId179"
        }
    };
    __alloyId178.push($.__views.__alloyId179);
    $.__views.__alloyId176 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId176"
    });
    $.__views.__alloyId176.items = __alloyId178;
    var __alloyId180 = [];
    __alloyId180.push($.__views.__alloyId176);
    var __alloyId183 = [];
    $.__views.__alloyId184 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId184"
        }
    };
    __alloyId183.push($.__views.__alloyId184);
    $.__views.__alloyId185 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId185"
        }
    };
    __alloyId183.push($.__views.__alloyId185);
    $.__views.__alloyId181 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId181"
    });
    $.__views.__alloyId181.items = __alloyId183;
    __alloyId180.push($.__views.__alloyId181);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId180,
        templates: __alloyId171,
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