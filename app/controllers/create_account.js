

var api = require("api");
var client = api.client;


function createAccount(e){
	
	
	client.createAccount($.nickname.value,function(success){
		if(success){
			$.create_account.close();
		}else{
			alert("Fail to create account");
		}
	});
	
	
	
}

function login(e) {
  
    client.login($.username.value,$.password.value,function(success){
    	if(success){
    		$.create_account.close();
    	}else{
    		var dialog = Titanium.UI.createAlertDialog({
				title : "ログイン失敗",
				message : 'ユーザー名、パスワードが間違っています。'
			});
			dialog.show();
    	}
    });
}

