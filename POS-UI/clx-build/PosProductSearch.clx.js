/*
 * App URI: PosProductSearch
 * Source Location: PosProductSearch.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4878), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("PosProductSearch", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("productList");
			dataSet_1.parseData({
				"columns" : [
					{"name": "PROD_CD"},
					{"name": "PROD_CLS_NM"},
					{"name": "PROD_NM"},
					{"name": "PROD_ENG_NM"},
					{"name": "ORIG_NAT"},
					{"name": "PURC_PR"},
					{"name": "SELL_PR"},
					{"name": "BAR_CODE"},
					{
						"name": "CLIENT_NM",
						"dataType": "string"
					},
					{"name": "COLOR"},
					{"name": "PROD_SIZE"},
					{"name": "SALE_OR_NOT"},
					{"name": "SALE_PR"},
					{"name": "TAXAT_TY"},
					{"name": "MEM_POINT"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("prodClsTbl");
			dataSet_2.parseData({
				"columns": [
					{"name": "PROD_CLS_NM"},
					{"name": "PROD_CLS_CD"},
					{"name": "REMARKS"}
				],
				"rows": [
					{"PROD_CLS_NM": "전체", "PROD_CLS_CD": "0", "REMARKS": "전체"},
					{"PROD_CLS_NM": "가공식품", "PROD_CLS_CD": "001", "REMARKS": "이미 한번 가공된 식품류(라면, 과자, 음료, 통조림 등등)"},
					{"PROD_CLS_NM": "신선식품", "PROD_CLS_CD": "002", "REMARKS": "야채, 과일, 육류, 어류 등등"},
					{"PROD_CLS_NM": "디지털/가전", "PROD_CLS_CD": "003", "REMARKS": "디지털/가전제품류"},
					{"PROD_CLS_NM": "의류", "PROD_CLS_CD": "004", "REMARKS": "상의, 하의, 신발, 모자 등등"},
					{"PROD_CLS_NM": "일상용품", "PROD_CLS_CD": "005", "REMARKS": "세면용품, 청소용품 등등"}
				]
			});
			app.register(dataSet_2);
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
			
			var hTMLSnippet_1 = new cpr.controls.HTMLSnippet();
			hTMLSnippet_1.value = "상품 조회 내역";
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
				"width": "120px",
				"height": "30px"
			});
			
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#E0E0E0"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var inputBox_1 = new cpr.controls.InputBox("PROD_NM");
				inputBox_1.placeholder = "상품명";
				inputBox_1.maxLength = 20;
				container.addChild(inputBox_1, {
					"top": "10px",
					"left": "410px",
					"width": "200px",
					"height": "25px"
				});
				var inputBox_2 = new cpr.controls.InputBox("BAR_CODE");
				inputBox_2.placeholder = "바코드 번호";
				inputBox_2.maxLength = 20;
				inputBox_2.inputFilter = "[0-9]";
				container.addChild(inputBox_2, {
					"top": "10px",
					"left": "200px",
					"width": "200px",
					"height": "25px"
				});
				var button_1 = new cpr.controls.Button("srcBtn");
				button_1.value = "조회";
				if(typeof onSrcBtnClick == "function") {
					button_1.addEventListener("click", onSrcBtnClick);
				}
				container.addChild(button_1, {
					"top": "10px",
					"left": "905px",
					"width": "56px",
					"height": "25px"
				});
				var inputBox_3 = new cpr.controls.InputBox("CLIENT_NM");
				inputBox_3.placeholder = "거래처 명";
				inputBox_3.maxLength = 15;
				container.addChild(inputBox_3, {
					"top": "10px",
					"left": "620px",
					"width": "200px",
					"height": "25px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("prodCls");
				comboBox_1.treeExpandDepth = 1;
				comboBox_1.preventInput = true;
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("prodClsTbl"), {
						"label": "PROD_CLS_NM",
						"value": "PROD_CLS_CD",
						"tooltip": "REMARKS"
					});
				})(comboBox_1);
				if(typeof onProdClsSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onProdClsSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "10px",
					"left": "10px",
					"width": "180px",
					"height": "25px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "90px",
				"left": "20px",
				"width": "984px",
				"height": "50px"
			});
			
			var grid_1 = new cpr.controls.Grid("grd1");
			grid_1.noDataMessage = "-";
			grid_1.init({
				"dataSet": app.lookup("productList"),
				"showDeletedRow": false,
				"defaultSortMode": "single",
				"columns": [
					{"width": "58px"},
					{"width": "100px"},
					{"width": "154px"},
					{"width": "225px"},
					{"width": "119px"},
					{"width": "81px"},
					{"width": "71px"},
					{"width": "99px"},
					{"width": "77px"},
					{"width": "96px"},
					{"width": "117px"},
					{"width": "201px"}
				],
				"header": {
					"rows": [{"height": "24px"}],
					"cells": [
						{
							"constraint": {"rowIndex": 0, "colIndex": 0},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "PROD_CD";
								cell.text = "상품코드";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "BAR_CODE";
								cell.text = "바코드";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "PROD_NM";
								cell.text = "상품명";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "ORIG_NAT";
								cell.text = "원산지";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "PURC_PR";
								cell.text = "원가";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SALE_PR";
								cell.text = "할인가";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "SELL_PR";
								cell.text = "판매가";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "MEM_POINT";
								cell.text = "적립금";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "COLOR";
								cell.text = "색상";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "PROD_SIZE";
								cell.text = "사이즈";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.filterable = false;
								cell.sortable = false;
								cell.targetColumnName = "CLIENT_NM";
								cell.text = "거래처명";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.text = "상품분류코드";
								cell.style.css({
									"font-size" : "13px",
									"text-align" : "center"
								});
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
								cell.columnName = "PROD_CD";
								cell.control = (function(){
									var output_1 = new cpr.controls.Output();
									output_1.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_1.bind("value").toDataColumn("PROD_CD");
									return output_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 2},
							"configurator": function(cell){
								cell.columnName = "BAR_CODE";
								cell.control = (function(){
									var output_2 = new cpr.controls.Output();
									output_2.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_2.bind("value").toDataColumn("BAR_CODE");
									return output_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 3},
							"configurator": function(cell){
								cell.columnName = "PROD_NM";
								cell.control = (function(){
									var output_3 = new cpr.controls.Output();
									output_3.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_3.bind("value").toDataColumn("PROD_NM");
									return output_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 4},
							"configurator": function(cell){
								cell.columnName = "ORIG_NAT";
								cell.control = (function(){
									var output_4 = new cpr.controls.Output();
									output_4.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_4.bind("value").toDataColumn("ORIG_NAT");
									return output_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 5},
							"configurator": function(cell){
								cell.columnName = "PURC_PR";
								cell.control = (function(){
									var numberEditor_1 = new cpr.controls.NumberEditor("nbe1");
									numberEditor_1.readOnly = true;
									numberEditor_1.spinButton = false;
									numberEditor_1.format = "s#,###";
									numberEditor_1.enabledInputMask = false;
									numberEditor_1.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									numberEditor_1.bind("value").toDataColumn("PURC_PR");
									return numberEditor_1;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 6},
							"configurator": function(cell){
								cell.columnName = "SALE_PR";
								cell.control = (function(){
									var numberEditor_2 = new cpr.controls.NumberEditor("nbe2");
									numberEditor_2.readOnly = true;
									numberEditor_2.spinButton = false;
									numberEditor_2.format = "s#,###";
									numberEditor_2.enabledInputMask = false;
									numberEditor_2.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									numberEditor_2.bind("value").toDataColumn("SALE_PR");
									return numberEditor_2;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 7},
							"configurator": function(cell){
								cell.columnName = "SELL_PR";
								cell.control = (function(){
									var numberEditor_3 = new cpr.controls.NumberEditor("nbe3");
									numberEditor_3.readOnly = true;
									numberEditor_3.spinButton = false;
									numberEditor_3.format = "s#,###";
									numberEditor_3.enabledInputMask = false;
									numberEditor_3.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									numberEditor_3.bind("value").toDataColumn("SELL_PR");
									return numberEditor_3;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 8},
							"configurator": function(cell){
								cell.columnName = "MEM_POINT";
								cell.control = (function(){
									var numberEditor_4 = new cpr.controls.NumberEditor("nbe4");
									numberEditor_4.readOnly = true;
									numberEditor_4.spinButton = false;
									numberEditor_4.format = "s#,###";
									numberEditor_4.enabledInputMask = false;
									numberEditor_4.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									numberEditor_4.bind("value").toDataColumn("MEM_POINT");
									return numberEditor_4;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 9},
							"configurator": function(cell){
								cell.columnName = "COLOR";
								cell.control = (function(){
									var output_5 = new cpr.controls.Output();
									output_5.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_5.bind("value").toDataColumn("COLOR");
									return output_5;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 10},
							"configurator": function(cell){
								cell.columnName = "PROD_SIZE";
								cell.control = (function(){
									var output_6 = new cpr.controls.Output();
									output_6.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_6.bind("value").toDataColumn("PROD_SIZE");
									return output_6;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 11},
							"configurator": function(cell){
								cell.columnName = "CLIENT_NM";
								cell.control = (function(){
									var output_7 = new cpr.controls.Output();
									output_7.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_7.bind("value").toDataColumn("CLIENT_NM");
									return output_7;
								})();
							}
						},
						{
							"constraint": {"rowIndex": 0, "colIndex": 1},
							"configurator": function(cell){
								cell.columnName = "PROD_CLS_NM";
								cell.control = (function(){
									var output_8 = new cpr.controls.Output();
									output_8.style.css({
										"font-size" : "12px",
										"text-align" : "center"
									});
									output_8.bind("value").toDataColumn("PROD_CLS_NM");
									return output_8;
								})();
							}
						}
					]
				}
			});
			container.addChild(grid_1, {
				"top": "190px",
				"left": "20px",
				"width": "984px",
				"height": "558px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "PosProductSearch";
	cpr.core.Platform.INSTANCE.register(app);
})();
