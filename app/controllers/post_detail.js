
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
	var view = Alloy.createController("post_map").getView();
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
	}else{
		$.private_area.visible = false;
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
