
function onLogoutClicked(){
	
	Alloy.Globals.api.client.logout();
	
	
	Alloy.Globals.naviCon.home();

	var view = Alloy.createController("create_account").getView();
	view.open();
}


