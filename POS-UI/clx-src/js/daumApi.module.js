/************************************************
 * daumApi.module.js
 * Created at 2024. 1. 25. 오전 12:24:58.
 *
 * @author sunrise
 ************************************************/

var property1 = {
	test: "test1"
};
exports.property1 = property1;

function openAddressPopup() {
	new daum.Postcode({
		oncomplete : function(data) {
			document.getElementById('zip').value = data.zonecode;
			document.getElementById('adr1').value = data.address;
			document.getElementById('adr2').focus();
		}
	}).open();
}