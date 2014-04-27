function Controller() {
    function selectUseFrequency(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.useFrequency = c.id;
            },
            headerTitle: "このサービスを１週間のうち平均何日使用しましたか？",
            selectItems: useFrequencyList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectEasiness(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.easiness = c.id;
            },
            headerTitle: "このアプリの操作方法はわかりましたか?",
            selectItems: easinessList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectUseForImagePost(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.useForImagePost = c.id;
            },
            headerTitle: "画像投稿サービスは農作業の役に立ちましたか？",
            selectItems: useList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectUseForInquiry(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.useForImageInquiry = c.id;
            },
            headerTitle: "苦情サービスは農作業の役に立ちましたか？",
            selectItems: useList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectUseForFieldMonitoring(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.useForFieldMonitoring = c.id;
            },
            headerTitle: "圃場モニタリングサービスは農作業の役に立ちましたか？",
            selectItems: useList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectWillUse(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.useForFieldMonitoring = c.id;
                if (1 == c.id) {
                    $.costForUse.enabled = false;
                    $.costForUse.title = "回答不要";
                } else {
                    $.costForUse.enabled = true;
                    $.costForUse.title = "未回答";
                }
            },
            headerTitle: "今後、このサービスを継続的に使っていきたいと思いますか？",
            selectItems: willUseList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function selectCostForUse(e) {
        var view = Alloy.createController("select_list", {
            selectCallback: function(c) {
                e.source.title = c.label;
                answers.costForUse = c.id;
            },
            headerTitle: "１０Rあたり、年額いくらまでならこのサービスを使いたいですか?",
            selectItems: costForUseList
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSendClicked() {
        answers.age = parseInt($.age.value);
        answers.freeMessage = $.freeMessage.value;
        Ti.API.debug(JSON.stringify(answers));
        Alloy.Globals.api.questionnaireManager.postQuestionnaire(answers, function() {
            alert("回答ありがとうございました。訂正したい場合は、再度アンケートを送信してください。");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "questionnaire";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.questionnaire = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "questionnaire"
    });
    $.__views.questionnaire && $.addTopLevelView($.__views.questionnaire);
    $.__views.__alloyId143 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId143"
    });
    $.__views.questionnaire.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "33.33333%",
        text: "年齢",
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.age = Ti.UI.createTextField({
        font: {
            fontSize: "20dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#000",
        height: "100%",
        width: "50%",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        id: "age",
        value: "20"
    });
    $.__views.__alloyId144.add($.__views.age);
    $.__views.__alloyId146 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "16.66666%",
        text: "歳",
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId147"
    });
    $.__views.__alloyId143.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "33.33333%",
        text: "Q1.使用頻度",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.useFrequency = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "useFrequency"
    });
    $.__views.__alloyId147.add($.__views.useFrequency);
    selectUseFrequency ? $.__views.useFrequency.addEventListener("click", selectUseFrequency) : __defers["$.__views.useFrequency!click!selectUseFrequency"] = true;
    $.__views.__alloyId149 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId149"
    });
    $.__views.__alloyId143.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "33.33333%",
        text: "Q2.操作性",
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.easiness = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "easiness"
    });
    $.__views.__alloyId149.add($.__views.easiness);
    selectEasiness ? $.__views.easiness.addEventListener("click", selectEasiness) : __defers["$.__views.easiness!click!selectEasiness"] = true;
    $.__views.__alloyId151 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        width: "100%",
        text: "Q3.利便性に関して",
        id: "__alloyId151"
    });
    $.__views.__alloyId143.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId152"
    });
    $.__views.__alloyId143.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createView({
        height: "100%",
        width: "8.333333%",
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "91.666666%",
        text: "Q3-1.画像投稿サービス",
        id: "__alloyId154"
    });
    $.__views.__alloyId152.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId155"
    });
    $.__views.__alloyId143.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
        height: "100%",
        width: "33.33333%",
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    $.__views.useForImagePost = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "useForImagePost"
    });
    $.__views.__alloyId155.add($.__views.useForImagePost);
    selectUseForImagePost ? $.__views.useForImagePost.addEventListener("click", selectUseForImagePost) : __defers["$.__views.useForImagePost!click!selectUseForImagePost"] = true;
    $.__views.__alloyId157 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId157"
    });
    $.__views.__alloyId143.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createView({
        height: "100%",
        width: "8.333333%",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "91.666666%",
        text: "Q3-2.苦情サービス",
        id: "__alloyId159"
    });
    $.__views.__alloyId157.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId160"
    });
    $.__views.__alloyId143.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createView({
        height: "100%",
        width: "33.33333%",
        id: "__alloyId161"
    });
    $.__views.__alloyId160.add($.__views.__alloyId161);
    $.__views.useForInquiry = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "useForInquiry"
    });
    $.__views.__alloyId160.add($.__views.useForInquiry);
    selectUseForInquiry ? $.__views.useForInquiry.addEventListener("click", selectUseForInquiry) : __defers["$.__views.useForInquiry!click!selectUseForInquiry"] = true;
    $.__views.__alloyId162 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId162"
    });
    $.__views.__alloyId143.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createView({
        height: "100%",
        width: "8.333333%",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "91.666666%",
        text: "Q3-3.圃場モニタリング",
        id: "__alloyId164"
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId165"
    });
    $.__views.__alloyId143.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createView({
        height: "100%",
        width: "33.33333%",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.useForFieldMonitoring = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "useForFieldMonitoring"
    });
    $.__views.__alloyId165.add($.__views.useForFieldMonitoring);
    selectUseForFieldMonitoring ? $.__views.useForFieldMonitoring.addEventListener("click", selectUseForFieldMonitoring) : __defers["$.__views.useForFieldMonitoring!click!selectUseForFieldMonitoring"] = true;
    $.__views.__alloyId167 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        width: "100%",
        text: "Q4.サービスの利用に関して",
        id: "__alloyId167"
    });
    $.__views.__alloyId143.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId168"
    });
    $.__views.__alloyId143.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        height: "100%",
        width: "8.333333%",
        id: "__alloyId169"
    });
    $.__views.__alloyId168.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "91.666666%",
        text: "Q4-1.継続利用",
        id: "__alloyId170"
    });
    $.__views.__alloyId168.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId171"
    });
    $.__views.__alloyId143.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        height: "100%",
        width: "33.33333%",
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
    $.__views.willUse = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "willUse"
    });
    $.__views.__alloyId171.add($.__views.willUse);
    selectWillUse ? $.__views.willUse.addEventListener("click", selectWillUse) : __defers["$.__views.willUse!click!selectWillUse"] = true;
    $.__views.__alloyId173 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId173"
    });
    $.__views.__alloyId143.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        height: "100%",
        width: "8.333333%",
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        color: "#000",
        width: "91.666666%",
        text: "Q4-2.利用料金",
        id: "__alloyId175"
    });
    $.__views.__alloyId173.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createView({
        height: "38dp",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId176"
    });
    $.__views.__alloyId143.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
        height: "100%",
        width: "33.33333%",
        id: "__alloyId177"
    });
    $.__views.__alloyId176.add($.__views.__alloyId177);
    $.__views.costForUse = Ti.UI.createButton({
        font: {
            fontSize: "18dp"
        },
        height: "100%",
        backgroundFocusedColor: "#ffffff",
        borderColor: "blue",
        borderWidth: "1dp",
        borderRadius: "5dp",
        backgroundColor: "#ffffff",
        width: "66.666666%",
        color: "#000",
        disabledColor: "#888888",
        title: "未回答",
        id: "costForUse"
    });
    $.__views.__alloyId176.add($.__views.costForUse);
    selectCostForUse ? $.__views.costForUse.addEventListener("click", selectCostForUse) : __defers["$.__views.costForUse!click!selectCostForUse"] = true;
    $.__views.__alloyId178 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        color: "#000",
        width: "100%",
        text: "Q5.ご意見、ご感想",
        id: "__alloyId178"
    });
    $.__views.__alloyId143.add($.__views.__alloyId178);
    $.__views.freeMessage = Ti.UI.createTextArea({
        width: "98%",
        height: "100dp",
        font: {
            fontSize: "20dp"
        },
        borderRadius: 5,
        suppressReturn: "false",
        color: "#000",
        id: "freeMessage"
    });
    $.__views.__alloyId143.add($.__views.freeMessage);
    $.__views.send = Ti.UI.createButton({
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
        disabledColor: "#888888",
        title: "送信",
        id: "send"
    });
    $.__views.__alloyId143.add($.__views.send);
    onSendClicked ? $.__views.send.addEventListener("click", onSendClicked) : __defers["$.__views.send!click!onSendClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var answers = {};
    var useFrequencyList = [ {
        id: 1,
        label: "週に1日"
    }, {
        id: 2,
        label: "週に2日"
    }, {
        id: 3,
        label: "週に3日"
    }, {
        id: 4,
        label: "週に4日"
    }, {
        id: 5,
        label: "週に5日"
    }, {
        id: 6,
        label: "週に6日"
    }, {
        id: 7,
        label: "毎日"
    } ];
    var easinessList = [ {
        id: 4,
        label: "良くわかった"
    }, {
        id: 3,
        label: "だいたいわかった"
    }, {
        id: 2,
        label: "あまりわからなかった"
    }, {
        id: 1,
        label: "ほとんどわからなかった"
    } ];
    var useList = [ {
        id: 4,
        label: "とても役にたった"
    }, {
        id: 3,
        label: "役にたった"
    }, {
        id: 2,
        label: "あまり役に立たなかった"
    }, {
        id: 1,
        label: "全然役に立たなかった"
    } ];
    var willUseList = [ {
        id: 4,
        label: "是非使いたい"
    }, {
        id: 3,
        label: "使いたい"
    }, {
        id: 2,
        label: "使ってもいい"
    }, {
        id: 1,
        label: "使いたくない"
    } ];
    var costForUseList = [ {
        id: 1,
        label: "絶対に無料でないと使わない"
    }, {
        id: 2,
        label: "年額500円以下"
    }, {
        id: 3,
        label: "年額1000円以下"
    }, {
        id: 4,
        label: "年額2000円以下"
    }, {
        id: 5,
        label: "年額5000円以下"
    }, {
        id: 6,
        label: "年額10000円以下"
    }, {
        id: 7,
        label: "年額10000円以上"
    } ];
    __defers["$.__views.useFrequency!click!selectUseFrequency"] && $.__views.useFrequency.addEventListener("click", selectUseFrequency);
    __defers["$.__views.easiness!click!selectEasiness"] && $.__views.easiness.addEventListener("click", selectEasiness);
    __defers["$.__views.useForImagePost!click!selectUseForImagePost"] && $.__views.useForImagePost.addEventListener("click", selectUseForImagePost);
    __defers["$.__views.useForInquiry!click!selectUseForInquiry"] && $.__views.useForInquiry.addEventListener("click", selectUseForInquiry);
    __defers["$.__views.useForFieldMonitoring!click!selectUseForFieldMonitoring"] && $.__views.useForFieldMonitoring.addEventListener("click", selectUseForFieldMonitoring);
    __defers["$.__views.willUse!click!selectWillUse"] && $.__views.willUse.addEventListener("click", selectWillUse);
    __defers["$.__views.costForUse!click!selectCostForUse"] && $.__views.costForUse.addEventListener("click", selectCostForUse);
    __defers["$.__views.send!click!onSendClicked"] && $.__views.send.addEventListener("click", onSendClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;