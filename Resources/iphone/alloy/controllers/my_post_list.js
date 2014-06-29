function Controller() {
    function onPostSelected(e) {
        var item = e.section.getItemAt(e.itemIndex);
        Alloy.Globals.post = item.post;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
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
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "my_post_list"
    });
    $.__views.my_post_list && $.addTopLevelView($.__views.my_post_list);
    var __alloyId48 = {};
    var __alloyId51 = [];
    var __alloyId53 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId54 = [];
            var __alloyId56 = {
                type: "Ti.UI.ImageView",
                bindId: "thumbnail",
                properties: {
                    width: "100dp",
                    height: "100dp",
                    bindId: "thumbnail"
                }
            };
            __alloyId54.push(__alloyId56);
            var __alloyId58 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId59 = [];
                    var __alloyId61 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            bindId: "date"
                        }
                    };
                    __alloyId59.push(__alloyId61);
                    var __alloyId63 = {
                        type: "Ti.UI.Label",
                        bindId: "category",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            bindId: "category"
                        }
                    };
                    __alloyId59.push(__alloyId63);
                    return __alloyId59;
                }(),
                properties: {
                    layout: "vertical",
                    width: "auto"
                }
            };
            __alloyId54.push(__alloyId58);
            return __alloyId54;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId51.push(__alloyId53);
    var __alloyId50 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId51
    };
    __alloyId48["template"] = __alloyId50;
    $.__views.__alloyId64 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId64"
    });
    var __alloyId66 = [];
    __alloyId66.push($.__views.__alloyId64);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        sections: __alloyId66,
        templates: __alloyId48,
        id: "my_posts",
        defaultItemTemplate: "template"
    });
    $.__views.my_post_list.add($.__views.my_posts);
    onPostSelected ? $.__views.my_posts.addEventListener("itemclick", onPostSelected) : __defers["$.__views.my_posts!itemclick!onPostSelected"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var util = Alloy.Globals.util;
    $.my_post_list.addEventListener("open", function() {
        Alloy.Globals.api.postManager.getMyPosts(0, 0, function(posts) {
            var dataSet = [];
            for (var i in posts) {
                var p = posts[i];
                dataSet.push({
                    properties: {
                        height: "105dp"
                    },
                    post: p,
                    thumbnail: {
                        image: api.toImageUrl(p)
                    },
                    date: {
                        text: util.dateToString(p.posted)
                    },
                    category: {
                        text: p.category.label
                    }
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