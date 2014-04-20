function Controller() {
    function onPostClicked() {
        var v = $.goodness.getView("goodness").value;
        var params = {
            goodness: v,
            category: selectedCategory,
            comment: $.comment.value
        };
        setCover();
        Alloy.Globals.api.postManager.post(photoData, params, function(result) {
            removeCover();
            Alloy.Globals.lastPost = result;
            Alloy.Globals.post = result;
            var dialog = Titanium.UI.createAlertDialog({
                title: "投稿完了",
                message: "投稿ありがとうございます。追加の情報は次のページで編集できます。"
            });
            Alloy.Globals.naviCon.home();
            dialog.addEventListener("click", function() {
                var view = Alloy.createController("edit_post").getView();
                Alloy.Globals.naviCon.open(view);
            });
            dialog.show();
        });
    }
    function onRecaptureClicked() {
        showCamera();
    }
    function onGalleryClicked() {
        showGallery();
    }
    function showGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                photoData = event.media;
                $.photo.image = event.media;
                $.post.enabled = true;
            }
        });
    }
    function setCover() {
        $.activityIndicator.show();
        $.post.enabled = false;
        $.recapture.enabled = false;
    }
    function removeCover() {
        $.activityIndicator.hide();
        $.post.enabled = true;
        $.recapture.enabled = true;
    }
    function showCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.debug("picture was taken");
                photoData = event.media;
                $.photo.image = event.media;
                $.post.enabled = true;
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                if (error.code == Titanium.Media.NO_CAMERA) showGallery(); else {
                    a.setMessage("Unexpected error: " + error.code);
                    a.show();
                }
            },
            saveToPhotoGallery: false,
            mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
            allowEditing: true
        });
    }
    function onSelectCategoryClicked() {
        Alloy.Globals.post;
        var view = Alloy.createController("select_category", {
            selectCallback: function(c) {
                selectedCategory = c.id;
                $.category.text = c.label;
            }
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_image";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_image = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "post_image"
    });
    $.__views.post_image && $.addTopLevelView($.__views.post_image);
    $.__views.__alloyId95 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId95"
    });
    $.__views.post_image.add($.__views.__alloyId95);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Uploading..."
    });
    $.__views.__alloyId95.add($.__views.activityIndicator);
    $.__views.title = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        text: "投稿",
        id: "title"
    });
    $.__views.__alloyId95.add($.__views.title);
    $.__views.photo = Ti.UI.createImageView({
        width: "90%",
        height: "40%",
        id: "photo"
    });
    $.__views.__alloyId95.add($.__views.photo);
    $.__views.__alloyId96 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId96"
    });
    $.__views.__alloyId95.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        text: "内容:",
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.category = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        right: "22%",
        text: "未選択",
        id: "category"
    });
    $.__views.__alloyId96.add($.__views.category);
    $.__views.select_category = Ti.UI.createButton({
        font: {
            fontSize: "24dp"
        },
        height: "36dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "auto",
        right: "2%",
        color: "#000",
        width: "20%",
        title: "選択",
        id: "select_category"
    });
    $.__views.__alloyId96.add($.__views.select_category);
    onSelectCategoryClicked ? $.__views.select_category.addEventListener("click", onSelectCategoryClicked) : __defers["$.__views.select_category!click!onSelectCategoryClicked"] = true;
    $.__views.goodness = Alloy.createController("goodness_bar", {
        id: "goodness",
        __parentSymbol: $.__views.__alloyId95
    });
    $.__views.goodness.setParent($.__views.__alloyId95);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        text: "コメント",
        id: "__alloyId98"
    });
    $.__views.__alloyId95.add($.__views.__alloyId98);
    $.__views.comment = Ti.UI.createTextArea({
        font: {
            fontSize: "24dp"
        },
        borderRadius: 5,
        width: "100%",
        id: "comment"
    });
    $.__views.__alloyId95.add($.__views.comment);
    $.__views.__alloyId99 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId99"
    });
    $.__views.__alloyId95.add($.__views.__alloyId99);
    $.__views.post = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "5dp",
        right: "10dp",
        color: "#000",
        width: "60%",
        title: "投稿",
        id: "post"
    });
    $.__views.__alloyId99.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.recapture = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "5dp",
        color: "#000",
        width: "30%",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.__alloyId99.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    $.__views.gallery = Ti.UI.createButton({
        font: {
            fontSize: "24dp"
        },
        height: "36dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "auto",
        right: "5dp",
        color: "#000",
        width: "40%",
        title: "ギャラリー",
        id: "gallery"
    });
    $.__views.__alloyId95.add($.__views.gallery);
    onGalleryClicked ? $.__views.gallery.addEventListener("click", onGalleryClicked) : __defers["$.__views.gallery!click!onGalleryClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var photoData = "";
    var selectedCategory = 0;
    $.post_image.addEventListener("open", function() {
        showCamera();
        $.post.enabled = false;
    });
    __defers["$.__views.select_category!click!onSelectCategoryClicked"] && $.__views.select_category.addEventListener("click", onSelectCategoryClicked);
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.recapture!click!onRecaptureClicked"] && $.__views.recapture.addEventListener("click", onRecaptureClicked);
    __defers["$.__views.gallery!click!onGalleryClicked"] && $.__views.gallery.addEventListener("click", onGalleryClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;