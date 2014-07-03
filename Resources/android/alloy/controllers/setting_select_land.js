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
    var __alloyId222 = {};
    var __alloyId225 = [];
    var __alloyId226 = {
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
    __alloyId225.push(__alloyId226);
    var __alloyId224 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId225
    };
    __alloyId222["template"] = __alloyId224;
    var __alloyId229 = [];
    $.__views.__alloyId230 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId230"
        }
    };
    __alloyId229.push($.__views.__alloyId230);
    $.__views.__alloyId227 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId227"
    });
    $.__views.__alloyId227.items = __alloyId229;
    var __alloyId231 = [];
    __alloyId231.push($.__views.__alloyId227);
    var __alloyId234 = [];
    $.__views.__alloyId235 = {
        properties: {
            height: "30dp",
            id: "__alloyId235"
        },
        name: {
            text: "新しく登録する"
        }
    };
    __alloyId234.push($.__views.__alloyId235);
    $.__views.__alloyId236 = {
        properties: {
            height: "30dp",
            sync: "true",
            id: "__alloyId236"
        },
        name: {
            text: "サーバーと同期"
        }
    };
    __alloyId234.push($.__views.__alloyId236);
    $.__views.__alloyId232 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId232"
    });
    $.__views.__alloyId232.items = __alloyId234;
    __alloyId231.push($.__views.__alloyId232);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId231,
        templates: __alloyId222,
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