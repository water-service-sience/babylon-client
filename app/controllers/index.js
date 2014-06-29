
var api = Alloy.Globals.api;
var util = Alloy.Globals.util;
var client = api.client;

function onPostClicked(e) {
	//var view = Alloy.createController("post_image").getView();
	var view = Alloy.createController("select_post_mode").getView();
	
	Alloy.Globals.naviCon.open(view);
	
 	
	// var view = Alloy.createController("post_detail").getView();
	// Alloy.Globals.naviCon.open(view);
 	
	
}

function onLookClicked(e) {
	//var view = Alloy.createController("select_category",{hoge : "aaaa"}).getView();
	//Alloy.Globals.naviCon.open(view);
	var view = Alloy.createController("look_menu").getView();
	
	
	Alloy.Globals.naviCon.open(view);
	//var view = Alloy.createController("my_post_calendar").getView();
	//Alloy.Globals.naviCon.open(view);
}

function onFieldROuterClicked(e){
	
	var view = Alloy.createController("water_level_chart").getView();
	Alloy.Globals.naviCon.open(view);
}

function onLookMineClicked(e){
	var view = Alloy.createController("look_mine_menu").getView();
	Alloy.Globals.naviCon.open(view);
}



function onSettingClicked(e){
	var view = Alloy.createController("setting").getView();
	
	Alloy.Globals.naviCon.open(view);
}
function onQuestionnaireClicked(e){
	var view = Alloy.createController("questionnaire").getView();
	
	Alloy.Globals.naviCon.open(view);
	
}


	if(util.questionnaire.get()){
		$.questionnaire.title = "アンケートを修正";
	}
$.index.addEventListener("focus",function(){
	
	$.welcomeMessage.text = "ようこそ" + client.nickname + "さん";
});

$.index.addEventListener("open",function(){
	if(!client.isLogin){
		var view = Alloy.createController("create_account").getView();
		view.open();
	}/*else{
		var view = Alloy.createController("post_detail").getView();
	    Alloy.Globals.naviCon.open(view);
	
	}*/
	
	
	if(Ti.Platform.osname == "android"){
		var rc = Alloy.Globals.Map.isGooglePlayServicesAvailable();
		switch (rc) {
		    case Alloy.Globals.Map.SUCCESS:
		        Ti.API.info('Google Play services is installed.');
		        break;
		    case Alloy.Globals.Map.SERVICE_MISSING:
		        alert("Google Play開発者サビースのインストールが必要です。インストールをしてください。");
		        Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.google.android.gms&hl=ja"); // Googleの場合
				Ti.Android.currentActivity.finish(); // ブラウザを起動したらアプリ本体は終了させる
		        break;
		    case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
		        alert('Google Play開発者サービスのバージョンアップが必要です。バージョンアップをしてください。');
		        Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.google.android.gms&hl=ja"); // Googleの場合
				Ti.Android.currentActivity.finish(); // ブラウザを起動したらアプリ本体は終了させる
		        break;
		    case Alloy.Globals.Map.SERVICE_DISABLED:
		        alert('Google Play services is disabled. Please enable Google Play services.');
		        break;
		    case Alloy.Globals.Map.SERVICE_INVALID:
		        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
		        break;
		    default:
		        alert('Unknown error.Google Play開発者サービスを検出できませんでした。');
		        break;
		}
	}
});

Alloy.Globals.naviCon.open($.index);

//$.index.open();
//$.index.open();
