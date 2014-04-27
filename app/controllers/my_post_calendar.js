// to fit in a 320-wide space
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

Ti.API.info('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
Ti.API.info('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
if(Ti.Platform.osname === 'android'){
  Ti.API.info('Ti.Platform.displayCaps.xdpi: ' + Ti.Platform.displayCaps.xdpi);
  Ti.API.info('Ti.Platform.displayCaps.ydpi: ' + Ti.Platform.displayCaps.ydpi);
  Ti.API.info('Ti.Platform.displayCaps.logicalDensityFactor: ' + Ti.Platform.displayCaps.logicalDensityFactor);
}

var api = Alloy.Globals.api;
var util = Alloy.Globals.util;
 
var monthHeaderHeight = 25;
var weekdayLabelHeight = 20;

var headerHeight = monthHeaderHeight + weekdayLabelHeight + 2;
var xSpacer = 5;
var ySpacer = 5;
var cellWidth = (pWidth - 8 * xSpacer) / 7;
var cellHeight = cellWidth * 1.2;
var xGrid = 7;
var yGrid = 4;
var cellColor = "#fffae5";
var selectedCellColor = "#ffccd8";
 
var tableData = [];
 
var colorSet = [
                "#D44646",
                "#46D463",
                "#46D4BE",
                "#C2D446",
                "#D446D5",
                "#4575D5",
                "#E39127"
              ];
var weekdayLabels = [
  "Sun","Mon","Tue","Wed","Thu","Fry","Sat"
];
              
 
var colorSetIndex = 0;
var cellIndex = 0;
var selectedDate = null;
var currentCalendarView = null;
var currentYear = 2013;
var currentMonth = 1;

function onSwiped(e) {
	$.posts.visible = false;
	if(selectedDate) selectedDate.parentTable.top = 0;
	if(e.direction == "left"){
		goNextMonth();
	}else if(e.direction == "right"){
		goPrevMonth();
	}else if(e.direction == "up"){
		goPrevYear();
	}else if(e.direction == "down"){
		goNextYear();
	}
}

function onPrevClicked(e){
	
}
function onNextClicked(e){
	
}

function goNextMonth(){
	var y = currentYear;
	var m = currentMonth + 1;
	if(m > 12) {
		m = 1;
		y += 1;
	}
	goToMonth(y,m);
	
}
function goPrevMonth(){
	var y = currentYear;
	var m = currentMonth - 1;
	if(m < 1) {
		m = 12;
		y -= 1;
	}
	goToMonth(y,m);
}

function goNextYear(){
	var y = currentYear + 1;
	var m = currentMonth;
	goToMonth(y,m);
}
function goPrevYear(){
	var y = currentYear - 1;
	var m = currentMonth;
	goToMonth(y,m);

}

function goToMonth(year,month){
	
	var oldCalendar = currentCalendarView;
	loadPosts(year,month,function(){
		createCalendar(year,month,function(calendar){
			$.calendar.remove(oldCalendar);
			$.calendar.add(calendar);
		});
	});
}


var postTable;

function onCellClicked( e ) {
	var cell = e.source;
	var parent = cell.parentTable;
	if(e.source.date == "--") return;
	if(selectedDate == e.source){
		e.source.backgroundColor = cellColor;
		e.source.parentTable.top = 0;
		selectedDate = null;
		
		$.posts.visible = false;
	}else{
		if(selectedDate) selectedDate.backgroundColor = cellColor;
		e.source.backgroundColor = selectedCellColor;
		
		selectedDate = e.source;
		e.source.parentTable.top = Math.min(0,
			 50 - (selectedDate.yIndex * cellHeight + headerHeight)
		);
		
		$.posts.top = cellHeight * 2.5;
		$.posts.visible = true;
		$.posts.bottom = 0;
		updatePostTableView(cell.posts);
		
		/*var anim = Titanium.UI.createAnimation({
				duretion : 500,
				top : cellHeight * 3,
				visible : true
			});
		anim.addEventListener('complete', function(){ 
			anim.removeEventListener("complete");
			$.posts.animate(anim);
		});*/
		
	}
}

function updatePostTableView(posts){
	
	var dataSet = [];
	for(var i in posts){
		var p = posts[i];
		dataSet.push({properties : {
			height : "105dp"
			},
				post : p,
			  thumbnail : { image : api.toImageUrl(p)},
			  date : { text : util.dateToString(p.posted)},
			  category : {text : p.category.label}
			});
	}
	$.postTable.sections[0].setItems(dataSet);
	
	
}


function createCell(parent,x,y,date , label ){
	var key = currentYear + "/" + date;
	var posts = postMap[key];
	if(posts == null) posts = [];
	var thisView = Ti.UI.createView({
	    objName:"grid-view",
	    objIndex:cellIndex.toString(),
	    backgroundColor: cellColor,//colorSet[colorSetIndex],
	    left: ySpacer + "px",
	    height: cellHeight + "px",
	    width: cellWidth + "px",
	    parentTable : parent,
	    xIndex : x,
	    yIndex : y,
	    date : date,
	    posts : posts
	});
	var dateLabel = Ti.UI.createLabel({
        color:"black",
        font:{fontSize:12,fontWeight:'bold'},
        textAlign : "center",
        text:date,
        touchEnabled:false,
        top : 0
    });
    
    var label = "";
    if(posts.length > 0){
    	label = posts.length + "件";
    }
    
    var bodyLabel = Ti.UI.createLabel({
        color:"black",
        font:{fontSize:12,fontWeight:'bold'},
        text: label,
        textAlign : "center",
        touchEnabled:false,
        top : (cellHeight / 3) + "px"
    });
    thisView.add(dateLabel);
    thisView.add(bodyLabel);
    
    thisView.addEventListener("click",onCellClicked);
    
    return thisView;
}

function onPostSelected(e){
	var item = e.section.getItemAt(e.itemIndex);
	var post = item.post;
	
	Alloy.Globals.post = post;
	
	var controller = Alloy.createController("post_detail");
	var view = controller.getView();
	Alloy.Globals.naviCon.open(view);
}


function createDateList(year,month){
	//var isLeap = !(new Date(year, 1, 29).getMonth()-1)
	var thisMonth = new Date(year,month - 1,1);
	var dateLabels = [];
	var weekday = thisMonth.getDay();
	for(var i = 0;i < weekday ; i++){
		dateLabels.push("--");
	}
	var days = new Date(year,month,0).getDate();
	for(var i = 1;i <= days ; i++){
		dateLabels.push(month + "/" + i);
	}
	var left = 6 - (dateLabels.length - 1 % 7);
	for(var i = 1; i <= left;i++){
		dateLabels.push("--");
	}
	return dateLabels;
}

function createMonthHeader(year,month) {
	var prev = month - 1;
	if(prev <= 0){
		prev += 12;
	}
	var next = month + 1;
	if(next > 12){
		next -= 12;
	}
	var monthHeader = Ti.UI.createView({
		layout:'absolute',
		top : 0
	});
	monthHeader.add(Ti.UI.createLabel({
	    backgroundColor: "green",
	    top : "1px",
	    left: ySpacer + "px",
        color:"black",
   		textAlign : "left",
        font:{fontSize:12,fontWeight:'bold'},
        text: prev + "月"
	}));
	monthHeader.add(Ti.UI.createLabel({
	    left: ySpacer + cellWidth,
	    top : "1px",
	    right: (ySpacer + cellWidth) + "px",
        color:"black",
   		textAlign : "center",
        font:{fontSize:12,fontWeight:'bold'},
        text: year + "年" + month + "月"
	}));
	
	monthHeader.add(Ti.UI.createLabel({
	    backgroundColor: "green",
	    top : "1px",
	    right: ySpacer + "px",
        color:"black",
   		textAlign : "right",
        font:{fontSize:12,fontWeight:'bold'},
        text: next + "月"
	}));
	return monthHeader;
}


function createCalendar(year,month,callback){
	currentYear = year;
	currentMonth = month;
	Ti.API.debug("Create calendar " + year + "/" + month);
	
	var thisTable = Ti.UI.createView({
		layout : 'absolute'
	});
	var dateLabels = createDateList(year,month);
	
	var monthHeader = createMonthHeader(year,month);
	thisTable.add(monthHeader);
	
	var weekdayHeader = Ti.UI.createView({
		layout:'horizontal',
		top : monthHeaderHeight
	});
	for(var x = 0;x < xGrid;x++){
		var thisView = Ti.UI.createLabel({
		    objName:"grid-view",
		    backgroundColor: colorSet[x],
		    left: ySpacer + "px",
		    height: weekdayLabelHeight + "px",
		    width: cellWidth + "px",
	        color:"black",
       		textAlign : "center",
	        font:{fontSize:12,fontWeight:'bold'},
	        text:weekdayLabels[x]
		});
		weekdayHeader.add(thisView);
	}
	thisTable.add(weekdayHeader);
	yGrid = dateLabels.length / 7;
	
	for (var y=0; y<yGrid; y++){
		var thisRow = Ti.UI.createView({
			layout:'horizontal',
			top : (y * (cellHeight + ySpacer) + headerHeight)  + "px"
		});
		thisTable.add(thisRow);
	    for (var x=0; x<xGrid; x++){
	        thisRow.add(createCell(thisTable,x,y,dateLabels[y*7 + x],"hoge"));
	        cellIndex++;
	        colorSetIndex++;
	 
	        if( colorSetIndex === colorSet.length ){
	            colorSetIndex = 0;
	        }
	    }
	}
	
	thisTable.addEventListener("swipe",onSwiped);
	currentCalendarView = thisTable;
	callback(thisTable);
	
}

 
function loadPosts(year,month ,callback){
	
	api.postManager.getMyPosts(year,month, function(posts){
		
		postMap = {};
		for(var i in posts){
			var p = posts[i];
			var date = new Date(p.posted);
			var key = (date.getFullYear()) + "/" + (date.getMonth() + 1) + "/" + date.getDate();
			
			Ti.API.debug("Post:" + i + " key = " + key);
			if(!postMap[key]){
				postMap[key] = [];
			}
			postMap[key].push(p);
		}
		
		callback(postMap);
	});
}


var postMap = {};

$.my_post_calendar.addEventListener("open",function(){
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	$.postTable.addEventListener('click', onPostSelected);/* function(e){
	    var index     = e.index;
	    var section  = e.section;
	    var row       = e.row;
	    var rowdata = e.rowData;
	});*/
	
	loadPosts(year,month,function(){
		createCalendar(year, month, function(calendarView){
			$.calendar.add(calendarView);
		});
		
	});
	
	
});
 