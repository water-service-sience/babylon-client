

exports.dateToString = function(date){
	if(typeof(date) == "int" || typeof(date) == "string" || typeof(date) == "number"){
		date = new Date(date);
	}
	
	return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" +
	  date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
	
	
}
