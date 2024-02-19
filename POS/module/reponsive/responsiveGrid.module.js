/************************************************
 * responsiveGrid.module.js
 * Created at 2021. 8. 19. 오후 1:04:38.
 *
 * @author ryu
 ************************************************/

//module.depends("module/reponsive/responsiveForm");

/************************************************
 * 사용자 속성 리스트
 ************************************************/

var ATTR_TRANSFORM_ON_MOBILE = "transform-on-mobile";

var ATTR_HIDE_COLUMN_INDICES = "hide-column-indicies";

/************************************************
 * 공통모듈 옵션
 ************************************************/

/**
 * 행 높이 자동조절
 * @type {Boolean}
 */
var mbAutoRowHeight = false;

/**
 * 독점적 아코디언 사용 여부
 * (다른 행을 클릭하면 이미 열렸던 행을 접는 기능)
 * @type {Boolean}
 */
var mbExclusive = false;

/**
 * 아코디언 영역 내 여백
 * @type {Number}
 */
var mnInnerMargin = 5;

/**
 * 디테일 영역을 접거나 펼칠 수 있는 영역을 추가합니다.
 * (해당 값이 false 면 행을 클릭했을 때 접거나 펼쳐집니다.)
 * @type {Boolean}
 */
var mbAddExpander = false;

/**
 * 디테일행 익스펜더 버튼 클래스명
 * @type {String}
 */
var msExpanderClassName = "btn-expander";

/**
 * 그리드 형태 폼 클래스명
 * @type {String}
 */
var msGridClassName = "table";

/**
 * 그리드 형태 폼 내 헤더 클래스명
 * @type {String}
 */
var msGridHeaderClassName = "table-header";

/**
 * 그리드 형태 폼 내 헤더 셀 클래스명
 * @type {String}
 */
var msGridHeaderCellClassName = "table-header-cell";

/**
 * 그리드 형태 폼 내 디테일 클래스명
 * @type {String}
 */
var msGridRowClassName = "table-row";

/**
 * 그리드 형태 폼 내 디테일 셀 클래스명
 * @type {String}
 */
var msGridRowCellClassName = "table-cell";

/**
 * 그리드 형태 폼 내 아코디언 디테일 셀 클래스명
 * @type {String}
 */
var msGridAccordionRowClassName = "table-accordion-row";


/**
 * 
 * @param {cpr.controls.Grid} grid
 */
function RGrid(grid) {
	/** @type cpr.controls.Grid */
	this._grid = grid;
	/** @type cpr.core.AppInstance */
	this._app = grid.getAppInstance();
	/** @type cpr.controls.Container */
	this._parentContainer = this._grid.getParent();
	
	this._columnSettings = [];
	
	this._onScreenChange = this._onScreenChange.bind(this);
	this._app.addEventListener("screen-change", this._onScreenChange);
	grid.addEventListener("dispose", this._handleDispose.bind(this));
}

RGrid.prototype._columnSettings = [];

/**
 * 그리드를 폼 형태로 그리기 위한 데이터를 정의합니다.
 */
RGrid.prototype.setColumnSettings = function() {
	var grid = this._grid;
	
	var header = grid.header;	
	var detail = grid.detail;
	
	var autoFit = grid.autoFit.replace(/\s/g, "");
	var autoFitCols = autoFit == "all" ? [] : autoFit.split(","); 
	
	for(var idx = 0; idx < detail.cellCount; idx++){
		var headerColumn = header.getColumnByColIndex(idx, 1)[0];
		var detailColumn = detail.getColumnByColIndex(idx, 1)[0];
		
		var subText = null;
		if (headerColumn.rowIndex > 0){
			var headerCellIndcs = grid.getHeaderCellIndices(detailColumn.cellIndex);
			var headerTxts = [];
			for(var cell = 0; cell < headerCellIndcs.length - 1; cell++){
				var text = grid.header.getColumn(headerCellIndcs[cell]).text;
				headerTxts.push(text);
			}
			subText = headerTxts.join("-");
		}
		
		// AutoFit이 해제된 컬럼인 경우 고정 값으로 생성
		var width = "1fr";
		if (autoFitCols.indexOf(headerColumn.colIndex.toString()) == -1){
			width = grid.getColumnWidths()[detailColumn.colIndex];
		}
		
		var column = {
			text: headerColumn.text,
			visible: headerColumn.visible,
			columnName: detailColumn.columnName,
			control: detailColumn.control,
			subText: subText,
			width: width
		}
		
		this._columnSettings.push(column);
	}
}

/**
 * 그리드가 dispose될 때 발생하는 이벤트
 * @param {cpr.events.CEvent} e
 */
RGrid.prototype._handleDispose = function(e) {
	this._app.removeEventListener("screen-change", this._onScreenChange);
}

/**
 * 스크린 사이즈가 변경됐을 때 발생하는 이벤트
 * @param {cpr.events.CScreenChangeEvent} e
 */
RGrid.prototype._onScreenChange = function(e) {
	switch (e.screen.name) {
		case "mobile":
		case "tablet":
			{
				this.start();
				break;
			}
		default:
			{
				this.stop();
				break;
			}
	}
}

/**
 * 반응형 그리드 적용
 */
RGrid.prototype.start = function() {
	if (this._started){
		return;
	}
	
	this._hide();
	this.setColumnSettings();
	this.collapse();
	this._started = true;
}

/**
 * 반응형 그리드 해제
 */
RGrid.prototype.stop = function() {
	if (!this._started){
		return;
	}
	
	this._revert();
	this.restore();
	this._started = false;
}

/**
 * 그리드 컬럼 상태를 재정의 합니다.
 */
RGrid.prototype._hide = function() {
	var indicies = this._grid.userAttr(ATTR_HIDE_COLUMN_INDICES).split(/[\s,]+/g).map(function( /* String */ each) {
		return parseInt(each);
	});
	var grid = this._grid;
	indicies.forEach(function( /* Number */ each) {
		if(grid.header.getColumn(each)){
			grid.header.getColumn(each).visible = false;	
		}
	});
}

/**
 * 그리드 컬럼 숨김 상태를 원복합니다.
 */
RGrid.prototype._revert = function() {
	var indicies = this._grid.userAttr(ATTR_HIDE_COLUMN_INDICES).split(/[\s,]+/g).map(function( /* String */ each) {
		return parseInt(each);
	});
	var grid = this._grid;
	indicies.forEach(function( /* Number */ each) {
		if(grid.header.getColumn(each)){
			grid.header.getColumn(each).visible = true;	
		}
	});
}



/**
 * 그리드 일부 컬럼을 숨기고 그리드를 폼 형태로 동적 생성합니다.
 */
RGrid.prototype.collapse = function() {
	var grid = this._grid;
	grid.visible = false;
	
	this._container = new cpr.controls.Container();
	var layout = new cpr.controls.layouts.FormLayout();
	this._container.setLayout(layout);
	
	var height = grid.header.getRowHeight(0);
	layout.setRows([height + "px", "1fr"]);
	
	/** @type Object[] */
	var visibleColumns = this._columnSettings.filter(function(each) {
		return each.visible == true;
	});
	
	var colCount = visibleColumns.map(function(each) {
		return each.width;
	});
	if (mbAddExpander){
		colCount.splice(0, 0, "30px");
	}
	layout.setColumns(colCount);
	
	if (mbAutoRowHeight){
		layout.setRowAutoSizing(0, true);
	}
	
	layout.horizontalSpacing = "0px";
	layout.verticalSpacing = "0px";
	layout.horizontalSeparatorWidth = 1;
	layout.verticalSeparatorWidth = 1;
	layout.setUseRowShade(0, true);
	layout.columnShadeClass = msGridHeaderClassName;
	this._container.style.addClass(msGridClassName);
	
	// 헤더셀 추가
	for(var idx = 0; idx < visibleColumns.length; idx++){
		var headerColumn = visibleColumns[idx];
		
		var headerCell = new cpr.controls.Output();
		headerCell.value = headerColumn.text;
		headerCell.style.addClass(msGridHeaderCellClassName);
		
		var colIndex = idx;
		if (mbAddExpander){
			colIndex += 1;
		}
		this._container.addChild(headerCell, {
			colIndex: colIndex,
			rowIndex: 0
		});
	}
	
	var colSpan = !mbAddExpander ? visibleColumns.length : visibleColumns.length + 1;
	
	// 디테일 영역 추가
	this._innerContainer = new cpr.controls.Container();
	this._setDetailCells(); // 디테일 내부 동적 생성
	this._container.addChild(this._innerContainer, {
		colIndex: 0,
		rowIndex: 1,
		colSpan: colSpan
	});
	
	var targetIndex = this._parentContainer.getChildren().indexOf(grid) + 1;
	this._parentContainer.insertChild(targetIndex, this._container, {
		autoSize: "height"
	});
}


/**
 * 그리드 상태를 원복합니다.
 */
RGrid.prototype.restore = function() {
	this._columnSettings = [];
	this._grid.visible = true;
	if (this._container){
		this._container.dispose();
	}
}

/**
 * 그리드 디테일 영역을 생성합니다.
 */
RGrid.prototype._setDetailCells = function() {
	var layout = new cpr.controls.layouts.VerticalLayout();
	this._innerContainer.setLayout(layout);
	
	layout.spacing = 0;
	
	var visibleColumn = this._columnSettings.filter(function(each) {
		return each.visible == true;
	});
	
	// 디테일 행 추가
	var height = this._container.getLayout().getRows()[0];
	var rowCount = this._grid.getRowCount();
	for(var row = 0; row < rowCount; row++){
		var tableRow = new cpr.controls.Container();
		var tableRowLayout = new cpr.controls.layouts.FormLayout();
		tableRow.setLayout(tableRowLayout);
		
		tableRowLayout.setColumns(this._container.getLayout().getColumns());
		tableRowLayout.setRows([height]);
		tableRowLayout.verticalSeparatorWidth = 1;
		tableRowLayout.horizontalSpacing = "0px";
		tableRowLayout.verticalSpacing = "0px";
		
		tableRow.style.addClass(msGridRowClassName);
		tableRow.setBindContext(new cpr.bind.DataRowContext(this._grid.dataSet, row));
		
		var detailCellCnt = tableRowLayout.getColumns().length;
		
		if (!mbAddExpander){
			tableRow.addEventListener("click", this._onClick);
		} else {
			detailCellCnt -= 1;
			
			var expander = new cpr.controls.Button();
			expander.style.setClasses(msExpanderClassName);
			expander.addEventListener("click", this._onClick);
			tableRow.addChild(expander, {
				colIndex: 0,
				rowIndex: 0
			});
		}
		
		if (mbAutoRowHeight){
			tableRowLayout.setRowAutoSizing(row, true);
		}
		
		// 디테일 셀 컨트롤 추가
		for(var col = 0; col < detailCellCnt; col++){
			var colIndex = mbAddExpander ? col + 1 : col;
			var column = visibleColumn[col];
			var child = this._copyControl(column);
			tableRow.addChild(child, {
				colIndex: colIndex,
				rowIndex: 0
			});
		}
		
		this._innerContainer.addChild(tableRow, {
			autoSize: "height"
		});
	}
	
	// 디테일 아코디언 행 추가
	var hideColumns = this._columnSettings.filter(function(each) {
		return each.visible == false;
	});
	var accordionCols = [];
	for(var idx = 0; idx < hideColumns.length; idx++){
		accordionCols.push(height);
	}
	var childCount = this._innerContainer.getChildrenCount();
	for(var aRow = 0; aRow < childCount; aRow++){
		var accordion = new cpr.controls.Container();
		var accordionLayout = new cpr.controls.layouts.FormLayout();
		accordion.setLayout(accordionLayout);
		
		accordionLayout.topMargin = mnInnerMargin;
		accordionLayout.rightMargin = mnInnerMargin;
		accordionLayout.bottomMargin = mnInnerMargin;
		accordionLayout.leftMargin = mnInnerMargin;
		
		accordionLayout.setRows(accordionCols);
		accordionLayout.setColumns(["1px", "1fr"]);
		accordionLayout.setColumnAutoSizing(0, true);
		accordion.style.addClass(msGridAccordionRowClassName);
		accordion.visible = false;
		
		accordion.setBindContext(new cpr.bind.DataRowContext(this._grid.dataSet, aRow));
		
		if (mbAutoRowHeight){
			for(var idx = 0; idx < accordionLayout.getRows().length; idx++){
				accordionLayout.setRowAutoSizing(idx, true);
			}
		}
		
		for(var innrRow = 0; innrRow < hideColumns.length; innrRow++){
			var innrColumn = hideColumns[innrRow];
			
			// 헤더 텍스트 추가
//			if (innrRow == 0){
//				var title = new cpr.controls.Output();
//				title.value = innrColumn.subText;				
//				title.style.addClass("title");
//				accordion.addChild(title, {
//					colIndex: 0,
//					rowIndex: 0,
//					colSpan: 2
//				});
//			}
			
			var label = new cpr.controls.Output();
			label.value = innrColumn.text;
			label.style.addClass("label");
			accordion.addChild(label, {
				colIndex: 0,
				rowIndex: innrRow
			});
			
			var accordionChild = this._copyControl(innrColumn);
			accordionChild.style.css("text-align", "right !important");
			accordion.addChild(accordionChild, {
				colIndex: 1,
				rowIndex: innrRow
			});
		}
		
		this._innerContainer.insertChild((aRow * 2) + 1, accordion, {
			autoSize: "height"
		});
	}
}


/**
 * 그리드 내 컨트롤을 복사합니다.
 * @param {control:cpr.controls.UIControl,columnName:String,visible:Boolean} column
 */
RGrid.prototype._copyControl = function(column) {
	var control = column["control"];
	var copyControl = null;
	if (control instanceof cpr.controls.Output) {
		copyControl = new cpr.controls.Output();
		copyControl.dataType = control.dataType;
		copyControl.format = control.format;
		copyControl.displayExp = control.displayExp;
	} else if (control instanceof cpr.controls.CheckBox) {
		copyControl = new cpr.controls.CheckBox();
		copyControl.trueValue = control.trueValue;
		copyControl.falseValue = control.falseValue;
	} else if (control instanceof cpr.controls.ComboBox) {
		copyControl = new cpr.controls.ComboBox();
		copyControl.setItemSet(control.dataSet, control.itemSetConfig);
		copyControl.hideButton = true;
	}
	
	//XXX 추가적인 컨트롤이 있을 시 컨트롤에 대하여 복사할 속성을 작성하십시오.
	
	// 디테일 셀 공통
	copyControl.fieldLabel = control.fieldLabel; 
	copyControl.bind("value").toDataColumn(column["columnName"]);
	copyControl.style.setClasses(control.style.getClasses());
	
	return copyControl;
}

/**
 * 디테일행을 접거나 펼칩니다.
 * @param {cpr.events.CMouseEvent} e
 */
RGrid.prototype._onClick = function(e) {
	/** @type cpr.controls.UIControl */
	var control = e.control;
	
	var parent = control.getParent();
	if (mbAddExpander){
		control = parent;
		parent = parent.getParent();
	}
	/** @type cpr.controls.Container */
	var nextControl = parent.getChildren()[parent.getChildren().indexOf(control) + 1];
	nextControl.visible = !nextControl.visible;

	if (mbExclusive){
		parent.getChildren().filter(function(each){
			return each.style.hasClass("selected");
		}).forEach(function(each){
			var eachParent = each.getParent();
			var nextCtrl = eachParent.getChildren()[eachParent.getChildren().indexOf(each) + 1];
			nextCtrl.visible = false;
			each.style.removeClass("selected");
		});
	}
	
	if (nextControl.visible){
		control.style.addClass("selected");
	} else {
		control.style.removeClass("selected");
	}
}


globals.makeResponsiveGrid = function(grid) {
	return new RGrid(grid);
}
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
//	if (e.control instanceof cpr.core.AppInstance){
//		/** @type cpr.core.AppInstance */
//		var appInstance = e.control;
//		
//		var vaGrids = appInstance.getContainer().getAllRecursiveChildren(false).filter(function(each){
//			return each instanceof cpr.controls.Grid;
//		}).forEach(function(each){
//			if (each.userAttr(ATTR_TRANSFORM_ON_MOBILE) == "true" && each.userAttr(ATTR_HIDE_COLUMN_INDICES) != ""){
//				return new RGrid(each);
//			}
//		});
//	}
//});