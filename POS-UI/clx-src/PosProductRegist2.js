/************************************************
 * POSProductRegist2.js
 * Created at 2024. 1. 21. 오후 10:39:49.
 *
 * @author sunrise
 ************************************************/


/*
 * 서치 인풋에서 value-change 이벤트 발생 시 호출.
 * SearchInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onSearchInputValueChange(e){
	var searchInput = app.lookup("srcAccount").value;
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/clientSearch.do';
	submission.responseType = 'text';
	submission.async = false;
	submission.setParameters("CLIENT_NM", searchInput);
	submission.send();
	
	var grd1 = app.lookup("grd1");
	grd1.redraw();
	
	console.log(searchInput);
	
}


/*
 * "확 인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	
	window.opener.postMessage(app.lookup("grd1").getSelectionData(), "*");
	// 선택된 거래처 명
//	var grd1 = app.lookup("grd1").getSelectionData();
//	console.log(grd1);
	window.close();
}
