
var args = arguments[0] || {};

var onClick = args.onClick | function(posts){
	Ti.API.debug("Click post:" + posts);
};

var posts = args.posts;

var util = Alloy.Globals.util;


$.label.text = "投稿" + posts.length + "件";

var post = posts[0];
if(post.goodness < 30){
	$.label.backgroundColor = "red";
}else if(post.goodness > 70){
	$.label.backgroundColor = "green";
}else{
	$.label.backgroundColor = "white";
}

function onClickHandler(){
	
	Ti.API.debug("Clicked!");
	
}
