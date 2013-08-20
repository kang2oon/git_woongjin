/**
 * 이번주 학습정보 씽크U
 * */


//단계로드
function dataload_dange_u() {

    //첫 수업일이 아직 안된 것 제외
	if( $.trim($("#"+ZMAT1_SELECT_DATA+"_next_s.menu"+MENU_CLICK_INDEX).val())=="X" ) {
			visibility_data_comment(false, "첫 수업일이 도래 하지 않았습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
	}    
	//# 비관리과목 제외 처리
	if($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).hasClass('subject_txt_color3')) {
		visibility_data_comment(false, "유아 및 비관리 과목은 이번주학습정보를<br>지원하지 않습니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;
	}
	//# 비관리과목 제외 처리 끝

	//# 이번주학습 비관리 제외
	if( filter[tmp_SUBJECT_CODE]==undefined ){

		visibility_data_comment(false, "이번주학습정보와 학부모상담자료를<br>제공하지 않는 과목입니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;
	}
	//# 이번주학습 비관리 제외 끝
	menu_text_set();

	if($("#"+ZMAT1_SELECT_DATA+"_section").attr("ZMAT1_TX").indexOf("수학")>=0) {
		$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("수학");
	} 
	if($("#"+ZMAT1_SELECT_DATA+"_section").attr("ZMAT1_TX").indexOf("국어")>=0) {
		$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("국어");
	} 

	$("#"+ZMAT1_SELECT_DATA+"_section").find("button").css("display","");
	// ** 코드 할당
	course_code = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("COURSE_CODE");

	var param = {
			in_course_code : course_code,
			in_erp_order_no : ZMAT1_SELECT_DATA,
			in_menu_code : 'CL02'
	}
	pageParams_json = JSON.stringify( param );


	loader.service({
		Function : 'sp_it_cls_edition_menu_s_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){

			setTimeout(function() { dataload_dange_u_Success(data); }, 100);


		},
		Error: function($e){
			visibility_data_comment(false, "계획된 진도가 없습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		}
	});

}

//단계데이터 로드 완료
var dataload_dange_u_Success = function(data) {

	split_STATE_NAME = "";
	SELECTED_STATE_NAME = "";

	try
	{
		if($(data).find('Table1').find('ORDER_SEQ').text().length<2) {
			visibility_data_comment(false, "계획된 진도가 없습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
		}
		if($(data).find('Table').length<=0) {
			visibility_data_comment(false, "계획된 진도가 없습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
		}
	}
	catch (e)
	{
		visibility_data_comment(false, "계획된 진도가 없습니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;
	}


	if( $(data).find('Table').length>0 ){

		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO", $(data).find('Table').length);
		$("#"+ZMAT1_SELECT_DATA+"_JINDO_ALL.menu"+MENU_CLICK_INDEX).html("");
		tmp_html="";
		$(data).find('Table').each(function(){
			tmp_STAGE_NAME	= $(this).find( 'STAGE_NAME' ).text();
			tmp_STAGE_SEQ	= $(this).find( 'STAGE_SEQ' ).text();
			tmp_DANGE_SEQ	= $(this).find( 'EDITION_SEQ' ).text();
			tmp_DANGE_NAME	= $(this).find( 'EDITION_NAME' ).text();
			tmp_SELECTED	= $(this).find( 'DEFAULT_YN' ).text();
			if(split_STATE_NAME!=tmp_STAGE_NAME) {
				tmp_html=tmp_html+"<option value='"+tmp_STAGE_NAME+"' STAGE_SEQ='"+tmp_STAGE_SEQ+"'>"+tmp_STAGE_NAME+"</option>";
				split_STATE_NAME=tmp_STAGE_NAME;
			}
			if(tmp_SELECTED=="Y" && DANGE_CHANGE_DATA=="") {
				SELECTED_STATE_NAME=tmp_STAGE_NAME;
			}
			if(DANGE_CHANGE_DATA==tmp_STAGE_SEQ) {
				SELECTED_STATE_NAME=tmp_STAGE_NAME;
			}
			$("#"+ZMAT1_SELECT_DATA+"_JINDO_ALL.menu"+MENU_CLICK_INDEX).append("<option DATA='"+tmp_STAGE_SEQ+"@@"+tmp_STAGE_NAME+"@@"+tmp_DANGE_SEQ+"@@"+tmp_DANGE_NAME+"@@'>"+tmp_STAGE_SEQ+"@@"+tmp_STAGE_NAME+"@@"+tmp_DANGE_SEQ+"@@"+tmp_DANGE_NAME+"@@</option>");
		});
		$(object_tmp).html(tmp_html);
		$(object_tmp).val(SELECTED_STATE_NAME).attr("selected", "selected");

		if(SELECTED_STATE_NAME=="") {
			$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html("");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT",$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html());
			visibility_data_comment(false, "계획된 진도가 없습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
		}
		DANGE_change(ZMAT1_SELECT_DATA, SELECTED_STATE_NAME);
	} else {
		//
	}
	visibility_data_comment(true);
}

//단계변경
function DANGE_change_u() {
	$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("");
	$("#"+ZMAT1_SELECT_DATA+"_goal_score2_text").html("");
	course_code = $("#"+ZMAT1_SELECT_DATA+"_section").attr("COURSE_CODE");
	$("."+ZMAT1_SELECT_DATA+"_goal_score2_div").css("display","none");
	//
	if($("#"+ZMAT1_SELECT_DATA+"_section").attr("COURSE_CODE")=="SOSC") {
		$("."+ZMAT1_SELECT_DATA+"_goal_score2_div").css("display","");
		$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("사회");
		$("#"+ZMAT1_SELECT_DATA+"_goal_score2_text").html("과학");
	}
	//
	var param = {
			in_course_code : course_code,
			in_erp_order_no : ZMAT1_SELECT_DATA,
			in_menu_code : 'CL02'
	}
	pageParams_json = JSON.stringify( param );
	//
	loader.service({
		Function : 'sp_it_cls_edition_menu_s_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
			SELECTED_DANGE_NAME = "";
			SELECTED_REVISE_YN = "";
			temp_max_num=0;
			if( $(data).find('Table').length>0 ){
				$(data).find('Table').each(function(){
					tmp_STAGE_NAME	= $(this).find( 'STAGE_NAME' ).text();
					tmp_STAGE_SEQ	= $(this).find( 'STAGE_SEQ' ).text();
					tmp_DANGE_SEQ	= $(this).find( 'EDITION_SEQ' ).text();
					tmp_DANGE_NAME	= $(this).find( 'EDITION_NAME' ).text();
					tmp_EDITION_SEQ	= $(this).find( 'EDITION_SEQ' ).text();
					tmp_SELECTED	= $(this).find( 'DEFAULT_YN' ).text();
					tmp_REVISE_YN	= $(this).find( 'REVISE_YN' ).text();
					tmp_ORDER_SEQ	= $(data).find('Table1').find('ORDER_SEQ').text();
					tmp_STUDY_SUBJECT	= $(this).find( 'STUDY_SUBJECT' ).text();
					tmp_LVL_OPTION		= $(this).find( 'LVL_OPTION' ).text();
					tmp_EDITION_TYPE	= $(this).find( 'EDITION_TYPE' ).text();
					if(DANGE_SELECT_DATA==tmp_STAGE_NAME) {
						$(object_tmp).append("<option value='"+tmp_DANGE_NAME+"' STAGE_SEQ='"+tmp_STAGE_SEQ+"' EDITION_TYPE='"+tmp_EDITION_TYPE+"' LVL_OPTION='"+tmp_LVL_OPTION+"' STUDY_SUBJECT='"+tmp_STUDY_SUBJECT+"' REVISE_YN='"+tmp_REVISE_YN+"' EDITION_SEQ='"+tmp_EDITION_SEQ+"' ORDER_SEQ='"+tmp_ORDER_SEQ+"'>"+tmp_DANGE_NAME+"</option>");
						temp_max_num=temp_max_num+1
					}
					if(tmp_SELECTED=="Y" && JINDO_CHANGE_DATA=="") {
						SELECTED_DANGE_NAME	=tmp_DANGE_NAME;
						SELECTED_REVISE_YN	=tmp_REVISE_YN;
					}
					if(JINDO_CHANGE_DATA==tmp_DANGE_SEQ) {
						SELECTED_DANGE_NAME=tmp_DANGE_NAME;
						SELECTED_REVISE_YN	=tmp_REVISE_YN;
					}
				});
				$(object_tmp).val(SELECTED_DANGE_NAME).attr("selected", "selected");
				JINDO_SELECT_MAX=temp_max_num;
				$("#"+ZMAT1_SELECT_DATA+"_section").attr("LISTMAX",JINDO_SELECT_MAX);
				$("#"+ZMAT1_SELECT_DATA+"_section").attr("REVISE_YN",SELECTED_REVISE_YN);
				//
				JINDO_change(ZMAT1_SELECT_DATA, '', '');
			} else {
				//
			}
		},
		Error: function($e){
			app_alert("단계 데이터가 없습니다.");
		}
	});

}


//진도 변경
function JINDO_change_u() {
	index = $('#'+ZMAT1_SELECT_DATA+'_JINDO option').index($('#'+ZMAT1_SELECT_DATA+'_JINDO option:selected'));
	jindo_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("EDITION_SEQ");
	stlkn_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("ORDER_SEQ");
	tmp_study_subject = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("STUDY_SUBJECT");
	tmp_LVL_OPTION =$('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr( 'LVL_OPTION' );
	tmp_EDITION_TYPE =$('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr( 'EDITION_TYPE' );
	//
	menu_text_reload(true);
	//
	var date = new Date(); 
	mm = (date.getMonth()+1);
	if(mm < 10){ 
		mm = "0";
		mm = "0"+(date.getMonth()+1);
	}
	day = (date.getDate());
	if(day < 10) day = "0"+(date.getDate());
	//
	$("#"+ZMAT1_SELECT_DATA+"_visit_date").val(date.getFullYear()+"-"+(mm)+"-"+day);
	tmp_study_subject = tmp_study_subject.replace(/#n/g, "<br/>");
	tmp_study_subject_data = tmp_study_subject.split("##");
	$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT").html(tmp_study_subject_data[0]);
	if(String(tmp_study_subject_data[1])!="undefined" && String(tmp_study_subject_data[1])!="(null)") {
		$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT2").html(tmp_study_subject_data[1]);
	}

	if(tmp_LVL_OPTION=="1") {
		$("#"+ZMAT1_SELECT_DATA+"_cls_level").val("1");
	}
	if(tmp_LVL_OPTION=="2") {
		$("#"+ZMAT1_SELECT_DATA+"_cls_level").val("2");
	} 
	if(tmp_LVL_OPTION=="3") {
		$("#"+ZMAT1_SELECT_DATA+"_cls_level").val("1&2");
	} 
	if(tmp_LVL_OPTION=="") {
		$("#"+ZMAT1_SELECT_DATA+"_cls_level").val("미지정");
	}

	$("."+ZMAT1_SELECT_DATA+"_goal_score_div").css("display","none");
	$("."+ZMAT1_SELECT_DATA+"_week_leve_div").css("display","none");
	$("."+ZMAT1_SELECT_DATA+"_week_leveDS_div").css("display","none");

	switch(tmp_EDITION_TYPE) {
		case "BG":
			$("."+ZMAT1_SELECT_DATA+"_week_leve_div").css("display","");
			break;
		case "H40":
			$("."+ZMAT1_SELECT_DATA+"_week_leveDS_div").css("display","");
			$("#edition_type_comment").html("해당 호에는 과정테스트가 없습니다.");
			break;
		case "DS":
			$("."+ZMAT1_SELECT_DATA+"_week_leveDS_div").css("display","");
			$("#edition_type_comment").html("독서호는 과정테스트가 없습니다.");
			break;
		default:
			$("."+ZMAT1_SELECT_DATA+"_goal_score_div").css("display","");
	
		if($("#"+ZMAT1_SELECT_DATA+"_section").attr("ZMAT1_TX").indexOf("수학")>=0) {
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("수학");
		} 
		if($("#"+ZMAT1_SELECT_DATA+"_section").attr("ZMAT1_TX").indexOf("국어")>=0) {
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("국어");
		}
                        
        //씽크U한자 호가 4배수외에는 목표점수 입력 받지 않음. NDH 2013.02.07
        var HO_NUM = JINDO_TEXT.split("호")[0];
        if(course_code == "CHCH" && (parseInt(HO_NUM,10)%4 > 0)){
            //alert('4의 배수가 아님');
			$("."+ZMAT1_SELECT_DATA+"_goal_score_div").css("display","none");
			$("."+ZMAT1_SELECT_DATA+"_week_leveDS_div").css("display","");
			$("label#edition_type_comment").html("해당 호에는 과정테스트가 없습니다.");
            
        }
        
                                        
	};

	$("#"+ZMAT1_SELECT_DATA+"_FINISH_TEXT").css("display","");
	$("#"+ZMAT1_SELECT_DATA+"_date_picker").css("display","");
	$("#"+ZMAT1_SELECT_DATA+"_goal_score").attr("disabled", false); 
	$("#"+ZMAT1_SELECT_DATA+"_goal_score").css("background-color","");
	$("#"+ZMAT1_SELECT_DATA+"_goal_score2").attr("disabled", false); 
	$("#"+ZMAT1_SELECT_DATA+"_goal_score2").css("background-color","");
	$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("");
	$("#"+ZMAT1_SELECT_DATA+"_goal_score2_text").html("");

	$('#'+ZMAT1_SELECT_DATA+'_STUDY_TB').html("");

	if(tmp_EDITION_TYPE=="BG" && $("#"+ZMAT1_SELECT_DATA+"_cls_level").val()=="미지정") {
		openLevel_windows();
		return;
	}

	var param = {
			in_course_code : course_code,
			in_edition_seq : jindo_code,
			in_order_seq : stlkn_code
	}
	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_cls_study_plan_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
			if( $(data).find('Table').length>0 ){
				setTimeout(function() { JINDO_change_u_Success(data); }, 100);
                //trace($(data).find('Table').text());
			}else{
				app_alert("데이터가 없습니다.");
			}
		},
		Error: function($e){
		}
	});

}


//진도 로드 완료
function JINDO_change_u_Success(data) {

	index = $('#'+ZMAT1_SELECT_DATA+'_JINDO option').index($('#'+ZMAT1_SELECT_DATA+'_JINDO option:selected'));

	jindo_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("EDITION_SEQ");
	stlkn_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("ORDER_SEQ");
	tmp_study_subject = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("STUDY_SUBJECT");

	tmp_LVL_OPTION =$('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr( 'LVL_OPTION' );
	tmp_EDITION_TYPE =$('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr( 'EDITION_TYPE' );

	var date = new Date(); 
	mm = (date.getMonth()+1);
	if(mm < 10){ 
		mm = "0";
		mm = "0"+(date.getMonth()+1);
	}
	day = (date.getDate());
	if(day < 10) day = "0"+(date.getDate());


	$("#"+ZMAT1_SELECT_DATA+"_visit_date").val(date.getFullYear()+"-"+(mm)+"-"+day);

	tmp_study_subject = tmp_study_subject.replace(/#n/g, "<br/>");
	tmp_study_subject_data = tmp_study_subject.split("##");
	$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT").html(tmp_study_subject_data[0]);

	if(String(tmp_study_subject_data[1])!="undefined" && String(tmp_study_subject_data[1])!="(null)") {
		$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT2").html(tmp_study_subject_data[1]);
	}

	split_STATE_NAME = "";
	SELECTED_STATE_NAME = "";
    


	if( $(data).find('Table').length>0 ){
		$(data).find('Table').each(function(index, item){

			tmp_DAY_NAME		= $(this).find( 'DAY_NAME' ).text();
			tmp_PLAN_DATE		= $(this).find( 'PLAN_DATE' ).text();
			tmp_PLAN_WEEK		= $(this).find( 'PLAN_WEEK' ).text();
			tmp_PLAN_TIME		= $(this).find( 'PLAN_TIME' ).text();
			tmp_PLAN_TIME		= tmp_PLAN_TIME.substr(0,2)+":"+tmp_PLAN_TIME.substr(2,2);
			tmp_WRITE_STATUS	= $(this).find( 'WRITE_STATUS' ).text();
			tmp_SUBJECT	= $(data).find('Table1').find( 'SUBJECT' ).text();


			tmp_year	= $(this).find( 'PLAN_DATE' ).text().substr(0,4);
			tmp_month	= $(this).find( 'PLAN_DATE' ).text().substr(4,2);
			tmp_day		= $(this).find( 'PLAN_DATE' ).text().substr(6,2);
			tmp_PLAN_DATE = tmp_year+"-"+tmp_month+"-"+tmp_day;

			if(tmp_WRITE_STATUS=="Y") tmp_PLAN_DATE=tmp_PLAN_DATE+" <button type='button' class='button-style s-size global' onclick=\"vCheckDay="+(index+1)+";openCalendar_windows('"+(index+1)+"');\">변경</button>";
			if(tmp_WRITE_STATUS=="Y") tmp_PLAN_TIME=tmp_PLAN_TIME+" <button type='button' class='button-style s-size global' onclick=\"vCheckDay="+(index+1)+";openTime_windows('"+(index+1)+"');\">변경</button>";

			if(tmp_SUBJECT=="SO") tmp_SUBJECT="사회";
			if(tmp_SUBJECT=="SC") tmp_SUBJECT="과학";
			if(tmp_SUBJECT!="" && index>=0 && index<=1) tmp_DAY_NAME=tmp_DAY_NAME+"("+tmp_SUBJECT+")";
			if(tmp_SUBJECT!="" && index>=2 && index<=3) {
				if(tmp_SUBJECT=="사회") tmp_SUBJECT="과학";
				else if(tmp_SUBJECT=="과학") tmp_SUBJECT="사회";
				tmp_DAY_NAME=tmp_DAY_NAME+"("+tmp_SUBJECT+")";
			}
			tmp_SUBJECT	= $(data).find('Table1').find( 'SUBJECT' ).text();

			tmp_html = $('#'+ZMAT1_SELECT_DATA+'_STUDY_TB').html()+
			"<tr>"+
			"	<td SUBJECT_CODE='"+tmp_SUBJECT+"' write_status='"+tmp_WRITE_STATUS+"'>"+tmp_DAY_NAME.substring(0,1)+"</td>"+
			"	<td>"+tmp_PLAN_DATE+"</td>"+
			"	<td>"+tmp_PLAN_WEEK+"</td>"+
			"	<td>"+tmp_PLAN_TIME+"</td>"+
			"</tr>";

			$('#'+ZMAT1_SELECT_DATA+'_STUDY_TB').html(tmp_html);


		});


		tmp_year	= $(data).find('Table1').find( 'VISIT_DATE' ).text().substr(0,4);
		tmp_month	= $(data).find('Table1').find( 'VISIT_DATE' ).text().substr(4,2);
		tmp_day		= $(data).find('Table1').find( 'VISIT_DATE' ).text().substr(6,2);

		/***오늘날짜로 강제세팅***/
		var date = new Date(); 
		mm = (date.getMonth()+1);
		if(mm < 10) mm = "0"+(date.getMonth()+1);
		day = (date.getDate());
		if(day < 10) day = "0"+(date.getDate());
		$("#"+ZMAT1_SELECT_DATA+"_visit_date").html(date.getFullYear()+"-"+(mm)+"-"+day);



		if($("#"+ZMAT1_SELECT_DATA+"_section").attr("COURSE_CODE")=="SOSC") {

			$("."+ZMAT1_SELECT_DATA+"_goal_score2_div").css("display","");
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("사회");
			$("#"+ZMAT1_SELECT_DATA+"_goal_score2_text").html("과학");

		}


		//@ 복습여부에 따른 처리
		if($('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("REVISE_YN")=="Y") {

			$("#"+ZMAT1_SELECT_DATA+"_FINISH_TEXT").html("복습하기");

			//@ 목표점수
			$("#"+ZMAT1_SELECT_DATA+"_goal_score").val("");
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_back").val("");

			if($("#"+ZMAT1_SELECT_DATA+"_section").attr("COURSE_CODE")=="SOSC") {
				$("#"+ZMAT1_SELECT_DATA+"_goal_score2").val("");
				$("#"+ZMAT1_SELECT_DATA+"_goal_score_back2").val("");
				$("#"+ZMAT1_SELECT_DATA+"_goal_score_text").html("사회");
				$("#"+ZMAT1_SELECT_DATA+"_goal_score2_text").html("과학");
			}

		} else {


			//@ 목표점수
			tmp_GoalScore = $(data).find('Table1').find( 'GOAL_SCORE' ).text();
			if(tmp_GoalScore=="") {
				tmp_GoalScore="";
			}
			if(parseInt(tmp_GoalScore)<0) {
				tmp_GoalScore=80;
			}
			$("#"+ZMAT1_SELECT_DATA+"_goal_score").val(tmp_GoalScore);
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_back").val(tmp_GoalScore);


			tmp_GoalScore = $(data).find('Table1').find( 'GOAL_SCORE1' ).text();
			if(tmp_GoalScore=="") {
				tmp_GoalScore="";
			}
			if(parseInt(tmp_GoalScore)<0) {
				tmp_GoalScore=80;
			}
			$("#"+ZMAT1_SELECT_DATA+"_goal_score2").val(tmp_GoalScore);
			$("#"+ZMAT1_SELECT_DATA+"_goal_score_back2").val(tmp_GoalScore);


			if($(data).find('Table1').find( 'FINISH' ).text()=="Y") {

				$("#"+ZMAT1_SELECT_DATA+"_date_picker").css("display","none");

				$("#"+ZMAT1_SELECT_DATA+"_goal_score").css("background-color","#d0d0d0");
				$("#"+ZMAT1_SELECT_DATA+"_goal_score").attr("disabled", true); 

				$("#"+ZMAT1_SELECT_DATA+"_goal_score2").css("background-color","#d0d0d0");
				$("#"+ZMAT1_SELECT_DATA+"_goal_score2").attr("disabled", true); 

				$("#"+ZMAT1_SELECT_DATA+"_visit_date").html(tmp_year+"-"+tmp_month+"-"+tmp_day);
				$("#"+ZMAT1_SELECT_DATA+"_FINISH_TEXT").css("display","none");

			} else {

				$("#"+ZMAT1_SELECT_DATA+"_FINISH_TEXT").html("계획약속하기");
				$("#"+ZMAT1_SELECT_DATA+"_section").attr('REVISE_YN','Y')

			}


		}

	} else {
	}


	top_scroll();
}