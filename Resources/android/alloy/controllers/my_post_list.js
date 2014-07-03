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
    var __alloyId51 = {};
    var __alloyId54 = [];
    var __alloyId56 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId57 = [];
            var __alloyId59 = {
                type: "Ti.UI.ImageView",
                bindId: "thumbnail",
                properties: {
                    width: "100dp",
                    height: "100dp",
                    bindId: "thumbnail"
                }
            };
            __alloyId57.push(__alloyId59);
            var __alloyId61 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId62 = [];
                    var __alloyId64 = {
                        type: "Ti.UI.Label",
                        bindId: "date",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            color: "#000",
                            bindId: "date"
                        }
                    };
                    __alloyId62.push(__alloyId64);
                    var __alloyId66 = {
                        type: "Ti.UI.Label",
                        bindId: "category",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "18dp"
                            },
                            height: "24dp",
                            left: "5dp",
                            color: "#000",
                            bindId: "category"
                        }
                    };
                    __alloyId62.push(__alloyId66);
                    return __alloyId62;
                }(),
                properties: {
                    layout: "vertical",
                    width: "auto"
                }
            };
            __alloyId57.push(__alloyId61);
            return __alloyId57;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId54.push(__alloyId56);
    var __alloyId53 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId54
    };
    __alloyId51["template"] = __alloyId53;
    $.__views.__alloyId67 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId67"
    });
    var __alloyId69 = [];
    __alloyId69.push($.__views.__alloyId67);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        sections: __alloyId69,
        templates: __alloyId51,
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