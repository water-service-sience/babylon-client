function Controller() {
    function mapClicked(e) {
        var anno = e.annotation;
        Ti.API.debug("Anno = " + anno + " : " + anno.post);
        if (null != anno.post) {
            Alloy.Globals.post = anno.post;
            var controller = Alloy.createController("post_detail");
            var view = controller.getView();
            Alloy.Globals.naviCon.open(view);
        }
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
    var __alloyId122 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId122,
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
    var util = Alloy.Globals.util;
    $.show_map.addEventListener("open", function() {
        var annotations = [];
        var pinPosts = function(lat, lon) {
            Alloy.Globals.api.postManager.getNearPosts(lat, lon, function(posts) {
                Ti.API.debug("Near posts are " + posts);
                for (var i in posts) {
                    var d = posts[i];
                    var anno = Titanium.Map.createAnnotation({
                        latitude: d.latitude,
                        longitude: d.longitude,
                        title: util.dateFormat(d.posted),
                        pincolor: Titanium.Map.ANNOTATION_RED,
                        animate: true,
                        post: d
                    });
                    annotations.push(anno);
                }
                $.map.annotations = annotations;
            });
        };
        if (null != Alloy.Globals.land) {
            var land = Alloy.Globals.land;
            var lat = land.lat;
            var lon = land.lon;
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            var anno = Titanium.Map.createAnnotation({
                latitude: lat,
                longitude: lon,
                title: land.name,
                pincolor: Titanium.Map.ANNOTATION_GREEN,
                animate: true
            });
            annotations.push(anno);
            pinPosts(lat, lon);
        } else Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            pinPosts(lat, lon);
        });
    });
    __defers["$.__views.map!click!mapClicked"] && $.__views.map.addEventListener("click", mapClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;