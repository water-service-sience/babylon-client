function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.post_detail = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "post_detail"
    });
    $.__views.post_detail && $.addTopLevelView($.__views.post_detail);
    $.__views.scroll_view = Ti.UI.createScrollView({
        id: "scroll_view"
    });
    $.__views.post_detail.add($.__views.scroll_view);
    $.__views.photo = Ti.UI.createImageView({
        top: "3%",
        width: "94%",
        height: "50%",
        id: "photo"
    });
    $.__views.scroll_view.add($.__views.photo);
    $.__views.date = Ti.UI.createLabel({
        top: "55%",
        left: "5%",
        width: "40%",
        text: "2013年6月23日",
        id: "date"
    });
    $.__views.scroll_view.add($.__views.date);
    $.__views.goodness_label = Ti.UI.createLabel({
        top: "55%",
        left: "50%",
        width: "10%",
        font: {
            fontSize: "13dp",
            fontWeight: "bold"
        },
        text: "評価",
        id: "goodness_label"
    });
    $.__views.scroll_view.add($.__views.goodness_label);
    $.__views.goodness = Ti.UI.createLabel({
        top: "55%",
        left: "60%",
        width: "40%",
        text: "良い",
        id: "goodness"
    });
    $.__views.scroll_view.add($.__views.goodness);
    $.__views.water_height_label = Ti.UI.createLabel({
        top: "62%",
        left: "5%",
        width: "30%",
        text: "水位",
        id: "water_height_label"
    });
    $.__views.scroll_view.add($.__views.water_height_label);
    $.__views.water_height = Ti.UI.createLabel({
        top: "62%",
        left: "40%",
        width: "40%",
        textAlign: "left",
        text: "22センチ",
        id: "water_height"
    });
    $.__views.scroll_view.add($.__views.water_height);
    $.__views.comment = Ti.UI.createTextField({
        top: "70%",
        height: "20%",
        width: "100%",
        backgroundColor: "white",
        id: "comment"
    });
    $.__views.scroll_view.add($.__views.comment);
    $.__views.send_comment = Ti.UI.createButton({
        top: "90%",
        width: "50%",
        title: "コメントする",
        id: "send_comment"
    });
    $.__views.scroll_view.add($.__views.send_comment);
    $.__views.from_admin = Ti.UI.createButton({
        top: "110%",
        width: "80%",
        title: "管理者からの返信を見る",
        id: "from_admin"
    });
    $.__views.scroll_view.add($.__views.from_admin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.post_detail.addEventListener("open", function() {
        Alloy.Globals.post && ($.photo.image = Alloy.Globals.post.image);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;