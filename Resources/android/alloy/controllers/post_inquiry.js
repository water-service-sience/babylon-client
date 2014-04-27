function Controller() {
    function onSetImage() {
        imageIsSet = true;
    }
    function onSelectCategoryClicked() {
        var view = Alloy.createController("select_category", {
            selectCallback: function(c) {
                selectedCategory = c.id;
                $.category.text = c.label;
            },
            selectedIndex: selectedCategory - 1
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onRecaptureClicked() {
        $.image_view.showCamera();
    }
    function onGalleryClicked() {
        $.image_view.showGallery();
    }
    function onPostClicked() {
        if (!imageIsSet && 0 == $.comment.value.length) {
            alert("写真を選択または、メッセージを入力してください。");
            return;
        }
        $.image_view.postData({
            isInquiry: true,
            message: $.comment.value,
            category: selectedCategory
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_inquiry";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_inquiry = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "post_inquiry"
    });
    $.__views.post_inquiry && $.addTopLevelView($.__views.post_inquiry);
    $.__views.image_view = Alloy.createController("post_image_view", {
        id: "image_view",
        __parentSymbol: $.__views.post_inquiry
    });
    $.__views.image_view.setParent($.__views.post_inquiry);
    onSetImage ? $.__views.image_view.on("setImage", onSetImage) : __defers["$.__views.image_view!setImage!onSetImage"] = true;
    $.__views.__alloyId102 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId102"
    });
    $.__views.post_inquiry.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "25%",
        text: "内容:",
        right: "0dp",
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    $.__views.category = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "50%",
        text: "未選択",
        id: "category"
    });
    $.__views.__alloyId102.add($.__views.category);
    $.__views.select_category = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "25%",
        color: "#000",
        title: "選択",
        id: "select_category"
    });
    $.__views.__alloyId102.add($.__views.select_category);
    onSelectCategoryClicked ? $.__views.select_category.addEventListener("click", onSelectCategoryClicked) : __defers["$.__views.select_category!click!onSelectCategoryClicked"] = true;
    $.__views.__alloyId104 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        text: "メッセージ",
        id: "__alloyId104"
    });
    $.__views.post_inquiry.add($.__views.__alloyId104);
    $.__views.comment = Ti.UI.createTextArea({
        width: "98%",
        height: "100dp",
        font: {
            fontSize: "20dp"
        },
        borderRadius: 5,
        suppressReturn: "false",
        color: "#000",
        id: "comment"
    });
    $.__views.post_inquiry.add($.__views.comment);
    $.__views.__alloyId105 = Ti.UI.createView({
        width: "3dp",
        height: "30dp",
        id: "__alloyId105"
    });
    $.__views.post_inquiry.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        height: "54dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId106"
    });
    $.__views.post_inquiry.add($.__views.__alloyId106);
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
        color: "#000",
        title: "投稿",
        id: "post"
    });
    $.__views.__alloyId106.add($.__views.post);
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
        color: "#000",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.__alloyId106.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    $.__views.__alloyId107 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId107"
    });
    $.__views.post_inquiry.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createView({
        height: "100%",
        width: "50%",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
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
        color: "#000",
        title: "ギャラリー",
        id: "gallery"
    });
    $.__views.__alloyId107.add($.__views.gallery);
    onGalleryClicked ? $.__views.gallery.addEventListener("click", onGalleryClicked) : __defers["$.__views.gallery!click!onGalleryClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    imageIsSet = false;
    var selectedCategory = 1;
    __defers["$.__views.image_view!setImage!onSetImage"] && $.__views.image_view.on("setImage", onSetImage);
    __defers["$.__views.select_category!click!onSelectCategoryClicked"] && $.__views.select_category.addEventListener("click", onSelectCategoryClicked);
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.recapture!click!onRecaptureClicked"] && $.__views.recapture.addEventListener("click", onRecaptureClicked);
    __defers["$.__views.gallery!click!onGalleryClicked"] && $.__views.gallery.addEventListener("click", onGalleryClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;