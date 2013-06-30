


function setPostAt(index){
	
	var post = Alloy.Globals.api.postManager.myPosts[index];
	
		
	$.photo.image = post.image;
}


$.post_detail.addEventListener("open",function(e){
	
	if(Alloy.Globals.post){
		
	    $.photo.image = Alloy.Globals.post.image;
		  
	}
});
