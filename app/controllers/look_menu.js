
function onSelectOwnLand(e){
	var land = e.section.items[e.itemIndex].land;
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
	
	var lands = api.landManager.getOwnLands().map(function(land){
		var l = land.toJSON();
		return {
			land : l,
			name : { text : l.name}
		};
	});
	var section = Ti.UI.createListSection({ headerTitle: '農地'});
	section.setItems(lands);
	$.my_lands.sections = [section];
	
});
