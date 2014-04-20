
var api = Alloy.Globals.api;
var args = arguments[0] || {};
var selectCallback = args.selectCallback;

var selectedIndex = args.selectedIndex | -1;

function onItemClick(e){
	var item = e.section.items[e.itemIndex];
	var category = item.properties.category;
	Ti.API.debug(category.label + " is selected");
	if(selectCallback) selectCallback(category);
	Alloy.Globals.naviCon.pop();
}

$.select_category.addEventListener("open",function(e){
	
	
	api.postManager.getCategories( function(categories){
		
		var section = $.category_list.sections[0];
		
		var itemData = [];
		
		for(var i in categories){
			var c = categories[i];
			itemData.push({
				properties : {
					height : "25dp",
					category : c
				},
				label : {text : c.label}
			});
		}
		section.items = itemData;
		
		
		if(selectedIndex >= 0){
			$.category_list.selectItem(0,selectedIndex);
		}
		
	});

});