
var api = require("api");
var client = api.client;

function onPostClicked(e) {
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


$.index.open();
