
function onLogoutClicked(){
	
	Alloy.Globals.api.client.logout();
	
	
	Alloy.Globals.naviCon.home();

	var view = Alloy.createController("create_account").getView();
	view.open();
}

$.setting.addEventListener("open",function(){
	var api = Alloy.Globals.api;
	$.nickname.text = api.client.nickname;
	$.user_id.text = api.client.userId;
});


