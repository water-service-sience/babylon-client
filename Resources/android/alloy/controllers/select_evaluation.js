function Controller() {
    function onItemClick(e) {
        var item = e.section.items[e.itemIndex];
        var v = item.properties.item;
        Ti.API.debug(v.label + " is selected");
        selectCallback && selectCallback(v);
        Alloy.Globals.naviCon.pop();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "select_evaluation";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.select_evaluation = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "select_evaluation"
    });
    $.__views.select_evaluation && $.addTopLevelView($.__views.select_evaluation);
    var __alloyId188 = {};
    var __alloyId191 = [];
    var __alloyId193 = {
        type: "Ti.UI.Label",
        bindId: "label",
        properties: {
            textAlign: "left",
            font: {
                fontSize: "18dp"
            },
            height: "24dp",
            color: "#000",
            bindId: "label"
        }
    };
    __alloyId191.push(__alloyId193);
    var __alloyId190 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId191
    };
    __alloyId188["template"] = __alloyId190;
    $.__views.__alloyId194 = Ti.UI.createListSection({
        headerTitle: "評価",
        id: "__alloyId194"
    });
    var __alloyId196 = [];
    __alloyId196.push($.__views.__alloyId194);
    $.__views.category_list = Ti.UI.createListView({
        width: "100%",
        height: "90%",
        sections: __alloyId196,
        templates: __alloyId188,
        id: "category_list",
        defaultItemTemplate: "template"
    });
    $.__views.select_evaluation.add($.__views.category_list);
    onItemClick ? $.__views.category_list.addEventListener("itemclick", onItemClick) : __defers["$.__views.category_list!itemclick!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.api;
    var args = arguments[0] || {};
    var selectCallback = args.selectCallback;
    $.select_evaluation.addEventListener("open", function() {
        var categories = [ "未回答", "非常に良い", "良い", "普通", "悪い", "非常に悪い" ];
        var section = $.category_list.sections[0];
        var itemData = [];
        for (var i in categories) {
            var c = categories[i];
            itemData.push({
                properties: {
                    height: "25dp",
                    item: {
                        value: i,
                        label: c
                    }
                },
                label: {
                    text: c
                }
            });
        }
        section.items = itemData;
    });
    __defers["$.__views.category_list!itemclick!onItemClick"] && $.__views.category_list.addEventListener("itemclick", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;