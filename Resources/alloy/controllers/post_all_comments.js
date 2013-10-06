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
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "post_all_comments"
    });
    $.__views.post_all_comments && $.addTopLevelView($.__views.post_all_comments);
    $.__views.__alloyId30 = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "__alloyId30"
    });
    $.__views.post_all_comments.add($.__views.__alloyId30);
    $.__views.comment = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "comment"
    });
    $.__views.__alloyId30.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        left: "10dp",
        right: "10dp",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId30.add($.__views.send_comment);
    var __alloyId31 = {};
    var __alloyId33 = [];
    var __alloyId35 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId36 = [];
            var __alloyId38 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId39 = [];
                    var __alloyId41 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "名前"
                        }
                    };
                    __alloyId39.push(__alloyId41);
                    var __alloyId43 = {
                        type: "Ti.UI.Label",
                        bindId: "nickname",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "aaa",
                            bindId: "nickname"
                        }
                    };
                    __alloyId39.push(__alloyId43);
                    var __alloyId45 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "書き込み"
                        }
                    };
                    __alloyId39.push(__alloyId45);
                    var __alloyId47 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId39.push(__alloyId47);
                    return __alloyId39;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId36.push(__alloyId38);
            var __alloyId49 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId50 = [];
                    var __alloyId52 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "コメント"
                        }
                    };
                    __alloyId50.push(__alloyId52);
                    var __alloyId54 = {
                        type: "Ti.UI.Label",
                        bindId: "comment",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "aaa",
                            bindId: "comment"
                        }
                    };
                    __alloyId50.push(__alloyId54);
                    return __alloyId50;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId36.push(__alloyId49);
            return __alloyId36;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId33.push(__alloyId35);
    var __alloyId32 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId33
    };
    __alloyId31["comment"] = __alloyId32;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId31,
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