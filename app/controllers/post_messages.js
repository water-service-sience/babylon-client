
var util = Alloy.Globals.util;
var api = Alloy.Globals.api;

var args = arguments[0] || {};

var post = args.post || Alloy.Globals.post;

function updateMessageList(){
	var userId = api.client.userId;
	var messageSection = Ti.UI.createListSection({ headerTitle: 'メッセージ'});
	var messageDataSet = [];
	for(var i in post.privateMessages){
		var c = post.privateMessages[i];
		var nickname = "no name";
		if(c.sender) {
			if(userId == c.sender.id){
				nickname = "あなた";
			}else{
				nickname = c.sender.nickname;	
			}
		}
		
		messageDataSet.push({
			properties : {
				height : "105dp"
			},
			nickname : {text : nickname},
			message : {text : c.message},
			date : {text : util.dateToString(c.sent)}
		});
		
		
		messageSection.setItems(messageDataSet);
		$.messages.setSections([messageSection]);
			
	}

}

$.post_messages.addEventListener("open",function(e){

	var userId = api.client.userId;
	$.send_message_button.addEventListener("click",function(e){
		var message = $.send_message.value;
		api.postManager.sendMessage(post.id,message,function(e){
			post = e;
			updateMessageList();
		});
		
	});
	
	if(post.privateMessages.length == 0){
		// 詳細データが取得されていない場合は、取得する
		api.postManager.getPost(post.id,function(p) {
			post = p;
			updateMessageList();
		});
	}else{
		updateMessageList();
	}
});