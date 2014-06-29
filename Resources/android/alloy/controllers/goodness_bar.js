function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "goodness_bar";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.goodness_bar = Ti.UI.createView({
        height: "80dp",
        width: "100%",
        id: "goodness_bar"
    });
    $.__views.goodness_bar && $.addTopLevelView($.__views.goodness_bar);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        text: "田んぼの状態",
        id: "__alloyId19"
    });
    $.__views.goodness_bar.add($.__views.__alloyId19);
    $.__views.bad = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "24dp",
        color: "#000",
        top: "26dp",
        left: "2dp",
        text: "悪い",
        id: "bad"
    });
    $.__views.goodness_bar.add($.__views.bad);
    $.__views.good = Ti.UI.createLabel({
        textAlign: "right",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "24dp",
        color: "#000",
        top: "26dp",
        right: "2dp",
        text: "良い",
        id: "good"
    });
    $.__views.goodness_bar.add($.__views.good);
    $.__views.goodness = Ti.UI.createSlider({
        top: "50dp",
        left: "2dp",
        right: "2dp",
        max: 100,
        min: 0,
        value: 50,
        id: "goodness"
    });
    $.__views.goodness_bar.add($.__views.goodness);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;