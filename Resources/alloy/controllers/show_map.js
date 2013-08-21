function Controller() {
    function mapClicked(e) {
        var anno = e.annotation;
        Alloy.Globals.post = anno.post;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "show_map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.show_map = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "show_map"
    });
    $.__views.show_map && $.addTopLevelView($.__views.show_map);
    var __alloyId59 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId59,
        id: "map",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.show_map.add($.__views.map);
    mapClicked ? $.__views.map.addEventListener("click", mapClicked) : __defers["$.__views.map!click!mapClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.post_map.addEventListener("open", function() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
        });
        Alloy.Globals.api.postManager.getNearByPosts(function(posts) {
            Ti.API.debug("Near posts are " + posts);
            var annotations = [];
            for (var i in posts) {
                var d = posts[i];
                var anno = Titanium.Map.createAnnotation({
                    latitude: d.latitude,
                    longitude: d.longitude,
                    title: d.title,
                    pincolor: Titanium.Map.ANNOTATION_RED,
                    animate: true,
                    post: d
                });
                annotations.push(anno);
            }
            $.map.annotations = annotations;
        });
    });
    __defers["$.__views.map!click!mapClicked"] && $.__views.map.addEventListener("click", mapClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;