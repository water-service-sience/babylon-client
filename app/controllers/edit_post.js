

var util = Alloy.Globals.util;
var api = Alloy.Globals.api;

function onSelectCategoryClicked(e){
	var post = Alloy.Globals.post;
	
	
	api.postManager.getCategories( function(categories){
		var view = Alloy.createController("select_list",{
			selectCallback : function(c) {
				post.category = c.id;
				$.category.text = c.label;
			},
			headerTitle : "問い合わせ内容",
			selectItems : categories
		}).getView();
		Alloy.Globals.naviCon.open(view);
		
	});
    
	
}

function onSelectLocationClicked(e)
{
	
	var post = Alloy.Globals.post;
	var view = Alloy.createController("select_location",{
		latitude : post.latitude,
		longitude : post.longitude,
		callback : function(e){
			if(!e.cancel){
				post.latitude = e.latitude;
				post.longitude = e.longitude;
				updateDisplayInfo(post);
			}
		}
	}).getView();
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