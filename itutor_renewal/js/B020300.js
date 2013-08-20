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

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("배분현황및자동이체");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		try
		{

			if($.trim(pageParams.SEARCH_QUERY)!="") {

				$("#SEARCH_QUERY").val($.trim(pageParams.SEARCH_QUERY));
				load_cust();
			}
		}
		catch (e)
		{
		}

	} else {

	}


};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

var app_set_changePage = function () {


}

//@ 회원명 검색
var load_cust = function() {

	if($.trim($("#SEARCH_QUERY").val())=="") {

		app_alert("회원명 입력해주세요.");
		return;
	}

	pageParams.SEARCH_QUERY = $.trim($("#SEARCH_QUERY").val());
	app_setRequestParameter("app_set_changePage", pageParams);

	loader.load( {
		Function: "ZTBTR_PDA02_003",
		Parameter: {
			I_DAYWK:"",
			I_STDNM:$.trim($("#SEARCH_QUERY").val())
		},
		Success: function($data){


			JsonData = JSON.parse( $data );



			var date = new Date();
			date.setFullYear(String(JsonData.Parameter.E_SPMON).substring(0,4));
			date.setDate("1");

			date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-1);
			$("#NETP1").val(date.getMonth()+1);

			date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-2);
			$("#NETP0").val(date.getMonth()+1);


			tmp_TB = "";
			tmp_listKUNNR = "";
			tmp_backKUNNR = "";
			tmp_backKUNNR_count = 0;

			$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

				if(tmp_backKUNNR!=entry["KUNNR"]) {
					tmp_backKUNNR=entry["KUNNR"];
					tmp_listKUNNR = tmp_listKUNNR + "@" + entry["KUNNR"];
					tmp_backKUNNR_count=0;
				} else {
					tmp_backKUNNR_count=tmp_backKUNNR_count+1;
				}

				tmp_TB=tmp_TB+"\n"+
				"	<tr>\n"+
				"		<td class='cell_"+entry["KUNNR"]+"' cell_count='"+tmp_backKUNNR_count+"'><a onclick=\"app_changePage('B020401.html',{SEARCH_QUERY:'"+pageParams.SEARCH_QUERY+"',KUNNR:'"+entry["KUNNR"]+"',VBELN:'"+entry["VBELN"]+"',NAME1:'"+entry["NAME1"]+"'},true);\" class='anchor box'>"+entry["NAME1"]+"</a></td>\n"+
				"		<td><a onclick=\"app_changePage('B020400.html',{KUNNR:'"+entry["KUNNR"]+"',VBELN:'"+entry["VBELN"]+"',NAME1:'"+entry["NAME1"]+"',ZMAT1:'"+entry["ZMAT1"]+"',MAKTX:'"+entry["MAKTX"]+"',E_SPMON:'"+JsonData.Parameter.E_SPMON+"'},true);\" class='anchor box'>"+entry["MAKTX"]+"</a></td>\n"+
				"		<td>"+$("#NETP0").val()+"월 "+numberFormat(entry["NETP0"])+"<br />"+$("#NETP1").val()+"월 "+numberFormat(entry["NETP1"])+"</td>\n"+
				"		<td>"+numberFormat(entry["ITAMT"])+"</td>\n"+
				"	</tr>\n";

			}); 

			write_TB(tmp_TB,4);

			//@ 회원명 rowspan 
			tmp_dataKUNNR = String(tmp_listKUNNR).split("@");
			for(var loop=0; loop < tmp_dataKUNNR.length ; loop++) {
				if(tmp_dataKUNNR[loop]!="") {

					cell_sum = Number($(".cell_"+tmp_dataKUNNR[loop]+":last").attr("cell_count"))+1;

					for(var del_loop=1;del_loop<cell_sum;del_loop++) {
						$(".cell_"+tmp_dataKUNNR[loop]).eq(1).remove();
					}

					$(".cell_"+tmp_dataKUNNR[loop]).eq(0).attr("rowspan",cell_sum);
				}
			}

		},
		Error: function($e){
			app_alert($e);

			write_TB('',4);
		}
	});
}

// 테이블 생성
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

// 문자열 끝에서 갯수만큼 잘라반환
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

