/**
 * 진단 등록및조회 페이지
 * 
 * */


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

	app_changeTitle("WEAT 로그인");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		try
		{
			$("#WEAT_FORM_NAME").val($.trim(pageParams.WEAT_FORM_NAME));
		}
		catch (e)
		{
		}
		try
		{
			$("#WEAT_FORM_BIRTH").val($.trim(pageParams.WEAT_FORM_BIRTH));
		}
		catch (e)
		{
		}
		try
		{
			$("#WEAT_FORM_NUM").val($.trim(pageParams.WEAT_FORM_NUM));
		}
		catch (e)
		{
		}
	} else {

	}

};


//검색
var search_database = function() {

	if($.trim($("#WEAT_FORM_NAME").val())=="" && $.trim($("#WEAT_FORM_NUM").val())=="") {

		app_alert("회원명 검색 또는 회원번호를 입력해주세요.");
		return;
	}

	if($.trim($("#WEAT_FORM_NAME").val())!="" && $.trim($("#WEAT_FORM_BIRTH").val())=="") {

		app_alert("회원명 입력과 생년월일 입력 모두 필요합니다.");
		return;
	}

	pageParams.WEAT_FORM_NAME = $.trim($("#WEAT_FORM_NAME").val());
	pageParams.WEAT_FORM_BIRTH = $.trim($("#WEAT_FORM_BIRTH").val());
	pageParams.WEAT_FORM_NUM = $.trim($("#WEAT_FORM_NUM").val());

	if(pageParams.WEAT_FORM_NUM!="") {
		pageParams.WEAT_FORM_NAME = "";
		pageParams.WEAT_FORM_BIRTH = "";
	}
	if(pageParams.WEAT_FORM_NAME!="") {
		pageParams.WEAT_FORM_NUM = "";
	}


	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

//페이지 이동전 / app_setRequestParameter 반환함수
var readyChange=function() {

	var fText, iCate;

	fText = '진단';
	iCate = 'KJ';
	loader.sessionTotal( fText, iCate, sessionEndHandle, sessionEndHandle  );


}

var sessionEndHandle = function(){
	app_changePage( 'D010200.html', pageParams, true );
}

//달력호출후 날짜 반환받을 함수
var set_birth = function($data) {

	$('#WEAT_FORM_NUM').val('');

	$data=$data.substr(0,10);
	$data=$data.replace(/-/g,"");
	$("#WEAT_FORM_BIRTH").val($data);
}



/** ==========================================================================================================||
 * 
 * 기타 함수.
 * 
 * ========================================================================================================= */
// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}


//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
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
