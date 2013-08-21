function Controller() {
    function mapClicked(e) {
        e.annotation;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "post_map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_map = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "post_map"
    });
    $.__views.post_map && $.addTopLevelView($.__views.post_map);
    var __alloyId58 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId58,
        id: "map",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.post_map.add($.__views.map);
    mapClicked ? $.__views.map.addEventListener("click", mapClicked) : __defers["$.__views.map!click!mapClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.post_map.addEventListener("open", function() {
        var post = Alloy.Globals.post;
        var lat = post.latitude;
        var lon = post.longitude;
        $.map.setLocation({
            latitude: lat,
            longitude: lon,
            animate: false,
            latitudeDelta: .04,
            longitudeDelta: .04
        });
        var annotations = [];
        var anno = Titanium.Map.createAnnotation({
            latitude: lat,
            longitude: lon,
            title: post.title,
            pincolor: Titanium.Map.ANNOTATION_RED,
            animate: true,
            post: post
        });
        annotations.push(anno);
        Alloy.Globals.api.postManager.getNearPosts(lat, lon, function(posts) {
            Ti.API.debug("Near posts are " + posts);
            for (var i in posts) {
                var d = posts[i];
                if (d.id != post.id) {
                    var pincolor = 0;
                    pincolor = d.userId == api.userId ? Titanium.Map.ANNOTATION_BLUE : Titanium.Map.ANNOTATION_GREEN;
                    var anno = Titanium.Map.createAnnotation({
                        latitude: d.latitude,
                        longitude: d.longitude,
                        title: d.title,
                        pincolor: pincolor,
                        animate: true,
                        post: d
                    });
                    annotations.push(anno);
                }
            }
            $.map.annotations = annotations;
        });
    });
    __defers["$.__views.map!click!mapClicked"] && $.__views.map.addEventListener("click", mapClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;