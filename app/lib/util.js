

var dateFormat = function(date){
	if(date == null) return "----";
	
	if(typeof(date) == "int" || typeof(date) == "string" || typeof(date) == "number"){
		date = new Date(date);
	}
	
	return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" +
	  date.getDate() + " " + ("0" + date.getHours()).slice(-2) + ":" + 
	  ("0" + date.getMinutes()).slice(-2);
	
	
};

exports.dateToString = dateFormat;
exports.dateFormat = dateFormat;



exports.goodnessToString = function(goodness){
	if( goodness < 10) return "非常に悪い";
	else if(goodness < 30) return "悪い";
	else if(goodness < 70) return "普通";
	else if(goodness < 90) return "良い";
	else return "非常に良い";
};

exports.niceTimeString = function(date){
	
	if(!date) return "不明";
	if(typeof(date) != "date"){
		date = new Date(date);
	}
	var diff = new Date().getTime() - date.getTime();
	
	var DAY = 24 * 60 * 60 * 1000;
	var HOUR = 60 * 60 * 1000;
	var MINUTE = 60 * 1000;
	// 1日より前
	if(diff > DAY){
		return Math.floor(diff / DAY) + "日前";
	}else if(diff > HOUR){
		return Math.floor(diff / HOUR) + "時間前";
	}else if(diff > MINUTE){
		return Math.floor(diff / MINUTE) + "分前";
	}else{
		return "ちょうど今";
	}
	
};
function getFile(filename){
	if(Ti.Platform.osname == "iphone"){
        	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
			return file;
        }else{
        	var newDir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'datas');
			newDir.createDirectory();
		  
			var file = Ti.Filesystem.getFile(newDir.nativePath,filename);
			return file;
        }
	
}
// アンケートの保存
function FileDB(filename) {
	
	var self = this;
	
	//self.filename = "questionnaire_answer";
	self.filename = filename;
	
	
	this.get = function(){
		var file = getFile(self.filename);
		if(file.exists){
			var content = file.read();
			if(content && content.length > 0){
				try{
					return JSON.parse(content);
				}catch(e){
					self.delete();
				}
			}else{
				return null;
			}
		}else{
			return null;
		}
	};
	
	this.set = function(data){
		var file = getFile(self.filename);
		
		file.write(JSON.stringify(data));
		
	};
	this.delete = function(){
	
		var file = getFile(self.filename);
		file.write("");
	};
	
	return this;
};
exports.questionnaire = new FileDB("questionnaire_answer");
exports.userLoginInfo = new FileDB("userLoginInfo");


