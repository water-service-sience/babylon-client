function Controller() {
    function mapClicked(e) {
        var anno = e.annotation;
        Alloy.Globals.post = anno.post;
        var controller = Alloy.createController("post_detail");
        var view = controller.getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.post_map = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "post_map"
    });
    $.__views.post_map && $.addTopLevelView($.__views.post_map);
    var __alloyId1 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId1,
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
            var annotations = [];
            for (var i in posts) {
                var d = posts[i];
                var anno = Titanium.Map.createAnnotation({
                    latitude: d.lat,
                    longitude: d.lon,
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