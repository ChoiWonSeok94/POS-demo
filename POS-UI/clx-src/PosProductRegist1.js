/************************************************
 * POSProductRegist.js
 * Created at 2024. 1. 19. 오후 3:38:05.
 *
 * @author sunrise
 ************************************************/
//var util = createCommonUtil();
var openWindow = null;

function onBodyInit(e){
	window.addEventListener("message", function getPostMessage(e) {
		
		// e.data가 변수를 담아주고 있는지 컨트롤러 자체를 반환한건지 version으로 확인
		if (e.data['version'] == null) {
			app.lookup("CLIENT_NM").value = e.data['CLIENT_NM'];
			app.lookup("CLIENT_NO").value = e.data['CLIENT_NO']
		}
	});
	
	var prodClsNm = app.lookup("prodClsNm");
	app.lookup("prodClsList").clear();
	
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/productPageInit.do';
	submission.responseType = 'javascript';
	submission.async = false;
	submission.addEventListener("receive", function(e){
		var submi = e.control;
		var jsonObj = JSON.parse(submi.xhr.responseText);
		app.lookup("PROD_CD").value = jsonObj['PROD_CD'];
	});
	submission.send();
	
	var submission2 = new cpr.protocols.Submission();
	submission2.action = '/POS/getProdClsName.do';
	submission2.responseType = 'javascript';
	submission2.async = false;
	submission2.addEventListener("receive", function(e){
		var submi = e.control;
		var jsonObj = JSON.parse(submi.xhr.responseText);
		var prodClsList = app.lookup("prodClsList");
		for(var i=0 ; i < jsonObj['prodClsCd'].length ; i++){
			prodClsList.insertRowData(i, true, jsonObj['prodClsCd'][i]);
			prodClsList.putValue(i, "PROD_CLS_NM", jsonObj['prodClsCd'][i]['PROD_CLS_NM']);
			prodClsList.putValue(i, "PROD_CLS_CD", jsonObj['prodClsCd'][i]['PROD_CLS_CD']);
//			console.log(prodClsList.getRowData(i));
		}
		prodClsNm.selectItem(0);
	});
	submission2.send();
}

/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 */
function onCbx2ValueChange(e){
	var cbx2 = app.lookup("SALE_OR_NOT").value;
	var ipb9 = app.lookup("SALE_PR");
	if(cbx2 === '1'){
		ipb9.readOnly = false;
		ipb9.placeholder = '세일가격';
		ipb9.enabled = true;
	}else{
		ipb9.readOnly = true;
		ipb9.value = '';
		ipb9.placeholder = '';
		ipb9.enabled = false;
	}
}

/*
 * "검색" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	
	openWindow = window.open("/POS/PosProductRegist2.do", "_popup", "height=700,left=100,top=100,width=650,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");		
	
}

/*
 * "등 록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	
	if(checkDupl()){
//	if(true){
		var prodClsCd = app.lookup("prodClsNm");
		var prodNm = app.lookup("PROD_NM");
		var prodEngNm = app.lookup("PROD_ENG_NM");
		var origNat = app.lookup("ORIG_NAT");
		var purcPr = app.lookup("PURC_PR");
		var sellPr = app.lookup("SELL_PR");
		var barCode = app.lookup("BAR_CODE");
		var clientNo = app.lookup("CLIENT_NO");
		var color = app.lookup("COLOR");
		var prodSize = app.lookup("PROD_SIZE");
		var saleOrNot = app.lookup("SALE_OR_NOT");
//		if(saleOrNot.checked){
//			saleOrNot.value = '1'; // 세일
//		}else{
//			saleOrNot.value = '0'; // 세일X
//		}
		
		var salePr = app.lookup("SALE_PR");
		var taxatTy = app.lookup("TAXAT_TY");
		if(taxatTy.checked){
			taxatTy.value = '2'; // 과세
		}else{
			taxatTy.value = '1'; // 비과세
		}
		
		var memPoint = app.lookup("MEM_POINT");
		if(memPoint.value = ''){
			memPoint.value = '0';
		}
		
		var submission3 = new cpr.protocols.Submission();
		submission3.action = '/POS/productInsert.do';
		submission3.responseType = 'javascript';
//		submission3.async = false;
		submission3.setParameters("PROD_CLS_CD", prodClsCd.value);
		submission3.setParameters("PROD_NM", prodNm.value);
		submission3.setParameters("PROD_ENG_NM", prodEngNm.value);
		submission3.setParameters("ORIG_NAT", origNat.value);
		submission3.setParameters("PURC_PR", purcPr.value);
		submission3.setParameters("SELL_PR", sellPr.value);
		submission3.setParameters("BAR_CODE", barCode.value);
		submission3.setParameters("CLIENT_NO", clientNo.value);
		submission3.setParameters("COLOR", color.value);
		submission3.setParameters("PROD_SIZE", prodSize.value);
		submission3.setParameters("SALE_OR_NOT", saleOrNot.value);
		submission3.setParameters("SALE_PR", salePr.value);
		submission3.setParameters("TAXAT_TY", taxatTy.value);
		submission3.setParameters("MEM_POINT", memPoint.value);
			debugger
		
		// 왜인지는 모르겠으나 recieve 가 작동을 안함
//		submission3.addEventListener("recieve", function(e){
//			debugger
//			var jsonObj = JSON.parse(e.control.xhr.responseText);
//			
//			// 'does' => 등록된 사업자번호
//			if(jsonObj.EXIST.isExist === 'does'){
//				alert('이미 등록된 상품입니다.');
//			}	
//			// 'none' => 없는 사업자 번호 => insert
//			else if(jsonObj.EXIST.isExist === 'none'){
//				alert('상품이 등록됐습니다.');
//			}
//		});
		submission3.addEventListener("submit-done", function(e){
			debugger
			var jsonObj = JSON.parse(e.control.xhr.responseText);
			
			// 'does' => 등록된 사업자번호
			if(jsonObj.EXIST.isExist === 'does'){
				alert('이미 등록된 상품입니다.');
			}	
			// 'none' => 없는 사업자 번호 => insert
			else if(jsonObj.EXIST.isExist === 'none'){
				alert('상품이 등록됐습니다.');
			}
		});
		submission3.send();
	}
}

// 유효성 검사
function checkDupl(){
	var prodNm = app.lookup("PROD_NM");
	var prodEngNm = app.lookup("PROD_ENG_NM");
	var origNat = app.lookup("ORIG_NAT");
	var purcPr = app.lookup("PURC_PR");
	var sellPr = app.lookup("SELL_PR");
	var barCode = app.lookup("BAR_CODE");
	var clientNo = app.lookup("CLIENT_NM");
	var prodSize = app.lookup("PROD_SIZE");
	var saleOrNot = app.lookup("SALE_OR_NOT");
	var salePr = app.lookup("SALE_PR");
	if(prodNm.value == ''){
		alert('상품명 입력은 필수입니다.');
		prodNm.focus();
		return false;
	}
	if(prodEngNm.value == ''){
		alert('상품명(영어) 입력은 필수입니다.');
		prodEngNm.focus();
		return false;
	}
	if(origNat.value == ''){
		alert('원산지 입력은 필수입니다.');
		origNat.focus();
		return false;
	}
	if(purcPr.value == ''){
		alert('원가 입력은 필수입니다.');
		purcPr.focus();
		return false;
	}
	if(sellPr.value == ''){
		alert('판매가 입력은 필수입니다.');
		sellPr.focus();
		return false;
	}
	if(barCode.value == ''){
		alert('바코드 입력은 필수입니다.');
		barCode.focus();
		return false;
	}
	
	if(origNat.value == 'KO' || origNat.value == "ko" || origNat.value == "KOREA" || origNat.value == "Korea" || origNat.value == "korea" || origNat.value == "한국" || origNat.value == "대한민국"){
		if(barCode.value.substr(0,3) !== '880'){
			alert('원산지와 바코드의 국가가 일치하지 않습니다.');
			barCode.focus();
			return false;
		}
	}
	if(origNat.value == "KO" || origNat.value == "ko" || origNat.value == "KOREA" || origNat.value == "Korea" || origNat.value == "korea" || origNat.value == "한국" || origNat.value == "대한민국"){
		if(barCode.value.substr(0, 3) != '880'){
			alert('바코드의 국가식별코드가 올바르지 않습니다.');
			barCode.focus();
			return false;
		}
	}
	if(app.lookup("CLIENT_NM").value == '' || app.lookup("CLIENT_NM").value == null){
		alert('거래처 입력은 필수입니다.');
		return false;
	}
//	사이즈 정규식.test? 해야할까
//	if(prodSize.value == ''){
//		alert('');
//		return false;
//	}
	if(saleOrNot.checked){
		if(salePr.value == ''){
			alert('세일여부 체크시 세일가격 입력은 필수입니다.');
			salePr.focus();
			return false;
		}
		if(salePr.length < 3){
			alert('세일가격은 백단위부터 가능합니다.');
			salePr.focus();
			return false;
		}
	}
	return true;
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onProdClsNmSelectionChange(e){
	var prodClsNm = app.lookup("prodClsNm");
	// 
	console.log(prodClsNm.value);
}
