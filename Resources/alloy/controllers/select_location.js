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
        $.map.setLocation({
            latitude: land.latitude,
            longitude: land.longitude,
            animate: false,
            latitudeDelta: .04,
            longitudeDelta: .04
        });
        $.name.value = land.name;
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
    $.__views.__alloyId124 = Ti.UI.createView({
        height: "38dp",
        layout: "horizontal",
        id: "__alloyId124"
    });
    $.__views.select_location.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "18dp"
        },
        height: "24dp",
        text: "名前",
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.name = Ti.UI.createTextField({
        font: {
            fontSize: "24dp"
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "60%",
        id: "name"
    });
    $.__views.__alloyId124.add($.__views.name);
    var __alloyId126 = [];
    $.__views.map = Ti.Map.createView({
        height: "70%",
        annotations: __alloyId126,
        id: "map",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.select_location.add($.__views.map);
    onMapClicked ? $.__views.map.addEventListener("click", onMapClicked) : __defers["$.__views.map!click!onMapClicked"] = true;
    $.__views.__alloyId127 = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        left: "10dp",
        right: "10dp",
        title: "保存",
        id: "__alloyId127"
    });
    $.__views.select_location.add($.__views.__alloyId127);
    onOkClicked ? $.__views.__alloyId127.addEventListener("click", onOkClicked) : __defers["$.__views.__alloyId127!click!onOkClicked"] = true;
    $.__views.__alloyId128 = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "52dp",
        backgroundFocusedColor: "#ffe4e1",
        left: "10dp",
        right: "10dp",
        title: "削除",
        width: "30%",
        id: "__alloyId128"
    });
    $.__views.select_location.add($.__views.__alloyId128);
    onDeleteClicked ? $.__views.__alloyId128.addEventListener("click", onDeleteClicked) : __defers["$.__views.__alloyId128!click!onDeleteClicked"] = true;
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
        longitude: 135.0001
    };
    args.location;
    args.name;
    var currentLocation = null;
    var newLocation = null;
    init();
    $.select_location.addEventListener("open", function() {
        currentLocation = newPin(land.latitude, land.longitude, land.name, "land_mark.png");
        $.map.annotations = [ currentLocation ];
        $.map.selectAnnotation(currentLocation);
        $.map.addEventListener("regionchanged", onMapRegionChanged);
    });
    __defers["$.__views.map!click!onMapClicked"] && $.__views.map.addEventListener("click", onMapClicked);
    __defers["$.__views.__alloyId127!click!onOkClicked"] && $.__views.__alloyId127.addEventListener("click", onOkClicked);
    __defers["$.__views.__alloyId128!click!onDeleteClicked"] && $.__views.__alloyId128.addEventListener("click", onDeleteClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;