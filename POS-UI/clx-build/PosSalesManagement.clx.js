/*
 * App URI: PosSalesManagement
 * Source Location: PosSalesManagement.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4878), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("PosSalesManagement", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
							conf = 'Y'
						}
					}else{
						if(confirm('선택 상품을 취소하시겠습니까??')){
							conf = 'Y'
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("판매구분");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "현금", "value": "1"},
					{"label": "카드", "value": "2"},
					{"label": "상품권", "value": "3"},
					{"label": "포인트", "value": "4"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("sellItem");
			dataSet_2.parseData({
				"columns": [
					{"name": "BAR_CODE"},
					{"name": "PROD_NM"},
					{"name": "QTY"},
					{"name": "SELL_PR"},
					{"name": "ASELL_PR"},
					{"name": "SALE_PR"},
					{"name": "SALES_AMT"},
					{"name": "POINT"}
				],
				"rows": []
			});
			app.register(dataSet_2);
			
			var dataSet_3 = new cpr.data.DataSet("recipe");
			dataSet_3.parseData({
				"columns": [
					{"name": "SALES_SER_NO"},
					{"name": "MEMB_SER_NO"},
					{"name": "MEMB_TY"},
					{"name": "SALES_AMT"},
					{"name": "SALES_TY"},
					{"name": "TRANS_TM"}
				],
				"rows": []
			});
			app.register(dataSet_3);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var hTMLSnippet_1 = new cpr.controls.HTMLSnippet();
			hTMLSnippet_1.value = "전표 내역";
			hTMLSnippet_1.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"color" : "white",
				"border-right-width" : "1px",
				"vertical-align" : "middle",
				"border-left-width" : "1px",
				"border-top-style" : "solid",
				"background-color" : "black",
				"border-radius" : "25px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-bottom-style" : "solid",
				"text-align" : "center"
			});
			container.addChild(hTMLSnippet_1, {
				"top": "150px",
				"left": "20px",
				"width": "100px",
				"height": "25px"
			});
			
			var hTMLSnippet_2 = new cpr.controls.HTMLSnippet();
			hTMLSnippet_2.value = "상품 내역";
			hTMLSnippet_2.style.css({
				"border-right-style" : "solid",
				"border-top-width" : "1px",
				"color" : "white",
				"border-right-width" : "1px",
				"vertical-align" : "middle",
				"border-left-width" : "1px",
				"border-top-style" : "solid",
				"background-color" : "black",
				"border-radius" : "25px",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-bottom-style" : "solid",
				"text-align" : "center"
			});
			container.addChild(hTMLSnippet_2, {
				"top": "550px",
				"left": "20px",
				"width": "100px",
				"height": "25px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.init({
				"dataSet": app.lookup("recipe"),
				"columns": [
					{"width": "25px"},
					{"width": "112px"},
					{"width": "90px"},
					{"width": "93px"},
					{"width": "118px"},
					{"width": "73px"},
					{"width": "179px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SALES_SER_NO";
								cell.text = "판매일련번호";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "MEMB_SER_NO";
								cell.text = "회원번호";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "MEMB_TY";
								cell.text = "회원구분";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SALES_AMT";
								cell.text = "합계";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.text = "판매구분";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "TRANS_TM";
								cell.text = "거래시간";
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnType = "radio";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "SALES_SER_NO";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "MEMB_SER_NO";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "MEMB_TY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "SALES_AMT";
								cell.control = (function(){
									var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
									numberEditor_1.readOnly = true;
									numberEditor_1.spinButton = false;
									numberEditor_1.format = "s#,###";
									numberEditor_1.style.css({
										"text-align" : "center"
									});
									numberEditor_1.bind("value").toDataColumn("SALES_AMT");
									return numberEditor_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "SALES_TY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "TRANS_TM";
								cell.control = (function(){
									var dateInput_1 = new cpr.controls.DateInput("dti1");
									dateInput_1.readOnly = true;
									dateInput_1.showOtherMonths = false;
									dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
									dateInput_1.format = "YYYYMMDDHHmmss";
									dateInput_1.bind("value").toDataColumn("TRANS_TM");
									return dateInput_1;
								})();
							}
						}
					]
				}
			});
			if(typeof onGrd1CellClick == "function") {
				grid_1.addEventListener("cell-click", onGrd1CellClick);
			}
			container.addChild(grid_1, {
				"top": "190px",
				"left": "20px",
				"width": "719px",
				"height": "351px"
			});
			
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#E0E0E0"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var comboBox_1 = new cpr.controls.ComboBox("SALES_TY");
				comboBox_1.treeExpandDepth = 1;
				comboBox_1.preventInput = true;
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("판매구분"), {
						"label": "label",
						"value": "value"
					});
				})(comboBox_1);
				container.addChild(comboBox_1, {
					"top": "10px",
					"left": "19px",
					"width": "100px",
					"height": "25px"
				});
				var inputBox_1 = new cpr.controls.InputBox("MOB_PH_NO");
				inputBox_1.placeholder = "전화번호";
				inputBox_1.maxLength = 11;
				inputBox_1.inputMode = "tel";
				inputBox_1.inputFilter = "[0-9]";
				container.addChild(inputBox_1, {
					"top": "10px",
					"left": "140px",
					"width": "112px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("BAR_CODE");
				inputBox_2.placeholder = "바코드 번호";
				inputBox_2.maxLength = 20;
				inputBox_2.inputFilter = "[0-9]";
				container.addChild(inputBox_2, {
					"top": "10px",
					"left": "263px",
					"width": "130px",
					"height": "25px"
				});
				var dateInput_2 = new cpr.controls.DateInput("sDate");
				dateInput_2.value = "";
				dateInput_2.placeholder = "YYYY-MM-DD HH:mm";
				dateInput_2.mask = "YYYY-MM-DD HH:mm";
				dateInput_2.format = "YYYYMMDDHHmm";
				container.addChild(dateInput_2, {
					"top": "10px",
					"left": "403px",
					"width": "199px",
					"height": "25px"
				});
				var output_1 = new cpr.controls.Output();
				output_1.value = "~";
				output_1.style.css({
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "10px",
					"left": "612px",
					"width": "25px",
					"height": "25px"
				});
				var dateInput_3 = new cpr.controls.DateInput("eDate");
				dateInput_3.value = "";
				dateInput_3.placeholder = "YYYY-MM-DD HH:mm";
				dateInput_3.mask = "YYYY-MM-DD HH:mm";
				dateInput_3.format = "YYYYMMDDHHmm";
				container.addChild(dateInput_3, {
					"top": "10px",
					"left": "647px",
					"width": "199px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("srcBtn");
				button_1.value = "조회";
				if(typeof onButtonClick3 == "function") {
					button_1.addEventListener("click", onButtonClick3);
				}
				container.addChild(button_1, {
					"top": "10px",
					"left": "905px",
					"width": "56px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "90px",
				"left": "20px",
				"width": "982px",
				"height": "50px"
			});
			
			var grid_2 = new cpr.controls.Grid("grd2");
			grid_2.init({
				"dataSet": app.lookup("sellItem"),
				"columns": [
					{"width": "25px"},
					{"width": "153px"},
					{"width": "190px"},
					{"width": "100px"},
					{"width": "94px"},
					{"width": "100px"},
					{"width": "82px"},
					{"width": "118px"},
					{"width": "87px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnType = "checkbox";
								cell.filterable = false;
								cell.sortable = false;
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "BAR_CODE";
								cell.text = "바코드";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "PROD_NM";
								cell.text = "상품명";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "QTY";
								cell.text = "수량";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SELL_PR";
								cell.text = "단가";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "ASELL_PR";
								cell.text = "금액";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SALE_PR";
								cell.text = "할인";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SALES_AMT";
								cell.text = "판매금액";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "POINT";
								cell.text = "포인트";
							}
						}
					]
				},
				"detail": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.columnType = "checkbox";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "BAR_CODE";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "PROD_NM";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "QTY";
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "SELL_PR";
								cell.control = (function(){
									var numberEditor_2 = new cpr.controls.NumberEditor("SELL_PR");
									numberEditor_2.readOnly = true;
									numberEditor_2.spinButton = false;
									numberEditor_2.format = "s#,###";
									numberEditor_2.style.css({
										"text-align" : "center"
									});
									numberEditor_2.bind("value").toDataColumn("SELL_PR");
									return numberEditor_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "ASELL_PR";
								cell.control = (function(){
									var numberEditor_3 = new cpr.controls.NumberEditor("ASELL_PR");
									numberEditor_3.readOnly = true;
									numberEditor_3.spinButton = false;
									numberEditor_3.format = "s#,###";
									numberEditor_3.style.css({
										"text-align" : "center"
									});
									numberEditor_3.bind("value").toDataColumn("ASELL_PR");
									return numberEditor_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "SALE_PR";
								cell.control = (function(){
									var numberEditor_4 = new cpr.controls.NumberEditor("SALE_PR");
									numberEditor_4.readOnly = true;
									numberEditor_4.spinButton = false;
									numberEditor_4.format = "s#,###";
									numberEditor_4.style.css({
										"text-align" : "center"
									});
									numberEditor_4.bind("value").toDataColumn("SALE_PR");
									return numberEditor_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "SALES_AMT";
								cell.control = (function(){
									var numberEditor_5 = new cpr.controls.NumberEditor("SALES_AMT");
									numberEditor_5.readOnly = true;
									numberEditor_5.spinButton = false;
									numberEditor_5.format = "s#,###";
									numberEditor_5.style.css({
										"text-align" : "center"
									});
									numberEditor_5.bind("value").toDataColumn("SALES_AMT");
									return numberEditor_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "POINT";
								cell.control = (function(){
									var numberEditor_6 = new cpr.controls.NumberEditor("POINT");
									numberEditor_6.readOnly = true;
									numberEditor_6.spinButton = false;
									numberEditor_6.format = "s#,###";
									numberEditor_6.style.css({
										"text-align" : "center"
									});
									numberEditor_6.bind("value").toDataColumn("POINT");
									return numberEditor_6;
								})();
							}
						}
					]
				}
			});
			container.addChild(grid_2, {
				"top": "585px",
				"left": "20px",
				"width": "981px",
				"height": "161px"
			});
			
			var group_2 = new cpr.controls.Container();
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var hTMLSnippet_3 = new cpr.controls.HTMLSnippet();
				hTMLSnippet_3.value = "판매 금액";
				hTMLSnippet_3.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"color" : "white",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "black",
					"border-radius" : "25px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(hTMLSnippet_3, {
					"top": "7px",
					"left": "9px",
					"width": "100px",
					"height": "25px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "구분";
				output_2.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "10px 0px 0px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "46px",
					"left": "9px",
					"width": "70px",
					"height": "55px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "전체";
				output_3.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "0px 0px 0px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"top": "100px",
					"left": "9px",
					"width": "70px",
					"height": "60px"
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "현금";
				output_4.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "0px 0px 0px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"top": "159px",
					"left": "9px",
					"width": "70px",
					"height": "60px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "카드";
				output_5.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "0px 0px 0px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_5, {
					"top": "277px",
					"left": "9px",
					"width": "70px",
					"height": "60px"
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "상품권";
				output_6.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "0px 0px 0px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_6, {
					"top": "218px",
					"left": "9px",
					"width": "70px",
					"height": "60px"
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "포인트";
				output_7.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"vertical-align" : "middle",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-radius" : "0px 0px 0px 10px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_7, {
					"top": "336px",
					"left": "9px",
					"width": "70px",
					"height": "60px"
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "합계";
				output_8.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ededed",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"background-image" : "none",
					"text-align" : "center"
				});
				container.addChild(output_8, {
					"top": "46px",
					"left": "78px",
					"width": "130px",
					"height": "55px"
				});
				var output_9 = new cpr.controls.Output("totalAmt");
				output_9.readOnly = true;
				output_9.dataType = "number";
				output_9.format = "s#,###";
				output_9.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_9, {
					"top": "100px",
					"left": "78px",
					"width": "130px",
					"height": "60px"
				});
				var output_10 = new cpr.controls.Output("cash");
				output_10.readOnly = true;
				output_10.dataType = "number";
				output_10.format = "s#,###";
				output_10.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_10, {
					"top": "159px",
					"left": "78px",
					"width": "130px",
					"height": "60px"
				});
				var output_11 = new cpr.controls.Output("giftCard");
				output_11.readOnly = true;
				output_11.dataType = "number";
				output_11.format = "s#,###";
				output_11.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_11, {
					"top": "218px",
					"left": "78px",
					"width": "130px",
					"height": "60px"
				});
				var output_12 = new cpr.controls.Output("card");
				output_12.readOnly = true;
				output_12.dataType = "number";
				output_12.format = "s#,###";
				output_12.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_12, {
					"top": "277px",
					"left": "78px",
					"width": "130px",
					"height": "60px"
				});
				var output_13 = new cpr.controls.Output("memPoint");
				output_13.readOnly = true;
				output_13.dataType = "number";
				output_13.format = "s#,###";
				output_13.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#cccccc",
					"border-right-width" : "1px",
					"border-left-color" : "#cccccc",
					"border-right-color" : "#cccccc",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cccccc",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_13, {
					"top": "336px",
					"left": "78px",
					"width": "130px",
					"height": "60px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "139px",
				"left": "785px",
				"width": "217px",
				"height": "405px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "선택취소";
			if(typeof onButtonClick == "function") {
				button_2.addEventListener("click", onButtonClick);
			}
			container.addChild(button_2, {
				"top": "555px",
				"left": "728px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_3 = new cpr.controls.Button();
			button_3.value = "전체취소";
			if(typeof onButtonClick2 == "function") {
				button_3.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_3, {
				"top": "555px",
				"left": "872px",
				"width": "95px",
				"height": "20px"
			});
			
			var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
			cpr.core.App.load("PosHeader", function(app) {
				if(app){
					embeddedApp_1.app = app;
				}
			});
			container.addChild(embeddedApp_1, {
				"top": "0px",
				"left": "0px",
				"width": "1024px",
				"height": "80px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "PosSalesManagement";
	cpr.core.Platform.INSTANCE.register(app);
})();
