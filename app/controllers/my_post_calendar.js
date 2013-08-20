// to fit in a 320-wide space
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

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
	if(e.direction == "left" || e.direction == "up"){
		$.posts.visible = false;
		if(selectedDate) selectedDate.parentTable.top = 0;
		goNextMonth();
	}else if(e.direction == "right" || e.direction == "down"){
		$.posts.visible = false;
		if(selectedDate) selectedDate.parentTable.top = 0;
		goPrevMonth();
	}
}

function onPrevClicked(e){
	
}
function onNextClicked(e){
	
}

function goNextMonth(){
	var oldCalendar = currentCalendarView;
	var y = currentYear;
	var m = currentMonth + 1;
	if(m > 12) {
		m = 1;
		y += 1;
	}
	
	loadPosts(y,m,function(){
		createCalendar(y,m,function(calendar){
			$.calendar.remove(oldCalendar);
			$.calendar.add(calendar);
		});
	});
	
}
function goPrevMonth(){
	var oldCalendar = currentCalendarView;
	var y = currentYear;
	var m = currentMonth - 1;
	if(m < 1) {
		m = 12;
		y -= 1;
	}
	loadPosts(y,m,function(){
		createCalendar(y,m,function(calendar){
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
	
	var rows = [];
	for( var i in posts){
		var p = posts[i];
		
		var row = Ti.UI.createTableViewRow({
			height : 100,
			post : p
		});
		Ti.API.debug("Image = " + api.toImageUrl(p));
		var photo = Ti.UI.createImageView({
			image : api.toImageUrl(p),
			left : 0,
			top : 0,
			bottom : 0,
			width : 100
			
		});
		var time = Ti.UI.createLabel({
			text : util.dateToString(p.posted),
			textAlign : "left",
			left : 100,
			top : 0
		});
		var category = Ti.UI.createLabel({
			text : "Category:" + p.category.label,
			textAlign : "left",
			left : 100,
			top : 30
		});
		
		
		row.add(photo);
		row.add(time);
		row.add(category);
		
		rows.push(row);
		$.postTable.setData(rows);
	}
	
}


function createCell(parent,x,y,date , label ){
	var key = currentYear + "/" + date;
	var posts = postMap[key];
	if(posts == null) posts = [];
	var thisView = Ti.UI.createView({
	    objName:"grid-view",
	    objIndex:cellIndex.toString(),
	    backgroundColor: cellColor,//colorSet[colorSetIndex],
	    left: ySpacer,
	    height: cellHeight,
	    width: cellWidth,
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
    var bodyLabel = Ti.UI.createLabel({
        color:"black",
        font:{fontSize:12,fontWeight:'bold'},
        text: posts.length + "件",
        textAlign : "center",
        touchEnabled:false,
        top : cellHeight / 3
    });
    thisView.add(dateLabel);
    thisView.add(bodyLabel);
    
    thisView.addEventListener("click",onCellClicked)
    
    return thisView;
}

function onPostSelected(e){
	var row = e.row;
	var post = row.post;
	
	Alloy.Globals.post = post;
	
	var controller = Alloy.createController("post_detail");
	var view = controller.getView();
	view.setPost(post);
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
	    top : 1,
	    left: ySpacer,
        color:"black",
   		textAlign : "left",
        font:{fontSize:12,fontWeight:'bold'},
        text: prev + "月"
	}));
	monthHeader.add(Ti.UI.createLabel({
	    left: ySpacer + cellWidth,
	    top : 1,
	    right: ySpacer + cellWidth,
        color:"black",
   		textAlign : "center",
        font:{fontSize:12,fontWeight:'bold'},
        text: year + "年" + month + "月"
	}));
	
	monthHeader.add(Ti.UI.createLabel({
	    backgroundColor: "green",
	    top : 1,
	    right: ySpacer,
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
		    left: ySpacer,
		    height: weekdayLabelHeight,
		    width: cellWidth,
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
			top : y * (cellHeight + ySpacer) + headerHeight
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
 