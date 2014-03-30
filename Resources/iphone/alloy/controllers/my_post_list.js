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
    var __alloyId45 = {};
    var __alloyId48 = [];
    var __alloyId50 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId51 = [];
            var __alloyId53 = {
                type: "Ti.UI.ImageView",
                bindId: "thumbnail",
                properties: {
                    width: "100dp",
                    height: "100dp",
                    bindId: "thumbnail"
                }
            };
            __alloyId51.push(__alloyId53);
            var __alloyId55 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId56 = [];
                    var __alloyId58 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            bindId: "date"
                        }
                    };
                    __alloyId56.push(__alloyId58);
                    var __alloyId60 = {
                        type: "Ti.UI.Label",
                        bindId: "category",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            bindId: "category"
                        }
                    };
                    __alloyId56.push(__alloyId60);
                    return __alloyId56;
                }(),
                properties: {
                    layout: "vertical"
                }
            };
            __alloyId51.push(__alloyId55);
            return __alloyId51;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId48.push(__alloyId50);
    var __alloyId47 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId48
    };
    __alloyId45["template"] = __alloyId47;
    $.__views.__alloyId61 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId61"
    });
    var __alloyId63 = [];
    __alloyId63.push($.__views.__alloyId61);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        sections: __alloyId63,
        templates: __alloyId45,
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