var args = arguments[0] || {};


var evaluation = 0;
function onSelectEvaluation(e){
	
	var view = Alloy.createController("select_evaluation",{
		selectCallback : function(c) {
			//selectedCategory = c.id;
			$.total_eval.text = c.label;
			evaluation = c.value;
		}
	}).getView();
	Alloy.Globals.naviCon.open(view);
	
}

function onSendClicked(e){
	Alloy.Globals.api.questionnaireManager.postQuestionnaire(evaluation,$.note.value,function(r){
		alert("回答ありがとうございました。");
		Alloy.Globals.naviCon.pop();
		
	});

}
