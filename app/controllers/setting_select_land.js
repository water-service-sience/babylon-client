var api = Alloy.Globals.api;




function onSelectLand(e){
	var item = e.section.getItemAt(e.itemIndex);
	
	if(e.sectionIndex == 1 && e.itemIndex == 1){
		
		$.land_list.sections[0].setItems(
			[{name : { text : "Loading"}}]
		);
		api.landManager.forceUpdate(function(){
			refresh();
		});
		return;
	}
	
	var controller = Alloy.createController("edit_land",{
		land : item.land,
		callback : function(land){
			refresh();
			Alloy.Globals.naviCon.pop();
		}
	});
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
}


function refresh(){
	
	var lands = api.landManager.getOwnLands().map(function(land){
		var l = land.toJSON();
		return {
			land : l,
			name : { text : l.name}
		};
	});
	
	$.land_list.sections[0].setItems(lands);
	
}


api.landManager.cache(refresh);


$.setting_select_land.addEventListener("open",function(e){
	

});