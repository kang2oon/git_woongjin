/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}


/********************************************************************************/
//BASE logic 
/********************************************************************************/
//페이지 로드시작
$(document).ready(function(){

	app_endLoading();
	app_changeTitle("현금배분");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});


//페이지 파라미터 수신
var setData = function( $data ){

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
        load_cust2();
	} else {

	}

	var date = new Date();
	date.setDate("1");

	$("#NETP1").html(date.getMonth()+1);
	$("#NETP1").html($("#NETP1").html()+"월정당액");

	$("#NETP0").html(date.getMonth());
	$("#NETP0").html($("#NETP0").html()+"월");

};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}




//@ 페이지로딩시 배분값 출력 2013.04.08 NDH
var load_cust2 = function() {


	loader.load( {
		Function: "ZTBTR_VACCT_BALANCE_FOR_TUTOR",
		Parameter: {
			I_KUNNR:""
		},
		Success: function($data){
            JsonData = JSON.parse( $data );
    			if( !!JsonData.Parameter ){
    				$("#E_BALANCE").html(numberFormat(JsonData.Parameter.E_BALANCE_TX)+"원");
    			}
		},
		Error: function($e){
			app_alert($e);
		}
	});
}





//@ 회원명 검색
var load_cust = function() {

	if($.trim($("#SEARCH_QUERY").val())=="") {

		app_alert("회원명 입력해주세요.");
		return;
	}

	loader.load( {
		Function: "ZTBTR_PDA01_003",
		Parameter: {
			I_DAYWK:"",
			I_STDNM:$.trim($("#SEARCH_QUERY").val()),
			I_CARD_IND:""
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				var date = new Date();
				date.setFullYear(String(JsonData.Parameter.E_SPMON).substring(0,4));
				date.setDate("1");

				$("#E_SPMON").val(String(JsonData.Parameter.E_SPMON));
				date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-1);
				$("#NETP1").html(date.getMonth()+1);
				$("#NETP1").html($("#NETP1").html()+"월정당액");

				date.setMonth(Number(Right(String(JsonData.Parameter.E_SPMON),2))-2);
				$("#NETP0").html(date.getMonth()+1);
				$("#NETP0").html($("#NETP0").html()+"월");

				$("#E_BALANCE").html(numberFormat(JsonData.Parameter.E_BALANCE)+"원");

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
					tmp_TB = tmp_TB+"\n"+
					"	<tr>\n"+
					"		<td class='cell_"+entry["KUNNR"]+"' cell_count='"+tmp_backKUNNR_count+"'>"+entry["NAME1"]+"</td>\n"+
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
					"		<td class='left'><span class='item'><input onclick='process_DMBTR(this);' type='checkbox' name='PAY_CASH' id='PAY_CASH_NETP1_"+entry["VBELN"]+"'  value='"+entry["ITAMT"]+"' /> <label for='PAY_CASH_NETP1_"+entry["VBELN"]+"' onclick=\"\"> "+numberFormat(entry["ITAMT"])+"</label></span></td>\n"+
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





				process_DMBTR();

				check_radio_load(false);

			}
		},
		Error: function($e){
			app_alert($e);
			write_TB('',4);
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

//@ 배분 DATABASE 저장
var saveDatabase = function() {

	var TMP_Parameter = {
			I_SPMON:$("#E_SPMON").val(),
			T_IMPORTA:[]
	};

	tmp_DMBTR = false;
	$("input[name=PAY_CASH]").each(function (){

		if($(this).attr("checked")=="checked") {
			if($(this).attr("disabled")!="disabled") {
				tmp_DMBTR = true;

				var tmpData = {
						"VBELN":$(this).attr("id").split("_")[3],
						"DMBTR":$(this).val()
				}
				TMP_Parameter.T_IMPORTA.push(tmpData);
			}			
		}

	});

    
	if(tmp_DMBTR==false) {
		app_alert("먼저 배분하실 금액을 선택한 후 [배분]버튼을 눌러주세요.");
		return;
	}

	loader.load( {
		Function: "ZTBTR_PDA01_004",
		Parameter: TMP_Parameter,
		Success: function($data){

			app_alert("가상계좌 입금배분을 완료하였습니다.");
			//load_cust();


		},
		Error: function($e){
			var msg = $e;
			if( $e==undefined || $e=='' ){
				msg = "가상계좌 입금배분을 실패했습니다."
			}
			app_alert( msg );
		}
	});
}


//배분 현황 표시
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



		$("input[name=PAY_CASH]").each(function (){

			if($(this).attr("checked")=="checked") {
				if($(this).attr("disabled")!="disabled") {

					if($(this).attr("id").split("_")[2]=="NETP0") {

					} else {

					}
					tmp_DMBTR = tmp_DMBTR+Number($(this).attr("value"));
				}			
			}

		});
	}

	$("#DMBTR_TX").html(numberFormat(tmp_DMBTR)+"원");
	$("#DMBTR").val(tmp_DMBTR);

}



//css 적용관련.
function check_radio_load(delete_is, id_object) {

	if(delete_is==true) {

		$('input.graphic').each(function(){
			var $form = $(this);
			var target = $form.attr('id');
			var $label = $('label[for="' + target + '"]');
			if($(this).attr("name")==id_object) {
				$(this).attr("checked", false);
				$(this).attr("disabled", false);
				$label.find('>span:first').find('>button').removeClass("check").removeClass("disabled");
			}
		});

	} else {

		$('input.graphic').each(function(){
			var $form = $(this);
			var target = $form.attr('id');
			var $label = $('label[for="' + target + '"]');


			$label.find('>span:first')
			.find('>button').removeClass("graphic cbr-type").addClass(function(){
				if($form.is(':disabled')) return "disabled";
			}).addClass(function(){
				if($form.is(':checked')) return "check";
			}).parents('label').children().on('click', function(){
				if($.browser.msie && $.browser.version < 9) $form.toArray()[0].click();
			});

		});
	}
}

// 문자열끝에서 갯수만큼 문자열반환
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