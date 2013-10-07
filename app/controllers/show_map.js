
var util = Alloy.Globals.util;
var preClick = null;




function mapClicked(e)
{
	var anno = e.annotation;
	Ti.API.debug("Anno = " + anno + " : " + anno.post);
	
	if(anno.post != null){
		Alloy.Globals.post = anno.post;
		
		var controller = Alloy.createController("post_detail");
		var view = controller.getView();
		Alloy.Globals.naviCon.open(view);
	}
	

}

$.show_map.addEventListener("open",function(e){
	var annotations = [];
	var pinPosts = function(lat,lon){
		Alloy.Globals.api.postManager.getNearPosts(lat,lon,function(posts) {
			Ti.API.debug("Near posts are " + posts);
			
			for( var i in posts){
				var d = posts[i];
				var anno = Titanium.Map.createAnnotation({
				    latitude:d.latitude,
				    longitude:d.longitude,
				    title: util.dateFormat(d.posted),
				    pincolor:Titanium.Map.ANNOTATION_RED,
				    animate:true,
				    post:d // Custom property to uniquely identify this annotation.
				});	
				annotations.push(anno);
			}
			$.map.annotations = annotations;
		});
	};
	
	if(Alloy.Globals.land != null){
		var land = Alloy.Globals.land;
		var lat = land.latitude;
		var lon = land.longitude;
		$.map.setLocation({
	        latitude:lat, longitude:lon, animate:false,
	        latitudeDelta:0.04, longitudeDelta:0.04
	    });
	    var anno = Titanium.Map.createAnnotation({
				    latitude:lat,
				    longitude:lon,
				    title:land.name,
				    pincolor:Titanium.Map.ANNOTATION_GREEN,
				    animate:true
				    });	
	    annotations.push(anno);
	    pinPosts(lat,lon);
	}else{
	
		Titanium.Geolocation.getCurrentPosition(function(e){
			var lat = e.coords.latitude;
			var lon = e.coords.longitude;
			$.map.setLocation({
		        latitude:lat, longitude:lon, animate:false,
		        latitudeDelta:0.04, longitudeDelta:0.04
		    });
	    	pinPosts(lat,lon);
				
		});
	}
	
	
});
