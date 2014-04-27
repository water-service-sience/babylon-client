
var api = Alloy.Globals.api;
var util = Alloy.Globals.util;

var args = arguments[0] || {};

var post = args.post || Alloy.Globals.post;

function setPost(post) {
	$.photo.image = api.toImageUrl(post);
}

function onShowCommentsClicked(e){
	var view = Alloy.createController("post_all_comments").getView();
	Alloy.Globals.naviCon.open(view);
}
function onShowMessagesClicked(e){
	var view = Alloy.createController("post_messages",{
			post : post
		}).getView();
	Alloy.Globals.naviCon.open(view);
}
function onShowInMapClicked(e){
	var view = Alloy.createController("post_map",{post : post}).getView();
	Alloy.Globals.naviCon.open(view);
}
function onEditPostClicked(e){
	var view = Alloy.createController("edit_post").getView();
	Alloy.Globals.naviCon.open(view);
	
}
function onSendCommentClicked(e){
	var post = Alloy.Globals.post;
	var message = $.comment.value;
	$.comment.value = "";
	$.comment.blur();
	api.postManager.commentTo(post.id,message,function(post){
		Alloy.Globals.post = post;
		updateDisplayInformation(post);
	});
}


function updateDisplayInformation(post){
	//新着情報		
	if(post.userId == api.client.userId && post.unreadMessages > 0){
		$.status_message.visible = true;
		$.status_message.text = "未読の返信が" + post.unreadMessages + "件あります。";
	}else{
		$.status_message.visible = false;
	}
	
	if(post.userId == api.client.userId){
		$.private_area.visible = true;
		$.height = "auto";
	}else{
		$.private_area.visible = false;
		$.height = 0;
	}
	
	$.append_info_area.removeAllChildren();
	if(post.fieldData){
		var index = 0;
		var height = 20;
		for(var key in post.fieldData){
			var v = post.fieldData[key];
			var line = Ti.UI.createView({
				left : 0,
				//top : (index * height) + "dp",
				width : "100%",
				height : height + "dp"
			});
			var label = Ti.UI.createLabel({
				text : key + ":",
				left : 0,
				top : 0,
				height : height + "dp"
			});
			var value = Ti.UI.createLabel({
				text : v,
				left : "100dp",
				top : 0,
				height : height + "dp"
			});
			index += 1;
			line.add(label);
			line.add(value);
			$.append_info_area.add(line);
			
		}
		$.append_info_area.height = (index * height) + "dp";
	}
	
	//投稿情報
	$.photo.image = api.toImageUrl(post);
	$.date.text = util.dateToString(post.posted);
	$.goodness.text = util.goodnessToString(post.goodness);
	$.post_user.text = post.user.nickname;
	
	
	// var commentSection = Ti.UI.createListSection({ headerTitle: 'コメント'});
	// var commentDataSet = [];
	// for(var i in post.comments){
		// var c = post.comments[i];
		// var nickname = "no name";
		// if(c.user) nickname = c.user.nickname;
		// commentDataSet.push({
			// properties : {
				// height : "105dp"
			// },
			// nickname : {text : nickname},
			// comment : {text : c.comment},
			// date : {text : util.dateToString(c.commented)}
		// });
	// }
// 	
	// commentSection.setItems(commentDataSet);
	// $.comment_list.setSections([commentSection]);
}

if(post){
		updateDisplayInformation(post);
		  
	}else{
		api.postManager.getPost(1,function(post){
			Alloy.Globals.post = post;
			updateDisplayInformation(post);
			
		});
	}

$.post_detail.addEventListener("open",function(e){
	
	
	//$.send_comment.addEventListener("click",onSendCommentClicked);
	//$.comment.addEventListener("return",onSendCommentClicked);
	
});

exports.setPost = setPost;
