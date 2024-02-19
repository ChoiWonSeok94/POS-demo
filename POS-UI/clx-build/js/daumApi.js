///**
// * 
// */
//<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
function openAddressPopup() {
	new daum.Postcode({
		oncomplete : function(data) {
			document.getElementById('zip').value = data.zonecode;
			document.getElementById('adr1').value = data.address;
			document.getElementById('adr2').focus();
		}
	}).open();
}