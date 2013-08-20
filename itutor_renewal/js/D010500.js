/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}


/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 회원 상세정보");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지 파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();

	} else {

	}

};

//회원정보로드
var load_data = function() {

	loader.load( {
		Function: "ZTBSD_GM_WEAT_004",
		Parameter: {
			KUNNR:pageParams.KUNNR
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			tmpAddress_info=JsonData.Parameter.S_EXPORTA.PSTLZ+"<br/>"+JsonData.Parameter.S_EXPORTA.ORT01+"<br/>"+JsonData.Parameter.S_EXPORTA.STRAS;
			$("#address_info").html(tmpAddress_info);

			$("#KUNNR").html(JsonData.Parameter.S_EXPORTA.KUNNR);
			$("#ZMATX").html(JsonData.Parameter.S_EXPORTA.ZMATX);
			$("#NAME1").html(JsonData.Parameter.S_EXPORTA.NAME1);
			$("#GBDAT").html(JsonData.Parameter.S_EXPORTA.GBDAT);
			$("#DATE1").html(JsonData.Parameter.S_EXPORTA.DATE1);
			$("#KATR1_TX").html(JsonData.Parameter.S_EXPORTA.KATR1_TX);
			$("#TELF1").html(OnCheckPhone_ALL(JsonData.Parameter.S_EXPORTA.TELF1));
			$("#TELF2").html(OnCheckPhone_ALL(JsonData.Parameter.S_EXPORTA.TELF2));

			if($.trim(JsonData.Parameter.S_EXPORTA.SMTP_ADDR)=="") {
				$("#SMTP_ADDR").html("미등록");
			} else {
				$("#SMTP_ADDR").html(JsonData.Parameter.S_EXPORTA.SMTP_ADDR);
			}
			switch(JsonData.Parameter.S_EXPORTA.PARGE) {
			case "1":
				$("#PARGE").html("남");
				break;
			case "2":
				$("#PARGE").html("여");
				break;
			default:
				$("#PARGE").html("-");
			}
			$("#MODIX").val(JsonData.Parameter.S_EXPORTA.MODIX);

			pageParams.ZTBSD_GM_WEAT_004 = {};

			pageParams.ZTBSD_GM_WEAT_004.KUNNR = JsonData.Parameter.S_EXPORTA.KUNNR;
			pageParams.ZTBSD_GM_WEAT_004.NAME1 = JsonData.Parameter.S_EXPORTA.NAME1;
			pageParams.ZTBSD_GM_WEAT_004.TELF1 = JsonData.Parameter.S_EXPORTA.TELF1;
			pageParams.ZTBSD_GM_WEAT_004.TELF2 = JsonData.Parameter.S_EXPORTA.TELF2;
			pageParams.ZTBSD_GM_WEAT_004.PSTLZ = JsonData.Parameter.S_EXPORTA.PSTLZ;
			pageParams.ZTBSD_GM_WEAT_004.ORT01 = JsonData.Parameter.S_EXPORTA.ORT01;
			pageParams.ZTBSD_GM_WEAT_004.STRAS = JsonData.Parameter.S_EXPORTA.STRAS;
			pageParams.ZTBSD_GM_WEAT_004.SMTP_ADDR = JsonData.Parameter.S_EXPORTA.SMTP_ADDR;
			pageParams.ZTBSD_GM_WEAT_004.GBDAT = JsonData.Parameter.S_EXPORTA.GBDAT;
			pageParams.ZTBSD_GM_WEAT_004.GBCHK = JsonData.Parameter.S_EXPORTA.GBCHK;
			pageParams.ZTBSD_GM_WEAT_004.PARGE = JsonData.Parameter.S_EXPORTA.PARGE;
			pageParams.ZTBSD_GM_WEAT_004.PARGE_TX = JsonData.Parameter.S_EXPORTA.PARGE_TX;
			pageParams.ZTBSD_GM_WEAT_004.KATR1 = JsonData.Parameter.S_EXPORTA.KATR1;
			pageParams.ZTBSD_GM_WEAT_004.KATR1_TX = JsonData.Parameter.S_EXPORTA.KATR1_TX;
			pageParams.ZTBSD_GM_WEAT_004.DATE1 = JsonData.Parameter.S_EXPORTA.DATE1;
			pageParams.ZTBSD_GM_WEAT_004.ZMATX = JsonData.Parameter.S_EXPORTA.ZMATX;
			pageParams.ZTBSD_GM_WEAT_004.MODIX = JsonData.Parameter.S_EXPORTA.MODIX;

		},
		Error: function($e){
			app_alert($e);
		}
	});

}


//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//수정
var editSubmit = function() {

	if($("#MODIX").val()=="X") {

		app_changePage( "D010501.html", pageParams, false );
	} else {

		app_alert("기존 씽크빅 회원입니다. \n 회원은 아이튜터의 회원관리 메뉴나 교사업무사이트에서 회원정보를 변경해주세요.");

		//# 임시
		//app_changePage( "D010501.html", pageParams, true );
		return;
	}
}

//문자열 끝에서 갯수만큼 잘라 반환
function Right(str, n){
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

//콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

//전화번호 확인
function OnCheckPhone_ALL(sMsg) { 
	var onlynum = "" ; 
	var imsi=0; 
	onlynum = RemoveDash2(sMsg);  //하이픈 입력시 자동으로 삭제함 
	onlynum =  checkDigit(onlynum);  // 숫자만 입력받게 함 
	var retValue = ""; 

	if(onlynum.substring(0,2) == 02) {  // 서울전화번호일 경우  10자리까지만 나타나교 그 이상의 자리수는 자동삭제 
		if (GetMsgLen(onlynum) <= 1) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 2) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,3) ;
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,7) ; ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
	}
	if(onlynum.substring(0,2) == 05 ) {  // 05로 시작되는 번호 체크 
		if(onlynum.substring(2,3) == 0 ) {  // 050으로 시작되는지 따지기 위한 조건문 
			if (GetMsgLen(onlynum) <= 3) returnData = onlynum ; 
			if (GetMsgLen(onlynum) == 4) returnData = onlynum + "-"; 
			if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
			if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
			if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
			if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
			if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,9) ; ;
			if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,10) ;
			if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,11) ;
			if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
			if (GetMsgLen(onlynum) == 13) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
		} else { 
			if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
			if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
			if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
			if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
			if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
			if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
			if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ;
			if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
			if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
			if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
			if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		} 
	} 

	if(onlynum.substring(0,2) == 03 || onlynum.substring(0,2) == 04  || onlynum.substring(0,2) == 06  || onlynum.substring(0,2) == 07  || onlynum.substring(0,2) == 08 ) {  // 서울전화번호가 아닌 번호일 경우(070,080포함 // 050번호가 문제군요)
		if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
	} 
	if(onlynum.substring(0,2) == 01) {  //휴대폰일 경우 
		if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
	} 

	if(onlynum.substring(0,1) == 1) {  // 1588, 1688등의 번호일 경우 
		if (GetMsgLen(onlynum) <= 3) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
	} 
	return returnData;
} 

//- 삭제
function RemoveDash2(sNo) { 
	var reNo = "" 
		for(var i=0; i<sNo.length; i++) { 
			if ( sNo.charAt(i) != "-" ) { 
				reNo += sNo.charAt(i) 
			} 
		} 
	return reNo 
} 

//문자열 바이트 체크
function GetMsgLen(sMsg) { // 0-127 1byte, 128~ 2byte 
	var count = 0 
	for(var i=0; i<sMsg.length; i++) { 
		if ( sMsg.charCodeAt(i) > 127 ) { 
			count += 2 
		} 
		else { 
			count++ 
		} 
	} 
	return count 
} 

//디지털 숫자형 반환
function checkDigit(num) { 
	var Digit = "1234567890"; 
	var string = num; 
	var len = string.length 
	var retVal = ""; 

	for (i = 0; i < len; i++) 
	{ 
		if (Digit.indexOf(string.substring(i, i+1)) >= 0) 
		{ 
			retVal = retVal + string.substring(i, i+1); 
		} 
	} 
	return retVal; 
} 
