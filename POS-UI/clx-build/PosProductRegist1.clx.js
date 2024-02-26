/*
 * App URI: PosProductRegist1
 * Source Location: PosProductRegist1.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4878), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("PosProductRegist1", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
					if(memPoint.value == ''){
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("prodClsList");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "PROD_CLS_NM",
						"dataType": "string"
					},
					{"name": "PROD_CLS_CD"}
				],
				"rows": [
					{"PROD_CLS_NM": "육류", "PROD_CLS_CD": "1"},
					{"PROD_CLS_NM": "쌀", "PROD_CLS_CD": "2"},
					{"PROD_CLS_NM": "음료", "PROD_CLS_CD": "3"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("EXIST");
			dataSet_2.parseData({
				"columns" : [{"name": "isExist"}]
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
			var group_1 = new cpr.controls.Container("grp1");
			group_1.style.css({
				"background-color" : "#E0E0E0"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "상품 코드 :";
				output_1.style.css({
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "50px",
					"left": "80px",
					"width": "100px",
					"height": "50px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "상품명(한글) :";
				output_2.style.css({
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "120px",
					"left": "80px",
					"width": "100px",
					"height": "50px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "상품명(영어) :";
				output_3.style.css({
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"top": "190px",
					"left": "80px",
					"width": "100px",
					"height": "50px"
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "원산지 :";
				output_4.style.css({
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"top": "260px",
					"left": "80px",
					"width": "100px",
					"height": "50px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "바코드 번호 :";
				output_5.style.css({
					"text-align" : "center"
				});
				container.addChild(output_5, {
					"top": "330px",
					"left": "80px",
					"width": "100px",
					"height": "50px"
				});
				var output_6 = new cpr.controls.Output("PROD_CD");
				output_6.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#bbbbbb",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"font-weight" : "bolder",
					"border-left-color" : "#bbbbbb",
					"font-size" : "16px",
					"border-right-color" : "#bbbbbb",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "white",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#bbbbbb",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_6, {
					"top": "50px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_1 = new cpr.controls.InputBox("PROD_NM");
				inputBox_1.placeholder = "상품명(한글)";
				inputBox_1.maxLength = 13;
				inputBox_1.inputFilter = "[ㄱ-힣]";
				inputBox_1.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_1, {
					"top": "120px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_2 = new cpr.controls.InputBox("PROD_ENG_NM");
				inputBox_2.placeholder = "상품명(영어)";
				inputBox_2.maxLength = 40;
				inputBox_2.inputFilter = "[a-zA-Z0-9]";
				inputBox_2.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_2, {
					"top": "190px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ORIG_NAT");
				inputBox_3.placeholder = "원산지";
				inputBox_3.maxLength = 8;
				inputBox_3.inputFilter = "[ㄱ-힣A-z]";
				inputBox_3.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_3, {
					"top": "260px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_4 = new cpr.controls.InputBox("BAR_CODE");
				inputBox_4.placeholder = "바코드 번호";
				inputBox_4.maxLength = 20;
				inputBox_4.inputFilter = "[0-9]";
				inputBox_4.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_4, {
					"top": "330px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "가격(원가) :";
				output_7.style.css({
					"text-align" : "center"
				});
				container.addChild(output_7, {
					"top": "50px",
					"left": "355px",
					"width": "100px",
					"height": "50px"
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "가격(판매가) :";
				output_8.style.css({
					"text-align" : "center"
				});
				container.addChild(output_8, {
					"top": "120px",
					"left": "355px",
					"width": "100px",
					"height": "50px"
				});
				var output_9 = new cpr.controls.Output();
				output_9.value = "상품 분류 :";
				output_9.style.css({
					"text-align" : "center"
				});
				container.addChild(output_9, {
					"top": "189px",
					"left": "355px",
					"width": "100px",
					"height": "50px"
				});
				var output_10 = new cpr.controls.Output();
				output_10.value = "과세 여부 :";
				output_10.style.css({
					"text-align" : "center"
				});
				container.addChild(output_10, {
					"top": "260px",
					"left": "355px",
					"width": "100px",
					"height": "50px"
				});
				var output_11 = new cpr.controls.Output();
				output_11.value = "회원 포인트 :";
				output_11.style.css({
					"text-align" : "center"
				});
				container.addChild(output_11, {
					"top": "330px",
					"left": "355px",
					"width": "100px",
					"height": "50px"
				});
				var inputBox_5 = new cpr.controls.InputBox("MEM_POINT");
				inputBox_5.placeholder = "포인트 적립금";
				inputBox_5.inputFilter = "[0-9]";
				inputBox_5.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_5, {
					"top": "330px",
					"left": "454px",
					"width": "142px",
					"height": "50px"
				});
				var output_12 = new cpr.controls.Output();
				output_12.value = "세일 여부 :";
				output_12.style.css({
					"text-align" : "center"
				});
				container.addChild(output_12, {
					"top": "50px",
					"left": "634px",
					"width": "100px",
					"height": "50px"
				});
				var output_13 = new cpr.controls.Output();
				output_13.value = "세일 가격 :";
				output_13.style.css({
					"text-align" : "center"
				});
				container.addChild(output_13, {
					"top": "120px",
					"left": "634px",
					"width": "100px",
					"height": "50px"
				});
				var output_14 = new cpr.controls.Output();
				output_14.value = "색 상 :";
				output_14.style.css({
					"text-align" : "center"
				});
				container.addChild(output_14, {
					"top": "188px",
					"left": "634px",
					"width": "100px",
					"height": "50px"
				});
				var output_15 = new cpr.controls.Output();
				output_15.value = "사이즈 :";
				output_15.style.css({
					"text-align" : "center"
				});
				container.addChild(output_15, {
					"top": "260px",
					"left": "634px",
					"width": "100px",
					"height": "50px"
				});
				var output_16 = new cpr.controls.Output();
				output_16.value = "거래처 :";
				output_16.style.css({
					"text-align" : "center"
				});
				container.addChild(output_16, {
					"top": "330px",
					"left": "634px",
					"width": "100px",
					"height": "50px"
				});
				var inputBox_6 = new cpr.controls.InputBox("COLOR");
				inputBox_6.placeholder = "색상";
				inputBox_6.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_6, {
					"top": "188px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var inputBox_7 = new cpr.controls.InputBox("PROD_SIZE");
				inputBox_7.placeholder = "사이즈";
				inputBox_7.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_7, {
					"top": "260px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("prodClsNm");
				comboBox_1.preventInput = true;
				comboBox_1.style.css({
					"text-align" : "center"
				});
				(function(comboBox_1){
					comboBox_1.setItemSet(app.lookup("prodClsList"), {
						"label": "PROD_CLS_NM",
						"value": "PROD_CLS_CD"
					});
				})(comboBox_1);
				if(typeof onProdClsNmSelectionChange == "function") {
					comboBox_1.addEventListener("selection-change", onProdClsNmSelectionChange);
				}
				container.addChild(comboBox_1, {
					"top": "188px",
					"left": "454px",
					"width": "141px",
					"height": "52px"
				});
				var checkBox_1 = new cpr.controls.CheckBox("TAXAT_TY");
				checkBox_1.value = "";
				checkBox_1.style.css({
					"text-align" : "center"
				});
				container.addChild(checkBox_1, {
					"top": "270px",
					"left": "515px",
					"width": "30px",
					"height": "30px"
				});
				var button_1 = new cpr.controls.Button("accountSrcBtn");
				button_1.value = "검색";
				if(typeof onButtonClick == "function") {
					button_1.addEventListener("click", onButtonClick);
				}
				container.addChild(button_1, {
					"top": "330px",
					"left": "885px",
					"width": "53px",
					"height": "50px"
				});
				var checkBox_2 = new cpr.controls.CheckBox("SALE_OR_NOT");
				checkBox_2.value = "0";
				checkBox_2.trueValue = "1";
				checkBox_2.falseValue = "0";
				checkBox_2.style.css({
					"text-align" : "center"
				});
				if(typeof onCbx2ValueChange == "function") {
					checkBox_2.addEventListener("value-change", onCbx2ValueChange);
				}
				container.addChild(checkBox_2, {
					"top": "60px",
					"left": "795px",
					"width": "30px",
					"height": "30px"
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "등 록";
				button_2.style.css({
					"font-size" : "17px"
				});
				if(typeof onButtonClick2 == "function") {
					button_2.addEventListener("click", onButtonClick2);
				}
				container.addChild(button_2, {
					"top": "504px",
					"left": "451px",
					"width": "100px",
					"height": "40px"
				});
				var output_17 = new cpr.controls.Output("CLIENT_NM");
				output_17.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#bbbbbb",
					"border-right-width" : "1px",
					"padding-left" : "5px",
					"border-left-color" : "#bbbbbb",
					"border-right-color" : "#bbbbbb",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "#ffffff",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#bbbbbb",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_17, {
					"top": "330px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var numberEditor_1 = new cpr.controls.NumberEditor("SELL_PR");
				numberEditor_1.max = new cpr.foundation.DecimalType("9999999");
				numberEditor_1.spinButton = false;
				numberEditor_1.placeholder = "가격(판매가)";
				numberEditor_1.format = "s#,###";
				numberEditor_1.style.css({
					"text-align" : "center"
				});
				container.addChild(numberEditor_1, {
					"top": "120px",
					"left": "454px",
					"width": "142px",
					"height": "50px"
				});
				var numberEditor_2 = new cpr.controls.NumberEditor("PURC_PR");
				numberEditor_2.max = new cpr.foundation.DecimalType("9999999");
				numberEditor_2.spinButton = false;
				numberEditor_2.placeholder = "가격(원가)";
				numberEditor_2.format = "s#,###";
				numberEditor_2.style.css({
					"text-align" : "center"
				});
				container.addChild(numberEditor_2, {
					"top": "50px",
					"left": "454px",
					"width": "142px",
					"height": "50px"
				});
				var numberEditor_3 = new cpr.controls.NumberEditor("SALE_PR");
				numberEditor_3.enabled = false;
				numberEditor_3.readOnly = true;
				numberEditor_3.max = new cpr.foundation.DecimalType("99999");
				numberEditor_3.spinButton = false;
				numberEditor_3.format = "s#,###";
				numberEditor_3.style.css({
					"text-align" : "center"
				});
				container.addChild(numberEditor_3, {
					"top": "120px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var output_18 = new cpr.controls.Output("CLIENT_NO");
				output_18.visible = false;
				output_18.readOnly = true;
				container.addChild(output_18, {
					"top": "389px",
					"left": "735px",
					"width": "140px",
					"height": "23px"
				});
				var output_19 = new cpr.controls.Output();
				output_19.enabled = false;
				output_19.value = "은 필수값입니다.";
				output_19.style.css({
					"color" : "red",
					"text-align" : "left"
				});
				container.addChild(output_19, {
					"top": "8px",
					"left": "837px",
					"width": "120px",
					"height": "20px"
				});
				var output_20 = new cpr.controls.Output();
				output_20.value = "* ";
				output_20.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_20, {
					"top": "8px",
					"left": "807px",
					"width": "30px",
					"height": "20px"
				});
				var output_21 = new cpr.controls.Output();
				output_21.value = "* ";
				output_21.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_21, {
					"top": "65px",
					"left": "57px",
					"width": "30px",
					"height": "20px"
				});
				var output_22 = new cpr.controls.Output();
				output_22.value = "* ";
				output_22.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_22, {
					"top": "133px",
					"left": "57px",
					"width": "30px",
					"height": "20px"
				});
				var output_23 = new cpr.controls.Output();
				output_23.value = "* ";
				output_23.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_23, {
					"top": "201px",
					"left": "57px",
					"width": "30px",
					"height": "20px"
				});
				var output_24 = new cpr.controls.Output();
				output_24.value = "* ";
				output_24.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_24, {
					"top": "273px",
					"left": "57px",
					"width": "30px",
					"height": "20px"
				});
				var output_25 = new cpr.controls.Output();
				output_25.value = "* ";
				output_25.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_25, {
					"top": "343px",
					"left": "57px",
					"width": "30px",
					"height": "20px"
				});
				var output_26 = new cpr.controls.Output();
				output_26.value = "* ";
				output_26.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_26, {
					"top": "203px",
					"left": "332px",
					"width": "30px",
					"height": "20px"
				});
				var output_27 = new cpr.controls.Output();
				output_27.value = "* ";
				output_27.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_27, {
					"top": "64px",
					"left": "332px",
					"width": "30px",
					"height": "20px"
				});
				var output_28 = new cpr.controls.Output();
				output_28.value = "* ";
				output_28.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_28, {
					"top": "132px",
					"left": "332px",
					"width": "30px",
					"height": "20px"
				});
				var output_29 = new cpr.controls.Output();
				output_29.value = "* ";
				output_29.style.css({
					"color" : "red",
					"font-weight" : "800",
					"font-size" : "22px",
					"line-height" : "22px",
					"text-align" : "right"
				});
				container.addChild(output_29, {
					"top": "343px",
					"left": "623px",
					"width": "30px",
					"height": "20px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "150px",
				"left": "0px",
				"width": "1024px",
				"height": "598px"
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
			
			var output_30 = new cpr.controls.Output("title");
			output_30.value = "상품 관리";
			output_30.style.css({
				"font-weight" : "bold",
				"font-size" : "25px",
				"text-align" : "center"
			});
			container.addChild(output_30, {
				"top": "90px",
				"left": "353px",
				"width": "318px",
				"height": "50px"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "PosProductRegist1";
	cpr.core.Platform.INSTANCE.register(app);
})();
