/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}


/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 종합 분석지");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

// 페이지 파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();
	} else {

	}

};

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//결과분석지 로드
var load_data = function() {

	var param = {
			in_est_seq:pageParams.POSNM
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_est_rpt1_1_new_r',
		Parameter : param,
		CursorCnt : '4',
		Success: function(data){

			if( $(data).find('Table').length>0 ){
				$(data).find('Table').each(function(){

					tmp_AREA_CODE	= $(this).find( 'AREA_CODE' ).text();
					tmp_TSCORE		= $(this).find( 'TSCORE' ).text();
					tmp_PERCENT		= $(this).find( 'PERCENT' ).text();


					switch(tmp_AREA_CODE) {

					case "LA":
						$("#LA_SCORE").html(tmp_TSCORE+"점");
						$("#LA_PERCENT").css("width",tmp_PERCENT+"%");
						$("#LA_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "MA":
						$("#MA_SCORE").html(tmp_TSCORE+"점");
						$("#MA_PERCENT").css("width",tmp_PERCENT+"%");
						$("#MA_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "TO":
						$("#TOTAL_SCORE").html(tmp_TSCORE+"점");
						$("#TOTAL_PERCENT").css("width",tmp_PERCENT+"%");
						$("#TOTAL_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;

					}
				});
			}

			$("#TOTAL_MENT1").html($(data).find('Table1').find( 'TOTAL_MENT1' ).text());
			$("#TOTAL_MENT2").html($(data).find('Table1').find( 'TOTAL_MENT2' ).text());
            

            //가이드멘트 
			if( $(data).find('Table2').length>0 ){
				$(data).find('Table2').each(function(){
    					tmp_AREA_NAME	= $(this).find( 'AREA_NAME' ).text();
    					tmp_GUIDE_MENT		= $(this).find( 'GUIDE_MENT' ).text();
    
    					tmpHTML="";
    					tmpHTML=""+
    					'<li class="title" ><strong>'+ tmp_AREA_NAME + '</strong></li>' +
                        '<li>' + tmp_GUIDE_MENT + '</li>'+
    					"\n";
    
    					$("#guide_ment_container").append(tmpHTML);

				});
			}            
            
            
		},
		Error: function($e){
			app_alert("Error:"+$e);
		}
	});


}

var answer_editSubmit = function() {

	app_changePage( "D020101.html", pageParams, false );
}

// 상단 탭 클릭시
var page_move = function(page_url) {

	app_changePage(page_url, pageParams, false );
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

// 콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

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

// 바이트 체크
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
