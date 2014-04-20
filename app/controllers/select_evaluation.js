
var api = Alloy.Globals.api;
var args = arguments[0] || {};
var selectCallback = args.selectCallback;

function onItemClick(e){
	var item = e.section.items[e.itemIndex];
	var v = item.properties.item;
	Ti.API.debug(v.label + " is selected");
	if(selectCallback) selectCallback(v);
	Alloy.Globals.naviCon.pop();
}

$.select_evaluation.addEventListener("open",function(e){
	var categories = ["未回答","非常に良い","良い","普通","悪い","非常に悪い"];
	var section = $.category_list.sections[0];
	
	var itemData = [];
	
	for(var i in categories){
		var c = categories[i];
		itemData.push({
			properties : {
				height : "25dp",
				//category : c
				item : {value : i,label : c}
			},
			label : {text : c}
		});
	}
	section.items = itemData;
	
});