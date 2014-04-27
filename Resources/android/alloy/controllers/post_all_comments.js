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
    $.__views.__alloyId66 = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "__alloyId66"
    });
    $.__views.post_all_comments.add($.__views.__alloyId66);
    $.__views.comment = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#000",
        id: "comment"
    });
    $.__views.__alloyId66.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "95%",
        color: "#000",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId66.add($.__views.send_comment);
    var __alloyId67 = {};
    var __alloyId69 = [];
    var __alloyId71 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId72 = [];
            var __alloyId74 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId75 = [];
                    var __alloyId77 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "名前"
                        }
                    };
                    __alloyId75.push(__alloyId77);
                    var __alloyId79 = {
                        type: "Ti.UI.Label",
                        bindId: "nickname",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "aaa",
                            bindId: "nickname"
                        }
                    };
                    __alloyId75.push(__alloyId79);
                    var __alloyId81 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "書き込み"
                        }
                    };
                    __alloyId75.push(__alloyId81);
                    var __alloyId83 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId75.push(__alloyId83);
                    return __alloyId75;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId72.push(__alloyId74);
            var __alloyId85 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId86 = [];
                    var __alloyId88 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "コメント"
                        }
                    };
                    __alloyId86.push(__alloyId88);
                    var __alloyId90 = {
                        type: "Ti.UI.Label",
                        bindId: "comment",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "aaa",
                            bindId: "comment"
                        }
                    };
                    __alloyId86.push(__alloyId90);
                    return __alloyId86;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId72.push(__alloyId85);
            return __alloyId72;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId69.push(__alloyId71);
    var __alloyId68 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId69
    };
    __alloyId67["comment"] = __alloyId68;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId67,
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