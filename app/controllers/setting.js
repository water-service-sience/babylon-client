
function onLogoutClicked(){
	
	Alloy.Globals.api.client.logout();
	
	
	Alloy.Globals.naviCon.home();

	var view = Alloy.createController("create_account").getView();
	view.open();
}

function onSelectLandClicked(){
	var view = Alloy.createController("setting_select_land").getView();
	Alloy.Globals.naviCon.open(view);
	
}

$.setting.addEventListener("open",function(){
	var api = Alloy.Globals.api;
	$.nickname.text = api.client.nickname;
	$.user_id.text = api.client.userId;
});


