/********************************************************************************/
//global Value
/********************************************************************************/

var $container;


/********************************************************************************/
//BASE logic 
/********************************************************************************/

// 페이지로드
$(document).ready(function(){

	$container	= $("#Contents .container");

	var today=new Date();
	var tm_year = today.getFullYear();	
	fn_setYearMon(tm_year);

	app_getRequestParameter( 'setData' );


});

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("신용카드 정보입력");

	load_cardinfo();


	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();

	} else {

	}


};

//@ 승인요청 버튼
var cardSubmit = function() {


	//# 카드명
/*  카드명_주석처리 2013.04.03 NDH    
	if($("#PAY_CARD_NAME").val()=="") {
		app_alert("카드종류가 선택되지 않았습니다.");
		return;
	}
*/    
	//# 카드번호
	if($("#PAY_CARD_NUMBER").val()=="") {
		app_alert("카드 번호를 입력해주세요.");
		return;
	}

    //카드번호 조회 버튼 클릭 확인 여부.(true == 누르지 않음.) 2013.04.04 NDH
    var card_button_click_bool = $("#PAY_CARD_NUMBER").parent().find("button.reset_card").hasClass("none");
    if( card_button_click_bool == true  )
    {
		app_alert("카드번호 조회버튼을  눌러주세요.");
		return;
    }
    
    
	//# 유효기간
	if($("#eYear").val()=="" || $("#eDate").val()=="") {
		app_alert("카드 유효기간을 입력해 주세요.");
		return;
	}
	//# 할부
	if($("#PAY_CARD_INSTALLMENT").val()=="") {
		app_alert("할부방식을 선택해주세요.");
		return;
	}
    

	//# 카드소유주
	if($("#PAY_CARD_PERSON").val()=="") {
		app_alert("카드 소유주 정보를 입력해주세요.");
		return;
	}
	//# 주민번호
	if($("#PAY_CARD_PERSON_SSNUM").val()=="") {
		app_alert("카드소유주 주민번호를 입력해 주세요.");
		return;
	}
    
    //2013.04.04 NDH
    if( $("#PAY_CARD_PERSON_SSNUM").parent().find("button").css("display") != "none"  )
    {
		app_alert("주민번호 조회 버튼을 눌러 주세요.");
		return;
    }
    

	saveJson();
}

//@ 항목 데이터 저장
var saveJson = function() {

	//# 회원명
	pageParams.NAME1=pageParams.NAME1;
	//# 카드명
/*  카드명_주석처리 2013.04.03 NDH    
	pageParams.PAY_CARD_CODE=$("#PAY_CARD_NAME").val();
	pageParams.PAY_CARD_NAME=$("#PAY_CARD_NAME option:selected").text();
*/    
	//# 에듀프리
	pageParams.PAY_CARD_EDUFREE=" ";
	if($("#PAY_CARD_EDUFREE1").attr("checked")=="checked") {
		pageParams.PAY_CARD_EDUFREE=" ";
	}
	if($("#PAY_CARD_EDUFREE2").attr("checked")=="checked") {
		pageParams.PAY_CARD_EDUFREE="X";
	}
	//# 카드번호
	pageParams.PAY_CARD_NUMBER=$("#PAY_CARD_NUMBER").val();
	pageParams.CARD_E_OWNER=$("#CARD_E_OWNER").val();
	pageParams.CARD_E_STCD1=$("#CARD_E_STCD1").val();


	//# 유효기간
	pageParams.PAY_CARD_EDATE=$("#eDate").val();
	pageParams.PAY_CARD_EYEAR=$("#eYear").val();
	//# 금액
	pageParams.PAY_CARD_SUM=checkDigit($("#PAY_CARD_SUM").val());
	//# 할부
	pageParams.PAY_CARD_INSTALLMENT=$("#PAY_CARD_INSTALLMENT").val();
	//# 카드소유주
	pageParams.PAY_CARD_PERSON=$("#PAY_CARD_PERSON").val();
	//# 주민번호
	pageParams.PAY_CARD_PERSON_SSNUM=$("#PAY_CARD_PERSON_SSNUM").val();

	pageParams_json = JSON.stringify( pageParams );



	app_setRequestParameter("readyChange", pageParams);
}

// 페이지 이동
var readyChange=function() {
	app_changePage( 'B020202.html', pageParams );
}

// 화면구성
var set_data = function() {

	$("#NAME1").html(pageParams.NAME1);

	tmp_PAY_CARD_SUM = 0;
	$.each(pageParams.T_IMPORTA, function(index, entry) {
		tmp_PAY_CARD_SUM = tmp_PAY_CARD_SUM + Number(entry["DMBTR"]);
	}); 

	$("#PAY_CARD_SUM").val(numberFormat(tmp_PAY_CARD_SUM));


	if(typeof(pageParams.PAY_CARD_CODE) != "undefined" )  {

		$("#PAY_CARD_NAME").val(pageParams.PAY_CARD_CODE).attr("selected", "selected");

		if(pageParams.PAY_CARD_EDUFREE=="X") {
			$("#PAY_CARD_EDUFREE1").attr("checked","checked");
		} else {
			$("#PAY_CARD_EDUFREE2").attr("checked","checked");
		}

		$("#PAY_CARD_NUMBER").val(pageParams.PAY_CARD_NUMBER);
		if(pageParams.PAY_CARD_NUMBER) {
			load_card();
		}

		$("#eDate").val(pageParams.PAY_CARD_EDATE).attr("selected", "selected");
		$("#eYear").val(pageParams.PAY_CARD_EYEAR).attr("selected", "selected");

		$("#PAY_CARD_INSTALLMENT").val(pageParams.PAY_CARD_INSTALLMENT).attr("selected", "selected");

		$("#PAY_CARD_PERSON").val(pageParams.PAY_CARD_PERSON);
		$("#PAY_CARD_PERSON_SSNUM").val(pageParams.PAY_CARD_PERSON_SSNUM);

		if(pageParams.PAY_CARD_PERSON_SSNUM) {
			$("#PAY_CARD_PERSON").attr("disabled", "disabled"); // 카드소유주
			$("#PAY_CARD_PERSON_SSNUM").attr("disabled", 'disabled'); // 주민번호
			$("#PAY_CARD_PERSON_SSNUM").parent().find("button").hide();
		}


	}

}

//@ 카드 정보 호출
var load_card = function() {

	if($.trim(checkDigit($("#PAY_CARD_NUMBER").val()))=="") {
		app_alert("카드 번호를 입력해주세요.");
		return;
	}

	if($.trim(checkDigit($("#PAY_CARD_NUMBER").val())).length<10) {
		app_alert("카드번호가 정상적이지 않습니다.");
		return;
	}

	$("#PAY_CARD_NUMBER").val( $.trim(checkDigit($("#PAY_CARD_NUMBER").val())) );

	loader.load( {
		Function: "ZTBTR_GET_CARD_STCD",
		Parameter: {
			I_CRDNO:$("#PAY_CARD_NUMBER").val()
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			$("#CARD_E_OWNER").val(JsonData.Parameter.E_OWNER);
			$("#CARD_E_STCD1").val(JsonData.Parameter.E_STCD1);
			$("#PAY_CARD_PERSON").val(JsonData.Parameter.E_OWNER);
			$("#PAY_CARD_PERSON_SSNUM").val(JsonData.Parameter.E_STCD1);


			$('li:contains("카드소유주")').addClass( 'none' );
			$('li:contains("주민번호")').addClass( 'none' );
			$("#PAY_CARD_PERSON_SSNUM").parent().find("button").hide();

		},
		Error: function($e){

			$("#CARD_E_OWNER").val("");
			$("#CARD_E_STCD1").val("");

		}
	});

	$("#PAY_CARD_NUMBER").attr("disabled",true);
	$("#PAY_CARD_NUMBER").parent().find("button").hide();

	$("#PAY_CARD_NUMBER").parent().find("button.reset_card").removeClass("none");
	$("#PAY_CARD_NUMBER").parent().find("button.reset_card").show();

}

//2013.1.29 유정석 수정
//@ 이전 주민등록체크 체크 로직 변경으로 사용하지 않음.
var validity_ssn = function( hasType ) {


	if($.trim($("#PAY_CARD_PERSON").val())=="") {
		app_alert("카드 소유자정보를 넣어주세요.");
		return;
	}

	input_ssn_data = $("#PAY_CARD_PERSON_SSNUM").val();
	if($.trim(input_ssn_data)=="") {

		app_alert("주민등록번호 입력 후\n\n 선택해주세요.");
		return;
	}

	//# 주민등록번호 유효성 체크

	if( input_ssn_data.length==13 ){
		if(!checkPersonalNo(input_ssn_data)) {
			app_alert("잘못된 주민번호 입니다. 다시 확인 후 입력해주세요.");
			return;
		}
	}else if( input_ssn_data.length==7 ){
		if( !checkPersonalNo2(input_ssn_data) ){
			app_alert("잘못된 주민번호 입니다. 다시 확인 후 입력해주세요.");
			return;
		}
	}else{
		app_alert("잘못된 주민번호 입니다. 다시 확인 후 입력해주세요.");
		return;
	}



	if($.trim($("#CARD_E_STCD1").val())!="") {
		//# 카드 소유자와 이름/주민등록 확인
		if($.trim($("#PAY_CARD_PERSON").val())!=$.trim($("#CARD_E_OWNER").val())) {
			app_alert("카드 소유자 정보와 다릅니다.");
			return;
		}
		if($.trim(checkDigit(input_ssn_data))!=$.trim($("#CARD_E_STCD1").val())) {
			app_alert("카드 소유자 정보와 다릅니다.");
			return;
		}
	}

	$("#PAY_CARD_PERSON").attr("disabled", "disabled"); // 카드소유주
	$("#PAY_CARD_PERSON_SSNUM").attr("disabled", 'disabled'); // 주민번호

	$("#PAY_CARD_PERSON_SSNUM").parent().find("button").hide();
}


//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//@ 카드사 정보 호출
var load_cardinfo = function() {

	loader.load( {
		Function: "ZTBTR_PDA01_006",
		Parameter: {
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
					$("#PAY_CARD_NAME").append("<option value='"+entry["KUNNR"]+"'>"+entry["NAME1"]+"</option>");
				}); 

			}
		},
		Error: function($e){
		}
	});
}

//주민번호 조회
var tutorChildChk = function(){

	var stcd1 = $("#PAY_CARD_PERSON_SSNUM").val();
	var stdcd = $("#PAY_CARD_PERSON").val();




	if ( (stcd1.length != 7 && stcd1.length != 13) || stcd1 == "")	{
		app_alert("주민번호를 확인해주세요.");
		return;
	}

	loader.load( {
		Function: "ZTBTR_TOTUR_CHILD_CHK",
		Parameter: {
			I_STCD1: stcd1,
			I_STDCD: stdcd
		},
		Success: function($data){

			var data = JSON.parse( $data ).Parameter;

			if( !!data ){
				//app_alert("사용 가능한 주민번호 입니다.");
				$("#PAY_CARD_PERSON").attr("disabled", "disabled"); // 카드소유주
				$("#PAY_CARD_PERSON_SSNUM").attr("disabled", 'disabled'); // 주민번호
				$("#PAY_CARD_PERSON_SSNUM").parent().find("button").hide();

			}
		},
		Error: function($e){
			app_alert("주민번호가 중복됩니다. 주민번호 앞자리를 입력해주세요.");
			$("#PAY_CARD_PERSON").removeAttr("disabled"); // 카드소유주
			$("#PAY_CARD_PERSON_SSNUM").removeAttr("disabled"); // 주민번호
		}
	});
}

//@ 카드 재입력버튼처리
var reset_card = function() {

    $("#PAY_CARD_NUMBER").val("");
	$("#PAY_CARD_NUMBER").attr("disabled",false);
	$("#PAY_CARD_NUMBER").parent().find("button").show();
	$("#PAY_CARD_NUMBER").parent().find("button.reset_card").addClass("none");

	$("#PAY_CARD_PERSON").attr("disabled",false);
	$("#PAY_CARD_PERSON_SSNUM").attr("disabled",false);
}

//년/월 세팅 
function fn_setYearMon(year) {

	//월 
	var eDate = document.getElementById("eDate");
	for(var i=1 ; i < 13 ; i++)
	{
		//option 생성 
		var opt = document.createElement("option");	//요일 

		if(i < 10)
			i = '0' + i;

		//속성 
		opt.setAttribute("value",i);

		opt.innerHTML = i+"";

		eDate.appendChild(opt);
	}

	//년도 
	var eYear = document.getElementById("eYear"); 
	for(var i=year ; i < year+15 ; i++)
	{
		//option 생성 
		var opt = document.createElement("option");	//요일 

		//속성 
		opt.setAttribute("value",i);

		opt.innerHTML = i+"";

		eYear.appendChild(opt);
	}

}


// 문자열끝에서 갯수만큼 반환
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

// 주민틍록 번호 뒷부분 체크
function checkPersonalNo2(personal_no) 
{
	var sex = Number(personal_no.slice( 0, 1 ));
	if ((sex != 1 && sex != 2 && sex != 3 && sex != 4 ) ) {
		return false;
	}
}