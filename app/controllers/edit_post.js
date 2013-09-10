

var util = Alloy.Globals.util;
var api = Alloy.Globals.api;

function onSelectCategoryClicked(e){
	var post = Alloy.Globals.post;
	var view = Alloy.createController("select_category",{
		selectCallback : function(c) {
			post.category = c;
			$.category.text = c.label;
		}
	}).getView();
	Alloy.Globals.naviCon.open(view);
}

function onSelectLocationClicked(e)
{
	var view = Alloy.createController("select_location").getView();
	Alloy.Globals.naviCon.open(view);
}

function onSaveClicked(e){
	var post = Alloy.Globals.post;
	var param = {
		postId : post.id,
		category : post.category.id,
		comment : $.comment.value,
		//goodness : $.goodness.value
	};
	api.postManager.updatePost(param,function( e){
		Alloy.Globals.post = e;
		Alloy.Globals.naviCon.pop();
	});
	
	
}



function updateDisplayInfo(post){
	
	$.comment.value = post.comment;
	$.location.text = post.latitude.toFixed(2) + " " + 
	  post.longitude.toFixed(2);
	$.photo.image = api.toImageUrl(post);
	$.goodness.value = post.goodness;
	$.category.text = post.category.label;
}


$.edit_post.addEventListener("open",function(e){

	$.save.addEventListener("click",onSaveClicked);
	$.select_category.addEventListener("click",onSelectCategoryClicked);
	$.select_location.addEventListener("click",onSelectLocationClicked);

	var post = Alloy.Globals.post;
	
	updateDisplayInfo(post);

});