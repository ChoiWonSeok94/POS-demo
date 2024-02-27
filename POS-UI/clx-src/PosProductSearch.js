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
