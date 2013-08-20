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

	app_changeTitle("WEAT 회원 수정");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_class(true);
	} else {

	}

};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
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

			}
			if(nextLoadis==true) {
				load_data();
			}
		},
		Error: function($e){
		}
	});
}

//화면구성
var load_data = function() {

    init_zipCode();
    
    
    


	$("#KUNNR").html(pageParams.ZTBSD_GM_WEAT_004.KUNNR);
	$("#ZMATX").html(pageParams.ZTBSD_GM_WEAT_004.ZMATX);
	$("#NAME1").val(pageParams.ZTBSD_GM_WEAT_004.NAME1);
	$("#GBDAT").val(pageParams.ZTBSD_GM_WEAT_004.GBDAT);
    
	if(pageParams.ZTBSD_GM_WEAT_004.GBCHK=="X") {
		$("#MEMBER_BIRTHDAY_TYPE1").attr("checked", false);	   
		$("#MEMBER_BIRTHDAY_TYPE2").attr("checked", true);
	} else {
		$("#MEMBER_BIRTHDAY_TYPE1").attr("checked", true);
        $("#MEMBER_BIRTHDAY_TYPE2").attr("checked", false);
	}

	$("#MEMBER_CLASS").val(pageParams.ZTBSD_GM_WEAT_004.KATR1).attr("selected", "selected");

	switch(pageParams.ZTBSD_GM_WEAT_004.PARGE) {
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
		if(pageParams.ZTBSD_GM_WEAT_004.TELF2!="") {
			$("#MEMBER_CEL2").val(pageParams.ZTBSD_GM_WEAT_004.TELF2);
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
		if(pageParams.ZTBSD_GM_WEAT_004.TELF1!="") {
			$("#MEMBER_TEL2").val(pageParams.ZTBSD_GM_WEAT_004.TELF1);
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
		tmpEmail1 = pageParams.ZTBSD_GM_WEAT_004.SMTP_ADDR.split("@")[0];
		tmpEmail2 = pageParams.ZTBSD_GM_WEAT_004.SMTP_ADDR.split("@")[1];
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
		fn_mail();
		$("#etctext").val(tmpEmail2);
	}

	try
	{
		tmpPost = pageParams.ZTBSD_GM_WEAT_004.PSTLZ.split("-");
		$("#MEMBER_ADDRESS1").val(tmpPost[0]);
		$("#MEMBER_ADDRESS2").val(tmpPost[1]);
	}
	catch (e)
	{
		$("#MEMBER_ADDRESS1").val("");
		$("#MEMBER_ADDRESS2").val("");
	}
	$("#MEMBER_ADDRESS3").val(pageParams.ZTBSD_GM_WEAT_004.ORT01);
	$("#MEMBER_ADDRESS4").val(pageParams.ZTBSD_GM_WEAT_004.STRAS);

	$("#DATE1").html(pageParams.ZTBSD_GM_WEAT_004.DATE1);

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
	return true;
}

//onclick으로 html 파일에 있음 
var editSubmit = function() {

	if(validity_all()!=true) {
		return;
	}


	if(pageParams.ZTBSD_GM_WEAT_004.MODIX=="X") {
	} else {
		app_alert("기존 씽크빅 회원입니다. \n 회원은 아이튜터의 회원관리 메뉴나 교사업무사이트에서 회원정보를 변경해주세요.");
        return;
	}



	if($.trim($("#NAME1").val())=="") {
		app_alert("이름이 입력되지 않았습니다.");
		$("#MEMBER_NAME").focus();
		return;
	}
	if($.trim($("#MEMBER_TEL1").val())=="" || $.trim($("#MEMBER_TEL2").val())=="") {
		app_alert("전화번호가 입력되지 않았습니다.");
		$("#MEMBER_TEL1").focus();
		return;
	}

	if($.trim($("#MEMBER_CEL1").val())=="" || $.trim($("#MEMBER_CEL2").val())=="") {
		app_alert("휴대전화번호가 입력되지 않았습니다.");
		$("#MEMBER_CEL1").focus();
		return;
	}

	if($.trim($("#MEMBER_ADDRESS1").val())=="" ) {
		app_alert("우편번호가 입력되지 않았습니다.");
		$("#MEMBER_ADDRESS1").focus();
		return;
	}
	if($.trim($("#MEMBER_ADDRESS4").val())=="" ) {
		app_alert("주소가 입력되지 않았습니다.");
		$("#MEMBER_ADDRESS4").focus();
		return;
	}

    
    

    tmpEMAIL ="";
	tmpEMAIL1="";
    tmpEMAIL2="";
    tmpEMAIL1=$("#MEMBER_EMAIL1").val();
    if($("#MEMBER_EMAIL2").val()=="self"){
        tmpEMAIL2=$("#etctext").val();
    }else{
        tmpEMAIL2=$("#MEMBER_EMAIL2").val();
    }
    
    if(tmpEMAIL1=="" || tmpEMAIL2==""){
        tmpEMAIL = "";
    }else{
        tmpEMAIL = tmpEMAIL1 + "@" + tmpEMAIL2;
    }


	tmpGBCHK="";
	if($("#MEMBER_BIRTHDAY_TYPE1").attr("checked")=="checked") {
		tmpGBCHK="S";
	} else if($("#MEMBER_BIRTHDAY_TYPE2").attr("checked")=="checked") {
		tmpGBCHK="M";
	} else {
		tmpGBCHK=" ";
	}

	if($("#MEMBER_SEX1").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_004.PARGE="1";
	} else if($("#MEMBER_SEX2").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_004.PARGE="2";
	} else {
		pageParams.ZTBSD_GM_WEAT_004.PARGE=" ";
	}



	var TMP_S_IMPORTA = {
			KUNNR:String(pageParams.ZTBSD_GM_WEAT_004.KUNNR),
			NAME1:$("#NAME1").val(),
			TELF1:String($("#MEMBER_TEL1").val()+$("#MEMBER_TEL2").val()).replace(/-/g,""),
			TELF2:String($("#MEMBER_CEL1").val()+$("#MEMBER_CEL2").val()).replace(/-/g,""),
			PSTLZ:$("#MEMBER_ADDRESS1").val()+"-"+$("#MEMBER_ADDRESS2").val(),
			ORT01:$("#MEMBER_ADDRESS3").val(),
			STRAS:$("#MEMBER_ADDRESS4").val(),
			SMTP_ADDR:tmpEMAIL,
			GBDAT:String($("#GBDAT").val()).replace(/-/g,""),
			GBCHK:tmpGBCHK,
			PARGE:String(pageParams.ZTBSD_GM_WEAT_004.PARGE),
			KATR1:$("#MEMBER_CLASS").val()
	}

	pageParams_json = JSON.stringify( TMP_S_IMPORTA );

	loader.load( {
		Function: "ZTBSD_RFC_CHANGE_CUSTOMER",
		Parameter: {
			VKORG:"1000",
			CHILD:"X",
			S_IMPORTA:TMP_S_IMPORTA
		},
		Success: function($data){

            app_alert("저장되었습니다.","","finish_save");

		},
		Error: function($e){
			app_alert("error:"+$e);
		}
	});
}

//회원 정보 저장후 페이지 이동.2013.05.03 
var finish_save = function() {
    app_changePage( 'D010500.html', pageParams, false );
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

//우편번호 데이터 확인
var init_zipCode = function() {



	if( !!pageParams.zipCode ){ // B010201.html에서 넘겨받은 우편번호 확인
		if( !!pageParams.zipCode.data ){


        	pageParams.ZTBSD_GM_WEAT_004.PSTLZ = pageParams.zipCode.data.PSTLZ;
        	pageParams.ZTBSD_GM_WEAT_004.ORT01 = pageParams.zipCode.data.ORT01;
        	pageParams.ZTBSD_GM_WEAT_004.STRAS = pageParams.zipCode.data.STRAS;
        
        
            try { delete pageParams.zipCode; }	catch (e) {  }  zipData = null;
        
        	load_data();

		};
	}




}

//달력 호출후 반환함수
var set_birth = function($data) {

	$data=$data.substr(0,10);
	$data=$data.replace(/-/g,"");
	$("#GBDAT").val($data);

}

//우편번호 검색 
//html 파일에 있음 onclick 으로;;
var button_post = function() {

	saveJson();
	pageParams.zipCode = {};
	pageParams.zipCode.returnUrl = 'D010501.html';
	app_changePage( 'B010201.html', pageParams, true );

}

//@ 항목 데이터 저장
var saveJson = function() {


	pageParams.ZTBSD_GM_WEAT_004.NAME1=$("#NAME1").val();
    pageParams.ZTBSD_GM_WEAT_004.GBDAT=$("#GBDAT").val();
	if($("#MEMBER_BIRTHDAY_TYPE2").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_004.GBCHK="X";
	} else {
		pageParams.ZTBSD_GM_WEAT_004.GBCHK=" ";
	}

	if($("#MEMBER_CLASS").val()!="") {
		pageParams.ZTBSD_GM_WEAT_004.KATR1=$("#MEMBER_CLASS").val();
	} else {
		pageParams.ZTBSD_GM_WEAT_004.KATR1="";
	}

	if($("#MEMBER_SEX1").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_004.PARGE="1";
	} else if($("#MEMBER_SEX2").attr("checked")=="checked") {
		pageParams.ZTBSD_GM_WEAT_004.PARGE="2";
	} else {
		pageParams.ZTBSD_GM_WEAT_004.PARGE=" ";
	}

	pageParams.ZTBSD_GM_WEAT_004.TELF1=String($("#MEMBER_TEL1").val()+$("#MEMBER_TEL2").val()).replace(/-/g,"");
	pageParams.ZTBSD_GM_WEAT_004.TELF2=String($("#MEMBER_CEL1").val()+$("#MEMBER_CEL2").val()).replace(/-/g,"");


	tmpEMAIL="";
	tmpEMAIL=$("#MEMBER_EMAIL1").val()+"@"+$("#MEMBER_EMAIL2").val();
	if(tmpEMAIL=="@self" || tmpEMAIL=="@") tmpEMAIL="";
	pageParams.ZTBSD_GM_WEAT_004.SMTP_ADDR=tmpEMAIL;

	pageParams.ZTBSD_GM_WEAT_004.PSTLZ=$("#MEMBER_ADDRESS1").val()+"-"+$("#MEMBER_ADDRESS2").val();
	pageParams.ZTBSD_GM_WEAT_004.ORT01=$("#MEMBER_ADDRESS3").val();
	pageParams.ZTBSD_GM_WEAT_004.STRAS=$("#MEMBER_ADDRESS4").val();

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

//전화번호확인
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