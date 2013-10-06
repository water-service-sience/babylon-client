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
    var __alloyId11 = {};
    var __alloyId14 = [];
    var __alloyId16 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId17 = [];
            var __alloyId19 = {
                type: "Ti.UI.ImageView",
                bindId: "thumbnail",
                properties: {
                    width: "100dp",
                    height: "100dp",
                    bindId: "thumbnail"
                }
            };
            __alloyId17.push(__alloyId19);
            var __alloyId21 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId22 = [];
                    var __alloyId24 = {
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
                    __alloyId22.push(__alloyId24);
                    var __alloyId26 = {
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
                    __alloyId22.push(__alloyId26);
                    return __alloyId22;
                }(),
                properties: {
                    layout: "vertical"
                }
            };
            __alloyId17.push(__alloyId21);
            return __alloyId17;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId14.push(__alloyId16);
    var __alloyId13 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId14
    };
    __alloyId11["template"] = __alloyId13;
    var __alloyId27 = [];
    $.__views.__alloyId28 = Ti.UI.createListSection({
        headerTitle: "投稿一覧",
        id: "__alloyId28"
    });
    __alloyId27.push($.__views.__alloyId28);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        sections: __alloyId27,
        templates: __alloyId11,
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