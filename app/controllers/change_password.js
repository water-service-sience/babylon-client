

var api = require("api");
var client = api.client;
var util = Alloy.Globals.util;


function changePassword(e){
	
	var username = $.username.value;
	var oldPassword = $.old_password.value;
	var password = $.new_password.value;
	var confirm = $.confirm_password.value;
	if(password != confirm){
		var dialog = Titanium.UI.createAlertDialog({
			title : "パスワードエラー",
			message : '確認用のパスワードが一致していません。新しいパスワードと新しいパスワード(確認)には、同じパスワードを入力してください。'
		});
		dialog.show();
	}
	
	$.changePassword.enable = false;
	client.changePassword(username,oldPassword,password,function(result){
		$.changePassword.enable = true;
		if(result != null && result.success){
			var userLoginInfo = {
				username : username
			};
			util.userLoginInfo.set(userLoginInfo);
			
			var dialog = Titanium.UI.createAlertDialog({
				title : "変更完了",
				message : '変更完了しました。'
			});
			dialog.show();
		}else if(result != null){
			var dialog = Titanium.UI.createAlertDialog({
				title : "変更失敗",
				message : result.message
			});
			dialog.show();
		}
	});
	
	
	
}


$.change_password.addEventListener("open",function(e){
	
	var u = util.userLoginInfo.get();
	if(u){
		var username = u.username;
	}
	
	if(client.username){
		$.username.value = client.username;
	}
	
});

