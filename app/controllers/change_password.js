

var api = require("api");
var client = api.client;
var util = Alloy.Globals.util;


function changePassword(e){
	var nickname = $.nickname.value;
	var username = removeSpaceThenHash(nickname);
	if(username == null){
		alert("氏名が入力されていません。");
		return;
	}
	var phoneNumber = normalizeAndValidatePhoneNumber($.phoneNumber.value);
	
	if(phoneNumber == null){
		alert("不正な電話番号です。");
		return;
	}
	var password = phoneNumber;
	
	$.changePassword.enable = false;
	client.changePassword(username,nickname,password,function(result){
		$.changePassword.enable = true;
		if(result != null && result.success){
			
			client.setPhoneNumber(phoneNumber);
			
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

function removeSpaceThenHash(name){
	
	var re = /\s/;
	var r = name.replace(re,"");
	Ti.API.log(r);
	if(r.length == 0) return null;
	else return Titanium.Utils.md5HexDigest(r);
	
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

$.change_password.addEventListener("open",function(e){
	
	$.nickname.value = client.nickname;
	$.phoneNumber.value = client.phoneNumber;
	
	/*var u = util.userLoginInfo.get();
	if(u){
		var username = u.username;
	}
	
	if(client.username){
		$.username.value = client.username;
	}*/
	
});

