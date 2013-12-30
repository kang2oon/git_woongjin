/**
 * 

 * 지난주 학습점검
 * 
 * 공통 - A020100.js
 * 싱크빅 - A020100_b.js
 * 싱크u - A020100_u.js
 * 
 * */


/**
 * 단계/호 조회
 * sp_it_cls_edition_menu_s_r
 * */
function dataload_dange_u() {
    //첫 수업일이 아직 안된 것 제외
	if( $.trim($("#"+ZMAT1_SELECT_DATA+"_next_s.menu"+MENU_CLICK_INDEX).val())=="X" ) {
			visibility_data_comment(false, "첫 수업일이 도래 하지 않았습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
	}


	$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("button").css("display","");
	course_code = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("COURSE_CODE");




	//# 비관리과목 제외 처리

	if($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).hasClass('subject_txt_color3')) {

		visibility_data_comment(false, "유아 및 비관리 과목은 지난주학습점검을<br>지원하지 않습니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;

	}

	//# 비관리과목 제외 처리 끝





	//# 정답지 비관리 제외 시작

	if($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).hasClass('subject_txt_color1')) {

		if( filter[tmp_SUBJECT_CODE]==undefined ){

			visibility_data_comment(false, "정답지 관리 과목군이 아닙니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
		}

	}

	//# 정답지 비관리 제외 끝


	menu_text_set();

	var param = {
			in_course_code : course_code,
			in_erp_order_no : $.trim(String(ZMAT1_SELECT_DATA)),
			in_menu_code : 'CL01'
	}

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_cls_edition_menu_s_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){


			XML_SELECT_REQUEST_DATA = data;
			split_STATE_NAME = "";
			SELECTED_STATE_NAME = "";

			try
			{
				if($(data).find('Table1').find('ORDER_SEQ').text().length<2 ) {

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
				$("#"+ZMAT1_SELECT_DATA+"_JINDO_ALL.menu"+MENU_CLICK_INDEX).html("");

				$(data).find('Table').each(function(){

					tmp_STAGE_NAME		= $(this).find( 'STAGE_NAME' ).text();
					tmp_STAGE_SEQ		= $(this).find( 'STAGE_SEQ' ).text();
					tmp_DANGE_SEQ		= $(this).find( 'EDITION_SEQ' ).text();
					tmp_DANGE_NAME		= $(this).find( 'EDITION_NAME' ).text();
					tmp_SELECTED		= $(this).find( 'DEFAULT_YN' ).text();

					if(split_STATE_NAME!=tmp_STAGE_NAME) {

						$(object_tmp).append("<option value='"+String(tmp_STAGE_NAME)+"' STAGE_SEQ='"+String(tmp_STAGE_SEQ)+"'>"+String(tmp_STAGE_NAME)+"</option>");
						split_STATE_NAME=tmp_STAGE_NAME;

					}
					if(tmp_SELECTED=="Y" && DANGE_CHANGE_DATA=="") {
						SELECTED_STATE_NAME=tmp_STAGE_NAME;
					}
					if(DANGE_CHANGE_DATA==tmp_STAGE_SEQ) {
						SELECTED_STATE_NAME=tmp_STAGE_NAME;
					}

					$("#"+ZMAT1_SELECT_DATA+"_JINDO_ALL.menu"+MENU_CLICK_INDEX).append("<option DATA='"+tmp_STAGE_SEQ+"@@"+tmp_STAGE_NAME+"@@"+tmp_DANGE_SEQ+"@@"+tmp_DANGE_NAME+"@@'></option>");

				});
			}
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO", $(data).find('Table').length);

			if(Number($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO"))>0) {

				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","");
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","none");
			} else {
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","none");
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","");
			}


			$(object_tmp).val(SELECTED_STATE_NAME).attr("selected", "selected");

			DANGE_change(ZMAT1_SELECT_DATA, SELECTED_STATE_NAME);

		},
		Error: function($e){
			visibility_data_comment(false, "계획된 진도가 없습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");

		}
	});
}


// 단계 변경시 호출
function DANGE_change_u() {

	$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LAST_DANGE", DANGE_SELECT_DATA);

	SELECTED_DANGE_NAME = "";
	temp_max_num=0;


	$(XML_SELECT_REQUEST_DATA).find('Table').each(function(){

		tmp_STAGE_NAME		= $(this).find( 'STAGE_NAME' ).text();
		tmp_DANGE_SEQ		= $(this).find( 'EDITION_SEQ' ).text();
		tmp_DANGE_NAME		= $(this).find( 'EDITION_NAME' ).text();
		tmp_EDITION_SEQ		= $(this).find( 'EDITION_SEQ' ).text();
		tmp_SELECTED		= $(this).find( 'DEFAULT_YN' ).text();
		tmp_ORDER_SEQ		= $(XML_SELECT_REQUEST_DATA).find('Table1').find('ORDER_SEQ').text();
		tmp_ERP_COURSE_CODE		= $(this).find( 'ERP_COURSE_CODE' ).text();
		tmp_ERP_STAGE_CODE		= $(this).find( 'ERP_STAGE_CODE' ).text();
		tmp_ERP_EDITION_CODE	= $(this).find( 'ERP_EDITION_CODE' ).text();

		if(DANGE_SELECT_DATA==tmp_STAGE_NAME) {

			$(object_tmp).append("<option value='"+tmp_DANGE_NAME+"' EDITION_SEQ='"+tmp_EDITION_SEQ+"' ORDER_SEQ='"+tmp_ORDER_SEQ+"' ERP_COURSE_CODE='"+tmp_ERP_COURSE_CODE+"' ERP_STAGE_CODE='"+tmp_ERP_STAGE_CODE+"' ERP_EDITION_CODE='"+tmp_ERP_EDITION_CODE+"'>"+tmp_DANGE_NAME+"</option>");
			temp_max_num=temp_max_num+1

		}


		if(tmp_SELECTED=="Y" && JINDO_CHANGE_DATA=="") {
			SELECTED_DANGE_NAME	=tmp_DANGE_NAME;
		}
		if(JINDO_CHANGE_DATA==tmp_DANGE_SEQ) {
			SELECTED_DANGE_NAME=tmp_DANGE_NAME;
		}
	});

	JINDO_SELECT_MAX=temp_max_num;
	$("#"+ZMAT1_SELECT_DATA+"_section").attr("LISTMAX",JINDO_SELECT_MAX);


	if(SELECTED_DANGE_NAME=="") {
		visibility_data_comment(false, "계획된 진도가 없습니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;
	}

	$(object_tmp).val(SELECTED_DANGE_NAME).attr("selected", "selected");
	JINDO_change(ZMAT1_SELECT_DATA, '','');
}


// 진도 변경시 호출
function JINDO_change_u() {

	index = $('#'+ZMAT1_SELECT_DATA+'_JINDO option').index($('#'+ZMAT1_SELECT_DATA+'_JINDO option:selected'));
	jindo_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("EDITION_SEQ");
	stlkn_code = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("ORDER_SEQ");

	menu_text_reload(true);
	$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LAST_JINDO", jindo_code);


	$(XML_SELECT_REQUEST_DATA).find('Table').each(function(){

		tmp_DANGE_SEQ	= $(this).find( 'EDITION_SEQ' ).text();

		if(tmp_DANGE_SEQ==jindo_code) {
			tmp_study_subject = "";
			tmp_study_subject = $(this).find( 'STUDY_SUBJECT' ).text().replace(/#n/g, "<br/>");

			tmp_study_subject = tmp_study_subject.replace(/#n/g, "<br/>");
			tmp_study_subject_data = tmp_study_subject.split("##");
			$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT").html(tmp_study_subject_data[0]);
			$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT2").css("display","none");
			if(String(tmp_study_subject_data[1])!="undefined" && !!tmp_study_subject_data[1] && String(tmp_study_subject_data[1])!="(null)") {
				$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT2").css("display","");
				$("#"+ZMAT1_SELECT_DATA+"_STUDY_SUBJECT2").html(tmp_study_subject_data[1]);
			}

			tmp_LVL_OPTION =$(this).find( 'LVL_OPTION' ).text();
			$(".select_level").css("display","");
			switch(tmp_LVL_OPTION)
			{
			case "1":
				$("#cls_level").html("<span>l</span>");
				break;
			case "2":
				$("#cls_level").html("<span>2</span>");
				break;
			case "3":
				$("#cls_level").html("<span>l</span>+<span>2</span>");
				break;
			default:
				$(".select_level").css("display","none");
			}

		}
	});
	$('#'+ZMAT1_SELECT_DATA+'_STUDY_TB').html("");



	var param = {
			in_course_code : course_code,
			in_edition_seq : jindo_code,
			in_order_seq : stlkn_code
	}

	pageParams_json = JSON.stringify( param );

	if( jindo_code==undefined || stlkn_code==undefined ){
		app_alert("데이터가 없습니다.");
		return false;
	}

	loader.service({
		Function : 'sp_it_cls_study_result_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){

			split_STATE_NAME = "";
			SELECTED_STATE_NAME = "";
			STUDY_STATUS_LIST = "";
			STUDY_DAY_SEQ_LIST = "";
			STUDY_STUDY_POP_OPEN_YN_LIST = "";

			if( $(data).find('Table').length>0 ){
				$(data).find('Table').each(function(){

					tmp_DAY_SEQ			= $(this).find( 'DAY_SEQ' ).text();
					tmp_DAY_NAME		= $(this).find( 'DAY_NAME' ).text();
					tmp_END_TIME		= $(this).find( 'END_TIME' ).text();
					tmp_POINT_SUM		= $(this).find( 'POINT_SUM' ).text();
					tmp_STUDY_STATUS	= $(this).find( 'STUDY_STATUS' ).text();
					tmp_STUDY_STATUS_CODE	= $(this).find( 'STUDY_STATUS_CODE' ).text();
					try
					{
						tmp_ONLINE_TAG	= $(this).find( 'ONLINE_TAG' ).text();
						tmp_STUDY_POP_OPEN_YN_CODE	= $(this).find( 'POP_OPEN_YN' ).text();
					}
					catch (e)
					{
						tmp_ONLINE_TAG	= "N";
						tmp_STUDY_POP_OPEN_YN_CODE	= "N";
					}

					if(tmp_POINT_SUM=="0") tmp_POINT_SUM="-";

					if(tmp_END_TIME=="") tmp_END_TIME="-";
					else {
						tmp_year	= $(this).find( 'END_TIME' ).text().substr(0,4);
						tmp_month	= $(this).find( 'END_TIME' ).text().substr(4,2);
						tmp_day		= $(this).find( 'END_TIME' ).text().substr(6,2);
						tmp_END_TIME = tmp_year+"-"+tmp_month+"-"+tmp_day+" "+$(this).find( 'END_TIME' ).text().substr(8,2)+":"+$(this).find( 'END_TIME' ).text().substr(10,2);
					}

					if(tmp_STUDY_STATUS=="완료") tmp_STUDY_STATUS="<strong class='complete'>완료</strong>";
					if(tmp_STUDY_STATUS=="진행") tmp_STUDY_STATUS="<strong class='progress'>진행</strong>";

					//# 교재 학습 여부
					if(tmp_ONLINE_TAG=="N") {

						tmp_HTML = "";

						if(tmp_STUDY_STATUS.indexOf("미진행")>=0) {
							tmp_HTML = tmp_HTML+"<tr><td scope='row'>"+tmp_DAY_NAME+"</td><td colspan=3>교재로 진행되는 일자입니다.</td>";
							tmp_HTML = tmp_HTML+"</tr>";
						} else {
							tmp_HTML = tmp_HTML+"<tr><td scope='row'>"+tmp_DAY_NAME+"</td><td colspan=2>교재학습</td>";
							tmp_HTML = tmp_HTML+"<td class='status'>"+tmp_STUDY_STATUS+"</td></tr>";
						}

						$('#'+ZMAT1_SELECT_DATA+'_STUDY_TB.menu'+MENU_CLICK_INDEX).append(tmp_HTML);

					} else {

						$('#'+ZMAT1_SELECT_DATA+'_STUDY_TB.menu'+MENU_CLICK_INDEX).append(
								"<tr><td scope='row'>"+tmp_DAY_NAME+"</td><td>"+tmp_END_TIME+"</td><td>"+tmp_POINT_SUM+"</td>"+
								"<td class='status'>"+tmp_STUDY_STATUS+"</td></tr>");

					}

					if(STUDY_STATUS_LIST=="") STUDY_STATUS_LIST=tmp_STUDY_STATUS_CODE;
					else STUDY_STATUS_LIST = STUDY_STATUS_LIST+"/"+tmp_STUDY_STATUS_CODE;

					if(STUDY_DAY_SEQ_LIST=="") STUDY_DAY_SEQ_LIST=tmp_DAY_SEQ;
					else STUDY_DAY_SEQ_LIST = STUDY_DAY_SEQ_LIST+"/"+tmp_DAY_SEQ;

					if(STUDY_STUDY_POP_OPEN_YN_LIST=="") STUDY_STUDY_POP_OPEN_YN_LIST=tmp_STUDY_POP_OPEN_YN_CODE;
					else STUDY_STUDY_POP_OPEN_YN_LIST = STUDY_STUDY_POP_OPEN_YN_LIST+"/"+tmp_STUDY_POP_OPEN_YN_CODE;

				});


			} else {

			}
			$("#"+ZMAT1_SELECT_DATA+"_STUDY_STATUS_LIST").val(STUDY_STATUS_LIST);
			$("#"+ZMAT1_SELECT_DATA+"_STUDY_DAY_SEQ_LIST").val(STUDY_DAY_SEQ_LIST);
			$("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val(STUDY_STUDY_POP_OPEN_YN_LIST);

			top_scroll();


		},
		Error: function($e){
			app_alert("데이터가 없습니다.");
		}
	});
}



//@ UMONEY
// sp_it_cmn_umoney_c
function uMoney(zmat1_code, check_false) {

	if(typeof(check_false)=="undefined") {

		tmp_SUBJECT_CODE="";
		if(!!pageParams) {
			$.each(pageParams.data, function(index, entry) {

				if(entry["ZMAT1"]==zmat1_code) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
				if(entry["VBELN"]==zmat1_code) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
			});
		}

		//# 한자 / 수학U 경우 pop open 
		if(tmp_SUBJECT_CODE=="000000000000001162" || tmp_SUBJECT_CODE=="000000000000001090") {

			if($("#"+zmat1_code+"_STUDY_POP_OPEN_YN_LIST").val().indexOf("Y")>=0) {

				HANJA_uMoney();
				return;
			}
		}
	}

	index = $('#'+zmat1_code+'_JINDO option').index($('#'+zmat1_code+'_JINDO option:selected'));
	jindo_code = $('#'+zmat1_code+'_JINDO option:eq('+(index)+')').attr("EDITION_SEQ");
	stlkn_code = $('#'+zmat1_code+'_JINDO option:eq('+(index)+')').attr("ORDER_SEQ");
	tmp_status_code = $("#"+zmat1_code+"_STUDY_STATUS_LIST").val();


	var param = {
			in_course_code : course_code,
			in_edition_seq : jindo_code,
			in_order_seq : stlkn_code,
			in_status_code : tmp_status_code
	}
	

	
	loader.service({
		Function : 'sp_it_cmn_umoney_c',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
			// 2013.03.27	ypkim
			// U 머니 지급 후 결과 메세지 출력.
			app_alert($(data).find('Table1').find('MSG').text());
			JINDO_change_u();
		},
		Error: function($e){
			app_alert("데이터가 없습니다.");
		}
	});
}


//@ 한자 UMONEY
var HANJA_uMoney = function() {

	app_showBlind(true);
	$('#Dialog').empty();
	$('#Dialog').append( template_hanja );
	//
	$('#Dialog').modal({
		onOpen : null,
		onShow : function(d){

			tmp_STATUS = $("#"+ZMAT1_SELECT_DATA+"_STUDY_STATUS_LIST").val().split("/");
			tmp_POP_OPEN = $("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/");


			$('#endCon').find("input:radio[id=HANJA_1_DAY1]").attr("checked",true);
			$('#endCon').find("input:radio[id=HANJA_2_DAY1]").attr("checked",true);
			$('#endCon').find("input:radio[id=HANJA_3_DAY1]").attr("checked",true);
			$('#endCon').find("input:radio[id=HANJA_4_DAY1]").attr("checked",true);
			$('#endCon').find("input:radio[id=HANJA_5_DAY1]").attr("checked",true);

			if(tmp_STATUS[0]=="SR20") $('#endCon').find("input:radio[id=HANJA_1_DAY2]").attr("checked",true);
			if(tmp_STATUS[1]=="SR20") $('#endCon').find("input:radio[id=HANJA_2_DAY2]").attr("checked",true);
			if(tmp_STATUS[2]=="SR20") $('#endCon').find("input:radio[id=HANJA_3_DAY2]").attr("checked",true);
			if(tmp_STATUS[3]=="SR20") $('#endCon').find("input:radio[id=HANJA_4_DAY2]").attr("checked",true);
			if(tmp_STATUS[4]=="SR20") $('#endCon').find("input:radio[id=HANJA_5_DAY2]").attr("checked",true);

			if($("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/")[0]!="Y") {
				$('#endCon').find("input:radio[NAME=HANJA_1_DAY]").eq(0).parent().parent().addClass("none");
			}
			if($("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/")[1]!="Y") {
				$('#endCon').find("input:radio[NAME=HANJA_2_DAY]").eq(0).parent().parent().addClass("none");
			}
			if($("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/")[2]!="Y") {
				$('#endCon').find("input:radio[NAME=HANJA_3_DAY]").eq(0).parent().parent().addClass("none");
			}
			if($("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/")[3]!="Y") {
				$('#endCon').find("input:radio[NAME=HANJA_4_DAY]").eq(0).parent().parent().addClass("none");
			}
			if($("#"+ZMAT1_SELECT_DATA+"_STUDY_POP_OPEN_YN_LIST").val().split("/")[4]!="Y") {
				$('#endCon').find("input:radio[NAME=HANJA_5_DAY]").eq(0).parent().parent().addClass("none");
			}

		},
		onClose : null,
		overlayClose : false,
		escClose : false,
		containerId : 'endCon',
		opacity : 60,
		overlayCss : {backgroundColor:"#000"}
	});

}

// 한자 모달창 취소클릭시
var modal_hanja_cancel = function(e){
	modal_hanja_close();
};

// 한자 모달창 닫기
var modal_hanja_close = function(){
	$.modal.close();
	app_showBlind(false);
};


// 한자 모달창 저장클릭시
//sp_it_cls_study_result_u
var modal_hanja_save = function(e){


	course_code = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("COURSE_CODE");

	index = $('#'+ZMAT1_SELECT_DATA+'_JINDO option').index($('#'+ZMAT1_SELECT_DATA+'_JINDO option:selected'));
	edition_seq = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("EDITION_SEQ");
	order_seq = $('#'+ZMAT1_SELECT_DATA+'_JINDO option:eq('+(index)+')').attr("ORDER_SEQ");
	tmp_day_seq = $("#"+ZMAT1_SELECT_DATA+"_STUDY_DAY_SEQ_LIST").val();
	tmp_status_code = $("#"+ZMAT1_SELECT_DATA+"_STUDY_STATUS_LIST").val().split("/");

	tmp_STATUS_1 = tmp_status_code[0];
	tmp_STATUS_2 = tmp_status_code[1];
	tmp_STATUS_3 = tmp_status_code[2];
	tmp_STATUS_4 = tmp_status_code[3];
	tmp_STATUS_5 = tmp_status_code[4];


	if($('#endCon').find("input:radio[NAME=HANJA_1_DAY]").eq(0).parent().parent().hasClass("none")==false) {
		if($('#endCon').find("input:radio[NAME=HANJA_1_DAY]").attr("checked")=="checked") {
			tmp_STATUS_1="SR10";
		} else {
			tmp_STATUS_1="SR30";
		}
	}
	if($('#endCon').find("input:radio[NAME=HANJA_2_DAY]").eq(0).parent().parent().hasClass("none")==false) {
		if($('#endCon').find("input:radio[NAME=HANJA_2_DAY]").attr("checked")=="checked") {
			tmp_STATUS_2="SR10";
		} else {
			tmp_STATUS_2="SR30";
		}
	}
	if($('#endCon').find("input:radio[NAME=HANJA_3_DAY]").eq(0).parent().parent().hasClass("none")==false) {
		if($('#endCon').find("input:radio[NAME=HANJA_3_DAY]").attr("checked")=="checked") {
			tmp_STATUS_3="SR10";
		} else {
			tmp_STATUS_3="SR30";
		}
	}
	if($('#endCon').find("input:radio[NAME=HANJA_4_DAY]").eq(0).parent().parent().hasClass("none")==false) {
		if($('#endCon').find("input:radio[NAME=HANJA_4_DAY]").attr("checked")=="checked") {
			tmp_STATUS_4="SR10";
		} else {
			tmp_STATUS_4="SR30";
		}
	}
	if($('#endCon').find("input:radio[NAME=HANJA_5_DAY]").eq(0).parent().parent().hasClass("none")==false) {
		if($('#endCon').find("input:radio[NAME=HANJA_5_DAY]").attr("checked")=="checked") {
			tmp_STATUS_5="SR10";
		} else {
			tmp_STATUS_5="SR30";
		}
	}

	tmp_status_code = tmp_STATUS_1+"/"+tmp_STATUS_2+"/"+tmp_STATUS_3+"/"+tmp_STATUS_4+"/"+tmp_STATUS_5;


	var param = {
			in_course_code : course_code,
			in_order_seq : order_seq,
			in_edition_seq : edition_seq,
			in_day_seq : tmp_day_seq,
			in_status_code : tmp_status_code
	}

	loader.service({
		Function : 'sp_it_cls_study_result_u',
		Parameter : param,
		CursorCnt : '1',
		Success: function(data){
			app_alert( $(data).find('Table').find( 'MSG' ).text() );
			uMoney(ZMAT1_SELECT_DATA,true);
		},
		Error: function($e){
			app_alert( $e );
		}
	});
	modal_memo_close();
};