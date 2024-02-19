/*
 * App URI: PosProductRegist1
 * Source Location: PosProductRegist1.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4807), Don't edit manually.
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
			var openWindow = null;
			/*
			 * 체크 박스에서 value-change 이벤트 발생 시 호출.
			 */
			function onCbx2ValueChange(e){
				var cbx2 = app.lookup("cbx2").value;
				var ipb9 = app.lookup("ipb9");
				if(cbx2 === 'true'){
					ipb9.readOnly = false;
				}else{
					ipb9.readOnly = true;
					ipb9.value = '';
				}
			}

			/*
			 * "검색" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var filePath = "/POS-UI/clx-src/PosProductRegist2.clx";
				openWindow = window.open(filePath + ".html","_popup","width=400,height=600");
			}

			function onBodyInit(e) {
			    //init 시점에 메시지 받아오는 이벤트 실행
			    window.addEventListener("message", function getPostMessage(e) {
			        if (app.lookup("mainWindowOpt") != null) {
			            app.lookup("mainWindowOpt").value = e.data;
			        }
			    });
			};
			// End - User Script
			
			// Header
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
			var group_1 = new cpr.controls.Container();
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
				var output_6 = new cpr.controls.Output();
				output_6.value = "등록된 상품 +1 표출";
				output_6.style.css({
					"text-align" : "center"
				});
				container.addChild(output_6, {
					"top": "50px",
					"left": "190px",
					"width": "130px",
					"height": "50px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.placeholder = "상품명(한글)";
				inputBox_1.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_1, {
					"top": "120px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				inputBox_2.placeholder = "상품명(영어)";
				inputBox_2.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_2, {
					"top": "190px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipb3");
				inputBox_3.placeholder = "원산지";
				inputBox_3.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_3, {
					"top": "260px",
					"left": "179px",
					"width": "141px",
					"height": "50px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipb4");
				inputBox_4.placeholder = "바코드 번호";
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
				var inputBox_5 = new cpr.controls.InputBox("ipb5");
				inputBox_5.placeholder = "가격(판매가)";
				inputBox_5.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_5, {
					"top": "120px",
					"left": "454px",
					"width": "142px",
					"height": "50px"
				});
				var inputBox_6 = new cpr.controls.InputBox("ipb8");
				inputBox_6.placeholder = "회원 포인트 잔액";
				inputBox_6.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_6, {
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
				var inputBox_7 = new cpr.controls.InputBox("ipb9");
				inputBox_7.readOnly = true;
				inputBox_7.placeholder = "세일 가격";
				inputBox_7.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_7, {
					"top": "120px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var inputBox_8 = new cpr.controls.InputBox("ipb10");
				inputBox_8.placeholder = "색상";
				inputBox_8.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_8, {
					"top": "188px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var inputBox_9 = new cpr.controls.InputBox("ipb11");
				inputBox_9.placeholder = "사이즈";
				inputBox_9.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_9, {
					"top": "260px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
				});
				var inputBox_10 = new cpr.controls.InputBox("ipb7");
				inputBox_10.placeholder = "가격(원가)";
				inputBox_10.style.css({
					"text-align" : "center"
				});
				container.addChild(inputBox_10, {
					"top": "50px",
					"left": "453px",
					"width": "142px",
					"height": "50px"
				});
				var comboBox_1 = new cpr.controls.ComboBox("cmb1");
				comboBox_1.preventInput = true;
				container.addChild(comboBox_1, {
					"top": "198px",
					"left": "454px",
					"width": "141px",
					"height": "30px"
				});
				var checkBox_1 = new cpr.controls.CheckBox("cbx1");
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
				var checkBox_2 = new cpr.controls.CheckBox("cbx2");
				checkBox_2.value = "";
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
				container.addChild(button_2, {
					"top": "504px",
					"left": "451px",
					"width": "100px",
					"height": "40px"
				});
				var output_17 = new cpr.controls.Output("mainWindowOpt");
				output_17.value = "window 창에서 값 받아오기";
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
					"border-bottom-style" : "solid"
				});
				container.addChild(output_17, {
					"top": "330px",
					"left": "733px",
					"width": "142px",
					"height": "50px"
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
			
			var output_18 = new cpr.controls.Output("title");
			output_18.value = "상품 관리";
			output_18.style.css({
				"font-weight" : "bold",
				"font-size" : "25px",
				"text-align" : "center"
			});
			container.addChild(output_18, {
				"top": "90px",
				"left": "353px",
				"width": "318px",
				"height": "50px"
			});
		}
	});
	app.title = "PosProductRegist1";
	cpr.core.Platform.INSTANCE.register(app);
})();
