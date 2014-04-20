function Controller() {
    function onSelectEvaluation() {
        var view = Alloy.createController("select_evaluation", {
            selectCallback: function(c) {
                $.total_eval.text = c.label;
                evaluation = c.value;
            }
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSendClicked() {
        Alloy.Globals.api.questionnaireManager.postQuestionnaire(evaluation, $.note.value, function() {
            alert("回答ありがとうございました。");
            Alloy.Globals.naviCon.pop();
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
    $.__views.__alloyId143 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId143"
    });
    $.__views.questionnaire.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "総合評価 :",
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.total_eval = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "未回答",
        id: "total_eval"
    });
    $.__views.__alloyId143.add($.__views.total_eval);
    $.__views.select_eval = Ti.UI.createButton({
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
        title: "選択",
        id: "select_eval"
    });
    $.__views.__alloyId143.add($.__views.select_eval);
    onSelectEvaluation ? $.__views.select_eval.addEventListener("click", onSelectEvaluation) : __defers["$.__views.select_eval!click!onSelectEvaluation"] = true;
    $.__views.__alloyId145 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId145"
    });
    $.__views.questionnaire.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "備考欄",
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.note = Ti.UI.createTextArea({
        width: "98%",
        height: "150dp",
        font: {
            fontSize: "24dp"
        },
        borderRadius: 5,
        left: "5dp",
        right: "5dp",
        suppressReturn: "false",
        id: "note"
    });
    $.__views.questionnaire.add($.__views.note);
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
        title: "送信",
        id: "send"
    });
    $.__views.questionnaire.add($.__views.send);
    onSendClicked ? $.__views.send.addEventListener("click", onSendClicked) : __defers["$.__views.send!click!onSendClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var evaluation = 0;
    __defers["$.__views.select_eval!click!onSelectEvaluation"] && $.__views.select_eval.addEventListener("click", onSelectEvaluation);
    __defers["$.__views.send!click!onSendClicked"] && $.__views.send.addEventListener("click", onSendClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;