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
    $.__views.__alloyId110 = Ti.UI.createView({
        height: "50dp",
        layout: "horizontal",
        id: "__alloyId110"
    });
    $.__views.post_messages.add($.__views.__alloyId110);
    $.__views.send_message = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "80%",
        height: "100%",
        id: "send_message"
    });
    $.__views.__alloyId110.add($.__views.send_message);
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
        width: "95%",
        title: "送信",
        id: "send_message_button"
    });
    $.__views.__alloyId110.add($.__views.send_message_button);
    var __alloyId111 = {};
    var __alloyId114 = [];
    var __alloyId116 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId117 = [];
            var __alloyId119 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId120 = [];
                    var __alloyId122 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            text: "送信者:"
                        }
                    };
                    __alloyId120.push(__alloyId122);
                    var __alloyId124 = {
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
                    __alloyId120.push(__alloyId124);
                    var __alloyId126 = {
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
                    __alloyId120.push(__alloyId126);
                    var __alloyId128 = {
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
                    __alloyId120.push(__alloyId128);
                    return __alloyId120;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId117.push(__alloyId119);
            var __alloyId130 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId131 = [];
                    var __alloyId133 = {
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
                    __alloyId131.push(__alloyId133);
                    var __alloyId135 = {
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
                    __alloyId131.push(__alloyId135);
                    return __alloyId131;
                }(),
                properties: {
                    height: "50dp",
                    layout: "horizontal",
                    bottom: 0
                }
            };
            __alloyId117.push(__alloyId130);
            return __alloyId117;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId114.push(__alloyId116);
    var __alloyId113 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId114
    };
    __alloyId111["template"] = __alloyId113;
    $.__views.messages = Ti.UI.createListView({
        templates: __alloyId111,
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