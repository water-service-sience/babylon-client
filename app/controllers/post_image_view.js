var args = arguments[0] || {};


var photoData;

var setImageEvent = "setImage";

function showCamera() {
	
	Titanium.Media.showCamera({
		success : function(event) {
			Ti.API.debug("picture was taken");
			//imageView.image = event.media;
			photoData = event.media;
			$.photo.image = event.media;
			$.trigger(setImageEvent,{photo : photoData});
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

function showGallery(){
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			photoData = event.media;
			$.photo.image = event.media;
			$.trigger(setImageEvent,{photo : photoData});
		}
	});
}

function postData(data) {
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.PLAIN;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'white',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: 'Uploading...',
	  indicatorDiameter : "50dp",
	  style:style,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	var currentWindow = Alloy.Globals.naviCon.getCurrentWindow();
	var coverWindow = Ti.UI.createWindow({
	    backgroundColor: '#555555',
		fullscreen : true,
	    opacity : 0.6
	});
	var indicatorWindow = Ti.UI.createWindow({
	  fullscreen: true
	});
	indicatorWindow.add(activityIndicator);
	indicatorWindow.addEventListener("open",function(){
		activityIndicator.show();
	});
	coverWindow.open();
	indicatorWindow.open();
	
	Alloy.Globals.api.postManager.post(photoData,data,function(result){
		indicatorWindow.close();
		coverWindow.close();
		activityIndicator.hide();
		
		if(result){
			Alloy.Globals.lastPost = result;
			Alloy.Globals.post = result;
			var dialog = Titanium.UI.createAlertDialog({
				title : "投稿完了",
				message : '投稿ありがとうございます。'
			});
			Alloy.Globals.naviCon.home();
			dialog.show();
		}else{
			var dialog = Titanium.UI.createAlertDialog({
				title : "投稿失敗",
				message : '投稿に失敗しました。ネットワークを確認して、再度投稿してください'
			});
			dialog.show();
			
		}
		
	});
	
	
}

exports.showCamera = showCamera;
exports.showGallery = showGallery;
exports.postData = postData;

/*
$.post_image_view.addEventListener("open",function(){
	showCamera();
});*/
