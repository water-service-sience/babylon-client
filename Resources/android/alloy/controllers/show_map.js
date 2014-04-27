function Controller() {
    function onZoomInClicked() {
        $.map.zoom(1);
    }
    function onZoomOutClicked() {
        $.map.zoom(-1);
    }
    function mapClicked() {}
    function onClickHandler(e) {
        Ti.API.debug(e.clicksource + " : " + e.type);
        if ("pin" == e.clicksource) {
            var annotation = e.annotation;
            var post = annotation.post;
            if (!post) return;
            var lat = post.latitude + .3 * $.map.region.latitudeDelta;
            $.map.setLocation({
                latitude: lat,
                longitude: post.longitude,
                animate: true,
                latitudeDelta: $.map.region.latitudeDelta,
                longitudeDelta: $.map.region.longitudeDelta
            });
            $.image_balloon.image = api.toImageUrl(post.imageFile);
            $.balloon.visible = true;
            selectedPost = post;
        }
    }
    function createCustomView(post) {
        var c = Alloy.createController("post_position_on_map", {
            post: post
        });
        return c.getView();
    }
    function onCloseButtonClicked() {
        $.balloon.visible = false;
    }
    function onShowDetailClicked() {
        if (selectedPost) {
            var view = Alloy.createController("post_detail", {
                post: selectedPost
            }).getView();
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
        id: "show_map"
    });
    $.__views.show_map && $.addTopLevelView($.__views.show_map);
    $.__views.map = Alloy.Globals.Map.createView({
        id: "map",
        ns: "Alloy.Globals.Map",
        animate: "true",
        regionFit: "true",
        userLocation: "true"
    });
    $.__views.show_map.add($.__views.map);
    mapClicked ? $.__views.map.addEventListener("click", mapClicked) : __defers["$.__views.map!click!mapClicked"] = true;
    $.__views.zoom_in = Ti.UI.createButton({
        font: {
            fontSize: "20"
        },
        height: "25dp",
        backgroundFocusedColor: "gray",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "25dp",
        color: "#000",
        disabledColor: "#888888",
        left: "5dp",
        bottom: "5ddp",
        title: "+",
        id: "zoom_in"
    });
    $.__views.map.add($.__views.zoom_in);
    onZoomInClicked ? $.__views.zoom_in.addEventListener("click", onZoomInClicked) : __defers["$.__views.zoom_in!click!onZoomInClicked"] = true;
    $.__views.zoom_out = Ti.UI.createButton({
        font: {
            fontSize: "20"
        },
        height: "25dp",
        backgroundFocusedColor: "gray",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "25dp",
        color: "#000",
        disabledColor: "#888888",
        left: "35dp",
        bottom: "5dp",
        title: "-",
        id: "zoom_out"
    });
    $.__views.map.add($.__views.zoom_out);
    onZoomOutClicked ? $.__views.zoom_out.addEventListener("click", onZoomOutClicked) : __defers["$.__views.zoom_out!click!onZoomOutClicked"] = true;
    $.__views.balloon = Ti.UI.createView({
        width: "95%",
        height: "60%",
        top: "5%",
        backgroundColor: "white",
        id: "balloon",
        visible: "false"
    });
    $.__views.show_map.add($.__views.balloon);
    $.__views.image_balloon = Ti.UI.createImageView({
        width: "95%",
        height: "85%",
        top: "5%",
        id: "image_balloon"
    });
    $.__views.balloon.add($.__views.image_balloon);
    $.__views.close_button = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "35dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: "15dp",
        backgroundColor: "#fff0ff",
        width: "35dp",
        color: "#000",
        disabledColor: "#888888",
        top: "5dp",
        right: "5dp",
        title: "×",
        id: "close_button"
    });
    $.__views.balloon.add($.__views.close_button);
    onCloseButtonClicked ? $.__views.close_button.addEventListener("click", onCloseButtonClicked) : __defers["$.__views.close_button!click!onCloseButtonClicked"] = true;
    $.__views.show_detail_button = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "90%",
        color: "#000",
        disabledColor: "#888888",
        bottom: "5dp",
        left: "5%",
        title: "詳細を見る",
        id: "show_detail_button"
    });
    $.__views.balloon.add($.__views.show_detail_button);
    onShowDetailClicked ? $.__views.show_detail_button.addEventListener("click", onShowDetailClicked) : __defers["$.__views.show_detail_button!click!onShowDetailClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    Alloy.Globals.util;
    var selectedPost = null;
    $.map.mapType = Alloy.Globals.Map.NORMAL_TYPE;
    $.show_map.addEventListener("open", function() {
        var annotations = [];
        var lastLat;
        var lastLon;
        $.map.addEventListener("click", onClickHandler);
        var pinPosts = function(lat, lon) {
            lastLat = lat;
            lastLon = lon;
            Alloy.Globals.api.postManager.getNearPosts(lat, lon, function(posts) {
                for (var i in posts) {
                    var d = posts[i];
                    var anno = Alloy.Globals.Map.createAnnotation({
                        latitude: d.latitude,
                        longitude: d.longitude,
                        customView: createCustomView(d),
                        animate: true,
                        title: "投稿者:" + d.user.nickname,
                        post: d
                    });
                    annotations.push(anno);
                }
                $.map.annotations = annotations;
            });
        };
        $.map.addEventListener("regionchanged", function(e) {
            var diff1 = lastLat - e.latitude;
            var diff2 = lastLon - e.longitude;
            var delta = diff1 * diff1 + diff2 * diff2;
            var region = $.map.getRegion();
            if (delta > .5 * region.latitudeDelta * region.latitudeDelta) {
                Ti.API.log("Update");
                pinPosts(region.latitude, region.longitude);
            }
            Ti.API.log("Changed:" + e.latitude + " ," + e.longitude);
        });
        if (null != Alloy.Globals.land) {
            var land = Alloy.Globals.land;
            var lat = land.latitude;
            var lon = land.longitude;
            $.map.setRegion({
                latitude: lat,
                longitude: lon,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            var anno = Alloy.Globals.Map.createAnnotation({
                latitude: lat,
                longitude: lon,
                title: land.name,
                pincolor: Alloy.Globals.Map.ANNOTATION_GREEN,
                animate: true
            });
            annotations.push(anno);
            pinPosts(lat, lon);
        } else Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.coords) {
                var lat = e.coords.latitude;
                var lon = e.coords.longitude;
                $.map.setRegion({
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: .04,
                    longitudeDelta: .04
                });
                $.map.setLocation({
                    latitude: lat,
                    longitude: lon,
                    animate: false,
                    latitudeDelta: .04,
                    longitudeDelta: .04
                });
                pinPosts(lat, lon);
            } else {
                Ti.API.log("GPS is not availbale");
                alert("GPS機能が利用できません。GPSをONにしてください。");
            }
        });
    });
    __defers["$.__views.map!click!mapClicked"] && $.__views.map.addEventListener("click", mapClicked);
    __defers["$.__views.zoom_in!click!onZoomInClicked"] && $.__views.zoom_in.addEventListener("click", onZoomInClicked);
    __defers["$.__views.zoom_out!click!onZoomOutClicked"] && $.__views.zoom_out.addEventListener("click", onZoomOutClicked);
    __defers["$.__views.close_button!click!onCloseButtonClicked"] && $.__views.close_button.addEventListener("click", onCloseButtonClicked);
    __defers["$.__views.show_detail_button!click!onShowDetailClicked"] && $.__views.show_detail_button.addEventListener("click", onShowDetailClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;