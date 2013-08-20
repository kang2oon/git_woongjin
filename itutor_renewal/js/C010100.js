/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

//테스트용 데이터
var test_data = function() {

//	$("#MEMBER_SSNUMBER").val("1211224151510");
//	$("#MEMBER_SSNUMBER").val("1211214151516");
//	$("#MEMBER_SSNUMBER").val("1211224151616");
	$("#MEMBER_SSNUMBER").val("1211224151712");
	$("#MEMBER_SSNUMBER").val("1211224151819");
	$("#MEMBER_SSNUMBER").val("1211224151413");
	$("#MEMBER_SSNUMBER").val("1211224151211");
	$("#MEMBER_SSNUMBER").val("1212254151217");
	load_ssn_member($("#MEMBER_SSNUMBER"));
	$("#MEMBER_NAME").val("홍길녀");

	check_radio_load(true,"MEMBER_BIRTHDAY_TYPE");
	$("#MEMBER_BIRTHDAY_TYPE1").attr("checked", true);

//	$("#MEMBER_CLASS").val("21").attr("selected", "selected");
	$("#MEMBER_TEL1").val("032").attr("selected", "selected");
	$("#MEMBER_TEL2").val("2242672");
	$("#MEMBER_TEL2").blur();
	$("#MEMBER_CEL1").val("010").attr("selected", "selected");
	$("#MEMBER_CEL2").val("22152672");
	$("#MEMBER_CEL2").blur();

	$("#MEMBER_EMAIL1").val("nexwap");
	$("#MEMBER_EMAIL2").val("self").attr("selected", "selected");
	fn_mail();

	$("#etctext").val("epu.co.kr");

	$("#MEMBER_ADDRESS1").val("404");
	$("#MEMBER_ADDRESS2").val("740");
	$("#MEMBER_ADDRESS3").val("인천광역시 남구 용현5동");
	$("#MEMBER_ADDRESS4").val("한국아파트 102동 109호");


	check_radio_load(true,"MEMBER_CASHRECEIPT");
	$("#MEMBER_CASHRECEIPT2").attr("checked", true);
	fn_cashreceipt(2);
	$("#CASHRECEIPT_MEMBER_CEL1").val("010").attr("selected", "selected");
	$("#CASHRECEIPT_MEMBER_CEL2").val("22152672");
	$("#CASHRECEIPT_MEMBER_CEL2").blur();

	set_disabled(true);
	check_radio_load(false);

}

//테스트용 데이터
var test_data2 = function() {

	$("#MEMBER_SSNUMBER").val("1211224151211");
	load_ssn_member($("#MEMBER_SSNUMBER"));

}
var pageParams = {"data":[]}

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드완료
$(document).ready(function(){

	app_endLoading();

	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("회원입회");
	set_disabled(false);


	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );
        init();

		load_class(true);
	} else {
		load_class();
	}



};

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//
var init = function(){

}


//@ 학년 기본데이터 호출
var load_class = function(nextLoadis) {

	loader.load( {
		Function: "ZTBSD_GM_214_KATR1_TEXT",
		Parameter: {
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
					$("#MEMBER_CLASS").append("<option value='"+entry["KATR1"]+"'>"+entry["VTEXT"]+"</option>");
				}); 

				try
				{
					$("#MEMBER_CLASS").val(pageParams.children.MEMBER_CLASS).attr("selected", true);
				}
				catch (e)
				{
				}

			}
			if(nextLoadis==true) {
				load_data(true);
			}
		},
		Error: function($e){
		}
	});
}

// 데이터 로드 완료 / 화면구성
var load_data = function(ssn_check_is) {

	try
	{
		$("#MEMBER_SSNUMBER").val(pageParams.children.MEMBER_SSNUMBER);
	}
	catch (e)
	{
		return;
	}


	if(ssn_check_is==true) {
		load_ssn_member($("#MEMBER_SSNUMBER"));
	}
	try
	{
		if(pageParams.zipCode.data.PSTLZ!="") {
			return;
		} else {
		}
	} 
	catch (e)
	{
		$("#MEMBER_ADDRESS1").val(pageParams.children.MEMBER_ADDRESS1);
		$("#MEMBER_ADDRESS2").val(pageParams.children.MEMBER_ADDRESS2);
		$("#MEMBER_ADDRESS3").val(pageParams.children.MEMBER_ADDRESS3);
		$("#MEMBER_ADDRESS4").val(pageParams.children.MEMBER_ADDRESS4);
	}

	$("#MEMBER_NAME").val(pageParams.children.MEMBER_NAME);
	$("#MEMBER_BIRTHDAY").val(pageParams.children.MEMBER_BIRTHDAY);


	if(pageParams.children.MEMBER_BIRTHDAY_TYPE=="X") {
		$("#MEMBER_BIRTHDAY_TYPE1").prop('checked', false);  //양력
		$("#MEMBER_BIRTHDAY_TYPE2").prop('checked', true);   //음력
	} else if($.trim(pageParams.children.MEMBER_BIRTHDAY_TYPE)=="") {
		$("#MEMBER_BIRTHDAY_TYPE1").prop('checked', true);
        $("#MEMBER_BIRTHDAY_TYPE2").prop('checked', false);
	} else {
		$("#MEMBER_BIRTHDAY_TYPE1").prop('checked', true);
        $("#MEMBER_BIRTHDAY_TYPE2").prop('checked', false);
	}

    
	if(pageParams.children.MEMBER_SEX=="1") {
		$("#MEMBER_SEX1").attr("checked", true);
	} else {
		$("#MEMBER_SEX2").attr("checked", true);
	}

	$("#MEMBER_CLASS").val(pageParams.children.MEMBER_CLASS).attr("selected", "selected");
	$("#MEMBER_TEL1").val(pageParams.children.MEMBER_TEL1).attr("selected", "selected");
	$("#MEMBER_TEL2").val(pageParams.children.MEMBER_TEL2);
	$("#MEMBER_TEL2").blur();
	$("#MEMBER_CEL1").val(pageParams.children.MEMBER_CEL1).attr("selected", "selected");
	$("#MEMBER_CEL2").val(pageParams.children.MEMBER_CEL2);
	$("#MEMBER_CEL2").blur();

	$("#MEMBER_EMAIL1").val(pageParams.children.MEMBER_EMAIL1);
	if($("#MEMBER_EMAIL2").html().indexOf(pageParams.children.MEMBER_EMAIL2)>=0) {
		$("#MEMBER_EMAIL2").val(pageParams.children.MEMBER_EMAIL2).attr("selected", "selected");
	} else {
		$("#MEMBER_EMAIL2").val("self").attr("selected", "selected");
		fn_mail();
		$("#etctext").val(pageParams.children.MEMBER_EMAIL2);
	}


	check_radio_load(true,"MEMBER_CASHRECEIPT");
	if(pageParams.children.MEMBER_CASHRECEIPT=="1") {
		$("#MEMBER_CASHRECEIPT1").attr("checked", true);
		$("#MEMBER_CERTIFY").val(pageParams.children.MEMBER_CERTIFY);
	} else if(pageParams.children.MEMBER_CASHRECEIPT=="2") {
		$("#MEMBER_CASHRECEIPT2").attr("checked", true);
		$("#CASHRECEIPT_MEMBER_CEL1").val(pageParams.children.CASHRECEIPT_MEMBER_CEL1).attr("selected", "selected");
		$("#CASHRECEIPT_MEMBER_CEL2").val(pageParams.children.CASHRECEIPT_MEMBER_CEL2);
		$("#CASHRECEIPT_MEMBER_CEL2").blur();
	} else if(pageParams.children.MEMBER_CASHRECEIPT=="3") {
		$("#MEMBER_CASHRECEIPT3").attr("checked", true);
	}
	fn_cashreceipt(pageParams.children.MEMBER_CASHRECEIPT);

	check_radio_load(false);
	set_disabled(true);

}

// 활성 / 비활성 체크
var set_disabled = function(open_is) {

	if(open_is==true) {
		$("#MEMBER_NAME").attr("disabled",false);
		$("#MEMBER_CLASS").attr("disabled",false);
		$("#MEMBER_TEL1").attr("disabled",false);
		$("#MEMBER_TEL2").attr("disabled",false);
		$("#MEMBER_CEL1").attr("disabled",false);
		$("#MEMBER_CEL2").attr("disabled",false);
		$("#MEMBER_EMAIL1").attr("disabled",false);
		$("#MEMBER_EMAIL2").attr("disabled",false);
		$("#etctext").attr("disabled",false);
		$("#MEMBER_ADDRESS4").attr("disabled",false);
		$("#MEMBER_CASHRECEIPT1").attr("disabled",false);
		$("#MEMBER_CASHRECEIPT2").attr("disabled",false);
		$("#MEMBER_CASHRECEIPT3").attr("disabled",false);

		$("#CASHRECEIPT_MEMBER_CEL1").attr("disabled",false);
		$("#CASHRECEIPT_MEMBER_CEL2").attr("disabled",false);

	} else {

		$("#IDNUMBER_LI").addClass("none");
		$("#MEMBER_NAME").attr("disabled",true);
		$("#MEMBER_CLASS").attr("disabled",true);
		$("#MEMBER_TEL1").attr("disabled",true);
		$("#MEMBER_TEL2").attr("disabled",true);
		$("#MEMBER_CEL1").attr("disabled",true);
		$("#MEMBER_CEL2").attr("disabled",true);
		$("#MEMBER_EMAIL1").attr("disabled",true);
		$("#MEMBER_EMAIL2").attr("disabled",true);
		$("#etctext").attr("disabled",true);
		$("#MEMBER_ADDRESS4").attr("disabled",true);
		$("#MEMBER_CASHRECEIPT1").attr("disabled",true);
		$("#MEMBER_CASHRECEIPT2").attr("disabled",true);
		$("#MEMBER_CASHRECEIPT3").attr("disabled",true);

		$("#CASHRECEIPT_MEMBER_CEL1").attr("disabled",true);
		$("#CASHRECEIPT_MEMBER_CEL2").attr("disabled",true);
	}
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
var reset_ssn = function(select_input) {

	if(select_input=="MEMBER") {

		$("#MEMBER_SSNUMBER").attr("disabled",false);
		$("#MEMBER_SSNUMBER").parent().find("button").show();
		$("#MEMBER_SSNUMBER").parent().find("button.reset_ssn").addClass("none");

		check_radio_load(true,"MEMBER_SEX");
	} else if(select_input=="CERTIFY") {

		$("#MEMBER_CERTIFY").attr("disabled",false);
		$("#MEMBER_CERTIFY").parent().find("button").show();
		$("#MEMBER_CERTIFY").parent().find("button.reset_ssn").addClass("none");
	}
}

var validity_ssn_disabled = function() {
	if($("#MEMBER_SSNUMBER").attr("disabled")!="disabled") {
		app_alert("주민등록번호 입력 후\n\n 선택해주세요.");
		return false;
	} else {
		return true;
	}
}

//@ 저장항목 체크
var validity_all = function() {

	//# 주민등록번호 확인.
	validity_ssn($("#MEMBER_SSNUMBER"));

	if(validity_ssn_disabled()!=true) {
		return;
	}

	if($.trim($("#MEMBER_NAME").val())=="") {
		app_alert("이름이 입력되지 않았습니다.");
		$("#MEMBER_NAME").focus();
		return;
	}
	if($.trim($("#MEMBER_TEL1").val())=="" || $.trim($("#MEMBER_TEL2").val())=="") {
		app_alert("전화번호가 입력되지 않았습니다.");
		$("#MEMBER_TEL1").focus();
		return;
	}

	if($.trim($("#MEMBER_CEL1").val())=="" || $.trim($("#MEMBER_CEL2").val())=="") {
		app_alert("휴대전화번호가 입력되지 않았습니다.");
		$("#MEMBER_CEL1").focus();
		return;
	}

    //이메일 필수 조건 제거 2013.04.26 NDH
/*
 	if($.trim($("#MEMBER_EMAIL1").val())=="") {
 		app_alert("이메일주소가 입력되지 않았습니다.");
 		$("#MEMBER_EMAIL1").focus();
 		return;
 	}
 	if($.trim($("#MEMBER_EMAIL2").val())=="self" && $.trim($("#etctext").val())=="") {
 		app_alert("이메일주소가 입력되지 않았습니다.");
 		$("#etctext").focus();
 		return;
 	}
 */
	if($.trim($("#MEMBER_ADDRESS1").val())=="" ) {
		app_alert("우편번호가 입력되지 않았습니다.");
		$("#MEMBER_ADDRESS1").focus();
		return;
	}
	if($.trim($("#MEMBER_ADDRESS4").val())=="" ) {
		app_alert("주소가 입력되지 않았습니다.");
		$("#MEMBER_ADDRESS4").focus();
		return;
	}


	if($("#MEMBER_CASHRECEIPT1").attr("checked")=="checked") {

		if($("#MEMBER_CERTIFY").attr("disabled")!="disabled") {
			app_alert("현금영수증용\n\n주민등록번호 입력 후\n\n 체크해주세요.");
			return;
		}
	}
	if($("#MEMBER_CASHRECEIPT2").attr("checked")=="checked") {

		if($.trim($("#CASHRECEIPT_MEMBER_CEL1").val())=="" || $.trim($("#CASHRECEIPT_MEMBER_CEL2").val())=="") {
			app_alert("휴대전화번호가 입력되지 않았습니다.");
			$("#MEMBER_CEL1").focus();
			return;
		}
	}
	if($("#MEMBER_CASHRECEIPT3").attr("checked")=="checked") {

	};

	//# 저장 호출
	saveJson();

	//# DB 저장 호출
	saveDatabase();

}

// 저장
var saveDatabase = function() {

	switch(pageParams.children.MEMBER_CASHRECEIPT) {
	case "1":
		TMP_KATR5=String("01");
		TMP_STCD4=String(pageParams.children.MEMBER_CERTIFY);
		break;
	case "2":
		TMP_KATR5=String("02");
		TMP_STCD4=String(pageParams.children.CASHRECEIPT_MEMBER_CEL1+"-"+pageParams.children.CASHRECEIPT_MEMBER_CEL2).replace(/-/g,"");
		break;
	default:
		TMP_KATR5=" ";
	TMP_STCD4=" ";
	}

	TMP_KUNNR="";
	if($.trim(pageParams.children.MEMBER_KUNNR)!="") {
		TMP_KUNNR=pageParams.children.MEMBER_KUNNR;
		loader_function = "ZTBSD_RFC_CHANGE_CUSTOMER";
	} else {
		TMP_KUNNR="";
		loader_function = "ZTBSD_RFC_CREATE_CUSTOMER";
	}
    

     var tmpEMAIL =  "";
     if(pageParams.children.MEMBER_EMAIL1=="" || pageParams.children.MEMBER_EMAIL2=="" ){
        tmpEMAIL = ""
     }else{
         tmpEMAIL =  pageParams.children.MEMBER_EMAIL1 + "@" + pageParams.children.MEMBER_EMAIL2;      
     }
 
    //양,음력 체크. 저장할 때는 (X,공백)이 아니라, (양:S, 음:M) 
	var tmpGBCHK="";
	if($("#MEMBER_BIRTHDAY_TYPE1").attr("checked")=="checked") {
		tmpGBCHK="S";
	} else if($("#MEMBER_BIRTHDAY_TYPE2").attr("checked")=="checked") {
		tmpGBCHK="M";
	} else {
		tmpGBCHK=" ";
	}

	var TMP_S_IMPORTA = {
			STCD1:pageParams.children.MEMBER_SSNUMBER,
			KUNNR:TMP_KUNNR,
			NAME1:pageParams.children.MEMBER_NAME,
			NAME2:" ",
			TELF1:String(pageParams.children.MEMBER_TEL1+"-"+pageParams.children.MEMBER_TEL2).replace(/-/g,""),
			TELF2:String(pageParams.children.MEMBER_CEL1+"-"+pageParams.children.MEMBER_CEL2).replace(/-/g,""),
			PSTLZ:pageParams.children.MEMBER_ADDRESS1+"-"+pageParams.children.MEMBER_ADDRESS2,
			ORT01:pageParams.children.MEMBER_ADDRESS3,
			STRAS:pageParams.children.MEMBER_ADDRESS4,
			ADRNR:" ",
            SMTP_ADDR:tmpEMAIL,
            //SMTP_ADDR:tmpEMAIL1+"@"+tmpEMAIL2,
			//SMTP_ADDR:pageParams.children.MEMBER_EMAIL1+"@"+pageParams.children.MEMBER_EMAIL2,
			KUNPA:" ",
			GBDAT:String(pageParams.children.MEMBER_BIRTHDAY).replace(/-/g,""),
			GBCHK:tmpGBCHK,
			PARGE:pageParams.children.MEMBER_SEX,
			KATR1:pageParams.children.MEMBER_CLASS,
			KATR5:TMP_KATR5,
			STCD4:TMP_STCD4
	}

	loader.load( {
		Function: loader_function,
		Parameter: {
			VKORG:"1000",
			CHILD:"X",
			S_IMPORTA:TMP_S_IMPORTA
		},
		Success: function($data){

			JsonData = JSON.parse( $data );
			try
			{
				if(pageParams.children.MEMBER_KUNNR=="" && JsonData.Parameter.KUNNR!="") {
					pageParams.children.MEMBER_KUNNR = JsonData.Parameter.KUNNR;
				}
			}
			catch (e)
			{
			}
			app_alert("회원의 정보가 저장되었습니다.","안내","finish_save");
            //app_changePage( 'C010101.html', pageParams, true );

		},
		Error: function($e){
			app_alert("error:"+$e);
		}
	});
}

//회원 정보 저장후 페이지 이동.2013.05.03 
var finish_save = function() {
    app_changePage( 'C010101.html', pageParams, true );
}


//@ 항목 데이터 저장
var saveJson = function() {

	try
	{
		pageParams.children.MEMBER_KUNNR = "";
	}
	catch (e)
	{
		pageParams.children={};
	}
	pageParams.children.MEMBER_KUNNR = $("#MEMBER_IDNUMBER").val();
	pageParams.children.MEMBER_SSNUMBER = $("#MEMBER_SSNUMBER").val();
	pageParams.children.MEMBER_NAME = $("#MEMBER_NAME").val();
	pageParams.children.MEMBER_BIRTHDAY = $("#MEMBER_BIRTHDAY").val();
    
    //양,음력 체크 X면 음력.
	if($("#MEMBER_BIRTHDAY_TYPE2").attr("checked")=="checked") {
		pageParams.children.MEMBER_BIRTHDAY_TYPE = "X";
	} else {
		pageParams.children.MEMBER_BIRTHDAY_TYPE = " ";
	}
    
/*
 	if($("#MEMBER_BIRTHDAY_TYPE1").attr("checked")=="checked") {
 		pageParams.children.MEMBER_BIRTHDAY_TYPE = "1";
 	} else {
 		pageParams.children.MEMBER_BIRTHDAY_TYPE = "2";
 	}
 */
	if($("#MEMBER_SEX1").attr("checked")=="checked") {
		pageParams.children.MEMBER_SEX = "1";
	} else {
		pageParams.children.MEMBER_SEX = "2";
	}
	pageParams.children.MEMBER_CLASS = $("#MEMBER_CLASS").val();
	pageParams.children.MEMBER_CLASSNAME = $("#MEMBER_CLASS option:selected").text();
	pageParams.children.MEMBER_TEL1 = $("#MEMBER_TEL1").val();
	pageParams.children.MEMBER_TEL2 = $("#MEMBER_TEL2").val();
	pageParams.children.MEMBER_CEL1 = $("#MEMBER_CEL1").val();
	pageParams.children.MEMBER_CEL2 = $("#MEMBER_CEL2").val();
	pageParams.children.MEMBER_EMAIL1 = $("#MEMBER_EMAIL1").val();
	if($("#MEMBER_EMAIL2").val()=="self") {
		pageParams.children.MEMBER_EMAIL2 = $("#etctext").val();
	} else {
		pageParams.children.MEMBER_EMAIL2 = $("#MEMBER_EMAIL2").val();
	}
	pageParams.children.MEMBER_ADDRESS1 = $("#MEMBER_ADDRESS1").val();
	pageParams.children.MEMBER_ADDRESS2 = $("#MEMBER_ADDRESS2").val();
	pageParams.children.MEMBER_ADDRESS3 = $("#MEMBER_ADDRESS3").val();
	pageParams.children.MEMBER_ADDRESS4 = $("#MEMBER_ADDRESS4").val();

	if($("#MEMBER_CASHRECEIPT1").attr("checked")=="checked") {
		pageParams.children.MEMBER_CASHRECEIPT = "1";
	}
	if($("#MEMBER_CASHRECEIPT2").attr("checked")=="checked") {
		pageParams.children.MEMBER_CASHRECEIPT = "2";
	}
	if($("#MEMBER_CASHRECEIPT3").attr("checked")=="checked") {
		pageParams.children.MEMBER_CASHRECEIPT = "3";
	}
	pageParams.children.CASHRECEIPT_MEMBER_CEL1 = $("#CASHRECEIPT_MEMBER_CEL1").val();
	pageParams.children.CASHRECEIPT_MEMBER_CEL2 = $("#CASHRECEIPT_MEMBER_CEL2").val();

	pageParams.children.MEMBER_CERTIFY = $("#MEMBER_CERTIFY").val();

	pageParams_json = JSON.stringify( pageParams );
}


//@ 주민등록번호 조회
var load_ssn_member = function(this_object) {

	if(!validity_ssn(this_object,true)) return;
	
	input_ssn_data = $(this_object).parent().find("input").val();



	try
	{
		if(pageParams.zipCode.data.PSTLZ!="") {

			var zipCodes = pageParams.zipCode.data.PSTLZ.split('-');
			pageParams.children.MEMBER_ADDRESS1 = zipCodes[0];
			pageParams.children.MEMBER_ADDRESS2 = zipCodes[1];
			pageParams.children.MEMBER_ADDRESS3 = pageParams.zipCode.data.ORT01;
			pageParams.children.MEMBER_ADDRESS4 = pageParams.zipCode.data.STRAS;

			$("#MEMBER_ADDRESS1").val(pageParams.children.MEMBER_ADDRESS1);
			$("#MEMBER_ADDRESS2").val(pageParams.children.MEMBER_ADDRESS2);
			$("#MEMBER_ADDRESS3").val(pageParams.children.MEMBER_ADDRESS3);
			$("#MEMBER_ADDRESS4").val(pageParams.children.MEMBER_ADDRESS4);

			pageParams.zipCode.data.PSTLZ="";
			pageParams.zipCode.data.ORT01="";

			$("#IDNUMBER_LI").removeClass("none");
			$("#MEMBER_IDNUMBER").val(pageParams.children.MEMBER_KUNNR);

			load_data(false);

			return;
		}
	}
	catch (e)
	{

	}

	loader.load( {
		Function: "ZTBSD_GM_001_005",
		Parameter: {
			STCD1: String(input_ssn_data)
		},
		Success: function($data){

			app_alert("이미 씽크빅 회원입니다.");
			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				saveJson();
				pageParams.children.MEMBER_KUNNR = JsonData.Parameter.S_EXPORTA.KUNNR;

				$("#IDNUMBER_LI").removeClass("none");
				$("#MEMBER_IDNUMBER").val(pageParams.children.MEMBER_KUNNR);



				pageParams.children.MEMBER_SSNUMBER = JsonData.Parameter.S_EXPORTA.STCD1;
				pageParams.children.MEMBER_NAME = JsonData.Parameter.S_EXPORTA.NAME1;
				pageParams.children.MEMBER_BIRTHDAY = JsonData.Parameter.S_EXPORTA.GBDAT;
				pageParams.children.MEMBER_BIRTHDAY_TYPE = JsonData.Parameter.S_EXPORTA.GBCHK;
				pageParams.children.MEMBER_SEX = JsonData.Parameter.S_EXPORTA.PARGE;
				pageParams.children.MEMBER_CLASS = JsonData.Parameter.S_EXPORTA.KATR1;

				try
				{
					if(JsonData.Parameter.S_EXPORTA.TELF1!="") {
						$("#MEMBER_TEL2").val(JsonData.Parameter.S_EXPORTA.TELF1);
						$("#MEMBER_TEL2").val(OnCheckPhone_ALL($("#MEMBER_TEL2").val()));

						pageParams.children.MEMBER_TEL1=checkDigit($("#MEMBER_TEL2").val().split("-")[0]);
						pageParams.children.MEMBER_TEL2=checkDigit($("#MEMBER_TEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_TEL2").val().split("-")[2]);
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.TELF2!="") {
						$("#MEMBER_CEL2").val(JsonData.Parameter.S_EXPORTA.TELF2);
						$("#MEMBER_CEL2").val(OnCheckPhone_ALL($("#MEMBER_CEL2").val()));
						pageParams.children.MEMBER_CEL1=checkDigit($("#MEMBER_CEL2").val().split("-")[0]);
						pageParams.children.MEMBER_CEL2=checkDigit($("#MEMBER_CEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_CEL2").val().split("-")[2]);
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.SMTP_ADDR!="") {
						pageParams.children.MEMBER_EMAIL1=JsonData.Parameter.S_EXPORTA.SMTP_ADDR.split("@")[0];
						pageParams.children.MEMBER_EMAIL2=JsonData.Parameter.S_EXPORTA.SMTP_ADDR.split("@")[1];
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.PSTLZ!="") {
						pageParams.children.MEMBER_ADDRESS1 = JsonData.Parameter.S_EXPORTA.PSTLZ.split("-")[0];
						pageParams.children.MEMBER_ADDRESS2 = JsonData.Parameter.S_EXPORTA.PSTLZ.split("-")[1];
					}
				}
				catch (e)
				{
				}
				pageParams.children.MEMBER_ADDRESS3 = JsonData.Parameter.S_EXPORTA.ORT01;
				pageParams.children.MEMBER_ADDRESS4 = JsonData.Parameter.S_EXPORTA.STRAS;


				if(JsonData.Parameter.S_EXPORTA.KATR5=="01") {
					pageParams.children.MEMBER_CASHRECEIPT = "1";
					pageParams.children.MEMBER_CERTIFY = JsonData.Parameter.S_EXPORTA.STCD4;
					$("#MEMBER_CERTIFY").attr("readonly",true);
					$("#MEMBER_CERTIFY").attr("disabled",true);
					$("#MEMBER_CERTIFY").parent().find("button").eq(0).addClass('none');
					$("#MEMBER_CERTIFY").parent().find("button").eq(1).removeClass('none');
				} else if(JsonData.Parameter.S_EXPORTA.KATR5=="02") {

					pageParams.children.MEMBER_CASHRECEIPT = "2";

					try
					{
						if(JsonData.Parameter.S_EXPORTA.TELF2!="") {
							$("#CASHRECEIPT_MEMBER_CEL2").val(JsonData.Parameter.S_EXPORTA.TELF2);
							$("#CASHRECEIPT_MEMBER_CEL2").val(OnCheckPhone_ALL($("#CASHRECEIPT_MEMBER_CEL2").val()));
							pageParams.children.CASHRECEIPT_MEMBER_CEL1=checkDigit($("#CASHRECEIPT_MEMBER_CEL2").val().split("-")[0]);
							pageParams.children.CASHRECEIPT_MEMBER_CEL2=checkDigit($("#CASHRECEIPT_MEMBER_CEL2").val().split("-")[1])+"-"+checkDigit($("#CASHRECEIPT_MEMBER_CEL2").val().split("-")[2]);
						}
					}
					catch (e)
					{
					}
				} else {
					pageParams.children.MEMBER_CASHRECEIPT = "3";
				} 

				fn_cashreceipt(pageParams.children.MEMBER_CASHRECEIPT);
				$("#MEMBER_SSNUMBER").parent().find("button").eq(1).addClass('none');

				load_data(false);
			}
		},
		Error: function($e){

			//alert("신규회원 모드입니다.");

			check_radio_load(true,"MEMBER_SEX");

			input_ssn_data = $("#MEMBER_SSNUMBER").val();
			$('input:radio[name="MEMBER_SEX"]').each(function(){
				if($(this).val()==String(input_ssn_data).substring(6,7) || $(this).val()==Number(String(input_ssn_data).substring(6,7))-2) $(this).attr("checked", true);
				else $(this).attr("checked", false);
			});	
			check_radio_load(false);

			var date = new Date();
			if(Number(String($("#MEMBER_SSNUMBER").val()).substring(0,2))<=Number(String(date.getFullYear()).substring(2,4))) {
				$("#MEMBER_BIRTHDAY").val("20"+String($("#MEMBER_SSNUMBER").val()).substring(0,2)+"-"+String($("#MEMBER_SSNUMBER").val()).substring(2,4)+"-"+String($("#MEMBER_SSNUMBER").val()).substring(4,6));
			} else {
				$("#MEMBER_BIRTHDAY").val("19"+String($("#MEMBER_SSNUMBER").val()).substring(0,2)+"-"+String($("#MEMBER_SSNUMBER").val()).substring(2,4)+"-"+String($("#MEMBER_SSNUMBER").val()).substring(4,6));
			}



			combie_year = Number(String(date.getFullYear()).substring(2,4)) - Number(String($("#MEMBER_SSNUMBER").val()).substring(0,2)) + 1;
			combie_year = Number(combie_year);


			if(combie_year<=0) {
				$("#MEMBER_CLASS").val("30").attr("selected", "selected");
			} else if(combie_year<=7) {
				$("#MEMBER_CLASS").val("0"+combie_year).attr("selected", "selected");
			} else if(combie_year+3<=16) {
				$("#MEMBER_CLASS").val(combie_year+3).attr("selected", "selected");
			} else if (combie_year+7<=23) {
				$("#MEMBER_CLASS").val(combie_year+7).attr("selected", "selected");
			} else {
				$("#MEMBER_CLASS").val("30").attr("selected", "selected");
			}

			set_disabled(true);
		}
	});

}

//@이메일 (직접입력) 
function fn_mail() {

	var opt = $("#MEMBER_EMAIL2").val();
	if(opt == "self")
	{
		$("#etctext").parent().removeClass("none");
		//$("#etctext").parent().addClass("block");

		$("#etctext").val("");
	}
	else
	{
		$("#etctext").parent().addClass("none");
		$("#etctext").val("");
	}
}

//@현금영수증
function fn_cashreceipt(click_no) {

	$("#CASHRECEIPT_1").addClass('none');
	$("#CASHRECEIPT_2").addClass('none');

	switch(Number(click_no)) {
	case 1: 
		$("#CASHRECEIPT_1").removeClass('none');
		break;
	case 2: 
		$("#CASHRECEIPT_2").removeClass('none');
		break;
	case 3: 
		break;
	}

}

//@ 생년월일 데이터 리턴
var insert_birthday_date = function($data) {
	$data=$data.substr(0,10);
	$("#MEMBER_BIRTHDAY").val($data);
}

var button_post = function() {

	if(validity_ssn_disabled()) {

		saveJson();
		pageParams.zipCode = {};
		pageParams.zipCode.returnUrl = 'C010100.html';

		app_setRequestParameter("readyChange", pageParams);
	}
}

var readyChange = function() {
	app_changePage( 'B010201.html', pageParams, true );
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


// 스크롤 상단으로 이동
function top_scroll() {

	$('#Document #Aside button.top-button').hide();

	setTimeout(function() { 
		window.scrollTo(0, 1);
		$('#Document #Aside button.top-button').hide();
	}, 100);
}


// 동적 라디오버튼 체크
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

// 전화번호 체크
function OnCheckPhone_ALL(sMsg) { 
	var onlynum = "" ; 
	var imsi=0; 
	onlynum = RemoveDash2(sMsg);  //하이픈 입력시 자동으로 삭제함 
	onlynum =  checkDigit(onlynum);  // 숫자만 입력받게 함 
	var retValue = ""; 

	if(onlynum.substring(0,2) == 02) {  // 서울전화번호일 경우  10자리까지만 나타나교 그 이상의 자리수는 자동삭제 
		if (GetMsgLen(onlynum) <= 1) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 2) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,3) ;
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,7) ; ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,5) + "-" + onlynum.substring(5,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,2) + "-" + onlynum.substring(2,6) + "-" + onlynum.substring(6,10) ;
	}
	if(onlynum.substring(0,2) == 05 ) {  // 05로 시작되는 번호 체크 
		if(onlynum.substring(2,3) == 0 ) {  // 050으로 시작되는지 따지기 위한 조건문 
			if (GetMsgLen(onlynum) <= 3) returnData = onlynum ; 
			if (GetMsgLen(onlynum) == 4) returnData = onlynum + "-"; 
			if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
			if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
			if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
			if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
			if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,9) ; ;
			if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,10) ;
			if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) + "-" + onlynum.substring(7,11) ;
			if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
			if (GetMsgLen(onlynum) == 13) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) + "-" + onlynum.substring(8,12) ;
		} else { 
			if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
			if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
			if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
			if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
			if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
			if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
			if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ;
			if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
			if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
			if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
			if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		} 
	} 

	if(onlynum.substring(0,2) == 03 || onlynum.substring(0,2) == 04  || onlynum.substring(0,2) == 06  || onlynum.substring(0,2) == 07  || onlynum.substring(0,2) == 08 ) {  // 서울전화번호가 아닌 번호일 경우(070,080포함 // 050번호가 문제군요)
		if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,8) ; ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
	} 
	if(onlynum.substring(0,2) == 01) {  //휴대폰일 경우 
		if (GetMsgLen(onlynum) <= 2) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 3) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,4) ;
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,9) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,6) + "-" + onlynum.substring(6,10) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) + "-" + onlynum.substring(7,11) ;
	} 

	if(onlynum.substring(0,1) == 1) {  // 1588, 1688등의 번호일 경우 
		if (GetMsgLen(onlynum) <= 3) returnData = onlynum ; 
		if (GetMsgLen(onlynum) == 4) returnData = onlynum + "-"; 
		if (GetMsgLen(onlynum) == 5) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,5) ;
		if (GetMsgLen(onlynum) == 6) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
		if (GetMsgLen(onlynum) == 7) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,7) ;
		if (GetMsgLen(onlynum) == 8) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 9) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 10) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 11) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
		if (GetMsgLen(onlynum) == 12) returnData = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;
	} 
	return returnData;
} 

// 전화번호 체크
function OnCheckPhone(oTa) { 
	var oForm = oTa.form ; 
	var sMsg = oTa.value ; 
	var onlynum = "" ; 
	var imsi=0; 
	onlynum = RemoveDash2(sMsg);
	onlynum =  checkDigit(onlynum);
	var retValue = ""; 

	if (GetMsgLen(onlynum) == 3) oTa.value = onlynum.substring(0,3);
	if (GetMsgLen(onlynum) == 4) oTa.value = onlynum.substring(0,4);
	if (GetMsgLen(onlynum) == 5) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,5) ;
	if (GetMsgLen(onlynum) == 6) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,6) ;
	if (GetMsgLen(onlynum) == 7) oTa.value = onlynum.substring(0,3) + "-" + onlynum.substring(3,7) ;
	if (GetMsgLen(onlynum) == 8) oTa.value = onlynum.substring(0,4) + "-" + onlynum.substring(4,8) ;

} 

// - 삭제
function RemoveDash2(sNo) { 
	var reNo = "" 
		for(var i=0; i<sNo.length; i++) { 
			if ( sNo.charAt(i) != "-" ) { 
				reNo += sNo.charAt(i) 
			} 
		} 
	return reNo 
} 

function GetMsgLen(sMsg) { // 0-127 1byte, 128~ 2byte 
	var count = 0 
	for(var i=0; i<sMsg.length; i++) { 
		if ( sMsg.charCodeAt(i) > 127 ) { 
			count += 2 
		} 
		else { 
			count++ 
		} 
	} 
	return count 
} 

// 디지털 숫자 반환
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
