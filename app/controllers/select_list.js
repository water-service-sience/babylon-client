
var api = Alloy.Globals.api;
var args = arguments[0] || {};
var selectCallback = args.selectCallback;
var headerTitle = args.headerTitle;
var selectItems = args.selectItems;

function onItemClick(e){
	var item = e.section.items[e.itemIndex];
	var v = item.properties.item;
	Ti.API.debug(v.label + " is selected");
	if(selectCallback) selectCallback(v);
	Alloy.Globals.naviCon.pop();
}

$.select_list.addEventListener("open",function(e){
	var section = $.item_list.sections[0];
	section.headerView = Ti.UI.createLabel({
		height : "auto",
		wordWrap : true,
		width : "100%",
		text : headerTitle,
		backgroundColor : "#e0ffff",
		borderRadius : "5dp",
		borderColor : "#80ffff",
		borderWidth : "1dp"		
	});
	//section.headerTitle = headerTitle;
	var itemData = [];
	
	for(var i in selectItems){
		var item = selectItems[i];
		itemData.push({
			properties : {
				height : "25dp",
				//category : c
				item : item
			},
			label : {text : item.label}
		});
	}
	section.items = itemData;
	
});