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

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("상세조회");

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

//기본정보
var set_data = function() {

	$("#NAME1").html(pageParams.NAME1);
}

//유효성 체크
var item_check = function(use_function) {

	tmp_CHECKED = false;
	$("input[name=ITEM_LIST]").each(function (){

		if($(this).attr("checked")=="checked") {
			tmp_CHECKED = true;
		}

	});

	switch(use_function) {

	case "change_new":
		pageParams.REQGB="1";
		$("input[name=ITEM_LIST]").each(function (){
			if($.trim($(this).attr("ATRNFLG"))=="X") {
				pageParams.REQGB="2";
			}
		});
		if($("#ATNGB").html()=="계좌이체") {
			pageParams.REQGB="2";
		}
		break;
	case "change_edit":
		pageParams.REQGB="3";
		break;
	case "change_remove":
		pageParams.REQGB="5";
		if(!confirm('선택하신 회원의 자동이체가 해지 됩니다. \n\n자동이체를 해지하시겠습니까?')) {
			return;
		}
		break;
	case "change_select_remove":
		pageParams.REQGB="6";
		if(tmp_CHECKED==false) {

			app_alert("해지할 과목을 선택해주세요.");
			return;
		} else {

			if(!confirm('선택하신 과목의 자동이체가 해지 됩니다. \n\n자동이체를 해지하시겠습니까?')) {
				return;
			}
		}
		break;
	}

	if(tmp_CHECKED==false && use_function!="change_remove" && use_function!="change_select_remove") {
		if(confirm('항목 전체를 사용하시겠습니까?')) {

			switch(use_function) {

			case "change_new":
				$("input[name=ITEM_LIST]").each(function (){
					if($.trim($(this).attr("ATRNFLG"))=="") {
						$(this).attr("checked",true);
					}
				});
				break;
			case "change_edit":
				$("input[name=ITEM_LIST]").each(function (){
					if($.trim($(this).attr("ATRNFLG"))=="X") {
						$(this).attr("checked",true);
					}
					if($("#ATNGB").html()=="계좌이체") {
						if($(this).attr("disabled")!="disabled") {
							$(this).attr("checked",true);
						}
					}
				});
				break;
			}

		} else {
			return false;
		}
	}


	pageParams.ZTBTR_PDA02_002={
			T_IMPORTA:[]
	};

	$("input[name=ITEM_LIST]").each(function (){

		if($(this).attr("checked")=="checked") {

			var T_IMPORTA_parameter = {
					MAKTX:$(this).attr("MAKTX"),
					VBELN:$(this).attr("id").split("_")[1],
					DMBTR:$(this).val()
			};

			pageParams.ZTBTR_PDA02_002.T_IMPORTA.push(T_IMPORTA_parameter);						

		}

	});
	return true;
}

//배분현황 조회
var load_info = function() {

	loader.load( {
		Function: "ZTBTR_PDA02_001",
		Parameter: {
			I_KUNNR:$.trim(pageParams.KUNNR)
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			pageParams.PAY_TRANSFER_BANK = JsonData.Parameter.S_EXPORTA.BANKL;
			pageParams.PAY_TRANSFER_BANKNAME = JsonData.Parameter.S_EXPORTA.BANKA;
			pageParams.PAY_TRANSFER_BANK_NUMBER = JsonData.Parameter.S_EXPORTA.BANKN;
			pageParams.PAY_TRANSFER_PERSON = JsonData.Parameter.S_EXPORTA.KOINH;
			pageParams.PAY_TRANSFER_PERSON_SSNUM = JsonData.Parameter.S_EXPORTA.STCD1;
			pageParams.PAY_TRANSFER_DATE = JsonData.Parameter.S_EXPORTA.ATDAT;

			//@ 구분
			switch($.trim(JsonData.Parameter.S_EXPORTA.ATNGB)) {
			case "1":
				$("#ATNGB").html("계좌이체");
				$("#button_execute").find("button").eq(0).attr("display","show");
				break;
			case "2":
				$("#ATNGB").html("카드이체");
				break;
			case "3":
				$("#ATNGB").html("계좌이체해지");
				$("#button_execute").find("button").eq(0).attr("display","hide");
				$("#button_execute").find("button").eq(1).attr("display","show");
				$("#button_execute").find("button").eq(2).attr("display","hide");
				$("#button_execute").find("button").eq(3).attr("display","hide");
				break;
			case "4":
				$("#ATNGB").html("카드이체해지");
				$("#button_execute").find("button").eq(0).attr("display","hide");
				$("#button_execute").find("button").eq(1).attr("display","show");
				$("#button_execute").find("button").eq(2).attr("display","hide");
				$("#button_execute").find("button").eq(3).attr("display","hide");
				break;
			default:
				$("#ATNGB").html("-");
			$("#button_execute").find("button").eq(0).attr("display","hide");
			$("#button_execute").find("button").eq(1).attr("display","show");
			$("#button_execute").find("button").eq(2).attr("display","hide");
			$("#button_execute").find("button").eq(3).attr("display","hide");
			}

			//@ 상태
			if($.trim(JsonData.Parameter.S_EXPORTA.ATSTA)!="") {
				$("#ATSTA_TX").html(JsonData.Parameter.S_EXPORTA.ATSTA);
			} else {
				$("#ATSTA_TX").html("-");
			}

			//@ 오류
			if($.trim(JsonData.Parameter.S_EXPORTA.ERRCD)!="") {
				$("#ERRCD_TX").html(JsonData.Parameter.S_EXPORTA.ERRCD);
			} else {
				$("#ERRCD_TX").html("-");
			}


			tmp_TB = "";
			$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

				tmp_TB=tmp_TB+"\n"+
				"	<tr>\n"+
				"		<td style='text-align:left;'><input type='checkbox' NAME='ITEM_LIST' id='LIST_"+entry["VBELN"]+"' ATRNFLG='"+$.trim(entry["ATRNFLG"])+"' MAKTX='"+entry["MAKTX"]+"' value='"+entry["CURRAMT"]+"'/><label for='LIST_"+entry["VBELN"]+"' onclick=\"\"> "+entry["MAKTX"]+"</label></td>\n"+
				"		<td>";

				switch($.trim(entry["ATRNFLG"])) {
				case "":
					tmp_TB=tmp_TB+"<img src='../image/ico_transfer_manual.png' alt='수동이체' style='width: 18px; height: auto; ' />";
					break;
				case "-":
					tmp_TB=tmp_TB+"<img src='../image/ico_transfer_prepay.png' alt='장기선납' style='width: 18px; height: auto; ' />";
					break;
				default:
					tmp_TB=tmp_TB+"<img src='../image/ico_transfer_automatic.png' alt='자동이체' style='width: 18px; height: auto; ' />";
				}


				tmp_TB=tmp_TB+"</td>\n"+
				"		<td>"+String(entry["TSDAT"]).replace(/\//g,".")+" ~ "+String(entry["TEDAT"]).replace(/\//g,".")+"</td>\n"+
				"		<td>"+numberFormat(entry["CURRAMT"])+"</td>\n"+
				"	</tr>\n";
			}); 

			write_TB(tmp_TB,4);

			if(typeof(pageParams.ZTBTR_PDA02_002)!="undefined") {
				$.each(pageParams.ZTBTR_PDA02_002.T_IMPORTA, function(index, entry) {
					$("#LIST_"+entry["VBELN"]).attr("checked",true);
				}); 
			}

			bool_newData=false;
			bool_Data=false;
			$("input[name=ITEM_LIST]").each(function (){
				if($("#ATNGB").html()=="-") {

					if($(this).attr("ATRNFLG")=="X" || $(this).attr("ATRNFLG")=="-") {
						$(this).attr("disabled",true);
					}

				} else {

					if($(this).attr("ATRNFLG")=="-") {
						$(this).attr("disabled",true);
					}

				}
				if($(this).attr("ATRNFLG")!="-" && $("#ATNGB").html()=="계좌이체") {
					$(this).attr("disabled",false);
				}

				if($(this).attr("ATRNFLG")=="") {
					bool_newData=true;
				}
				if($(this).attr("ATRNFLG")=="X") {
					bool_Data=true;
				}

			});

			//# 신청 과목여부체크
			if(bool_newData!=true) {
				$("#button_execute").find("button").eq(1).attr("display","hide");
			}
			//# 자동이체과목 여부체크
			if(bool_Data!=true) {
				$("#button_execute").find("button").eq(0).attr("display","hide");
				$("#button_execute").find("button").eq(2).attr("display","hide");
				$("#button_execute").find("button").eq(3).attr("display","hide");
				if($("#ATNGB").html()=="계좌이체") {
					$("#button_execute").find("button").eq(0).attr("display","show");
				}
			}
		},
		Error: function($e){
			app_alert($e);
			write_TB('',4);
		}
	});
}

// 테이블 구성
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


//변경
var change_edit = function() {

	if($("#button_execute").find("button").eq(0).attr("display")=="hide") {
		app_alert("해당 회원은 카드이체 상태이거나 자동이체가 해지된 회원일 수 있습니다. \n 자동이체 대상회원이 맞는지 다시 확인해주세요.");
		return;
	}
	if(item_check('change_edit')!=true) return;

	pageParams.backURL = 'B020402.html';
	app_setRequestParameter("readyChange", pageParams);

}

//신청
var change_new = function() { 

	if($("#button_execute").find("button").eq(1).attr("display")=="hide") {
		app_alert("신규신청이 불가능한 상태입니다.");
		return;
	}
	if(item_check('change_new')!=true) return;

	pageParams.backURL = 'B020402.html';
	app_setRequestParameter("readyChange", pageParams);

}

//삭제
var change_remove = function() {

	if($("#button_execute").find("button").eq(2).attr("display")=="hide") {
		app_alert("해지가 불가능한 상태입니다.");
		return;
	}
	if(item_check('change_remove')!=true) return;

	process_remove();
}

//부분해지
var change_select_remove = function() {

	if($("#button_execute").find("button").eq(3).attr("display")=="hide") {
		app_alert("부분해지가 불가능한 상태입니다.");
		return;
	}
	if(item_check('change_select_remove')!=true) return;

	process_remove();
}

// 해지 요청
var process_remove = function() {

	var today=new Date();

	var tm_year = today.getFullYear()+"";		//년도 
	var tm_month = today.getMonth()+1+"";		//당월 
	var tm_day = today.getDate()+""; 
	if(tm_month<10) tm_month="0"+tm_month;
	if(tm_day<10) tm_day="0"+tm_day;

	pageParams.SIGNATURE2="";
	if(String(pageParams.SIGNATURE).length>2000) {
		pageParams.SIGNATURE=Left(String(pageParams.SIGNATURE),2000);
		pageParams.SIGNATURE2=String(pageParams.SIGNATURE).substring(2000,String(pageParams.SIGNATURE).length);
	} else {
		pageParams.SIGNATURE=pageParams.SIGNATURE;
		pageParams.SIGNATURE2="";
	}

	var TMP_Parameter = {
			S_IMPORTA:[],
			T_IMPORTA:[]
	};

	var S_IMPORTA_parameter_REQGB5 = {
			REQGB:pageParams.REQGB,
			KUNNR:pageParams.KUNNR,
			BANKL:"",
			BANKA:"",
			BANKN:"",
			KOINH:"",
			STCD1:"",
			ATDAT:"00",
			SIGN_NAME:pageParams.PAY_TRANSFER_NAME,
			SIGN_IMG:pageParams.SIGNATURE,
			SIGN_IMG2:pageParams.SIGNATURE2
	};

	TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter_REQGB5;

	$.each(pageParams.ZTBTR_PDA02_002.T_IMPORTA, function(index, entry) {

		var T_IMPORTA_parameter = {
				VBELN:entry["VBELN"],
				DMBTR:entry["DMBTR"]
		};
		TMP_Parameter.T_IMPORTA.push(T_IMPORTA_parameter);

	});

	loader.load( {
		Function: "ZTBTR_PDA02_002",
		Parameter:TMP_Parameter,
		Success: function($data){

			app_alert("요청하신 내역이 정상적으로 처리되었습니다.");
			try { delete pageParams.ZTBTR_PDA02_002; }
			catch (e) { }
			try { delete pageParams.PAY_TRANSFER_BANK; }
			catch (e) { }



			if(pageParams.REQGB=="5") {
				app_changePage( 'B020300.html', pageParams );
			} else {
				app_changePage( 'B020401.html', pageParams );
			}

		},
		Error: function($e){
			app_alert($e);
		}
	});
}

// 페이지 이동
var readyChange=function() {
	app_changePage( pageParams.backURL , pageParams, true );
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

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

