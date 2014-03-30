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
    var __alloyId139 = {};
    var __alloyId142 = [];
    var __alloyId143 = {
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
    __alloyId142.push(__alloyId143);
    var __alloyId141 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId142
    };
    __alloyId139["template"] = __alloyId141;
    var __alloyId146 = [];
    $.__views.__alloyId147 = {
        name: {
            text: "Loading"
        },
        properties: {
            id: "__alloyId147"
        }
    };
    __alloyId146.push($.__views.__alloyId147);
    $.__views.__alloyId144 = Ti.UI.createListSection({
        headerTitle: "登録済み",
        id: "__alloyId144"
    });
    $.__views.__alloyId144.items = __alloyId146;
    var __alloyId148 = [];
    __alloyId148.push($.__views.__alloyId144);
    var __alloyId151 = [];
    $.__views.__alloyId152 = {
        name: {
            text: "新しく登録する"
        },
        properties: {
            id: "__alloyId152"
        }
    };
    __alloyId151.push($.__views.__alloyId152);
    $.__views.__alloyId153 = {
        name: {
            text: "サーバーと同期"
        },
        properties: {
            sync: "true",
            id: "__alloyId153"
        }
    };
    __alloyId151.push($.__views.__alloyId153);
    $.__views.__alloyId149 = Ti.UI.createListSection({
        headerTitle: "編集",
        id: "__alloyId149"
    });
    $.__views.__alloyId149.items = __alloyId151;
    __alloyId148.push($.__views.__alloyId149);
    $.__views.land_list = Ti.UI.createListView({
        sections: __alloyId148,
        templates: __alloyId139,
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