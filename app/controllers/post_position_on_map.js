
var args = arguments[0] || {};

var onClick = args.onClick | function(post){
	Ti.API.debug("Click post:" + post.id);
};

var post = args.post;

var util = Alloy.Globals.util;


$.label.text = util.niceTimeString(post.posted);

if(post.goodness < 30){
	$.label.backgroundColor = "red";
}else if(post.goodness > 70){
	$.label.backgroundColor = "green";
}else{
	$.label.backgroundColor = "white";
}
