function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_messages";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_messages = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#ddddff",
        id: "post_messages"
    });
    $.__views.post_messages && $.addTopLevelView($.__views.post_messages);
    $.__views.__alloyId87 = Ti.UI.createView({
        layout: "horizontal",
        height: "50dp",
        id: "__alloyId87"
    });
    $.__views.post_messages.add($.__views.__alloyId87);
    $.__views.send_message = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "80%",
        height: "100%",
        id: "send_message"
    });
    $.__views.__alloyId87.add($.__views.send_message);
    var __alloyId88 = {};
    var __alloyId91 = [];
    var __alloyId93 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId94 = [];
            var __alloyId96 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId97 = [];
                    var __alloyId99 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "送信:"
                        }
                    };
                    __alloyId97.push(__alloyId99);
                    var __alloyId101 = {
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
                    __alloyId97.push(__alloyId101);
                    var __alloyId103 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "投稿日:"
                        }
                    };
                    __alloyId97.push(__alloyId103);
                    var __alloyId105 = {
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
                    __alloyId97.push(__alloyId105);
                    return __alloyId97;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "30dp"
                }
            };
            __alloyId94.push(__alloyId96);
            var __alloyId107 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId108 = [];
                    var __alloyId110 = {
                        type: "Ti.UI.Label",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "コメント"
                        }
                    };
                    __alloyId108.push(__alloyId110);
                    var __alloyId112 = {
                        type: "Ti.UI.Label",
                        bindId: "message",
                        properties: {
                            font: {
                                fontSize: "18dp"
                            },
                            text: "aaa",
                            bindId: "message"
                        }
                    };
                    __alloyId108.push(__alloyId112);
                    return __alloyId108;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "50dp",
                    bottom: 0
                }
            };
            __alloyId94.push(__alloyId107);
            return __alloyId94;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId91.push(__alloyId93);
    var __alloyId90 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId91
    };
    __alloyId88["template"] = __alloyId90;
    $.__views.messages = Ti.UI.createListView({
        templates: __alloyId88,
        id: "messages",
        defaultItemTemplate: "template"
    });
    $.__views.post_messages.add($.__views.messages);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var util = Alloy.Globals.util;
    var api = Alloy.Globals.api;
    $.post_messages.addEventListener("open", function() {
        var post = Alloy.Globals.post;
        var userId = api.client.userId;
        var messageSection = Ti.UI.createListSection({
            headerTitle: "メッセージ"
        });
        var messageDataSet = [];
        for (var i in post.privateMessages) {
            var c = post.privateMessages[i];
            var nickname = "no name";
            c.sender && (nickname = userId == c.sender.id ? "あなた" : c.sender.nickname);
            messageDataSet.push({
                properties: {
                    height: "105dp"
                },
                nickname: {
                    text: nickname
                },
                message: {
                    text: c.message
                },
                date: {
                    text: util.dateToString(c.sent)
                }
            });
            messageSection.setItems(messageDataSet);
            $.messages.setSections([ messageSection ]);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;