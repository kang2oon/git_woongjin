/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("회비 카드결제 배분");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );


		//set_data();

		//# DB 저장 호출
		saveDatabase();
	} else {

	}


};

//카드 결재 / 승인 요청
var saveDatabase = function() {

	var today=new Date();

	var tm_year = today.getFullYear()+"";		//년도 
	var tm_month = today.getMonth()+1+"";		//당월 
	var tm_day = today.getDate()+""; 
	if(tm_month<10) tm_month="0"+tm_month;
	if(tm_day<10) tm_day="0"+tm_day;

	pageParams.SIGNATURE2=""
		if(String(pageParams.SIGNATURE).length>2000) {
			pageParams.SIGNATURE=Left(String(pageParams.SIGNATURE),2000);
			pageParams.SIGNATURE2=String(pageParams.SIGNATURE).substring(2000,String(pageParams.SIGNATURE).length);
		} else {
			pageParams.SIGNATURE=pageParams.SIGNATURE;
			pageParams.SIGNATURE2=""
		}


	var parameter = {
			KUNNR:pageParams.KUNNR,
			CRDCD:pageParams.PAY_CARD_CODE,
			EDUFREE:pageParams.PAY_CARD_EDUFREE,
			CRDNO:pageParams.PAY_CARD_NUMBER,
			VTERM:pageParams.PAY_CARD_EYEAR+''+pageParams.PAY_CARD_EDATE,
			ALMON:pageParams.PAY_CARD_INSTALLMENT,
			OWNER:pageParams.PAY_CARD_PERSON,
			STCD1:pageParams.PAY_CARD_PERSON_SSNUM,
			APAMT:pageParams.PAY_CARD_SUM,
			APDAT:tm_year+tm_month+tm_day,
			APPNO:"",
			PIAGR:pageParams.AGREEMENT_CHECK,
			SIGN_IMG:pageParams.SIGNATURE,
			SIGN_IMG2:pageParams.SIGNATURE2
	};

	loader.load( {
		Function: "ZTBTR_PDA01_007",
		Parameter:{
			S_IMPORTA:parameter
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){

				//# 승인번호
				pageParams.APPNO=JsonData.Parameter.S_EXPORTA.APPNO;
				//# 회원명
				$("#NAME1").html(pageParams.NAME1);
				//# 카드명
				//$("#PAY_CARD_NAME").html(JsonData.Parameter.S_EXPORTA.CRDCD);
				//카드명_주석처리 (아래 라인 하나) 2013.04.03 NDH
                //$("#PAY_CARD_NAME").html(pageParams.PAY_CARD_NAME);
				//# 에듀프리
				if(JsonData.Parameter.S_EXPORTA.EDUFREE=="X") {
					$("#PAY_CARD_EDUFREE").html("사용");
				} else {
					$("#PAY_CARD_EDUFREE").html("사용안함");
				}
				//# 카드번호
				$("#PAY_CARD_NUMBER").html(card_numberFormat(JsonData.Parameter.S_EXPORTA.CRDNO));
				//# 유효기간
				$("#CARD_USE_DATE").html(Right(JsonData.Parameter.S_EXPORTA.VTERM,2)+"월 "+Left(JsonData.Parameter.S_EXPORTA.VTERM,4)+"년");
				//# 금액
				$("#PAY_CARD_SUM").html(numberFormat(pageParams.PAY_CARD_SUM)+"원");

				//# 할부
				switch(String(JsonData.Parameter.S_EXPORTA.ALMON)) {
				case "00":
					$("#PAY_CARD_INSTALLMENT").html("일시불");
					break;
				case "02":
					$("#PAY_CARD_INSTALLMENT").html("2개월");
					break;
				case "03":
					$("#PAY_CARD_INSTALLMENT").html("3개월");
					break;
				case "05":
					$("#PAY_CARD_INSTALLMENT").html("5개월");
					break;
				case "06":
					$("#PAY_CARD_INSTALLMENT").html("6개월");
					break;
				case "12":
					$("#PAY_CARD_INSTALLMENT").html("12개월");
					break;
				}
				//# 카드소유주
				$("#PAY_CARD_PERSON").html(pageParams.PAY_CARD_PERSON);
				//# 주민번호
				$("#PAY_CARD_PERSON_SSNUM").html(String(pageParams.PAY_CARD_PERSON_SSNUM).substring(0,6)+"-XXXXXXX");

				//@ 사인
				var src = 'data:image/jpg;base64,'+ JsonData.Parameter.S_EXPORTA.SIGN_IMG;
				if($.trim(JsonData.Parameter.S_EXPORTA.SIGN_IMG2)!="") {
					src = src + JsonData.Parameter.S_EXPORTA.SIGN_IMG2;
				}
				addImageSrc( src );
			}
		},
		Error: function($e){
		    //에러메시지 인 경우 경고창 뿌린 후 처음 페이지로 이동. 2013.04.04 NDH  
			app_alert($e,"ERROR","app_changePage( 'B020200.html', '' )");
            
		}
	});

}

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//@ 배분처리
var allotmentSubmit = function() {


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
			KUNNR:pageParams.KUNNR,
			CRDCD:pageParams.PAY_CARD_CODE,
			EDUFREE:pageParams.PAY_CARD_EDUFREE,
			CRDNO:pageParams.PAY_CARD_NUMBER,
			VTERM:pageParams.PAY_CARD_EYEAR+''+pageParams.PAY_CARD_EDATE,
			ALMON:pageParams.PAY_CARD_INSTALLMENT,
			OWNER:pageParams.PAY_CARD_PERSON,
			STCD1:pageParams.PAY_CARD_PERSON_SSNUM,
			APAMT:pageParams.PAY_CARD_SUM,
			APDAT:tm_year+tm_month+tm_day,
			APPNO:pageParams.APPNO,
			PIAGR:pageParams.AGREEMENT_CHECK,
			SIGN_IMG:pageParams.SIGNATURE,
			SIGN_IMG2:pageParams.SIGNATURE2
	};
	TMP_Parameter.S_IMPORTA=S_IMPORTA_parameter;

	$.each(pageParams.T_IMPORTA, function(index, entry) {
		var T_IMPORTA_parameter = {
				VBELN:entry["VBELN"],
				DMBTR:entry["DMBTR"]
		};
		TMP_Parameter.T_IMPORTA.push(T_IMPORTA_parameter);
	}); 

	loader.load( {
		Function: "ZTBTR_PDA01_008",
		Parameter: TMP_Parameter,
		Success: function($data){

			app_alert("입금배분이 완료되었습니다.");
			pageParams.APPROVE_SEARCH = "2";
			pageParams.CARD_NUM = pageParams.PAY_CARD_NUMBER;

			// 2013.01.31 페이지 변경
			app_changePage( 'B020200.html', '' );

			// 2013.01.31 페이지 변경이전코드
			//app_changePage( 'B020500.html', pageParams, true );
		},
		Error: function($e){
			app_alert($e);
		}
	});
}


var set_data = function() {

	/* saveDatabase() 함수에서 처리하고 있음.
	 * 
	 * 
	//# 회원명
	$("#NAME1").html(pageParams.NAME1);
	//# 카드명
	$("#PAY_CARD_NAME").html(pageParams.PAY_CARD_NAME);
	//# 에듀프리
	if(pageParams.PAY_CARD_EDUFREE!="X") {
		$("#PAY_CARD_EDUFREE").html("사용");
	} else {
		$("#PAY_CARD_EDUFREE").html("사용안함");
	}
	//# 카드번호
	$("#PAY_CARD_NUMBER").html(card_numberFormat(pageParams.PAY_CARD_NUMBER));
	//# 유효기간
	$("#CARD_USE_DATE").html(pageParams.PAY_CARD_EDATE+"월 "+pageParams.PAY_CARD_EYEAR+"년");
	//# 금액
	$("#PAY_CARD_SUM").html(numberFormat(pageParams.PAY_CARD_SUM)+"원");

	//# 할부
	switch(String(pageParams.PAY_CARD_INSTALLMENT)) {
		case "00":
			$("#PAY_CARD_INSTALLMENT").html("일시불");
		break;
		case "02":
			$("#PAY_CARD_INSTALLMENT").html("2개월");
		break;
		case "03":
			$("#PAY_CARD_INSTALLMENT").html("3개월");
		break;
		case "05":
			$("#PAY_CARD_INSTALLMENT").html("5개월");
		break;
		case "06":
			$("#PAY_CARD_INSTALLMENT").html("6개월");
		break;
		case "12":
			$("#PAY_CARD_INSTALLMENT").html("12개월");
		break;
	}
	//# 카드소유주
	$("#PAY_CARD_PERSON").html(pageParams.PAY_CARD_PERSON);
	//# 주민번호
	$("#PAY_CARD_PERSON_SSNUM").html(String(pageParams.PAY_CARD_PERSON_SSNUM).substring(0,6)+"-XXXXXXX");

	//@ 사인
	var src = 'data:image/jpg;base64,'+ pageParams.SIGNATURE;
	addImageSrc( src );
	 */
}

/**
 * 이미지 태그 소스에 넣기
 *  */
var addImageSrc = function( src ){
	// 적용
	$('#imgEl').attr('src', src);
};

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

// 4자리마다 - 추가
function card_numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{4})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + '-' + '$2');  return x1 + x2;}

// 문자열시작부터 갯수만큼 잘라반환
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}

// 문자열 끝에서 갯수만큼 잘라반환
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
