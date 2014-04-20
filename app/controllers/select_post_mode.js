var args = arguments[0] || {};



function onWorkReportModeClicked(e){
	
	var view = Alloy.createController("post_work_report").getView();
	
	Alloy.Globals.naviCon.open(view);
	
}

function onInquiryModeClicked(e){
	
	var view = Alloy.createController("post_inquiry").getView();
	
	Alloy.Globals.naviCon.open(view);
}
