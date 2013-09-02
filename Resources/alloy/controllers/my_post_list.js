function Controller() {
    function onPostSelected(e) {
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
        view.setPostAt(e.itemIndex);
        Alloy.Globals.post = Alloy.Globals.api.postManager.myPosts[e.itemIndex];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "my_post_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.my_post_list = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "my_post_list"
    });
    $.__views.my_post_list && $.addTopLevelView($.__views.my_post_list);
    var __alloyId11 = {};
    var __alloyId14 = [];
    var __alloyId16 = {
        type: "Ti.UI.ImageView",
        bindId: "thumbnail",
        properties: {
            bindId: "thumbnail"
        }
    };
    __alloyId14.push(__alloyId16);
    var __alloyId18 = {
        type: "Ti.UI.Label",
        bindId: "date",
        properties: {
            font: {
                fontSize: "18dp"
            },
            bindId: "date"
        }
    };
    __alloyId14.push(__alloyId18);
    var __alloyId20 = {
        type: "Ti.UI.Label",
        bindId: "explanation",
        properties: {
            font: {
                fontSize: "18dp"
            },
            bindId: "explanation"
        }
    };
    __alloyId14.push(__alloyId20);
    var __alloyId13 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId14
    };
    __alloyId11["template"] = __alloyId13;
    var __alloyId21 = [];
    $.__views.__alloyId22 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId22"
    });
    __alloyId21.push($.__views.__alloyId22);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        sections: __alloyId21,
        templates: __alloyId11,
        id: "my_posts",
        defaultItemTemplate: "template"
    });
    $.__views.my_post_list.add($.__views.my_posts);
    onPostSelected ? $.__views.my_posts.addEventListener("itemclick", onPostSelected) : __defers["$.__views.my_posts!itemclick!onPostSelected"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("calendar");
    $.my_post_list.addEventListener("open", function() {
        Alloy.Globals.api.postManager.getMyPosts(0, 0, function(posts) {
            var dataSet = [];
            for (var i in posts) {
                var l = posts[i];
                dataSet.push({
                    properties: l
                });
            }
            $.my_posts.sections[0].setItems(dataSet);
        });
    });
    __defers["$.__views.my_posts!itemclick!onPostSelected"] && $.__views.my_posts.addEventListener("itemclick", onPostSelected);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;