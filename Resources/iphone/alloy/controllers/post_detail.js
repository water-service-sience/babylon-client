function Controller() {
    function setPost(post) {
        $.photo.image = api.toImageUrl(post);
    }
    function onShowMessagesClicked() {
        var view = Alloy.createController("post_messages", {
            post: post
        }).getView();
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
        if (post.userId == api.client.userId) {
            $.private_area.visible = true;
            $.height = "auto";
        } else {
            $.private_area.visible = false;
            $.height = 0;
        }
        $.append_info_area.removeAllChildren();
        if (post.fieldData) {
            var index = 0;
            var height = 20;
            for (var key in post.fieldData) {
                var v = post.fieldData[key];
                var line = Ti.UI.createView({
                    left: 0,
                    width: "100%",
                    height: height + "dp"
                });
                var label = Ti.UI.createLabel({
                    text: key + ":",
                    left: 0,
                    top: 0,
                    height: height + "dp"
                });
                var value = Ti.UI.createLabel({
                    text: v,
                    left: "100dp",
                    top: 0,
                    height: height + "dp"
                });
                index += 1;
                line.add(label);
                line.add(value);
                $.append_info_area.add(line);
            }
            $.append_info_area.height = index * height + "dp";
        }
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
    $.__views.__alloyId89 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId89"
    });
    $.__views.scroll_view.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿者:",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.post_user = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "ほげ",
        id: "post_user"
    });
    $.__views.__alloyId89.add($.__views.post_user);
    $.__views.__alloyId91 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId91"
    });
    $.__views.scroll_view.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "投稿日時:",
        id: "__alloyId92"
    });
    $.__views.__alloyId91.add($.__views.__alloyId92);
    $.__views.date = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "2013年6月23日",
        id: "date"
    });
    $.__views.__alloyId91.add($.__views.date);
    $.__views.__alloyId93 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId93"
    });
    $.__views.scroll_view.add($.__views.__alloyId93);
    $.__views.goodness_label = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "評価:",
        id: "goodness_label"
    });
    $.__views.__alloyId93.add($.__views.goodness_label);
    $.__views.goodness = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "良い",
        id: "goodness"
    });
    $.__views.__alloyId93.add($.__views.goodness);
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
    $.__views.__alloyId94 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "-- 周辺の情報 --",
        id: "__alloyId94"
    });
    $.__views.scroll_view.add($.__views.__alloyId94);
    $.__views.append_info_area = Ti.UI.createView({
        height: "auto",
        layout: "vertical",
        id: "append_info_area"
    });
    $.__views.scroll_view.add($.__views.append_info_area);
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