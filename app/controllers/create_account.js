

var api = require("api");
var client = api.client;
var util = Alloy.Globals.util;

function loginOrCreateAccount(e) {
	var username = removeSpaceThenHash($.name.value);
	if(username == null){
		alert("氏名が入力されていません。");
		return;
	}
	var phoneNumber = normalizeAndValidatePhoneNumber($.phoneNumber.value);
	
	if(phoneNumber == null){
		alert("不正な電話番号です。");
		return;
	}
	client.login(username,phoneNumber,function(success){
    	if(success){
    		$.create_account.close();
    	}else{
    		client.createAccount(username,$.name.value,function(success){
			if(success){
				    client.changePassword(username,"",phoneNumber,function(success){
				    	if(success){
							
							$.create_account.close();
				    	}else{
							alert("アカウント作成失敗。パスワードが不正です。");
				    	}
				    });
				}else{
					alert("アカウント作成失敗。おそらく、電話番号が間違っています。");
				}
			});
    	}
    });
	
	Ti.API.log(phoneNumber + " : " + username);
	
	
}
function normalizeAndValidatePhoneNumber( phoneNumber){
	// -の削除
	var v = phoneNumber.replace(/-/g, ""); 
	var re = /^[0-9]{7,11}$/;
	if(!re.test(v)){
		return null;
	}
	return v;
}
function removeSpaceThenHash(name){
	
	var re = /\s/;
	var r = name.replace(re,"");
	Ti.API.log(r);
	if(r.length == 0) return null;
	else return Titanium.Utils.md5HexDigest(r);
	
}


function createAccount(e){
	Ti.API.log("###" + $.nickname.value);
	if($.nickname.value.length == 0){
		alert("氏名が入力されていません。");
		return;
	}
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

