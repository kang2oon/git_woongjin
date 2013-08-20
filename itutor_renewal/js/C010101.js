/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

var pageParams = {}

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

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
        
		try
		{
			pageParams.parent.MEMBER_P_SSNUMBER = pageParams.parent.MEMBER_P_SSNUMBER;
			if(pageParams.parent.MEMBER_P_SSNUMBER!="") {
				load_data(true);
			} else {
				load_data(false);
			}
		}
		catch (e)
		{
			pageParams.parent={};
			load_data(false);
		}

	} else {

	}


};

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//
var init = function(){

}

// 화면구성
var load_data = function(ssn_check_is) {

	try
	{
		$("#MEMBER_P_SSNUMBER").val(pageParams.parent.MEMBER_P_SSNUMBER);
	}
	catch (e)
	{
		return;
	}

	if(ssn_check_is==true) {
		$("#MEMBER_P_SSNUMBER").val(pageParams.parent.MEMBER_P_SSNUMBER);
		load_ssn_member($("#MEMBER_P_SSNUMBER"));
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
		$("#MEMBER_P_ADDRESS1").val(pageParams.parent.MEMBER_P_ADDRESS1);
		$("#MEMBER_P_ADDRESS2").val(pageParams.parent.MEMBER_P_ADDRESS2);
		$("#MEMBER_P_ADDRESS3").val(pageParams.parent.MEMBER_P_ADDRESS3);
		$("#MEMBER_P_ADDRESS4").val(pageParams.parent.MEMBER_P_ADDRESS4);
	}
	$("#MEMBER_IDNUMBER").val(pageParams.children.MEMBER_KUNNR);

	$("#MEMBER_P_NAME").val(pageParams.parent.MEMBER_P_NAME);
	$("#MEMBER_P_BIRTHDAY").val(pageParams.parent.MEMBER_P_BIRTHDAY);

/*
 	check_radio_load(true,"MEMBER_P_BIRTHDAY_TYPE");
 	if(pageParams.parent.MEMBER_P_BIRTHDAY_TYPE=="2") {
 		$("#MEMBER_P_BIRTHDAY_TYPE2").attr("checked", true);
 	} else {
 		$("#MEMBER_P_BIRTHDAY_TYPE1").attr("checked", true);
 	}
 */
	if(pageParams.parent.MEMBER_P_BIRTHDAY_TYPE=="X") {
		$("#MEMBER_P_BIRTHDAY_TYPE1").prop('checked', false); //양력
		$("#MEMBER_P_BIRTHDAY_TYPE2").prop('checked', true);  //음력
	} else if(pageParams.parent.MEMBER_P_BIRTHDAY_TYPE==undefined) {
		$("#MEMBER_P_BIRTHDAY_TYPE1").prop('checked', false);
        $("#MEMBER_P_BIRTHDAY_TYPE2").prop('checked', false);
	} else {
		$("#MEMBER_P_BIRTHDAY_TYPE1").prop('checked', true);
        $("#MEMBER_P_BIRTHDAY_TYPE2").prop('checked', false);
	}


    
	if(pageParams.parent.MEMBER_P_SEX=="1") {
		$("#MEMBER_P_SEX1").attr("checked", true);
        $("#MEMBER_P_SEX2").attr("checked", false);        
	} else if(pageParams.parent.MEMBER_P_SEX=="2") {
		$("#MEMBER_P_SEX1").attr("checked", false);
        $("#MEMBER_P_SEX2").attr("checked", true);
	}

	$("#MEMBER_P_TEL1").val(pageParams.parent.MEMBER_P_TEL1).attr("selected", "selected");
	$("#MEMBER_P_TEL2").val(pageParams.parent.MEMBER_P_TEL2);
	$("#MEMBER_P_TEL2").blur();
	$("#MEMBER_P_CEL1").val(pageParams.parent.MEMBER_P_CEL1).attr("selected", "selected");
	$("#MEMBER_P_CEL2").val(pageParams.parent.MEMBER_P_CEL2);
	$("#MEMBER_P_CEL2").blur();

	$("#MEMBER_P_EMAIL1").val(pageParams.parent.MEMBER_P_EMAIL1);
	if($("#MEMBER_P_EMAIL2").html().indexOf(pageParams.parent.MEMBER_P_EMAIL2)>=0) {
		$("#MEMBER_P_EMAIL2").val(pageParams.parent.MEMBER_P_EMAIL2).attr("selected", "selected");
		fn_mail();
	} else {
		$("#MEMBER_P_EMAIL2").val("self").attr("selected", "selected");
		fn_mail();
		$("#etctext").val(pageParams.parent.MEMBER_P_EMAIL2);
	}




	try
	{
		if(pageParams.zipCode.data.PSTLZ!="") {
			var zipCodes = pageParams.zipCode.data.PSTLZ.split('-');
			$("#MEMBER_P_ADDRESS1").val(zipCodes[0]);
			$("#MEMBER_P_ADDRESS2").val(zipCodes[1]);
			$("#MEMBER_P_ADDRESS3").val(pageParams.zipCode.data.ORT01);
			$("#MEMBER_P_ADDRESS4").val(pageParams.zipCode.data.STRAS);

			pageParams.zipCode.data.PSTLZ="";
			pageParams.zipCode.data.ORT01="";
		}
	}
	catch (e)
	{
	}

	check_radio_load(false);
	set_disabled(true);
}

// 활성 / 비활성 체크
var set_disabled = function(open_is) {

	if(open_is==true) {
		$("#MEMBER_P_NAME").attr("disabled",false);
		$("#MEMBER_P_TEL1").attr("disabled",false);
		$("#MEMBER_P_TEL2").attr("disabled",false);
		$("#MEMBER_P_CEL1").attr("disabled",false);
		$("#MEMBER_P_CEL2").attr("disabled",false);
		$("#MEMBER_P_EMAIL1").attr("disabled",false);
		$("#MEMBER_P_EMAIL2").attr("disabled",false);
		$("#etctext").attr("disabled",false);
		$("#MEMBER_P_ADDRESS4").attr("disabled",false);

	} else {

		$("#MEMBER_P_NAME").attr("disabled",true);
		$("#MEMBER_P_TEL1").attr("disabled",true);
		$("#MEMBER_P_TEL2").attr("disabled",true);
		$("#MEMBER_P_CEL1").attr("disabled",true);
		$("#MEMBER_P_CEL2").attr("disabled",true);
		$("#MEMBER_P_EMAIL1").attr("disabled",true);
		$("#MEMBER_P_EMAIL2").attr("disabled",true);
		$("#etctext").attr("disabled",true);
		$("#MEMBER_P_ADDRESS4").attr("disabled",true);
	}
}

//@ 자녀상동
var set_children_data = function(object_data) {

	if($(object_data).attr("checked")=="checked") {

		$("#MEMBER_P_TEL1").val(pageParams.children.MEMBER_TEL1).attr("selected", "selected");
		$("#MEMBER_P_TEL2").val(pageParams.children.MEMBER_TEL2);
		$("#MEMBER_P_TEL2").blur();
		$("#MEMBER_P_CEL1").val(pageParams.children.MEMBER_CEL1).attr("selected", "selected");
		$("#MEMBER_P_CEL2").val(pageParams.children.MEMBER_CEL2);
		$("#MEMBER_P_CEL2").blur();


		$("#MEMBER_P_EMAIL1").val(pageParams.children.MEMBER_EMAIL1);
		if($("#MEMBER_P_EMAIL2").html().indexOf(pageParams.children.MEMBER_EMAIL2)>=0) {
			$("#MEMBER_P_EMAIL2").val(pageParams.children.MEMBER_EMAIL2).attr("selected", "selected");
			fn_mail();
		} else {
			$("#MEMBER_P_EMAIL2").val("self").attr("selected", "selected");
			fn_mail();
			$("#etctext").val(pageParams.children.MEMBER_EMAIL2);
		}

		$("#MEMBER_P_ADDRESS1").val(pageParams.children.MEMBER_ADDRESS1);
		$("#MEMBER_P_ADDRESS2").val(pageParams.children.MEMBER_ADDRESS2);
		$("#MEMBER_P_ADDRESS3").val(pageParams.children.MEMBER_ADDRESS3);
		$("#MEMBER_P_ADDRESS4").val(pageParams.children.MEMBER_ADDRESS4);

	} else {

		$("#MEMBER_P_TEL1").val("").attr("selected", "selected");
		$("#MEMBER_P_TEL2").val("");
		$("#MEMBER_P_TEL2").blur();
		$("#MEMBER_P_CEL1").val("").attr("selected", "selected");
		$("#MEMBER_P_CEL2").val("");
		$("#MEMBER_P_CEL2").blur();


		$("#MEMBER_P_EMAIL1").val("");
		$("#MEMBER_P_EMAIL2").val("").attr("selected", "selected");
		fn_mail();

		$("#MEMBER_P_ADDRESS1").val("");
		$("#MEMBER_P_ADDRESS2").val("");
		$("#MEMBER_P_ADDRESS3").val("");
		$("#MEMBER_P_ADDRESS4").val("");
	}
}

// 우편번호 이동
var button_post = function() {

	if(validity_ssn_disabled()) {

		saveJson();
		pageParams.zipCode = {};
		pageParams.zipCode.returnUrl = 'C010101.html';
		app_changePage( 'B010201.html', pageParams, true );
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

		$("#MEMBER_P_SSNUMBER").attr("disabled",false);
		$("#MEMBER_P_SSNUMBER").parent().find("button").show();
		$("#MEMBER_P_SSNUMBER").parent().find("button.reset_ssn").addClass("none");

		check_radio_load(true,"MEMBER_P_SEX");
	}
}

var validity_ssn_disabled = function() {
	
	if($("#MEMBER_P_SSNUMBER").attr("disabled")!="disabled") {
		app_alert("주민등록번호 입력 후\n\n 선택해주세요.");
		return false;
	} else {
	
		return true;
	}
}

//@ 저장항목 체크
var validity_all = function() {

	//# 주민등록번호 확인.
	validity_ssn($("#MEMBER_P_SSNUMBER"));

	if(validity_ssn_disabled()!=true) {
		return;
	}

	if($.trim($("#MEMBER_P_NAME").val())=="") {
		app_alert("이름이 입력되지 않았습니다.");
		$("#MEMBER_P_NAME").focus();
		return;
	}
	if($.trim($("#MEMBER_P_TEL1").val())=="" || $.trim($("#MEMBER_P_TEL2").val())=="") {
		app_alert("전화번호가 입력되지 않았습니다.");
		$("#MEMBER_P_TEL1").focus();
		return;
	}

	if($.trim($("#MEMBER_P_CEL1").val())=="" || $.trim($("#MEMBER_P_CEL2").val())=="") {
		app_alert("휴대전화번호가 입력되지 않았습니다.");
		$("#MEMBER_P_CEL1").focus();
		return;
	}
    //이메일 필수 조건 제거 2013.04.26 NDH
/*
 	if($.trim($("#MEMBER_P_EMAIL1").val())=="") {
 		app_alert("이메일주소가 입력되지 않았습니다.");
 		$("#MEMBER_P_EMAIL1").focus();
 		return;
 	}
 	if($.trim($("#MEMBER_P_EMAIL2").val())=="self" && $.trim($("#etctext").val())=="") {
 		app_alert("이메일주소가 입력되지 않았습니다.");
 		$("#etctext").focus();
 		return;
 	}
 */
	if($.trim($("#MEMBER_P_ADDRESS1").val())=="" ) {
		app_alert("우편번호가 입력되지 않았습니다.");
		$("#MEMBER_ADDRESS1").focus();
		return;
	}
	if($.trim($("#MEMBER_P_ADDRESS4").val())=="" ) {
		app_alert("주소가 입력되지 않았습니다.");
		$("#MEMBER_P_ADDRESS4").focus();
		return;
	}

	//# 저장 호출
	saveJson();

	//# DB 저장 호출
	saveDatabase();
}

// 저장요청
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
	if($.trim(pageParams.parent.MEMBER_KUNNR)!="") {
		TMP_KUNNR=pageParams.parent.MEMBER_KUNNR;
		loader_function = "ZTBSD_RFC_CHANGE_CUSTOMER";
	} else {
		TMP_KUNNR=pageParams.children.MEMBER_KUNNR;
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
	if($("#MEMBER_P_BIRTHDAY_TYPE1").attr("checked")=="checked") {
		tmpGBCHK="X";
	} else if($("#MEMBER_P_BIRTHDAY_TYPE2").attr("checked")=="checked") {
		tmpGBCHK="";
	} else {
		tmpGBCHK="";
	}
    


	var TMP_S_IMPORTA = {
			STCD1:pageParams.parent.MEMBER_P_SSNUMBER,
			KUNNR:TMP_KUNNR,
			NAME1:pageParams.parent.MEMBER_P_NAME,
			NAME2:" ",
			TELF1:String(pageParams.parent.MEMBER_P_TEL1+pageParams.parent.MEMBER_P_TEL2).replace(/-/g,""),
			TELF2:String(pageParams.parent.MEMBER_P_CEL1+pageParams.parent.MEMBER_P_CEL2).replace(/-/g,""),
			PSTLZ:pageParams.parent.MEMBER_P_ADDRESS1+"-"+pageParams.parent.MEMBER_P_ADDRESS2,
			ORT01:pageParams.parent.MEMBER_P_ADDRESS3,
			STRAS:pageParams.parent.MEMBER_P_ADDRESS4,
			ADRNR:" ",
            SMTP_ADDR:tmpEMAIL,
			//SMTP_ADDR:pageParams.parent.MEMBER_P_EMAIL1+"@"+pageParams.parent.MEMBER_P_EMAIL2,
			KUNPA:" ",
			GBDAT:String(pageParams.parent.MEMBER_P_BIRTHDAY).replace(/-/g,""),
			GBCHK:tmpGBCHK,
//			GBCHK:pageParams.parent.MEMBER_P_BIRTHDAY_TYPE,
			PARGE:pageParams.parent.MEMBER_P_SEX,
			KATR1:pageParams.children.MEMBER_CLASS,
			KATR5:TMP_KATR5,
			STCD4:TMP_STCD4
	}

	loader.load( {
		Function: loader_function,
		Parameter: {
			VKORG:"1000",
			CHILD:" ",
			S_IMPORTA:TMP_S_IMPORTA
		},
		Success: function($data){
		      app_alert("회원의 부모정보가 저장되었습니다.",'','finish_save');

		},
		Error: function($e){

			app_alert("error:"+$e);
		}
	});
}

//회원 정보 저장후 페이지 이동.2013.05.03 
var finish_save = function() {
    app_changePage( 'C010200.html', pageParams, true );
}


//@ 항목 데이터 저장
var saveJson = function() {

	try
	{
		pageParams.parent.MEMBER_P_SSNUMBER = $("#MEMBER_P_SSNUMBER").val();
	}
	catch (e)
	{
		pageParams.parent={};
	}
	pageParams.parent.MEMBER_P_SSNUMBER = $("#MEMBER_P_SSNUMBER").val();
	pageParams.parent.MEMBER_P_NAME = $("#MEMBER_P_NAME").val();
	pageParams.parent.MEMBER_P_BIRTHDAY = $("#MEMBER_P_BIRTHDAY").val();
    
    
    //양,음력 체크 X면 음력.
	if($("#MEMBER_BIRTHDAY_TYPE2").attr("checked")=="checked") { //음력
		pageParams.parent.MEMBER_P_BIRTHDAY_TYPE = "X";
	} else {
		pageParams.parent.MEMBER_P_BIRTHDAY_TYPE = " ";
	}
/*
 	if($("#MEMBER_P_BIRTHDAY_TYPE1").attr("checked")=="checked") {
 		pageParams.parent.MEMBER_P_BIRTHDAY_TYPE = "1";
 	} else {
 		pageParams.parent.MEMBER_P_BIRTHDAY_TYPE = "2";
 	}
 */
    
    
	if($("#MEMBER_P_SEX1").attr("checked")=="checked") {
		pageParams.parent.MEMBER_P_SEX = "1";
	} else {
		pageParams.parent.MEMBER_P_SEX = "2";
	}
	pageParams.parent.MEMBER_P_TEL1 = $("#MEMBER_P_TEL1").val();
	pageParams.parent.MEMBER_P_TEL2 = $("#MEMBER_P_TEL2").val();
	pageParams.parent.MEMBER_P_CEL1 = $("#MEMBER_P_CEL1").val();
	pageParams.parent.MEMBER_P_CEL2 = $("#MEMBER_P_CEL2").val();
	pageParams.parent.MEMBER_P_EMAIL1 = $("#MEMBER_P_EMAIL1").val();
	if($("#MEMBER_P_EMAIL2").val()=="self") {
		pageParams.parent.MEMBER_P_EMAIL2 = $("#etctext").val();
	} else {
		pageParams.parent.MEMBER_P_EMAIL2 = $("#MEMBER_P_EMAIL2").val();
	}
	pageParams.parent.MEMBER_P_ADDRESS1 = $("#MEMBER_P_ADDRESS1").val();
	pageParams.parent.MEMBER_P_ADDRESS2 = $("#MEMBER_P_ADDRESS2").val();
	pageParams.parent.MEMBER_P_ADDRESS3 = $("#MEMBER_P_ADDRESS3").val();
	pageParams.parent.MEMBER_P_ADDRESS4 = $("#MEMBER_P_ADDRESS4").val();

	pageParams_json = JSON.stringify( pageParams );
}

// 주민 번호 조회
var load_ssn_member = function(this_object) {

	if(!validity_ssn(this_object,true)) return;

	input_ssn_data = $(this_object).parent().find("input").val();

	try
	{
		if(pageParams.zipCode.data.PSTLZ!="") {

			var zipCodes = pageParams.zipCode.data.PSTLZ.split('-');
			pageParams.parent.MEMBER_P_ADDRESS1 = zipCodes[0];
			pageParams.parent.MEMBER_P_ADDRESS2 = zipCodes[1];
			pageParams.parent.MEMBER_P_ADDRESS3 = pageParams.zipCode.data.ORT01;
			pageParams.parent.MEMBER_P_ADDRESS4 = pageParams.zipCode.data.STRAS;

			$("#MEMBER_P_ADDRESS1").val(pageParams.parent.MEMBER_P_ADDRESS1);
			$("#MEMBER_P_ADDRESS2").val(pageParams.parent.MEMBER_P_ADDRESS2);
			$("#MEMBER_P_ADDRESS3").val(pageParams.parent.MEMBER_P_ADDRESS3);
			$("#MEMBER_P_ADDRESS4").val(pageParams.parent.MEMBER_P_ADDRESS4);

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

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				saveJson();

				pageParams.parent.MEMBER_KUNNR = JsonData.Parameter.S_EXPORTA.KUNNR;
				$("#IDNUMBER_LI").removeClass("none");
				$("#MEMBER_IDNUMBER").val(pageParams.parent.MEMBER_KUNNR);

				pageParams.parent.MEMBER_P_SSNUMBER = JsonData.Parameter.S_EXPORTA.STCD1;
				pageParams.parent.MEMBER_P_NAME = JsonData.Parameter.S_EXPORTA.NAME1;
				pageParams.parent.MEMBER_P_BIRTHDAY = JsonData.Parameter.S_EXPORTA.GBDAT;
				pageParams.parent.MEMBER_P_BIRTHDAY_TYPE = JsonData.Parameter.S_EXPORTA.GBCHK;
				pageParams.parent.MEMBER_P_SEX = JsonData.Parameter.S_EXPORTA.PARGE;

				try
				{
					if(JsonData.Parameter.S_EXPORTA.TELF1!="") {
						$("#MEMBER_P_TEL2").val(JsonData.Parameter.S_EXPORTA.TELF1);
						$("#MEMBER_P_TEL2").val(OnCheckPhone_ALL($("#MEMBER_P_TEL2").val()));
						pageParams.parent.MEMBER_P_TEL1=checkDigit($("#MEMBER_P_TEL2").val().split("-")[0]);
						pageParams.parent.MEMBER_P_TEL2=checkDigit($("#MEMBER_P_TEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_P_TEL2").val().split("-")[2]);
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.TELF2!="") {
						$("#MEMBER_P_CEL2").val(JsonData.Parameter.S_EXPORTA.TELF2);
						$("#MEMBER_P_CEL2").val(OnCheckPhone_ALL($("#MEMBER_P_CEL2").val()));
						pageParams.parent.MEMBER_P_CEL1=checkDigit($("#MEMBER_P_CEL2").val().split("-")[0]);
						pageParams.parent.MEMBER_P_CEL2=checkDigit($("#MEMBER_P_CEL2").val().split("-")[1])+"-"+checkDigit($("#MEMBER_P_CEL2").val().split("-")[2]);
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.SMTP_ADDR!="") {
						pageParams.parent.MEMBER_P_EMAIL1=JsonData.Parameter.S_EXPORTA.SMTP_ADDR.split("@")[0];
						pageParams.parent.MEMBER_P_EMAIL2=JsonData.Parameter.S_EXPORTA.SMTP_ADDR.split("@")[1];
					}
				}
				catch (e)
				{
				}

				try
				{
					if(JsonData.Parameter.S_EXPORTA.PSTLZ!="") {
						pageParams.parent.MEMBER_P_ADDRESS1 = JsonData.Parameter.S_EXPORTA.PSTLZ.split("-")[0];
						pageParams.parent.MEMBER_P_ADDRESS2 = JsonData.Parameter.S_EXPORTA.PSTLZ.split("-")[1];
					}
				}
				catch (e)
				{
				}
				pageParams.parent.MEMBER_P_ADDRESS3 = JsonData.Parameter.S_EXPORTA.ORT01;
				pageParams.parent.MEMBER_P_ADDRESS4 = JsonData.Parameter.S_EXPORTA.STRAS;

				$("#MEMBER_P_SSNUMBER").parent().find("button").eq(1).addClass('none');
				load_data(false);

			}
		},
		Error: function($e){


			pageParams.parent.MEMBER_KUNNR="";
			check_radio_load(true,"MEMBER_P_SEX");

			input_ssn_data = $("#MEMBER_P_SSNUMBER").val();
			$('input:radio[name="MEMBER_P_SEX"]').each(function(){
				if($(this).val()==String(input_ssn_data).substring(6,7) || $(this).val()==Number(String(input_ssn_data).substring(6,7))-2) {
					$(this).attr("checked", true);
				}
				else $(this).attr("checked", false);
			});	

			var date = new Date();
			if(Number(String($("#MEMBER_P_SSNUMBER").val()).substring(0,2))<=Number(String(date.getFullYear()).substring(2,4))) {
				$("#MEMBER_P_BIRTHDAY").val("20"+String($("#MEMBER_P_SSNUMBER").val()).substring(0,2)+"-"+String($("#MEMBER_P_SSNUMBER").val()).substring(2,4)+"-"+String($("#MEMBER_P_SSNUMBER").val()).substring(4,6));
			} else {
				$("#MEMBER_P_BIRTHDAY").val("19"+String($("#MEMBER_P_SSNUMBER").val()).substring(0,2)+"-"+String($("#MEMBER_P_SSNUMBER").val()).substring(2,4)+"-"+String($("#MEMBER_P_SSNUMBER").val()).substring(4,6));
			}

			check_radio_load(false);


			set_disabled(true);
		}
	});

}

//@이메일 (직접입력) 
function fn_mail() {

	var opt = $("#MEMBER_P_EMAIL2").val();
	if(opt == "self")
	{
		$("#etctext").parent().removeClass("none");
		$("#etctext").parent().addClass("block");

		$("#etctext").val("");
	}
	else
	{
		$("#etctext").parent().removeClass("block");
		$("#etctext").parent().addClass("none");
		$("#etctext").val("");
	}
}


//@ 생년월일 데이터 리턴
var insert_birthday_date = function($data) {
	$data=$data.substr(0,10);
	$("#MEMBER_P_BIRTHDAY").val($data);
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
		//alert("주민등록 뒷자리 : "+ check);
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

// 동적생성 라디오버튼 처리
function check_radio_load(delete_is, id_object) {

	if(delete_is==true) {

		$('input.graphic').each(function(){
			var $form = $(this);
			var target = $form.attr('id');
			var $label = $('label[for="' + target + '"]');
			if($(this).attr("name")==id_object) {
				$(this).attr("checked", false);
				$label.find('>span:first').find('>button').removeClass("check").removeClass("disabled");
			}
		});
	}

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

		$form.click(function(){
			if($form.is(':checkbox')) {
				if($form.get(0).checked !== true) {
					$label.find('>span:first>button').removeClass("check");
				} else {
					$label.find('>span:first>button').addClass("check");
				}
			}
			else if($form.is(':radio')) {
				if($form.get(0).checked === true) {
					$('span.' + this.name + '-Radio>button').removeClass("check");
					$label.find('>span:first>button').addClass("check");
				}
			}
		});
	});
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

// 디지털숫자반환
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
