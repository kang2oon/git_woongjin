/********************************************************************************/
// global Value
/********************************************************************************/

var msg_E001 = "스케쥴에서 전달받은 데이터가 없습니다.";

var msg_E00Z = "데이터가 없습니다.";

var TUTOR_DATA = "19851212";
var SEARCH_DATA = "김동식";
var course_code = "";

//@ 호수변경 통해서 단계/호 조회하는 경우
var DANGE_CHANGE_DATA = "";
var JINDO_CHANGE_DATA = "";

//@ 현재 선택한 ZMAT1/DANGE/JINDO 저장
MENU_CLICK_INDEX = 1;
//@ 과목 선택 INDEX 저장
var ZMAT1_SELECT_DATA = "";
var DANGE_SELECT_DATA = "";
var JINDO_SELECT_DATA = "";

//@ 선택한 그룹이 가지고있는 DANGE/JINDO
var LOADING_DANGE_SELECT_DATA = "";
var LOADING_JINDO_SELECT_DATA = "";

var vCalendarUtil = new CalendarUtil();
var vCheckDay = 0;
var object_tmp = "";
var schedule_jstr = new Object();
var pageParams;

var template_memo = "";
var template_end = "";

var IS_USED = false;
var IS_FINISHED = false;

var tmp_SUBJECT_CODE = "";

// 계획설정시 연동을 위해 정보를 담을 변수
var editStudyPlanParam = null;

/********************************************************************************/
// BASE logic
/********************************************************************************/

// 페이지 로드됨 :: 시작
$(document).ready(function() {

	app_endLoading();

	/* Tail */
	template_memo = $('#modal_memo').html();
	$('#modal_memo').remove();
	template_end = $('#modal_end').html();
	$('#modal_end').remove();

	// 페이지 데이터 요청
	app_getRequestParameter('setData');

});

var PageData = null;

// 페이지 데이터 수신
var setData = function($data) {

	if (String($data) != "undefined" && !!$data && String($data) != "''" && String($data) != '""') {
		pageParams = $data.replace(/\'/g, '"');
		pageParams = JSON.parse(pageParams);

		if (pageParams.USED != undefined) {
			if (pageParams.USED == "true") {
				IS_USED = true;
			}
		}

        //ZMAT1_N, ZMAT1_P 추가로 인해 기존의 ZMAT1의 변수값을 대체
        //ZMAT1는 사용하지 않음.
        //2013.02.18 NDH
        //2013.02.27 ZMAT1_N,ZMAT1_NTX 사용안함 NDH 
//		$.each(pageParams.data, function(index, entry) {
//             pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1_N;
//             pageParams.data[index].ZMAT1_TX = pageParams.data[index].ZMAT1_NTX;
//        });

        //씽크빅만 인식
 		$.each(pageParams.data, function(index, entry) {
 		  if(pageParams.referrerPage=="A020400.html"){
 		      ZMAT1 = pageParams.data[index].ZMAT1_SHARE;
               DANGE_CODE = pageParams.data[index].DANGE_SHARE;
               HO_CODE = pageParams.data[index].JINDO_SHARE;

            ZMAT1       == undefined ? sendChk = false :
            ZMAT1       == ""        ? sendChk = false :
            HO_CODE     == undefined ? sendChk = false :
            HO_CODE     == ""        ? sendChk = false :
            DANGE_CODE  == undefined ? sendChk = false :
            DANGE_CODE  == ""        ? sendChk = false : sendChk = true;

             if(sendChk){
 		       pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1_SHARE;
               pageParams.data[index].DANGE = pageParams.data[index].DANGE_SHARE;
               pageParams.data[index].JINDO = pageParams.data[index].JINDO_SHARE;
 		       pageParams.data[index].ZMAT1_SHARE="";
               pageParams.data[index].DANGE_SHARE="";
               pageParams.data[index].JINDO_SHARE="";
             }
 		  }

 		});



		var name = pageParams.NAME1 == undefined ? pageParams.KUNWE_TX : pageParams.NAME1;
		SEARCH_DATA = name;

		app_changeTitle(name);

		dataLoad();
	} else {
		app_alert(msg_E001);
		return;
	}

};

/********************************************************************************/
// PAGE logic
/********************************************************************************/

// 이번주 학습정보 진입 과목
var filter = {
	'000000000000001090' : '씽크U 수학',
	'000000000000001000' : '수학',
	'000000000000001114' : '씽크U사회과학',
	'000000000000001148' : '씽크U영어',
	'000000000000001131' : '씽크U국어',
	'000000000000001162' : '씽크U한자',
	'000000000000001112' : '한글깨치기',
	'000000000000001001' : '국어',
	'000000000000001002' : '한자'
}

// 상담안 진입과목
var filterA020400 = {
	'000000000000001090' : '씽크U 수학',
	'000000000000001000' : '수학',
	'000000000000001114' : '씽크U사회과학',
	'000000000000001148' : '씽크U영어',
	'000000000000001131' : '씽크U국어',
	'000000000000001162' : '씽크U한자',
	'000000000000001112' : '한글깨치기',
	'000000000000001001' : '국어',
	'000000000000001002' : '한자'
}

// 지난주 학습정보 진입과목
var filterA020100 = {
	'000000000000001090' : '씽크U 수학',
	'000000000000001114' : '씽크U 사회과학',
	'000000000000001131' : '씽크U 국어',
	'000000000000001148' : '씽크U 영어',
	'000000000000001162' : '씽크U한자',
	'000000000000001112' : '한글깨치기',
	'000000000000001001' : '국어',
	'000000000000001000' : '수학',
	'000000000000001002' : '한자',
	'000000000000001022' : '바로셈',
	'000000000000001087' : '바로독해',
	'000000000000001056' : '스마트영어'
}

//
var record_check = "";
// 페이지 이동
var changePage = function(page_name) {

	var url = page_name;
	tmpChecked = record_check.split(";");

	if (!!pageParams) {
		$.each(pageParams.data, function(index, entry) {

			if (entry["ZMAT1"] == ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE = entry["ZMAT1"];
			} else {
				entry["checked"] = "";
			}
			if (entry["VBELN"] == ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE = entry["ZMAT1"];
			}

		});
	}
    pageParams.referrerPage = "A020300.html";
	app_changePage(url, pageParams, false);
}
// 리스트 생성
function dataLoad() {

	if (!!pageParams) {

		$.each(pageParams.data, function(index, entry) {

			if (entry["ZMAT1_TX"].indexOf("씽크U") >= 0) {

				try {
					if ($.trim(entry["JUNIOR_PG"]) == "X") {
						tmp_COURSE = ANSWERS_U_CODE[entry["ZMAT1"] + "_" + $.trim(entry["JUNIOR_PG"])].in_course_code;
						entry["COURSE"] = tmp_COURSE.split("_")[0];
					} else {
						entry["COURSE"] = ANSWERS_U_CODE[entry["ZMAT1"]].in_course_code;
					}
				} catch (e) {
					entry["COURSE"] = "";
				}

				tmp_section = "";
				tmp_section = $('#section_u_tmp').html();

				tmp_section = tmp_section.replace(/#INDEX#/g, index);
				tmp_section = tmp_section.replace(/#ZMAT1_TX#/g, entry["ZMAT1_TX"]);
				tmp_section = tmp_section.replace(/#ZMAT1#/g, entry["VBELN"]);

				tmp_section = tmp_section.replace(/#COURSE_CODE#/g, entry["COURSE"]);
				tmp_section = tmp_section.replace(/#DANGE#/g, entry["DANGE"]);
				tmp_section = tmp_section.replace(/#JINDO#/g, entry["JINDO"]);
				tmp_section = tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_TX"]);
				tmp_section = tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_TX"]);
                


			} else {

				tmp_section = "";
				tmp_section = $('#section_tmp').html();

				tmp_section = tmp_section.replace(/#INDEX#/g, index);
				tmp_section = tmp_section.replace(/#ZMAT1_TX#/g, entry["ZMAT1_TX"]);
				tmp_section = tmp_section.replace(/#ZMAT1#/g, entry["ZMAT1"]);

				tmp_section = tmp_section.replace(/#COURSE_CODE#/g, "");
				tmp_section = tmp_section.replace(/#DANGE#/g, entry["DANGE"]);
				tmp_section = tmp_section.replace(/#JINDO#/g, entry["JINDO"]);
				tmp_section = tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_TX"]);
				tmp_section = tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_TX"]);
                


			}
			tmp_section = tmp_section.replace(/#FOOTER_USED#/g, entry["USED"]);
            tmp_section=tmp_section.replace(/#NEXT_S#/g, entry["NEXT_S"]); 

			$('#Contents .container').append(tmp_section);

			//# H2 색상 설정
			switch(Number(entry["SORT"])) {
				case 1:
					$("#" + entry["ZMAT1"] + "_head.menu" + index).addClass("subject_txt_color1").find("em").addClass("subject_txt_color1");
					$("#" + entry["VBELN"] + "_head.menu" + index).addClass("subject_txt_color1").find("em").addClass("subject_txt_color1");
					break;
				case 2:
					$("#" + entry["ZMAT1"] + "_head.menu" + index).addClass("subject_txt_color2").find("em").addClass("subject_txt_color2");
					$("#" + entry["VBELN"] + "_head.menu" + index).addClass("subject_txt_color2").find("em").addClass("subject_txt_color2");
					break;
				default:
					$("#" + entry["ZMAT1"] + "_head.menu" + index).addClass("subject_txt_color3").find("em").addClass("subject_txt_color3");
					$("#" + entry["VBELN"] + "_head.menu" + index).addClass("subject_txt_color3").find("em").addClass("subject_txt_color3");
			}

//아래 코드(A020100.js)로 변경. 2013.03.18 NDH
//			if (ZMAT1_SELECT_DATA == "") {
//
//				MENU_CLICK_INDEX = index;
//				ZMAT1_SELECT_DATA = entry["ZMAT1"];
//				try {
//					if ($.trim(entry["JUNIOR_PG"]) == "X") {
//						tmp_COURSE = ANSWERS_U_CODE[entry["ZMAT1"] + "_" + $.trim(entry["JUNIOR_PG"])].in_course_code;
//						entry["COURSE"] = tmp_COURSE.split("_")[0];
//					} else {
//						entry["COURSE"] = ANSWERS_U_CODE[entry["ZMAT1"]].in_course_code;
//					}
//
//					ZMAT1_SELECT_DATA = entry["VBELN"];
//				} catch (e) {
//					entry["COURSE"] = "";
//				}
//			}

			if(ZMAT1_SELECT_DATA=="") {

				MENU_CLICK_INDEX = index;
				ZMAT1_SELECT_DATA = entry["ZMAT1"];

				try
				{

					if($.trim(entry["JUNIOR_PG"])=="X") {
						tmp_COURSE = ANSWERS_U_CODE[entry["ZMAT1"]+"_"+$.trim(entry["JUNIOR_PG"])].in_course_code;
						entry["COURSE"] = tmp_COURSE.split("_")[0];
					} else {
						if(entry["ZMAT1_TX"].indexOf("씽크U")>-1) {
							if( ANSWERS_U_CODE[entry["ZMAT1"]]!=undefined ){
								entry["COURSE"] = ANSWERS_U_CODE[entry["ZMAT1"]].in_course_code;
							}
						}else{
							entry["COURSE"] = ANSWERS_U_CODE[entry["ZMAT1"]].in_course_code;
						}
					}

					ZMAT1_SELECT_DATA = entry["VBELN"];
				}
				catch (e)
				{
					entry["COURSE"] = "";
				}

			}


			if(record_check=="") record_check=entry["ZMAT1"];
			else record_check=record_check+";"+entry["ZMAT1"];


		});

		$('#Contents>.container>.section').each(function() {
			$(this).children(':not(h2)').hide();
			tmp_ZMAT1_SELECT_DATA = $(this).attr("id").split("_")[0];
			$("#" + tmp_ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT").html("");

			$(this).find('span.control').addClass('none');
			$(this).find('h2').removeClass('has-control');
		});

		// 클릭이벤트 설정
		set_h2_click();

		// 처음 메뉴 클릭이벤트 발생
        // 스케줄에서 클릭한 값(SELECT)로 오픈되도록 수정. 2013.05.21 NDH
		//$('#'+ZMAT1_SELECT_DATA+'_section.menu'+MENU_CLICK_INDEX).find('h2').eq(0).click();
        var list_len = $('#Contents>.container>.section').find('h2').length;
	    var tmpChecked  = record_check.split(";");
        var click_num = 0;

			for(i = 0; i < tmpChecked.length; i++) { 
				if(tmpChecked[i]==pageParams.SELECT) {
				    click_num = i;
				}
			}

        $('#Contents>.container>.section').find('h2').eq(click_num).click();
                

	} else {
		app_alert(msg_E00Z);
		return;
	}
}

// 이동할 페이지 체크 (html페이지 onclick)
var changePage_check = function(page) {

	tmp_SUBJECT_CODE = "";
	if (!!pageParams) {
		$.each(pageParams.data, function(index, entry) {

			if (entry["ZMAT1"] == ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE = entry["ZMAT1"];
			}
			if (entry["VBELN"] == ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE = entry["ZMAT1"];
			}
		});
	}
	//
	var fText;
	var iCate;
	if (page == 'A020400.html') {
		fText = '학부모상담안';
		iCate = 'KV';
		loader.sessionTotal(fText, iCate, function() {
			changePage(page)
		}, function() {
			changePage(page)
		})
	} else {
		changePage(page);
	}
}
// 과목탭 클릭이벤트
function set_h2_click() {

	$('#Contents>.container>.section').find('h2').click(function(e) {

		click_left = Number(e.clientX);
		click_top = Number(e.clientY);

		tmp_SUBJECT_CODE = "";
		if (!!pageParams) {
			$.each(pageParams.data, function(index, entry) {

				if (entry["ZMAT1"] == ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE = entry["ZMAT1"];
				}
				if (entry["VBELN"] == ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE = entry["ZMAT1"];
				}
			});
		}

		if (40 >= click_top) {
			if (Number($("#local > ul > li").eq(1).offset().left) > click_left) {
				changePage('A020100.html');
				return;
			}
			if (Number($("#local > ul > li").eq(2).offset().left) < click_left) {
				changePage('A020400.html');
				return;
			}
			return;
		}

		//@ 과목 선택 INDEX 저장
		MENU_CLICK_INDEX = Number($(this).parent().attr("menu_index"));

		tmp_ZMAT1_SELECT_DATA = $(this).parent().attr("id").split("_")[0];
		tmp_SUBJECT_CODE = "";
		if (!!pageParams) {
			$.each(pageParams.data, function(index, entry) {

				if (entry["ZMAT1"] == tmp_ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE = entry["ZMAT1"];
				}
				if (entry["VBELN"] == tmp_ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE = entry["ZMAT1"];
				}
			});
		}

		if (!$(this).find("button.toggle-button").hasClass('open')) {

			$('#Contents>.container>.section').each(function() {
				$(this).children(':not(h2)').hide();
				$(this).find("button.toggle-button").removeClass('open').text('보이기');

				if ($(this).attr("CATEGORY") == "U") {
					$(this).find("h2>em").html("");
				}

				$(this).find('span.control').addClass('none');
				$(this).find('h2').removeClass('has-control');
			});

			$(this).find("button.toggle-button").addClass('open').text('숨기기').closest('div.section').children(':not(h2)').show();

			$(this).find('span.control').removeClass('none');
			$(this).addClass('has-control');

			// Load 했던 데이터 일경우
			if ($(this).parent().attr("dataload_dange") == "true") {

				ZMAT1_SELECT_DATA = tmp_ZMAT1_SELECT_DATA;

				if (Number($("#" + tmp_ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("RECORD_NO")) > 0) {
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_DATACONTENT").css("display", "");
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_NOT_DATACONTENT").css("display", "none");
				} else {
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_DATACONTENT").css("display", "none");
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_NOT_DATACONTENT").css("display", "");
				}

				if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("RECORD_NO") == "0") {
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find('span.control').addClass('none');
					$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find('h2').removeClass('has-control');
				}
				// 선택그룹 텍스트변경
				menu_text_reload(false);

				top_scroll();
			} else {
				dataload_dange(tmp_ZMAT1_SELECT_DATA);
			}
		} else {

			$(this).find('span.control').addClass('none');
			$(this).removeClass('has-control');

			$('#Contents>.container>.section').each(function() {
				$(this).children(':not(h2)').hide();
				$(this).find("button.toggle-button").removeClass('open').text('보이기');

				if ($(this).attr("CATEGORY") == "U") {
					$(this).find("h2>em").html("");
				}

				$(this).find('span.control').addClass('none');
				$(this).find('h2').removeClass('has-control');
			});

			$(this).find("button.toggle-button").removeClass('open').text('보이기').closest('div.section').children(':not(h2)').hide();
			setTimeout(function() { window.scrollTo(0, 1); }, 100);
		}
		
		//20130617 OHJ 탭내부에서 선택한 값이 다른 탭에서도 적용되게 수정
		pageParams.SELECT=tmp_SUBJECT_CODE;
		
	});
}


// 단계 변경
/*
 1	I_GUBUN		 CHAR 	 1 		구분(2:단계)
 2	I_ZMAT1		 CHAR 	 18 	과목
 */
function dataload_dange(zmat1_code) {

	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("dataload_dange", "true");

	ZMAT1_SELECT_DATA = zmat1_code;

	DANGE_SELECT_DATA = "";
	JINDO_SELECT_DATA = "";

	object_tmp = "#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX;

	$(object_tmp).html("");

	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "U") {
		dataload_dange_u();
	} else if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B") {
		dataload_dange_big();
	}

}


// 단계변경시 이벤트 호출
/*
 1	I_GUBUN		 CHAR 	 1 	구분(3: 호수)
 2	I_ZMAT1		 CHAR 	 18 	과목
 3	I_DANGE		 CHAR 	 18 	학습단계
 */
function DANGE_change(zmat1_code, dange_code) {

	ZMAT1_SELECT_DATA = zmat1_code;
	DANGE_SELECT_DATA = dange_code;

	JINDO_SELECT_DATA = "";

	object_tmp = "#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX;
	$(object_tmp).html("");

	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "U")
		DANGE_change_u();
	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B")
		DANGE_change_big();
}

// 진도변경시 이벤트 호출
function JINDO_change(zmat1_code, jindo_code, stlkn_code) {

	ZMAT1_SELECT_DATA = zmat1_code;
	JINDO_SELECT_DATA = jindo_code;

	object_tmp = "#" + ZMAT1_SELECT_DATA + "_teacging_dept.menu" + MENU_CLICK_INDEX;

	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "U")
		JINDO_change_u();
	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B") {
		//jindo_code	= $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").val();
		JINDO_change_big();
	}

}

// 상세보기 열기
function detail_open(objectThis) {

	if ($("." + ZMAT1_SELECT_DATA + "_detail_layer").hasClass('attach-article')) {
		$("." + ZMAT1_SELECT_DATA + "_detail_layer").removeClass('attach-article');
		$(objectThis).find("span").html("접기");
	} else {
		$("." + ZMAT1_SELECT_DATA + "_detail_layer").addClass('attach-article');
		$(objectThis).find("span").html("더보기");
	}

}

/*******************************************************************************************************************/

// 리스트 이전 버튼 클릭시
function prev(zmat1_code) {

	event.cancelBubble = "true";

	JINDO_SELECT_MAX = $("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTMAX");

	var index = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option").index($("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option:selected"));
	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO", index + 1);

	JINDO_SELECT_NUM = $("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO");

	if (Number(JINDO_SELECT_NUM) > 1 && Number(JINDO_SELECT_MAX) > 1) {

		JINDO_SELECT_NUM = Number(JINDO_SELECT_NUM) - 1;

		$("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option:eq(" + (index - 1) + ")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX).val();
		STLKN_SELECT_DATA = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " > option:selected").attr("STLKN");

		JINDO_change(zmat1_code, JINDO_SELECT_DATA, STLKN_SELECT_DATA);
	} else {
		app_alert("이전 호가 없습니다.");
	}

	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTMAX", JINDO_SELECT_MAX);
	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO", JINDO_SELECT_NUM);

}

//리스트 다음 버튼 클릭시
function next(zmat1_code) {

	event.cancelBubble = "true";

	JINDO_SELECT_MAX = $("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTMAX");

	var index = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option").index($("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option:selected"));
	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO", index + 1);

	JINDO_SELECT_NUM = $("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO");

	if (Number(JINDO_SELECT_MAX) > Number(JINDO_SELECT_NUM)) {

		JINDO_SELECT_NUM = Number(JINDO_SELECT_NUM) + 1;

		$("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " option:eq(" + (index + 1) + ")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX).val();
		STLKN_SELECT_DATA = $("#" + zmat1_code + "_JINDO.menu" + MENU_CLICK_INDEX + " > option:selected").attr("STLKN");

		JINDO_change(zmat1_code, JINDO_SELECT_DATA, STLKN_SELECT_DATA);
	} else {
		app_alert("다음 호가 없습니다.");
	}

	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTMAX", JINDO_SELECT_MAX);
	$("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("LISTNO", JINDO_SELECT_NUM);

}

//---------------------------------------------------------------------------------------------------------------
// 날짜 변경시
function set_rePlan(zmat1_code) {

	tmp_year = $("#" + zmat1_code + "_visit_date").val().substr(0, 4);
	tmp_month = $("#" + zmat1_code + "_visit_date").val().substr(5, 2);
	tmp_day = $("#" + zmat1_code + "_visit_date").val().substr(8, 2);
	var date = new Date();
	date.setHours(date.getHours() + 2);
	date.setMinutes(00);

	var holidayCount = 0;
	tmp_index = 1;
	$('#' + zmat1_code + '_STUDY_TB').find('tr').each(function(index) {

		if ($(this).find("td").eq(0).attr("write_status") == "Y") {

			tmp_day2 = parseInt(tmp_day) + parseInt(tmp_index) + parseInt(holidayCount);
			if (tmp_day2 < 10)
				tmp_day2 = "0" + (tmp_day2);
			tmp_date = tmp_year + "-" + tmp_month + "-" + tmp_day2;

			date.setFullYear(tmp_year);
			date.setDate(tmp_day2);
			date.setMonth(tmp_month - 1);

			mm = (date.getMonth() + 1);
			if (mm < 10)
				mm = "0" + mm;

			tmp_year2 = date.getFullYear();
			tmp_month2 = mm;
			tmp_day2 = date.getDate();
			if (tmp_day2 < 10)
				tmp_day2 = "0" + (tmp_day2);
			tmp_date2 = tmp_year2 + "-" + tmp_month2 + "-" + tmp_day2;

			daytoweek = vCalendarUtil.getStringDateToWeek(tmp_date2);
			switch(daytoweek) {
				case 0 :
					tmp_dayStr = "일";
					break;
				case 1 :
					tmp_dayStr = "월";
					break;
				case 2 :
					tmp_dayStr = "화";
					break;
				case 3 :
					tmp_dayStr = "수";
					break;
				case 4 :
					tmp_dayStr = "목";
					break;
				case 5 :
					tmp_dayStr = "금";
					break;
				case 6 :
					tmp_dayStr = "토";
					holidayCount = holidayCount + 1;
					break;
			}

			$(this).find("td").eq(1).html(tmp_date2 + " <button type='button' class='button-style s-size global' onclick=\"vCheckDay=" + (index + 1) + ";openCalendar_windows('" + (index + 1) + "');\">변경</button>");
			$(this).find("td").eq(2).html(tmp_dayStr);

			tmp_minutes = date.getMinutes();
			if (tmp_minutes < 10)
				tmp_minutes = "0" + tmp_minutes;
			$(this).find("td").eq(3).html(date.getHours() + ":" + tmp_minutes + " <button type='button' class='button-style s-size global' onclick=\"vCheckDay=" + (index + 1) + ";openTime_windows('" + (index + 1) + "');\">변경</button>");

		}
		tmp_index = tmp_index + 1;
	});

}

//@ 같는 일자일경우 시간 제한 설정
function chk_timeError(check_date) {

	tmp_date = $('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 1)).find("td").eq(1).html();
	tmp_date = tmp_date.substr(0, 10).replace(/-/g, "");

	check_date = check_date.substr(0, 10).replace(/-/g, "");

	if (Number(tmp_date) == Number(check_date)) {

	}

}

// 날짜 에러체크
function chk_dateError(check_date) {

	var date = new Date();
	mm = (date.getMonth() + 1);
	if (mm < 10)
		mm = "0" + (date.getMonth() + 1);
	day = (date.getDate());
	if (day < 10)
		day = "0" + (date.getDate());
	tmp_today = date.getFullYear() + "" + mm + "" + day;

	check_date = check_date.substr(0, 10);
	tmp_visit_date = $("#" + ZMAT1_SELECT_DATA + "_visit_date").val();

	tmp_year = tmp_visit_date.substr(0, 4);
	tmp_month = tmp_visit_date.substr(5, 2);
	tmp_day = tmp_visit_date.substr(8, 2);

	//@ 방문날짜 이전 선택시 return

	tmp_day2 = parseInt(tmp_day);
	if (tmp_day2 < 10)
		tmp_day2 = "0" + (tmp_day2);
	tmp_date = tmp_year + "" + tmp_month + "" + tmp_day2;

	if (Number(check_date.replace(/-/g, "")) < Number(tmp_today)) {
		return 1;
	}

	//@ 방문날짜보다 7일이상 되었을 경우 return
	/* 체크 내용 변경으로 주석처리
	tmp_day2 = parseInt(tmp_day)+parseInt(7);
	if(tmp_day2 < 10) tmp_day2 = "0"+(tmp_day2);

	date.setFullYear(tmp_year);
	date.setMonth(tmp_month-1);
	date.setDate(tmp_day2);

	mm = (date.getMonth()+1);
	if(mm < 10) mm = "0"+(date.getMonth());
	tmp_year2	= date.getFullYear();
	tmp_month2	= mm;
	tmp_day2	= date.getDate();
	if(tmp_day2 < 10) tmp_day2 = "0"+(tmp_day2);
	tmp_date2	= tmp_year2+""+tmp_month2+""+tmp_day2;

	if(Number(check_date.replace(/-/g,"")) > Number(tmp_date2)) {
	//alert("방문날짜보다 7일이 깁니다.");
	//alert(check_date.replace(/-/g,"") + " > " + tmp_date2);
	return 2;
	}
	*/

	//@ 다음 일차보다 이후 선택시 return
	if (Number(vCheckDay) < 5) {

		tmp_date = $('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay)).find("td").eq(1).html();
		tmp_date = tmp_date.substr(0, 10).replace(/-/g, "");

		if (Number(check_date.replace(/-/g, "")) > Number(tmp_date)) {
			return 3;
		}

	}

	//@ 이전 단계보다 이전 선택시 return
	if (Number(vCheckDay) > 1) {

		tmp_date = $('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 2)).find("td").eq(1).html();
		tmp_date = tmp_date.substr(0, 10).replace(/-/g, "");

		if (Number(check_date.replace(/-/g, "")) < Number(tmp_date)) {
			return 4;
		}

	}

	//@ 주말선택시 return
	daytoweek = vCalendarUtil.getStringDateToWeek(check_date.substr(0, 4) + "-" + check_date.substr(5, 2) + "-" + check_date.substr(8, 2));
	if (Number(daytoweek) == 0) {
		return 5;
	}
	return 0;
}

// 이벤트 전파 중단
function preventDefault(e) {
	e.preventDefault();
};

// 계획세우기 날짜 열기
function open_windows_set(title) {

	$("#plan_date_text").html(title);

	$("#plan_date_background").css("width", $(window).width());
	$("#plan_date_background").css("height", $(window).height());
	$("#plan_date_background").css("top", $(window).scrollTop() + "px");

	document.getElementById("plan_date_background").style.display = '';
	document.all['plan_date_windows'].style.top = $(window).scrollTop() + 20 + "px";
	document.all['plan_date_windows'].style.left = ($(window).width() / 2 - (308 / 2)) + "px";
	document.getElementById("plan_date_windows").style.display = '';

	document.addEventListener('touchmove', preventDefault, false);

}

// 보강호 열기
function openLevel_windows() {

	$("#dialHeader>h1").html(SEARCH_DATA + "(이)의 학습결과입니다.");

	zmat1_code = ZMAT1_SELECT_DATA;

	index = $('#' + zmat1_code + '_JINDO option').index($('#' + zmat1_code + '_JINDO option:selected'));
	jindo_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("EDITION_SEQ");
	stlkn_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("ORDER_SEQ");
	lvl_option = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("LVL_OPTION");

	//.filter('input[value="'+$.trim(lvl_option)+'"]').attr("checked", "checked");

	var param = {
		in_edition_seq : jindo_code,
		in_order_seq : stlkn_code
	}

	loader.service({
		Function : 'sp_it_cls_level_bg_korn_r',
		Parameter : param,
		CursorCnt : '1',
		Success : function(data) {

			$("#dialContents .level>span").html($(data).find('Table').find('BG_LEVEL').text());

			$('#Dialog').modal({
				opacity : 50,
				overlayCss : {
					backgroundColor : "#000"
				}
			});

			$('input:radio[name="cls_level_radio"]').each(function() {
				if ($(this).val() == lvl_option)
					$(this).attr("checked", true);
			});
			check_radio_load();

		},
		Error : function($e) {

			app_alert(msg_E00Z);
		}
	});

}

//# 보강호 저장하기
function openLevel_windows_save() {

	zmat1_code = ZMAT1_SELECT_DATA;
	tmp_LVL_OPTION = $('input:radio[name="cls_level_radio"]:checked').val();

	if (tmp_LVL_OPTION == "1") {
		$("#" + zmat1_code + "_cls_level").html("1");
	}
	if (tmp_LVL_OPTION == "2") {
		$("#" + zmat1_code + "_cls_level").html("2");
	}
	if (tmp_LVL_OPTION == "3") {
		$("#" + zmat1_code + "_cls_level").html("1&2");
	}
	if (tmp_LVL_OPTION == "" || tmp_LVL_OPTION == undefined) {
		app_alert("선택되지 않았습니다.");
		return;
	}

	if (tmp_LVL_OPTION != "") {

		index = $('#' + zmat1_code + '_JINDO option').index($('#' + zmat1_code + '_JINDO option:selected'));
		jindo_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("EDITION_SEQ");
		stlkn_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("ORDER_SEQ");

		var param = {
			in_edition_seq : jindo_code,
			in_order_seq : stlkn_code,
			in_level_code : tmp_LVL_OPTION
		}
		pageParams_json = JSON.stringify(param);

		loader.service({
			Function : 'sp_it_cls_level_bg_korn_c',
			Parameter : param,
			CursorCnt : '1',
			Success : function(data) {

				DANGE_change(ZMAT1_SELECT_DATA, DANGE_SELECT_DATA);
				//JINDO_change(zmat1_code,'','');
			},
			Error : function($e) {

				app_alert("데이터가 없습니다.");
			}
		});

		openCalendar_windows_close();
	}
}

// 보강호 닫기
function openCalendar_windows_close() {
	$.modal.close();
}

//@ 계획 약속하기
/*
in_course_code		varchar2(4)	과목코드
in_order_seq		number	씽크U오더고유번호
in_edition_seq		number	호고유번호
in_visit_date		varchar2(8)	방문일자
in_goal_score		number	목표점수	"국어[edition_type:DS(독서호), BG(보강호)일때는 값을 받지 않는다.
사회과학 : 사회목표점수"
in_plan_date		varchar2(100)	학습계획일	yyyymmdd 포맷 날짜를 "/"로 연결해서 준다
in_plan_time		varchar2(100)	학습계획시간	hh24mi포맷 시간을 "/"로 연결해서 준다.
in_client_type		varchar2(1)	SMS발송여부	Y/N
in_goal_score1		number	목표점수	사회과학 : 과학목표점수, 나머지과목은 값을 넘기지 않음
*/
// 계획약속하기 버튼 클릭시
function plan_submit(zmat1_code) {

	if ($('#' + zmat1_code + '_FINISH_TEXT').text().indexOf("복습하기") >= 0) {
		app_showConfirm('복습 하시겠습니까? - 이전에 학습했던 문제풀이 이력 및 계획이 모두 삭제됩니다.', '안내', 'plan_submitOk', 'plan_submitCancel');
	} else {
		// 2013.03.28	ypkim
		// 메세지 삭제
		//app_alert("계획 약속 저장", '안내', 'plan_submitOk');
		plan_submitOk();
	}
}

// 복습여부 취소
function plan_submitCancel() {
	// 실행내용 없음.
}

// 복습여부 확인클릭시
function plan_submitOk() {
	var zmat1_code = ZMAT1_SELECT_DATA;

	//.menu +

	course_code = $("#" + zmat1_code + "_section").attr("COURSE_CODE");
	index = $('#' + zmat1_code + '_JINDO option').index($('#' + zmat1_code + '_JINDO option:selected'));
	jindo_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("EDITION_SEQ");
	stlkn_code = $('#' + zmat1_code + '_JINDO option:eq(' + (index) + ')').attr("ORDER_SEQ");
	tmp_visit_date = $("#" + zmat1_code + "_visit_date").val().replace(/-/g, "");
	tmp_goal_score = $("#" + zmat1_code + "_goal_score").val();
	tmp_plan_date = "";
	tmp_plan_time = "";
	tmp_client_type = "Y";
	tmp_goal_score1 = "";
	if ($("#" + zmat1_code + "_section").attr("COURSE_CODE") == "SOSC") {
		tmp_goal_score1 = $("#" + zmat1_code + "_goal_score2").val();
	}

	var dateCnt = 0;
	$('#' + zmat1_code + '_STUDY_TB').find('tr').each(function(index) {

		if (dateCnt < 5) {
			tmp_date = $(this).find("td").eq(1).text().substr(0, 10).replace(/-/g, "");
			tmp_time = $(this).find("td").eq(3).text().replace(/:/g, "");

			if (tmp_plan_date == "")
				tmp_plan_date = tmp_date;
			else
				tmp_plan_date = tmp_plan_date + "/" + tmp_date;
			if (tmp_plan_time == "")
				tmp_plan_time = tmp_time;
			else
				tmp_plan_time = tmp_plan_time + "/" + tmp_time;

			dateCnt++;
		}
	});

	/* 
	 var i=0, len=5-dateCnt;
	 for(;i<len;i+=1){
	 tmp_plan_date=tmp_plan_date+"/";
	 tmp_plan_time=tmp_plan_time+"/";
	 }
	 */

	tmp_plan_date = tmp_plan_date + "/";
	tmp_plan_time = (tmp_plan_time + "/").replace(/변경/g, '');
	tmp_plan_time = tmp_plan_time.replace(/\s/g, '')

	editStudyPlanParam = {
		in_course_code : course_code,
		in_order_seq : stlkn_code,
		in_edition_seq : jindo_code,
		in_visit_date : tmp_visit_date,
		in_goal_score : tmp_goal_score,
		in_plan_date : tmp_plan_date,
		in_plan_time : tmp_plan_time,
		in_client_type : tmp_client_type,
		in_goal_score1 : tmp_goal_score1
	};

	var etype = $('#' + ZMAT1_SELECT_DATA + '_JINDO option:eq(' + (index) + ')').attr('EDITION_TYPE');
	if (etype != "H40" && etype != "DS") {
		if ($("#" + zmat1_code + "_section").attr("COURSE_CODE") == "SOSC") { //사회과학 일때
			if ($.trim(tmp_goal_score).length == 0 || $.trim(tmp_goal_score1).length == 0) {
				app_showConfirm('목표점수가 설정되지 않았습니다. 설정하지 않으시면 80점으로 세팅됩니다. 진행하시겠습니까', '안내', 'setTargetScoreOk', 'setTargetScoreCancel');
				return false;
			} else {
				setTargetScoreOk();
			}
        } else if ($("#" + zmat1_code + "_section").attr("COURSE_CODE") == "CHCH"){ //한자 일때
                if(parseInt(JINDO_TEXT,10)%4 == 0){// 한자 4배수 일때
        			if ($.trim(tmp_goal_score).length == 0) {
        				app_showConfirm('목표점수가 설정되지 않았습니다. 설정하지 않으시면 80점으로 세팅됩니다. 진행하시겠습니까?', '안내', 'setTargetScoreOk', 'setTargetScoreCancel');
        				return false;
        			} else {
        				setTargetScoreOk();
        			}                    
                }else{//한자 4배수 아닐때  
                                      
                    requestEditStudyPlan(editStudyPlanParam);                   
                }
                        
		} else { //그 외
    			if ($.trim(tmp_goal_score).length == 0) {
    				app_showConfirm('목표점수가 설정되지 않았습니다. 설정하지 않으시면 80점으로 세팅됩니다. 진행하시겠습니까?', '안내', 'setTargetScoreOk', 'setTargetScoreCancel');
    				return false;
    			} else {
    				setTargetScoreOk();
    			}
		}
	} else {

		requestEditStudyPlan(editStudyPlanParam);
	}

}

// 목표점수 설정 컨펌 확인
function setTargetScoreOk() {
	//

	if (editStudyPlanParam.in_course_code == 'SOSC') {
		if ($.trim(editStudyPlanParam.in_goal_score).length == 0) {
			editStudyPlanParam.in_goal_score = '80';
		}
		if ($.trim(editStudyPlanParam.in_goal_score1).length == 0) {
			editStudyPlanParam.in_goal_score1 = '80';
		}
	} else {
		if ($.trim(editStudyPlanParam.in_goal_score).length == 0) {
			editStudyPlanParam.in_goal_score = '80';
		}
	}

	requestEditStudyPlan(editStudyPlanParam);

}

// 목표점수 설정 컨펌 취소
function setTargetScoreCancel() {
	editStudyPlanParam = null;
}

// 계획저장
function requestEditStudyPlan(param) {

	loader.service({
		Function : 'sp_it_cls_study_plan_c',
		Parameter : param,
		CursorCnt : '1',
		Success : function(data) {
			editStudyPlanParam = null;
			//
			app_alert($(data).find('Table').find('MSG').text());
			JINDO_change(ZMAT1_SELECT_DATA, '', '');
		},
		Error : function($e) {
			editStudyPlanParam = null;
			//
			app_alert("데이터가 없습니다.");
		}
	});
}

//@ plan에서 수정할 경우
function visit_date_update_set($data) {

	$data = $data.substr(0, 10);
	switch(chk_dateError($data)) {
		case 1:
			app_alert("방문날짜보다 이전 날짜입니다.");
			return;
		case 3:
			app_alert("다음 일차보다 선택하신 날짜가 큽니다.");
			return;
		case 4:
			app_alert("이전 일차보다 선택하신 날짜가 작습니다.");
			return;
		//		case 5:
		//			alert("선택하신 날짜가 일요일입니다.");
		//			return;
	}
	$('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 1)).find("td").eq(0).attr("SUBJECT_CODE")

	daytoweek = vCalendarUtil.getStringDateToWeek($data);
	switch(daytoweek) {
		case 0 :
			tmp_dayStr = "일";
			break;
		case 1 :
			tmp_dayStr = "월";
			break;
		case 2 :
			tmp_dayStr = "화";
			break;
		case 3 :
			tmp_dayStr = "수";
			break;
		case 4 :
			tmp_dayStr = "목";
			break;
		case 5 :
			tmp_dayStr = "금";
			break;
		case 6 :
			tmp_dayStr = "토";
			break;
	}
	$('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 1)).find("td").eq(1).html($data + " <button type='button' class='button-style s-size global' onclick=\"vCheckDay=" + (vCheckDay) + ";openCalendar_windows('" + (vCheckDay) + "');\">변경</button>");
	$('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 1)).find("td").eq(2).html(tmp_dayStr);
	//vCheckDay

}

//@ plan에서 수정할 경우
function visit_time_update_set($data) {

	tmp_hour = 0;
	tmp_time = $data.split("-");
	if (tmp_time[0] == "오전") {
		tmp_hour = 0;
	} else {
		tmp_hour = 12;
	}
	tmp_hour = Number(tmp_hour) + Number(tmp_time[1]);
	if (tmp_hour < 10)
		tmp_hour = "0" + tmp_hour;
	tmp_minute = Number(tmp_time[2]);
	if (tmp_minute < 10)
		tmp_minute = "0" + tmp_minute;

	$('#' + ZMAT1_SELECT_DATA + '_STUDY_TB').find('tr').eq(Number(vCheckDay - 1)).find("td").eq(3).html(tmp_hour + ":" + tmp_minute + " <button type='button' class='button-style s-size global' onclick=\"vCheckDay=" + (vCheckDay) + ";openTime_windows('" + (vCheckDay) + "');\">변경</button>");

}

// 달력 열기
function openCalendar_windows(Dayno) {

	app_openCalendar('visit_date_update_set');

}

// 시간 열기
function openTime_windows(Dayno) {

	app_openTime('visit_time_update_set');
}

//@ 호수변경
function jindo_windows(zmat1_code) {

	$("#Document").css("display", "none");
	$("#Popup").css("display", "");
	$(".jindo_button").css("display", "");

	$("#popHeader .container").find("h1").html("호수조회");

	tmp_DANGE_count = $('#' + zmat1_code + '_DANGE.menu' + MENU_CLICK_INDEX + ' option').size();
	tmp_DANGE_default = $('#' + zmat1_code + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:selected').val();

	JINDO_SELECT_DATA = $('#' + zmat1_code + '_JINDO.menu' + MENU_CLICK_INDEX + ' option:selected').val();
	tmp_DANGE_default_no = 0;
	$("#jindo_tree").html("");

	$.data.tree = {
		currentCode : zmat1_code,
		currentDange : -1,
		currentDangeTx : "",
		currentJindo : -1,
		currentJindoTx : ""
	};

	var $container = $('#jindo_tree');
	var html = "";
	var menuName = "", menuCode = "";

	tmp_DANGE_count = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option').size();
	for ( tmpNo = 0; tmpNo < tmp_DANGE_count; tmpNo++) {

		menuName = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').text();

		if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B") {
			menuCode = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').val();
			html += '<li ';
			if (DANGE_SELECT_DATA == menuCode)
				html += ' class="open hover" ';

			if (Number(tmp_DANGE_count) == 1) {
				html += ' style="background:none;" ';
			}
			html += ' id="dange_' + menuCode + '">';
		}

		if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "U") {
			menuCode = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("STAGE_SEQ");
			html += '<li ';
			if (DANGE_SELECT_DATA == menuName)
				html += ' class="open hover" ';

			if (Number(tmp_DANGE_count) == 1) {
				html += ' style="background:none;" ';
			}
			html += ' id="dange_' + menuCode + '">';
		}

		html += '<span>' + menuName + '</span>';
		html += '<ul><li><span class="placeholder">&nbsp;</span></li></ul>';
		html += '</li>'
	}
	html = '<ul id="tree">' + html + '</ul>'

	$container.append(html);

	if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B") {

		html = '';
		tmp_JINDO_count = $('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option').size();
		for ( tmpNo = 0; tmpNo < tmp_JINDO_count; tmpNo++) {

			menuCode = $('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').val();
			menuName = $('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').text();

			html += '<li id="jindo_' + menuCode + '">';
			html += '<label for="r_' + menuCode + '" onclick=\'radioCheck("r_' + menuCode + '");\'>';
			html += '<input type="radio" for="r_' + DANGE_SELECT_DATA + '" name="jindo_change" id="r_' + menuCode + '" value="' + menuCode + '" ';

			if (menuCode == JINDO_SELECT_DATA)
				html += 'checked';

			html += '>';
			html += ' ' + menuName + '';
			html += '</label>';
			html += '</li>'
		}
		$container = $('#dange_' + DANGE_SELECT_DATA);
		$ul = $container.find('ul');
		$ul.empty();
		$ul.append(html);

		$('#tree').treeview({
			persist : "location",
			collapsed : true,
			unique : true,
			toggle : function(idx, item) {
				if ($(item).css('display') == 'block') {
					var treeData = $.data.tree;
					var cDatas = $(this).attr('id').split('_');
					treeData.currentDange = cDatas[1];
					treeData.currentDangeTx = cDatas[2];
					//
					dangeJindoLoad({
						MATNR : treeData.currentDange
					});
				}
			}
		});

	}

	if ($("#" + zmat1_code + "_section").attr("CATEGORY") == "U") {

		//@ 다른 단계 트리 구성위해 데이터 호출
		course_code = $("#" + zmat1_code + "_section.menu" + MENU_CLICK_INDEX).attr("COURSE_CODE");


		DATA_STAGE_ARRAY = {
			DATABASE : []
		};
		tmp_DANGE_count = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option').size();

		for ( tmpNo = 0; tmpNo < tmp_DANGE_count; tmpNo++) {
			var nDATA = {
				"STAGE_NAME" : $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').text(),
				"STAGE_SEQ" : $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("STAGE_SEQ")
			};
			DATA_STAGE_ARRAY.DATABASE.push(nDATA);
		}

		pageParams_json = JSON.stringify(DATA_STAGE_ARRAY);

		app_startLoading('잠시만 기다려주세요.');

		tmp_ALL_count = $('#' + ZMAT1_SELECT_DATA + '_JINDO_ALL.menu' + MENU_CLICK_INDEX + ' option').size();

		back_stage_name = "";
		back_stage_seq = "";
		for ( tmpNo_ALL = 0; tmpNo_ALL < tmp_ALL_count; tmpNo_ALL++) {
			html = "";

			tmp_DATA = $('#' + ZMAT1_SELECT_DATA + '_JINDO_ALL.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo_ALL + ')').attr("DATA");
			tmp_DATA_split = tmp_DATA.split("@@");
			tmp_STAGE_SEQ = tmp_DATA_split[0];
			tmp_STAGE_NAME = tmp_DATA_split[1];
			tmp_DANGE_SEQ = tmp_DATA_split[2];
			tmp_DANGE_NAME = tmp_DATA_split[3];

			if (back_stage_name != tmp_STAGE_NAME) {

				tmp_DANGE_count = DATA_STAGE_ARRAY.DATABASE.length;
				for ( tmpNo = 0; tmpNo < tmp_DANGE_count; tmpNo++) {

					if (DATA_STAGE_ARRAY.DATABASE[tmpNo]["STAGE_NAME"] == tmp_STAGE_NAME) {
						tmp_STAGE_SEQ = DATA_STAGE_ARRAY.DATABASE[tmpNo]["STAGE_SEQ"]
						break;
					}

				}

				back_stage_name = tmp_STAGE_NAME;
				back_stage_seq = tmp_STAGE_SEQ;
			} else {
				tmp_STAGE_SEQ = back_stage_seq;
			}

			$container = $('#dange_' + tmp_STAGE_SEQ);
			$ul = $container.find('ul');
			try {
				if (String($ul.html()).indexOf("placeholder") >= 0)
					$ul.empty();
			} catch (e) {
			}

			menuCode = tmp_DANGE_SEQ;
			menuName = tmp_DANGE_NAME;

			html += '<li id="jindo_' + menuCode + '">';
			html += '<label for="r_' + menuCode + '" onclick=\'radioCheck("r_' + menuCode + '");\'>';
			html += '<input type="radio" name="jindo_change" id="r_' + menuCode + '" dange="' + tmp_STAGE_SEQ + '"  jindo_tx="' + tmp_DANGE_NAME + '" value="' + menuCode + '" ';

			if (menuName == JINDO_SELECT_DATA)
				html += 'checked';

			html += '>';
			html += ' ' + menuName + '';
			html += '</label>';
			html += '</li>'

			$ul.append(html);
		}

		$('#tree').treeview({
			persist : "location",
			collapsed : true,
			unique : true
		});

		app_endLoading();
	}

	window.scrollTo(0, 1);

}

// 트리 단계 진도 로드
function dangeJindoLoad(params) {
	loader.load({
		Function : "ZTBSD_GM_001_019",
		Parameter : params,
		Success : function(rlt) {
			var data = JSON.parse(rlt);
			if (!!data.Parameter) {
				var arr = data.Parameter.T_EXPORTA;
				addTreeChild(arr);
			}
		},
		Error : loadFailed
	});
}

// 트리에 메뉴 추가
function addTreeChild(arr) {
	var treeData = $.data.tree;
	var $container = $('#dange_' + treeData.currentDange);
	var $ul = $container.find('ul');
	$ul.empty();

	if (arr.length < 0) {
		$ul.append('<span>조회결과가 없습니다.</span>');
		return false;
	}
	//
	var html = "";
	var menuName = "", menuCode = "";
	var i = 0, len = arr.length, obj = null;
	for (; i < len; i += 1) {
		obj = arr[i];
		menuName = ($.trim(obj.MAKTX).length == 0) ? obj.MATNR : obj.MAKTX;
		menuCode = obj.MATNR;
		html += '<li id="jindo_' + menuCode + '" style="left:-20px;">';
		html += '<label for="r_' + menuCode + '" onclick=\'radioCheck("r_' + menuCode + '");\'>';
		html += '<input type="radio" for="r_' + treeData.currentDange + '" name="jindo_change" id="r_' + menuCode + '" value="' + menuCode + '" >';
		html += ' ' + menuName + '';
		html += '</label>';
		html += '</li>'
	}
	$ul.append(html);


}

// 로드 실패
function loadFailed() {
	//
}

// 트리 선택된것 체크
function radioCheck(giftNumber) {
	$("input:radio[value='" + giftNumber + "']").attr("checked", "checked");
}

// 호수조회 취소
function jindo_windows_close() {

	$("#Popup").css("display", "none");
	$("#Document").css("display", "");

	top_scroll();

}

// 호수조회 확인
function jindo_windows_check_end() {

	if ($('input:radio[name="jindo_change"]').is(":checked") == true) {

		var treeData = $.data.tree;
		var jvalues = $('input:radio[name=jindo_change]:checked').val();
        var ho_name = $('input:radio[name=jindo_change]:checked').parent().text();
		var DANGE = treeData.currentDange;
		var DANGE_TX = treeData.currentDangeTx;
        

        

		$.data.tree = null;

		jindo_windows_close();

		if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "B") {

			if (DANGE == -1) {
				DANGE = DANGE_SELECT_DATA;
				$("#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX).val(DANGE).attr("selected", "selected");
				$("#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX).val(jvalues).attr("selected", "selected");

				JINDO_change(ZMAT1_SELECT_DATA, jvalues, '');
			} else {

				loader.load({
					Function : "ZTBSD_GM_001_019",
					Parameter : {
						MATNR : DANGE
					},
					Success : function($data) {

						object_tmp = "#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX;
						$(object_tmp).html("");
						JsonData = JSON.parse($data);
						if (!!JsonData.Parameter) {
							$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

								if (entry["MAKTX"] != " ") {
									$(object_tmp).append("<option value='" + entry["MATNR"] + "' >" + entry["MAKTX"] + "</option>");
								} else {
									$(object_tmp).append("<option value='" + entry["MATNR"] + "' >" + Right(entry["MATNR"], 6) + "</option>");
									;
								}
								temp_max_num = temp_max_num + 1

							});

							DANGE_SELECT_DATA = DANGE;
							$("#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX).val(DANGE).attr("selected", "selected");
							$("#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX).val(jvalues).attr("selected", "selected");
							JINDO_change(ZMAT1_SELECT_DATA, jvalues, '');
						}
					},
					Error : loadFailed
				});
			}


            // 이번주 학습 씽크빅 이번주는 발송 하지않음
/*
              pageParams.data[MENU_CLICK_INDEX].ZMAT1_SHARE = ZMAT1_SELECT_DATA;
              pageParams.data[MENU_CLICK_INDEX].JINDO_SHARE = jvalues;       
              pageParams.data[MENU_CLICK_INDEX].DANGE_SHARE = DANGE_SELECT_DATA;
 */
			return;
		}

		if ($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("CATEGORY") == "U") {

			tmp_DANGE_SELECT_DATA = $("#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX + " option:selected").val();
			DANGE = $('input:radio[name=jindo_change]:checked').attr("dange");
			tmp_DANGE_count = $('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option').size();

			for ( tmpNo = 0; tmpNo < tmp_DANGE_count; tmpNo++) {
				if ($('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("stage_seq") == DANGE) {
					$('#' + ZMAT1_SELECT_DATA + '_DANGE.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("selected", "selected");
				}
			}

			JINDO_CHANGE_DATA = jvalues;

			DANGE_SELECT_DATA = $("#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX + " option:selected").val();
			if (tmp_DANGE_SELECT_DATA != DANGE_SELECT_DATA) {
				DANGE_change(ZMAT1_SELECT_DATA, DANGE_SELECT_DATA);
			} else {
				tmp_JINDO_count = $('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option').size();
				for ( tmpNo = 0; tmpNo < tmp_JINDO_count; tmpNo++) {
					if ($('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("EDITION_SEQ") == jvalues) {
						$('#' + ZMAT1_SELECT_DATA + '_JINDO.menu' + MENU_CLICK_INDEX + ' option:eq(' + tmpNo + ')').attr("selected", "selected");
					}
				}
				JINDO_change(ZMAT1_SELECT_DATA, '', '');
			}

		}

	} else {
		app_alert("변경하실 호를 선택해주세요.");
		return;
	}
}

// 학습내용확인
function study_click(zmat1_code) {

	if ($("#" + zmat1_code + "_STUDY_SUBJECT").css("display") == "none") {
		$("#" + zmat1_code + "_STUDY_SUBJECT").show();
		if ($("#" + zmat1_code + "_STUDY_SUBJECT2").html() != "")
			$("#" + zmat1_code + "_STUDY_SUBJECT2").show();
	} else {
		$("#" + zmat1_code + "_STUDY_SUBJECT").hide();
		$("#" + zmat1_code + "_STUDY_SUBJECT2").hide();
	}
}

// 날짜설정 달력 반환함수
function visit_date_insert($data) {

	$data = $data.substr(0, 10);
	$("#" + ZMAT1_SELECT_DATA + "_visit_date").val($data);

	set_rePlan(ZMAT1_SELECT_DATA);
}

function date_Cal(tmp_year, tmp_month, tmp_day) {

	var date = new Date();
	date.setFullYear(tmp_year);
	date.setDate(tmp_day);
	date.setMonth(tmp_month - 1);

	mm = (date.getMonth() + 1);
	if (mm < 10)
		mm = "0" + (date.getMonth());
	tmp_year2 = date.getFullYear();
	tmp_month2 = mm;
	tmp_day2 = date.getDate();
	if (tmp_day2 < 10)
		tmp_day2 = "0" + (tmp_day2);
	tmp_date2 = tmp_year2 + "" + tmp_month2 + "" + tmp_day2;

	var returnV = new Array(4);
	returnV[0] = tmp_year2;
	returnV[1] = tmp_month2;
	returnV[2] = tmp_day2;

	return returnV;
}

// 문자끝에서부터 숫자만큼 텍스트 반환
function Right(str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

// 스크롤 상단으로 이동
function top_scroll() {

	$('#Document #Aside button.top-button').hide();
	setTimeout(function() {

		window.scrollTo(0, $("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).offset().top - 34);
		$('#Document #Aside button.top-button').hide();

	}, 100);

}

// 과목이름 변경
var rename_zmat = function(zmat_name) {

	if (zmat_name == "바로셈") {
		zmat_name = "바셈";
	}
	if (zmat_name == "씽크U국어") {
		zmat_name = "씽U국";
	}
	if (zmat_name == "씽크U사회과학") {
		zmat_name = "씽U사";
	}
	if (zmat_name == "씽크U수학") {
		zmat_name = "씽U수";
	}
	if (zmat_name == "씽크U영어(방문형)") {
		zmat_name = "씽U영(방)";
	}
	if (zmat_name == "씽크U한자") {
		zmat_name = "씽U한자";
	}
	if (zmat_name == "바로독해") {
		zmat_name = "바독";
	}
	if (zmat_name == "스마트영어") {
		zmat_name = "스영";
	}
	if (zmat_name == "(신)한글깨치기") {
		zmat_name = "(신)한깨";
	}
	if (zmat_name.indexOf("한글깨치기") >= 0) {
		zmat_name = "한글깨치기";
	}
	return zmat_name;
}
//@ getparam data
function menu_text_set() {

	try {
		tmp_ZMAT1_TX = $("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("ZMAT1_TX");
		DANGE_TEXT = $("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_TX");
		JINDO_TEXT = $("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("JINDO_TX");
        


		tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);

		try {
			if (DANGE_TEXT.indexOf(tmp_ZMAT1_TX) >= 0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
				if (DANGE_TEXT.indexOf("_") >= 0) {
					DANGE_TEXT = DANGE_TEXT.split("_")[1];
				}
			}
		} catch (e) {
			DANGE_TEXT = "";
		}

		try {
			if (JINDO_TEXT.indexOf(DANGE_TEXT) >= 0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
				if (JINDO_TEXT.indexOf("_") >= 0) {
					JINDO_TEXT = JINDO_TEXT.split("_")[1];
					if (JINDO_TEXT.indexOf("_") >= 0) {
						JINDO_TEXT = JINDO_TEXT.split("_")[1];
						if (JINDO_TEXT.indexOf("_") >= 0) {
							JINDO_TEXT = JINDO_TEXT.split("_")[1];
						}
					}
				}
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		DANGE_JINDO_TEXT = DANGE_TEXT + "단계  &nbsp;" + JINDO_TEXT + "호";

		$("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
		$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT", $("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html());
	} catch (e) {
	}

}

// 탭 이름
function menu_text_reload_big() {

	$("#" + ZMAT1_SELECT_DATA + "_head.menu" + MENU_CLICK_INDEX).html(String($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).html()).split("&nbsp;&nbsp;")[1]);

	DANGE_JINDO_TEXT = "";
	DANGE_JINDO_TEXT = $("#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX + " option:selected").text();

	$("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
	$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT", $("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html());

}

// 탭이름
function menu_text_reload(new_is) {

	DANGE_JINDO_TEXT = "";
	if (new_is == true) {

		//# 단계명 편집
		try {
			tmp_ZMAT1_TX = $("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("ZMAT1_TX");

			tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);

			DANGE_TEXT = $("#" + ZMAT1_SELECT_DATA + "_DANGE.menu" + MENU_CLICK_INDEX + " option:selected").text();

			if (tmp_ZMAT1_TX == "(신)한깨" && DANGE_TEXT.indexOf(tmp_ZMAT1_TX) < 0) {
				tmp_ZMAT1_TX = "(신)한글깨치기";
			}
			if (DANGE_TEXT.indexOf(tmp_ZMAT1_TX) >= 0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
			}
		} catch (e) {
			DANGE_TEXT = "";
		}
		DANGE_TEXT = DANGE_TEXT.replace("_", "");
		if (DANGE_TEXT.length > 6) {
			DANGE_TEXT = Left(DANGE_TEXT, 6) + "..";
		}

		//# 호수명 편집
		try {
			JINDO_TEXT = $("#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX + " option:selected").text();
			if (JINDO_TEXT.indexOf(DANGE_TEXT) >= 0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
			}
			if (JINDO_TEXT.indexOf("_") >= 0) {
				JINDO_TEXT = JINDO_TEXT.split("_")[JINDO_TEXT.split("_").length - 1];
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		try {
			if (JINDO_TEXT.indexOf("단계") >= 0) {
				JINDO_TEXT = JINDO_TEXT.split("단계")[1];
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		if (JINDO_TEXT.length > 6) {
			JINDO_TEXT = Left(JINDO_TEXT, 6) + "..";
		}

		JINDO_TEXT_RE = $("#" + ZMAT1_SELECT_DATA + "_JINDO.menu" + MENU_CLICK_INDEX + " option:selected").text();
		DANGE_JINDO_TEXT = DANGE_TEXT;
		if (DANGE_JINDO_TEXT.indexOf("바로셈") >= 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("바로셈")[1];
		}
		if (DANGE_JINDO_TEXT.indexOf("(") >= 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("(")[0];
		}

		//# 단계 글씨가 있지 않을 경우
		if (DANGE_JINDO_TEXT.indexOf("단계") < 0) {
			DANGE_JINDO_TEXT = DANGE_TEXT + "단계 &nbsp;";
		} else {
			DANGE_JINDO_TEXT = DANGE_TEXT + " &nbsp;";
		}

		if (JINDO_TEXT_RE.indexOf("호") < 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT + "호";
		} else {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT;
		}

		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계", "단계");

		$("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
		$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT", $("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html());

	} else {

		$("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html($("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT"));

	}
}

function check_radio_load() {

	$('input.graphic').each(function() {
		var $form = $(this);
		var target = $form.attr('id');
		var $label = $('label[for="' + target + '"]');

		$label.find('>span:first').find('>button').removeClass("graphic cbr-type").addClass(function() {
			if ($form.is(':disabled'))
				return "disabled";
		}).addClass(function() {
			if ($form.is(':checked'))
				return "check";
		}).parents('label').children().on('click', function() {
			if ($.browser.msie && $.browser.version < 9)
				$form.toArray()[0].click();
		});

		$form.click(function() {
			if ($form.is(':checkbox')) {
				if ($form.get(0).checked !== true) {
					$label.find('>span:first>button').removeClass("check");
				} else {
					$label.find('>span:first>button').addClass("check");
				}
			} else if ($form.is(':radio')) {
				if ($form.get(0).checked === true) {
					$('span.' + this.name + '-Radio>button').removeClass("check");
					$label.find('>span:first>button').addClass("check");
				}
			}
		});
	});
}

// 셀렉트 박스 유효성 체크
function validity_select_value(valid_object, valid_value) {

	tmp_count = $(valid_object + " option").size();
	for ( tmpNo = 0; tmpNo < tmp_count; tmpNo++) {
		if ($(valid_object + " option:eq(" + tmpNo + ")").val() == valid_value) {
			return true;
		}
	}

	return false;
}

// 데이터 유효성 체크
var visibility_data_comment = function(data_is, comment_data) {
	setTimeout(function() {
		if (data_is == true) {
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_DATACONTENT").css("display", "block");
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_NOT_DATACONTENT").css("display", "none");
		} else {
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_DATACONTENT").css("display", "none");
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_NOT_DATACONTENT").css("display", "");

			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div." + ZMAT1_SELECT_DATA + "_NOT_DATACONTENT").html(comment_data);

			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find("div.selecting").css("display", "none");
		}

		if (comment_data == "계획된 진도가 없습니다.") {

			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("RECORD_NO", "0");

			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find('span.control').addClass('none');
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).find('h2').removeClass('has-control');

			$("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html("");
			$("#" + ZMAT1_SELECT_DATA + "_section.menu" + MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT", $("#" + ZMAT1_SELECT_DATA + "_DANGE_JINDO_TEXT.menu" + MENU_CLICK_INDEX).html());
		}

		top_scroll();
	}, 100);
};

// 문자열시작부터 갯수만큼 잘라 반환
function Left(Str, Num) {
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}