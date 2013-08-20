/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var ReadJsonData;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

// 페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("과목입회");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		init_data();
		load_bank();
        //load_bank 가 완료 되기 전에 set_data가 실행되면
        //은행리스트가 뿌려 지지 않음
        //NDH 2013.02.21
		setTimeout("set_data()", 1000);
		
	} else {
        app_alert('데이터 가져오기를 실패 하였습니다. 다시 시도해 주세요.');
	}


};

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

var init_data = function() {
}

//@ 은행 리스트 산출
var load_bank = function() {

	loader.load( {
		Function: "ZTBTR_BANK_LIST",
		Parameter: {
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter.T_BANKS ){

				$.each(JsonData.Parameter.T_BANKS, function(index, entry) {
					$("#CLASS_JOIN_ACCOUT_BANK").append("<option value='"+entry["BANKL"]+"'>"+entry["BANKA"]+"</option>");
				}); 

			}
		},
		Error: function($e){
			app_alert($e);
		}
	});
}

//기본정보
var set_data = function() {

	$("#MEMBER_NAME").html(pageParams.children.MEMBER_NAME+" "+pageParams.children.MEMBER_CLASSNAME+"");
	$("#MEMBER_ADDRESS").html(pageParams.children.MEMBER_ADDRESS3+" "+pageParams.children.MEMBER_ADDRESS4+"");

	$("#MEMBER_P_NAME").html(pageParams.parent.MEMBER_P_NAME);
	$("#MEMBER_P_ADDRESS").html(pageParams.parent.MEMBER_P_ADDRESS3+" "+pageParams.parent.MEMBER_P_ADDRESS4+"");

	load_study();
}

//수업정보로드
var load_study = function() {

	$("#bank_info").hide();

	loader.load( {
		Function: "ZTBSD_GM_005_004",
		Parameter: {
			KUNWE:pageParams.children.MEMBER_KUNNR
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			tmp_TB_count=0;

			$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
				tmp_TB = $("#tmp_list").html();

				tmp_TB=tmp_TB.replace(/#ZMAT1_TX#/g, entry["ZMAT1_TX"]); 
				tmp_TB=tmp_TB.replace(/#GWLDT#/g, String(entry["GWLDT"]).replace(/\//g,".")); 
				tmp_TB=tmp_TB.replace(/#AUART_TX#/g, entry["AUART_TX"]); 
				tmp_TB=tmp_TB.replace(/#DAYWK_TX#/g, entry["DAYWK_TX"]); 
				tmp_TB=tmp_TB.replace(/#QTIME_M#/g, entry["QTIME_M"]); 

				write_TB(tmp_TB);
				tmp_TB_count=tmp_TB_count+1;
			}); 

			$("#STUDY_CNT").val(tmp_TB_count);

			if(tmp_TB_count==0) {
				$("#bank_info").show();
			}
		},
		Error: function($e){
            //alert($e);
			$("#bank_info").show();
			write_TB('');
		}
	});
}

//과목테이블생성
var write_TB = function(object_data) {

	if(object_data!="") {
		$("#STUDY_TB_DATA").append(object_data);
	} else {
		$("#STUDY_TB_DATA").html("");
	}
}

//계좌조회
var bankCheck = function() {

	loader.load( {
		Function: "ZTBTR_WB_WFXB",
		Parameter: { 'I_ZTBTRSCM01' : {
			BANKL : $("#CLASS_JOIN_ACCOUT_BANK").val(),
			BANKN : $("#CLASS_JOIN_ACCOUT").val(),
			STCD1 : $("#CLASS_JOIN_SSNUM").val(),
			KOINH : $("#CLASS_JOIN_NAME").val()
		}, I_VKORG:'1000' },
		Success: function($data){

			var data = JSON.parse( $data ).Parameter;
			if( !!data ){
				if( data.E_ZTBTRSCM02.RETCD=='1000' ){

					$("#CLASS_JOIN_ACCOUT").parent().find("input").attr("disabled",true);
					$("#CLASS_JOIN_ACCOUT").parent().find("button").hide();

					$("#CLASS_JOIN_ACCOUT").parent().find("button.reset_accout").removeClass("none");
					$("#CLASS_JOIN_ACCOUT").parent().find("button.reset_accout").show();

				}else{
					app_alert("사용할 수 없는 계좌 정보입니다.");
				}
			}

		},
		Error: function($e){
			app_alert("사용할 수 없는 계좌 정보입니다.");
		}
	});
}

// 다음버튼 클릭
var bankSumbit = function() {

	if(validity_data()!=true) {
		return;
	}

	saveDatabase();
}

// 입회
var saveDatabase = function() {

	if(Number($("#STUDY_CNT").val())>0) {

		var TMP_PARAMETER = {

				NAME1 : pageParams.children.MEMBER_NAME,
				STCD1 : pageParams.children.MEMBER_SSNUMBER,
				PSTLZ : pageParams.children.MEMBER_ADDRESS1+"-"+pageParams.children.MEMBER_ADDRESS2,
				KUNWE : pageParams.children.MEMBER_KUNNR,
				KUNNR : pageParams.parent.MEMBER_KUNNR,
				STCNT : "0",
				ZMAT1 : "",
				CNT : String($("#STUDY_CNT").val())
		}

		ReadJsonData=TMP_PARAMETER;
		app_setRequestParameter("readyChange", pageParams);
		return;
	}
	var TMP_PARAMETER = {

			NAME1 : pageParams.children.MEMBER_NAME,
			STCD1 : pageParams.children.MEMBER_SSNUMBER,
			PSTLZ : pageParams.children.MEMBER_ADDRESS1+"-"+pageParams.children.MEMBER_ADDRESS2,
			KUNWE : pageParams.children.MEMBER_KUNNR,
			KUNNR : pageParams.parent.MEMBER_KUNNR,
			STCNT : "0",
			BANKL : $("#CLASS_JOIN_ACCOUT_BANK").val(),
			BANKN : $("#CLASS_JOIN_ACCOUT").val(),
			KOINH : $("#CLASS_JOIN_NAME").val(),
			ATDAT : $("#CLASS_JOIN_ACCOUT_DATE").val(),
			ZMAT1 : "",
			CNT : String($("#STUDY_CNT").val())
	}

	ReadJsonData=TMP_PARAMETER;
	app_setRequestParameter("readyChange", pageParams);
}

// 페이지 이동
var readyChange=function() {

	app_changePage( 'B010300.html', ReadJsonData, true );
}

// 유효성체크
var validity_data = function() {

	if(Number($("#STUDY_CNT").val())>0) {
		return true;
	}

	if($("#CLASS_JOIN_ACCOUT_BANK").val()=="") {
		app_alert("은행이 선택되지 않았습니다.");
		return;
	}
	if($("#CLASS_JOIN_ACCOUT").val()=="") {
		app_alert("은행 계좌번호가 입력되지 않았습니다.");
		return;
	}
	if($("#CLASS_JOIN_ACCOUT").val().length==16) {
		app_alert("은행 계좌번호가 정상적이지 않았습니다.");
		return;
	}
	if($("#CLASS_JOIN_NAME").val()=="") {
		app_alert("예금주 정보가 입력되지 않았습니다.");
		return;
	}
	if($("#CLASS_JOIN_SSNUM").val()=="") {
		app_alert("은행 소유주 주민등록번호가 입력되지 않았습니다.");
		return;
	}
	if($("#CLASS_JOIN_SSNUM").attr("disabled")!="disabled") {
		load_ssn_member($("#CLASS_JOIN_SSNUM"));
		return;
	}
	if($("#CLASS_JOIN_ACCOUT").attr("disabled")!="disabled") {
		app_alert("은행 계좌번호 조회해주세요.");
		return;
	}
	if($("#CLASS_JOIN_ACCOUT_DATE").val()=="") {
		app_alert("자동이체일 정보가 선택되지 않았습니다.");
		return;
	}

	return true;
}

//@ 주민등록번호 조회
var load_ssn_member = function(this_object) {

	if($("#CLASS_JOIN_SSNUM").attr("disabled")=="disabled") return;

	if(!validity_ssn(this_object,true)) return;

}

//@ 계좌 재입력버튼처리
var reset_accout = function() {

	$("#CLASS_JOIN_ACCOUT").attr("disabled",false);
	$("#CLASS_JOIN_ACCOUT").parent().find("button").show();
	$("#CLASS_JOIN_ACCOUT").parent().find("button.reset_accout").addClass("none");

}
//@ 주민등록번호 재입력버튼처리
var reset_ssn = function() {

	$("#CLASS_JOIN_SSNUM").attr("disabled",false);
	$("#CLASS_JOIN_SSNUM").parent().find("button").show();
	$("#CLASS_JOIN_SSNUM").parent().find("button.reset_ssn").addClass("none");

}

//@ 주민등록체크(신규/기존 회원여부 포함)
var validity_ssn = function(this_object, return_is) {

	input_ssn_data = $(this_object).parent().find("input").val();
	if($.trim(input_ssn_data)=="") {

		app_alert("주민등록번호 입력 후\n\n 선택해주세요.");

		$(this_object).parent().find("input").focus();

		if(return_is==true) return false;
		return;
	}

	//# 주민등록번호 유효성 체크
	if(!checkPersonalNo(input_ssn_data)) {
		app_alert("주민등록번호 입력을\n\n 다시 확인해주세요.");

		$(this_object).parent().find("input").focus();
		if(return_is==true) return false;
		return;
	}

	$(this_object).parent().find("input").attr("disabled",true);
	$(this_object).parent().find("button").hide();

	$(this_object).parent().find("button.reset_ssn").removeClass("none");
	$(this_object).parent().find("button.reset_ssn").show();

	if(return_is==true) return true;
}

//@ 주민등록번호 체크
function checkPersonalNo(personal_no) 
{ 
	personal_no = personal_no.replace(/[^\d]+/g, ''); 
	pattern = /^[0-9]{6}[1-8][0-9]{6}$/; 

	if(!pattern.test(personal_no)) { 
		return false; 
	} 
	var birth = new Array(); 
	birth[0] = personal_no.substr(0, 2); 
	switch(personal_no.charAt(6)) { 
	case '1': 
	case '2': 
		birth[0] = ('19' + birth[0]) * 1; 
		birth[3] = false; 
		break; 
	case '3': 
	case '4': 
		birth[0] = ('20' + birth[0]) * 1; 
		birth[3] = false; 
		break; 
	case '5': 
	case '6': 
		birth[0] = ('19' + birth[0]) * 1; 
		birth[3] = true; 
		break; 
	case '7': 
	case '8': 
		birth[0] = ('20' + birth[0]) * 1; 
		birth[3] = true; 
		break; 
	} 

	birth[1] = personal_no.substr(2, 2) * 1; 
	birth[2] = personal_no.substr(4, 2) * 1; 

	if(birth[1] < 1 || birth[1] > 12) { 
		return false; 
	} 
	if(birth[2] < 1 || birth[2] > 31) { 
		return false; 
	} 
	var check = 0; 
	var mul = 2; 

	if(birth[3]) { 
		if(((personal_no.charAt(7) * 10 + personal_no.charAt(8)) % 2) != 0) { 
			return false; 
		} 
	} 
	for(i = 0; i < 12; i ++) { 
		check += personal_no.charAt(i) * mul; 
		mul ++; 
		if(mul > 9) { 
			mul = 2; 
		} 
	} 

	check = 11 - (check % 11); 

	if(check > 9) { 
		check %= 10; 
	} 
	if(birth[3]) { 
		check += 2; 
		if(check > 9) { 
			check %= 10; 
		} 
	} 
	if(check != personal_no.charAt(12)) { 
		//alert("주민번호 뒷자리 "+check);
        //app_alert("주민등록번호를 확인해 주세요.");
		return false; 
	} 
	return birth; 
} 

// 숫자 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

// 카드번호  - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}

// 문자열처음에서 갯수만큼 문자열자르기
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}

// 문자열 끝에서 갯수만큼 문자열 자르기
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

// 디지털숫자형으로 반환
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

