function Controller() {
    function updateMessageList() {
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
    }
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
    $.__views.__alloyId100 = Ti.UI.createView({
        height: "50dp",
        layout: "horizontal",
        id: "__alloyId100"
    });
    $.__views.post_messages.add($.__views.__alloyId100);
    $.__views.send_message = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "80%",
        height: "100%",
        id: "send_message"
    });
    $.__views.__alloyId100.add($.__views.send_message);
    $.__views.send_message_button = Ti.UI.createButton({
        font: {
            fontSize: "24dp"
        },
        height: "36dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "auto",
        right: "auto",
        color: "#000",
        title: "送信",
        id: "send_message_button"
    });
    $.__views.__alloyId100.add($.__views.send_message_button);
    var __alloyId101 = {};
    var __alloyId104 = [];
    var __alloyId106 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId107 = [];
            var __alloyId109 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId110 = [];
                    var __alloyId112 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "送信者:"
                        }
                    };
                    __alloyId110.push(__alloyId112);
                    var __alloyId114 = {
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
                    __alloyId110.push(__alloyId114);
                    var __alloyId116 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "投稿日:"
                        }
                    };
                    __alloyId110.push(__alloyId116);
                    var __alloyId118 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            right: 0,
                            text: "8/9 17:00",
                            bindId: "date"
                        }
                    };
                    __alloyId110.push(__alloyId118);
                    return __alloyId110;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId107.push(__alloyId109);
            var __alloyId120 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId121 = [];
                    var __alloyId123 = {
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
                    __alloyId121.push(__alloyId123);
                    var __alloyId125 = {
                        type: "Ti.UI.Label",
                        bindId: "message",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            color: "#000",
                            text: "aaa",
                            bindId: "message"
                        }
                    };
                    __alloyId121.push(__alloyId125);
                    return __alloyId121;
                }(),
                properties: {
                    height: "50dp",
                    layout: "horizontal",
                    bottom: 0
                }
            };
            __alloyId107.push(__alloyId120);
            return __alloyId107;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId104.push(__alloyId106);
    var __alloyId103 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId104
    };
    __alloyId101["template"] = __alloyId103;
    $.__views.messages = Ti.UI.createListView({
        templates: __alloyId101,
        id: "messages",
        defaultItemTemplate: "template"
    });
    $.__views.post_messages.add($.__views.messages);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var util = Alloy.Globals.util;
    var api = Alloy.Globals.api;
    var args = arguments[0] || {};
    var post = args.post || Alloy.Globals.post;
    $.post_messages.addEventListener("open", function() {
        api.client.userId;
        $.send_message_button.addEventListener("click", function() {
            var message = $.send_message.value;
            api.postManager.sendMessage(post.id, message, function(e) {
                post = e;
                updateMessageList();
            });
        });
        0 == post.privateMessages.length ? api.postManager.getPost(post.id, function(p) {
            post = p;
            updateMessageList();
        }) : updateMessageList();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;