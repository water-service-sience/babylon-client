
var api = require("api");
var client = api.client;

function onPostClicked(e) {
	var view = Alloy.createController("post_image").getView();
	
	Alloy.Globals.naviCon.open(view);
	
}

function onLookClicked(e) {
	var view = Alloy.createController("look_menu").getView();
	
	Alloy.Globals.naviCon.open(view);
}
function onSettingClicked(e){
	var view = Alloy.createController("setting").getView();
	
	Alloy.Globals.naviCon.open(view);
}

$.index.addEventListener("open",function(){
	if(!client.isLogin){
		var view = Alloy.createController("create_account").getView();
		view.open();
		
	}/*else{
		var view = Alloy.createController("post_detail").getView();
	    Alloy.Globals.naviCon.open(view);
	
	}*/
	
	
});

Alloy.Globals.naviCon.open($.index);
//$.index.open();
