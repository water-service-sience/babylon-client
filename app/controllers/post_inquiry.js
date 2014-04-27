var args = arguments[0] || {};


imageIsSet = false;

function onSetImage(){
	imageIsSet = true;
}

var selectedCategory = 1;

function onSelectCategoryClicked(){

	var view = Alloy.createController("select_category",{
		selectCallback : function(c) {
			selectedCategory = c.id;
			$.category.text = c.label;
		},
		selectedIndex : selectedCategory - 1
	}).getView();
	Alloy.Globals.naviCon.open(view);
}


function onRecaptureClicked(){
	$.image_view.showCamera();
}
function onGalleryClicked(){
	$.image_view.showGallery();
}

function onPostClicked(){
	
	if(!imageIsSet && $.comment.value.length == 0){
		
		alert("写真を選択または、メッセージを入力してください。");
		
		return;
	}
	
	$.image_view.postData({
		isInquiry : true,
		message : $.comment.value,
		category : selectedCategory
	});
}


$.post_inquiry.addEventListener("open",function(e){
	
	
	$.image_view.showCamera();
	
});
