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
//function onSearchInputValueChange(e){
//	var searchInput = app.lookup("srcAccount").value;
//	var submission = new cpr.protocols.Submission();
//	submission.action = '/POS/clientSearch.do';
//	submission.responseType = 'text';
//	submission.async = false;
//	submission.setParameters("CLIENT_NM", searchInput);
//	submission.send();
//	
//	var grd1 = app.lookup("grd1");
//	grd1.redraw();
//	
//	console.log(searchInput);
//	
//}


/*
 * "확 인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var grd1 = app.lookup("grd1");
	window.opener.postMessage({
		CLIENT_NM : grd1.getCellValue(grd1.getSelectedRowIndex(), "CLIENT_NM")
		,CLIENT_NO : app.lookup("clientNo").value
	}, "*");
	// 선택된 거래처 명
//	var grd1 = app.lookup("grd1").getSelectionData();
//	console.log(grd1);
	window.close();
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("clientList").clear();
}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSrcAccountSearch(e){
	var srcAccount = app.lookup("srcAccount").value;
	app.lookup("clientList").clear();
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/srcClientByName.do';
	submission.responseType = 'javascript';
	submission.async = false;
	submission.setParameters("CLIENT_NM", srcAccount);
	submission.addEventListener("receive", function(e){
		var submi = e.control;
		var grd1 = app.lookup("grd1");
		var jsonObj = JSON.parse(submi.xhr.responseText);
		console.log('가져온 거래처 목록 = ' + submi.xhr.responseText);
		debugger
		if(jsonObj['clientList'].length != 0){
			var idNo = '';
			for(var i=0 ; i < jsonObj['clientList'].length ; i++){
				if(jsonObj['clientList'][i]['ID_NO'] !== ''){
					idNo = jsonObj['clientList'][i]['ID_NO'];
				}else{
					idNo = jsonObj['clientList'][i]['BUSI_NO'];
				}
				grd1.insertRowData(i, true, {
					CLIENT_NM : jsonObj['clientList'][i]['CLIENT_NM']
					,REPRES_NM : jsonObj['clientList'][i]['REPRES_NM']
					,ID_NO : idNo
				}, true);	
			}
		}else{
			alert('조회된 정보가 없습니다');
			app.lookup("clientList").clear();
			app.lookup("grd1").redraw();
		}
		
	});
	submission.send();
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = app.lookup("grd1");
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/srcClientByName.do';
	submission.responseType = 'javascript';
	submission.setParameters("CLIENT_NM", grd1.getCellValue(grd1.getSelectedRowIndex(), "CLIENT_NM"));
	submission.addEventListener("receive", function(e){
		var submi = e.control;
		var grd1 = app.lookup("grd1");
		var jsonObj = JSON.parse(submi.xhr.responseText);
		
		var clientNo = app.lookup("clientNo");
		clientNo.value = jsonObj['clientList'][0]['CLIENT_NO'];
		console.log(clientNo.value);
	})
	submission.send();
}
