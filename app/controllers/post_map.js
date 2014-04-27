

var args = arguments[0] || {};

var post = args.post || Alloy.Globals.post;

var preClick = null;

$.map.mapType = Alloy.Globals.Map.NORMAL_TYPE;

$.post_map.addEventListener("open",function(e){
	
	var lat = post.latitude;
	var lon = post.longitude;
	
	$.map.setLocation({
        latitude:lat, longitude:lon, animate:false,
        latitudeDelta:0.04, longitudeDelta:0.04
    });
	var annotations = [];
    var anno = Alloy.Globals.Map.createAnnotation({
	    latitude:lat,
	    longitude:lon,
	    title:util.dateFormat(post.posted),
	    pincolor:Alloy.Globals.Map.ANNOTATION_GREEN,
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
					pincolor = Alloy.Globals.Map.ANNOTATION_RED;
				}else{
					pincolor = Alloy.Globals.Map.ANNOTATION_RED;
				}
				
				var anno = Alloy.Globals.Map.createAnnotation({
				    latitude:d.latitude,
				    longitude:d.longitude,
				    title: "ここです。",
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
