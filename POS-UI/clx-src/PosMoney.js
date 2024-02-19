/************************************************
 * PosMoney.js
 * Created at 2024. 1. 22. 오전 12:48:06.
 *
 * @author PC2
 ************************************************/

/*
 * "입금하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var content1 = app.lookup("content1").value;
	var money1 = app.lookup("money1").value;
	
	if(money1 == ''){
		alert('금액을 작성해 주세요.');
		return false;
	}
	if(content1 == ''){
		alert('내용을 작성해 주세요.');
		return false;
	}else{
		var totCnt = Number(app.lookup("totalCnt").value);
		var money1 = Number(app.lookup("money1").value);
		
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/vaultCashInOut.do';
		submission.responseType = 'javascript';
//		submission.async = false;
		submission.setParameters("TER_SER_NO", '1');
		submission.setParameters("DEP_PAY_TY", '1');
		submission.setParameters("CONTENTS", content1);
		submission.setParameters("AMT", money1);
		
		submission.addEventListener("submit-success", function(e){
			var submi = e.control;
			console.log(submi.xhr.responseText);
			onBodyLoad();
			alert('입금이 완료되었습니다.');
			debugger;
		});
		submission.send();
		
//		app.lookup("totalCnt").value = (totCnt + money1).toString();
		app.lookup("money1").value = '';
		app.lookup("content1").value = '';
	}
	
	
}

/*
 * "출금하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var content2 = app.lookup("content2").value;
	var totcnt = app.lookup("totalCnt").value;
	var money2 = app.lookup("money2").value;
	
	if(money2 == ''){
		alert('금액을 작성해 주세요.');
		return false;
	}
	if(content2 == ''){
		alert('내용을 작성해 주세요.');
		return false;
	}
//	if(totcnt < money2){
//		alert('잔액이 부족합니다.');
//		return false;
//	}
	else{
		var totCnt = Number(app.lookup("totalCnt").value);
		var money2 = Number(app.lookup("money2").value);
		
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/vaultCashInOut.do';
		submission.responseType = 'javascript';
//		submission.async = false;
		submission.setParameters("TER_SER_NO", '1');
		submission.setParameters("DEP_PAY_TY", '2');
		submission.setParameters("CONTENTS", content2);
		submission.setParameters("AMT", money2);
		
		submission.addEventListener("submit-success", function(e){
			var submi = e.control;
			console.log(submi.xhr.responseText);
			var jsonObj = JSON.parse(submi.xhr.responseText);
			onBodyLoad();
			alert('출금이 완료되었습니다.');
			debugger;
		});
		submission.send();
//		app.lookup("totalCnt").value = (totCnt - money2).toString();
		app.lookup("money2").value = '';
		app.lookup("content2").value = '';
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/vaultInit.do';
	submission.responseType = 'javascript';
//	submission.async = false;
	submission.addEventListener("receive", function(e){
		var submi = e.control;
		
		console.log(submi.xhr.responseText);
		var jsonObj = JSON.parse(submi.xhr.responseText);
		var totCash = jsonObj['totCash'];
		app.lookup("totalCnt").value = totCash;
		
		
	});
	submission.send();
	
}
