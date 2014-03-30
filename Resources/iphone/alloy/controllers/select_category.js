function Controller() {
    function onItemClick(e) {
        var item = e.section.items[e.itemIndex];
        var category = item.properties.category;
        Ti.API.debug(category.label + " is selected");
        selectCallback && selectCallback(category);
        Alloy.Globals.naviCon.pop();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "select_category";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.select_category = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "select_category"
    });
    $.__views.select_category && $.addTopLevelView($.__views.select_category);
    var __alloyId125 = {};
    var __alloyId128 = [];
    var __alloyId130 = {
        type: "Ti.UI.Label",
        bindId: "label",
        properties: {
            textAlign: "left",
            font: {
                fontSize: "18dp"
            },
            height: "24dp",
            bindId: "label"
        }
    };
    __alloyId128.push(__alloyId130);
    var __alloyId127 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId128
    };
    __alloyId125["template"] = __alloyId127;
    $.__views.__alloyId131 = Ti.UI.createListSection({
        headerTitle: "カテゴリー",
        id: "__alloyId131"
    });
    var __alloyId133 = [];
    __alloyId133.push($.__views.__alloyId131);
    $.__views.category_list = Ti.UI.createListView({
        width: "100%",
        height: "90%",
        sections: __alloyId133,
        templates: __alloyId125,
        id: "category_list",
        defaultItemTemplate: "template"
    });
    $.__views.select_category.add($.__views.category_list);
    onItemClick ? $.__views.category_list.addEventListener("itemclick", onItemClick) : __defers["$.__views.category_list!itemclick!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var args = arguments[0] || {};
    var selectCallback = args.selectCallback;
    $.select_category.addEventListener("open", function() {
        api.postManager.getCategories(function(categories) {
            var section = $.category_list.sections[0];
            var itemData = [];
            for (var i in categories) {
                var c = categories[i];
                itemData.push({
                    properties: {
                        height: "25dp",
                        category: c
                    },
                    label: {
                        text: c.label
                    }
                });
            }
            section.items = itemData;
        });
    });
    __defers["$.__views.category_list!itemclick!onItemClick"] && $.__views.category_list.addEventListener("itemclick", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;