/************************************************
 * event.module.js
 * Created at 2021. 10. 15 오후 4:56:54.
 *
 * @author
 ************************************************/

/**
 * 앱 init시 처리로직 담당 변수
 * - 반응형 작업
 */
var AppInitTask = {
	vaCtl : null, //대상컨트롤
	
	init : function(){
		var that = this;
		
		cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
			if(e.control instanceof cpr.core.AppInstance){
				
				/** @type cpr.core.AppInstance */
				var appInstance = e.control;
				
				that.vaCtl = appInstance.getContainer().getAllRecursiveChildren(true);

				//that.FloatFooter.run(e);
				//반응형 모듈 
				that.Responsive.run(e);
				//that.AdabtiveTab.run(e);
				
				var vaGrids = appInstance.getContainer().getAllRecursiveChildren(false).filter(function(each){
						return each instanceof cpr.controls.Grid;
					}).forEach(function(each){
						if (each.userAttr("transform-on-mobile") == "true" && each.userAttr("hide-column-indicies") != ""){
							makeResponsiveGrid(each);
						}
				});
			}
		});
	},
	
	FloatFooter : {
		constants : {},
		run : function(e){
			if(!(e.control instanceof cpr.core.AppInstance)) return;
			
			var targetApp = e.control;
			var footer = targetApp.lookup("grpFooter");
			if(footer){
				targetApp.floatControl(footer, {
					bottom : 0,
					left : 0,
					right : 0,
					height : "40px"
					
				});
			}
		}
	},
	
	Responsive : {
		constants : {
			ATTR_MOBILE_H_MARGIN : "mobile-horizontal-margin",
			ATTR_MOBILE_V_MARGIN : "mobile-vertical-margin",
			ATTR_TABLET_H_MARGIN : "tablet-horizontal-margin",
			ATTR_TABLET_V_MARGIN : "tablet-vertical-margin",
			
			ATTR_MOBILE_COLUMN_COUNT : "mobile-column-count",
			ATTR_TABLET_COLUMN_COUNT : "tablet-column-count",
			//폼레이아웃 자식내 모바일일경우 숨김 지정
			ATTR_HIDE_ON_MOBILE : "hide-on-mobile",
			ATTR_NEEDS_AUTO_HEIGHT : "needs-auto-height",
			ATTR_COLLAPSE_DIRECTION : "collapse-direction",
			
			ATTR_MOBILE_MIN_HEIGHT : "mobile-min-height",
			ATTR_TABLET_MIN_HEIGHT : "tablet-min-height",
			
			ATTR_MOBILE_INDEX : "mobile-index",
			ATTR_TABLET_INDEX : "tablet-index",
			//모바일일 경우 그리드 cell 숨기기.
			ATTR_HIDE_CELL_INDICIES : "hide-cell-indicies"
		},
		
		run : function(e){
			if(!(e.control instanceof cpr.core.AppInstance)) return;
			
			/** @type cpr.core.AppInstance */
			var appInstance = e.control;
			var that = this;
//			var mainAppId = cpr.core.Platform.INSTANCE.getAllLoadedApps().find(function(each){
//				//return each.id === "app/com/main/main"
//				return each.id === AppProperties.MAIN_APP_ID
//				
//			});

//			if (!mainAppId) return;
			
//			var mainApp = mainAppId.getInstances()[0];
			
//			var cmbScreen = mainApp.lookup("cmbScreen");
			var vaCtl = AppInitTask.vaCtl
			vaCtl.some(function(each){
				if (each instanceof cpr.controls.Container) {
					if (each.getLayout() instanceof cpr.controls.layouts.FormLayout && each.userAttr("mobile-column-count") != "") {
						each.userAttr("responsive-configured", "true");
						var rForm = makeResponsive(each)
						
						each["_RForm"] = rForm;
						rForm.setColumnSettings("mobile", parseInt(each.userAttr(that.constants.ATTR_MOBILE_COLUMN_COUNT) || "0"));
						rForm.setColumnSettings("tablet", parseInt(each.userAttr(that.constants.ATTR_TABLET_COLUMN_COUNT) || "0"));
						rForm.start();
						
//						if(cmbScreen && cmbScreen.value === "mobile"){
//							cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
//								rForm._transform(parseInt(each.userAttr(that.constants.ATTR_MOBILE_COLUMN_COUNT) || "0"));
//							});
//							
//						}
					}
					
					else if(each.getLayout() instanceof cpr.controls.layouts.VerticalLayout && (each.userAttr("mobile-fit") || each.userAttr("tablet-fit"))){
						var rVertical = makeVResponsive(each);
						rVertical.start();
					}
				}
				 if(each instanceof cpr.controls.Grid && each.userAttr(that.constants.ATTR_HIDE_CELL_INDICIES) != ""){
					makeResponsiveGrid(each)
				}	
			});
		}
	},
	
	AdabtiveTab : {
		constants : {},
		run : function(e){
			/** @type cpr.core.AppInstance */
			var appInstance = e.control;
			
			AppInitTask.vaCtl.filter(function(/* cpr.controls.UIControl */ each){
				return each instanceof cpr.controls.TabFolder && each.userAttr("transform-on-mobile") == "true";
			}).forEach(function(/* cpr.controls.UIControl */ each){
				//var aTab = makeAdaptiveTab(each)
				//aTab.start();
			});
		}
	}
}

/**
 * 인풋박스 공통 이벤트처리 담당 변수
 */
var InputBoxInitTask = {
	init : function(){
		var that = this;
		cpr.events.EventBus.INSTANCE.addFilter("before-value-change", function(e){
			that.CaseTransform.run(e);
		});
	},
	
	CaseTransform : {
		run : function(e){
			// 이벤트를 발생 시킨 컨트롤
		    var control = e.control;
		    /** @type cpr.core.AppInstance */
		    
		    // 이벤트 발송자가 인풋박스이면.
		    if (control.type === "inputbox") {
		    	var inputLetter = control.userAttr("inputLetter");
				if (inputLetter == "uppercase") {
					if (/[a-z]/g.test(e.newValue)) {
						var newValue = e.newValue.toUpperCase();
						control.value = newValue;
						e.preventDefault();
						e.stopPropagation();
					}
				} else if (inputLetter == "lowercase") {
					if (/[A-Z]/g.test(e.newValue)) {
						var newValue = e.newValue.toLowerCase();
						control.value = newValue;
						e.preventDefault();
						e.stopPropagation();
					}
				}
		    }
		}
	}
}

var KeyFocusEventTask = {
	init : function(){
		
		cpr.events.EventBus.INSTANCE.addFilter("keydown", function( /* cpr.events.CKeyboardEvent*/ e) {
			// 탭 키가 눌리면 키보드 포커스 스타일 시트를 활성화 함.
			if (e.key == "Tab") {
				var keyBoardCssLink = document.querySelector("head link[href*=\"focus.keyboard.css\"]");
				if(keyBoardCssLink){
					keyBoardCssLink.removeAttribute("disabled");	
				}
				
			}
		});
	
		cpr.events.EventBus.INSTANCE.addFilter("mousedown", function(e) {
			// 마우스가 클릭디면 키보드 포커스 스타일 시트를 비활성화 함.
			var keyBoardCssLink = document.querySelector("head link[href*=\"focus.keyboard.css\"]");
			if(keyBoardCssLink){
				keyBoardCssLink.setAttribute("disabled", true);	
			}
		});
	}
}

AppInitTask.init();
InputBoxInitTask.init();
//KeyFocusEventTask.init();
