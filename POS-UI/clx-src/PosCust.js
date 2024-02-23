/************************************************
 * PosCust.js
 * Created at 2024. 1. 22. 오전 1:13:47.
 *
 * @author PC2
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CUIEvent */e){
	
	// daumApi 스크립트 억지로 집어넣어주는 코드
	var scriptElement = document.createElement("script");
	var daumApi = "t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
	scriptElement.src = "http://" + daumApi;
	document.body.appendChild(scriptElement);
	
//	var utilProperty = cpr.core.Module.require("ui/js/daumApi.module.js");
//	var utilProperty = cpr.core.Module.require("module/js/daumApi.module.js");
//	console.log(utilProperty);
//	var svg = app.lookup("custForm");
//  	var xmlns = "http://dmaps.daum.net/map_js_init/postcode.v2.js";
//  	var svgElem = document.createElementNS(xmlns, "svg");
//  	
//  	svgElem.setAttributeNS(null, "width", "400px");
//  	svgElem.setAttributeNS(null, "hight", "600px");
//  	svgElem.setAttributeNS(null, "popup", "popup");
	
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/memberPageInit.do';
	submission.responseType = 'javascript';
	submission.addEventListener("receive", function(e){
		var jsonObj = JSON.parse(e.control.xhr.responseText);
		app.lookup("MEMB_SER_NO").value = jsonObj['memCnt'];
	});
	submission.send();
	
  	app.lookup("PERS_COP_TY").selectItem(0);
  	
}

/*
 * "등 록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	
	if(chkDupl()){
		debugger;
		var idNo = app.lookup("ID_NO");
		var busiNo = app.lookup("BUSI_NO");
		var membNm = app.lookup("MEMB_NM");
		var membEngNm = app.lookup("MEMB_ENG_NM");
		var birDay = app.lookup("BIR_DAY");
		var mobPhNo = app.lookup("MOB_PH_NO");
		var phNo = app.lookup("PH_NO");
		var email = app.lookup("EMAIL");
		var persCopTy = app.lookup("PERS_COP_TY");
		var postNo = app.lookup("POST_NO");
		var addr1 = app.lookup("ADDR_1");
		var addr2 = app.lookup("ADDR_2");
		console.log(persCopTy.value);
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/addMember.do';
		submission.responseType = 'text';
//		submission.async = false;
		submission.setParameters("ID_NO", idNo.value);
		submission.setParameters("BUSI_NO", busiNo.value);
		submission.setParameters("MEMB_NM", membNm.value);
		submission.setParameters("MEMB_ENG_NM", membEngNm.value);
		submission.setParameters("BIR_DAY", birDay.value);
		submission.setParameters("MOB_PH_NO", mobPhNo.value);
		submission.setParameters("PH_NO", phNo.value);
		submission.setParameters("EMAIL", email.value);
		submission.setParameters("PERS_COP_TY", persCopTy.value);
		submission.setParameters("POST_NO", postNo.value);
		submission.setParameters("ADDR_1", addr1.value);
		submission.setParameters("ADDR_2", addr2.value);
		submission.addEventListener("submit-success", function(e){
			alert('회원등록이 완료됐습니다.');
		});
		submission.addEventListener("submit-error", function(e){
			alert('회원등록이 실패했습니다.');
		});
		submission.send();
		
	}
	
	
}

// 등록전 체크 함수
function chkDupl(){
	var idNo = app.lookup("ID_NO");
	var busiNo = app.lookup("BUSI_NO");
	var membNm = app.lookup("MEMB_NM");
	var membEngNm = app.lookup("MEMB_ENG_NM");
	var birDay = app.lookup("BIR_DAY");
	var mobPhNo = app.lookup("MOB_PH_NO");
	var phNo = app.lookup("PH_NO");
	var email = app.lookup("EMAIL");
	var persCopTy = app.lookup("PERS_COP_TY");
	var postNo = app.lookup("POST_NO");
	var addr1 = app.lookup("ADDR_1");
	var addr2 = app.lookup("ADDR_2");
	
	// 현재날짜 계산
	var date = new Date();
	var year = date.getFullYear();
	var mon = date.getMonth() + 1;
	mon = mon.toString().length === 1 ? "0" + mon : mon;
	var day = date.getDate();
	day = day.toString().length === 1 ? "0" + day : day;
	
	var now = year + mon + day;
	
	if(persCopTy.value == 1){
		if(idNo.value == ''){
			alert('주민등록번호를 입력해 주세요.');
			idNo.focus();
			return false;
		
		}else if(idNo.length != 13 && idNo.length > 0){
			alert('주민등록번호가 올바르지 않습니다.');
			idNo.focus();
			return false;
		}
	}
	if(persCopTy.value == 2){
		if(busiNo.value == ''){
			alert('사업자 번호를 입력해 주세요.');
			busiNo.focus();
			return false;
		
		}else if(busiNo.length != 10 && busiNo.length > 0){
			alert('사업자 번호가 올바르지 않습니다.');
			busiNo.focus();
			return false;
		}else if(busiNo.value.substr(0, 3) === '325' && busiNo.length > 0){
			alert('유효하지 않은 사업자 번호입니다.');
			busiNo.focus();
			return false;
		}
	}
	var hgMemTest = /^[가-힣]+$/;
	if(membNm.value == ''){
		alert('회원명을 입력해 주세요.');
		membNm.focus();
		return false;
	}
	if(!hgMemTest.test(membNm.value) && membNm.length > 0){
		alert('유효하지 않은 이름입니다.');
		membNm.focus();
		return false;
	}
	var engMemTest = /(\s)\1/;
	var engMemTest2 = /([,-])\1/;
	var engMemTest3 = /^[a-zA-Z0-9 ,-]+$/;
	if(membEngNm.value == '' && membEngNm.length > 0){
		alert('영문명을 입력해 주세요.');
		membEngNm.focus();
		return false;
	}
	if(engMemTest.test(membEngNm.value)){
		alert('연속된 공백은 불가합니다.');
		membEngNm.focus();
		return false;
	}else if(engMemTest2.test(membEngNm.value) && membEngNm.length > 0){
		alert('연속된 특수문자는 불가합니다.');
		membEngNm.focus();
		return false;
	}else if(!engMemTest3.test(membEngNm.value) && membEngNm.length > 0){
		alert('사용 가능한 특수문자는 다음과 같습니다.( , - )');
		membEngNm.focus();
		return false;
	}
	// 추후 구현할 때 주민등록번호에서 뒷자리 시작이 1,2 일경우 생년월일에 '19'
	// 뒷자리 시작이 3,4 로 시작할 경우에 '20'으로 설정해서 자동으로 계산해주기
	// 계산을 한다면 주민번호 or 생년월일이 바뀌었을 때 값의 셋팅 & 값이 비워졌을때는 어떻게 할껀지?
	if(birDay.value == ''){
		alert('생년월일을 입력해 주세요.');
		birDay.focus();
		return false;
	
	}
	else if(birDay.value > now){
		alert('생년월일이 올바르지 않습니다.');
		birDay.focus();
		return false;
	}
	// 12살 미만일 때
	else if((year - birDay.value.substr(0,4)) < 13){
		alert('만 13세 이상 가입이 가능합니다.');
		birDay.focus();
		return false;
	}
	var mobPhTest = /^01([0|1|6|7|8|9]{1})([0-9]{3,4})([0-9]{4})$/;
	if(mobPhNo.value == ''){
		alert('휴대폰번호를 입력해 주세요.');
		mobPhNo.focus();
		return false;
	}else if(!mobPhTest.test(mobPhNo.value) && mobPhNo.length > 0){
		alert('휴대폰번호가 올바르지 않습니다.');
		mobPhNo.focus();
		return false;
	}
	var phNoTest = /^0\d{1,2}\d{3,4}\d{4}$/;
	if(phNo.length < 9 && phNo.length > 0){
		alert('전화번호가 올바르지 않습니다.');
		phNo.focus();
		return false;
	}else if(phNoTest.test(phNo.value) && phNo.length > 0){
		alert('전화번호가 올바르지 않습니다.');
		phNo.focus();
		return false;
	}
	var emailTest = /^([A-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/;
//	if(email.value == ''){
//		alert('이메일을 작성해 주세요');
//		email.focus();
//		return false;
//	}
	if(emailTest.test(email.value)){
		alert('이메일을 형식이 올바르지 않습니다.');
		email.focus();
		return false;
	}
	if(postNo.value != ''){
		if(addr2.value == ''){
			alert('상세주소를 입력해 주세요.');
			addr2.focus();
			return false;
		}
	}
	if(postNo.value == ''){
		if(addr2.length > 0){
			alert('우편번호를 입력해 주세요.');
			return false;
		}
	}
	return true;
}

/*
 * 라디오 버튼에서 selection-change 이벤트 발생 시 호출.
 * 라디오버튼 아이템을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onPERS_COP_TYSelectionChange(e){
	var pERS_COP_TY = e.control;
	
	var idNo = app.lookup("ID_NO");
	var busiNo = app.lookup("BUSI_NO");
	var pers = app.lookup("PERS_COP_TY");
	var idNoBox = app.lookup("idNoBox");
	var busiNoBox = app.lookup("busiNoBox");
	if(pers.value == 1){
		busiNo.value = '';
		busiNo.readOnly = true;
		busiNo.placeholder = ''
		idNo.placeholder = '숫자만 입력해 주세요.';
		idNo.readOnly = false;
		idNoBox.visible = true;
		busiNoBox.visible = false;
	}else{
		idNo.value = '';
		idNo.readOnly = true;
		idNo.placeholder = ''
		busiNo.placeholder = '숫자만 입력해 주세요.';
		busiNo.readOnly = false;
		busiNoBox.visible = true;
		idNoBox.visible = false;
	}
}

/*
 * "주소 찾기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	postCode();
}

function postCode() {
	new daum.Postcode({
		/* 해당 정보를 받아 처리할 콜백 함수를 정의하는 부분 입니다. */
		oncomplete: function(data) {
			/* 팝업에서 검색결과 항목을 클릭했을떄 실행할 코드를 작성하는 부분 */
			var vcPostCode = app.lookup("POST_NO");
			var vcAddress = app.lookup("ADDR_1");
//			var vcAddressJibun = app.lookup("ADDR_1");
			var vcDetailAddress = app.lookup("ADDR_2");
			var vcExtraAddress = app.lookup("ADDR_2");
			
			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ""; // 참고 항목 변수
			
			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== "" && data.apartment === "Y") {
				extraRoadAddr += (extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName);
			}
			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== "") {
				extraRoadAddr = " (" + extraRoadAddr + ")";
			}
			debugger
			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
			if (roadAddr !== "") {
				roadAddr += extraRoadAddr;
			} else {
				vcExtraAddress.value = "";
			}
			
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			vcPostCode.value = data.zonecode;
			vcAddress.value = roadAddr;
//			vcAddressJibun.value = data.jibunAddress;
			
			/*커서를 상세주소 필드로 이동합니다. */
			vcDetailAddress.focus();
		}
	}).open();
}
