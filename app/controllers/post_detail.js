
var api = Alloy.Globals.api;


function setPostAt(index){
	
	var post = Alloy.Globals.api.postManager.myPosts[index];
	
		
	$.photo.image = post.image;
}
function setPost(post) {
	Ti.API.debug("Hoge");
	$.photo.image = api.toImageUrl(post);
}

function onShowCommentsClicked(e){
	var view = Alloy.createController("post_all_comments").getView();
	Alloy.Globals.naviCon.open(view);
}
function onShowUpdatesClicked(e){
	var view = Alloy.createController("post_all_updates").getView();
	Alloy.Globals.naviCon.open(view);
}

function updateDisplayInformation(post){
	$.photo.image = api.toImageUrl(post);
			
	if(post.unreadUpdates > 0){
		$.status_message.visible = true;
		$.status_message.text = "未読の返信が" + post.unreadUpdates + "件あります。";
	}else{
		$.status_message.visible = false;
	}
	
	var commentSection = Ti.UI.createListSection({ headerTitle: 'コメント'});
	var commentDataSet = [];
	for(var i in post.comments){
		var c = post.comments[i];
		var nickname = "no name";
		if(c.user) nickname = c.user.nickname;
		commentDataSet.push({
			properties : {
				height : "80dp"
			},
			nickname : {text : nickname},
			comment : {text : c.comment},
			date : {text : c.commented}
		});
	}
	
	commentSection.setItems(commentDataSet);
	$.comment_list.setSections([commentSection]);
}



$.post_detail.addEventListener("open",function(e){
	
	var post = Alloy.Globals.post;
	
	$.show_comment.addEventListener("click",onShowCommentsClicked);
	$.show_all_updates.addEventListener("click",onShowAllUpdatesClicked);
	
	if(post){
		updateDisplayInformation(post);
		  
	}else{
		api.postManager.getPost(1,function(post){
			
			updateDisplayInformation(post);
			
		});
	}
});

exports.setPost = setPost;
