function Controller() {
    function onWorkReportModeClicked() {
        var view = Alloy.createController("post_work_report").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onInquiryModeClicked() {
        var view = Alloy.createController("post_inquiry").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "select_post_mode";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.select_post_mode = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "select_post_mode"
    });
    $.__views.select_post_mode && $.addTopLevelView($.__views.select_post_mode);
    $.__views.__alloyId214 = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        color: "#000",
        disabledColor: "#888888",
        title: "作業記録を投稿",
        id: "__alloyId214"
    });
    $.__views.select_post_mode.add($.__views.__alloyId214);
    onWorkReportModeClicked ? $.__views.__alloyId214.addEventListener("click", onWorkReportModeClicked) : __defers["$.__views.__alloyId214!click!onWorkReportModeClicked"] = true;
    $.__views.__alloyId215 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "auto",
        color: "#000",
        text: "写真付きで作業記録を投稿します。",
        id: "__alloyId215"
    });
    $.__views.select_post_mode.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        color: "#000",
        disabledColor: "#888888",
        title: "問い合わせ",
        id: "__alloyId216"
    });
    $.__views.select_post_mode.add($.__views.__alloyId216);
    onInquiryModeClicked ? $.__views.__alloyId216.addEventListener("click", onInquiryModeClicked) : __defers["$.__views.__alloyId216!click!onInquiryModeClicked"] = true;
    $.__views.__alloyId217 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "auto",
        color: "#000",
        text: "写真付きで土地改良区に問い合わせします。メッセージのみでも問い合わせは可能です。",
        id: "__alloyId217"
    });
    $.__views.select_post_mode.add($.__views.__alloyId217);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId214!click!onWorkReportModeClicked"] && $.__views.__alloyId214.addEventListener("click", onWorkReportModeClicked);
    __defers["$.__views.__alloyId216!click!onInquiryModeClicked"] && $.__views.__alloyId216.addEventListener("click", onInquiryModeClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;