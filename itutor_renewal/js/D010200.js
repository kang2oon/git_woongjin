/**
 * 
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

	app_changeTitle("WEAT 응시회원");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();

	} else {

	}

};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//리스트 로드
var load_data = function() {


	var tmpParameter = {
			NAME1:pageParams.WEAT_FORM_NAME,
			GBDAT:pageParams.WEAT_FORM_BIRTH,
			KUNNR:pageParams.WEAT_FORM_NUM
	}
	pageParams_json = JSON.stringify( tmpParameter );

	loader.load( {
		Function: "ZTBSD_GM_WEAT_001",
		Parameter:tmpParameter,
		Success: function($data){

			$("#dataList").html("");
			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter.T_EXPORTA ){

				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					tmpData = $("#tmpList").html();
					tmpData=tmpData.replace(/#NAME1#/g, entry["NAME1"]); 
					tmpData=tmpData.replace(/#KATR1_TX#/g, entry["KATR1_TX"]); 
					tmpData=tmpData.replace(/#VKBUR_TX#/g, entry["VKBUR_TX"]); 
					tmpData=tmpData.replace(/#TUTOR_TX#/g, entry["TUTOR_TX"]); 
					tmpData=tmpData.replace(/#ORT01#/g, entry["ORT01"]); 
					tmpData=tmpData.replace(/#KUNNR#/g, entry["KUNNR"]); 

					$("#dataList").append(tmpData);
				}); 

			}
		},
		Error: function($e){
		}
	});
}

//@ 상세정보
var detail_info = function(KUNNR_DATA) {

	pageParams.KUNNR = KUNNR_DATA;
	pageParams.nextURL = "D010500.html";
	app_setRequestParameter("readyChange", pageParams);

}
//@ 상시응시이력
var detail_weat = function(KUNNR_DATA) {

	pageParams.KUNNR = KUNNR_DATA;
	pageParams.nextURL = "D010400.html";
	app_setRequestParameter("readyChange", pageParams);
}
//@ 신규회원등록
var memberSubmit = function() {
	pageParams.nextURL = "D010300.html";
	app_setRequestParameter("readyChange", pageParams);
}

// 페이지이동
var readyChange=function() {

	app_changePage( pageParams.nextURL, pageParams, true );
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

