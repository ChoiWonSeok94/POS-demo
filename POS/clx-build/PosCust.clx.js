/*
 * App URI: PosCust
 * Source Location: PosCust.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4807), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("PosCust", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * PosCust.js
			 * Created at 2024. 1. 22. 오전 1:13:47.
			 *
			 * @author PC2
			 ************************************************/;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("accountBtn");
			dataSet_1.parseData({
				"columns": [
					{"name": "person"},
					{"name": "value"}
				],
				"rows": [
					{"person": "개인", "value": "individual"},
					{"person": "법인", "value": "corporation"}
				]
			});
			app.register(dataSet_1);
			app.supportMedia("all", "default");
			
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
			
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#E0E0E0",
				"border-radius" : "3px 0px 0px 3px"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "회원번호";
				output_1.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "110px",
					"left": "50px",
					"width": "100px",
					"height": "35px"
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_1, {
					"top": "110px",
					"left": "149px",
					"width": "170px",
					"height": "35px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "주민번호";
				output_2.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "210px",
					"left": "50px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_2 = new cpr.controls.InputBox("ipb2");
				inputBox_2.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_2, {
					"top": "210px",
					"left": "144px",
					"width": "160px",
					"height": "35px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "사업자 번호";
				output_3.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"top": "270px",
					"left": "50px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_3 = new cpr.controls.InputBox("ipb3");
				inputBox_3.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_3, {
					"top": "270px",
					"left": "144px",
					"width": "160px",
					"height": "35px"
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "회원명";
				output_4.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"top": "330px",
					"left": "50px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_4 = new cpr.controls.InputBox("ipb4");
				inputBox_4.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_4, {
					"top": "330px",
					"left": "144px",
					"width": "160px",
					"height": "35px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "영문명";
				output_5.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_5, {
					"top": "390px",
					"left": "50px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_5 = new cpr.controls.InputBox("ipb5");
				inputBox_5.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_5, {
					"top": "390px",
					"left": "144px",
					"width": "160px",
					"height": "35px"
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "생년월일";
				output_6.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_6, {
					"top": "210px",
					"left": "344px",
					"width": "95px",
					"height": "35px"
				});
				var output_7 = new cpr.controls.Output();
				output_7.value = "핸드폰 번호";
				output_7.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_7, {
					"top": "270px",
					"left": "344px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_6 = new cpr.controls.InputBox("ipb7");
				inputBox_6.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_6, {
					"top": "270px",
					"left": "438px",
					"width": "160px",
					"height": "35px"
				});
				var output_8 = new cpr.controls.Output();
				output_8.value = "전화번호";
				output_8.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_8, {
					"top": "330px",
					"left": "344px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_7 = new cpr.controls.InputBox("ipb8");
				inputBox_7.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_7, {
					"top": "330px",
					"left": "438px",
					"width": "160px",
					"height": "35px"
				});
				var output_9 = new cpr.controls.Output();
				output_9.value = "이메일 주소";
				output_9.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_9, {
					"top": "390px",
					"left": "344px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_8 = new cpr.controls.InputBox("ipb9");
				inputBox_8.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_8, {
					"top": "390px",
					"left": "438px",
					"width": "160px",
					"height": "35px"
				});
				var output_10 = new cpr.controls.Output();
				output_10.value = "회원구분";
				output_10.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_10, {
					"top": "210px",
					"left": "641px",
					"width": "95px",
					"height": "35px"
				});
				var output_11 = new cpr.controls.Output();
				output_11.value = "우편번호";
				output_11.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_11, {
					"top": "270px",
					"left": "641px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_9 = new cpr.controls.InputBox("ipb11");
				inputBox_9.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_9, {
					"top": "270px",
					"left": "735px",
					"width": "120px",
					"height": "35px"
				});
				var output_12 = new cpr.controls.Output();
				output_12.value = "주소";
				output_12.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_12, {
					"top": "330px",
					"left": "641px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_10 = new cpr.controls.InputBox("ipb12");
				inputBox_10.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_10, {
					"top": "330px",
					"left": "735px",
					"width": "250px",
					"height": "35px"
				});
				var output_13 = new cpr.controls.Output();
				output_13.value = "상세주소";
				output_13.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#cecece",
					"border-top-width" : "1px",
					"border-right-width" : "1px",
					"border-left-color" : "#cecece",
					"border-right-color" : "#cecece",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"border-radius" : "5px 0px 0px 5px",
					"background-color" : "#EDEDED",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#cecece",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				container.addChild(output_13, {
					"top": "390px",
					"left": "641px",
					"width": "95px",
					"height": "35px"
				});
				var inputBox_11 = new cpr.controls.InputBox("ipb13");
				inputBox_11.style.css({
					"border-radius" : "0px 5px 5px 0px"
				});
				container.addChild(inputBox_11, {
					"top": "390px",
					"left": "735px",
					"width": "250px",
					"height": "35px"
				});
				var dateInput_1 = new cpr.controls.DateInput("dti1");
				dateInput_1.placeholder = "YYYY-MM-DD";
				container.addChild(dateInput_1, {
					"top": "210px",
					"left": "438px",
					"width": "160px",
					"height": "35px"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "주소 찾기";
				container.addChild(button_1, {
					"top": "270px",
					"left": "885px",
					"width": "100px",
					"height": "35px"
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdb1");
				radioButton_1.style.css({
					"border-right-style" : "solid",
					"border-top-width" : "1px",
					"border-bottom-color" : "#bbbbbb",
					"border-right-width" : "1px",
					"border-left-color" : "#bbbbbb",
					"border-right-color" : "#bbbbbb",
					"border-left-width" : "1px",
					"border-top-style" : "solid",
					"background-color" : "white",
					"border-radius" : "0px 5px 5px 0px",
					"border-left-style" : "solid",
					"border-bottom-width" : "1px",
					"border-top-color" : "#bbbbbb",
					"border-bottom-style" : "solid",
					"text-align" : "center"
				});
				(function(radioButton_1){
					radioButton_1.setItemSet(app.lookup("accountBtn"), {
						"label": "person",
						"value": "value"
					})
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"top": "210px",
					"left": "736px",
					"width": "200px",
					"height": "35px"
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "등 록";
				button_2.style.css({
					"font-size" : "17px"
				});
				container.addChild(button_2, {
					"top": "495px",
					"left": "462px",
					"width": "100px",
					"height": "40px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "150px",
				"left": "0px",
				"width": "1024px",
				"height": "598px"
			});
			
			var output_14 = new cpr.controls.Output("title");
			output_14.value = "회원 등록";
			output_14.style.css({
				"font-weight" : "bold",
				"font-size" : "25px",
				"text-align" : "center"
			});
			container.addChild(output_14, {
				"top": "90px",
				"left": "353px",
				"width": "318px",
				"height": "50px"
			});
		}
	});
	app.title = "PosCust";
	cpr.core.Platform.INSTANCE.register(app);
})();