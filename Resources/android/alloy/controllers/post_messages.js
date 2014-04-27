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
    $.__views.__alloyId109 = Ti.UI.createView({
        height: "50dp",
        layout: "horizontal",
        id: "__alloyId109"
    });
    $.__views.post_messages.add($.__views.__alloyId109);
    $.__views.send_message = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#000",
        width: "80%",
        height: "100%",
        id: "send_message"
    });
    $.__views.__alloyId109.add($.__views.send_message);
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
        color: "#000",
        title: "送信",
        id: "send_message_button"
    });
    $.__views.__alloyId109.add($.__views.send_message_button);
    var __alloyId110 = {};
    var __alloyId113 = [];
    var __alloyId115 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId116 = [];
            var __alloyId118 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId119 = [];
                    var __alloyId121 = {
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
                    __alloyId119.push(__alloyId121);
                    var __alloyId123 = {
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
                    __alloyId119.push(__alloyId123);
                    var __alloyId125 = {
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
                    __alloyId119.push(__alloyId125);
                    var __alloyId127 = {
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
                    __alloyId119.push(__alloyId127);
                    return __alloyId119;
                }(),
                properties: {
                    height: "30dp",
                    layout: "horizontal"
                }
            };
            __alloyId116.push(__alloyId118);
            var __alloyId129 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId130 = [];
                    var __alloyId132 = {
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
                    __alloyId130.push(__alloyId132);
                    var __alloyId134 = {
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
                    __alloyId130.push(__alloyId134);
                    return __alloyId130;
                }(),
                properties: {
                    height: "50dp",
                    layout: "horizontal",
                    bottom: 0
                }
            };
            __alloyId116.push(__alloyId129);
            return __alloyId116;
        }(),
        properties: {
            layout: "vertical"
        }
    };
    __alloyId113.push(__alloyId115);
    var __alloyId112 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId113
    };
    __alloyId110["template"] = __alloyId112;
    $.__views.messages = Ti.UI.createListView({
        templates: __alloyId110,
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