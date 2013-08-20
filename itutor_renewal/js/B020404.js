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

	app_changeTitle("자동이체 즉시출금");


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

var app_set_changePage = function() {

}

// 회원명 검색
var load_cust = function() {

	if($.trim($("#SEARCH_QUERY").val())=="") {

		app_alert("회원 이름을 입력한 후 검색해주세요.");
		return;
	}
	pageParams.SEARCH_QUERY = $.trim($("#SEARCH_QUERY").val());
	app_setRequestParameter("app_set_changePage", pageParams);

	loader.load( {
		Function: "ZTBTR_THINK_001",
		Parameter: {
			I_BUKRS:"1000",
			I_STDNM:$.trim($("#SEARCH_QUERY").val())
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				var date = new Date();
				date.setFullYear(String(JsonData.Parameter.E_SPMON).substring(0,4));

				date.setDate("1");

				date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-1);
				$("#NETP1").html(date.getMonth()+1);
				$("#NETP1").html($("#NETP1").html()+"월");

				date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-2);
				$("#NETP0").html(date.getMonth()+1);
				$("#NETP0").html($("#NETP0").html()+"월");

				tmp_TB = "";
				tmp_listSTDCD = "";
				tmp_backSTDCD = "";
				tmp_backSTDCD_count = 0;

				$.each(JsonData.Parameter.T_01, function(index, entry) {

					if(tmp_backSTDCD!=entry["STDCD"]) {
						tmp_backSTDCD=entry["STDCD"];
						tmp_listSTDCD = tmp_listSTDCD + "@" + entry["STDCD"];
						tmp_backSTDCD_count=0;
					} else {
						tmp_backSTDCD_count=tmp_backSTDCD_count+1;
					}

					tmp_TB = tmp_TB+"\n"+
					"	<tr>\n"+
					"		<td class='cell_"+entry["STDCD"]+"' cell_count='"+tmp_backSTDCD_count+"'><a onclick=\"app_changePage('B020405.html',{STDCD:'"+entry["STDCD"]+"',VBELN:'"+entry["VBELN"]+"',STDNM:'"+entry["STDNM"]+"',E_SPMON:'"+JsonData.Parameter.E_SPMON+"'},true);\" class='anchor box'>"+entry["STDNM"]+"</a></td>\n"+
					"		<td>"+numberFormat(entry["NETP0"])+"</td>\n"+
					"		<td>"+numberFormat(entry["NETP1"])+"</td>\n"+
					"		<td>"+numberFormat(entry["ITAMT"])+"</td>\n"+
					"	</tr>\n";
				}); 


				write_TB(tmp_TB,4);


				//@ 회원명 rowspan 
				tmp_dataSTDCD = String(tmp_listSTDCD).split("@");
				for(var loop=0; loop < tmp_dataSTDCD.length ; loop++) {
					if(tmp_dataSTDCD[loop]!="") {

						cell_sum = Number($(".cell_"+tmp_dataSTDCD[loop]+":last").attr("cell_count"))+1;

						for(var del_loop=1;del_loop<cell_sum;del_loop++) {
							$(".cell_"+tmp_dataSTDCD[loop]).eq(1).remove();
						}

						$(".cell_"+tmp_dataSTDCD[loop]).eq(0).attr("rowspan",cell_sum);
					}
				}
			}
		},
		Error: function($e){
			//alert($e);
			write_TB('',4);
		}
	});
}

// 조회결과 테이블 구성
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


// 문자열끝부터 갯수만큼 반환
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

