function Controller() {
    function setPost(post) {
        Ti.API.debug("Hoge");
        $.photo.image = api.toImageUrl(post);
    }
    function onShowUpdatesClicked() {
        var view = Alloy.createController("post_all_updates").getView();
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
    function onSendCommentClicked() {
        var post = Alloy.Globals.post;
        var message = $.comment.value;
        $.comment.value = "";
        $.comment.blur();
        api.postManager.commentTo(post.id, message, function(post) {
            Alloy.Globals.post = post;
            updateDisplayInformation(post);
        });
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
        var commentSection = Ti.UI.createListSection({
            headerTitle: "コメント"
        });
        var commentDataSet = [];
        for (var i in post.comments) {
            var c = post.comments[i];
            var nickname = "no name";
            c.user && (nickname = c.user.nickname);
            commentDataSet.push({
                properties: {
                    height: "105dp"
                },
                nickname: {
                    text: nickname
                },
                comment: {
                    text: c.comment
                },
                date: {
                    text: util.dateToString(c.commented)
                }
            });
        }
        commentSection.setItems(commentDataSet);
        $.comment_list.setSections([ commentSection ]);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_detail = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "post_detail"
    });
    $.__views.post_detail && $.addTopLevelView($.__views.post_detail);
    $.__views.scroll_view = Ti.UI.createScrollView({
        layout: "vertical",
        id: "scroll_view"
    });
    $.__views.post_detail.add($.__views.scroll_view);
    $.__views.status_message = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "未読の返信が1件あります。",
        id: "status_message"
    });
    $.__views.scroll_view.add($.__views.status_message);
    $.__views.photo = Ti.UI.createImageView({
        width: "100%",
        autorotate: true,
        id: "photo"
    });
    $.__views.scroll_view.add($.__views.photo);
    $.__views.__alloyId55 = Ti.UI.createView({
        layout: "horizontal",
        height: "35dp",
        id: "__alloyId55"
    });
    $.__views.scroll_view.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "投稿者:",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.post_user = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "ほげ",
        id: "post_user"
    });
    $.__views.__alloyId55.add($.__views.post_user);
    $.__views.__alloyId57 = Ti.UI.createView({
        layout: "horizontal",
        height: "35dp",
        id: "__alloyId57"
    });
    $.__views.scroll_view.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "投稿日時:",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.date = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "2013年6月23日",
        id: "date"
    });
    $.__views.__alloyId57.add($.__views.date);
    $.__views.__alloyId59 = Ti.UI.createView({
        layout: "horizontal",
        height: "35dp",
        id: "__alloyId59"
    });
    $.__views.scroll_view.add($.__views.__alloyId59);
    $.__views.goodness_label = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "評価:",
        id: "goodness_label"
    });
    $.__views.__alloyId59.add($.__views.goodness_label);
    $.__views.goodness = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "良い",
        id: "goodness"
    });
    $.__views.__alloyId59.add($.__views.goodness);
    $.__views.append_info_area = Ti.UI.createView({
        height: "35dp",
        layout: "horizontal",
        id: "append_info_area"
    });
    $.__views.scroll_view.add($.__views.append_info_area);
    $.__views.water_height_label = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "水位",
        id: "water_height_label"
    });
    $.__views.append_info_area.add($.__views.water_height_label);
    $.__views.water_height = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        text: "22センチ",
        id: "water_height"
    });
    $.__views.append_info_area.add($.__views.water_height);
    $.__views.show_in_map = Ti.UI.createButton({
        height: "38dp",
        title: "投稿場所を見る",
        id: "show_in_map"
    });
    $.__views.scroll_view.add($.__views.show_in_map);
    $.__views.private_area = Ti.UI.createView({
        layout: "vertical",
        height: "80dp",
        id: "private_area"
    });
    $.__views.scroll_view.add($.__views.private_area);
    $.__views.edit_post = Ti.UI.createButton({
        height: "38dp",
        title: "投稿内容を編集",
        id: "edit_post"
    });
    $.__views.private_area.add($.__views.edit_post);
    $.__views.show_updates = Ti.UI.createButton({
        height: "38dp",
        title: "管理者からの返信を見る",
        id: "show_updates"
    });
    $.__views.private_area.add($.__views.show_updates);
    $.__views.__alloyId60 = Ti.UI.createView({
        layout: "horizontal",
        height: "35dp",
        id: "__alloyId60"
    });
    $.__views.scroll_view.add($.__views.__alloyId60);
    $.__views.comment = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "200dp",
        height: "30dp",
        id: "comment"
    });
    $.__views.__alloyId60.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        height: "38dp",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId60.add($.__views.send_comment);
    $.__views.comment_area = Ti.UI.createView({
        height: "80%",
        layout: "vertical",
        id: "comment_area"
    });
    $.__views.scroll_view.add($.__views.comment_area);
    var __alloyId61 = {};
    var __alloyId64 = [];
    var __alloyId66 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId67 = [];
            var __alloyId69 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId70 = [];
                    var __alloyId72 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "投稿:"
                        }
                    };
                    __alloyId70.push(__alloyId72);
                    var __alloyId74 = {
                        type: "Ti.UI.Label",
                        bindId: "nickname",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "aaa",
                            bindId: "nickname"
                        }
                    };
                    __alloyId70.push(__alloyId74);
                    var __alloyId76 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "さん 投稿日:"
                        }
                    };
                    __alloyId70.push(__alloyId76);
                    var __alloyId78 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            right: 0,
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId70.push(__alloyId78);
                    return __alloyId70;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "35dp"
                }
            };
            __alloyId67.push(__alloyId69);
            var __alloyId80 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId81 = [];
                    var __alloyId83 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "コメント"
                        }
                    };
                    __alloyId81.push(__alloyId83);
                    var __alloyId85 = {
                        type: "Ti.UI.Label",
                        bindId: "comment",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "aaa",
                            bindId: "comment"
                        }
                    };
                    __alloyId81.push(__alloyId85);
                    return __alloyId81;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "35dp"
                }
            };
            __alloyId67.push(__alloyId80);
            return __alloyId67;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId64.push(__alloyId66);
    var __alloyId63 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId64
    };
    __alloyId61["comment"] = __alloyId63;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        top: 0,
        height: "80%",
        templates: __alloyId61,
        id: "comment_list",
        defaultItemTemplate: "comment"
    });
    $.__views.comment_area.add($.__views.comment_list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var util = Alloy.Globals.util;
    $.post_detail.addEventListener("open", function() {
        var post = Alloy.Globals.post;
        $.show_updates.addEventListener("click", onShowUpdatesClicked);
        $.show_in_map.addEventListener("click", onShowInMapClicked);
        $.edit_post.addEventListener("click", onEditPostClicked);
        $.send_comment.addEventListener("click", onSendCommentClicked);
        $.comment.addEventListener("return", onSendCommentClicked);
        post ? updateDisplayInformation(post) : api.postManager.getPost(1, function(post) {
            Alloy.Globals.post = post;
            updateDisplayInformation(post);
        });
    });
    exports.setPost = setPost;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;