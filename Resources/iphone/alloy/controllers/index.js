function Controller() {
    function onPostClicked() {
        var view = Alloy.createController("post_image").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onLookClicked() {
        var view = Alloy.createController("look_menu").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onLookMineClicked() {
        var view = Alloy.createController("look_mine_menu").getView();
        Alloy.Globals.naviCon.open(view);
    }
    function onSettingClicked() {
        var view = Alloy.createController("setting").getView();
        Alloy.Globals.naviCon.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#f0ffff",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.post = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "5dp",
        right: "10dp",
        title: "写真を投稿する",
        id: "post"
    });
    $.__views.index.add($.__views.post);
    onPostClicked ? $.__views.post.addEventListener("click", onPostClicked) : __defers["$.__views.post!click!onPostClicked"] = true;
    $.__views.look = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "5dp",
        right: "10dp",
        title: "周辺の情報を見る",
        id: "look"
    });
    $.__views.index.add($.__views.look);
    onLookClicked ? $.__views.look.addEventListener("click", onLookClicked) : __defers["$.__views.look!click!onLookClicked"] = true;
    $.__views.look_mine = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "5dp",
        right: "10dp",
        title: "自分の投稿を見る",
        id: "look_mine"
    });
    $.__views.index.add($.__views.look_mine);
    onLookMineClicked ? $.__views.look_mine.addEventListener("click", onLookMineClicked) : __defers["$.__views.look_mine!click!onLookMineClicked"] = true;
    $.__views.setting = Ti.UI.createButton({
        font: {
            fontSize: "32dp"
        },
        height: "15%",
        backgroundFocusedColor: "#ffe4e1",
        borderColor: "black",
        borderWidth: "1dp",
        borderRadius: "10dp",
        backgroundColor: "#fff0ff",
        left: "70%",
        right: 0,
        bottom: "5dp",
        title: "設定",
        id: "setting"
    });
    $.__views.index.add($.__views.setting);
    onSettingClicked ? $.__views.setting.addEventListener("click", onSettingClicked) : __defers["$.__views.setting!click!onSettingClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = Alloy.Globals.api;
    var client = api.client;
    $.index.addEventListener("open", function() {
        if (!client.isLogin) {
            var view = Alloy.createController("create_account").getView();
            view.open();
        }
        if ("android" == Ti.Platform.osname) {
            var rc = Alloy.Globals.Map.isGooglePlayServicesAvailable();
            switch (rc) {
              case Alloy.Globals.Map.SUCCESS:
                Ti.API.info("Google Play services is installed.");
                break;

              case Alloy.Globals.Map.SERVICE_MISSING:
                alert("Google Play開発者サビースのインストールが必要です。インストールをしてください。");
                Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.google.android.gms&hl=ja");
                Ti.Android.currentActivity.finish();
                break;

              case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
                alert("Google Play開発者サービスのバージョンアップが必要です。バージョンアップをしてください。");
                Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.google.android.gms&hl=ja");
                Ti.Android.currentActivity.finish();
                break;

              case Alloy.Globals.Map.SERVICE_DISABLED:
                alert("Google Play services is disabled. Please enable Google Play services.");
                break;

              case Alloy.Globals.Map.SERVICE_INVALID:
                alert("Google Play services cannot be authenticated. Reinstall Google Play services.");
                break;

              default:
                alert("Unknown error.Google Play開発者サービスを検出できませんでした。");
            }
        }
    });
    Alloy.Globals.naviCon.open($.index);
    __defers["$.__views.post!click!onPostClicked"] && $.__views.post.addEventListener("click", onPostClicked);
    __defers["$.__views.look!click!onLookClicked"] && $.__views.look.addEventListener("click", onLookClicked);
    __defers["$.__views.look_mine!click!onLookMineClicked"] && $.__views.look_mine.addEventListener("click", onLookMineClicked);
    __defers["$.__views.setting!click!onSettingClicked"] && $.__views.setting.addEventListener("click", onSettingClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;