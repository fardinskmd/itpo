/*-------------------generate random code------------------------*/

$('#random_num').click(function () {
	$(this).parent('.input-group').children('input').val(generateCardNo(8));
});
function generateCardNo(x) {
	if (!x) { x = 16; }
	chars = "1234567890";
	no = "";
	for (var i = 0; i < x; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		no += chars.substring(rnum, rnum + 1);
	}
	return no;
}
/*-------------------end of generate random code-----------------*/
