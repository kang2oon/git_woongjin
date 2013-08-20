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

	app_changeTitle("WEAT 회원등록");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_class(true);
	} else {
		load_class();
	}

};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//등록
var search_database = function() {

	if(validity_all()!=true) {
		return;
	}

	saveJson();


	var TMP_S_IMPORTA = {
			NAME1:pageParams.ZTBSD_GM_WEAT_003.NAME1,
			TELF1:String(pageParams.ZTBSD_GM_WEAT_003.TELF1).replace(/-/g,""),
			TELF2:String(pageParams.ZTBSD_GM_WEAT_003.TELF2).replace(/-/g,""),
			PSTLZ:pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS1+"-"+pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS2,
			ORT01:pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS3,
			STRAS:pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS4,
			SMTP_ADDR:pageParams.ZTBSD_GM_WEAT_003.SMTP_ADDR,
			GBDAT:pageParams.ZTBSD_GM_WEAT_003.GBDAT,
			GBCHK:pageParams.ZTBSD_GM_WEAT_003.GBCHK,
			PARGE:pageParams.ZTBSD_GM_WEAT_003.PARGE,
			KATR1:pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS
	}

	pageParams_json = JSON.stringify( TMP_S_IMPORTA );

	loader.load( {
		Function: "ZTBSD_GM_WEAT_003",
		Parameter: {
			S_IMPORTA:TMP_S_IMPORTA
		},
		Success: function($data){

			app_alert("등록되었습니다.");
			JsonData = JSON.parse( $data );
			pageParams.KUNNR = JsonData.Parameter.KUNNR;
			app_changePage( 'D010400.html', pageParams, true );

		},
		Error: function($e){
			app_alert("error:"+$e);
		}
	});

}


//@ 학년 기본데이터 호출
var load_class = function(nextLoadis) {

	loader.load( {
		Function: "ZTBSD_GM_214_KATR1_TEXT",
		Parameter: {
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
					$("#MEMBER_CLASS").append("<option value='"+entry["KATR1"]+"'>"+entry["VTEXT"]+"</option>");
				}); 

				try
				{
					$("#MEMBER_CLASS").val(pageParams.children.MEMBER_CLASS).attr("selected", true);
				}
				catch (e)
				{
				}

			}
			if(nextLoadis==true) {
				load_data(true);
			}
		},
		Error: function($e){
		}
	});
}

//데이테 표시
var load_data = function(set_is) {



	$("#NAME1").val(pageParams.ZTBSD_GM_WEAT_003.NAME1);
	$("#GBDAT").val(pageParams.ZTBSD_GM_WEAT_003.GBDAT);
	if(pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS!="") {
		$("#MEMBER_CLASS").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS).attr("selected", true);

	}

	switch(pageParams.ZTBSD_GM_WEAT_003.PARGE) {
	case "1":
		$("#MEMBER_SEX1").attr("checked", true);
		break;
	case "2":
		$("#MEMBER_SEX2").attr("checked", true);
		break;
	default:
	}

	try
	{
		if(pageParams.ZTBSD_GM_WEAT_003.TELF1!="") {
			$("#MEMBER_TEL2").val(pageParams.ZTBSD_GM_WEAT_003.TELF1);
			$("#MEMBER_TEL2").val(OnCheckPhone_ALL($("#MEMBER_TEL2").val()));

			$("#MEMBER_TEL1").val(checkDigit($("#MEMBER_TEL2").val().split("-")[0]));
			$("#MEMBER_TEL2").val(checkDigit($("#MEMBER_TEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_TEL2").val().split("-")[2]));
		}
	}
	catch (e)
	{
	}

	try
	{
		if(pageParams.ZTBSD_GM_WEAT_003.TELF2!="") {
			$("#MEMBER_CEL2").val(pageParams.ZTBSD_GM_WEAT_003.TELF2);
			$("#MEMBER_CEL2").val(OnCheckPhone_ALL($("#MEMBER_CEL2").val()));

			$("#MEMBER_CEL1").val(checkDigit($("#MEMBER_CEL2").val().split("-")[0]));
			$("#MEMBER_CEL2").val(checkDigit($("#MEMBER_CEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_CEL2").val().split("-")[2]));
		}
	}
	catch (e)
	{
	}


	try
	{
		tmpEmail1 = pageParams.ZTBSD_GM_WEAT_003.SMTP_ADDR.split("@")[0];
		tmpEmail2 = pageParams.ZTBSD_GM_WEAT_003.SMTP_ADDR.split("@")[1];
	}
	catch (e)
	{
		tmpEmail1 = "";
		tmpEmail2 = "";
	}
	$("#MEMBER_EMAIL1").val(tmpEmail1);
	if($("#MEMBER_EMAIL2").html().indexOf(tmpEmail2)>=0) {
		$("#MEMBER_EMAIL2").val(tmpEmail2).attr("selected", true);
		fn_mail();
	} else {
		$("#MEMBER_EMAIL2").val("self").attr("selected", true);
		if($.trim(tmpEmail2)=="") {
			$("#MEMBER_EMAIL2").val("").attr("selected", true);
		} else {
			$("#etctext").val(tmpEmail2);
		}
		fn_mail();
	}


	try
	{
		if(pageParams.zipCode.data.PSTLZ!="") {
			var zipCodes = pageParams.zipCode.data.PSTLZ.split('-');
			pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS1 = zipCodes[0];
			pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS2 = zipCodes[1];
			pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS3 = pageParams.zipCode.data.ORT01;
			pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS4 = pageParams.zipCode.data.STRAS;

			$("#MEMBER_ADDRESS1").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS1);
			$("#MEMBER_ADDRESS2").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS2);
			$("#MEMBER_ADDRESS3").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS3);
			$("#MEMBER_ADDRESS4").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS4);
		}
	} 
	catch (e)
	{
		$("#MEMBER_ADDRESS1").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS1);
		$("#MEMBER_ADDRESS2").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS2);
		$("#MEMBER_ADDRESS3").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS3);
		$("#MEMBER_ADDRESS4").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS4);
	}

	if(set_is==true) {
		$("#MEMBER_CLASS").val(pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS).attr("selected", true);
	}

	if(pageParams.ZTBSD_GM_WEAT_003.MEMBER_PRIVACY_AGREE=="X") {
		$("#MEMBER_PRIVACY_AGREE").attr("checked",true);
	}
}

//@ 저장항목 체크
var validity_all = function() {

	if($.trim($("#NAME1").val())=="") {
		app_alert("이름이 입력되지 않았습니다.");
		return;
	}
	if($.trim($("#GBDAT").val())=="") {
		app_alert("생년월일이 입력되지 않았습니다.");
		return;
	}
	if($.trim($("#MEMBER_CEL1").val())=="" || $.trim($("#MEMBER_CEL2").val())=="") {
		app_alert("휴대푠번호 입력이 되지 않았습니다.");
		return;
	}
	if($.trim($("#MEMBER_ADDRESS1").val())=="" || $.trim($("#MEMBER_ADDRESS2").val())=="" || $.trim($("#MEMBER_ADDRESS3").val())=="" || $.trim($("#MEMBER_ADDRESS4").val())=="") {
		app_alert("주소정보가 입력되지 않았습니다.");
		return;
	}
	if($("#MEMBER_PRIVACY_AGREE").attr("checked")!="checked") {
		app_alert("서면 동의 확인 체크가 되지 않았습니다.");
		return;
	}
	return true;
}

//우편번호 
var button_post = function() {

	saveJson();
	pageParams.zipCode = {};
	pageParams.zipCode.returnUrl = 'D010300.html';
	app_changePage( 'B010201.html', pageParams, true );

}

//데이터 저장
var saveJson = function() {

	try
	{
		pageParams.ZTBSD_GM_WEAT_003.NAME1 = "";
	}
	catch (e)
	{
		pageParams.ZTBSD_GM_WEAT_003={};
	}
	pageParams.ZTBSD_GM_WEAT_003.NAME1 = $("#NAME1").val();
	pageParams.ZTBSD_GM_WEAT_003.GBDAT = $("#GBDAT").val();
	pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS=$("#MEMBER_CLASS").val();

	if($("#MEMBER_SEX1").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_003.PARGE="1";
	} else if($("#MEMBER_SEX2").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_003.PARGE="2";
	} else {
		pageParams.ZTBSD_GM_WEAT_003.PARGE=" ";
	}

	pageParams.ZTBSD_GM_WEAT_003.TELF1=$("#MEMBER_TEL1").val()+$("#MEMBER_TEL2").val();
	pageParams.ZTBSD_GM_WEAT_003.TELF2=$("#MEMBER_CEL1").val()+$("#MEMBER_CEL2").val();

	tmpEMAIL="";
	tmpEMAIL=$("#MEMBER_EMAIL1").val()+"@"+$("#MEMBER_EMAIL2").val();
	if(tmpEMAIL=="@self" || tmpEMAIL=="@") tmpEMAIL="";
	pageParams.ZTBSD_GM_WEAT_003.SMTP_ADDR=tmpEMAIL;

	pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS1=$("#MEMBER_ADDRESS1").val();
	pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS2=$("#MEMBER_ADDRESS2").val();
	pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS3=$("#MEMBER_ADDRESS3").val();
	pageParams.ZTBSD_GM_WEAT_003.MEMBER_ADDRESS4=$("#MEMBER_ADDRESS4").val();

	pageParams.ZTBSD_GM_WEAT_003.MEMBER_CLASS = $("#MEMBER_CLASS").val();

	if($("#MEMBER_PRIVACY_AGREE").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_003.MEMBER_PRIVACY_AGREE="X";
	} else {
		pageParams.ZTBSD_GM_WEAT_003.MEMBER_PRIVACY_AGREE="";
	}

	pageParams_json = JSON.stringify( pageParams );
}

//달력호출후 반환
var set_birth = function($data) {

	$data=$data.substr(0,10);
	$data=$data.replace(/-/g,"");
	$("#GBDAT").val($data);

	var date = new Date();

	combie_year = Number(String(date.getFullYear()).substring(2,4)) - Number(String($("#GBDAT").val()).substring(2,4)) + 1;
	combie_year = Number(combie_year);

	if(combie_year<=0) {
		$("#MEMBER_CLASS").val("30").attr("selected", "selected");
	} else if(combie_year<=7) {
		$("#MEMBER_CLASS").val("0"+combie_year).attr("selected", "selected");
	} else if(combie_year+3<=16) {
		$("#MEMBER_CLASS").val(combie_year+3).attr("selected", "selected");
	} else if (combie_year+7<=23) {
		$("#MEMBER_CLASS").val(combie_year+7).attr("selected", "selected");
	} else {
		$("#MEMBER_CLASS").val("30").attr("selected", "selected");
	}

	$("#MEMBER_CLASS").focus();
	$("#MEMBER_CLASS").click();
}


//@이메일 (직접입력) 
function fn_mail() {

	var opt = $("#MEMBER_EMAIL2").val();
	if(opt == "self")
	{
		$("#etctext").parent().removeClass("none");
		$("#etctext").parent().addClass("block");

		$("#etctext").val("");
	}
	else
	{
		$("#etctext").parent().removeClass("block");
		$("#etctext").parent().addClass("none");
		$("#etctext").val("");
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

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

//전화번호 검사
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

// 전화번호 검사
function OnCheckPhone(oTa) { 
	var oForm = oTa.form ; 
	var sMsg = oTa.value ; 
	var onlynum = "" ; 
	var imsi=0; 
	onlynum = RemoveDash2(sMsg);
	onlynum =  checkDigit(onlynum);
	var retValue = ""; 

	if (GetMsgLen(onlynum) == 3) oTa.value = onlynum.substring(0,3);
	if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,4);
	if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
	if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
	if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
	if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;

} 

// - 삭제
function RemoveDash2(sNo) { 
	var reNo = "" 
		for(var i=0; i<sNo.length; i++) { 
			if ( sNo.charAt(i) != "-" ) { 
				reNo += sNo.charAt(i) 
			} 
		} 
	return reNo 
} 

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

// 디지털 숫자형 반환
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
