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

	app_changeTitle("카드승인확인 및 입금배분");


	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
	} else {

	}


};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//정보표시
var set_data = function() {

	$("#KUNNR_NM").html(pageParams.KUNNR_NM);
	tmp_PAY_CARD_SUM = 0;
	$.each(pageParams.ZTBTR_PDA01_005.T_IMPORTA, function(index, entry) {
		tmp_PAY_CARD_SUM = tmp_PAY_CARD_SUM + Number(entry["DMBTR"]);
	}); 

	$("#SELECT_APAMT").html(numberFormat(tmp_PAY_CARD_SUM)+"원");


	tmp_TB = "";
	$.each(pageParams.ZTBTR_PDA01_005.T_IMPORTA, function(index, entry) {
		tmp_TB = tmp_TB+"\n"+
		"	<tr>\n"+
		"		<td class='left'>"+entry["MAKTX"]+"</td>\n"+
		"		<td class='left'>"+numberFormat(entry["DMBTR"])+"</td>\n"+
		"	</tr>\n";
	}); 


	write_TB(tmp_TB,3);
}

//테이블 구성
var write_TB = function(object_data, tb_cnt) {

	if(object_data!="") {
		$("#TB_DATA").html(object_data);
	} else {
		tmp_TB="\n"+
		"	<tr>\n"+
		"		<td colspan="+tb_cnt+">검색 데이터가 없습니다.</td>\n"+
		"	</tr>\n";
		$("#TB_DATA").html(tmp_TB);
	}
}

//@ 배분 버튼
var bankSubmit = function() {


	var TMP_Parameter = {
			I_SPMON:pageParams.ZTBTR_PDA01_005.I_SPMON,
			S_IMPORTA:[],
			T_IMPORTA:[]
	};


	var S_IMPORTA_parameter = {
			KUNNR:pageParams.ZTBTR_PDA01_005.S_IMPORTA.KUNNR,
			CRDCD:pageParams.ZTBTR_PDA01_005.S_IMPORTA.CRDCD,
			EDUFREE:"",
			CRDNO:pageParams.ZTBTR_PDA01_005.S_IMPORTA.CRDNO,
			VTERM:"",
			ALMON:"",
			APAMT:pageParams.ZTBTR_PDA01_005.S_IMPORTA.APAMT,
			APDAT:String(pageParams.ZTBTR_PDA01_005.S_IMPORTA.APDAT).replace(/\//g,""),
			APPNO:pageParams.ZTBTR_PDA01_005.S_IMPORTA.APPNO
	};
	TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter;



	$.each(pageParams.ZTBTR_PDA01_005.T_IMPORTA, function(index, entry) {

		var T_IMPORTA_parameter = {
				VBELN:entry["VBELN"],
				DMBTR:entry["DMBTR"]
		};
		TMP_Parameter.T_IMPORTA.push(T_IMPORTA_parameter);

	});

	loader.load( {
		Function: "ZTBTR_PDA01_008",
		Parameter: TMP_Parameter,
		Success: function($data){
			app_alert("배분되었습니다.");
			app_changePage( 'B020500.html', pageParams, true );
		},
		Error: function($e){
			app_alert($e);
		}
	});
}
//콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}
//4자리마다 - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}
//문자열 시작부터 갯수만큼 잘라 반환
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
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

//디지털숫자형 반환
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

