
/**
 * Args
 * {
 * 	land : _land_data_,
 *  callback : function(_land_)
 * }
 */

var api = Alloy.Globals.api;


var args = arguments[0] || {};

var callback = args.callback || function(land){
	Ti.API.debug("Update " + land.name);
};

var land = args.land || {
	id : -1,
	name : "new land",
	latitude : 35.0001,
	longitude : 135.0001 
};

var location = args.location;
var name = args.name;



function onDeleteClicked(){
	var alert = Titanium.UI.createAlertDialog(
		{ title: '削除確認',
		message: '農地情報を削除してもよろしいですか？', 
		buttonNames: ['Yes', 'No'], cancel: 1 });
	
	
	alert.show();
}

function onOkClicked(){
	land.name = $.name.value;
	if(newLocation){
		land.latitude = newLocation.latitude;
		land.longitude = newLocation.longitude;
	}
	
	api.landManager.updateOwnLand(land,function(body){
		land = body;
		callback(body);
		
		
	});
}


var currentLocation = null;
var newLocation = null;


function onMapClicked(evt){
	
	if(evt.clicksource == "pin"){
		/*if(newLocation){
			$.map.removeAnnotation(newLocation);
			newLocation = null;
		}*/
	}else{
	}
}
function onMapRegionChanged(evt){
	
	if(!newLocation){
		newLocation = newPin(evt.latitude,evt.longitude,"ここに変更");
		$.map.addAnnotation(newLocation);
	}
	
	newLocation.latitude = evt.latitude;
	newLocation.longitude = evt.longitude;
	$.map.selectAnnotation(newLocation);
	
}

function newPin(lat , lon, name, type) {
	

	var pin = Titanium.Map.createAnnotation({
	    latitude:lat,
	    longitude:lon,
	    title:name,
	    pincolor: Ti.Map.ANNOTATION_BLUE,
	    animate:false,
	    image : type,
	    leftButton: "./images/appcelerator_small.png",
	});
	
	return pin;
}


function init(){
	//現在地を設定し、ピンをたてる
	
	$.map.setLocation({
	    latitude:land.latitude, longitude:land.longitude, animate:false,
	    latitudeDelta:0.04, longitudeDelta:0.04
	});
	
	
	$.name.value = land.name;
}

init();

$.select_location.addEventListener("open",function(){
	
	
	currentLocation = newPin(land.latitude,land.longitude,land.name,"land_mark.png");
	
	$.map.annotations = [currentLocation,];
	$.map.selectAnnotation(currentLocation);
	
	$.map.addEventListener("regionchanged",onMapRegionChanged);
});
