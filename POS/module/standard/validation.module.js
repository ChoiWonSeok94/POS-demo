
//exports.id = "validation.module.js";

// 의존 모듈 선언.
module.depends("module/standard/common");


/**
 * 공통 Validator Class
 */
Validator = function(appKit) {
	/** @type AppKit */
	this._appKit = appKit;
};


/**
 * 
 * @param {cpr.controls.UIControl} ctrl
 * @param {String} ctrlValue
 * @param {cpr.controls.UIControl} poParentCtl
 * @param {Number} pnIdx
 * @param {Number} pnCellIdx
 * @param {Boolean} isMsgAlert validation 메시지 출력 여부
 */
Validator.prototype.validate = function(ctrl, ctrlValue, poParentCtl, pnIdx, pnCellIdx, poRow, isMsgAlert) {
	if(!ctrl) return true;
	if(ctrl.type == "output" || ctrl.type == "img" || ctrl.type == "button") return true;
	
	isMsgAlert = isMsgAlert == null ? true : isMsgAlert;
	
	//바인딩 및 헤더컬럼으로 수정 필요
	var vsFieldLabel = ctrl.fieldLabel;
	if(ValueUtil.isNull(vsFieldLabel) && ctrl.getHost){
		vsFieldLabel = ctrl.getHost().fieldLabel;
	}
	function getGridFieldLabel(poParentCtl, psFieldLabel){
		if(poParentCtl instanceof cpr.controls.Grid){
			var vcDetailCtl = poParentCtl.detail.getColumn(pnCellIdx);
			var vaHeaderCtl = poParentCtl.header.getColumnByColIndex(vcDetailCtl.colIndex, vcDetailCtl.colSpan);
			if(vaHeaderCtl.length > 0){
				var vcHeaderCtl = vaHeaderCtl[0];
				if(vcHeaderCtl){
					psFieldLabel = vcHeaderCtl.getText();
				}
			}
		}
		return psFieldLabel;
	}
	
	var _appKit = this._appKit;
	function parentValidMsg(psMsg, poParentCtl, pnIdx){
		//그리드 내 컨트롤
		if(poParentCtl instanceof cpr.controls.Grid){
			var vsMsg = _appKit.Msg.getMsg("WRN-M002", [poParentCtl.fieldLabel, Number(pnIdx)+1]);
			psMsg = vsMsg + " " + psMsg;
		}
		if(isMsgAlert){
//			_appKit.Msg.alert(psMsg, "WARNING");
			var poOptions = {"closeCallback" : function() {ctrl.focus();}};
			_appKit.Msg.alertDlg(ctrl.getAppInstance(), psMsg, "WARNING", poOptions);
		}
	}
	
	// 필수 입력 체크
	{
		var notnull = "";
		if(poParentCtl instanceof cpr.controls.Grid && ctrl instanceof cpr.controls.UDCBase){
			notnull = ctrl.getAppProperty("required") === true || ctrl.getAppProperty("required") === "Y" ? "Y" : "";
		}else{
			notnull = ctrl.userAttr("required");
			
			//kimjj append 2021-09-03
			//해당 controle or label(output)에 requerd class를 통한 필수 체크 
			//<-----------------------------------------------------------
			
			var vsLableId = ctrl.fieldLabel; 
			var voCtrlLabelobj = ctrl.getAppInstance().lookup(vsLableId);
			
			if( !!voCtrlLabelobj ){
					var vsaLabelStyleNm = voCtrlLabelobj.style.getClasses() ;
					vsaLabelStyleNm.forEach(function(vsStyleNm){
						if( AppProperties.M_REQUIRED_STYLE.indexOf(","+vsStyleNm+",")>-1){
							notnull = "Y" ;
						}
					}); 
			}
			
			var vsaStyleNm = ctrl.style.getClasses() ;
			vsaStyleNm.forEach(function(vsStyleNm){
				if( AppProperties.M_REQUIRED_STYLE.indexOf(","+vsStyleNm+",")>-1){
					notnull = "Y" ;
				}
			}); 
			
			//-----------------------------------------------------------> 
			
		}
		if(notnull === "Y") {
			if(ctrlValue == null || new String(ctrlValue) == "") {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) 필수 입력 항목입니다.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M001", [vsFieldLabel]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				
				return false;
			}
		}
	}
	
	
	
	// 지정된 컬럼중 하나 이상 필수 입력 체크
	// 그리드일경우 columnname, 그룹 및 일반컨트롤일 경우 id
	{
		var xorNull = ctrl.userAttr("xorRequired");
		if(xorNull) {
			var vaXorNull = ValueUtil.split(xorNull.replace(/\[|\]/g,""), ",");
			var vsName = "";
			//그리드 내 컨트롤
			
			var vbStatus = false;
			if(poParentCtl instanceof cpr.controls.Grid){
				for (var j = 0; j < vaXorNull.length; j++) {
					var vsValue = poRow != null ? poRow.getValue(vaXorNull[j]) : poParentCtl.getCellValue(pnIdx, vaXorNull[j]);
					if(!ValueUtil.isNull(vsValue)){
						vbStatus = true;
						break;
					}
					var vaDetailCell = poParentCtl.detail.getColumnByName(vaXorNull[j]);
					vaDetailCell.some(function(vcCell){
						var vcHeaderCtl = poParentCtl.header.getColumn(vcCell.colIndex).control;
						if(vcHeaderCtl)
							vsName += vcHeaderCtl.getText() + " ,";
						//vsName += vcCell.control.userattr("name") + " ,";
					});
				}
				if(!vbStatus){
					//{0}중 하나는 필수 입력 항목입니다.
					var vsMsg = this._appKit.Msg.getMsg("WRN-M003", [vsName.substring(0, vsName.length -1)]);
					parentValidMsg(vsMsg, poParentCtl, pnIdx);
					return false;
				}
			}else{
				for (var j = 0; j < vaXorNull.length; j++) {
					var vcCtl = ctrl.getAppInstance().lookup(vaXorNull[j]);
					var vsValue = vcCtl.value;
					if(!ValueUtil.isNull(vsValue)){
						vbStatus = true;
						break;
					}
					vsName += vcCtl.fieldLabel + " ,";
				}
				
				if(!vbStatus){
					//{0}중 하나는 필수 입력 항목입니다.
					var vsMsg = this._appKit.Msg.getMsg("WRN-M003", [vsName.substring(0, vsName.length -1)]);
					parentValidMsg(vsMsg, poParentCtl, pnIdx);
					return false;
				}
			}
		}
	}
	
	// 나머지 항목은 값이 있을 때만 체크
	if(ctrlValue == null || ctrlValue == "") return true;
	
	// type check
	{
		var type = ctrl.userAttr("columnType");
		if(type) {
			var isChk = true;
			if(type == "email"){
				isChk = TypeUtil.isEmail(ctrlValue);
			}else if(type == "ssn"){
				isChk = TypeUtil.isSSN(ctrlValue);
			}else if(type == "bizno"){
				isChk = TypeUtil.isBizCSN(ctrlValue);
			}else if(type == "phone"){
				isChk = TypeUtil.isTelMobile(ctrlValue);
			}else if(type == "tel"){
				isChk = TypeUtil.isTelNo(ctrlValue);
			}else if(type == "url"){
				isChk = TypeUtil.isURL(ctrlValue);
			}
			if(isChk == false) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) 유효하지 않은 형식입니다.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M004", [vsFieldLabel]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	// minlength
	{
		var minlength = ctrl.userAttr("minlength");
		if(minlength) {
			var minlengthNum = Number(minlength);
			var length = ValueUtil.getLength(ctrlValue, ctrl.lengthUnit);
			if(length < minlength) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) {1}자 이상으로 입력하십시오.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M005", [vsFieldLabel, minlength]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	// fixlength
	{
		var fixlength = ctrl.userAttr("fixlength");
		if(fixlength) {
			var fixlength = Number(fixlength);
			var length = ValueUtil.getLength(ctrlValue, ctrl.lengthUnit);
			if(length != fixlength) {
				vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
				//{0}은(는) {1} 자리수만큼 입력하십시오.
				var vsMsg = this._appKit.Msg.getMsg("WRN-M006", [vsFieldLabel, fixlength]);
				parentValidMsg(vsMsg, poParentCtl, pnIdx);
				return false;
			}
		}
	}
	
	{
		//두 값을 비교
		//그리드 일경우 컬럼명, 일반 컨트롤일 경우 컨트롤 id
		var compare = ctrl.userAttr("compare");
		if(!ValueUtil.isNull(compare)) {
			var compareCol = compare.substring(0, compare.indexOf(","));
			var compareType = compare.substr(compare.indexOf(",") + 1).trim();
			//그리드 내 컨트롤
			var vbStatus = false;
			var vsCompareColValue;
        	var vsCompareColLable;
        	var value = ctrlValue;
			if(poParentCtl instanceof cpr.controls.Grid){
				vsCompareColValue = poRow != null ? poRow.getValue(compareCol) : poParentCtl.getCellValue(pnIdx, compareCol);
				var vcDetailColumn = poParentCtl.detail.getColumnByName(compareCol)[0];
				var vaHeaderCol = poParentCtl.header.getColumnByColIndex(vcDetailColumn.colIndex, vcDetailColumn.colSpan);
				if(vaHeaderCol.length > 0){
					var vcHeaderCtl = vaHeaderCol[0];
					if(vcHeaderCtl){
						vsCompareColLable = vcHeaderCtl.getText();
					}
				}
			}else{
				vsCompareColValue = ctrl.getAppInstance().lookup(compareCol).value;
				vsCompareColLable = ctrl.getAppInstance().lookup(compareCol).fieldLabel
			}
			
			if(!ValueUtil.isNull(value) && !ValueUtil.isNull(vsCompareColValue)){
				var vbReturn = false;
				var vsCompareVal = "'"+value+"'" + compareType + "'"+vsCompareColValue+"'";
				var vsCompareValNumber = value + compareType + vsCompareColValue;
				if (ValueUtil.isNumber(value) && ValueUtil.isNumber(vsCompareColValue)) {
					vbReturn = Function('"use strict";return (' + vsCompareValNumber + ')')();	
				}else{
					vbReturn = Function('"use strict";return (' + vsCompareVal + ')')();	
				}
		            
	            if (!vbReturn) {
	            	 vsFieldLabel = getGridFieldLabel(poParentCtl, vsFieldLabel);
	            	 var vsMsg = "";
	            	if(compareType == "<=" || compareType == "<" ){
	            		//{0}은(는) {1}보다 클 수 없습니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M009", [vsFieldLabel, vsCompareColLable]);
	            	}else if (compareType == ">=" || compareType == ">" ){
	            		//{0}은(는) {1}보다 작을수 없습니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M010", [vsFieldLabel, vsCompareColLable]);
	            	}else if (compareType == "==" || compareType == "="){
	            		//{0}은(는) {1}와 같아야 합니다.
	            		vsMsg = this._appKit.Msg.getMsg("WRN-M011", [vsFieldLabel, vsCompareColLable]);
	            	}else{
	            		
	            	}
	            	parentValidMsg(vsMsg, poParentCtl, pnIdx);
	                return false;
	            }
			}
		}
	}
	return true;
}
 