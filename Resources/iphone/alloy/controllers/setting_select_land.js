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
    var __alloyId212 = {};
    var __alloyId215 = [];
    var __alloyId216 = {
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
    __alloyId215.push(__alloyId216);
    var __alloyId214 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId215
    };
    __alloyId212["template"] = __alloyId214;
    var __alloyId219 = [];
    $.__views.__alloyId220 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId220"
        }
    };
    __alloyId219.push($.__views.__alloyId220);
    $.__views.__alloyId217 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId217"
    });
    $.__views.__alloyId217.items = __alloyId219;
    var __alloyId221 = [];
    __alloyId221.push($.__views.__alloyId217);
    var __alloyId224 = [];
    $.__views.__alloyId225 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId225"
        }
    };
    __alloyId224.push($.__views.__alloyId225);
    $.__views.__alloyId226 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId226"
        }
    };
    __alloyId224.push($.__views.__alloyId226);
    $.__views.__alloyId222 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId222"
    });
    $.__views.__alloyId222.items = __alloyId224;
    __alloyId221.push($.__views.__alloyId222);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId221,
        templates: __alloyId212,
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