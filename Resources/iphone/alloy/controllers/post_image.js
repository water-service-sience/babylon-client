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
    $.__views.__alloyId98 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId98"
    });
    $.__views.post_image.add($.__views.__alloyId98);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Uploading..."
    });
    $.__views.__alloyId98.add($.__views.activityIndicator);
    $.__views.title = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿",
        id: "title"
    });
    $.__views.__alloyId98.add($.__views.title);
    $.__views.photo = Ti.UI.createImageView({
        width: "90%",
        height: "40%",
        id: "photo"
    });
    $.__views.__alloyId98.add($.__views.photo);
    $.__views.__alloyId99 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId99"
    });
    $.__views.__alloyId98.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "内容:",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    $.__views.category = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        right: "22%",
        text: "未選択",
        id: "category"
    });
    $.__views.__alloyId99.add($.__views.category);
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
        width: "20%",
        right: "2%",
        title: "選択",
        id: "select_category"
    });
    $.__views.__alloyId99.add($.__views.select_category);
    onSelectCategoryClicked ? $.__views.select_category.addEventListener("click", onSelectCategoryClicked) : __defers["$.__views.select_category!click!onSelectCategoryClicked"] = true;
    $.__views.goodness = Alloy.createController("goodness_bar", {
        id: "goodness",
        __parentSymbol: $.__views.__alloyId98
    });
    $.__views.goodness.setParent($.__views.__alloyId98);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "コメント",
        id: "__alloyId101"
    });
    $.__views.__alloyId98.add($.__views.__alloyId101);
    $.__views.comment = Ti.UI.createTextArea({
        width: "100%",
        height: "100dp",
        font: {
            fontSize: "24dp"
        },
        borderRadius: 5,
        suppressReturn: "false",
        id: "comment"
    });
    $.__views.__alloyId98.add($.__views.comment);
    $.__views.__alloyId102 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId102"
    });
    $.__views.__alloyId98.add($.__views.__alloyId102);
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
        width: "60%",
        left: "5dp",
        title: "投稿",
        id: "post"
    });
    $.__views.__alloyId102.add($.__views.post);
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
        width: "30%",
        right: "5dp",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.__alloyId102.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    $.__views.__alloyId103 = Ti.UI.createView({
        width: "100%",
        height: "25dp",
        id: "__alloyId103"
    });
    $.__views.__alloyId98.add($.__views.__alloyId103);
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
        width: "40%",
        left: "auto",
        right: "5dp",
        title: "ギャラリー",
        id: "gallery"
    });
    $.__views.__alloyId98.add($.__views.gallery);
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