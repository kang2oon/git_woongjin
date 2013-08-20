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

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("카드승인확인 및 입금배분");


	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
		load_data();
	} else {

	}


};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//기본정보표시
var set_data = function() {

	$("#KUNNR_NM").html(pageParams.KUNNR_NM);
	$("#CARD_INFO").html(pageParams.CRDCD_NM+"<br>("+card_numberFormat(pageParams.CRDNO)+")");
	$("#APDAT").html(String(pageParams.APDAT).replace(/\//g,"-"));
	$("#APPNO").html(pageParams.APPNO);
	$("#APAMT_C").html(numberFormat(pageParams.APAMT_C)+"원");

}

//배분리스트로드
var load_data = function() {

	loader.load( {
		Function: "ZTBTR_PDA01_005",
		Parameter: {
			I_KUNNR:pageParams.STDCD
		},
		Success: function($data){

			JsonData = JSON.parse( $data );
			ReadJsonData = JsonData;

			pageParams.E_SPMON = JsonData.Parameter.E_SPMON;

			$("#E_SPMON").val(JsonData.Parameter.E_SPMON);

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
			$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
				tmp_TB = tmp_TB+"\n"+
				"	<tr>\n"+
				"		<td class='left'>"+entry["MAKTX"]+"</td>\n"+
				"		<td class='left'><span class='item'><input onclick='process_DMBTR(this);' type='checkbox' name='PAY_CASH' id='PAY_CASH_NETP0_"+entry["VBELN"]+"' ";

				if(entry["NETP0"]=="완납") {
					tmp_TB = tmp_TB + " disabled='disabled' checked='checked' "
				} else {

					if(Number(entry["NETP0"])>=Number(entry["ITAMT"])) {
						tmp_TB = tmp_TB + " disabled='disabled' "
					}
				}

				tmp_TB = tmp_TB + " value='"+entry["NETP0"]+"' /> <label for='PAY_CASH_NETP0_"+entry["VBELN"]+"' onclick=\"\"> "+numberFormat(entry["NETP0"])+"</label></span></td>\n"+
				"		<td class='left'>"+numberFormat(entry["NETP1"])+"</td>\n"+
				"		<td class='left'><span class='item'><input onclick='process_DMBTR(this);' type='checkbox' name='PAY_CASH' id='PAY_CASH_NETP1_"+entry["VBELN"]+"'  value='"+entry["ITAMT"]+"' /> <label for='PAY_CASH_NETP1_"+entry["VBELN"]+"' onclick=\"\"> "+numberFormat(entry["ITAMT"])+"</label></span></td>\n"+
				"	</tr>\n";
			}); 


			write_TB(tmp_TB,4);

			if(typeof(pageParams.ZTBTR_PDA01_005)!="undefined") {
				$.each(pageParams.ZTBTR_PDA01_005.T_IMPORTA, function(index, entry) {
					$("#PAY_CASH_NETP"+entry["NO"]+"_"+entry["VBELN"]).attr("checked",true);
				}); 
				process_DMBTR();
			}
		},
		Error: function($e){
			app_alert($e);
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


//합계금액
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

	tmp_DMBTR = 0;
	$("input[name=PAY_CASH]").each(function (){

		if($(this).attr("checked")=="checked") {
			if($(this).attr("disabled")!="disabled") {
				tmp_DMBTR = tmp_DMBTR+Number($(this).attr("value"));

			}			
		}

	});

	if(click_object!="") {
		if($(click_object).attr("checked")=="checked") {
			if(Number(tmp_DMBTR)>Number(pageParams.APAMT_C)) {
				app_alert("카드결제 금액보다 선택하신 금액이 큽니다.");
				$(click_object).attr("checked",false);
				process_DMBTR();
				return;
			}
		}
	}

	$("#SELECT_APAMT").html(numberFormat(tmp_DMBTR)+"원");

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
		app_alert("먼저 배분하실 금액을 선택한 후 [배분]버튼을 눌러주세요.");
		return;
	}

	if(checkDigit(pageParams.APAMT_C)!=checkDigit(String(tmp_DMBTR))) {
		app_alert("카드결제 금액과 선택하신 금액이 맞지 않습니다.");
		return;
	}

	var today=new Date();

	var tm_year = today.getFullYear()+"";		//년도 
	var tm_month = today.getMonth()+1+"";		//당월 
	var tm_day = today.getDate()+""; 
	if(tm_month<10) tm_month="0"+tm_month;
	if(tm_day<10) tm_day="0"+tm_day;

	var TMP_Parameter = {
			I_SPMON:pageParams.E_SPMON,
			S_IMPORTA:[],
			T_IMPORTA:[]
	};

	var S_IMPORTA_parameter = {
			KUNNR:pageParams.STDCD,
			CRDCD:pageParams.CRDCD,
			EDUFREE:"",
			CRDNO:pageParams.CRDNO,
			VTERM:"",
			ALMON:"",
			OWNER:"",
			STCD1:"",
			APAMT:pageParams.APAMT,
			APDAT:String(pageParams.APDAT).replace(/\//g,""),
			APPNO:pageParams.APPNO,
			PIAGR:"X",
			SIGN_IMG:"",
			SIGN_IMG2:""
	};
	TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter;


	$("input[name=PAY_CASH]").each(function (){

		if($(this).attr("checked")=="checked") {
			if($(this).attr("disabled")!="disabled") {

				tmp_id = $(this).attr("id").split("_")[3];
				tmp_value = $(this).val();
				tmp_no = $(this).attr("id").split("_")[2].replace("NETP","");

				$.each(ReadJsonData.Parameter.T_EXPORTA, function(index, entry) {
					if(tmp_id==entry["VBELN"]) {
						var T_IMPORTA_parameter = {
								NO:tmp_no,
								MAKTX:entry["MAKTX"],
								VBELN:entry["VBELN"],
								DMBTR:tmp_value
						};
						TMP_Parameter.T_IMPORTA.push(T_IMPORTA_parameter);
					}
				}); 


			}			
		}

	});

	try
	{
		pageParams.ZTBTR_PDA01_005={};
		pageParams.ZTBTR_PDA01_005=TMP_Parameter;
	}
	catch (e)
	{
	}
	saveJson();
}


//@ 항목 데이터 저장
var saveJson = function() {

	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

// 페이지 이동
var readyChange=function() {

	app_changePage( 'B020504.html', pageParams, true );
}

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

// 4자리마다 - 추가
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

