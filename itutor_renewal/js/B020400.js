/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

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

	app_changeTitle("과목별납부금액");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
		load_info();
	} else {

	}


};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//데이터 표시
var set_data = function() {

	$("#NAME1").html(pageParams.NAME1);
	$("#MAKTX").html(pageParams.MAKTX);
}

//과목별 납부내역 조회
var load_info = function() {

	loader.load( {
		Function: "ZTBTR_THINK_002",
		Parameter: {
			I_BUKRS:"1000",
			I_STDCD:pageParams.KUNNR,
			I_VBELN:pageParams.VBELN
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			tmp_TB = "";
			$.each(JsonData.Parameter.T_IN, function(index, entry) {

				tmp_TB = tmp_TB+"\n"+
				"	<tr>\n"+
				"		<td>"+entry["BUDAT"]+"</td>\n"+
				"		<td class='left'>"+numberFormat(entry["DMBTR"])+"</td>\n"+
				"		<td class='left'>"+entry["INTXT"]+"</td>\n"+
				"	</tr>\n";
			}); 

			write_TB(tmp_TB,3);
		},
		Error: function($e){
			app_alert($e);
			write_TB('',3);
		}
	});
}

//테이블 생성
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

// 문자열 끝에서 갯수만큼 잘라 반환
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

// 3자리마다 , 찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

