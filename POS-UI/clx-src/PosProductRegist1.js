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
			console.log(prodClsList.getRowData(i));
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
	if(cbx2 === 'true'){
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
	
	openWindow = window.open("/POS/PosProductRegist2.do", "_popup", "height=600,left=100,top=100,width=550,location=no,menubar=no,resizable=no,scrollbars=yes,status=yes,titlebar=no,toolbar=no");		
	
}

/*
 * "등 록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	
	if(checkDupl() == true){
		
		var prodClsCd = app.lookup("prodClsNm");
		var prodNm = app.lookup("PROD_NM");
		var prodEngNm = app.lookup("PROD_ENG_NM");
		var origNat = app.lookup("ORIG_NAT");
		var purcPr = app.lookup("PURC_PR");
		var sellPr = app.lookup("SELL_PR");
		var barCode = app.lookup("BAR_CODE");
		
		// CLIENT_NO 를 가져와야하는데 어떻게 가져올지 생각....
		var clientNo = app.lookup("CLIENT_NO");
		var color = app.lookup("COLOR");
		var prodSize = app.lookup("PROD_SIZE");
		var saleOrNot = app.lookup("SALE_OR_NOT");
		if(saleOrNot.checked){
			saleOrNot.value = '1'; // 세일
		}else{
			saleOrNot.value = '0'; // 세일X
		}
		
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
		
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/productInsert.do';
		submission.responseType = 'text';
		submission.async = false;
		submission.setParameters("PROD_CLS_NM", prodClsCd.value);
		submission.setParameters("PROD_NM", prodNm.value);
		submission.setParameters("PROD_ENG_NM", prodEngNm.value);
		submission.setParameters("ORIG_NAT", origNat.value);
		submission.setParameters("PURC_PR", purcPr.value);
		submission.setParameters("SELL_PR", sellPr.value);
		submission.setParameters("BAR_CODE", barCode.value);
		submission.setParameters("CLIENT_NO", '7777');
//		submission.setParameters("CLIENT_NO", clientNo.value);
		submission.setParameters("COLOR", color.value);
		submission.setParameters("PROD_SIZE", prodSize.value);
		submission.setParameters("SALE_OR_NOT", saleOrNot.value);
		submission.setParameters("SALE_PR", salePr.value);
		submission.setParameters("TAXAT_TY", taxatTy.value);
		submission.setParameters("MEM_POINT", memPoint.value);
		
		submission.send();
		alert('상품이 등록됐습니다.');
	}else{
		alert('등록이 실패했습니다.');
	}
}

// 유효성 검사
function checkDupl(){
	var prodNm = app.lookup("PROD_NM").value;
	var prodEngNm = app.lookup("PROD_ENG_NM").value;
	var origNat = app.lookup("ORIG_NAT").value;
	var purcPr = app.lookup("PURC_PR").value;
	var sellPr = app.lookup("SELL_PR").value;
	var barCode = app.lookup("BAR_CODE").value;
	var clientNo = app.lookup("CLIENT_NM").value;
	var prodSize = app.lookup("PROD_SIZE").value;
	var saleOrNot = app.lookup("SALE_OR_NOT");
	var salePr = app.lookup("SALE_PR").value;
	
	if(prodNm == ''){
		alert('상품명 입력은 필수입니다.');
		return false;
	}
	if(prodEngNm == ''){
		alert('상품명(영어) 입력은 필수입니다.');
		return false;
	}
	if(origNat == ''){
		alert('원산지 입력은 필수입니다.');
		return false;
	}
	if(purcPr == ''){
		alert('원가 입력은 필수입니다.');
		return false;
	}
	if(sellPr == ''){
		alert('판매가 입력은 필수입니다.');
		return false;
	}
	if(barCode == ''){
		alert('바코드 입력은 필수입니다.');
		return false;
	}
	var origNatList = {origNat :['KO', 'Ko', 'ko', 'KOREA', 'Korea', 'korea', '한국', '대한민국']};
	if(barCode.substr(0,3) == '880'){
//		if(!origNat in origNatList){
		if(origNat == 'KO' || origNat == "ko" || origNat == "KOREA" || origNat == "Korea" || origNat == "korea" || origNat == "한국" || origNat == "대한민국"){
		}else{
			alert('원산지와 바코드의 국가가 일치하지 않습니다.');
			return false;
		}
	}
	if(origNat == "KO" || origNat == "ko" || origNat == "KOREA" || origNat == "Korea" || origNat == "korea" || origNat == "한국" || origNat == "대한민국"){
		if(barCode.substr(0, 3) != '880'){
			alert('바코드의 국가식별코드가 올바르지 않습니다.');
			return false;
		}
	}
	if(clientNo == ''){
		alert('거래처 입력은 필수입니다.');
		return false;
	}
//	사이즈 정규식.test? 해야할까
//	if(prodSize == ''){
//		alert('');
//		return false;
//	}
	if(saleOrNot.checked == true){
		if(salePr == ''){
			alert('세일여부 체크시 세일가격 입력은 필수입니다.');
			return false;
		}
		if(salePr.length < 3){
			alert('세일가격은 백단위부터 가능합니다.');
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
