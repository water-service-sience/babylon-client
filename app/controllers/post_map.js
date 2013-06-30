

var preClick = null;

function mapClicked(e)
{
	var anno = e.annotation;
	
	Alloy.Globals.post = anno.post;
	
	var controller = Alloy.createController("post_detail");
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
	

}

$.post_map.addEventListener("open",function(e){
	
	Titanium.Geolocation.getCurrentPosition(function(e){
		var lat = e.coords.latitude;
		var lon = e.coords.longitude;
		
		$.map.setLocation({
	        latitude:lat, longitude:lon, animate:false,
	        latitudeDelta:0.04, longitudeDelta:0.04
	    })
			
	});
	
	Alloy.Globals.api.postManager.getNearByPosts(function(posts) {
		
		var annotations = [];
		for( var i in posts){
			var d = posts[i];
			var anno = Titanium.Map.createAnnotation({
			    latitude:d.lat,
			    longitude:d.lon,
			    title:d.title,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    animate:true,
			    post:d // Custom property to uniquely identify this annotation.
			});	
			annotations.push(anno)
		}
		$.map.annotations = annotations;
	});
	
});
