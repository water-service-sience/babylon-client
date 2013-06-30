function Controller() {
    function onPostSelected(e) {
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
        view.setPostAt(e.itemIndex);
        Alloy.Globals.post = Alloy.Globals.api.postManager.myPosts[e.itemIndex];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.my_post_list = Ti.UI.createWindow({
        backgroundColor: "#ddddff",
        id: "my_post_list"
    });
    $.__views.my_post_list && $.addTopLevelView($.__views.my_post_list);
    $.__views.my_posts = Ti.UI.createListView({
        top: "0%",
        width: "100%",
        bottom: "5%",
        id: "my_posts"
    });
    $.__views.my_post_list.add($.__views.my_posts);
    onPostSelected ? $.__views.my_posts.addEventListener("itemclick", onPostSelected) : __defers["$.__views.my_posts!itemclick!onPostSelected"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.my_post_list.addEventListener("open", function() {
        Alloy.Globals.api.postManager.getMyPosts(function(posts) {
            var dataSet = [];
            for (var i in posts) {
                var l = posts[i];
                dataSet.push({
                    properties: l
                });
            }
            var section = Ti.UI.createListSection({
                headerTitle: "過去の投稿"
            });
            section.setItems(dataSet);
            $.my_posts.sections = [ section ];
        });
    });
    __defers["$.__views.my_posts!itemclick!onPostSelected"] && $.__views.my_posts.addEventListener("itemclick", onPostSelected);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;