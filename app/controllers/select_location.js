
/**
 * Args
 * {
 * 	land : _land_data_,
 *  callback : function(_land_)
 * }
 */

var api = Alloy.Globals.api;


var args = arguments[0] || {};

var callback = args.callback || function(e){
	if(e.cancel){
		Ti.API.debug("Canceled");
	}else{
		Ti.API.debug("Location = " + e.lat + ":" + e.lon);
	}
};

var location = {
	latitude : (args.latitude || args.lat),
	longitude : (args.longitude || args.lon)
};


function onOkClicked(){
	callback({
		cancel : false,
		latitude : location.latitude,
		longitude : location.longitude
	});
	Alloy.Globals.naviCon.pop();
}


var newLocation = null;

function onMapRegionChanged(evt){
	
	if(!newLocation){
		newLocation = newPin(evt.latitude,evt.longitude,"ここに変更");
		$.map.addAnnotation(newLocation);
	}
	location = evt;
	newLocation.latitude = evt.latitude;
	newLocation.longitude = evt.longitude;
	$.map.selectAnnotation(newLocation);
	
}

function newPin(lat , lon, name, type) {
	

	var pin = Alloy.Globals.Map.createAnnotation({
	    latitude:lat,
	    longitude:lon,
	    title:name,
	    pincolor: Alloy.Globals.Map.ANNOTATION_BLUE,
	    animate:false,
	    image : type,
	    leftButton: "./images/appcelerator_small.png",
	});
	
	return pin;
}


function init(){
	//現在地を設定し、ピンをたてる
	
	if(!location){
		
		Titanium.Geolocation.getCurrentPosition(function(e){
			var lat = e.coords.latitude;
			var lon = e.coords.longitude;
			$.map.setLocation({
				latitude : lat, longitude : lon, animate : false,
				latitudeDelta : 0.04,
				longitudeDelta : 0.04
			});
			location.latitude = lat;
			location.longiude = lon;
		});
		
	}else{
	
		$.map.setLocation({
		    latitude:location.latitude, longitude:location.longitude, animate:false,
		    latitudeDelta:0.04, longitudeDelta:0.04
		});
	}
	
	
}

init();

$.select_location.addEventListener("open",function(){
	
	
	currentLocation = newPin(location.latitude,location.longitude,"現在地","land_mark.png");
	
	$.map.annotations = [currentLocation,];
	$.map.selectAnnotation(currentLocation);
	
	$.map.addEventListener("regionchanged",onMapRegionChanged);
});
