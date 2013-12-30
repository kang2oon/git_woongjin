/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

var in_emp_no="";
var in_emp_name="";

var answer_img_url="";

var template_modal_grade="";


var	apply_chk = Array(5); //SE,EM,LA,CO,MA
    apply_chk['SE'] = "N";
    apply_chk['EM'] = "N";
    apply_chk['LA'] = "N";
    apply_chk['CO'] = "N";
    apply_chk['MA'] = "N";


var jungdab_count;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();
	template_modal_grade = $('#modal_grade').html();
	$('#modal_grade').remove();

	app_changeTitle("KIDS 답안등록");
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



//정보표시
var init_data = function() {

    $("#submitButton").html("다음");

    if(pageParams.grade_term=="A3" ){
    	//# 화면 head 변경
    	$("#navSE").addClass("none");
   		$("#navCO").addClass("active");
        $("#Nav .area-lnb ul li").width("31%");
        $("#area_code").val("CO");
        $(".section_name").html("인지");
	    move_area("CO");
    }else if(pageParams.grade_term=="A"){
        $("#navSE").addClass("none");
        $("#navCO").addClass("none");
        $("#navEM").addClass("none");
  		$("#navLA").addClass("active");
        $("#navMA").removeClass("none");
        $("#Nav .area-lnb ul li").width("48%");
        $("#area_code").val("LA");
        $(".section_name").html("언어");
	    move_area("LA");
        
    }else{
         $("#Nav .area-lnb  ul  li").width("23%");
         $("#area_code").val("SE");
         $(".section_name").html("감각운동");
         move_area("SE");
    }

    $("#grade_term").val(pageParams.grade_term);


	$("#apply_chk").change(function() {
        var area_code = $("#area_code").val();
        if($("#apply_chk").val()=="Y"){
            apply_chk[area_code] ="Y";
        }else{
            apply_chk[area_code] ="N";
        }

	});


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


//답안 체크확인
var set_check_data = function() {

	error_cnt = 0;
	tmp_anserData="";
	for(exNo=1;exNo<=jungdab_count;exNo++) {
		try
		{
			switch( $("input:radio[name=exno_"+exNo+"]:checked").val() ) {
			case "1":
				error_cnt=error_cnt+1;
				tmp_anserData=tmp_anserData+"1$";
				break;
			case "2":
				error_cnt=error_cnt+1;
				tmp_anserData=tmp_anserData+"2$";
				break;
			case "0":
			default:
				tmp_anserData=tmp_anserData+"0$";
			break;
			}
		}
		catch (e)
		{
			tmp_anserData=tmp_anserData+"0$";
		}
              
	}

	tmp_anserData = String(tmp_anserData).substr(0,String(tmp_anserData.length)-1);



	if($("#area_code").val()=="SE") {
		pageParams.ANSWER_SE = tmp_anserData;
	}
	if($("#area_code").val()=="EM") {
		pageParams.ANSWER_EM = tmp_anserData;
	}
	if($("#area_code").val()=="LA") {
		pageParams.ANSWER_LA = tmp_anserData;
	}        
	if($("#area_code").val()=="CO") {
		pageParams.ANSWER_CO = tmp_anserData;
	}
	if($("#area_code").val()=="MA") {
		pageParams.ANSWER_MA = tmp_anserData;
	}
}

//언어 / 수리 변경시
var move_area = function(Varea_code) {


	//# 화면 head 탭  초기화
	$("#local").find("ul").find("li").eq(0).removeClass("active");
	$("#local").find("ul").find("li").eq(1).removeClass("active");
	$("#local").find("ul").find("li").eq(2).removeClass("active");
	$("#local").find("ul").find("li").eq(3).removeClass("active");
    $("#local").find("ul").find("li").eq(4).removeClass("active");

    
    $("#apply_chk").val( apply_chk[Varea_code]  );
    
	set_check_data();
	$("#area_code").val(Varea_code);
	$("#colsData").attr("colspan","4");    
    

	tmpHTML="";
	tmpHTML=""+
	"<tr>\n"+
	"	<td colspan=2>검색 데이터가 없습니다.</td>\n"+
	"</tr>\n";
	$("#TB_DATA").html(tmpHTML);
    
    tab_select_area(Varea_code );

}


//@ sp_it_wt_cmn_qst_r 문항정보조회
var sp_it_wt_cmn_qst_r = function(check_data) {

	$("#TB_DATA").html("");


	if(typeof(check_data)!="undefined") {
		$("#grade_term").val(check_data);
	}	

	$("#colsData").attr("colspan","1");

	tmpAREA_CODE = $("#area_code").val();
	tmpGRADE_TERM = pageParams.grade_term;

    


	if(tmpGRADE_TERM=="") {
		return;
	}

	var param = {
			in_area_code:tmpAREA_CODE,
			in_grade_term:tmpGRADE_TERM
            //in_grade_term:"A1"
	};


	pageParams_json = JSON.stringify( param );

	loader.service({
        Function : 'sp_it_wt_kid_cmn_qst_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){

			$("#TB_DATA").html("");
			if( $(data).find('Table').find( 'QST_NO' ).length>0 ){

				$("#colsData").attr("colspan","4");

				if(tmpAREA_CODE=="SE") {
					check_ANSWER_STATE = String(pageParams.ANSWER_SE).split("$");
				}
				if(tmpAREA_CODE=="CO") {
					check_ANSWER_STATE = String(pageParams.ANSWER_CO).split("$");
				}                
				if(tmpAREA_CODE=="LA") {
					check_ANSWER_STATE = String(pageParams.ANSWER_LA).split("$");
				} 
				if(tmpAREA_CODE=="EM") {
					check_ANSWER_STATE = String(pageParams.ANSWER_EM).split("$");
				}
				if(tmpAREA_CODE=="MA") {
					check_ANSWER_STATE = String(pageParams.ANSWER_MA).split("$");
				}



				$(data).find('Table').each(function(){

					tmp_QST_NO			= $(this).find( 'QST_NO' ).text();
					tmp_ANSWER_STATE	= $(this).find( 'ANSWER_STATE' ).text();
					tmp_ANSWER_IMG_YN	= $(this).find( 'ANSWER_IMG_YN' ).text();
					tmp_ANSWER_DSP_IT	= $(this).find( 'ANSWER_DSP_IT' ).text();

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
                    
                    if(pageParams.grade_term=="A")//만3~4세
                    {
                        cssImgO = "<span class='value-icon true'>O</span>";
                        cssImgX = "<span class='value-icon false'>X</span>";
                    }else{
                        cssImgO = "예";
                        cssImgX = "아니오";
                    }

					tmp_check_data="";
					tmp_check_data=tmp_check_data+"<li><input type='hidden' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state0' value='0' "+checked0+"  /></li>\n";                    
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state1' value='1' "+checked1+" /> <label for='exno_"+tmp_QST_NO+"_state1' onclick=\"\">"+cssImgO+"</label></li>\n";
					tmp_check_data=tmp_check_data+"<li><input type='radio' name='exno_"+tmp_QST_NO+"' id='exno_"+tmp_QST_NO+"_state2' value='2' "+checked2+" /> <label for='exno_"+tmp_QST_NO+"_state2' onclick=\"\">"+cssImgX+"</label></li>\n";


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
                jungdab_count = tmp_QST_NO;
                
			}else{
				app_alert($(data).find('Table1').find('MSG').text());
                return;
			}



		},
		Error: function($e){

			app_alert("Error:"+$e);
		}
	});
}

//@ sp_it_wt_kid_est_regist_c 신규모드
var sp_it_wt_kid_est_regist_c = function() {

	tmpGRADE_TERM = pageParams.grade_term;

	if(tmpGRADE_TERM=="") {
		return;
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

//응시체크된 코드
var tmpCodeList = [];
//정답표 예)1$1$1$1$2$...
var tmpAnswerList = [];

    $("#local.area-lnb > ul > li").not('.none').each(function(){

       var tmpList = $(this).attr("id");
           tmpList = tmpList.substring(tmpList.length-2,tmpList.length);
		for(var key in apply_chk){
			var val  = apply_chk[key];

            if( tmpList == key && val =="Y"  )
            {
                tmpCodeList.push(key);
                tmpAnswerList.push(eval( 'pageParams.ANSWER_'+key));

            }

		}
       
    });

    if(tmpCodeList.length<1)
    {
		app_showConfirm('응시한 과목이 없습니다.\n WAET 응시이력으로 돌아가시겠습니까? ', "경고", "weakSubmitOK","weakSubmitCancle");
		return false;
    }else{
        for(var i=0;i<tmpCodeList.length;i++){
            var codeVal  = tmpCodeList[i];
            var ansVal  = tmpAnswerList[i];
            if(ansVal.indexOf('0')>-1){
    			app_alert(areaCodeString(codeVal)+'영역의 답안을 모두 입력해 주세요.');
    			return false;
            }
        }
    }

    
var area_code_list = tmpCodeList.join('|');
var answer_list = tmpAnswerList.join('|');
 

	var param = {

 	        in_member_no:pageParams.KUNNR,
 	        in_member_name:String(pageParams.NAME1),
    		in_gender:gender,
    		in_emp_no:String(in_emp_no),
    		in_emp_name:String(in_emp_name),
    		in_est_date:String(tm_year+''+tm_month+''+tm_day),
    		in_service_code:"M",
            in_stage_code:pageParams.grade_term,
            in_age_seq:pageParams.age_seq,
            in_area_code_list:area_code_list,
            in_answer_list:answer_list
 
/*
      			in_member_no:"0020287380",
     			in_member_name:"김경화",
     			in_gender:"1",
     			in_emp_no:"17010504",
     			in_emp_name:"홍길동",
     			in_est_date:String(tm_year+''+tm_month+''+tm_day),
     			in_service_code:"M",
               in_stage_code:"A1",
                 in_age_seq:"27",
                 in_area_code_list:"CO|EM|LA|SE",
                 in_answer_list: "2$2$2$1$1$1$1$1$1$1$1$1$1$1$1$1$1$1|1$1$1$2$2$2$1$1$1$1$1$1|1$1$1$1$1$2$1$1$1$1$2$2|1$1$1$2$2$1$1$1$1$1$1$1$1$1"
 */

	};


	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_kid_est_regist_c',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
		  
			if( $(data).find('Table').length>0 && $(data).find('Table1').find('RET').text() == "0" ){ //정상 처리
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
                pageParams.SE_POINT = $(data).find('Table').find( 'SE_POINT' ).text();
                pageParams.SE_GRADE = $(data).find('Table').find( 'SE_GRADE' ).text();    
                pageParams.TSCORE_SE = $(data).find('Table').find( 'TSCORE_SE' ).text();
				pageParams.TSCORE_LA = $(data).find('Table').find( 'TSCORE_LA' ).text();
				pageParams.TSCORE_MA = $(data).find('Table').find( 'TSCORE_MA' ).text();
                pageParams.CO_POINT = $(data).find('Table').find( 'CO_POINT' ).text();
                pageParams.CO_GRADE = $(data).find('Table').find( 'CO_GRADE' ).text();
                pageParams.TSCORE_CO = $(data).find('Table').find( 'TSCORE_CO' ).text();
                pageParams.EM_POINT = $(data).find('Table').find( 'EM_POINT' ).text();
                pageParams.EM_GRADE = $(data).find('Table').find( 'EM_GRADE' ).text();
                pageParams.TSCORE_EM = $(data).find('Table').find( 'TSCORE_EM' ).text();


				//
				ZTBSD_GM_WEAT_005();
			}else{
				app_alert($(data).find('Table1').find('MSG').text());
                return;
			}
		},
		Error: function($e){
			app_alert($e);
            return;
            
		}
	});
}


//응시이력으로 넘어감.
var weakSubmitOK = function(){
    app_changePage("D010400.html", pageParams, false);
}
var weakSubmitCancle = function(){
    
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
			AJUMS:pageParams.CO_POINT,//# 인지영역점수
			BJUMS:pageParams.SE_POINT,//# 감각운동영역점수
			CJUMS:pageParams.EM_POINT,//# 사회정서영역점수
			EJUMS:"-",//# 영어영역점수
			AGUN2:pageParams.CO_GRADE,//# 인지단계
			AGUN4:pageParams.TSCORE_CO,//# 인지T점수
			BGUN2:pageParams.SE_GRADE,//# 감각운동단계
			BGUN4:pageParams.TSCORE_SE,//# 감각운동T점수
			CGUN2:pageParams.EM_GRADE,//# 사회정서단계
			CGUN4:pageParams.TSCORE_EM,//# 사회정서T점수
			EGUN2:"0",//# 영어단계
			EGUN4:"0"//# 영어T점수
	}


	loader.load( {
		Function: "ZTBSD_GM_WEAT_005",
		Parameter:{
			S_IMPORTA:tmp_S_IMPORTA
		},
		Success: function($data){

			app_changePage( "D030200.html", pageParams, true );

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
			if($("#area_code").val()=="SE") {
				$('#gradeCon').find('em').html("감각운동");
			} 
			if($("#area_code").val()=="EM") {
				$('#gradeCon').find('em').html("사회정서");
			}
			if($("#area_code").val()=="LA") {
				$('#gradeCon').find('em').html("언어영역");
			}
			if($("#area_code").val()=="CO") {
				$('#gradeCon').find('em').html("인지영역");
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

var tab_select_area = function(Varea_code ){
    

var grade_term =$("#grade_term").val();

    if(pageParams.grade_term=="A3" ){

        if(Varea_code=="CO") {
    		
    		$("#navCO").addClass("active");
    		$(".section_name").html("인지");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('LA');");
    		return;
    	}else if(Varea_code=="LA") {
    
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('EM');");
    		return;
    	}else if(Varea_code=="EM") {
    
    		
    		$("#navEM").addClass("active");
    		$(".section_name").html("사회정서");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("채점");
    		$("#submitButton").attr("onclick","sp_it_wt_kid_est_regist_c();");
    		return;
        }


    }else if(pageParams.grade_term=="A"){


        if(Varea_code=="LA") {
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('MA');");
    		return;
        }else if(Varea_code=="MA") {
    
    		
    		$("#navMA").addClass("active");
    		$(".section_name").html("수리");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("채점");
    		$("#submitButton").attr("onclick","sp_it_wt_kid_est_regist_c();");
    		return;
    	}
    

        
    }else{

    	if(Varea_code=="SE") {
    		
    		$("#navSE").addClass("active");
    		$(".section_name").html("감각운동");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('CO');");
    		return;
    	}else if(Varea_code=="CO") {
    
    		
    		$("#navCO").addClass("active");
    		$(".section_name").html("인지");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('LA');");
    		return;
    	}else if(Varea_code=="LA") {
    
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("다음");
    		$("#submitButton").attr("onclick","move_area('EM');");
    		return;
    	}else if(Varea_code=="EM") {
    
    		
    		$("#navEM").addClass("active");
    		$(".section_name").html("사회정서");
    		sp_it_wt_cmn_qst_r();
    
    		$("#submitButton").html("채점");
    		$("#submitButton").attr("onclick","sp_it_wt_kid_est_regist_c();");
    		return;
        }
    



    }

    
    
    
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


//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}


//새로고침
var refresh = function(){
	window.location.href = 'D030100.html' + '?dummy=' + (Math.random() * Math.random());
}
