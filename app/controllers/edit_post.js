

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
		category : post.category.id,
		comment : $.comment.text,
		//goodness : $.goodness.value
	};
	api.postManager.updatePost(param,function( e){
		Alloy.Globals.naviCon.pop();
	});
	
	
}



function updatePost(post){
	$.comment.text = post.comment;
	$.location.text = post.longitude + " " + post.latitude;
	$.photo.image = api.toImageUrl(post);
	$.goodness.value = post.goodness;
	$.category.text = post.category.label;
}


$.edit_post.addEventListener("open",function(e){

	$.save.addEventListener("click",onSaveClicked);
	$.select_category.addEventListener("click",onSelectCategoryClicked);
	$.select_location.addEventListener("click",onSelectLocationClicked);

	var post = Alloy.Globals.post;
	
	updatePost(post);

});