
var util = Alloy.Globals.util;

function onLogoutClicked(){
	
	if(!util.userLoginInfo.get()){
		var alert = Titanium.UI.createAlertDialog(
		{ title: 'パスワードが設定されていません',
		message: '再ログインのために、パスワードを設定してください。'});
		alert.show();
		return ;
	}
	
	
	var alert = Titanium.UI.createAlertDialog(
		{ title: 'ログアウト確認',
		message: 'ログアウトしてもよろしいですか？(以前設定したユーザー名とパスワードで再ログイン可能です。)', 
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
			util.questionnaire.delete();
			util.userLoginInfo.delete();
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


