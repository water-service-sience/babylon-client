
var api = require("api");
var client = api.client;

function onPostClicked(e) {
	var view = Alloy.createController("post_image").getView();
	
	Alloy.Globals.naviCon.open(view);
	
}

function onLookClicked(e) {
	
}
function onSettingClicked(e){
	
}

$.index.addEventListener("open",function(){
	if(!client.isLogin){
		var view = Alloy.createController("create_account").getView();
		view.open();
		
	}
});

Alloy.Globals.naviCon.open($.index);
//$.index.open();
