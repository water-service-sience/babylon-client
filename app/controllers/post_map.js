

var preClick = null;

function mapClicked(e)
{
	var anno = e.annotation;
	
	
	var controller = Alloy.createController("post_detail");
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
	

}

$.post_map.addEventListener("open",function(e){
	var post = Alloy.Globals.post;
	
	var lat = post.latitude;
	var lon = post.longitude;
	
	$.map.setLocation({
        latitude:lat, longitude:lon, animate:false,
        latitudeDelta:0.04, longitudeDelta:0.04
    });
	var annotations = [];
    var anno = Titanium.Map.createAnnotation({
	    latitude:lat,
	    longitude:lon,
	    title:post.title,
	    pincolor:Titanium.Map.ANNOTATION_RED,
	    animate:true,
	    post:post // Custom property to uniquely identify this annotation.
	});	
    annotations.push(anno);
	
	Alloy.Globals.api.postManager.getNearPosts(lat,lon,function(posts) {
		Ti.API.debug("Near posts are " + posts);
		for( var i in posts){
			var d = posts[i];
			if(d.id != post.id){
				var pincolor = 0;
				if(d.userId == api.userId){
					pincolor = Titanium.Map.ANNOTATION_BLUE;
				}else{
					pincolor = Titanium.Map.ANNOTATION_GREEN;
				}
				
				var anno = Titanium.Map.createAnnotation({
				    latitude:d.latitude,
				    longitude:d.longitude,
				    title:d.title,
				    pincolor:pincolor,
				    animate:true,
				    post:d // Custom property to uniquely identify this annotation.
				});	
				annotations.push(anno);
			}
		}
		$.map.annotations = annotations;
	});
	
});
