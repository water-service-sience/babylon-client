function Controller() {
    function onItemClick(e) {
        var item = e.section.items[e.itemIndex];
        var v = item.properties.item;
        Ti.API.debug(v.label + " is selected");
        selectCallback && selectCallback(v);
        Alloy.Globals.naviCon.pop();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "select_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.select_list = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "select_list"
    });
    $.__views.select_list && $.addTopLevelView($.__views.select_list);
    var __alloyId204 = {};
    var __alloyId207 = [];
    var __alloyId209 = {
        type: "Ti.UI.Label",
        bindId: "label",
        properties: {
            textAlign: "left",
            font: {
                fontSize: "24dp"
            },
            height: "28dp",
            wordWrap: true,
            color: "#000",
            bindId: "label"
        }
    };
    __alloyId207.push(__alloyId209);
    var __alloyId206 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId207
    };
    __alloyId204["template"] = __alloyId206;
    $.__views.__alloyId210 = Ti.UI.createListSection({
        id: "__alloyId210"
    });
    var __alloyId212 = [];
    __alloyId212.push($.__views.__alloyId210);
    $.__views.item_list = Ti.UI.createListView({
        sections: __alloyId212,
        templates: __alloyId204,
        id: "item_list",
        defaultItemTemplate: "template"
    });
    $.__views.select_list.add($.__views.item_list);
    onItemClick ? $.__views.item_list.addEventListener("itemclick", onItemClick) : __defers["$.__views.item_list!itemclick!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.api;
    var args = arguments[0] || {};
    var selectCallback = args.selectCallback;
    var headerTitle = args.headerTitle;
    var selectItems = args.selectItems;
    $.select_list.addEventListener("open", function() {
        var section = $.item_list.sections[0];
        section.headerView = Ti.UI.createLabel({
            height: "auto",
            wordWrap: true,
            width: "100%",
            text: headerTitle,
            backgroundColor: "#e0ffff",
            borderRadius: "5dp",
            borderColor: "#80ffff",
            borderWidth: "1dp",
            font: {
                fontSize: "24dp"
            },
            color: "#000"
        });
        var itemData = [];
        for (var i in selectItems) {
            var item = selectItems[i];
            itemData.push({
                properties: {
                    height: "64dp",
                    item: item
                },
                label: {
                    text: item.label
                }
            });
        }
        section.items = itemData;
    });
    __defers["$.__views.item_list!itemclick!onItemClick"] && $.__views.item_list.addEventListener("itemclick", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;