function Controller() {
    function showCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.debug("picture was taken");
                photoData = event.media;
                $.photo.image = event.media;
                $.trigger(setImageEvent, {
                    photo: photoData
                });
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
    function showGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                photoData = event.media;
                $.photo.image = event.media;
                $.trigger(setImageEvent, {
                    photo: photoData
                });
            }
        });
    }
    function postData(data) {
        style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
        var activityIndicator = Ti.UI.createActivityIndicator({
            color: "white",
            font: {
                fontFamily: "Helvetica Neue",
                fontSize: 26,
                fontWeight: "bold"
            },
            message: "Uploading...",
            indicatorDiameter: "50dp",
            style: style,
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE
        });
        Alloy.Globals.naviCon.getCurrentWindow();
        var coverWindow = Ti.UI.createWindow({
            backgroundColor: "#555555",
            fullscreen: true,
            opacity: .6
        });
        var indicatorWindow = Ti.UI.createWindow({
            fullscreen: true
        });
        indicatorWindow.add(activityIndicator);
        indicatorWindow.addEventListener("open", function() {
            activityIndicator.show();
        });
        coverWindow.open();
        indicatorWindow.open();
        Alloy.Globals.api.postManager.post(photoData, data, function(result) {
            indicatorWindow.close();
            coverWindow.close();
            activityIndicator.hide();
            if (result) {
                Alloy.Globals.lastPost = result;
                Alloy.Globals.post = result;
                var dialog = Titanium.UI.createAlertDialog({
                    title: "投稿完了",
                    message: "投稿ありがとうございます。"
                });
                Alloy.Globals.naviCon.home();
                dialog.show();
            } else {
                var dialog = Titanium.UI.createAlertDialog({
                    title: "投稿失敗",
                    message: "投稿に失敗しました。ネットワークを確認して、再度投稿してください"
                });
                dialog.show();
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_image_view";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_image_view = Ti.UI.createView({
        height: "200dp",
        id: "post_image_view"
    });
    $.__views.post_image_view && $.addTopLevelView($.__views.post_image_view);
    $.__views.photo = Ti.UI.createImageView({
        id: "photo"
    });
    $.__views.post_image_view.add($.__views.photo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var photoData;
    var setImageEvent = "setImage";
    showCamera();
    exports.showCamera = showCamera;
    exports.showGallery = showGallery;
    exports.postData = postData;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;