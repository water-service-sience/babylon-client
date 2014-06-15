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
    $.__views.__alloyId67 = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "__alloyId67"
    });
    $.__views.post_all_comments.add($.__views.__alloyId67);
    $.__views.comment = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "comment"
    });
    $.__views.__alloyId67.add($.__views.comment);
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
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.__alloyId67.add($.__views.send_comment);
    var __alloyId68 = {};
    var __alloyId70 = [];
    var __alloyId72 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId73 = [];
            var __alloyId75 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId76 = [];
                    var __alloyId78 = {
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
                    __alloyId76.push(__alloyId78);
                    var __alloyId80 = {
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
                    __alloyId76.push(__alloyId80);
                    var __alloyId82 = {
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
                    __alloyId76.push(__alloyId82);
                    var __alloyId84 = {
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
                    __alloyId76.push(__alloyId84);
                    return __alloyId76;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId73.push(__alloyId75);
            var __alloyId86 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId87 = [];
                    var __alloyId89 = {
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
                    __alloyId87.push(__alloyId89);
                    var __alloyId91 = {
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
                    __alloyId87.push(__alloyId91);
                    return __alloyId87;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId73.push(__alloyId86);
            return __alloyId73;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId70.push(__alloyId72);
    var __alloyId69 = {
        properties: {
            name: "comment"
        },
        childTemplates: __alloyId70
    };
    __alloyId68["comment"] = __alloyId69;
    $.__views.comment_list = Ti.UI.createListView({
        layout: "vertical",
        bottom: 0,
        templates: __alloyId68,
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