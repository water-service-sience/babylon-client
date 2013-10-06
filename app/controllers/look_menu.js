
function onSelectOwnLand(e){
	var land = e.section.items[e.itemIndex].properties.land;
	Alloy.Globals.land = land;
	var view = Alloy.createController("show_map").getView();
	Alloy.Globals.naviCon.open(view);
}

function onShowMapClicked(e){
	Alloy.Globals.land = null;
	var view = Alloy.createController("show_map").getView();
	Alloy.Globals.naviCon.open(view);
}


$.look_menu.addEventListener("open",function(e){
	
	var lands = Alloy.Globals.api.landManager.getOwnLands();
	var dataSet = [];
	for(var i in lands){
		var l = lands[i];
		dataSet.push({
			properties : {
				//height : "20dp",
				land : l
			},
			name : {text : l.name}
		});
	}
	var section = Ti.UI.createListSection({ headerTitle: '農地'});
	section.setItems(dataSet);
	$.my_lands.sections = [section];
	
});
