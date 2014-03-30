

var api = require("api");
var client = api.client;


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



