function Controller() {
    function onSaveClicked() {
        var param = {
            postId: postData.postId,
            comment: $.comment.value
        };
        Alloy.Globals.api.postManager.updatePost(param, function() {
            Alloy.Globals.lastPost = null;
            Alloy.Globals.naviCon.home();
        });
    }
    function onReturnClicked() {
        Alloy.Globals.lastPost = null;
        Alloy.Globals.naviCon.home();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "finish_post";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.finish_post = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        layout: "vertical",
        id: "finish_post"
    });
    $.__views.finish_post && $.addTopLevelView($.__views.finish_post);
    $.__views.title = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        top: "2%",
        text: "投稿ありがとうございます",
        id: "title"
    });
    $.__views.finish_post.add($.__views.title);
    $.__views.subtitle = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        top: "10%",
        text: "追加情報の編集",
        id: "subtitle"
    });
    $.__views.finish_post.add($.__views.subtitle);
    $.__views.comment = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        left: "5%",
        top: "35%",
        width: "90%",
        height: "40%",
        backgroundColor: "white",
        id: "comment"
    });
    $.__views.finish_post.add($.__views.comment);
    $.__views.save_button = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "60%",
        top: "80%",
        left: "5%",
        title: "追加情報を送信",
        id: "save_button"
    });
    $.__views.finish_post.add($.__views.save_button);
    onSaveClicked ? $.__views.save_button.addEventListener("click", onSaveClicked) : __defers["$.__views.save_button!click!onSaveClicked"] = true;
    $.__views.return_button = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "25%",
        top: "80%",
        left: "70%",
        title: "戻る",
        id: "return_button"
    });
    $.__views.finish_post.add($.__views.return_button);
    onReturnClicked ? $.__views.return_button.addEventListener("click", onReturnClicked) : __defers["$.__views.return_button!click!onReturnClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var postData = null;
    $.finish_post.addEventListener("open", function() {
        postData = Alloy.Globals.lastPost;
    });
    __defers["$.__views.save_button!click!onSaveClicked"] && $.__views.save_button.addEventListener("click", onSaveClicked);
    __defers["$.__views.return_button!click!onReturnClicked"] && $.__views.return_button.addEventListener("click", onReturnClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;