/************************************************
 * ResponsiveVertical.module.js
 * Created at 2019. 3. 27. 오후 2:36:09.
 *
 * @author jeeeyul
 ************************************************/

var ATTR_MOBILE_FIT = "mobile-fit";
var ATTR_TABLET_FIT = "tablet-fit";

var ATTR_HIDE_ON_MOBILE = "hide-on-mobile";
var ATTR_HIDE_ON_TABLET = "hide-on-tablet";

var ATTR_MOBILE_T_MARGIN = "mobile-top-margin";
var ATTR_MOBILE_R_MARGIN = "mobile-right-margin";
var ATTR_MOBILE_B_MARGIN = "mobile-bottom-margin";
var ATTR_MOBILE_L_MARGIN = "mobile-left-margin";
var ATTR_TABLET_T_MARGIN = "tablet-top-margin";
var ATTR_TABLET_R_MARGIN = "tablet-right-margin";
var ATTR_TABLET_B_MARGIN = "tablet-bottom-margin";
var ATTR_TABLET_L_MARGIN = "tablet-left-margin";

var ATTR_MOBILE_SPACING = "mobile-spacing";
var ATTR_TABLET_SPACING = "tablet-spacing";

/**
 * 
 * @param {cpr.controls.Container} container
 */
function RVertical(container) {
	this._container = container;
	this._appInstance = container.getAppInstance();
	this._started = false;
	this._onScreenChange = this._onScreenChange.bind(this);
}

RVertical.prototype._backup = function() {
	this._originalLayout = this._container.getLayout();
}

/** @type cpr.controls.layouts.VerticalLayout */
RVertical.prototype._originalLayout = null;

RVertical.prototype._transform = function() {
	var originalLayout = this._originalLayout;
	var layout = new cpr.controls.layouts.VerticalLayout();
	this._container.setLayout(layout);
	
	layout.topMargin = originalLayout.topMargin;
	layout.rightMargin = originalLayout.rightMargin;
	layout.bottomMargin = originalLayout.bottomMargin;
	layout.leftMargin = originalLayout.leftMargin;
	layout.spacing = originalLayout.spacing;
	layout.scrollable = originalLayout.scrollable;
	
	/** @type String */
	var tMargin;
	
	/** @type String */
	var rMargin;
	
	/** @type String */
	var bMargin;
	
	/** @type String */
	var lMargin;
	
	/** @type String */
	var spacing;
	
	switch (this._container.getAppInstance().targetScreen.name) {
		case "mobile": {
			tMargin = parseInt(this._container.userAttr(ATTR_MOBILE_T_MARGIN) || layout.topMargin);
			rMargin = parseInt(this._container.userAttr(ATTR_MOBILE_R_MARGIN) || layout.rightMargin);
			bMargin = parseInt(this._container.userAttr(ATTR_MOBILE_B_MARGIN) || layout.bottomMargin);
			lMargin = parseInt(this._container.userAttr(ATTR_MOBILE_L_MARGIN) || layout.leftMargin);
			spacing = parseInt(this._container.userAttr(ATTR_MOBILE_SPACING) || layout.spacing);
			layout.distribution = "fill";
			
			/* 사용자 속성 "hide-on-mobile"의 값이 true면 visible false 처리 */
			if (this._container.userAttr(ATTR_HIDE_ON_MOBILE) == "true") {
				this._container.visible = false;
			} else {
				this._container.visible = true;
			}
			
			break;
		}
		
		case "tablet": {
			tMargin = parseInt(this._container.userAttr(ATTR_TABLET_T_MARGIN) || layout.topMargin);
			rMargin = parseInt(this._container.userAttr(ATTR_TABLET_R_MARGIN) || layout.rightMargin);
			bMargin = parseInt(this._container.userAttr(ATTR_TABLET_B_MARGIN) || layout.bottomMargin);
			lMargin = parseInt(this._container.userAttr(ATTR_TABLET_L_MARGIN) || layout.leftMargin);
			spacing = parseInt(this._container.userAttr(ATTR_TABLET_SPACING) || layout.spacing);
			layout.distribution = "fill";
			
			/* 사용자 속성 "hide-on-tablet"의 값이 true면 visible false 처리 */
			if (this._container.userAttr(ATTR_HIDE_ON_TABLET) == "true") {
				this._container.visible = false;
			} else {
				this._container.visible = true;
			}
			
			break;
		}
	}
	
	layout.topMargin = tMargin;
	layout.rightMargin = rMargin;
	layout.bottomMargin = bMargin;
	layout.leftMargin = lMargin;
	layout.spacing = spacing;
};

RVertical.prototype._restore = function() {
	this._container.setLayout(this._originalLayout);
	
	if(!this._container.disposed) {
		this._container.visible = true;
	}
};

RVertical.prototype.start = function() {
	if (this._started) {
		return;
	}
	this._backup();
	
	this._appInstance.addEventListener("screen-change", this._onScreenChange);
};

/**
 * @param {cpr.events.CScreenChangeEvent} e
 */
RVertical.prototype._onScreenChange = function(e) {
	var screenName = e.screen.name;
	switch (screenName) {
		case "default": {
//			this._originalLayout.distribution = "center";
			
			if (this._container.userAttr(ATTR_HIDE_ON_MOBILE) == "false" || this._container.userAttr(ATTR_HIDE_ON_TABLET) == "false") {
				this._container.visible = false;
			} else {
				this._restore();
			}
			
			break;
		}
		
		case "mobile": {
			if (this._container.userAttr(ATTR_MOBILE_FIT) == "true") {
				this._transform();
			} else {
				this._restore();
			}
			
			break;
		}
		
		case "tablet": {
			if (this._container.userAttr(ATTR_TABLET_FIT) == "true") {
				this._transform();
			} else {
				this._restore();
			}
			
			break;
		}
	}
};

/**
 * 
 * @param {cpr.controls.Container} container
 */
globals.makeVResponsive = function(container) {
	return new RVertical(container);
};
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
//	if (e.control instanceof cpr.core.AppInstance) {
//		/** @type cpr.core.AppInstance */
//		var appInstance = e.control;
//		var targetGroups = appInstance.getContainer().getAllRecursiveChildren(true).filter(function( /* cpr.controls.UIControl */ each) {
//			if (each instanceof cpr.controls.Container) {
//				if (each.getLayout() instanceof cpr.controls.layouts.VerticalLayout && (each.userAttr(ATTR_MOBILE_FIT) || each.userAttr(ATTR_TABLET_FIT))) {
//					return true;
//				}
//			}
//			return false;
//		});
//		
//		targetGroups.forEach(function( /* cpr.controls.Container */ each) {
//			var rVertical = new RVertical(each);
//			rVertical.start();
//		});
//	}
//});