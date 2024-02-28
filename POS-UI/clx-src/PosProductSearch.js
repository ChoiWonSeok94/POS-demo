/************************************************
 * PosProductSearch.js
 * Created at 2024. 2. 27. 오후 1:20:50.
 *
 * @author sunrise
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	app.lookup("prodCls").selectItem(0);
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onProdClsSelectionChange(e){
	var prodCls = e.control;
//	console.log(app.lookup("prodCls").value);
}

/*
 * "조회" 버튼(srcBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onSrcBtnClick(e){
	
	var barCode = app.lookup("BAR_CODE").value;
	var prodNm = app.lookup("PROD_NM").value;
	var clientNm = app.lookup("CLIENT_NM").value;
	var prodClsCd = app.lookup("prodCls").value;
	
	
	if(barCode == '' && prodNm == '' && clientNm == ''){
		alert('조회조건을 최소 하나 이상 기입해 주세요.');
		return false;
	
	}else{
		var prodList = app.lookup("productList");
		prodList.clear();
		var grd1 = app.lookup("grd1");
		grd1.redraw();
		var submission = new cpr.protocols.Submission();
		submission.action = '/POS/searchProductByOptions.do';
		submission.responseType = 'javascript';
		
		var reqObj = {
			PROD_CLS_CD : prodClsCd
			,BAR_CODE : barCode
			,PROD_NM : prodNm
			,CLIENT_NM : clientNm
		}
		submission.setRequestObject(reqObj);
		submission.addEventListener("receive", function(e){
			var jsonObj = JSON.parse(e.control.xhr.responseText);
			debugger
			if(jsonObj['productList'].length == 0){
				alert('조회된 정보가 없습니다.');
			}else{
				for(var i=0 ; i < jsonObj['productList'].length ; i++){
//					grd1.insertRow(i, true);
					prodList.insertRowData(i, true, {
						PROD_CD : jsonObj['productList'][i]['PROD_CD']
						,PROD_CLS_NM : jsonObj['productList'][i]['PROD_CLS_NM']
						,BAR_CODE : jsonObj['productList'][i]['BAR_CODE']
						,PROD_NM : jsonObj['productList'][i]['PROD_NM']
						,ORIG_NAT : jsonObj['productList'][i]['ORIG_NAT']
						,PURC_PR : jsonObj['productList'][i]['PURC_PR']
						,SALE_PR : jsonObj['productList'][i]['SALE_PR']
						,SELL_PR : jsonObj['productList'][i]['SELL_PR']
						,MEM_POINT: jsonObj['productList'][i]['MEM_POINT']
						,COLOR : jsonObj['productList'][i]['COLOR']
						,PROD_SIZE : jsonObj['productList'][i]['PROD_SIZE']
						,CLIENT_NM : jsonObj['productList'][i]['CLIENT_NM']
					});
				}
			}
			
		});
		submission.send();
	}
}
