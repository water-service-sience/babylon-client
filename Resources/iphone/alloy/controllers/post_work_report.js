function Controller() {
    function onSetImage() {
        $.post.enabled = true;
    }
    function onRecaptureClicked() {
        $.image_view.showCamera();
    }
    function onGalleryClicked() {
        $.image_view.showGallery();
    }
    function onPostClicked() {
        $.image_view.postData({
            isInquiry: false,
            isPublic: $.isPublic.value,
            goodness: $.goodness.getView("goodness").value,
            category: 0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_work_report";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_work_report = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "post_work_report"
    });
    $.__views.post_work_report && $.addTopLevelView($.__views.post_work_report);
    $.__views.image_view = Alloy.createController("post_image_view", {
        id: "image_view",
        __parentSymbol: $.__views.post_work_report
    });
    $.__views.image_view.setParent($.__views.post_work_report);
    onSetImage ? $.__views.image_view.on("setImage", onSetImage) : __defers["$.__views.image_view!setImage!onSetImage"] = true;
    $.__views.goodness = Alloy.createController("goodness_bar", {
        id: "goodness",
        height: "30dp",
        __parentSymbol: $.__views.post_work_report
    });
    $.__views.goodness.setParent($.__views.post_work_report);
    $.__views.__alloyId135 = Ti.UI.createView({
        width: "3dp",
        height: "30dp",
        id: "__alloyId135"
    });
    $.__views.post_work_report.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId136"
    });
    $.__views.post_work_report.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createView({
        height: "100%",
        width: "50%",
        id: "__alloyId137"
    });
    $.__views.__alloyId136.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        width: "25%",
        text: "公開",
        id: "__alloyId138"
    });
    $.__views.__alloyId136.add($.__views.__alloyId138);
    $.__views.isPublic = Ti.UI.createSwitch({
        height: "100%",
        width: "25%",
        value: true,
        id: "isPublic"
    });
    $.__views.__alloyId136.add($.__views.isPublic);
    $.__views.__alloyId139 = Ti.UI.createView({
        width: "3dp",
        height: "30dp",
        id: "__alloyId139"
    });
    $.__views.post_work_report.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createView({
        height: "54dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId140"
    });
    $.__views.post_work_report.add($.__views.__alloyId140);
    $.__views.post = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "66.666666%",
        title: "投稿",
        id: "post"
    });
    $.__views.__alloyId140.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.recapture = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "33.33333%",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.__alloyId140.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    $.__views.__alloyId141 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId141"
    });
    $.__views.post_work_report.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createView({
        height: "100%",
        width: "50%",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.gallery = Ti.UI.createButton({
        font: {
            fontSize: "24dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "50%",
        title: "ギャラリー",
        id: "gallery"
    });
    $.__views.__alloyId141.add($.__views.gallery);
    onGalleryClicked ? $.__views.gallery.addEventListener("click", onGalleryClicked) : __defers["$.__views.gallery!click!onGalleryClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.post_work_report.addEventListener("open", function() {
        $.post.enabled = false;
    });
    __defers["$.__views.image_view!setImage!onSetImage"] && $.__views.image_view.on("setImage", onSetImage);
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.recapture!click!onRecaptureClicked"] && $.__views.recapture.addEventListener("click", onRecaptureClicked);
    __defers["$.__views.gallery!click!onGalleryClicked"] && $.__views.gallery.addEventListener("click", onGalleryClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;