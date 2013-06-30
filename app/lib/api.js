

function createClient() {
	var c = {
		isLogin : true,
		nickname : "hoge"
	};
	return c;
}
var client = createClient();

function createPostManager() {
	
	
}
function createPostManager(){
	var m = {
		myPosts : [],
		
		post : function(image, goodness){
			Titanium.Geolocation.getCurrentPosition(function(e){
				var lat = e.coords.latitude;
				var lon = e.coords.longitude;
				lat += Math.random()*0.02 - 0.01;
				lon += Math.random()*0.02 - 0.01;
				m.myPosts.push({
					image : image,
					goodness : goodness,
					lon : lon,
					lat : lat,
					category : "その他",
					title : "１分前 その他"
				});
			});
		},
		
		getNearByPosts : function(/*function(postList)*/ callback ){
			
			callback(m.myPosts);
		},
		getMyPosts : function(callback){
			callback(m.myPosts);
		}
	};
	
	return m;
}

function createLandManager(){
	return {
		getOwnLands : function(){
			return [{title : "１番の田んぼ"},
			{title:"２番の田んぼ"},
			{title:"海の田んぼ"}]
		}
		
	};
	
}



exports.client = client;
exports.postManager = createPostManager();
exports.landManager = createLandManager();
