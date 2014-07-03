function Controller() {
    function onZoomInClicked() {
        $.map.zoom(1);
    }
    function onZoomOutClicked() {
        $.map.zoom(-1);
    }
    function onClickHandler(e) {
        Ti.API.debug(e.clicksource + " : " + e.type);
        if ("pin" == e.clicksource) {
            var annotation = e.annotation;
            var posts = annotation.posts;
            if (!posts) return;
            updatePostList(posts);
            $.map.selectAnnotation(null);
        }
    }
    function updatePostList(posts) {
        var section = $.item_list.sections[0];
        var itemData = [];
        for (var i in posts) {
            var item = posts[i];
            Ti.API.debug(item.imageFile);
            itemData.push({
                properties: {
                    height: "64dp",
                    item: item
                },
                postUser: {
                    text: item.user.nickname + "さん"
                },
                postTime: {
                    text: util.dateToString(item.posted)
                },
                image: {
                    image: api.toImageUrl(item)
                }
            });
        }
        section.items = itemData;
        $.postList.visible = true;
    }
    function onListItemClick(e) {
        var item = e.section.items[e.itemIndex];
        var post = item.properties.item;
        Ti.API.debug(post.id + " is clicked");
        var view = Alloy.createController("post_detail", {
            post: post
        }).getView();
        Alloy.Globals.naviCon.open(view);
    }
    function closeList() {
        $.postList.visible = false;
        $.map.selectAnnotation(null);
    }
    function createCustomView(posts) {
        var c = Alloy.createController("post_position_on_map", {
            posts: posts
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
        userLocation: "true",
        enableZoomControls: "true"
    });
    $.__views.show_map.add($.__views.map);
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
        left: "35dp",
        bottom: "5dp",
        title: "-",
        id: "zoom_out"
    });
    $.__views.map.add($.__views.zoom_out);
    onZoomOutClicked ? $.__views.zoom_out.addEventListener("click", onZoomOutClicked) : __defers["$.__views.zoom_out!click!onZoomOutClicked"] = true;
    $.__views.postList = Ti.UI.createView({
        left: "5%",
        right: "5%",
        top: "10%",
        bottom: "10%",
        id: "postList",
        visible: "false"
    });
    $.__views.show_map.add($.__views.postList);
    $.__views.listHeader = Ti.UI.createView({
        height: "40dp",
        top: "0",
        id: "listHeader",
        backgroundColor: "#e0ffff"
    });
    $.__views.listHeaderTitle = Ti.UI.createLabel({
        textAlign: "left",
        font: {
            fontSize: "28"
        },
        height: "24dp",
        left: 0,
        text: "近隣の投稿",
        id: "listHeaderTitle"
    });
    $.__views.listHeader.add($.__views.listHeaderTitle);
    $.__views.listCloseButton = Ti.UI.createButton({
        font: {
            fontSize: "20"
        },
        height: "38dp",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        width: "100dp",
        right: 0,
        title: "閉じる",
        id: "listCloseButton"
    });
    $.__views.listHeader.add($.__views.listCloseButton);
    closeList ? $.__views.listCloseButton.addEventListener("click", closeList) : __defers["$.__views.listCloseButton!click!closeList"] = true;
    var __alloyId235 = {};
    var __alloyId238 = [];
    var __alloyId240 = {
        type: "Ti.UI.ImageView",
        bindId: "image",
        properties: {
            left: "0dp",
            width: "30%",
            bindId: "image"
        }
    };
    __alloyId238.push(__alloyId240);
    var __alloyId242 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId243 = [];
            var __alloyId245 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId246 = [];
                    var __alloyId248 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "20dp"
                            },
                            height: "24dp",
                            text: "投稿者:"
                        }
                    };
                    __alloyId246.push(__alloyId248);
                    var __alloyId250 = {
                        type: "Ti.UI.Label",
                        bindId: "postUser",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "20dp"
                            },
                            height: "24dp",
                            bindId: "postUser"
                        }
                    };
                    __alloyId246.push(__alloyId250);
                    return __alloyId246;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "20dp"
                }
            };
            __alloyId243.push(__alloyId245);
            var __alloyId252 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId253 = [];
                    var __alloyId255 = {
                        type: "Ti.UI.Label",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "20dp"
                            },
                            height: "24dp",
                            text: "投稿日:"
                        }
                    };
                    __alloyId253.push(__alloyId255);
                    var __alloyId257 = {
                        type: "Ti.UI.Label",
                        bindId: "postTime",
                        properties: {
                            textAlign: "left",
                            font: {
                                fontSize: "20dp"
                            },
                            height: "24dp",
                            bindId: "postTime"
                        }
                    };
                    __alloyId253.push(__alloyId257);
                    return __alloyId253;
                }(),
                properties: {
                    layout: "horizontal",
                    height: "20dp"
                }
            };
            __alloyId243.push(__alloyId252);
            return __alloyId243;
        }(),
        properties: {
            layout: "vertical",
            width: "70%",
            left: "30%"
        }
    };
    __alloyId238.push(__alloyId242);
    var __alloyId237 = {
        properties: {
            name: "template"
        },
        childTemplates: __alloyId238
    };
    __alloyId235["template"] = __alloyId237;
    $.__views.__alloyId258 = Ti.UI.createListSection({
        id: "__alloyId258"
    });
    var __alloyId260 = [];
    __alloyId260.push($.__views.__alloyId258);
    $.__views.item_list = Ti.UI.createListView({
        sections: __alloyId260,
        templates: __alloyId235,
        headerView: $.__views.listHeader,
        id: "item_list",
        defaultItemTemplate: "template"
    });
    $.__views.postList.add($.__views.item_list);
    onListItemClick ? $.__views.item_list.addEventListener("itemclick", onListItemClick) : __defers["$.__views.item_list!itemclick!onListItemClick"] = true;
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
    var util = Alloy.Globals.util;
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
            api.postManager.getNearGroupedPosts(lat, lon, function(data) {
                for (var i in data) {
                    var d = data[i];
                    var customView = createCustomView(d.posts);
                    var anno = Alloy.Globals.Map.createAnnotation({
                        latitude: d.latitude,
                        longitude: d.longitude,
                        customView: customView,
                        title: "Loading",
                        animate: false,
                        posts: d.posts
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
    __defers["$.__views.zoom_in!click!onZoomInClicked"] && $.__views.zoom_in.addEventListener("click", onZoomInClicked);
    __defers["$.__views.zoom_out!click!onZoomOutClicked"] && $.__views.zoom_out.addEventListener("click", onZoomOutClicked);
    __defers["$.__views.listCloseButton!click!closeList"] && $.__views.listCloseButton.addEventListener("click", closeList);
    __defers["$.__views.item_list!itemclick!onListItemClick"] && $.__views.item_list.addEventListener("itemclick", onListItemClick);
    __defers["$.__views.close_button!click!onCloseButtonClicked"] && $.__views.close_button.addEventListener("click", onCloseButtonClicked);
    __defers["$.__views.show_detail_button!click!onShowDetailClicked"] && $.__views.show_detail_button.addEventListener("click", onShowDetailClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;