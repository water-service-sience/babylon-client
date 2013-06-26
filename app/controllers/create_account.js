

var api = require("api");
var client = api.client;


function createAccount(e){
	
	alert("Create account " + $.nickname.value);
	
	client.isLogin = true;
	client.nickname = $.nickname.value;
	
	$.create_account.close();
	
}
