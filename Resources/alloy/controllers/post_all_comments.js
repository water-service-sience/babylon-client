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
    $.__views.__alloyId24 = Ti.UI.createView({
        layout: "horizontal",
        height: "30dp",
        id: "__alloyId24"
    });
    $.__views.post_all_comments.add($.__views.__alloyId24);
    $.__views.comment = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "comment"
    });
    $.__views.__alloyId24.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        height: "38dp",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId24.add($.__views.send_comment);
    var __alloyId25 = {};
    var __alloyId27 = [];
    var __alloyId29 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId30 = [];
            var __alloyId32 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId33 = [];
                    var __alloyId35 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "名前"
                        }
                    };
                    __alloyId33.push(__alloyId35);
                    var __alloyId37 = {
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
                    __alloyId33.push(__alloyId37);
                    var __alloyId39 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "書き込み"
                        }
                    };
                    __alloyId33.push(__alloyId39);
                    var __alloyId41 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId33.push(__alloyId41);
                    return __alloyId33;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "30dp"
                }
            };
            __alloyId30.push(__alloyId32);
            var __alloyId43 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId44 = [];
                    var __alloyId46 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "コメント"
                        }
                    };
                    __alloyId44.push(__alloyId46);
                    var __alloyId48 = {
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
                    __alloyId44.push(__alloyId48);
                    return __alloyId44;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "30dp"
                }
            };
            __alloyId30.push(__alloyId43);
            return __alloyId30;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId27.push(__alloyId29);
    var __alloyId26 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId27
    };
    __alloyId25["comment"] = __alloyId26;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId25,
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