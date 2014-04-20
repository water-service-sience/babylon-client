var args = arguments[0] || {};

var answers = {};

var useFrequencyList = [
  {id : 1, label: "週に1日"},
  {id : 2, label: "週に2日"},
  {id : 3, label: "週に3日"},
  {id : 4, label: "週に4日"},
  {id : 5, label: "週に5日"},
  {id : 6, label: "週に6日"},
  {id : 7, label: "毎日"}
];
function selectUseFrequency(e){
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.useFrequency = c.id;
		},
		headerTitle : "このサービスを１週間のうち平均何日使用しましたか？",
		selectItems : useFrequencyList
	}).getView();
	Alloy.Globals.naviCon.open(view);
}

var easinessList = [
    {id : 4, label : "良くわかった"},
    {id : 3, label : "だいたいわかった"},
    {id : 2, label : "あまりわからなかった"},
    {id : 1, label : "ほとんどわからなかった"}
];
function selectEasiness(e){
	
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.easiness = c.id;
		},
		headerTitle : "このアプリの操作方法はわかりましたか?",
		selectItems : easinessList
	}).getView();
	Alloy.Globals.naviCon.open(view);
}

var useList = [
    {id : 4, label : "とても役にたった"},
    {id : 3, label : "役にたった"},
    {id : 2, label : "あまり役に立たなかった"},
    {id : 1, label : "全然役に立たなかった"}
];

function selectUseForImagePost(e){
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.useForImagePost = c.id;
		},
		headerTitle : "画像投稿サービスは農作業の役に立ちましたか？",
		selectItems : useList
	}).getView();
	Alloy.Globals.naviCon.open(view);
}

function selectUseForInquiry(e){
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.useForImageInquiry = c.id;
		},
		headerTitle : "苦情サービスは農作業の役に立ちましたか？",
		selectItems : useList
	}).getView();
	Alloy.Globals.naviCon.open(view);
	
}
function selectUseForFieldMonitoring(e){
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.useForFieldMonitoring = c.id;
		},
		headerTitle : "圃場モニタリングサービスは農作業の役に立ちましたか？",
		selectItems : useList
	}).getView();
	Alloy.Globals.naviCon.open(view);
	
}

var willUseList = [
	{id : 4,label : "是非使いたい"},
	{id : 3,label : "使いたい"},
	{id : 2,label : "使ってもいい"},
	{id : 1,label : "使いたくない"}
];

function selectWillUse(e){
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.useForFieldMonitoring = c.id;
			if(c.id == 1){
				$.costForUse.enabled = false;
				$.costForUse.title = "回答不要";
			}else{
				$.costForUse.enabled = true;
				$.costForUse.title = "未回答";
			}
		},
		headerTitle : "今後、このサービスを継続的に使っていきたいと思いますか？",
		selectItems : willUseList
	}).getView();
	Alloy.Globals.naviCon.open(view);
	
}

var costForUseList = [
    {id : 1, label : "絶対に無料でないと使わない"},
    {id : 2, label : "年額500円以下"},
    {id : 3, label : "年額1000円以下"},
    {id : 4, label : "年額2000円以下"},
    {id : 5, label : "年額5000円以下"},
    {id : 6, label : "年額10000円以下"},
    {id : 7, label : "年額10000円以上"}
];

function selectCostForUse(e){
	
	var view = Alloy.createController("select_list",{
		selectCallback : function(c) {
			e.source.title = c.label;
			answers.costForUse = c.id;
		},
		headerTitle : "１０Rあたり、年額いくらまでならこのサービスを使いたいですか?",
		selectItems : costForUseList
	}).getView();
	Alloy.Globals.naviCon.open(view);
}



function onSendClicked(e){
	answers.age = parseInt($.age.value);
	answers.freeMessage = $.freeMessage.value;
	Ti.API.debug(JSON.stringify(answers));
	Alloy.Globals.api.questionnaireManager.postQuestionnaire(answers,function(r){
		alert("回答ありがとうございました。訂正したい場合は、再度アンケートを送信してください。");
		//Alloy.Globals.naviCon.pop();
	});

}
