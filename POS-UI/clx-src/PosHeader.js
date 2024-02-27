/************************************************
 * POSHeader.js
 * Created at 2024. 1. 17. 오후 3:58:55.
 *
 * @author sunrise
 ************************************************/


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	updateDateTime();
}

/*
 * "POS" 아웃풋에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOutputClick(e){
	var output = e.control;
	
}

/*
 * "POS" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var page = "/POS/PosMain.do";
	window.location.href = page;
}

/*
 * "판매관리" 버튼(salesManage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onSalesManageClick(e){
	var page = "/POS/PosSalesManagement.do";
	window.location.href = page;
}

/*
 * "상품관리" 버튼(productManage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onProductManageClick(e){
	var page = "/POS/PosProductRegist1.do";
	window.location.href = page;
}

/*
 * "시재금" 버튼(moneyCnt)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onMoneyCntClick(e){
	var page = "/POS/PosMoney.do";
	window.location.href = page;
}

/*
 * "회원관리" 버튼(custManage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCustManageClick(e){
	var page = "/POS/PosCust.do";
	window.location.href = page;
}

/*
 * "거래처관리" 버튼(accountManage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onAccountManageClick(e){
	var page = "/POS/PosAccountManagement.do";
	window.location.href = page;
}

function updateDateTime() {
    var now = app.lookup('sysDateTime');
    var date = new Date();
	var ymd = date.toLocaleDateString();
	var hur = date.getHours();
	hur = hur.toString().length === 1 ? "0" + hur.toString() : hur.toString();
	var min = date.getMinutes();
	min = min.toString().length === 1 ? "0" + min.toString() : min.toString();
	var sec = date.getSeconds();
	sec = sec.toString().length == 1 ? "0" + sec.toString() : sec.toString();
    now.text = ymd + ' ' + hur + ':' + min + ':' + sec ;
}
setInterval(updateDateTime, 1000);

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	updateDateTime();
}

/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNavigationBarItemClick(e){
	var navigationBar = e.control.value;
	
	if(navigationBar === 'POS'){
		var page = "/POS/PosMain.do";
		window.location.href = page;
	
	}else if(navigationBar === '판매관리'){
		var page = "/POS/PosSalesManagement.do";
		window.location.href = page;
	
	}else if(navigationBar === '시재금'){
		var page = "/POS/PosMoney.do";
		window.location.href = page;
	
	}else if(navigationBar === '상품관리' || navigationBar === '상품등록'){
		var page = "/POS/PosProductRegist1.do";
		window.location.href = page;
	
	}else if(navigationBar === '상품조회'){
		var page = "/POS/PosProductSearch.do";
		window.location.href = page;
	
	}else if(navigationBar === '거래처관리' || navigationBar === '거래처등록'){
		var page = "/POS/PosAccountManagement.do";
		window.location.href = page;
	
	}else if(navigationBar === '거래처조회'){
		var page = "/POS/PosAccountSearch.do";
		window.location.href = page;
	
	}else if(navigationBar === '회원관리' || navigationBar === '회원등록'){
		var page = "/POS/PosCust.do";
		window.location.href = page;
	
	}else if(navigationBar === '회원조회'){
		var page = "/POS/PosCustSearch.do";
		window.location.href = page;
	}
	
	
	
}
