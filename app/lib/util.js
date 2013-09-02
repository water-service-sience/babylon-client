

var dateFormat = function(date){
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
