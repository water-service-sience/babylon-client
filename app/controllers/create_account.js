

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
