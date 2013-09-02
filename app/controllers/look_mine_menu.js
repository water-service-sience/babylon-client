

function onShowCalendarClicked(e){

	var view = Alloy.createController("my_post_calendar").getView();
	Alloy.Globals.naviCon.open(view);
}


function onShowSelfPostClicked(e){
	
	var view = Alloy.createController("my_post_list").getView();
	Alloy.Globals.naviCon.open(view);
}