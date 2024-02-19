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

				//반응형 모듈 
				that.Responsive.run(e);
				
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
	}
}

AppInitTask.init();
