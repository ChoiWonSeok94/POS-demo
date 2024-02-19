/*
 * App URI: PosMoney
 * Source Location: PosMoney.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4807), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("PosMoney", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * PosMoney.js
			 * Created at 2024. 1. 22. 오전 12:48:06.
			 *
			 * @author PC2
			 ************************************************/;
			// End - User Script
			
			// Header
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
				"background-color" : "#E0E0E0"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "최종 잔액";
				output_1.style.css({
					"background-color" : "#BEBEBE",
					"border-radius" : "35px 35px 35px 35px",
					"font-weight" : "bold",
					"font-size" : "16px",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "413px",
					"left": "334px",
					"width": "140px",
					"height": "40px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "217,500원";
				output_2.style.css({
					"font-weight" : "bold",
					"font-size" : "16px",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "413px",
					"left": "527px",
					"width": "182px",
					"height": "40px"
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"border-bottom-color" : "#c7c7c7",
					"border-bottom-width" : "4px",
					"border-bottom-style" : "solid"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_3 = new cpr.controls.Output();
					output_3.value = "입 금";
					output_3.style.css({
						"background-color" : "#BEBEBE",
						"border-radius" : "40px 40px 40px 40px",
						"font-weight" : "bold",
						"font-size" : "20px",
						"text-align" : "center"
					});
					container.addChild(output_3, {
						"top": "38px",
						"left": "41px",
						"width": "140px",
						"height": "110px"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipb1");
					inputBox_1.placeholder = "금액을 입력해 주세요. ";
					inputBox_1.style.css({
						"border-radius" : "5px 5px 5px 5px",
						"text-align" : "right"
					});
					container.addChild(inputBox_1, {
						"top": "38px",
						"left": "191px",
						"width": "294px",
						"height": "48px"
					});
					var inputBox_2 = new cpr.controls.InputBox("ipb2");
					inputBox_2.placeholder = "내용을 입력해 주세요.";
					inputBox_2.style.css({
						"border-radius" : "5px 5px 5px 5px",
						"text-align" : "right"
					});
					container.addChild(inputBox_2, {
						"top": "100px",
						"left": "191px",
						"width": "294px",
						"height": "48px"
					});
					var button_1 = new cpr.controls.Button();
					button_1.value = "입금하기";
					button_1.style.css({
						"font-size" : "17px"
					});
					container.addChild(button_1, {
						"top": "73px",
						"left": "508px",
						"width": "100px",
						"height": "40px"
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "출 금";
					output_4.style.css({
						"background-color" : "#BEBEBE",
						"border-radius" : "40px 40px 40px 40px",
						"font-weight" : "bold",
						"font-size" : "20px",
						"text-align" : "center"
					});
					container.addChild(output_4, {
						"top": "176px",
						"left": "41px",
						"width": "140px",
						"height": "110px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipb3");
					inputBox_3.placeholder = "금액을 입력해 주세요.";
					inputBox_3.style.css({
						"border-radius" : "5px 5px 5px 5px",
						"text-align" : "right"
					});
					container.addChild(inputBox_3, {
						"top": "176px",
						"left": "191px",
						"width": "294px",
						"height": "48px"
					});
					var inputBox_4 = new cpr.controls.InputBox("ipb4");
					inputBox_4.placeholder = "내용을 입력해 주세요.";
					inputBox_4.style.css({
						"border-radius" : "5px 5px 5px 5px",
						"text-align" : "right"
					});
					container.addChild(inputBox_4, {
						"top": "238px",
						"left": "191px",
						"width": "294px",
						"height": "48px"
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = "출금하기";
					button_2.style.css({
						"font-size" : "17px"
					});
					container.addChild(button_2, {
						"top": "211px",
						"left": "508px",
						"width": "100px",
						"height": "40px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "64px",
					"left": "195px",
					"width": "628px",
					"height": "320px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "150px",
				"left": "0px",
				"width": "1024px",
				"height": "598px"
			});
			
			var output_5 = new cpr.controls.Output("title");
			output_5.value = "시재금";
			output_5.style.css({
				"font-weight" : "bold",
				"font-size" : "25px",
				"text-align" : "center"
			});
			container.addChild(output_5, {
				"top": "90px",
				"left": "353px",
				"width": "318px",
				"height": "50px"
			});
		}
	});
	app.title = "PosMoney";
	cpr.core.Platform.INSTANCE.register(app);
})();
