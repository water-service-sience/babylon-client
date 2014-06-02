function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "water_level_chart";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.water_level_chart = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "water_level_chart"
    });
    $.__views.water_level_chart && $.addTopLevelView($.__views.water_level_chart);
    $.__views.webview = Ti.UI.createWebView({
        id: "webview",
        url: "http://de24.digitalasia.chubu.ac.jp/babylon/field_router/water_level/1/three_hours"
    });
    $.__views.water_level_chart.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;