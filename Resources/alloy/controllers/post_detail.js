function Controller() {
    function setPost(post) {
        Ti.API.debug("Hoge");
        $.photo.image = api.toImageUrl(post);
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
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "scroll_view"
    });
    $.__views.post_detail.add($.__views.scroll_view);
    $.__views.status_message = Ti.UI.createLabel({
        text: "未読の返信が1件あります。",
        id: "status_message"
    });
    $.__views.scroll_view.add($.__views.status_message);
    $.__views.photo = Ti.UI.createImageView({
        id: "photo"
    });
    $.__views.scroll_view.add($.__views.photo);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "horizontal",
        height: 30,
        id: "__alloyId1"
    });
    $.__views.scroll_view.add($.__views.__alloyId1);
    $.__views.date = Ti.UI.createLabel({
        text: "2013年6月23日",
        id: "date"
    });
    $.__views.__alloyId1.add($.__views.date);
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "horizontal",
        height: 30,
        id: "__alloyId2"
    });
    $.__views.scroll_view.add($.__views.__alloyId2);
    $.__views.goodness_label = Ti.UI.createLabel({
        text: "評価",
        id: "goodness_label"
    });
    $.__views.__alloyId2.add($.__views.goodness_label);
    $.__views.goodness = Ti.UI.createLabel({
        text: "良い",
        id: "goodness"
    });
    $.__views.__alloyId2.add($.__views.goodness);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "horizontal",
        height: 30,
        id: "__alloyId3"
    });
    $.__views.scroll_view.add($.__views.__alloyId3);
    $.__views.water_height_label = Ti.UI.createLabel({
        text: "水位",
        id: "water_height_label"
    });
    $.__views.__alloyId3.add($.__views.water_height_label);
    $.__views.water_height = Ti.UI.createLabel({
        text: "22センチ",
        id: "water_height"
    });
    $.__views.__alloyId3.add($.__views.water_height);
    $.__views.comment_area = Ti.UI.createView({
        height: "30%",
        layout: "vertical",
        id: "comment_area"
    });
    $.__views.scroll_view.add($.__views.comment_area);
    var __alloyId4 = {};
    var __alloyId6 = [];
    var __alloyId8 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId9 = [];
            var __alloyId11 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId12 = [];
                    var __alloyId14 = {
                        type: "Ti.UI.Label",
                        properties: {
                            text: "名前"
                        }
                    };
                    __alloyId12.push(__alloyId14);
                    var __alloyId16 = {
                        type: "Ti.UI.Label",
                        bindId: "nickname",
                        properties: {
                            text: "aaa",
                            bindId: "nickname"
                        }
                    };
                    __alloyId12.push(__alloyId16);
                    var __alloyId18 = {
                        type: "Ti.UI.Label",
                        properties: {
                            text: "書き込み"
                        }
                    };
                    __alloyId12.push(__alloyId18);
                    var __alloyId20 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId12.push(__alloyId20);
                    return __alloyId12;
                }(),
                properties: {
                    layout: "horizontal",
                    height: 30
                }
            };
            __alloyId9.push(__alloyId11);
            var __alloyId22 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId23 = [];
                    var __alloyId25 = {
                        type: "Ti.UI.Label",
                        properties: {
                            text: "コメント"
                        }
                    };
                    __alloyId23.push(__alloyId25);
                    var __alloyId27 = {
                        type: "Ti.UI.Label",
                        bindId: "comment",
                        properties: {
                            text: "aaa",
                            bindId: "comment"
                        }
                    };
                    __alloyId23.push(__alloyId27);
                    return __alloyId23;
                }(),
                properties: {
                    layout: "horizontal",
                    height: 30
                }
            };
            __alloyId9.push(__alloyId22);
            return __alloyId9;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId6.push(__alloyId8);
    var __alloyId5 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId6
    };
    __alloyId4["comment"] = __alloyId5;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        height: "200dp",
        templates: __alloyId4,
        id: "comment_list",
        defaultItemTemplate: "comment"
    });
    $.__views.comment_area.add($.__views.comment_list);
    $.__views.show_comment = Ti.UI.createButton({
        title: "コメントを全て見る",
        id: "show_comment"
    });
    $.__views.scroll_view.add($.__views.show_comment);
    $.__views.__alloyId28 = Ti.UI.createView({
        layout: "horizontal",
        height: 30,
        id: "__alloyId28"
    });
    $.__views.scroll_view.add($.__views.__alloyId28);
    $.__views.comment = Ti.UI.createTextField({
        id: "comment",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    $.__views.__alloyId28.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId28.add($.__views.send_comment);
    $.__views.private_area = Ti.UI.createView({
        layout: "vertical",
        id: "private_area"
    });
    $.__views.scroll_view.add($.__views.private_area);
    $.__views.from_admin = Ti.UI.createButton({
        title: "管理者からの返信を見る",
        id: "from_admin"
    });
    $.__views.private_area.add($.__views.from_admin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    $.post_detail.addEventListener("open", function() {
        var post = Alloy.Globals.post;
        post ? $.photo.image = api.toImageUrl(post) : api.postManager.getPost(1, function(post) {
            $.photo.image = api.toImageUrl(post);
            post.unreadUpdates > 0 && ($.status_message.text = "未読の返信が" + post.unreadUpdates + "件あります。");
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
                        height: "80dp"
                    },
                    nickname: {
                        text: nickname
                    },
                    comment: {
                        text: c.comment
                    },
                    date: {
                        text: c.commented
                    }
                });
            }
            commentSection.setItems(commentDataSet);
            $.comment_list.setSections([ commentSection ]);
        });
    });
    exports.setPost = setPost;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;