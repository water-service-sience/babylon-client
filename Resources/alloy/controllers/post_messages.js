function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_messages";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_messages = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        layout: "vertical",
        id: "post_messages"
    });
    $.__views.post_messages && $.addTopLevelView($.__views.post_messages);
    $.__views.__alloyId91 = Ti.UI.createView({
        height: "50dp",
        layout: "horizontal",
        id: "__alloyId91"
    });
    $.__views.post_messages.add($.__views.__alloyId91);
    $.__views.send_message = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "80%",
        height: "100%",
        id: "send_message"
    });
    $.__views.__alloyId91.add($.__views.send_message);
    var __alloyId92 = {};
    var __alloyId95 = [];
    var __alloyId97 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId98 = [];
            var __alloyId100 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId101 = [];
                    var __alloyId103 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "送信:"
                        }
                    };
                    __alloyId101.push(__alloyId103);
                    var __alloyId105 = {
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
                    __alloyId101.push(__alloyId105);
                    var __alloyId107 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "投稿日:"
                        }
                    };
                    __alloyId101.push(__alloyId107);
                    var __alloyId109 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            right: 0,
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId101.push(__alloyId109);
                    return __alloyId101;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId98.push(__alloyId100);
            var __alloyId111 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId112 = [];
                    var __alloyId114 = {
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
                    __alloyId112.push(__alloyId114);
                    var __alloyId116 = {
                        type: "Ti.UI.Label",
                        bindId: "message",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "aaa",
                            bindId: "message"
                        }
                    };
                    __alloyId112.push(__alloyId116);
                    return __alloyId112;
                }(),
                properties: {
                    height: "50dp",
                    layout: "horizontal",
                    bottom: 0
                }
            };
            __alloyId98.push(__alloyId111);
            return __alloyId98;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId95.push(__alloyId97);
    var __alloyId94 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId95
    };
    __alloyId92["template"] = __alloyId94;
    $.__views.messages = Ti.UI.createListView({
        templates: __alloyId92,
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