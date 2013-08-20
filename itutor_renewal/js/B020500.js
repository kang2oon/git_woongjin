/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var ReadJsonData;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	app_changeTitle("카드승인확인 및 배분");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
        //로딩시 시작 안되게끔 변경 2013.04.18 NDH
		//search_database();

	} else {

	}


};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//기본 입력
var set_data = function() {

	if(typeof(pageParams.APPROVE_SEARCH) != "undefined" )  {

		switch(pageParams.APPROVE_SEARCH) {
		case "1":
			$("#PAY_APPROVE_SEARCH1").attr("checked",true);
			break;
		case "2":
			$("#PAY_APPROVE_SEARCH2").attr("checked",true);
			break;
		case "3":
			$("#PAY_APPROVE_SEARCH3").attr("checked",true);
			break;
		default:
		}

		$("#PAY_APPROVE_SEARCH_PERIOD1").val(pageParams.PERIOD1);
		$("#PAY_APPROVE_SEARCH_PERIOD2").val(pageParams.PERIOD2);
		$("#PAY_APPROVE_SEARCH_CARD_NUM").val(pageParams.CARD_NUM);
		$("#PAY_APPROVE_SEARCH_APPR_NUM").val(pageParams.APPR_NUM);

	} else {


		//# 해당월의 01일~31일 설정
		var date = new Date();

		mm = (date.getMonth()+1);
		if(mm < 10) mm = "0"+mm;
		date.setDate("1");
		$("#PAY_APPROVE_SEARCH_PERIOD1").val(date.getFullYear()+"-"+(mm)+"-01");

		date.setMonth(date.getMonth()+1);
		date.setDate("0");
		$("#PAY_APPROVE_SEARCH_PERIOD2").val(date.getFullYear()+"-"+(mm)+"-"+date.getDate());
	}

}

//@ 데이터 조회
var search_database = function() {

	$("#pay_approve_anchor").find("ul").html("");

	tmp_I_APDAT_FROM="";
	tmp_I_APDAT_TO="";
	tmp_I_CRDNO="";
	tmp_I_APPNO="";

	//# 검색조건이 기간일 경우
	if($("#PAY_APPROVE_SEARCH1").attr("checked")=="checked") {
		tmp_I_APDAT_FROM=$("#PAY_APPROVE_SEARCH_PERIOD1").val().replace(/-/g,"");
		tmp_I_APDAT_TO=$("#PAY_APPROVE_SEARCH_PERIOD2").val().replace(/-/g,"");
	}

	//# 검색조건이 카드번호일 경우
	if($("#PAY_APPROVE_SEARCH2").attr("checked")=="checked") {
		tmp_I_CRDNO=$("#PAY_APPROVE_SEARCH_CARD_NUM").val().replace(/-/g,"");
	}

	//# 검색조건이 승인번호일 경우
	if($("#PAY_APPROVE_SEARCH3").attr("checked")=="checked") {
		tmp_I_APPNO=$("#PAY_APPROVE_SEARCH_APPR_NUM").val().replace(/-/g,"");
	}


	var TMP_Parameter = {
			I_APDAT_FROM:String(tmp_I_APDAT_FROM),
			I_APDAT_TO:String(tmp_I_APDAT_TO),
			I_CRDNO:String(tmp_I_CRDNO),
			I_APPNO:String(tmp_I_APPNO)
	};

	pageParams_json = JSON.stringify( TMP_Parameter );

	loader.load( {
		Function: "ZTBTR_PDA01_009",
		Parameter: TMP_Parameter,
		Success: function($data){
			JsonData = JSON.parse( $data );
			ReadJsonData=JsonData;

			$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

				tmp_TB = $("#tmp_list").html();

				tmp_TB=tmp_TB.replace(/#KUNNR_NM#/g, entry["KUNNR_NM"]); 
				tmp_TB=tmp_TB.replace(/#CRDCD_NM#/g, entry["CRDCD_NM"]); 
				tmp_TB=tmp_TB.replace(/#CRDNO#/g, card_numberFormat(entry["CRDNO"])); 
				tmp_TB=tmp_TB.replace(/#APDAT#/g, String(entry["APDAT"]).replace(/\//g,"-")); 
				tmp_TB=tmp_TB.replace(/#APPNO#/g, entry["APPNO"]); 
				tmp_TB=tmp_TB.replace(/#APAMT_C#/g, numberFormat(entry["APAMT_C"])+"원");
				if($.trim(entry["DVIND"])=="") {
					tmp_TB=tmp_TB.replace(/#DVIND#/g, "X");
				} else {
					tmp_TB=tmp_TB.replace(/#DVIND#/g, "O");
				}

				write_TB(tmp_TB);

			}); 

		},
		Error: function($e){
			write_TB('');
		}
	});
}

//테이블 구성
var write_TB = function(object_data) {

	if(object_data!="") {
		$("#pay_approve_anchor").append(object_data);
	} else {
	   //app_alert 추가 2013.04.18 NDH
	    app_alert("검색된 결과가 없습니다.");
		$("#pay_approve_anchor").html("");
	}
}

// 리스트 클릭시
var detail_page = function(select_APPNO) {

	bool_move=true;
	$.each(ReadJsonData.Parameter.T_EXPORTA, function(index, entry) {

		if(select_APPNO==entry["APPNO"]) {

			if($.trim(entry["DVIND"])!="") {
				app_alert("배분이 완료된 항목입니다.");
				bool_move=false;
				return;
			}
			pageParams.KUNNR_NM = entry["KUNNR_NM"];
			pageParams.CRDCD_NM = entry["CRDCD_NM"];
			pageParams.CRDCD = entry["CRDCD"];
			pageParams.CRDNO = entry["CRDNO"];
			pageParams.APPNO = entry["APPNO"];
			pageParams.APDAT = entry["APDAT"];
			pageParams.APAMT = entry["APAMT"];
			pageParams.APAMT_C = entry["APAMT_C"];
			pageParams.DVIND = entry["DVIND"];
		}

	});

	if(bool_move==true) saveJson();

}

//@ 항목 데이터 저장
var saveJson = function() {

	//# 검색조건이 기간일 경우
	if($("#PAY_APPROVE_SEARCH1").attr("checked")=="checked") {
		pageParams.APPROVE_SEARCH = "1";
	}

	//# 검색조건이 카드번호일 경우
	if($("#PAY_APPROVE_SEARCH2").attr("checked")=="checked") {
		pageParams.APPROVE_SEARCH = "2";
	}

	//# 검색조건이 승인번호일 경우
	if($("#PAY_APPROVE_SEARCH3").attr("checked")=="checked") {
		pageParams.APPROVE_SEARCH = "3";
	}

	pageParams.PERIOD1 = $("#PAY_APPROVE_SEARCH_PERIOD1").val();
	pageParams.PERIOD2 = $("#PAY_APPROVE_SEARCH_PERIOD2").val();
	pageParams.CARD_NUM = $("#PAY_APPROVE_SEARCH_CARD_NUM").val();
	pageParams.APPR_NUM = $("#PAY_APPROVE_SEARCH_APPR_NUM").val();


	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

// 페이지 이동
var readyChange=function() {

	app_changePage( 'B020501.html', pageParams, true );
}

// 달력 클릭후 반환함수
var open_calendar1 = function($data) {

	$data=$data.substr(0,10);
	$("#PAY_APPROVE_SEARCH_PERIOD1").val($data);

}

// 달력 클릭후 반환함수
var open_calendar2 = function($data) {

	$data=$data.substr(0,10);
	$("#PAY_APPROVE_SEARCH_PERIOD2").val($data);

}

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

// 4자리마다 - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}

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
