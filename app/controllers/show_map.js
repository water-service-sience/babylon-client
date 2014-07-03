
var api = Alloy.Globals.api;
var util = Alloy.Globals.util;
var preClick = null;

function onZoomInClicked(e){
	$.map.zoom(1);
}
function onZoomOutClicked(e){
	$.map.zoom(-1);
}


function mapClicked(e)
{
	Ti.API.debug("Clicked!!!!!");
}

var selectedPost = null;

function onClickHandler(e){
	
	Ti.API.debug(e.clicksource + " : " + e.type);
	if(e.clicksource == "pin"){
		var annotation = e.annotation;
		var posts = annotation.posts;
		if(!posts) return;
		updatePostList(posts);
    	$.map.selectAnnotation(null);
		
		/*var post = annotation.post;
		
		if(!post)return;
	
		
		//上に情報を表示するために、中心をずらす。
		var lat = post.latitude + $.map.region.latitudeDelta * 0.30;
		
		$.map.setLocation({
	        latitude:lat, longitude:post.longitude, animate:true,
	        latitudeDelta:$.map.region.latitudeDelta, longitudeDelta:$.map.region.longitudeDelta
	    });
	    
	    //画像を表示
	    $.image_balloon.image = api.toImageUrl(post.imageFile);
	    $.balloon.visible = true;
		selectedPost = post;*/
		
	}
	
	
}

function updatePostList(posts){
    var section = $.item_list.sections[0];
    var itemData = [];
  
	for(var i in posts){
		var item = posts[i];
		
		Ti.API.debug(item.imageFile);
		itemData.push({
			properties : {
				height : "64dp",
				//category : c
				item : item
			},
			postUser : {text : item.user.nickname + "さん"},
			postTime : {text : util.dateToString(item.posted)},
			image : {image : api.toImageUrl(item)}
		});
	}
	section.items = itemData;

    $.postList.visible = true;
}

function onListItemClick(e){
	
	var item = e.section.items[e.itemIndex];
	var post = item.properties.item;
	Ti.API.debug(post.id + " is clicked");
	
	var view = Alloy.createController("post_detail",{
		post : post
	}).getView();
	Alloy.Globals.naviCon.open(view);
}
function closeList(){
	
    $.postList.visible = false;
    $.map.selectAnnotation(null);
}

function createCustomView(posts){
	var c = Alloy.createController('post_position_on_map',{
		posts : posts
	});
	return c.getView();
}

function onCloseButtonClicked(e){
	$.balloon.visible = false;
}

function onShowDetailClicked(e){
	if(selectedPost){
		
		var view = Alloy.createController("post_detail",{
			post : selectedPost
		}).getView();
		Alloy.Globals.naviCon.open(view);
		
	}
}

$.map.mapType = Alloy.Globals.Map.NORMAL_TYPE;

$.show_map.addEventListener("open",function(e){
	var annotations = [];
	
	var lastLat;
	var lastLon;
	$.map.addEventListener("click",onClickHandler);
	
	var pinPosts = function(lat,lon){
		lastLat = lat;
		lastLon = lon;
		/*Alloy.Globals.api.postManager.getNearPosts(lat,lon,function(posts) {
			
			for( var i in posts){
				var d = posts[i];
				var anno = Alloy.Globals.Map.createAnnotation({
				    latitude:d.latitude,
				    longitude:d.longitude,
				    customView : createCustomView(d),
				    animate:true,
				    title : "投稿者:" + d.user.nickname,
				    post:d // Custom property to uniquely identify this annotation.
				});	
				//anno.addEventListener("click",onClickHandler);
				annotations.push(anno);
			}
			$.map.annotations = annotations;
		});*/
		api.postManager.getNearGroupedPosts(lat,lon,function(data){
			for(var i in data){
				var d = data[i];
				var customView = createCustomView(d.posts);
				var anno = Alloy.Globals.Map.createAnnotation({
				    latitude:d.latitude,
				    longitude:d.longitude,
				    customView : customView,
				    title : "Loading",
				    
				    animate:false,
				    posts : d.posts
				});	
				//customView.addEventListener("click",onClickHandler);
				annotations.push(anno);
			}
			$.map.annotations = annotations;
		});
	};
	
	$.map.addEventListener("regionchanged",function(e){
		var diff1 = lastLat - e.latitude;
		var diff2 = lastLon - e.longitude;
		var delta = diff1 * diff1 + diff2 * diff2;
		
		var region = $.map.getRegion();
		if(delta > region.latitudeDelta * region.latitudeDelta * 0.5){
			Ti.API.log("Update");
			pinPosts(region.latitude,region.longitude);
		}
		Ti.API.log("Changed:" + e.latitude + " ," + e.longitude);
	});
	
	if(Alloy.Globals.land != null){
		var land = Alloy.Globals.land;
		var lat = land.latitude;
		var lon = land.longitude;
		$.map.setRegion({
	        latitude:lat, longitude:lon,
	        latitudeDelta:0.04, longitudeDelta:0.04
		});
		$.map.setLocation({
	        latitude:lat, longitude:lon, animate:false,
	        latitudeDelta:0.04, longitudeDelta:0.04
	    });
	    var anno = Alloy.Globals.Map.createAnnotation({
				    latitude:lat,
				    longitude:lon,
				    title:land.name,
				    pincolor:Alloy.Globals.Map.ANNOTATION_GREEN,
				    animate:true
				    });	
	    annotations.push(anno);
	    pinPosts(lat,lon);
	}else{
	
		Titanium.Geolocation.getCurrentPosition(function(e){
			if(e.coords){
				var lat = e.coords.latitude;
				var lon = e.coords.longitude;
				$.map.setRegion({
			        latitude:lat, longitude:lon,
			        latitudeDelta:0.04, longitudeDelta:0.04
				});
				$.map.setLocation({
			        latitude:lat, longitude:lon, animate:false,
			        latitudeDelta:0.04, longitudeDelta:0.04
			    });
		    	pinPosts(lat,lon);
	        }else{
				Ti.API.log("GPS is not availbale");
				alert("GPS機能が利用できません。GPSをONにしてください。");
	        	
	        }
				
		});
	}
	
});
