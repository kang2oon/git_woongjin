/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

LA_DATA_COUNT = 0; //# 언어영역 푼 갯수
MA_DATA_COUNT = 0; //# 수리영역 푼 갯수

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 정오답");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		init_data();
		load_data();
	} else {

	}

};

//페이지로드
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//데이터 셋팅
var init_data = function() {

    //분석지 전송버튼 추가. 2013.05.21 NDH
    $("#SEND_RESULT_BTN").click(function(){
       app_alert("전송되었습니다."); 
    });

	pageParams.ANSWER_LA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";
	pageParams.ANSWER_MA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";

	for(exNo=1;exNo<=12;exNo++) {
		pageParams.ANSWER_LA = String(pageParams.ANSWER_LA).replace("#"+exNo+"#","0");
	}
	for(exNo=1;exNo<=12;exNo++) {
		pageParams.ANSWER_MA = String(pageParams.ANSWER_MA).replace("#"+exNo+"#","0");
	}

}

//답안로드
var load_data = function() {

	var param = {
			in_est_seq:pageParams.POSNM
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_result_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){

			$("#TB_DATA").html("");

			tmp_TB = "";
			tmp_listAREAKOR = "";
			tmp_backAREAKOR = "";
			tmp_backAREAKOR_count = 0;

			LA_DATA_COUNT = 0;
			MA_DATA_COUNT = 0;

			check_ANSWER_LA = String(pageParams.ANSWER_LA).split("|");
			check_ANSWER_MA = String(pageParams.ANSWER_MA).split("|");

			if( $(data).find('Table').find( 'QST_NO' ).length>0 || $(data).find('Table1').find( 'RET' ).text() == "0" ){
				$(data).find('Table').each(function(){

					tmp_AREAKOR	= $(this).find( 'AREAKOR' ).text();
					tmp_QST_NO	= $(this).find( 'QST_NO' ).text();
					tmp_ANSWERSTATE	= $(this).find( 'ANSWERSTATE' ).text();
					tmp_SCORE	= $(this).find( 'SCORE' ).text();

					tmp_QST_NO2 = tmp_QST_NO.replace(/ /g,"");
					tmp_QST_NO2 = tmp_QST_NO2.replace("번","");

					tmp_ANSWERSTATE2 = tmp_ANSWERSTATE.replace("O","1");
					tmp_ANSWERSTATE2 = tmp_ANSWERSTATE2.replace("X","2");

					switch(tmp_AREAKOR) {
					case "언어":
						tmp_AREAKOR="LA";
						LA_DATA_COUNT = LA_DATA_COUNT+1;

						check_ANSWER_LA[Number(tmp_QST_NO2)-1]=tmp_ANSWERSTATE2;
						break;
					case "수리":
						tmp_AREAKOR="MA";
						MA_DATA_COUNT = MA_DATA_COUNT + 1;

						check_ANSWER_MA[Number(tmp_QST_NO2)-1]=tmp_ANSWERSTATE2;
						break;
					default:
						tmp_AREAKOR="";
					}

					if(tmp_backAREAKOR!=tmp_AREAKOR) {
						tmp_backAREAKOR = tmp_AREAKOR;
						tmp_listAREAKOR = tmp_listAREAKOR + "@" + tmp_AREAKOR;
						tmp_backAREAKOR_count = 0;
					} else {
						tmp_backAREAKOR_count=tmp_backAREAKOR_count+1;
					}


					tmpHTML="";
					tmpHTML=""+
					"	<tr>\n"+
					"		<td class='top cell_"+tmp_AREAKOR+"' cell_count='"+tmp_backAREAKOR_count+"'>#TITLE#</td>\n"+
					"		<td>"+tmp_QST_NO+"</td>\n"+
					"		<td><span class='value-icon #ANSWERSTATE#'>"+tmp_ANSWERSTATE+"</span></td>\n"+
					"		<td class='top score cell_"+tmp_AREAKOR+"_2' cell_count2='"+tmp_backAREAKOR_count+"'>"+tmp_SCORE+"</td>\n"+
					"	</tr>\n";

					if(tmp_ANSWERSTATE=="O") {
						tmpHTML=tmpHTML.replace(/#ANSWERSTATE#/g,"true");
					} else {
						tmpHTML=tmpHTML.replace(/#ANSWERSTATE#/g,"false");
					}
					switch(tmp_AREAKOR) {
					case "LA":
						tmpHTML=tmpHTML.replace(/#TITLE#/g,"언어");
						break;
					case "MA":
						tmpHTML=tmpHTML.replace(/#TITLE#/g,"수리");
						break;
					}


					$("#TB_DATA").append(tmpHTML);

				});

				//@ 영역 rowspan 
				tmp_dataAREAKOR = String(tmp_listAREAKOR).split("@");
				for(var loop=0; loop < tmp_dataAREAKOR.length ; loop++) {
					if(tmp_dataAREAKOR[loop]!="") {

						cell_sum = Number($(".cell_"+tmp_dataAREAKOR[loop]+":last").attr("cell_count"))+1;

						for(var del_loop=1;del_loop<cell_sum;del_loop++) {
							$(".cell_"+tmp_dataAREAKOR[loop]).eq(1).remove();
						}

						$(".cell_"+tmp_dataAREAKOR[loop]).eq(0).attr("rowspan",cell_sum);



						cell_sum = Number($(".cell_"+tmp_dataAREAKOR[loop]+"_2:last").attr("cell_count2"))+1;

						for(var del_loop=1;del_loop<cell_sum;del_loop++) {
							$(".cell_"+tmp_dataAREAKOR[loop]+"_2").eq(1).remove();
						}

						$(".cell_"+tmp_dataAREAKOR[loop]+"_2").eq(0).attr("rowspan",cell_sum);
					}
				}
			}else{
			      var errMSG = $(data).find('Table1').find( 'MSG' ).text();
                      app_alert(errMSG,"안내","app_goCancel");
    			     //app_alert("데이터를 가져오지 못했습니다."); 
                     return;                    

			}

			pageParams.ANSWER_LA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";
			pageParams.ANSWER_MA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";

			for(exNo=1;exNo<=12;exNo++) {
				pageParams.ANSWER_LA = String(pageParams.ANSWER_LA).replace("#"+exNo+"#",String(check_ANSWER_LA[exNo-1]));
				pageParams.ANSWER_MA = String(pageParams.ANSWER_MA).replace("#"+exNo+"#",String(check_ANSWER_MA[exNo-1]));
			}

		},
		Error: function($e){
			app_alert("Error:"+$e);
		}
	});


}



//답안수정
var answer_editSubmit = function() {
    //D020101.html 답안수정 페이지
	app_changePage( "D020101.html", pageParams, true );
}

//평가분석지 보기
//2013.02.19 NDH 수정
var detail_view = function() {
    //언어, 수리 모두 4개문항 이상의 답을 체크
	if(LA_DATA_COUNT>=4 && MA_DATA_COUNT>=4) {
      app_changePage( "D020201.html", pageParams, true );
      return;
      
    //언어, 수리 모두 4개문항 미만의 답을 체크  
	}else if(LA_DATA_COUNT<4 && MA_DATA_COUNT<4) { 
		app_showConfirm("각 영역별로 4문제 이상 풀지 않아 분석지가 제공되지 않습니다.\n답안수정하시겠습니까?",'안내',"answer_editSubmit","confirm_cancel");
        return;
        
    //언어, 수리 둘중 하나만 4개문항 이상의 답을 체크
	}else if(LA_DATA_COUNT>=4 || MA_DATA_COUNT>=4) {
	   var tmpStr = ""
	   if(LA_DATA_COUNT>=4){
	       tmpStr4over = "언어";
           tmpStr4under = "수리";
	   }else{
	       tmpStr4over = "수리";
           tmpStr4under = "언어";
	   }
       var tmpMsg =  tmpStr4over + "영역 WEAT 웅진학습능력평가 결과입니다.\n";
           tmpMsg += tmpStr4under + "영역은 4개 문항 미만으로 풀이하여 분석지 결과가 나오지 않습니다.";
       
		app_showConfirm(tmpMsg,'안내',"confirm_ok","confirm_cancel");
        return;
	}    
    
}

//평가분석지 컨펌 확인
var confirm_ok = function() {
    //D020201.html 분석지 페이지
    app_changePage( "D020201.html", pageParams, true );
} 

//평가분석지 컨펌 취소
var confirm_cancel = function() {

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

//전화번호 확인
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

//전화번호 확인
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

//- 제거
function RemoveDash2(sNo) { 
	var reNo = "" 
		for(var i=0; i<sNo.length; i++) { 
			if ( sNo.charAt(i) != "-" ) { 
				reNo += sNo.charAt(i) 
			} 
		} 
	return reNo 
} 

//문자열 바이트 체크
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
