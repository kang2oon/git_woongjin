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

	app_changeTitle("배분현황 및 자동이체");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		init_data();
		load_bank(set_data);
	} else {

	}


};


//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//넘겨받은 데이터 셋팅
var init_data = function() {

	$("#NAME1").html(pageParams.NAME1);
	$("#T_IMPORTA").html("");
	if(typeof(pageParams.ZTBTR_PDA02_002)!="undefined") {
		$.each(pageParams.ZTBTR_PDA02_002.T_IMPORTA, function(index, entry) {

			tmp_MAKTX = entry["MAKTX"];
			if($.trim(tmp_MAKTX)=="") tmp_MAKTX="-";
			$("#T_IMPORTA").append("<li>\n"+
					"	<span class='term'>"+tmp_MAKTX+"</span>\n"+
					"	<span class='desc'>"+numberFormat(entry["DMBTR"])+"원</span>\n"+
			"</li>\n");

		}); 
	}

}

// 화면구성
var set_data = function() {

	if(typeof(pageParams.PAY_TRANSFER_BANK)!="undefined") {


		//# 신규
		if(pageParams.REQGB!="2") {
			$("#PAY_TRANSFER_BANK").val(pageParams.PAY_TRANSFER_BANK).attr("selected",true);
			$("#PAY_TRANSFER_BANK_NUMBER").val(pageParams.PAY_TRANSFER_BANK_NUMBER);
			$("#PAY_TRANSFER_PERSON").val(pageParams.PAY_TRANSFER_PERSON);
			$("#PAY_TRANSFER_PERSON_SSNUM").val(pageParams.PAY_TRANSFER_PERSON_SSNUM);
			$("#PAY_TRANSFER_DATE").val(pageParams.PAY_TRANSFER_DATE);

			if($.trim($("#PAY_TRANSFER_PERSON_SSNUM").val())!="") {
				load_ssn_member($("#PAY_TRANSFER_PERSON_SSNUM"));
			}
		}

		//# 변경
		if(pageParams.REQGB=="2") {


			$("#PAY_TRANSFER_BANK").parent().parent().hide();
			$("#PAY_TRANSFER_BANK_NUMBER").parent().parent().hide();
			$("#PAY_TRANSFER_PERSON").parent().parent().hide();
			$("#PAY_TRANSFER_PERSON_SSNUM").parent().parent().hide();
			$("#PAY_TRANSFER_DATE").parent().parent().hide();

			$("#PAY_TRANSFER_BANK_TX").parent().parent().removeClass('none');
			$("#PAY_TRANSFER_BANK_NUMBER_TX").parent().parent().removeClass('none');
			$("#PAY_TRANSFER_PERSON_TX").parent().parent().removeClass('none');
			$("#PAY_TRANSFER_PERSON_SSNUM_TX").parent().parent().removeClass('none');
			$("#PAY_TRANSFER_DATE_TX").parent().parent().removeClass('none');

			$("#PAY_TRANSFER_BANK").val(pageParams.PAY_TRANSFER_BANK).attr("selected",true);
			$("#PAY_TRANSFER_BANK_NUMBER").val(pageParams.PAY_TRANSFER_BANK_NUMBER);
			$("#PAY_TRANSFER_PERSON").val(pageParams.PAY_TRANSFER_PERSON);
			$("#PAY_TRANSFER_PERSON_SSNUM").val(pageParams.PAY_TRANSFER_PERSON_SSNUM);
			$("#PAY_TRANSFER_DATE").val(pageParams.PAY_TRANSFER_DATE);

			$("#PAY_TRANSFER_BANK_TX").val(pageParams.PAY_TRANSFER_BANKNAME);
			$("#PAY_TRANSFER_BANK_NUMBER_TX").val(pageParams.PAY_TRANSFER_BANK_NUMBER);
			$("#PAY_TRANSFER_PERSON_TX").val(pageParams.PAY_TRANSFER_PERSON);
			$("#PAY_TRANSFER_PERSON_SSNUM_TX").val(pageParams.PAY_TRANSFER_PERSON_SSNUM);
			$("#PAY_TRANSFER_DATE_TX").val(pageParams.PAY_TRANSFER_DATE);

		}

		$("#PAY_TRANSFER_NAME").val(pageParams.PAY_TRANSFER_NAME);
		$("#SIGNATURE").val(pageParams.SIGNATURE);

		//@ 사인
		if($.trim(pageParams.SIGNATURE)!="") {
			var src = 'data:image/jpg;base64,'+ pageParams.SIGNATURE;
			if($.trim(pageParams.SIGNATURE2)!="") {
				src = src + pageParams.SIGNATURE2;
				$("#SIGNATURE").val($("#SIGNATURE").val()+pageParams.SIGNATURE2);
			}
			addImageSrc( src );
		}
	}

}
//@ 은행 리스트 산출
var load_bank = function(nextFuction) {

	loader.load( {
		Function: "ZTBTR_BANK_LIST",
		Parameter: {
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter.T_BANKS ){

				$.each(JsonData.Parameter.T_BANKS, function(index, entry) {
					$("#PAY_TRANSFER_BANK").append("<option value='"+entry["BANKL"]+"'>"+entry["BANKA"]+"</option>");
				}); 

			}

			if(typeof(nextFuction) != "undefined" ) nextFuction();
		},
		Error: function($e){
			if(typeof(nextFuction) != "undefined" ) nextFuction();
			app_alert($e);
		}
	});
}

//@ 자동이체 실행
var bankSumbit = function() {

	if(validity_data()!=true) {
		return;
	}

	saveJson();

	saveDatabase();
}

// 은행리스트 조회 요청 / 파라미터 구성
var saveDatabase = function() {

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

	var S_IMPORTA_parameter_REQGB1 = {
			REQGB:pageParams.REQGB,
			KUNNR:pageParams.KUNNR,
			BANKL:pageParams.PAY_TRANSFER_BANK,
			BANKA:pageParams.PAY_TRANSFER_BANK_NAME,
			BANKN:pageParams.PAY_TRANSFER_BANK_NUMBER,
			KOINH:pageParams.PAY_TRANSFER_PERSON,
			STCD1:pageParams.PAY_TRANSFER_PERSON_SSNUM,
			ATSTA:"",
			ATSTA_TX:"",
			ATDAT:pageParams.PAY_TRANSFER_DATE,
			ERRCD:"",
			ERRCD_TX:"",
			ATNGB:"",
			ATMON:tm_year+''+tm_month,
			SIGN_NAME:pageParams.PAY_TRANSFER_NAME,
			SIGN_IMG:pageParams.SIGNATURE,
			SIGN_IMG2:pageParams.SIGNATURE2
	};

	var S_IMPORTA_parameter_REQGB2 = {
			REQGB:pageParams.REQGB,
			KUNNR:pageParams.KUNNR,
			BANKL:pageParams.PAY_TRANSFER_BANK,
			BANKA:pageParams.PAY_TRANSFER_BANK_NAME,
			BANKN:pageParams.PAY_TRANSFER_BANK_NUMBER,
			KOINH:pageParams.PAY_TRANSFER_PERSON,
			STCD1:pageParams.PAY_TRANSFER_PERSON_SSNUM,
			ATSTA:"",
			ATSTA_TX:"",
			ATDAT:pageParams.PAY_TRANSFER_DATE,
			ERRCD:"",
			ERRCD_TX:"",
			ATNGB:"",
			ATMON:tm_year+''+tm_month,
			SIGN_NAME:pageParams.PAY_TRANSFER_NAME,
			SIGN_IMG:pageParams.SIGNATURE,
			SIGN_IMG2:pageParams.SIGNATURE2
	};
	var S_IMPORTA_parameter_REQGB3 = {
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
	switch(pageParams.REQGB) {
	case "1":
		TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter_REQGB1;
		break;
	case "2":
//		TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter_REQGB2;
//		break;
	case "3": // 2와 동일
		TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter_REQGB2;
		break;
	}


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

			app_alert("자동이체 신청이 완료되었습니다.");

			try { delete pageParams.ZTBTR_PDA02_002; }
			catch (e) { }
			try { delete pageParams.PAY_TRANSFER_BANK; }
			catch (e) { }

			app_changePage( 'B020401.html', pageParams );

		},
		Error: function($e){
			app_alert($e);
		}
	});
}

//@ 항목 데이터 저장
var saveJson = function() {

	pageParams.PAY_TRANSFER_BANK = $("#PAY_TRANSFER_BANK").val();
	pageParams.PAY_TRANSFER_BANK_NAME = $("#PAY_TRANSFER_BANK option:selected").text();
	pageParams.PAY_TRANSFER_BANK_NUMBER = $("#PAY_TRANSFER_BANK_NUMBER").val();
	pageParams.PAY_TRANSFER_PERSON = $("#PAY_TRANSFER_PERSON").val();
	pageParams.PAY_TRANSFER_PERSON_SSNUM = $("#PAY_TRANSFER_PERSON_SSNUM").val();
	pageParams.PAY_TRANSFER_DATE = $("#PAY_TRANSFER_DATE").val();
	pageParams.PAY_TRANSFER_NAME = $("#PAY_TRANSFER_NAME").val();
	pageParams.SIGNATURE = $("#SIGNATURE").val();

	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

var readyChange=function() {
}


//@ 항목 체크
var validity_data = function() {

	if(pageParams.REQGB!="2") {

		if($("#PAY_TRANSFER_BANK").val()=="") {
			app_alert("은행이 선택되지 않았습니다.");
			return;
		}
		if($("#PAY_TRANSFER_BANK_NUMBER").val()=="") {
			app_alert("은행 계좌번호가 입력되지 않았습니다.");
			return;
		}
		if($("#PAY_TRANSFER_PERSON").val()=="") {
			app_alert("예금주 정보가 입력되지 않았습니다.");
			return;
		}
		if($("#PAY_TRANSFER_PERSON_SSNUM").val()=="") {
			app_alert("은행 소유주 주민등록번호가 입력되지 않았습니다.");
			return;
		}
		if($("#PAY_TRANSFER_PERSON_SSNUM").attr("disabled")!="disabled") {
			load_ssn_member($("#PAY_TRANSFER_PERSON_SSNUM"));
			return;
		}
		if($("#PAY_TRANSFER_DATE").val()=="") {
			app_alert("자동이체일 정보가 선택되지 않았습니다.");
			return;
		}

	}


	if($("#PAY_TRANSFER_NAME").val()=="") {
		app_alert("신청인정보가 입력되지 않았습니다.");
		return;
	}
	if($("#SIGNATURE").val()=="") {
		sign_drew();
		return;
	}

	return true;
}

//@ 주민등록번호 조회
var load_ssn_member = function(this_object) {

	if(!validity_ssn(this_object,true)) return;

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

//@ 주민등록번호 재입력버튼처리
var reset_ssn = function() {

	$("#PAY_TRANSFER_PERSON_SSNUM").attr("disabled",false);
	$("#PAY_TRANSFER_PERSON_SSNUM").parent().find("button").show();
	$("#PAY_TRANSFER_PERSON_SSNUM").parent().find("button.reset_ssn").addClass("none");

}

// 싸인이미지 호출
var sign_drew = function() {
	app_setSign( 'setSignImg' );
}

/**
 * 싸인 데이터 적용
 *  */
var setSignImg = function( data ){
	// 테스트용 : 전달받은 데이터 div에 표시
	$('#SIGNATURE').val(data);
	//
	var src = 'data:image/jpg;base64,'+ data;

	// ** 이미지 태그에 적용
	addImageSrc( src );
};

/**
 * 이미지 태그 소스에 넣기
 *  */
var addImageSrc = function( src ){
	// 적용
	$('#imgEl').attr('src', src);
};

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
        app_alert("주민등록번호를 확인해 주세요.");        
		return false; 
	} 
	return birth; 
} 

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

// 4자리마다 - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}

// 문자열 시작부터 갯수만큼 문자열반환
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}

// 문자열 끝부터 갯수만큼 반환
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

