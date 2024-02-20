/************************************************
 * PosAccountManagement.js
 * Created at 2024. 1. 22. 오전 12:13:02.
 *
 * @author PC2
 ************************************************/

function onBodyInit(e) {
    // 다음에서 제공하는 통합로딩 url
    var voResourceLoader = new cpr.core.ResourceLoader();
    voResourceLoader.addScript("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").load().then(function(input) {
        //후처리

    });
//  var utilProperty = cpr.core.Module.require("ui/js/daumApi.module.js");
//	var utilProperty = cpr.core.Module.require("module/js/daumApi.module.js");
//	console.log(utilProperty.property1);
//	var svg = app.lookup("accountForm");
//  	var xmlns = "http://dmaps.daum.net/map_js_init/postcode.v2.js";
//  	var svgElem = document.createElementNS(xmlns, "svg");
//  	
//  	svgElem.setAttributeNS(null, "width", "400px");
//  	svgElem.setAttributeNS(null, "hight", "600px");
//  	svgElem.setAttributeNS(null, "popup", "popup");
}

//function postCode() {
//	new daum.Postcode({
//		/* 해당 정보를 받아 처리할 콜백 함수를 정의하는 부분 입니다. */
//		oncomplete: function(data) {
//			/* 팝업에서 검색결과 항목을 클릭했을떄 실행할 코드를 작성하는 부분 */
//			var vcPostCode = app.lookup("POST_NO");
////			var vcAddress = app.lookup("address");
//			var vcAddressJibun = app.lookup("ADDR1");
//			var vcDetailAddress = app.lookup("ADDR2");
////			var vcExtraAddress = app.lookup("extraAddress");
//			
//			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
//			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
////			var roadAddr = data.roadAddress; // 도로명 주소 변수
////			var extraRoadAddr = ""; // 참고 항목 변수
//			
//			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
//			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
////			if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
////				extraRoadAddr += data.bname;
////			}
//			// 건물명이 있고, 공동주택일 경우 추가한다.
////			if (data.buildingName !== "" && data.apartment === "Y") {
////				extraRoadAddr += (extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName);
////			}
//			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
////			if (extraRoadAddr !== "") {
////				extraRoadAddr = " (" + extraRoadAddr + ")";
////			}
//			
//			// 우편번호와 주소 정보를 해당 필드에 넣는다.
//			vcPostCode.value = data.zonecode;
////			vcAddress.value = roadAddr;
//			vcAddressJibun.value = data.jibunAddress;
//			
//			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
////			if (roadAddr !== "") {
////				vcExtraAddress.value = extraRoadAddr;
////			} else {
////				vcExtraAddress.value = "";
////			}
//			
//			/*커서를 상세주소 필드로 이동합니다. */
//			vcDetailAddress.focus();
//			
//		}
//		
//	}).open();
//}

/*
 * "우편 검색" 버튼(btnClick)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClickClick(e){
//	postCode();
}

/*
 * 루트 컨테이너에서 unload 이벤트 발생 시 호출.
 * 앱이 언로드된 후 발생하는 이벤트입니다.
 */
function onBodyUnload(e){
	var appConf = cpr.core.AppConfig.INSTANCE;
	appConf.getEnvConfig().setValue("appcache", false);
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
    app.lookup("PERS_COP_TY").selectItem(0);
    
    var clientNo = app.lookup("CLIENT_NO");
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/clientPageInit.do';
	submission.responseType = 'javascript';
	submission.async = false;
	submission.addEventListener("receive", function(e){
		var submi = e.control.xhr.responseText;
		//총 거래처정보 반환된 값 세팅
		app.lookup("CLIENT_NO").value = JSON.parse(submission.xhr.responseText)['clientNo']['CLIENT_NO'];
	});
	submission.send();
	
}

// 등록 전 유효성검사
function chkDupl(){
	
	var clientNm = app.lookup("CLIENT_NM");
	var busiNo = app.lookup("BUSI_NO");
	var idNo = app.lookup("ID_NO");
	var represNm = app.lookup("REPRES_NM");
	var phNo = app.lookup("PH_NO");
	var postNo = app.lookup("POST_NO");
	var addr1 = app.lookup("ADDR1");
	var addr2 = app.lookup("ADDR2");
	var idBusiOutput = app.lookup("idBusiOutput");
	
	console.log(clientNm.length);
	if(clientNm.value == '' || clientNm.length == 0){
		alert('거래처명을 입력해 주세요.');
		clientNm.focus();
		return false;
	}
	if(busiNo.value == '' || busiNo.length == 0){
		alert('사업자번호를 입력해 주세요.');
		busiNo.focus();
		return false;
		
	}else if(busiNo.length != 10 && busiNo.length > 0){
		alert('사업자번호가 올바르지 않습니다.');
		busiNo.focus();
		return false;
	}
	var represNmTest = /^[가-힣A-z]+$/;
	if(represNm.value == '' || represNm.length == 0){
		alert('대표자성명을 입력해 주세요.');
		represNm.focus();
		return false;
	}else if(represNmTest.test(represNm.value)){
		alert('유효하지 않은 형식입니다.');
		represNm.focus();
		return false;
	}
	if(idBusiOutput.value == '주민번호'){
		if(idNo.value == '' || idNo.length == 0){
			alert('주민등록번호를 입력해 주세요');
			idNo.focus();
			return false;
			
		}else if(idNo.length != 13 && idNo.length > 0){
			alert('주민등록번호가 올바르지 않습니다.');
			idNo.focus();
			return false;
		}
//		else if(주민번호 체크디지트){
//			alert('주민등록번호가 유효하지 않습니다.');
//			idNo.focus();
//			return false;
//		}
	}else if(idBusiOutput.value == '법인번호'){
		if(idNo.value == '' || idNo.length == 0){
			alert('법인등록번호를 입력해 주세요');
			idNo.focus();
			return false;
			
		}else if(idNo.length != 13 && idNo.length > 0){
			alert('법인등록번호가 올바르지 않습니다.');
			idNo.focus();
			return false;
		}else if(idNo.value.substr(0, 2) != '67'){
			alert('법인등록번호가 유효하지 않습니다.');
			idNo.focus();
			return false;
		}
//		else if(법인번호 체크디지트(?)){
//			alert('법인등록번호가 유효하지 않습니다.');
//			idNo.focus();
//			return false;
//		}
	}
	var phNoTest = /^0\d{1,2}\d{3,4}\d{4}$/;
	if(phNo.value == '' || phNo.length == 0){
		alert('전화번호를 입력해 주세요.');
		phNo.focus();
		return false;
	
	}else if(phNoTest.test(phNo.value)){
		alert('유효하지 않은 전화번호 형식입니다.');
		phNo.focus();
		return false;
	}
	if(postNo.value == '' || postNo.length == 0){
		alert('우편번호를 검색해 주세요.');
		return false;
	
	}else if(postNo.value != '' && addr2.value == ''){
		alert('상세주소를 입력해 주세요.');
		addr2.focus();
		return false;
	}
	return true;
}

/*
 * "등 록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	
	if(chkDupl() === true){
		var clientNm = app.lookup("CLIENT_NM");
		var busiNo = app.lookup("BUSI_NO");
		var persCopTy = app.lookup("PERS_COP_TY");
		var idNo = app.lookup("ID_NO");
		var represNm = app.lookup("REPRES_NM");
		var phNo = app.lookup("PH_NO");
		var postNo = app.lookup("POST_NO");
		var addr1 = app.lookup("ADDR1");
		var addr2 = app.lookup("ADDR2");
		var addr = addr1.value + ',' + addr2.value;
		
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/clientInsert.do';
		submission.responseType = 'text';
//		submission.async = false;
		submission.setParameters("CLIENT_NM", clientNm.value);
		submission.setParameters("BUSI_NO", busiNo.value);
		submission.setParameters("PERS_COP_TY", persCopTy.value);
		submission.setParameters("ID_NO", idNo.value);
		submission.setParameters("REPRES_NM", represNm);
		submission.setParameters("PH_NO", phNo.value);
		submission.setParameters("POST_NO", postNo.value);
		submission.setParameters("ADDR", addr);
//		submission.addEventListener("submit-success", successInsert());
		submission.send();
	
	}
	
}

// 등록 통신 성공시 호출 함수
function successInsert(){
	alert('상품이 등록되었습니다.');
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onPERS_COP_TYSelectionChange(e){
	var pERS_COP_TY = e.control;
	var idBusiOutput = app.lookup("idBusiOutput");
	var persCopTy = app.lookup("PERS_COP_TY");
	// 개인사업자일 경우
	if(persCopTy.isSelected(0)){
		idBusiOutput.value = '주민번호';
	}else{
		idBusiOutput.value = '법인번호';
	}
}
