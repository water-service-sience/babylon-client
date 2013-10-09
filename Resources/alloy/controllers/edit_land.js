function Controller() {
    function onDeleteClicked() {
        var alert = Titanium.UI.createAlertDialog({
            title: "削除確認",
            message: "農地情報を削除してもよろしいですか？",
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        alert.show();
    }
    function onOkClicked() {
        land.name = $.name.value;
        if (newLocation) {
            land.latitude = newLocation.latitude;
            land.longitude = newLocation.longitude;
        }
        api.landManager.updateOwnLand(land, function(body) {
            land = body;
            callback(body);
        });
    }
    function onMapClicked(evt) {
        "pin" == evt.clicksource;
    }
    function onMapRegionChanged(evt) {
        if (!newLocation) {
            newLocation = newPin(evt.latitude, evt.longitude, "ここに変更");
            $.map.addAnnotation(newLocation);
        }
        newLocation.latitude = evt.latitude;
        newLocation.longitude = evt.longitude;
        $.map.selectAnnotation(newLocation);
    }
    function newPin(lat, lon, name, type) {
        var pin = Titanium.Map.createAnnotation({
            latitude: lat,
            longitude: lon,
            title: name,
            pincolor: Ti.Map.ANNOTATION_BLUE,
            animate: false,
            image: type,
            leftButton: "./images/appcelerator_small.png"
        });
        return pin;
    }
    function init() {
        land.newLand ? Titanium.Geolocation.getCurrentPosition(function(e) {
            var lat = e.coords.latitude;
            var lon = e.coords.longitude;
            $.map.setLocation({
                latitude: lat,
                longitude: lon,
                animate: false,
                latitudeDelta: .04,
                longitudeDelta: .04
            });
            land.latitude = lat;
            land.longiude = lon;
        }) : $.map.setLocation({
            latitude: land.latitude,
            longitude: land.longitude,
            animate: false,
            latitudeDelta: .04,
            longitudeDelta: .04
        });
        $.name.value = land.name;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_land";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.edit_land = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "edit_land"
    });
    $.__views.edit_land && $.addTopLevelView($.__views.edit_land);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId0"
    });
    $.__views.edit_land.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "名前",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.name = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "60%",
        id: "name"
    });
    $.__views.__alloyId0.add($.__views.name);
    var __alloyId2 = [];
    $.__views.map = Ti.Map.createView({
        height: "70%",
        annotations: __alloyId2,
        id: "map",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.edit_land.add($.__views.map);
    onMapClicked ? $.__views.map.addEventListener("click", onMapClicked) : __defers["$.__views.map!click!onMapClicked"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
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
        title: "保存",
        id: "__alloyId3"
    });
    $.__views.edit_land.add($.__views.__alloyId3);
    onOkClicked ? $.__views.__alloyId3.addEventListener("click", onOkClicked) : __defers["$.__views.__alloyId3!click!onOkClicked"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
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
        title: "削除",
        width: "30%",
        id: "__alloyId4"
    });
    $.__views.edit_land.add($.__views.__alloyId4);
    onDeleteClicked ? $.__views.__alloyId4.addEventListener("click", onDeleteClicked) : __defers["$.__views.__alloyId4!click!onDeleteClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var args = arguments[0] || {};
    var callback = args.callback || function(land) {
        Ti.API.debug("Update " + land.name);
    };
    var land = args.land || {
        id: -1,
        name: "new land",
        latitude: 35.0001,
        longitude: 135.0001,
        newLand: true
    };
    args.location;
    args.name;
    var currentLocation = null;
    var newLocation = null;
    init();
    $.edit_land.addEventListener("open", function() {
        currentLocation = newPin(land.latitude, land.longitude, land.name, "land_mark.png");
        $.map.annotations = [ currentLocation ];
        $.map.selectAnnotation(currentLocation);
        $.map.addEventListener("regionchanged", onMapRegionChanged);
    });
    __defers["$.__views.map!click!onMapClicked"] && $.__views.map.addEventListener("click", onMapClicked);
    __defers["$.__views.__alloyId3!click!onOkClicked"] && $.__views.__alloyId3.addEventListener("click", onOkClicked);
    __defers["$.__views.__alloyId4!click!onDeleteClicked"] && $.__views.__alloyId4.addEventListener("click", onDeleteClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;