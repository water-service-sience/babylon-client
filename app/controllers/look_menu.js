

function onSelectOwnLand(e){
	//alert(e.section.items[e.itemIndex].properties.title + " : " + e.itemIndex);
	
	var view = Alloy.createController("show_map").getView();
	Alloy.Globals.naviCon.open(view);
}

function onShowMapClicked(e){
	
	var view = Alloy.createController("show_map").getView();
	Alloy.Globals.naviCon.open(view);
}
function onShowSelfPostClicked(e){
	
	var view = Alloy.createController("my_post_list").getView();
	Alloy.Globals.naviCon.open(view);
}


$.look_menu.addEventListener("open",function(e){
	
	var lands = Alloy.Globals.api.landManager.getOwnLands();
	var dataSet = [];
	for(var i in lands){
		var l = lands[i];
		dataSet.push({properties : l});
	}
	var section = Ti.UI.createListSection({ headerTitle: '農地'});
	section.setItems(dataSet);
	$.my_lands.sections = [section];
	
});
