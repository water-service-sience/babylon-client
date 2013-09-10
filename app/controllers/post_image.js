
var photoData = "";

function onPostClicked(e){
	
	Alloy.Globals.api.postManager.post(photoData,$.goodness.value,function(result){
		
		Alloy.Globals.lastPost = result;
		Alloy.Globals.post = result;
		
		var view = Alloy.createController("edit_post").getView();
		alert("投稿完了");
		Alloy.Globals.naviCon.home();
		Alloy.Globals.naviCon.open(view);
		
	});
	
	
}

function onRecaptureClicked(e){
	showCamera();
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
	});
}

$.post_image.addEventListener("open",function(){
	showCamera();
	$.goodness.value = 50;
	$.post.enabled = false;
});
