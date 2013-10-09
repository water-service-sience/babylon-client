function Controller() {
    function onPostClicked() {
        var v = $.goodness.getView("goodness").value;
        Alloy.Globals.api.postManager.post(photoData, v, function(result) {
            Alloy.Globals.lastPost = result;
            Alloy.Globals.post = result;
            var view = Alloy.createController("edit_post").getView();
            var dialog = Titanium.UI.createAlertDialog({
                title: "投稿完了",
                message: "投稿ありがとうございます。追加の情報は次のページで編集できます。"
            });
            dialog.show();
            Alloy.Globals.naviCon.home();
            Alloy.Globals.naviCon.open(view);
        });
    }
    function onRecaptureClicked() {
        showCamera();
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
            mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO
        });
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
    $.__views.title = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿",
        id: "title"
    });
    $.__views.post_image.add($.__views.title);
    $.__views.photo = Ti.UI.createImageView({
        width: "90%",
        height: "40%",
        id: "photo"
    });
    $.__views.post_image.add($.__views.photo);
    $.__views.goodness = Alloy.createController("goodness_bar", {
        id: "goodness",
        __parentSymbol: $.__views.post_image
    });
    $.__views.goodness.setParent($.__views.post_image);
    $.__views.__alloyId85 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId85"
    });
    $.__views.post_image.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createView({
        width: "3dp",
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
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
        left: "10dp",
        right: "10dp",
        width: "60%",
        title: "投稿",
        id: "post"
    });
    $.__views.__alloyId85.add($.__views.post);
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
        right: "10dp",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.__alloyId85.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var photoData = "";
    $.post_image.addEventListener("open", function() {
        showCamera();
        $.post.enabled = false;
    });
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.recapture!click!onRecaptureClicked"] && $.__views.recapture.addEventListener("click", onRecaptureClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;