var args = arguments[0] || {};



function onSetImage(e){
	$.post.enabled = true;
}

function onRecaptureClicked(){
	$.image_view.showCamera();
}
function onGalleryClicked(){
	$.image_view.showGallery();

}

function onPostClicked(){
	
	$.image_view.postData({
		isInquiry : false,
		isPublic : $.isPublic.value,
		goodness : $.goodness.getView("goodness").value,
		category : 0
	});
}


$.post_work_report.addEventListener("open",function(e){
	
	$.post.enabled = false;
	
	$.image_view.showCamera();
	
});

