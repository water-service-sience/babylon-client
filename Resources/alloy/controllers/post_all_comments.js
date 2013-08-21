function Controller() {
    function updateUserPost(post) {
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
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_all_comments";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_all_comments = Ti.UI.createWindow({
        layout: "vertical",
        id: "post_all_comments"
    });
    $.__views.post_all_comments && $.addTopLevelView($.__views.post_all_comments);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "horizontal",
        height: "30dp",
        id: "__alloyId1"
    });
    $.__views.post_all_comments.add($.__views.__alloyId1);
    $.__views.comment = Ti.UI.createTextField({
        id: "comment",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    $.__views.__alloyId1.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        height: "38dp",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId1.add($.__views.send_comment);
    var __alloyId2 = {};
    var __alloyId4 = [];
    var __alloyId6 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId7 = [];
            var __alloyId9 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId10 = [];
                    var __alloyId12 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "名前"
                        }
                    };
                    __alloyId10.push(__alloyId12);
                    var __alloyId14 = {
                        type: "Ti.UI.Label",
                        bindId: "nickname",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "aaa",
                            bindId: "nickname"
                        }
                    };
                    __alloyId10.push(__alloyId14);
                    var __alloyId16 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "書き込み"
                        }
                    };
                    __alloyId10.push(__alloyId16);
                    var __alloyId18 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId10.push(__alloyId18);
                    return __alloyId10;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "30dp"
                }
            };
            __alloyId7.push(__alloyId9);
            var __alloyId20 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId21 = [];
                    var __alloyId23 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "コメント"
                        }
                    };
                    __alloyId21.push(__alloyId23);
                    var __alloyId25 = {
                        type: "Ti.UI.Label",
                        bindId: "comment",
                        properties: {
                            font: {
                                fontSize: "20dp"
                            },
                            text: "aaa",
                            bindId: "comment"
                        }
                    };
                    __alloyId21.push(__alloyId25);
                    return __alloyId21;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "30dp"
                }
            };
            __alloyId7.push(__alloyId20);
            return __alloyId7;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId3 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId4
    };
    __alloyId2["comment"] = __alloyId3;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId2,
        id: "comment_list",
        defaultItemTemplate: "comment"
    });
    $.__views.post_all_comments.add($.__views.comment_list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.post_all_comments.addEventListener("open", function() {
        var post = Alloy.Globals.post;
        updateUserPost(post);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;