function Controller() {
    function setPost(post) {
        $.photo.image = api.toImageUrl(post);
    }
    function onShowMessagesClicked() {
        var view = Alloy.createController("post_messages").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onShowInMapClicked() {
        var view = Alloy.createController("post_map").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onEditPostClicked() {
        var view = Alloy.createController("edit_post").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function updateDisplayInformation(post) {
        if (post.userId == api.client.userId && post.unreadMessages > 0) {
            $.status_message.visible = true;
            $.status_message.text = "未読の返信が" + post.unreadMessages + "件あります。";
        } else $.status_message.visible = false;
        $.private_area.visible = post.userId == api.client.userId ? true : false;
        $.photo.image = api.toImageUrl(post);
        $.date.text = util.dateToString(post.posted);
        $.goodness.text = util.goodnessToString(post.goodness);
        $.post_user.text = post.user.nickname;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_detail = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        id: "post_detail"
    });
    $.__views.post_detail && $.addTopLevelView($.__views.post_detail);
    $.__views.scroll_view = Ti.UI.createScrollView({
        layout: "vertical",
        id: "scroll_view"
    });
    $.__views.post_detail.add($.__views.scroll_view);
    $.__views.status_message = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "未読の返信が1件あります。",
        id: "status_message"
    });
    $.__views.scroll_view.add($.__views.status_message);
    $.__views.photo = Ti.UI.createImageView({
        left: 0,
        width: "100%",
        autorotate: true,
        id: "photo"
    });
    $.__views.scroll_view.add($.__views.photo);
    $.__views.__alloyId80 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId80"
    });
    $.__views.scroll_view.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿者:",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.post_user = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ほげ",
        id: "post_user"
    });
    $.__views.__alloyId80.add($.__views.post_user);
    $.__views.__alloyId82 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId82"
    });
    $.__views.scroll_view.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿日時:",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.date = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "2013年6月23日",
        id: "date"
    });
    $.__views.__alloyId82.add($.__views.date);
    $.__views.__alloyId84 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId84"
    });
    $.__views.scroll_view.add($.__views.__alloyId84);
    $.__views.goodness_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "評価:",
        id: "goodness_label"
    });
    $.__views.__alloyId84.add($.__views.goodness_label);
    $.__views.goodness = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "良い",
        id: "goodness"
    });
    $.__views.__alloyId84.add($.__views.goodness);
    $.__views.append_info_area = Ti.UI.createView({
        height: "35dp",
        layout: "horizontal",
        id: "append_info_area"
    });
    $.__views.scroll_view.add($.__views.append_info_area);
    $.__views.water_height_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "水位",
        id: "water_height_label"
    });
    $.__views.append_info_area.add($.__views.water_height_label);
    $.__views.water_height = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "22センチ",
        id: "water_height"
    });
    $.__views.append_info_area.add($.__views.water_height);
    $.__views.show_in_map = Ti.UI.createButton({
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
        title: "投稿場所を見る",
        id: "show_in_map"
    });
    $.__views.scroll_view.add($.__views.show_in_map);
    onShowInMapClicked ? $.__views.show_in_map.addEventListener("click", onShowInMapClicked) : __defers["$.__views.show_in_map!click!onShowInMapClicked"] = true;
    $.__views.private_area = Ti.UI.createView({
        layout: "vertical",
        height: "104dp",
        id: "private_area",
        visible: "false"
    });
    $.__views.scroll_view.add($.__views.private_area);
    $.__views.edit_post = Ti.UI.createButton({
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
        title: "投稿内容を編集",
        id: "edit_post"
    });
    $.__views.private_area.add($.__views.edit_post);
    onEditPostClicked ? $.__views.edit_post.addEventListener("click", onEditPostClicked) : __defers["$.__views.edit_post!click!onEditPostClicked"] = true;
    $.__views.show_messages = Ti.UI.createButton({
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
        title: "管理者の返信を見る",
        id: "show_messages"
    });
    $.__views.private_area.add($.__views.show_messages);
    onShowMessagesClicked ? $.__views.show_messages.addEventListener("click", onShowMessagesClicked) : __defers["$.__views.show_messages!click!onShowMessagesClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var util = Alloy.Globals.util;
    var args = arguments[0] || {};
    var post = args.post || Alloy.Globals.post;
    post ? updateDisplayInformation(post) : api.postManager.getPost(1, function(post) {
        Alloy.Globals.post = post;
        updateDisplayInformation(post);
    });
    $.post_detail.addEventListener("open", function() {});
    exports.setPost = setPost;
    __defers["$.__views.show_in_map!click!onShowInMapClicked"] && $.__views.show_in_map.addEventListener("click", onShowInMapClicked);
    __defers["$.__views.edit_post!click!onEditPostClicked"] && $.__views.edit_post.addEventListener("click", onEditPostClicked);
    __defers["$.__views.show_messages!click!onShowMessagesClicked"] && $.__views.show_messages.addEventListener("click", onShowMessagesClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;