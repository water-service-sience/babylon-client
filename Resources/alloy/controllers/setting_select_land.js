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
        var controller = Alloy.createController("select_location", {
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
    var __alloyId132 = {};
    var __alloyId135 = [];
    var __alloyId136 = {
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
    __alloyId135.push(__alloyId136);
    var __alloyId134 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId135
    };
    __alloyId132["template"] = __alloyId134;
    var __alloyId137 = [];
    var __alloyId140 = [];
    $.__views.__alloyId141 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId141"
        }
    };
    __alloyId140.push($.__views.__alloyId141);
    $.__views.__alloyId138 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId138"
    });
    __alloyId137.push($.__views.__alloyId138);
    $.__views.__alloyId138.items = __alloyId140;
    var __alloyId144 = [];
    $.__views.__alloyId145 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId145"
        }
    };
    __alloyId144.push($.__views.__alloyId145);
    $.__views.__alloyId146 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId146"
        }
    };
    __alloyId144.push($.__views.__alloyId146);
    $.__views.__alloyId142 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId142"
    });
    __alloyId137.push($.__views.__alloyId142);
    $.__views.__alloyId142.items = __alloyId144;
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId137,
        templates: __alloyId132,
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