
function updateUserPost(post)
{
	
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


$.post_all_comments.addEventListener("open",function(e){
	
	var post = Alloy.Globals.post;
	updateUserPost(post);
});

