function Controller() {
    function onSelectCategoryClicked() {
        var post = Alloy.Globals.post;
        var view = Alloy.createController("select_category", {
            selectCallback: function(c) {
                post.category = c;
                $.category.text = c.label;
            }
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSelectLocationClicked() {
        var post = Alloy.Globals.post;
        var view = Alloy.createController("select_location", {
            latitude: post.latitude,
            longitude: post.longitude,
            callback: function(e) {
                if (!e.cancel) {
                    post.latitude = e.latitude;
                    post.longitude = e.longitude;
                    updateDisplayInfo(post);
                }
            }
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSaveClicked() {
        var post = Alloy.Globals.post;
        var param = {
            postId: post.id,
            category: post.category.id,
            comment: $.comment.value
        };
        api.postManager.updatePost(param, function(e) {
            Alloy.Globals.post = e;
            Alloy.Globals.naviCon.pop();
        });
    }
    function updateDisplayInfo(post) {
        $.comment.value = post.comment;
        $.location.text = post.latitude.toFixed(2) + " " + post.longitude.toFixed(2);
        $.photo.image = api.toImageUrl(post);
        $.goodness.value = post.goodness;
        $.category.text = post.category.label;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.edit_post = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "edit_post"
    });
    $.__views.edit_post && $.addTopLevelView($.__views.edit_post);
    $.__views.scroll_view = Ti.UI.createScrollView({
        layout: "vertical",
        id: "scroll_view"
    });
    $.__views.edit_post.add($.__views.scroll_view);
    $.__views.photo = Ti.UI.createImageView({
        width: "100%",
        id: "photo"
    });
    $.__views.scroll_view.add($.__views.photo);
    $.__views.__alloyId15 = Ti.UI.createView({
        height: "54dp",
        layout: "horizontal",
        id: "__alloyId15"
    });
    $.__views.scroll_view.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "内容:",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.category = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "Hoge",
        id: "category"
    });
    $.__views.__alloyId15.add($.__views.category);
    $.__views.select_category = Ti.UI.createButton({
        font: {
            fontSize: "16dp"
        },
        height: "20dp",
        backgroundFocusedColor: "gray",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
        title: "選択",
        id: "select_category"
    });
    $.__views.__alloyId15.add($.__views.select_category);
    $.__views.goodness = Alloy.createController("goodness_bar", {
        id: "goodness",
        __parentSymbol: $.__views.scroll_view
    });
    $.__views.goodness.setParent($.__views.scroll_view);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "コメント",
        id: "__alloyId17"
    });
    $.__views.scroll_view.add($.__views.__alloyId17);
    $.__views.comment = Ti.UI.createTextArea({
        font: {
            fontSize: "24dp"
        },
        borderRadius: 5,
        width: "100%",
        height: "105dp",
        id: "comment"
    });
    $.__views.scroll_view.add($.__views.comment);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId18"
    });
    $.__views.scroll_view.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "緯度経度",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.location = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "123,233",
        id: "location"
    });
    $.__views.__alloyId18.add($.__views.location);
    $.__views.select_location = Ti.UI.createButton({
        font: {
            fontSize: "16dp"
        },
        height: "20dp",
        backgroundFocusedColor: "gray",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
        title: "選択",
        id: "select_location"
    });
    $.__views.__alloyId18.add($.__views.select_location);
    $.__views.save = Ti.UI.createButton({
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
        title: "保存",
        id: "save"
    });
    $.__views.scroll_view.add($.__views.save);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.util;
    var api = Alloy.Globals.api;
    $.edit_post.addEventListener("open", function() {
        $.save.addEventListener("click", onSaveClicked);
        $.select_category.addEventListener("click", onSelectCategoryClicked);
        $.select_location.addEventListener("click", onSelectLocationClicked);
        var post = Alloy.Globals.post;
        updateDisplayInfo(post);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;