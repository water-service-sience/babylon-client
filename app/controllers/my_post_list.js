
var calendar = reuire("calendar");

function onPostSelected(e){
	
	var controller = Alloy.createController("post_detail");
//controller.setPostAt(e.itemIndex);
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
	view.setPostAt(e.itemIndex);
	Alloy.Globals.post = Alloy.Globals.api.postManager.myPosts[e.itemIndex];

}


$.my_post_list.addEventListener("open",function(e){
	
	Alloy.Globals.api.postManager.getMyPosts(function(posts){
		var dataSet = [];
		for(var i in posts){
			var l = posts[i];
			dataSet.push({properties : l});
		}
		var section = Ti.UI.createListSection({ headerTitle: '過去の投稿'});
		section.setItems(dataSet);
		$.my_posts.sections = [section];
	});
	
});
