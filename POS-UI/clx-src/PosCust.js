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
	if(membEngNm.value == ''){
		alert('영문명을 입력해 주세요.');
		membEngNm.focus();
		return false;
	}
	if(engMemTest.test(membEngNm.value)){
		alert('연속된 공백은 불가합니다.');
		membEngNm.focus();
		return false;
	}
	var inputYear = birDay.value.substr(0, 4);
	if(birDay.value == ''){
		alert('생년월일을 입력해 주세요.');
		birDay.focus();
		return false;
	
	}
	if(birDay.value > now){
		alert('생년월일이 올바르지 않습니다.');
		birDay.focus();
		return false;
	}
	// 12살 미만일 때
	if(inputYear % parseInt(inputYear) < 12){
		alert('만 13세 이상 가입이 가능합니다.');
		birDay.focus();
		return false;
	}
	var mobPhTest = /^01([0|1|6|7|8|9]{1})([0-9]{3,4})([0-9]{4})$/;
	if(mobPhNo.value == ''){
		alert('휴대폰번호를 입력해 주세요.');
		mobPhNo.focus();
		return false;
	}
	if(!mobPhTest.test(mobPhNo.value) && mobPhNo.length > 0){
		alert('휴대폰번호가 올바르지 않습니다.');
		mobPhNo.focus();
		return false;
	}
	var phNoTest = /^0\d{1,2}\d{3,4}\d{4}$/;
	if(phNo.length < 9){
		alert('전화번호가 올바르지 않습니다.');
		phNo.focus();
		return false;
	}
	if(phNoTest.test(phNo.value)){
		alert('전화번호가 올바르지 않습니다.');
		phNo.focus();
		return false;
	}
	var emailTest = /^([A-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/;
	if(email.value == ''){
		alert('이메일을 작성해 주세요');
		email.focus();
		return false;
	}
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
	if(pers.value == 1){
		busiNo.value = '';
		busiNo.readOnly = true;
		busiNo.placeholder = ''
		idNo.placeholder = '숫자만 입력해 주세요.';
		idNo.readOnly = false;
	}else{
		idNo.value = '';
		idNo.readOnly = true;
		idNo.placeholder = ''
		busiNo.placeholder = '숫자만 입력해 주세요.';
		busiNo.readOnly = false;
	}
}

/*
 * "주소 찾기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	
}
