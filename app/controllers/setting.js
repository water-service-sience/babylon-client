
function onLogoutClicked(){
	
	
	var alert = Titanium.UI.createAlertDialog(
		{ title: 'ログアウト確認',
		message: 'ログアウトしてもよろしいですか？', 
		buttonNames: ['Yes', 'No'], cancel: 1 });
	
	
	alert.show();
	alert.addEventListener('click',function(event){
	    // Cancelボタンが押されたかどうか
	    if(event.cancel){
	        // cancel時の処理
	    }
	    // 選択されたボタンのindexも返る
	    if(event.index == 0){
	        // Logout処理
			Alloy.Globals.api.client.logout();
			Alloy.Globals.naviCon.home();
			var view = Alloy.createController("create_account").getView();
			view.open();
	    }
	});
	
}

function onSelectLandClicked(){
	var view = Alloy.createController("setting_select_land").getView();
	Alloy.Globals.naviCon.open(view);
	
}
function onChangePasswordClicked(){
	
	var view = Alloy.createController("change_password").getView();
	Alloy.Globals.naviCon.open(view);
}

function onSendQuestionnaireClicked(){
	var view = Alloy.createController("questionnaire").getView();
	Alloy.Globals.naviCon.open(view);
}

$.setting.addEventListener("open",function(){
	var api = Alloy.Globals.api;
	$.nickname.text = api.client.nickname;
	$.user_id.text = api.client.userId;
});


