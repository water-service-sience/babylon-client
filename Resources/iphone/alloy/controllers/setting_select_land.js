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
    var __alloyId215 = {};
    var __alloyId218 = [];
    var __alloyId219 = {
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
    __alloyId218.push(__alloyId219);
    var __alloyId217 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId218
    };
    __alloyId215["template"] = __alloyId217;
    var __alloyId222 = [];
    $.__views.__alloyId223 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId223"
        }
    };
    __alloyId222.push($.__views.__alloyId223);
    $.__views.__alloyId220 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId220"
    });
    $.__views.__alloyId220.items = __alloyId222;
    var __alloyId224 = [];
    __alloyId224.push($.__views.__alloyId220);
    var __alloyId227 = [];
    $.__views.__alloyId228 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId228"
        }
    };
    __alloyId227.push($.__views.__alloyId228);
    $.__views.__alloyId229 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId229"
        }
    };
    __alloyId227.push($.__views.__alloyId229);
    $.__views.__alloyId225 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId225"
    });
    $.__views.__alloyId225.items = __alloyId227;
    __alloyId224.push($.__views.__alloyId225);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId224,
        templates: __alloyId215,
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