
var AccessKeyHeader = "BBLN-ACCESS-KEY";
var ServerUrl = "http://localhost:9000";
//var ServerUrl = "http://de24.digitalasia.chubu.ac.jp/babylon";


function DB(){
	var dbName = "userpref";
	this.dbName = dbName;
	
	this.execQuery = function(queries){

	    var db = Titanium.Database.open(dbName);
	    var rows = null;
	    for(var i = 0;i < queries.length ; i+= 1){
	    	var q = queries[i];
	    	try{
	    	    rows = db.execute(q);
	    	}catch(e){
	    		Ti.API.error("DB error" + e);
	    	}
	    }
	    var values = null;
	    if(rows != null){
	    	values = {};
	    	if(rows.getRowCount() > 0){
		    	do{
		    		values[rows.fieldByName("k")] = rows.fieldByName("v");
	    	    }while(rows.next());
	    	}
	    }
	    db.close();
	    return values;
	};
	
	return this;

}
 


function APIClient() {
	var dbName = "userpref";
	
	var db = this.db = new DB();
	


	Ti.API.info("Create table");
	db.execQuery(['CREATE TABLE IF NOT EXISTS KVS (k TEXT,v TEXT);']);
	var allRows =db. execQuery(["select * from KVS;"]);
	var writeDb = function(key , value ){
		db.execQuery([
			"delete from KVS where k = '" + key + "';",
			"insert into KVS VALUES ('" + key + "','" + value + "');",

		]);
	};
	var readDb = function(key){
		var rows = db.execQuery(["select * from KVS where k = '" + key + "';"]);
		Ti.API.debug(rows);
		if(rows){
			return rows[key];
		}else{
			return null;
		}
	};
	var self = this;
	
	var accessKey = readDb("accessKey");
	this.userId = readDb("userId");
	this.nickname = readDb("nickname");
	this.accessKey = accessKey;
	this.isLogin =  this.accessKey && this.accessKey != "";
	Ti.API.info("AK = " + accessKey + " login:" + this.isLogin);
	
	var showError = function(e){
		var code = e.code;
		if(code == 1){
			var dialog = Titanium.UI.createAlertDialog({
				title : "サーバーエラー",
				message : 'サーバーでエラーが発生しました。しばらく時間をおいて再度試してください。'
			});
			dialog.show();
		}
	};
	
	this.get = function(url , params,callback){
		
		if(url.indexOf("http") != 0){
			if(url.indexOf("/") == 0){
				url = ServerUrl + url;
			}else{
				url = ServerUrl + "/" + url;
			}
		}
		Ti.API.log("GET:" + url);
		var c = Ti.Network.createHTTPClient({
			onload : function(e) {
				var ak = this.responseText;
				Ti.API.info("Success - GET:" + url);
				Ti.API.debug(ak);
				var d = JSON.parse(ak);
				callback(d);
			},
			onerror : function(e) {
				Ti.API.error("Fail - GET:" + url + " Error=" + e.error );
				showError(e);
				//callback(null);
			}
		});
		c.open("GET", url);
		if(self.isLogin){
			c.setRequestHeader(AccessKeyHeader,self.accessKey);
		}		
		c.send();
	};
	
	this.post = function(url , params,callback){
		
		if(url.indexOf("http") != 0){
			if(url.indexOf("/") == 0){
				url = ServerUrl + url;
			}else{
				url = ServerUrl + "/" + url;
			}
		}
		var c = Ti.Network.createHTTPClient({
			onload : function(e) {
				var ak = this.responseText;
				Ti.API.info("Success - POST:" + url);
				var d = JSON.parse(ak);
				callback(d);
			},
			onerror : function(e) {
				Ti.API.error("Fail - POST:" + url + " Error=" + e.error);
				showError(e);
				//callback(null);
			}
		});
		c.open("POST", url);
		if(self.isLogin){
			c.setRequestHeader(AccessKeyHeader,self.accessKey);
		}		
		c.setRequestHeader("Content-Type","text/json");
		c.send(JSON.stringify(params));
		
	};
	
	
	this.postBinary = function(url , data,onProgress, callback){
		
		if(url.indexOf("http") != 0){
			if(url.indexOf("/") == 0){
				url = ServerUrl + url;
			}else{
				url = ServerUrl + "/" + url;
			}
		}
		var c = Ti.Network.createHTTPClient({
			onsendstream:function(e){
				Ti.API.debug("Progress " + e.progress);
				onProgress(e);
			},
			onload : function(e) {

				Ti.API.info("Success to upload photo");

				var ak = this.responseText;
				var d = JSON.parse(ak);
				callback(d);
			},
			onerror : function(e) {
				Ti.API.error("Fail to upload photo:" + e.error);
				alert("Fail to upload photo");
				callback(null);
			}
		});

		c.open("POST", url);
		if(self.isLogin){
			c.setRequestHeader(AccessKeyHeader,accessKey);
		}		
		Ti.API.debug("AK=" + accessKey);
		c.send(data);
		
	};
	
	this.createAccount = function(nickname , cb){
		self.post("/create/account",{
			nickname : nickname
		},function(userData){
			if(userData != null){
				self.accessKey = userData.accessKey;
				self.userId = userData.userId;
				self.nickname = userData.nickname;
				Ti.API.info("Success to create account:" + self.userId);
				writeDb("accessKey",self.accessKey);
				writeDb("userId",self.userId);
				writeDb("nickname",self.nickname);
				cb(true);
			}else{
				Ti.API.debug("Fail to create acount");
				cb(false);
			}
		});
		// Local debug用
		/*this.accessKey = "hoge";
		this.userId = 1;
		this.nickname = nickname;
		
		writeDb("nickname",this.nickname);
		writeDb("userId",this.userId);
		writeDb("accessKey",this.accessKey);
		callback(true);*/
		
	};
	
	this.logout = function(){
		Ti.API.debug("Logout");
		self.accessKey = null;
		self.userId = 0;
		self.nickname = null;
		writeDb("accessKey","");
		writeDb("userId","");
		writeDb("nickname","");
	};
	
	
	return this;
}
var client = new APIClient();

function PostManager() {
	
	self = this;
	this.myPosts = [];
	
	this.post = function(image, params,callback){
		Titanium.Geolocation.getCurrentPosition(function(e){
			var lat = e.coords.latitude;
			var lon = e.coords.longitude;
			
			client.postBinary("/photo/upload",
				image,
				function(prog) {
					
				},
				function(result){
					var imageId = result.imageId;
					Ti.API.info("Success to upload image : " + imageId);
				    
				    var obj = params;
				    obj.imageId = imageId;
				    obj.latitude = lat;
				    obj.longitude = lon;
				    
				    client.post("/post",obj,function(post){
				    	post.photo = image;
				    	self.myPosts.push(post);
				    	
				    	Ti.API.info("Success to post:" + post.postId);
						callback(post);
				    });
				});
		});
	};
	
	this.updatePost = function( updateParam , callback){
		client.post("/post/update",updateParam,function(e){
			
			Ti.API.info("Succcess to update post:" + updateParam.postId);
			callback(e);
		});
	};
	
	this.getNearByPosts = function(/*function(postList)*/ callback ){
		
		Titanium.Geolocation.getCurrentPosition(function(e){
			self.getNearPosts(e.coords.latitude,e.coords.longitude,callback);
		});
		
	};
	this.getNearPosts = function(lat,lon,callback){
		var param = {
			lat : lat,
			lon : lon
		};
		
		client.get("/post/near?lon=" + lon + "&lat=" + lat,
		  param,function(posts){
			callback(posts);
		});
	};
	
	this.getMyPosts = function(year,month,callback){
		var param = {
			year : year,
			month : month
		};
		client.get("/post/own",param, function(posts){
			callback(posts);
		});
	};
	
	
	
	this.getPost = function(postId, callback){
		client.get("/post/detail/" + postId,null,function(post){
			callback(post);
		});
	};
	
	this.commentTo = function(postId, message,callback) {
		var param = {
			comment : message
		};
		client.post("/post/comment/" + postId,param,function(c){
			callback(c);
		});
	};
	
	this.getCategories = function(callback){
		client.get("/post/category/all",null,function(r){
			callback(r);
		});
	};
	
	
	return this;
}

function LandManager(){
	
	var self = this;
	
	this.forceUpdate = function(callback){
		
		var lands = Alloy.createCollection("land");
		lands.fetch();
		var list = lands.map(function(l){return l;});
		for(var i in list) list[i].destroy();
		
		self.cache(callback);
	};
	
	this.cache = function(callback){
		var lands = Alloy.createCollection("land");
		
		lands.fetch();
		if(lands.length == 0){
			client.get("/land/list",null,function(result){
					
				for(var i in result){
					var l = result[i];
					var land = Alloy.createModel("land",l);
					land.save();
					
				}
				callback();
			});
		}else{
			callback();
		}
	};
	
	this.getOwnLands = function(){
		var lands = Alloy.createCollection("land");
		
		lands.fetch();
		
		return lands;
	
	};
	
	this.updateOwnLand = function(land,callback){
		client.post("/land/update",land,function(result){
			
			var collection = Alloy.createCollection("land");
			collection.fetch({
				query : "SELECT * from land where id = " + result.id
			});
			
			if(collection.length == 0){
				Ti.API.debug("Create new land:" + result.id);
				var l = Alloy.createModel("land",result);
				l.save();
			}else{
				var l = collection.at(0);
				l.set(result);
				l.save();
			}
			
			callback(result);
		});
	};
	
	return this;
	
}
exports.toImageUrl = function(post){
	if(typeof(post) == "string"){
		return ServerUrl + "/images/" + post;
	}else{
		return ServerUrl + "/images/" + post.imageFile;
	}
};


exports.client = client;
exports.postManager = new PostManager();
exports.landManager = new LandManager();
