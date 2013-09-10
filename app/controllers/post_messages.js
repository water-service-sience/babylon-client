
var util = Alloy.Globals.util;
var api = Alloy.Globals.api;

$.post_messages.addEventListener("open",function(e){

	var post = Alloy.Globals.post;
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

});