
var calendar = require("calendar");
var api = Alloy.Globals.api;
var util = Alloy.Globals.util;


function onPostSelected(e){
	
	var controller = Alloy.createController("post_detail");
//controller.setPostAt(e.itemIndex);
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
	view.setPostAt(e.itemIndex);
	Alloy.Globals.post = Alloy.Globals.api.postManager.myPosts[e.itemIndex];

}


$.my_post_list.addEventListener("open",function(e){
	
	Alloy.Globals.api.postManager.getMyPosts(0,0,function(posts){
		var dataSet = [];
		for(var i in posts){
			var p = posts[i];
			dataSet.push({properties : {
				height : "105dp"
			},
			  thumbnail : { image : api.toImageUrl(p)},
			  date : { text : util.dateToString(p.posted)},
			  category : {text : p.category.label}
			});
		}
		$.my_posts.sections[0].setItems(dataSet);
	});
	
});
