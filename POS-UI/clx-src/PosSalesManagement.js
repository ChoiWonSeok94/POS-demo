/************************************************
 * POSSalesManagement.js
 * Created at 2024. 1. 19. 오후 2:17:29.
 *
 * @author sunrise
 ************************************************/

/*
 * "선택취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var grd1 = app.lookup("grd1");
	var grd2 = app.lookup("grd2");
	var grd1RowIndex = grd1.getSelectedRowIndex();
	var checkIdx = grd2.getCheckRowIndices();
	if(grd2.getCheckRowIndices().length > 0){
		var conf = '';
		debugger
		if(e === '전체취소'){
			if(confirm('전체취소 하시겠습니까?')){
				conf = 'Y';
			}
		}else{
			if(confirm('선택 상품을 취소하시겠습니까??')){
				conf = 'Y';
			}
		}
		if(conf === 'Y'){
	    	grd2.deleteRow(grd2.getCheckRowIndices());
	    	var checkRow = grd2.getCheckRowIndices();
	    	
	    	var submission = new cpr.protocols.Submission();
			submission.action = '/POS/productCancelClick.do';
			submission.responseType = 'javascript';
			submission.async = false;
			
			var salesSerNo = grd1.getCellValue(grd1RowIndex, "SALES_SER_NO");
			var sellItemList = new Array();
			var rowIndices = grd2.getCheckRowIndices();
			
			for(var i=0 ; i< rowIndices.length ; i++){
				
				var sellObject = {
					SALES_AMT : grd2.getCellValue(rowIndices[i], "SALES_AMT")
					,SER_NO : rowIndices[i] +1
				}
				sellItemList.push(sellObject);
				grd2.setEnabledTypedCell('checkbox', rowIndices[i], false);
			}
			
			var sellItemLists = {
				sellItem : sellItemList
				,SALES_SER_NO : salesSerNo
			}
			submission.setRequestObject(sellItemLists);
			submission.addEventListener("receive", function(e){
				var submi = e.control;
				var jsonObj = JSON.parse(submi.xhr.responseText);
				console.log(submi.xhr.responseText);
				var recipe = app.lookup("recipe");
				recipe.setValue(grd1RowIndex, "SALES_AMT", jsonObj['recipe']['SALES_AMT']);
				grd1.redraw();
				updateTotalAmt(jsonObj['recipe']['SALES_AMT'], grd1.getCellValue(grd1RowIndex, "SALES_TY"));
				debugger
			});
			submission.send();
	    	
    		alert('선택한 행이 취소되었습니다.');
		}else{
			return false;
		}
    }else{
    	alert('취소할 행을 선택해 주세요.');
    }
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var salesTy = app.lookup("SALES_TY");
	salesTy.selectItem(0);
	
	var grd1 = app.lookup("grd1");
	
	grd1.selectRadio(0);
	var date = new Date();
    var yar = date.getFullYear().toString();
    var mon = date.getMonth() +1;
    mon = mon.toString().length === 1 ? "0" + mon.toString() : mon.toString();
    var day = date.getDate();
    day = day.toString().length === 1 ? "0" + day.toString() : day.toString();
    var hur = date.getHours();
    hur = hur.toString().length === 1 ? "0" +hur.toString() : hur.toString();
    var hur2 = date.getHours()-1;
    hur2 = hur2.toString().length === 1 ? "0" +hur2.toString() : hur2.toString();
	var min = date.getMinutes();
    min = min.toString().length === 1 ? "0" +min.toString() : min.toString();
    var time = yar + '-' + mon + '-' + day +  ', ' + hur + ':' + min;
    var time2 = yar + '-' + mon + '-' + day +  ', ' + hur2 + ':' + min;
    
    app.lookup("sDate").value = time2;
    app.lookup("eDate").value = time;
}

/*
 * "전체취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var all = '전체취소';
	app.lookup("grd2").checkAllRow();
	onButtonClick(all);
	
	if(confirm("취소한 전표를 다시 등록하시겠습니까?")){
		// 디테일이기에 다 끝나고 나중에..
	}
	
	
}

function chkDupl(){
	var salesTy = app.lookup("SALES_TY");
	var mobPhNo = app.lookup("MOB_PH_NO");
	var barCode = app.lookup("BAR_CODE");
	var sDate = app.lookup("sDate").value.replace("-", "").replace("-", "").replace(", ", "").replace(":", "");
	var eDate = app.lookup("eDate").value.replace("-", "").replace("-", "").replace(", ", "").replace(":", "");
	
	if(sDate > eDate){
		alert('조회날짜를 다시 입력해 주세요.');
		return false;
	}
	return true;
}

/*
 * "조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var srcBtn = e.control;
	
	if(chkDupl() === true){
		app.lookup("recipe").clear();
		app.lookup("sellItem").clear();
		var salesTy = app.lookup("SALES_TY");
		var mobPhNo = app.lookup("MOB_PH_NO");
		var barCode = app.lookup("BAR_CODE");
		var startDate = app.lookup("sDate").value.replace("-", "").replace("-", "").replace(":", "").replace(" ", "").replace(",", "");
		var endDate = app.lookup("eDate").value.replace("-", "").replace("-", "").replace(":", "").replace(" ", "").replace(",", "");
		var sDate = startDate.substring(0, 8);
		var sTime = startDate.substring(8, 12) + '00';
		var eDate = endDate.substring(0, 8);
		var eTime =endDate.substring(8, 12) + '00';
		
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/salesSrcBtnClick.do';
		submission.responseType = 'text';
		submission.async = false;
		submission.setParameters("SALES_TY", salesTy.value);
		submission.setParameters("MOB_PH_NO", mobPhNo.value);
		submission.setParameters("BAR_CODE", barCode.value);
		submission.setParameters("sDate", sDate);
		submission.setParameters("sTime", sTime);
		submission.setParameters("eDate", eDate);
		submission.setParameters("eTime", eTime);
		submission.addEventListener("receive", function(e){
			var submi = e.control;
			var jsonObj = JSON.parse(submi.xhr.responseText);
			console.log(jsonObj);
			if(jsonObj['recipe'].length == 0){
				
				alert('조회된 내역이 없습니다.');
			}else{
				var grd1 = app.lookup("grd1");
				for(var i=0 ; i < jsonObj['recipe'].length ; i++){
					var salesTy = jsonObj['recipe'][i]['SALES_TY'];
					if(salesTy === '1'){
						salesTy = '현금';
					}
					var salesSerNo = jsonObj['recipe'][i]['SALES_SER_NO'];
					var salesAmt = jsonObj['recipe'][i]['SALES_AMT'];
					var membTy = jsonObj['recipe'][i]['MEMB_TY'];
					if(membTy === '1'){
						membTy = '등록회원';
					}else{
						membTy = '비등록회원';
					}
					var membSerNo = jsonObj['recipe'][i]['MEMB_SER_NO'];
					// 회원번호 미존재시
					if(membSerNo === '0'){
						membSerNo = '-';
						membTy = '비등록회원';
					}
					var transTm = jsonObj['recipe'][i]['TRANS_TM'];
					grd1.insertRowData(i, true, {
						"SALES_SER_NO" : salesSerNo
						,"MEMB_SER_NO" : membSerNo
						,"MEMB_TY" : membTy
						,"SALES_AMT" : salesAmt
						,"SALES_TY" : salesTy
						,"TRANS_TM" : transTm
					}, false);
					// CANC_TY === '1'(취소) 일 경우 해당 행 삭제
					if(jsonObj['recipe'][i]['CANC_TY'] === '1'){
						grd1.deleteRow(i);
					}
					
				}
				grd1.selectRadio(0);
				grd1.selectRows(0);
				onGrd1CellClick();
			}
		});
		
		submission.send();
	}
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = app.lookup("grd1");
	var serNo = grd1.getSelectedRow().getString("SALES_SER_NO");
	var grd1RowIndex = grd1.getSelectedRowIndex()
	// row클릭시 클릭된 row의 radio버튼 활성화
	grd1.selectRadio(grd1RowIndex);
	var submission = new cpr.protocols.Submission();
	submission.action = '/POS/recipeDetailClick.do';
	submission.responseType = 'javascript';
//	submission.async = false;
	submission.setParameters("SALES_SER_NO", serNo);
	
	// 해당 전표의 상품내역 조회 후 화면에 뿌려줘야함.
	submission.addEventListener("receive", function(e){
		app.lookup("sellItem").clear();
		var submission = e.control;  
        var jsonObj = JSON.parse(submission.xhr.responseText);
        var grd2 = app.lookup("grd2");
        var totalAmt = '';
		for(var i=0 ; i < jsonObj['sellItem'].length ; i++){
			grd2.insertRowData(i, true, {
				"BAR_CODE" : jsonObj['sellItem'][i]['BAR_CODE']
				,"PROD_NM" : jsonObj['sellItem'][i]['PROD_NM']
				,"QTY" : jsonObj['sellItem'][i]['QTY']
				,"SELL_PR" : jsonObj['sellItem'][i]['SALES_PR']
				,"ASELL_PR" : jsonObj['sellItem'][i]['ASELL_PR']
				,"SALE_PR" : jsonObj['sellItem'][i]['SALE_AMT']
				,"SALES_AMT" : jsonObj['sellItem'][i]['SALES_AMT']
			}, false);
			
			// 취소구분이 3이면 delete row
			if(jsonObj['sellItem'][i]['TRANS_TY'] === '3'){
				grd2.deleteRow(i);
				grd2.setEnabledTypedCell('checkbox', i, false);
			}
		} // for문 종료
		
		// 판매금액 업데이트 함수 호출
		totalAmt = jsonObj['sellItem'][0]['PAY_TBL_SALES_AMT'];
		var salesTy = grd1.getCellValue(grd1RowIndex, "SALES_TY");
		updateTotalAmt(totalAmt, salesTy);
	});
	
	submission.send();
}

// 판매금액 업데이트 함수
function updateTotalAmt(totalAmt, salesTy){
	var total = app.lookup("totalAmt");
	var cash = app.lookup("cash");
	var giftCard = app.lookup("giftCard");
	var card = app.lookup("card");
	var memPoint = app.lookup("memPoint");
	
	if(salesTy === '현금'){
		cash.value = totalAmt;
	}else if(salesTy === '상품권'){
		giftCard.value = totalAmt;
	}else if(salesTy === '카드'){
		card.value = totalAmt;
	}else if(salesTy === '포인트'){
		memPoint.value = totalAmt;
	}
	
	total.value = parseInt(cash.value + giftCard.value + card.value + memPoint.value);
}
