
var calendar = require("calendar");

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
			var l = posts[i];
			dataSet.push({properties : l});
		}
		$.my_posts.sections[0].setItems(dataSet);
	});
	
});
