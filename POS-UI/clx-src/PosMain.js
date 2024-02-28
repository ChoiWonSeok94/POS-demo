/************************************************
 * PointOfSales.js
 * Created at 2024. 1. 17. 오후 3:49:30.
 *
 * @author sunrise
 ************************************************/

var openWindow = null;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	window.addEventListener("message", function getPostMessage(e) {
		debugger
		if (e.data['version'] === undefined) {
			app.lookup("MEMB_SER_NO").value = e.data['MEMB_SER_NO'];
			app.lookup("PH_NO").value = e.data['MOB_PH_NO'];
			app.lookup("MEMB_NM").value = e.data['MEMB_NM'];
			if(e.data['PERS_COP_TY'] == '개인'){
				app.lookup("ID_NO").value = e.data['ID_NO'];
			}else{
				app.lookup("BUSI_NO").value = e.data['ID_NO'];
			}
			
//			var submission = new cpr.protocols.Submission();
//			submission.action = "/POS/srcMemInfo.do";
//			submission.responseType = "javascript";
//			submission.setParameters("MEMB_SER_NO", e.data);
//			submission.addEventListener("receive", function(e){
//				var submi = e.control;
//				var jsonObj = JSON.parse(submi.xhr.responseText);
//				
//				if(jsonObj['memberInfo'][0]['PERS_COP_TY'] == '1'){
//					idNo.value = jsonObj['memberInfo'][0]['ID_NO'];
//					console.log('ID_NO = ' + jsonObj['memberInfo'][0]['ID_NO']);
//				}else{
//					busiNo.value = jsonObj['memberInfo'][0]['BUSI_NO'];
//					console.log('BUSI_NO = ' + jsonObj['memberInfo'][0]['BUSI_NO']);
//				}
//				memSerNo.readOnly = false;
//				memSerNo.value = jsonObj['memberInfo'][0]['MEMB_SER_NO'];
//				memSerNo.readOnly = true;
//				console.log('MEM_SER_NO = ' + jsonObj['memberInfo'][0]['MEMB_SER_NO']);
//				mobPhNo.value = jsonObj['memberInfo'][0]['MOB_PH_NO'];
//				console.log('MOB_PH_NO = ' + jsonObj['memberInfo'][0]['MOB_PH_NO']);
//				membNm.value = jsonObj['memberInfo'][0]['MEMB_NM'];
//				console.log('MEMB_NM = ' + jsonObj['memberInfo'][0]['MEMB_NM']);
//				
//				if(jsonObj['memberInfo'][0]['EMAIL'] != null){
//					app.lookup("ADDR_1").value = jsonObj['memberInfo'][0]['ADDR_1'] + ' ' + jsonObj['memberInfo'][0]['ADDR_2'];
//					app.lookup("MEMB_SER_NO").value = jsonObj['memberInfo'][0]['MEMB_SER_NO'];
//				}
//			});
//			submission.send();
		}else{
			onBtnMsgWindowClick(e);
		}
	});
}


/*
 * "보내기 버튼" 버튼(btnMsgWindow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMsgWindowClick(e){
	var btnMsgWindow = e.control;
	//"보내기 버튼" 클릭 시 발생하는 이벤트
	//window 창으로 메세지 전달
	openWindow.postMessage(app.lookup("PH_NO").value, "*");
	
}

/*
 * "새 창 열기" 버튼(btnPopUp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPopUpClick(e){
//	var btnPopUp = e.control;
	if (typeof eb6Preview != "undefined") {
		//"새 창 열기" 버튼 클릭 시 발생하는 이벤트
		openWindow = window.open("https://edu.tomatosystem.co.kr/sample/main.html?goToAppPage=app/sample/smp/embeddedpage/smpEmbeddedPage_03_W", "_popup", "height=300,left=100,top=100,width=350,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");
//		openWindow = window.open("/POS/PosMainMemSrc.do", "_popup", "height=300,left=100,top=100,width=350,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");
	}else{
		openWindow = window.open("/POS/PosMainMemSrc.do", "_popup", "height=750,left=100,top=100,width=700,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");
//		openWindow = window.open("https://edu.tomatosystem.co.kr/sample/main.html?goToAppPage=app/sample/smp/embeddedpage/smpEmbeddedPage_03_W", "_popup", "height=300,left=100,top=100,width=350,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");
		
	
	}
	onBtnMsgWindowClick(e);
}

/*
 * "선택취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var grd1 = app.lookup("grd1");
	if(confirm('선택한 행을 취소하시겠습니까?')){
		if(grd1.getCheckRowIndices().length > 0){
			grd1.deleteRow(grd1.getCheckRowIndices());
	    	alert('선택한 행이 취소되었습니다.');
			totPr();
		}else{
	    	alert('취소할 행을 선택해 주세요.');
	    }
	}
}

/*
 * "전체취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var grd1 = app.lookup("grd1");
	// 삭제할 행이 있을 경우
	if(grd1.getRowCount() > 0){
		if(confirm('전체취소를 하시겠습니까?')){
			
			app.lookup("grd1").checkAllRow();
		
			var grd1 = app.lookup("grd1");
			grd1.deleteRow(grd1.getCheckRowIndices());
			alert('전체취소 되었습니다.');
			totPr();
		}
	}else{
		alert('취소할 물품이 없습니다.');
	}
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onRdb1SelectionChange(e){
	var rdb1 = app.lookup("rdb1");
	
	var select = rdb1.getSelectionFirst().label;
	if(rdb1.value === '2'){
		rdb1.setItems(0);
		alert('카드는 일시적으로 사용이 불가합니다.');	
	}
	
}
function srcMemberDupl(){
	var mobPhNo = app.lookup("PH_NO");
	var membNm = app.lookup("MEMB_NM");
	var idNo = app.lookup("ID_NO");
	var busiNo = app.lookup("BUSI_NO");
	if(mobPhNo.value == '' || mobPhNo.value == null){
		alert('전화번호를 입력해 주세요.');
		mobPhNo.focus();
		return false;
	}else if(mobPhNo.length < 4 && mobPhNo.length > 0){
		alert('전화번호는 4자리 이상 입력해 주세요.');
		mobPhNo.focus();
		return false;
	}
//	if(idNo.length < 6 && idNo.length > 0){
//		alert('생년월일은 6자리 이상 입력해 주세요.');
//		idNo.focus();
//		return false;
//	}
//	if(busiNo.length < 10 && busiNo.length > 0){
//		alert('사업자번호는 10자리 다 입력해 주세요.');
//		busiNo.focus();
//		return false;
//	}
	return true;
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	
	if(srcMemberDupl()){
		// Submission 생성
		var submission = new cpr.protocols.Submission();
		
		// 전송할 url 설정
		submission.action = "/POS/srcMemInfo.do";
		
		// mediaType 설정
	//	subMainList.mediaType = cpr.protocols.Submission.MEDIA_URLENCODED;
		
		// response data의 type 설정
		submission.responseType = "javascript";
//		submission.async = false;
		
		var memSerNo = app.lookup("MEMB_SER_NO");
		var mobPhNo = app.lookup("PH_NO");
		var membNm = app.lookup("MEMB_NM");
		var idNo = app.lookup("ID_NO");
		var busiNo = app.lookup("BUSI_NO");
		var memPoint = app.lookup("memPoint");
	
	//	// request data 설정
		submission.setParameters("MOB_PH_NO", mobPhNo.value);
		submission.setParameters("ID_NO", idNo.value);
		submission.setParameters("BUSI_NO", busiNo.value);
		submission.setParameters("MEMB_NM", membNm.value);
		
		submission.addEventListener("receive", function(e){
			var submi = e.control;
			console.log(submi.xhr.responseText);
			var jsonObj = JSON.parse(submi.xhr.responseText);
			
			// 받아온 회원이 없을 경우
			if(jsonObj['memberInfo'].length == 0){
				alert('회원정보가 존재하지 않습니다.');
				app.lookup("MEMB_SER_NO").value = '';
				app.lookup("MEMB_NM").value = '';
				app.lookup("ADDR_1").value = '';
				app.lookup("BUSI_NO").value = '';
				app.lookup("ID_NO").value = '';
				app.lookup("PH_NO").value = '';
				app.lookup("totalSellAmt").value = '';
				app.lookup("memPoint").value = '';
				return;
			}
			// 받아온 memberInfo 가 2명 이상일때
			if(jsonObj['memberInfo'].length > 1){
				console.log('검색한 멤버가 2명이상 jsonObj[memberInfo].length = ' + jsonObj['memberInfo'].length);
				
				//	이후에 팝업창 띄우고 선택할 수 있게 뿌려주기
				onBtnPopUpClick(e);
//				sessionStorage.clear();
				sessionStorage.setItem("MOB_PH_NO", app.lookup("PH_NO").value);
				
				return;
			}else if(jsonObj['memberInfo'][0]['PERS_COP_TY'] == '1'){
				idNo.value = jsonObj['memberInfo'][0]['ID_NO'];
				console.log('ID_NO = ' + jsonObj['memberInfo'][0]['ID_NO']);
			}else{
				busiNo.value = jsonObj['memberInfo'][0]['BUSI_NO'];
				console.log('BUSI_NO = ' + jsonObj['memberInfo'][0]['BUSI_NO']);
			}
			memSerNo.readOnly = false;
			memSerNo.value = jsonObj['memberInfo'][0]['MEMB_SER_NO'];
			memSerNo.readOnly = true;
			mobPhNo.value = jsonObj['memberInfo'][0]['MOB_PH_NO'];
			membNm.value = jsonObj['memberInfo'][0]['MEMB_NM'];
			memPoint.value = jsonObj['memberInfo'][0]['POINT'];
			console.log('MEM_SER_NO = ' + jsonObj['memberInfo'][0]['MEMB_SER_NO']);
			console.log('MOB_PH_NO = ' + jsonObj['memberInfo'][0]['MOB_PH_NO']);
			console.log('MEMB_NM = ' + jsonObj['memberInfo'][0]['MEMB_NM']);
			
			if(jsonObj['memberInfo'][0]['EMAIL'] != null){
				app.lookup("ADDR_1").value = jsonObj['memberInfo'][0]['ADDR_1'] + ' ' + jsonObj['memberInfo'][0]['ADDR_2'];
				app.lookup("MEMB_SER_NO").value = jsonObj['memberInfo'][0]['MEMB_SER_NO'];
			}
			
		});
		// 조회 Submission send
		submission.send();	
	}
	app.lookup("btnMsgWindow").click();
}

/*
 * 인풋 박스에서 change 이벤트 발생 시 호출.
 * 값이 변경 되었을때 발생하는 DOM 이벤트.
 */
function onBarcodeChange(e){
	

}

// 바코드에 해당하는 행의 인덱스를 찾는 함수
function findRowIndexByBarcode(dataset, barcode) {
    var sellItem = app.lookup("sellItem");
    var rowCount = sellItem.getRowCount();
    for (var i = 0; i < rowCount; i++) {
        var rowData = dataset.getRowData(i);
        console.log("Row " + i + " - BAR_CODE: " + rowData["BAR_CODE"]);
        if (rowData["BAR_CODE"] === barcode) {
            console.log("Barcode found at index " + i);
            return i; // 바코드에 해당하는 행의 인덱스를 반환합니다.
        }
    }
    console.log("Barcode not found");
    return -1; // 바코드에 해당하는 행을 찾지 못한 경우 -1을 반환합니다.
}

/*
 * "회원 등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	if(checkValidation() === true){
		var phNo = app.lookup("PH_NO").value;
		var membNm = app.lookup("MEMB_NM").value;
		var idNo = app.lookup("ID_NO").value;
		var busiNo = app.lookup("BUSI_NO").value;
		
		// 받아온 회원번호가 존재하는지에 대한 submission
		var submission = new cpr.protocols.Submission();
		
		submission.action = '/POS/addMember.do';
		submission.responseType = 'javascript';
		submission.setParameters("MOB_PH_NO", phNo);
		submission.setParameters("MEMB_ENG_NM", "anonymous");
		submission.setParameters("MEMB_NM", membNm);
		submission.setParameters("ID_NO", idNo);
		submission.setParameters("BUSI_NO", busiNo);
		submission.setParameters("EMAIL", "none");
		if(busiNo == ''){
			submission.setParameters("PERS_COP_TY", "1");
		}else{
			submission.setParameters("PERS_COP_TY", "2");
		}
		
//		submission.async = false;
		submission.addEventListener("receive", function(e){
			var jsonObj = JSON.parse(e.control.xhr.responseText);
			if(jsonObj['memberInfo'] !== 'doExist'){
				alert('회원등록이 완료되었습니다.');
			}else{
				alert('이미 등록된 회원입니다.');
			}
		});
		submission.send();
		
		// 중복 회원가입이 아닌지 함수 또는 조건
//		if(회원검색list.길이 > 1){}

	}
}

function checkValidation(){
	
	var phNo = app.lookup("PH_NO");
	var membNm = app.lookup("MEMB_NM");
	var idNo = app.lookup("ID_NO");
	var busiNo = app.lookup("BUSI_NO");
	
	if(phNo.value == ''){
		alert('전화번호를 입력하세요.');
		phNo.focus();
		return false;
	}
	if(phNo.value.length != 11){
		alert('전화번호가 짧습니다.');
		phNo.focus();
		return false;
	}
	if(membNm.value == ''){
		alert('이름을 입력하세요.');
		membNm.focus();
		return false;
	}
	if(membNm.value.length < 2){
		alert('이름이 짧습니다.');
		membNm.focus();
		return false;
	}
	if(idNo.value =='' && busiNo.value == ''){
		alert('주민번호를 입력하세요.');
		idNo.focus();
		return false;
	}
	if(idNo.length != 13 && idNo.length > 0){
		alert('주민등록번호가 짧습니다.');
		idNo.focus();
		return false;
	}
	if(busiNo.length != 10 && busiNo.length > 0){
		alert('사업자등록번호가 짧습니다.');
		busiNo.focus();
		return false;
	}if(idNo.value != '' && busiNo.value != ''){
		alert('주민등록과 사업자 중 하나만 입력해 주세요.');
		idNo.focus();
		return false;
	}
	return true;
}

/*
 * 그리드에서 selection-dispose 이벤트 발생 시 호출.
 * Grid의 선택행이 사라지는 경우 발생하는 이벤트. (ex. deleteRow, filter, revertData, revertRowData, commitData, showDeleteRow=false)
 */
function onGrd1SelectionDispose(e){
	totPr();
}

/*
 * 그리드에서 update 이벤트 발생 시 호출.
 * Grid의 행 데이터가 수정되었을 때 이벤트.
 */
function onGrd1Update(e){
	totPr();
	
}

/*
 * "행 추가" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(e){
	var grd1 = app.lookup("grd1");
	var rowCount = grd1.getRowCount();
	if(rowCount == 0){
		grd1.insertRow(grd1.rowCount, true);
	}else{
		var isExistRow = grd1.getCellValue(rowCount-1, "PROD_NM");
		if(isExistRow !== ''){
			grd1.insertRow(grd1.rowCount, true);
		}else{
			grd1.selectRows(rowCount-1);
//			grd1.selectCells({
//				rowIndex : rowCount-1
//				,cellIndex : "BAR_CODE"
//			}, false);
		}
	}
	
    
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onBarcodeValueChange2(e){
//	onBarcodeChange(e);
	//	var dataview = new cpr.data.DataView
	var grd1 = app.lookup("grd1")
	// 값이 변경된 해당 바코드의 번호를 들고 조회 ㄱㄱ
	var barcode = grd1.getCellValue(grd1.getSelectedRowIndex(), "BAR_CODE");
	console.log(barcode);
	
//	if(false){
	var submission = new cpr.protocols.Submission();
	submission.action = "/POS/srcProduct.do"
	submission.setParameters("BAR_CODE", barcode.toString());
	submission.async = false;
	
	// 원래 send() 위치
	submission.addEventListener("receive", function(e) {
    	var submission = e.control;
    	console.log(submission.xhr.responseText);    
    	var jsonObj = JSON.parse(submission.xhr.responseText);    
    	console.log(jsonObj);
    	
    	var grd1 = app.lookup("grd1"); 
      	var sellItem = app.lookup("sellItem");
    
       	// 데이터셋에 추가하기 전에 기존 데이터를 모두 삭제할지 여부에 따라 결정
       	// ds1.clear(); // 기존 데이터 모두 삭제
       
       	// 바코드를 기준으로 해당 행을 찾습니다.
       	var rowIndex = findRowIndexByBarcode(sellItem, barcode);
       	var grd1RowIndex = grd1.getSelectedRowIndex();
       	
      	// 바코드에 해당하는 행이 있을 경우에만 데이터를 업데이트합니다.
       	if (rowIndex !== -1) {
        	console.log("Row index found: " + rowIndex);
          	// 찾아온 행이 바코드를 입력한 행이 아니면 QTY +1
          	if(grd1RowIndex !== rowIndex){
          		var beforeQty = grd1.getCellValue(rowIndex, "QTY");
          		var sellPr = grd1.getCellValue(rowIndex, "SELL_PR");
          		var asellPr = grd1.getCellValue(rowIndex, "ASELL_PR");
          		var salePr = grd1.getCellValue(rowIndex, "SALE_PR");
          		var salesAmt = grd1.getCellValue(rowIndex, "SALES_AMT");
          		var memPoint = grd1.getCellValue(rowIndex, "MEM_POINT");
          		
          		// 입력되기 전 rowIndex의 QTY가 1일 경우
          		if(beforeQty === '1'){
          			grd1.setCellValue(rowIndex, "QTY", parseInt(beforeQty)+1);
          			grd1.setCellValue(rowIndex, "ASELL_PR", grd1.getCellValue(rowIndex, "ASELL_PR") * 2);
          			grd1.setCellValue(rowIndex, "SALE_PR", grd1.getCellValue(rowIndex, "SALE_PR") * 2);
          			grd1.setCellValue(rowIndex, "SALES_AMT", (grd1.getCellValue(rowIndex, "SELL_PR") * 2) - (grd1.getCellValue(rowIndex, "SALE_PR")));
          			grd1.setCellValue(rowIndex, "MEM_POINT", grd1.getCellValue(rowIndex, "MEM_POINT") * 2);
          			grd1.deleteRow(grd1RowIndex);
          		}else{
	          		var asellPr1 = asellPr / beforeQty;
	          		var salePr1 = salePr / beforeQty;
	          		var salesAmt1 = (asellPr / beforeQty) - (salePr / beforeQty)
	          		var memPoint1 = (memPoint / beforeQty);
          			
          			grd1.setCellValue(rowIndex, "QTY", parseInt(beforeQty)+1);
          			grd1.setCellValue(rowIndex, "ASELL_PR", asellPr1 * (parseInt(beforeQty) +1));
          			grd1.setCellValue(rowIndex, "SALE_PR", salePr1 * (parseInt(beforeQty) +1));
          			grd1.setCellValue(rowIndex, "SALES_AMT", salesAmt1 * (parseInt(beforeQty) +1));
          			grd1.setCellValue(rowIndex, "MEM_POINT", memPoint1 * (parseInt(beforeQty) +1));
          			grd1.deleteRow(grd1RowIndex);
          		}
          		totPr();
          	}else{
//          		if(jsonObj["sellItem"] !== null){

		          	if (jsonObj["sellItem"] === null) {
		              	console.log("SELL_PR is null, setting SALES_AMT to 0");
//		              	sellItem.setValue(rowIndex, "SALES_AMT", 0);
						// 바코드를 입력했으나 해당 상품이 없을경우 해당 row delete
		              	grd1.deleteRow(rowIndex);
		              	alert('해당 상품이 없습니다.');
		          	} else {
		          		// SELL_PR 값 업데이트
		          		var sellPR = jsonObj["sellItem"]["SELL_PR"];
		          		sellItem.setValue(rowIndex, "SELL_PR", sellPR);
		              	console.log("Updating SALES_AMT with value: " + jsonObj["sellItem"]["SELL_PR"]);
		              	sellItem.setValue(rowIndex, "SALES_AMT", parseInt(jsonObj["sellItem"]["SELL_PR"] - jsonObj['sellItem']['SALE_PR']));
		              	sellItem.setValue(rowIndex, "PROD_NM", jsonObj['sellItem']['PROD_NM']);
		              	sellItem.setValue(rowIndex, "QTY", "1");
		              	sellItem.setValue(rowIndex, "ASELL_PR", jsonObj["sellItem"]["SELL_PR"]);
		              	sellItem.setValue(rowIndex, "MEM_POINT", jsonObj['sellItem']['MEM_POINT']);
		              	if(jsonObj['sellItem']['SALE_OR_NOT'] == '1'){
		              		sellItem.setValue(rowIndex, "SALE_PR", jsonObj['sellItem']['SALE_PR']);
		              	}else{
		              		sellItem.setValue(rowIndex, "SALE_PR", '0');
		              	}
		              	debugger
		          	}
//          		}else{
//          			alert('해당 바코드로 조회된 값이 없습니다.');
//          		}
	          	
	    	}
      	} else {
          	console.log("Row index not found for barcode: " + barcode);
          	alert('해당 상품이 없습니다.');
      	}
      	totPr();
   });
	
	submission.send();
}

/*
 * "계 산" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(e){
	
	var ipb12 = app.lookup("ipb12").value;
	debugger
	var grd1 = app.lookup("grd1");
	if(grd1.getCellValue(0, "PROD_NM") !== ''){
		
	if(ipb12 < 0 || ipb12.length == 0){
		alert('계산이 맞지 않습니다.');
		return false;
	}else{
		var submission = new cpr.protocols.Submission();
		var total = app.lookup("total").value;
		var membSerNo = app.lookup("MEMB_SER_NO");
		var salesTy = app.lookup("rdb1");
		
		submission.action = '/POS/calculate.do';
		submission.responseType = "javascript";
//		submission.mediaType = "application/json";
//		submission.async = false;
		var sms1 = app.lookup("sms1");
		var sellItem = app.lookup("sellItem");
		if(membSerNo.value != ''){
			var membTy = '1';
		}else{
			var membTy = '2';
		}
		var sellItemList = new Array();
		for(var i = 0 ; i < sellItem.getRowCount() ; i++){
			// 상품명이 없으면 row가 비었다고 판단 => List에 push 안함.
			if(sellItem.getRowData(i).PROD_NM != '' && sellItem.getRowData(i).PROD_NM != null){
				var sellObject = {
					BAR_CODE : sellItem.getRowData(i).BAR_CODE
					,PROD_NM : sellItem.getRowData(i).PROD_NM
					,QTY : sellItem.getRowData(i).QTY
					,SELL_PR : sellItem.getRowData(i).SELL_PR
					,ASELL_PR : sellItem.getRowData(i).ASELL_PR
					,SALE_PR : sellItem.getRowData(i).SALE_PR
					,PROD_TBL_SALES_AMT : sellItem.getRowData(i).SALES_AMT
					,MEM_POINT : sellItem.getRowData(i).MEM_POINT
				}
				sellItemList.push(sellObject);
			}
		}
		// 회원번호가 입력되어 있으면 회원구분에 '1'(회원)
		
		var sellItemLists = {
			sellItem : sellItemList
			,MEMB_SER_NO : membSerNo.value
			,MEMB_TY : membTy
			,PAY_TBL_SALES_AMT : total
			,TRANS_TY : salesTy.value
		}
		submission.setRequestObject(sellItemLists);
		submission.addEventListener("submit-success", function(e){
			alert('계산이 정상적으로 처리되었습니다.');
			app.lookup("sellItem").clear();
			app.lookup("product").clear();
			app.lookup("grd1").redraw();
			app.lookup("MEMB_SER_NO").value = '';
			app.lookup("MEMB_NM").value = '';
			app.lookup("ADDR_1").value = '';
			app.lookup("BUSI_NO").value = '';
			app.lookup("ID_NO").value = '';
			app.lookup("PH_NO").value = '';
			app.lookup("totalSellAmt").value = '';
			app.lookup("memPoint").value = '';
			app.lookup("total").value = '';
			app.lookup("ipb11").value = '';
			app.lookup("ipb12").value = '';
		});
		submission.send();
		
	}
	}else{
		alert('한개이상의 상품을 등록하세요');
	}
	
	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var rdb = app.lookup("rdb1");
	rdb.selectItem(0);
}

// 합계구하는 함수
function totPr(){
	var grd1 = app.lookup("grd1");
	// 총 금액
	var total = 0;
	for(var i = 0 ; i < grd1.rowCount ; i++){
		total += parseInt(grd1.getCellValue(i, "SALES_AMT"));
	}
	app.lookup("total").value = total;
}

/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onIpb11ValueChange(e){
	var total = app.lookup("total").value;
	var ipb11 = app.lookup("ipb11").value;
	var ipb12 = app.lookup("ipb12");
	ipb12.value = Number(ipb11 - total); 
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onPH_NOValueChange(e){
	
//	if(chkDupl()){
//		
//	}else{
//		return false;
//	}
	
}

// 유효성검사 함수
function chkDupl(){
	
	var phNo = app.lookup("PH_NO");
	var regExp = /[0-9]/;
	if(!regExp.test(phNo.value) && phNo.value.length > 0){
		alert('숫자만 입력해 주세요.');
		phNo.value = '';
		phNo.focus();
		return false;
	}
}

/*
 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onTotalValueChange(e){
	onIpb11ValueChange(e);
}

var qty = 0;
/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onQTYValueChange(e){
	var grd1 = app.lookup("grd1");
    var rowIndex = grd1.getSelectedRow().getIndex();
	// 변경된 수량이 0이 아니라면
	if(grd1.getCellValue(rowIndex, "QTY") !== '0'){
		// 상품명이 '' 이 아니라면
	    if(grd1.getCellValue(rowIndex, "PROD_NM") != ''){
	    	var qtyValue = app.lookup("QTY").value;
	    	var salePr = grd1.getCellValue(rowIndex, "SALE_PR");
	    	// 변경전 수량이 1이면
	    	if(qty === '1'){
	        	var saleAmt = salePr;
	      	}else{
	         	var saleAmt = Number(salePr/qty);
	      	}
	      	grd1.updateRow(rowIndex, {
	         	"QTY" : qtyValue
	         	,"ASELL_PR" : String(Number(qtyValue * grd1.getCellValue(rowIndex, "SELL_PR")))
	         	,"SALE_PR" : String(Number(qtyValue * saleAmt))
	         	,"SALES_AMT" : String(Number((qtyValue * grd1.getCellValue(rowIndex, "SELL_PR") - (qtyValue * saleAmt))))
	      	});
	   	}else{
	      	alert('잘못된 요청입니다.');
	      	grd1.deleteRow(rowIndex);
	   	}
   	}else{
   		alert('수량이 0 입니다. 해당 행을 삭제합니다.');
   		grd1.deleteRow(rowIndex);
   	}
}

/*
 * 인풋 박스에서 before-value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장되기 전에 발생하는 이벤트. 다음 이벤트로 value-change가 발생합니다.
 */
function onQTYBeforeValueChange(e){
	var qtyValue = app.lookup("QTY").value;
   	qty = qtyValue;

}


