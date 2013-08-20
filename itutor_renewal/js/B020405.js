/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var readJsonData;

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

		set_data();
		load_info();
	} else {

	}


};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//기본정보
var set_data = function() {

	$("#STDNM").html(pageParams.STDNM);

	var date = new Date();
	date.setFullYear(String(pageParams.E_SPMON).substring(0,4));
	date.setDate("1");

	date.setMonth(Number(Right(String(pageParams.E_SPMON),2))-1);
	$("#NETP1").html(date.getMonth()+1);
	$("#NETP1").html($("#NETP1").html()+"월");

	date.setMonth(Number(Right(String(pageParams.E_SPMON),2))-2);
	$("#NETP0").html(date.getMonth()+1);
	$("#NETP0").html($("#NETP0").html()+"월");
}







//계좌조회 요청
var load_info = function() {
    
//Success 안에 집어넣기
/*
             var testText ="자동이체 청구중";
             if(testText=="자동이체 청구중")
             {

                 $("div > span.wrap > button").hide();
             }
 */

    

	loader.load( {
		Function: "ZTBTR_GET_VBELN_AUTO_REAL",
		Parameter: {
			I_BUKRS:"1000",
			I_STDCD:pageParams.STDCD,
			I_VBELN:pageParams.VBELN,
			I_KEYDT:pageParams.E_SPMON
		},
		Success: function($data){

			JsonData = JSON.parse( $data );
			readJsonData = JsonData;


			$("#E_BANKN").html(JsonData.Parameter.E_BANKN);
			$("#E_BANKA").html(JsonData.Parameter.E_BANKA);

			tmp_TB = "";

			$.each(JsonData.Parameter.T_ZTBTRS0011, function(index, entry) {

				tmp_TB = tmp_TB+"\n"+
				"	<tr>\n"+
				"		<td>"+entry["MAKTX"]+"</td>\n"+
				"		<td class='left'><span class='item'><input onclick='process_DMBTR(this);' type='checkbox' name='PAY_CASH' id='PAY_CASH_NETP0_"+entry["VBELN"]+"' ";

				if(entry["AUTXT"]=="자동이체 청구중") {
					tmp_TB = tmp_TB + " disabled='disabled' ";
				} else if(entry["NETP0"]=="완납") {
					tmp_TB = tmp_TB + " disabled='disabled' checked='checked' ";
				}                

				tmp_TB = tmp_TB + " value='"+entry["NETP0"]+"' /> <label for='PAY_CASH_NETP0_"+entry["VBELN"]+"' onclick=\"\"> "+numberFormat(entry["NETP0"])+ "</label></span></td>\n"+
				"		<td class='left'>"+numberFormat(entry["NETP1"])+"</td>\n"+
				"		<td class='left'><span class='item'><input onclick='process_DMBTR(this);' type='checkbox' name='PAY_CASH' id='PAY_CASH_NETP1_"+entry["VBELN"]+"'  ";

				if(entry["AUTXT"]=="자동이체 청구중") {
					tmp_TB = tmp_TB + " disabled='disabled' ";
				}                

				tmp_TB = tmp_TB + "  value='"+entry["ITAMT"]+"' /> <label for='PAY_CASH_NETP1_"+entry["VBELN"]+"' onclick=\"\"> "+numberFormat(entry["ITAMT"])+"</label></span></td>\n"+
				"	</tr>\n";
			}); 

			write_TB(tmp_TB,4);
		},
		Error: function($e){
			//alert($e);
			write_TB('',4);
		}
	});
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

//체크박스 라디오버튼처럼 사용.
var process_DMBTR = function(click_object) {

	tmp_DMBTR = 0;
	if(click_object!="") {


		if($(click_object).attr("checked")=="checked") {

			if($(click_object).attr("id").split("_")[2]=="NETP0") {
				if($("#"+$(click_object).attr("id").replace("NETP0","NETP1")).attr("disabled")!="disabled") {
					$("#"+$(click_object).attr("id").replace("NETP0","NETP1")).attr("checked",false);
				}
			} else {
				if($("#"+$(click_object).attr("id").replace("NETP1","NETP0")).attr("disabled")!="disabled") {
					$("#"+$(click_object).attr("id").replace("NETP1","NETP0")).attr("checked",false);
				}
			}

		}

	}


}

//@ 즉시출금 버튼
var bankSubmit = function() {

	tmp_DMBTR = 0;
	$("input[name=PAY_CASH]").each(function (){

		if($(this).attr("checked")=="checked") {
			if($(this).attr("disabled")!="disabled") {
				tmp_DMBTR = tmp_DMBTR+Number($(this).attr("value"));
			}			
		}

	});
	if(tmp_DMBTR==0) {
		app_alert("즉시 출금할 과목을 선택해주세요.");
		return;
	}


	var Structure_parameter = {
			BUKRS :"1000",
			KUNNR :pageParams.STDCD,
			VKORG :"1000",
			BANKS :readJsonData.Parameter.E_BANKS, 
			BANKN :readJsonData.Parameter.E_BANKN, 
			KOINH :readJsonData.Parameter.E_KOINH,
			STCD1 :readJsonData.Parameter.E_STCD1,
			OTAMT :String(eval(tmp_DMBTR/100))
	};
	var object_T_ZTBTRTDC23 = [];

	$("input[name=PAY_CASH]").each(function (){

		if($(this).attr("checked")=="checked") {
			if($(this).attr("disabled")!="disabled") {

				tmp_VBELN = $(this).attr("id").split("_")[3];
				tmp_OTAMT = eval($(this).val() / 100);
				$.each(readJsonData.Parameter.T_ZTBTRS0011, function(index, entry) {

					if(tmp_VBELN==entry["VBELN"]) {

						var tmpData = {
								BUKRS :"1000",
								VKORG :"1000",
								BANKS :String(readJsonData.Parameter.E_BANKS),
								KUNNR :entry["KUNNR"],
								VBELN :entry["VBELN"],
								OTAMT :String(tmp_OTAMT)
						}
						object_T_ZTBTRTDC23.push(tmpData);

					}
				}); 
			}
		}

	});


	loader.load( {
		Function: "ZTBTR_SEND_REG_ACC_DACOM",
		Parameter:{
			IN_GUBUN:"4",
			S_ZTBTRSDC01:Structure_parameter,
			T_ZTBTRTDC23:object_T_ZTBTRTDC23
		},
		Success: function($data){
			//alert("Success:"+$data);
			app_alert('즉시출금이 정상적으로 실행되었습니다.\n 5분후 배분현황을 확인하세요.');
			JsonData = JSON.parse( $data );
			// 이전페이지로 이동
			app_goCancel();
		},
		Error: function($e){
			app_alert($e);
		}
	});
}

//콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

//문자열 시작부터 갯수만큼 문자열반환
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}

//문자열 끝부터 갯수만큼 문자열반환
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
