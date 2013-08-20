/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

var area_code = "";

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

	//app_changeTitle("WEAT 감각운동 분석지");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );
    
   

});

//페이지 파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();
	} else {

	}

};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//결과분석지 조회
var load_data = function() {

    area_code = pageParams.AREA_CODE;
    app_changeTitle("WEAT " + areaCodeString(area_code) + " 분석지");
    $("#nav"+area_code).addClass("active");

    var soap_function ="";
    //navigation 초기 셋팅
    if(pageParams.grade_term=="A3" ){ //인지,언어,사회정서
    	$("#navSE").addClass("none");
        $("#navMA").addClass("none");
        $("#SE_SCORE").parent().addClass("none");
        $("#MA_SCORE").parent().addClass("none");
        $("#Nav .area-lnb ul li").width("23%");
        soap_function = "sp_it_wt_kid_est_rpt_a123_2_r";
        soap_count = "3";
    }else if(pageParams.grade_term=="A"){ //언어, 수리
        $("#navSE").addClass("none");
        $("#navCO").addClass("none");
        $("#navEM").addClass("none");
         $("#SE_SCORE").parent().addClass("none");
         $("#CO_SCORE").parent().addClass("none");
         $("#EM_SCORE").parent().addClass("none");

        $("#Nav .area-lnb ul li").width("31%");
        soap_function = "sp_it_wt_kid_est_rpt_a_2_r";
        soap_count = "4";
    }else{
        $("#navMA").addClass("none");
        $("#MA_SCORE").parent().addClass("none");
        $("#Nav .area-lnb  ul  li").width("18%");
        soap_function = "sp_it_wt_kid_est_rpt_a123_2_r";
        soap_count = "3";
    }


    //NU:수리력, SP:공간지각력, VO:어휘력, UN:이해력
    //NU:수리력,
    Text_NU = "기본적인 수 세기, 크고 많음과 관련된 수 개념 및 기초적인 수의 계산능력";
    //SP:공간지각력,
    Text_SP = "도형의 부분과 전체에 대한 이해와 방향과 위치에 따른 도형 변환 능력";
    
    //VO:어휘력,
    Text_VO = "사물의 명칭을 알고 단어를 구성하는 글자를 이해하는 능력";
    //UN:이해력
    Text_UN = "단어나 문장의 의미 파악과 상황에 맞는 적절한 언어 표현 능력";
    
    if(area_code=="MA"){
        $("#SUB_AREA_TEXT_NU").text(Text_NU);
        $("#SUB_AREA_TEXT_SP").text(Text_SP);
    }else{
        $("#SUB_AREA_TEXT_NU").text(Text_VO);
        $("#SUB_AREA_TEXT_SP").text(Text_UN);        
    }
    



	var param = {
			in_est_seq:pageParams.POSNM
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : soap_function,
		Parameter : param,
		CursorCnt : soap_count,
		Success: function(data){

			//# 발달 수준 그래프
			if( $(data).find('Table').find( 'AREA_CODE' ).length>0 ){

                var AREA_NAME = "";
                var SUB_AREA_NAME = "";
                var tmpData = "";

                
				$(data).find('Table').each(function(){
					tmp_AREA_CODE		= $(this).find( 'AREA_CODE' ).text();
                    tmp_SUB_AREA_CODE   = $(this).find( 'SUB_AREA_CODE' ).text();
                    tmp_LEVEL_TEXT      = $(this).find( 'LEVEL_TEXT' ).text();
                    tmp_PERCENT         = Math.round($(this).find( 'PERCENT' ).text()) + "%";
                    tmp_ME_OR_OTHER     = $(this).find( 'ME_OR_OTHER' ).text();
                    SUB_AREA_NAME=sub_area_code_convert(tmp_SUB_AREA_CODE);

                    if(tmp_AREA_CODE==area_code){
/*                            var tmpLT = "";
                            switch (tmp_LEVEL_TEXT){

                            	case "AA":
                                    tmpLT = "최상";
                            	break;
                            	case "BB":
                                    tmpLT = "상";
                            	break;
                            	case "CC":
                                    tmpLT = "중";
                            	break;
                            	case "DD":
                                    tmpLT = "중하";
                            	break;
                            	case "EE":
                                    tmpLT = "하";
                            	break;

                            }
*/                            
                            if((tmp_ME_OR_OTHER=="Me" && tmp_SUB_AREA_CODE=="NU")
                            ||(tmp_ME_OR_OTHER=="Me" && tmp_SUB_AREA_CODE=="VO")){
                                $("#SUB_AREA_NAME_NU").text(SUB_AREA_NAME);

                            switch (tmp_LEVEL_TEXT){
                            	case "AA":
                                    $("#LEVEL_TEXT_NU1").css("background-color","#99D9EB");
                            	break;
                            	case "BB":
                                    $("#LEVEL_TEXT_NU2").css("background-color","#99D9EB");
                            	break;
                            	case "CC":
                                    $("#LEVEL_TEXT_NU3").css("background-color","#99D9EB");
                            	break;
                            	case "DD":
                                    $("#LEVEL_TEXT_NU4").css("background-color","#99D9EB");
                            	break;
                            	case "EE":
                                    $("#LEVEL_TEXT_NU5").css("background-color","#99D9EB");
                            	break;

                            }
                                $("#PERCENT_ME_NU").height(tmp_PERCENT);
                                $("#PERCENT_ME_STR_NU").text(tmp_PERCENT);
                            }
                            if((tmp_ME_OR_OTHER=="Me" && tmp_SUB_AREA_CODE=="SP")
                            ||(tmp_ME_OR_OTHER=="Me" && tmp_SUB_AREA_CODE=="UN")){
                                
                            switch (tmp_LEVEL_TEXT){
                            	case "AA":
                                    $("#LEVEL_TEXT_SP1").css("background-color","#99D9EB");
                            	break;
                            	case "BB":
                                    $("#LEVEL_TEXT_SP2").css("background-color","#99D9EB");
                            	break;
                            	case "CC":
                                    $("#LEVEL_TEXT_SP3").css("background-color","#99D9EB");
                            	break;
                            	case "DD":
                                    $("#LEVEL_TEXT_SP4").css("background-color","#99D9EB");
                            	break;
                            	case "EE":
                                    $("#LEVEL_TEXT_SP5").css("background-color","#99D9EB");
                            	break;

                            }
                                $("#SUB_AREA_NAME_SP").text(SUB_AREA_NAME);
                                $("#PERCENT_ME_SP").height(tmp_PERCENT);
                                $("#PERCENT_ME_STR_SP").text(tmp_PERCENT);
                            }
                            if((tmp_ME_OR_OTHER=="Other" && tmp_SUB_AREA_CODE=="NU")
                            ||(tmp_ME_OR_OTHER=="Other" && tmp_SUB_AREA_CODE=="VO")){
                                
                                $("#PERCENT_OTHER_NU").height(tmp_PERCENT);
                                $("#PERCENT_OTHER_STR_NU").text(tmp_PERCENT);
                            }
                            if((tmp_ME_OR_OTHER=="Other" && tmp_SUB_AREA_CODE=="SP")
                            ||(tmp_ME_OR_OTHER=="Other" && tmp_SUB_AREA_CODE=="UN")){
                                $("#PERCENT_OTHER_SP").height(tmp_PERCENT);
                                $("#PERCENT_OTHER_STR_SP").text(tmp_PERCENT);
                            }



                    }
                    

				});
                

			}else{
			     app_alert("데이터를 가져오지 못했습니다.");
                 return;
			}

			//# 향상 가이드
			if( $(data).find('Table1').find( 'AREA_CODE' ).length>0 ){
			    $("#TB_MENT_DATA").html("");
				$(data).find('Table1').each(function(){
                
					tmp_AREA_CODE		= $(this).find( 'AREA_CODE' ).text();
                    tmp_SUB_AREA_NAME	= $(this).find( 'SUB_AREA_NAME' ).text();
                    tmp_MENT        	= $(this).find( 'MENT' ).text();
					if(tmp_AREA_CODE==area_code) {

							tmpHTML="";
							tmpHTML=""+
							"<tr>\n"+
							'<td>' + tmp_SUB_AREA_NAME + '</td>' +
                            '<td>' + tmp_MENT + '</td>' +
							"</tr>\n";

							$("#TB_MENT_DATA").append(tmpHTML);

					}


				});
			}else{
			     app_alert("데이터를 가져오지 못했습니다.");
                 return;
			}
            

			//# 문항별 평가
			if( $(data).find('Table2').find( 'AREA_CODE' ).length>0 ){
			    $("#TB_CATE_DATA").html("");
				$(data).find('Table2').each(function(index){
                
					tmp_AREA_CODE		= $(this).find( 'AREA_CODE' ).text();
                    tmp_SUB_AREA_NAME	= $(this).find( 'SUB_AREA_NAME' ).text();
                    tmp_SUB_AREA_CODE	= $(this).find( 'SUB_AREA_CODE' ).text();
                    tmp_PATTERN_NAME   	= $(this).find( 'PATTERN_NAME' ).text();
                    tmp_ANSWER_STATE   	= $(this).find( 'ANSWER_STATE' ).text();
                    tmp_CORRECT_RATE   	= $(this).find( 'CORRECT_RATE' ).text();
					if(tmp_AREA_CODE==area_code) {
                    SUB_AREA_NAME=sub_area_code_convert(tmp_SUB_AREA_CODE);
							tmpHTML="";
							tmpHTML=""+
							"<tr>\n"+
                            '<td>' + (index+1) + '</td>' +
                            '<td>' + SUB_AREA_NAME + '</td>' +                            
							'<td>' + tmp_PATTERN_NAME + '</td>' +
                            '<td>' + tmp_ANSWER_STATE + '</td>' +
                            '<td>' + tmp_CORRECT_RATE + '%</td>' +
							"</tr>\n";


							$("#TB_CATE_DATA").append(tmpHTML);

					}


				});
			}else{
			     app_alert("데이터를 가져오지 못했습니다.");
                 return;
			}          



		},
		Error: function($e){
			app_alert("Error:"+$e);
		}
	});


}

var answer_editSubmit = function() {

	app_changePage( "D030101.html", pageParams, false );
}

// 상단 탭 클릭시
var page_move_code = function(page_url,code) {
    
    if(code != "TO"){
        if(pageParams.apply_chk.indexOf(code) == -1){
            app_alert("응시하지 않은 영역입니다.");
            return;
        }        
    }
    pageParams.AREA_CODE = code;
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

//콤마찍기
function numberFormat(nStr){  nStr += '';  x = nStr.split('.');  x1 = x[0];  x2 = x.length > 1 ? '.' + x[1] : '';  var rgx = /(\d+)(\d{3})/;  while (rgx.test(x1))    x1 = x1.replace(rgx, '$1' + ',' + '$2');  return x1 + x2;}

//전화번호 체크
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

//전화번호체크
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

//- 삭제
function RemoveDash2(sNo) { 
	var reNo = "" 
		for(var i=0; i<sNo.length; i++) { 
			if ( sNo.charAt(i) != "-" ) { 
				reNo += sNo.charAt(i) 
			} 
		} 
	return reNo 
} 

//바이트 체크
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

var sub_area_code_convert = function(code) {
    var code_name = "";


    switch (code){ 
    	case "AI":
            code_name = "어른과의 상호작용";
    	break;
    	case "CD":
            code_name = "눈과 손의 협응";
    	break;
    	case "CU":
            code_name = "호기심";
    	break;
    	case "DC":
            code_name = "변별력";
    	break;        
    	case "EE":
            code_name = "정서표현/이해";
    	break;
    	case "FM":
            code_name = "소근육운동";
    	break;
    	case "GM":
            code_name = "대근육운동";
    	break;
    	case "IN":
            code_name = "개별성";
    	break;
    	case "LA01":
            code_name = "어휘/어법";
    	break;
    	case "LA02":
            code_name = "사실적사고";
    	break;
    	case "LA03":
            code_name = "추론적사고";
    	break;
    	case "LA04":
            code_name = "비판감상적사고";
    	break;
    	case "LA05":
            code_name = "기초어휘";
    	break;
    	case "LA06":
            code_name = "확장어휘";
    	break;
    	case "LA07":
            code_name = "어법";
    	break;
    	case "LA08":
            code_name = "독해";
    	break;
    	case "LS":
            code_name = "말하기";
    	break;
    	case "LU":
            code_name = "말 이해하기";
    	break;
    	case "MA01":
            code_name = "계산력";
    	break;
    	case "MA02":
            code_name = "이해력";
    	break;
    	case "MA03":
            code_name = "추론력";
    	break;
    	case "MA04":
            code_name = "문제해결력";
    	break;
    	case "MU":
            code_name = "기억/이해";
    	break;
    	case "NC":
            code_name = "수개념";
    	break;
    	case "NU":
            code_name = "수리력";
    	break;        
    	case "PI":
            code_name = "또래와의 상호작용";
    	break;
    	case "PR":
            code_name = "대인관계";
    	break;
    	case "RE":
            code_name = "표상";
    	break;
    	case "SP":
            code_name = "공간지각력";
    	break;
    	case "SR":
            code_name = "자아인식";
    	break;
    	case "UN":
            code_name = "이해력";
    	break;
    	case "VO":
            code_name = "어휘력";
    	break;
    	default :
            code_name = "코드";
    }
    
        return code_name;
}



var areaCodeString = function(code){
    var areaStr = '';
    switch (code){ 
	case "SE":
        areaStr = "감각운동";
	break;

	case "EM":
    areaStr = "사회정서";
	break;

	case "LA":
    areaStr = "언어";
	break;

	case "MA":
    areaStr = "수리";
	break;
    
	case "CO":
    areaStr = "인지";
	break;    

	//default :
    }
    return areaStr;
}