function Controller() {
    function onOkClicked() {
        callback({
            cancel: false,
            latitude: location.latitude,
            longitude: location.longitude
        });
        Alloy.Globals.naviCon.pop();
    }
    function onMapRegionChanged(evt) {
        if (!newLocation) {
            newLocation = newPin(evt.latitude, evt.longitude, "ここに変更");
            $.map.addAnnotation(newLocation);
        }
        location = evt;
        newLocation.latitude = evt.latitude;
        newLocation.longitude = evt.longitude;
        $.map.selectAnnotation(newLocation);
    }
    function newPin(lat, lon, name, type) {
        var pin = Alloy.Globals.Map.createAnnotation({
            latitude: lat,
            longitude: lon,
            title: name,
            pincolor: Alloy.Globals.Map.ANNOTATION_BLUE,
            animate: false,
            image: type,
            leftButton: "./images/appcelerator_small.png"
        });
        return pin;
    }
    function init() {
        location ? $.map.setLocation({
            latitude: location.latitude,
            longitude: location.longitude,
            animate: false,
            latitudeDelta: .04,
            longitudeDelta: .04
        }) : Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            location.latitude = lat;
            location.longiude = lon;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "select_location";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.select_location = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "select_location"
    });
    $.__views.select_location && $.addTopLevelView($.__views.select_location);
    $.__views.map = Alloy.Globals.Map.createView({
        height: "70%",
        id: "map",
        ns: "Alloy.Globals.Map",
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: "Alloy.Globals.Map.NORMAL_TYPE"
    });
    $.__views.select_location.add($.__views.map);
    $.__views.__alloyId135 = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "10dp",
        right: "10dp",
        title: "選択",
        id: "__alloyId135"
    });
    $.__views.select_location.add($.__views.__alloyId135);
    onOkClicked ? $.__views.__alloyId135.addEventListener("click", onOkClicked) : __defers["$.__views.__alloyId135!click!onOkClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.api;
    var args = arguments[0] || {};
    var callback = args.callback || function(e) {
        e.cancel ? Ti.API.debug("Canceled") : Ti.API.debug("Location = " + e.lat + ":" + e.lon);
    };
    var location = {
        latitude: args.latitude || args.lat,
        longitude: args.longitude || args.lon
    };
    var newLocation = null;
    init();
    $.select_location.addEventListener("open", function() {
        currentLocation = newPin(location.latitude, location.longitude, "現在地", "land_mark.png");
        $.map.annotations = [ currentLocation ];
        $.map.selectAnnotation(currentLocation);
        $.map.addEventListener("regionchanged", onMapRegionChanged);
    });
    __defers["$.__views.__alloyId135!click!onOkClicked"] && $.__views.__alloyId135.addEventListener("click", onOkClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;