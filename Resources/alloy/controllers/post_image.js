function Controller() {
    function onPostClicked() {
        Alloy.Globals.api.postManager.post(photoData, $.goodness.value);
        var view = Alloy.createController("finish_post").getView();
        Alloy.Globals.naviCon.home();
        Alloy.Globals.naviCon.open(view);
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
                if (error.code == Titanium.Media.NO_CAMERA) {
                    a.setMessage("No camera");
                    a.show();
                    showGallery();
                } else {
                    a.setMessage("Unexpected error: " + error.code);
                    a.show();
                }
            },
            saveToPhotoGallery: false,
            mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_image = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "post_image"
    });
    $.__views.post_image && $.addTopLevelView($.__views.post_image);
    $.__views.title = Ti.UI.createLabel({
        top: "2%",
        height: Ti.UI.SIZE,
        text: "投稿",
        id: "title"
    });
    $.__views.post_image.add($.__views.title);
    $.__views.photo = Ti.UI.createImageView({
        width: "90%",
        height: "40%",
        top: "10%",
        bottom: "50%",
        id: "photo"
    });
    $.__views.post_image.add($.__views.photo);
    $.__views.bad = Ti.UI.createLabel({
        left: "3%",
        bottom: "40%",
        width: "30%",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: "悪い",
        id: "bad"
    });
    $.__views.post_image.add($.__views.bad);
    $.__views.good = Ti.UI.createLabel({
        right: "3%",
        bottom: "40%",
        width: "30%",
        textAlign: "right",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: "良い",
        id: "good"
    });
    $.__views.post_image.add($.__views.good);
    $.__views.goodness = Ti.UI.createSlider({
        left: "5%",
        bottom: "30%",
        width: "90%",
        id: "goodness"
    });
    $.__views.post_image.add($.__views.goodness);
    $.__views.post = Ti.UI.createButton({
        left: "5%",
        bottom: "5%",
        width: "60%",
        title: "投稿",
        id: "post"
    });
    $.__views.post_image.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.recapture = Ti.UI.createButton({
        bottom: "5%",
        left: "70%",
        width: "25%",
        title: "再撮影",
        id: "recapture"
    });
    $.__views.post_image.add($.__views.recapture);
    onRecaptureClicked ? $.__views.recapture.addEventListener("click", onRecaptureClicked) : __defers["$.__views.recapture!click!onRecaptureClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var photoData = "";
    $.post_image.addEventListener("open", function() {
        showCamera();
        $.goodness.max = 100;
        $.goodness.min = 0;
        $.goodness.value = 50;
        $.post.enabled = false;
    });
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.recapture!click!onRecaptureClicked"] && $.__views.recapture.addEventListener("click", onRecaptureClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;