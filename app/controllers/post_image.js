
var photoData = "";

function onPostClicked(e){
	
	var v = $.goodness.getView("goodness").value;
	var params = {
		goodness : v,
		category : selectedCategory,
		comment : $.comment.value
	};
	setCover();
	Alloy.Globals.api.postManager.post(photoData,params,function(result){
		removeCover();
		Alloy.Globals.lastPost = result;
		Alloy.Globals.post = result;
		
		var dialog = Titanium.UI.createAlertDialog({
			title : "投稿完了",
			message : '投稿ありがとうございます。追加の情報は次のページで編集できます。'
		});
		
		Alloy.Globals.naviCon.home();
		dialog.addEventListener('click',function(event){
			var view = Alloy.createController("edit_post").getView();
			Alloy.Globals.naviCon.open(view);
		});
		
		dialog.show();
		
	});
	
	
}

function onRecaptureClicked(e){
	showCamera();
}

function onGalleryClicked(){
	showGallery();
}

function showGallery(){
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			photoData = event.media;
			$.photo.image = event.media;
			$.post.enabled = true;
		}
	});
}

function setCover(){
	$.activityIndicator.show();
	$.post.enabled = false;
	$.recapture.enabled = false;
}
function removeCover(){
	
	$.activityIndicator.hide();
	$.post.enabled = true;
	$.recapture.enabled = true;

}

function showCamera() {
	Titanium.Media.showCamera({
		success : function(event) {
			Ti.API.debug("picture was taken");
			//imageView.image = event.media;
			photoData = event.media;
			$.photo.image = event.media;
			$.post.enabled = true;
		},
		cancel : function() {

		},
		error : function(error) {
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				//a.setMessage('No camera');
			    //a.show();
			    showGallery();
			} else {
				a.setMessage('Unexpected error: ' + error.code);
				a.show();
			}
		},
		//overlay : overlay,
   	    saveToPhotoGallery:false,
		mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
		allowEditing : true
	});
}
var selectedCategory = 0;

function onSelectCategoryClicked(e){
	var post = Alloy.Globals.post;
	var view = Alloy.createController("select_category",{
		selectCallback : function(c) {
			selectedCategory = c.id;
			$.category.text = c.label;
		}
	}).getView();
	Alloy.Globals.naviCon.open(view);
}


$.post_image.addEventListener("open",function(){
	showCamera();
	//$.goodness.value = 50;
	$.post.enabled = false;
});
