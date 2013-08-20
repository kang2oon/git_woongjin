/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

var in_emp_no="";
var in_emp_name="";

var answer_img_url="";
/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 답안수정");
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

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//데이터표시
var init_data = function() {

	$("#answerTitle").html("답안수정");
	$("#area_code").val(pageParams.mode).attr("selected","selected");
}

//교사정보호출
var load_data = function() {

	app_getTutorInfo("get_tutor");

}

//교사정보반환
var get_tutor = function($data) {

	JsonData = $data.replace(/\'/g,'"');
	JsonData = JSON.parse( JsonData );

	in_emp_no = String(JsonData.PERNR);
	in_emp_name = String(JsonData.ENAME);

	change_area_code(pageParams.mode);

}


//기존 응시내역조회
var change_area_code = function(area_code) {


	$("#area_code").val(area_code);
	$("#colsData").attr("colspan","1");

	$("#Nav").find("ul").find("li").eq(0).removeClass("active");
	$("#Nav").find("ul").find("li").eq(1).removeClass("active");

	switch(area_code) {
	case "LA":
		$("#SECTION_NAME").html("언어영역");
		$("#Nav").find("ul").find("li").eq(0).addClass("active");
		break;
	case "MA":
		$("#SECTION_NAME").html("수리영역");
		$("#Nav").find("ul").find("li").eq(1).addClass("active");
		break;
	default:
		return;
	}

	Global_area_code = area_code;
	tmpEST_SEQ = pageParams.POSNM;

	var param = {
			in_est_seq:tmpEST_SEQ
	};


	pageParams_json = JSON.stringify( param );

	pageParams.EST_DATE="";
	loader.service({
		Function : 'sp_it_wt_est_regist_r',
		Parameter : param,
		CursorCnt : '4',
		Success: function(data){

			tmpMode = "";
			tmpTable = "";
			switch(area_code) {
			case "LA":
				tmpTable = "Table1";
				tmpMode = $(data).find('Table').find( 'GRADE_TERM_LA' ).text();
				break;
			case "MA":
				tmpTable = "Table2";
				tmpMode = $(data).find('Table').find( 'GRADE_TERM_MA' ).text();
				break;
			default:
				return;
			}
			$("#grade_term").val(tmpMode).attr("selected","selected");

			pageParams.GRADE_TERM_LA = $(data).find('Table').find( 'GRADE_TERM_LA' ).text();
			pageParams.GRADE_TERM_MA = $(data).find('Table').find( 'GRADE_TERM_MA' ).text();

			pageParams.EST_DATE = $(data).find('Table').find( 'EST_DATE' ).text();
			pageParams.ANSWER_LA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";
			pageParams.ANSWER_MA = "#1#|#2#|#3#|#4#|#5#|#6#|#7#|#8#|#9#|#10#|#11#|#12#";

			$(data).find('Table1').each(function(){
				pageParams.ANSWER_LA = String(pageParams.ANSWER_LA).replace("#"+$(this).find( 'QST_NO' ).text()+"#",$(this).find( 'ANSWER_STATE' ).text());
			});
			for(exNo=1;exNo<=12;exNo++) {
				pageParams.ANSWER_LA = String(pageParams.ANSWER_LA).replace("#"+$(this).find( 'QST_NO' ).text()+"#","0");
			}
			$(data).find('Table2').each(function(){
				pageParams.ANSWER_MA = String(pageParams.ANSWER_MA).replace("#"+$(this).find( 'QST_NO' ).text()+"#",$(this).find( 'ANSWER_STATE' ).text());
			});
			for(exNo=1;exNo<=12;exNo++) {
				pageParams.ANSWER_MA = String(pageParams.ANSWER_MA).replace("#"+$(this).find( 'QST_NO' ).text()+"#","0");
			}

			$("#TB_DATA").html("");

			if($(data).find(tmpTable).length<=1) {

				$("#area_code").attr("disabled",true);
				$("#area_code").attr("readonly",true);

				$("#grade_term").attr("disabled",false);
				$("#grade_term").attr("readonly",false);

				app_alert("학년 선택해주세요.");
				return;
			}


			if( $(data).find(tmpTable).length>0 ){

				$("#colsData").attr("colspan","4");

				$(data).find(tmpTable).each(function(){

					tmp_QST_NO			= $(this).find( 'QST_NO' ).text();
					tmp_ANSWER_STATE	= $(this).find( 'ANSWER_STATE' ).text();
					tmp_ANSWER_IMG_YN	= $(this).find( 'ANSWER_IMG_YN' ).text();
					tmp_ANSWER_DSP_IT	= $(this).find( 'ANSWER_DSP_IT' ).text();


					checked0="";
					checked1="";
					checked2="";

					switch(tmp_ANSWER_STATE) {
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

					if(tmp_ANSWER_IMG_YN=="Y") {
						tmp_ANSWER_DSP_IT="이미지";
					} else {

					}

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
					"\n"+
					"		<div class='description'><strong class='term'>정답 : </strong>"+tmp_ANSWER_DSP_IT+"</div>\n"+
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



//@ sp_it_wt_cmn_qst_r 문항정보조회
var sp_it_wt_cmn_qst_r = function() {

	$("#colsData").attr("colspan","1");

	tmpAREA_CODE = $("#area_code").val();
	tmpGRADE_TERM = $("#grade_term").val();

	if(tmpGRADE_TERM=="") {
		app_alert("학년 선택에 오류가 있습니다.");
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

				$(data).find('Table').each(function(){

					tmp_QST_NO			= $(this).find( 'QST_NO' ).text();
					tmp_ANSWER_STATE	= $(this).find( 'ANSWER_STATE' ).text();
					tmp_ANSWER_IMG_YN	= $(this).find( 'ANSWER_IMG_YN' ).text();
					tmp_ANSWER_DSP_IT	= $(this).find( 'ANSWER_DSP_IT' ).text();


					tmp_check_data="";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state0' value='0' checked /> <label for='exno_"+tmp_QST_NO+"_state0' onclick=\"\">해당없음</label></li>\n";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state1' value='1' /> <label for='exno_"+tmp_QST_NO+"_state1' onclick=\"\"><span class='value-icon true'>O</span></label></li>\n";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state2' value='2' /> <label for='exno_"+tmp_QST_NO+"_state2' onclick=\"\"><span class='value-icon false'>X</span></label></li>\n";

					if(tmp_ANSWER_IMG_YN=="Y") {
						tmp_ANSWER_DSP_IT="이미지";
					} else {

					}

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
					"\n"+
					"		<div class='description'><strong class='term'>정답 : </strong>"+tmp_ANSWER_DSP_IT+"</div>\n"+
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

//기존 응시내역 수정
var sp_it_wt_est_regist_u = function() {

	if(pageParams.EST_DATE=="") {
		app_alert("기존 답안 데이터 로딩에 실패하였습니다.");
		return;
	} else {

	}


	tmp_anserData="";
	for(exNo=1;exNo<=12;exNo++) {
		try
		{
			switch($("input:radio[name=exno_"+exNo+"]:checked").val()) {
			case "1":
				tmp_anserData=tmp_anserData+"1|";
				break;
			case "2":
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


	switch(Global_area_code) {
	case "LA":
		pageParams.ANSWER_LA = tmp_anserData;
		pageParams.GRADE_TERM_LA = $("#grade_term").val();
		break;
	case "MA":
		pageParams.ANSWER_MA = tmp_anserData;
		pageParams.GRADE_TERM_MA = $("#grade_term").val();
		break;
	default:

		app_alert("영역 선택에 오류가 있습니다.");
	return;
	}

	var param = {
			in_est_seq:pageParams.POSNM,
			in_est_date:String(pageParams.EST_DATE).replace(/-/g,''),
			in_grade_term_la:pageParams.GRADE_TERM_LA,
			in_grade_term_ma:pageParams.GRADE_TERM_MA,
			in_service_code:"M",
			in_answer_la:pageParams.ANSWER_LA,
			in_answer_ma:pageParams.ANSWER_MA
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_est_regist_u',
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
				app_alert('답변 수정에 실패했습니다.');
			}

		},
		Error: function($e){
			app_alert('답변 수정에 실패했습니다.');
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

	pageParams_json = JSON.stringify( tmp_S_IMPORTA );

	loader.load( {
		Function: "ZTBSD_GM_WEAT_005",
		Parameter:{
			S_IMPORTA:tmp_S_IMPORTA
		},
		Success: function($data){

			if(Global_area_code=="LA") {

				app_showConfirm('수리영역도 변경하시겠습니까?','안내',"confirm_ok","confirm_cancel");

			} else {
				confirm_cancel();
			}


		},
		Error: function($e){
			app_alert("error:"+$e);
		}
	});

}

//변경확인
var confirm_ok = function() {

	pageParams.mode="MA";
	app_changePage( "D020101.html", pageParams, false );

} 

//변경취소
var confirm_cancel = function() {

    //히스토리 삭제.
    app_goCancel();
	app_changePage( "D020200.html", pageParams,false );

} 


//탭클릭시
var set_area_code = function(mode) {
	pageParams.mode=mode;
	app_changePage( "D020101.html", pageParams, false );
    return;
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

