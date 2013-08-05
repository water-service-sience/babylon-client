
var postData = null;

function onSaveClicked(){
	
	var param = {
		postId : postData.postId,
		comment : $.comment.value
	};
	
	Alloy.Globals.api.postManager.updatePost(param,function(e){
		
		Alloy.Globals.lastPost = null;
		Alloy.Globals.naviCon.home();
	});
	
}

function onReturnClicked(){
	Alloy.Globals.lastPost = null;

	Alloy.Globals.naviCon.home();

}

$.finish_post.addEventListener("open",function(e){
	postData = Alloy.Globals.lastPost;
	
	var data = [];
	/*data[0]=Ti.UI.createPickerRow({title:'Bananas'});
	data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
	data[2]=Ti.UI.createPickerRow({title:'Mangos'});
	data[3]=Ti.UI.createPickerRow({title:'Grapes'});*/
	//$.category.add(data);
});
