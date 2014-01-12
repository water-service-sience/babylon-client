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
    $.__views.__alloyId53 = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "__alloyId53"
    });
    $.__views.post_all_comments.add($.__views.__alloyId53);
    $.__views.comment = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "comment"
    });
    $.__views.__alloyId53.add($.__views.comment);
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
        left: "10dp",
        right: "10dp",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId53.add($.__views.send_comment);
    var __alloyId54 = {};
    var __alloyId56 = [];
    var __alloyId58 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId59 = [];
            var __alloyId61 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId62 = [];
                    var __alloyId64 = {
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
                    __alloyId62.push(__alloyId64);
                    var __alloyId66 = {
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
                    __alloyId62.push(__alloyId66);
                    var __alloyId68 = {
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
                    __alloyId62.push(__alloyId68);
                    var __alloyId70 = {
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
                    __alloyId62.push(__alloyId70);
                    return __alloyId62;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId59.push(__alloyId61);
            var __alloyId72 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId73 = [];
                    var __alloyId75 = {
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
                    __alloyId73.push(__alloyId75);
                    var __alloyId77 = {
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
                    __alloyId73.push(__alloyId77);
                    return __alloyId73;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId59.push(__alloyId72);
            return __alloyId59;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId56.push(__alloyId58);
    var __alloyId55 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId56
    };
    __alloyId54["comment"] = __alloyId55;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId54,
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