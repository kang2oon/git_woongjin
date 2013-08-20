/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

var in_emp_no="";
var in_emp_name="";

var answer_img_url="";

var template_modal_grade="";

//6세(만5세 ~초등)통합으로 주석 2013.05.02 NDH
//var displayGrade ="";

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();
	template_modal_grade = $('#modal_grade').html();
	$('#modal_grade').remove();

	app_changeTitle("WEAT 답안등록");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

	$("#grade_term").change(function() {
		if(DEVICE_CHK==true) {
			sp_it_wt_cmn_qst_r();
		} else {
			sp_it_wt_cmn_qst_r();
		}
	});

});

//새로고침
var refresh = function(){
	window.location.href = 'D020100.html' + '?dummy=' + (Math.random() * Math.random());
}


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

//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//교사정보 로드
var load_data = function() {

	app_getTutorInfo("get_tutor");

}


//교사정보 호출후 반환
var get_tutor = function($data) {

	JsonData = $data.replace(/\'/g,'"');
	JsonData = JSON.parse( JsonData );

	try
	{
		in_emp_no = String(JsonData.PERNR);
		in_emp_name = String(JsonData.ENAME);
	}
	catch (e)
	{
		app_alert("강사 데이터 호출이 잘못되어 이용할 수 없습니다.");
		app_goCancel();
		return;
	}

}

//정보표시
var init_data = function() {
    
//6세(만5세 ~초등)통합으로 주석 2014.05.02 NDH    
/*

     displayGrade='<option value="" selected>학년선택</option>';
     switch (pageParams.grade_term){
         
     	case "1":
             displayGrade += '<option value="1A">1학년1학기</option><option value="1B">1학년2학기</option>';
     	break;
     	case "2":
             displayGrade += '<option value="2A">2학년1학기</option><option value="2B">2학년2학기 </option>';
     	break;
     	case "3":
             displayGrade += '<option value="3A">3학년1학기</option><option value="3B">3학년2학기</option>';
     	break;
     	case "4":
             displayGrade += '<option value="4A">4학년1학기</option><option value="4B">4학년2학기</option>';
     	break;
     	case "5":
             displayGrade += '<option value="5A">5학년1학기</option><option value="5B">5학년2학기</option>';
     	break;
     	case "6":
             displayGrade += '<option value="6A">6학년1학기</option><option value="6B">6학년2학기</option>';
     	break;
     	case "B":
             displayGrade='<option value="" >학년선택</option>';
             displayGrade += '<option value="B" selected >6세(만5세)</option>';
             
     	break;
     	case "C":
             displayGrade='<option value="" >학년선택</option>';
             displayGrade += '<option value="C" selected>7세(만6세)</option>';

     	break;    

 }
     $("#grade_term").append(displayGrade);
     if(pageParams.grade_term=="B" || pageParams.grade_term == "C")
     {
         $("#grade_term").trigger('change');
     }
     
     
 */
    
    



    

	pageParams.GRADE_TERM_LA = "";
	pageParams.GRADE_TERM_MA = "";
	pageParams.ANSWER_LA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";
	pageParams.ANSWER_MA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";

	for(exNo=1;exNo<=12;exNo++) {
		pageParams.ANSWER_LA = String(pageParams.ANSWER_LA).replace("#"+exNo+"#","0");
	}
	for(exNo=1;exNo<=12;exNo++) {
		pageParams.ANSWER_MA = String(pageParams.ANSWER_MA).replace("#"+exNo+"#","0");
	}


	$("#submitButton").html("다음");
	$("#submitButton").attr("onclick","move_area('MA');");


}

//답안 체크확인
var set_check_data = function() {


	error_cnt = 0;
	tmp_anserData="";
	for(exNo=1;exNo<=12;exNo++) {
		try
		{
			switch($("input:radio[name=exno_"+exNo+"]:checked").val()) {
			case "1":
				error_cnt=error_cnt+1;
				tmp_anserData=tmp_anserData+"1|";
				break;
			case "2":
				error_cnt=error_cnt+1;
				tmp_anserData=tmp_anserData+"2|";
				break;
			case "0":
			default:
				tmp_anserData=tmp_anserData+"0|";
			break;
			}
		}
		catch (e)
		{
			tmp_anserData=tmp_anserData+"0|";
		}
	}
	tmp_anserData = String(tmp_anserData).substr(0,String(tmp_anserData.length)-1);


	if($("#area_code").val()=="LA") {
		pageParams.GRADE_TERM_LA=$("#grade_term").val();
		pageParams.ANSWER_LA = tmp_anserData;
	} else {
		pageParams.GRADE_TERM_MA=$("#grade_term").val();
		pageParams.ANSWER_MA = tmp_anserData;
	}
}

//언어 / 수리 변경시
var move_area = function(Varea_code) {

	//# 화면 head 변경
	$("#local").find("ul").find("li").eq(0).removeClass("active");
	$("#local").find("ul").find("li").eq(1).removeClass("active");

	set_check_data();
	$("#area_code").val(Varea_code);

	$("#colsData").attr("colspan","1");

	tmpHTML="";
	tmpHTML=""+
	"<tr>\n"+
	"	<td colspan=2>검색 데이터가 없습니다.</td>\n"+
	"</tr>\n";
	$("#TB_DATA").html(tmpHTML);

	if(Varea_code=="LA") {
		$("#grade_term").val(pageParams.GRADE_TERM_LA);
		$("#local").find("ul").find("li").eq(0).addClass("active");
		$(".section_name").html("언어영역");

		sp_it_wt_cmn_qst_r();

		$("#submitButton").html("다음");
		$("#submitButton").attr("onclick","move_area('MA');");
		return;
	}
	if(Varea_code=="MA") {

		$("#grade_term").val(pageParams.GRADE_TERM_MA);
		$("#local").find("ul").find("li").eq(1).addClass("active");
		$(".section_name").html("수리영역");
		sp_it_wt_cmn_qst_r();

		$("#submitButton").html("채점");
		$("#submitButton").attr("onclick","sp_it_wt_est_regist_c();");
		return;
	}
}


//@ sp_it_wt_cmn_qst_r 문항정보조회
var sp_it_wt_cmn_qst_r = function(check_data) {

	$("#TB_DATA").html("");


	if(typeof(check_data)!="undefined") {
		$("#grade_term").val(check_data);
	}	

	$("#colsData").attr("colspan","1");

	tmpAREA_CODE = $("#area_code").val();
	tmpGRADE_TERM = $("#grade_term").val();


	if(tmpGRADE_TERM=="") {

		return;
	}

	var param = {
			in_area_code:tmpAREA_CODE,
			in_grade_term:tmpGRADE_TERM
	};


	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_cmn_qst_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){

			$("#TB_DATA").html("");
			if( $(data).find('Table').length>0 ){

				$("#colsData").attr("colspan","4");

				if(tmpAREA_CODE=="LA") {
					check_ANSWER_STATE = String(pageParams.ANSWER_LA).split("|");
				} 
				if(tmpAREA_CODE=="MA") {
					check_ANSWER_STATE = String(pageParams.ANSWER_MA).split("|");
				} 



				$(data).find('Table').each(function(){

					tmp_QST_NO			= $(this).find( 'QST_NO' ).text();
					tmp_ANSWER_STATE	= $(this).find( 'ANSWER_STATE' ).text();
					tmp_ANSWER_IMG_YN	= $(this).find( 'ANSWER_IMG_YN' ).text();
					tmp_ANSWER_DSP_IT	= $(this).find( 'ANSWER_DSP_IT' ).text();

					checked0="";
					checked1="";
					checked2="";

					switch(check_ANSWER_STATE[Number(tmp_QST_NO)-1]) {
					case "1":
						checked1="checked";
						break;
					case "2":
						checked2="checked";
						break;
					case "0":
					default:
						checked0="checked";
					break;
					}

					tmp_check_data="";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state0' value='0' "+checked0+" /> <label for='exno_"+tmp_QST_NO+"_state0' onclick=\"\">해당없음</label></li>\n";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state1' value='1' "+checked1+" /> <label for='exno_"+tmp_QST_NO+"_state1' onclick=\"\"><span class='value-icon true'>O</span></label></li>\n";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state2' value='2' "+checked2+" /> <label for='exno_"+tmp_QST_NO+"_state2' onclick=\"\"><span class='value-icon false'>X</span></label></li>\n";


					tmpHTML="";
					tmpHTML=""+
					"<tr>\n"+
					"	<td>"+tmp_QST_NO+"</td>\n"+
					"	<td class='contents'>\n"+
					"		<div class='inline-check-list'>\n"+
					"			<ul>\n"+
					tmp_check_data +
					"			</ul>\n"+
					"		</div>\n"+
					"\n";

					if(tmp_ANSWER_IMG_YN=="Y") {

						tmpHTML=tmpHTML+
						"		<div class='description'><img width=100% src='"+tmp_ANSWER_DSP_IT+"'></div>\n";

					} else {

						tmpHTML=tmpHTML+
						"		<div class='description'><strong class='term'>정답 : </strong>"+tmp_ANSWER_DSP_IT+"</div>\n";

					}

					tmpHTML=tmpHTML+
					"	</td>\n"+
					"</tr>\n";
					$("#TB_DATA").append(tmpHTML);
				});
			}


		},
		Error: function($e){

			app_alert("Error:"+$e);
		}
	});
}

//@ sp_it_wt_est_regist_c 신규모드
var sp_it_wt_est_regist_c = function() {

// 20130613 OHJ
// 씽크빅 요청 언어영역/수리영역 두 과목중 하나의 과목의 답안만 등록해도 채점이 가능하게 수정	
	if(tmpGRADE_TERM=="") {

   	if(pageParams.GRADE_TERM_MA == 0 && pageParams.GRADE_TERM_LA == 0){
	   	alert('단계값이 없습니다.');
			return;
		}else if(pageParams.GRADE_TERM_MA != 0 || pageParams.GRADE_TERM_LA == 0){

		}else if(pageParams.GRADE_TERM_MA == 0 || pageParams.GRADE_TERM_LA != 0){

		}
	}
	
	var today=new Date();

	var tm_year = today.getFullYear()+"";		//년도 
	var tm_month = today.getMonth()+1+"";		//당월 
	var tm_day = today.getDate()+""; 
	if(tm_month<10) tm_month="0"+tm_month;
	if(tm_day<10) tm_day="0"+tm_day;

	set_check_data();

	var gender = String(pageParams.PARGE);
	if( pageParams.PARGE==undefined ){
		gender = ' ';
	}


 	if( pageParams.NAME1==undefined ){
 		app_alert('고객명이 누락되었습니다.');
 		return false;
 	}


// 20130613 OHJ
// 씽크빅 요청 언어영역/수리영역 두 과목중 하나의 과목의 답안만 등록해도 채점이 가능하게 수정
var page_la = String(pageParams.GRADE_TERM_LA);
var page_ma = String(pageParams.GRADE_TERM_MA);
var answer_la = pageParams.ANSWER_LA;
var answer_ma = pageParams.ANSWER_MA;

//6,7세가 아닐 때 한개이상의 답변 선택
	if( pageParams.GRADE_TERM_LA.indexOf('B')>-1 || pageParams.GRADE_TERM_LA.indexOf('C')>-1 ){ // 6,7세 일때	
		if( pageParams.ANSWER_LA.indexOf('1')>-1 || pageParams.ANSWER_LA.indexOf('2')>-1 ){ // 1개이상 답변이 선택됨
			if(pageParams.GRADE_TERM_MA == 0){
				page_ma = "00";
				answer_ma ="0|0|0|0|0|0|0|0|0|0|0|0";
			  }					
			}else{
				app_alert('언어영역 학년학기를 선택한 경우\n 하나이상의 답변을 등록해야 합니다.');
				return false;
		  }
  }
  
    //6,7세가 아닐 때 한개이상의 답변 선택
	if(pageParams.GRADE_TERM_MA.indexOf('B')>-1 || pageParams.GRADE_TERM_MA.indexOf('C')>-1 ){ // 6,7세 일때
		if( pageParams.ANSWER_MA.indexOf('1')>-1 || pageParams.ANSWER_MA.indexOf('2')>-1 ){ // 1개이상 답변이 선택됨
			if(pageParams.GRADE_TERM_LA == 0){
				page_la = "00";
				answer_la ="0|0|0|0|0|0|0|0|0|0|0|0";
			 }
			}else{
				app_alert('수리영역 학년학기를 선택한 경우\n 하나이상의 답변을 등록해야 합니다.');
				return false;
		}
	}

	var param = {
			in_member_no:pageParams.KUNNR,
			in_member_name:String(pageParams.NAME1),
			in_gender:gender,
			in_emp_no:String(in_emp_no),
			in_emp_name:String(in_emp_name),
			in_est_date:String(tm_year+''+tm_month+''+tm_day),
			in_grade_term_la:page_la,
			in_grade_term_ma:page_ma,
			in_service_code:"M",
			in_answer_la:answer_la,
			in_answer_ma:answer_ma
	};

	pageParams_json = JSON.stringify( param );



	loader.service({
		Function : 'sp_it_wt_est_regist_c',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
			if( $(data).find('Table').length>0 && $(data).find('Table1').find('RET').text() == "0" ){
				pageParams.POSNM = $(data).find('Table').find( 'EST_SEQ' ).text();
				pageParams.EST_SEQ = $(data).find('Table').find( 'EST_SEQ' ).text();
				pageParams.SCORE_LA = $(data).find('Table').find( 'SCORE_LA' ).text();
				pageParams.SCORE_MA = $(data).find('Table').find( 'SCORE_MA' ).text();
				pageParams.SERVICE_CODE = $(data).find('Table').find( 'SERVICE_CODE' ).text();
				pageParams.RPT_VIEW_YN = $(data).find('Table').find( 'RPT_VIEW_YN' ).text();
				pageParams.RPT_PRINT_YN = $(data).find('Table').find( 'RPT_PRINT_YN' ).text();
				pageParams.LA_POINT = $(data).find('Table').find( 'LA_POINT' ).text();
				pageParams.LA_GRADE = $(data).find('Table').find( 'LA_GRADE' ).text();
				pageParams.LA_TERM = $(data).find('Table').find( 'LA_TERM' ).text();
				pageParams.MA_POINT = $(data).find('Table').find( 'MA_POINT' ).text();
				pageParams.MA_GRADE = $(data).find('Table').find( 'MA_GRADE' ).text();
				pageParams.MA_TERM = $(data).find('Table').find( 'MA_TERM' ).text();
				pageParams.TSCORE_LA = $(data).find('Table').find( 'TSCORE_LA' ).text();
				pageParams.TSCORE_MA = $(data).find('Table').find( 'TSCORE_MA' ).text();
				//
				ZTBSD_GM_WEAT_005();
			}else{
				app_alert('답변 등록에 실패 하였습니다!.');
			}
		},
		Error: function($e){
		      app_alert($e);
			//app_alert('답변 등록에 실패 하였습니다.');
		}
	});
}

//@ WEAT 진단평가결과
var ZTBSD_GM_WEAT_005 = function() {

	var today=new Date();

	var tm_year = today.getFullYear()+"";		//년도 
	var tm_month = today.getMonth()+1+"";		//당월 
	var tm_day = today.getDate()+""; 
	if(tm_month<10) tm_month="0"+tm_month;
	if(tm_day<10) tm_day="0"+tm_day;

	var tmp_S_IMPORTA = {
			KUNNR:pageParams.KUNNR,//# 회원번호
			POSNM:pageParams.EST_SEQ,//# 응시번호
			STYPE:"M",//# W(온라인)/O(오프라인)/M(모바일)
			VIEWX:pageParams.RPT_VIEW_YN,//# 분석지출력 생성버튼 여부
			PINTX:pageParams.RPT_PRINT_YN,//# 사용자 프린트 출력실행 여부
			SDATE:tm_year+''+tm_month+''+tm_day,//# 평가실행일
			ENDYN:"Y",//# Y(응시완료)/N(응시미완료)
			KGUN2:pageParams.LA_GRADE,//# 언어단계
			KGUN4:pageParams.LA_POINT,//# 언어T점수
			SGUN2:pageParams.MA_GRADE,//# 수리단계
			SGUN4:pageParams.MA_POINT,//# 수리T점수
			KJUMS:pageParams.SCORE_LA,//# 언어영역점수
			SJUMS:pageParams.SCORE_MA,//# 수리영역점수
			AJUMS:"-",//# 인지영역점수
			BJUMS:"-",//# 감각운동영역점수
			CJUMS:"-",//# 사회정서영역점수
			EJUMS:"-",//# 영어영역점수
			AGUN2:"0",//# 인지단계
			AGUN4:"0",//# 인지T점수
			BGUN2:"0",//# 감각운동단계
			BGUN4:"0",//# 감각운동T점수
			CGUN2:"0",//# 사회정서단계
			CGUN4:"0",//# 사회정서T점수
			EGUN2:"0",//# 영어단계
			EGUN4:"0"//# 영어T점수
	}


	loader.load( {
		Function: "ZTBSD_GM_WEAT_005",
		Parameter:{
			S_IMPORTA:tmp_S_IMPORTA
		},
		Success: function($data){

			app_changePage( "D020200.html", pageParams );

		},
		Error: function($e){
			app_alert("error:"+$e);
		}
	});

}

//학년선택 모달 - 저장
var modal_grade_save = function() {

	var $div = $('#gradeCon');
	var $radio = $div.find('input:radio[name=GRADE_FORM]:checked');

	if( $radio.length==0 ){
		app_alert('단계 선택해주세요.');
		return;
	}

	modal_grade_cancel();

	sp_it_wt_cmn_qst_r($radio.val());
}

//학년선택 모달 - 열기
var modal_grade_open = function() {

	app_showBlind(true);
	$('#Dialog').empty();
	$('#Dialog').append( template_modal_grade );

	//
	$('#Dialog').modal({
		onOpen : null,
		onShow : function(d){
			if($("#area_code").val()=="LA") {
				$('#gradeCon').find('em').html("언어영역");
			} 
			if($("#area_code").val()=="MA") {
				$('#gradeCon').find('em').html("수리영역");
			} 
		},
		onClose : null,
		overlayClose : false,
		escClose : false,
		containerId : 'gradeCon',
		opacity : 60,
		overlayCss : {backgroundColor:"#000"}
	});
}

//학년선택 모달 - 취소
var modal_grade_cancel = function() {

	$.modal.close();
	$('#gradeCon').empty();

	app_showBlind(false);
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

