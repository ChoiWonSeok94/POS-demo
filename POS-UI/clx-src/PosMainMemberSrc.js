/************************************************
 * PosMainMemberSrc.js
 * Created at 2024. 2. 21. 오전 11:03:33.
 *
 * @author sunrise
 ************************************************/
var memSerNoList = [];
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	window.addEventListener("message", function getPostMessage(e) {
		app.lookup("windowOpt").value = e.data;
		
//		var mobPhNo = e.data;
//		var mobPhNo = sessionStorage.getItem("MOB_PH_NO");
		var mobPhNo = app.lookup("windowIpb").value;
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/srcMemInfo.do';
		submission.responseType = "javascript";
		submission.setParameters("MOB_PH_NO", mobPhNo);
		submission.addEventListener("receive", function(e){
			var submi = e.control;
			var jsonObj = JSON.parse(submi.xhr.responseText);
			var grd1 = app.lookup("selectMemInfo");
			var idNo = '';
			var persCopTy = '';
			memSerNoList = [];
			for(var i=0 ; i < jsonObj['memberInfo'].length ; i++){
				if(jsonObj['memberInfo'][i]['PERS_COP_TY'] == '1'){
					idNo = jsonObj['memberInfo'][i]['ID_NO'];
					persCopTy = '개인';
				}else{
					idNo = jsonObj['memberInfo'][i]['BUSI_NO'];
					persCopTy = '법인';
				}
				memSerNoList.push(jsonObj['memberInfo'][i]['MEMB_SER_NO']);
				
				grd1.insertRowData(i, true, {
					MEMB_NM : jsonObj['memberInfo'][i]['MEMB_NM']
					,MOB_PH_NO : jsonObj['memberInfo'][i]['MOB_PH_NO']
					,ID_NO : idNo
					,PERS_COP_TY : persCopTy
				}, false);
			} // for문 종료
			
		});
		submission.send();
	});
}

/*
 * "보내기 버튼" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	
	console.log(memSerNoList);
	var memInfoGrd = app.lookup("selectMemInfo");
	var rowIndex = memInfoGrd.getSelectedRowIndex();
	
	var memInfo = {
		MEMB_NM : memInfoGrd.getCellValue(rowIndex, "MEMB_NM")
		,MOB_PH_NO : memInfoGrd.getCellValue(rowIndex, "MOB_PH_NO")
		,ID_NO : memInfoGrd.getCellValue(rowIndex, "ID_NO")
		,PERS_COP_TY : memInfoGrd.getCellValue(rowIndex, "PERS_COP_TY")
		,MEMB_SER_NO : memSerNoList[rowIndex]
	}
	window.opener.postMessage(memInfo, "*");
	window.close();
}

/*
 * "확 인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	onBtn1Click(e);
}
