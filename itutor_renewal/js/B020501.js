/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	app_changeTitle("카드승인조회");


	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
	} else {

	}


};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//화면구성
var set_data = function() {

	$("#KUNNR_NM").html(pageParams.KUNNR_NM);
	$("#CARD_INFO").html(pageParams.CRDCD_NM+"<br>("+card_numberFormat(pageParams.CRDNO)+")");
	$("#APDAT").html(String(pageParams.APDAT).replace(/\//g,"-"));
	$("#APPNO").html(pageParams.APPNO);
	$("#APAMT_C").html(numberFormat(pageParams.APAMT_C)+"원");
}

//회원검색 클릭
var memberSubmit = function() {
	saveJson();
}

//@ 항목 데이터 저장
var saveJson = function() {

	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

//페이지 이동
var readyChange=function() {
	app_changePage( 'B020502.html', pageParams, true );
}

//콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

//4자리마다 - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}
