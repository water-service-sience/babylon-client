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
    var __alloyId214 = {};
    var __alloyId217 = [];
    var __alloyId218 = {
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
    __alloyId217.push(__alloyId218);
    var __alloyId216 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId217
    };
    __alloyId214["template"] = __alloyId216;
    var __alloyId221 = [];
    $.__views.__alloyId222 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId222"
        }
    };
    __alloyId221.push($.__views.__alloyId222);
    $.__views.__alloyId219 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId219"
    });
    $.__views.__alloyId219.items = __alloyId221;
    var __alloyId223 = [];
    __alloyId223.push($.__views.__alloyId219);
    var __alloyId226 = [];
    $.__views.__alloyId227 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId227"
        }
    };
    __alloyId226.push($.__views.__alloyId227);
    $.__views.__alloyId228 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId228"
        }
    };
    __alloyId226.push($.__views.__alloyId228);
    $.__views.__alloyId224 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId224"
    });
    $.__views.__alloyId224.items = __alloyId226;
    __alloyId223.push($.__views.__alloyId224);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId223,
        templates: __alloyId214,
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