
/**
 * 이번주 학습정보 씽크빅
 * */

//단계 로드
function dataload_dange_big() {

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

	// 단계 로드
	loader.load( {
		Function: "ZTBSD_GM_001_018",
		Parameter: {
			ZMAT1: ZMAT1_SELECT_DATA
		},
		Success: function($data){
			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					if(entry["MAKTX"]!=" ") {
						$(object_tmp).append("<option value='"+entry["MATNR"]+"'>"+entry["MAKTX"]+"</option>");
					} else {
						$(object_tmp).append("<option value='"+entry["MATNR"]+"'>"+Right(entry["MATNR"],6)+"</option>");;
					}
				}); 

				LOADING_DANGE_SELECT_DATA = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE");

				if(LOADING_DANGE_SELECT_DATA!="") {
					if(validity_select_value(object_tmp, LOADING_DANGE_SELECT_DATA)) {

						$(object_tmp).val(LOADING_DANGE_SELECT_DATA).attr("selected", "selected");
						LOADING_DANGE_SELECT_DATA="";
						$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE",LOADING_DANGE_SELECT_DATA);
						DANGE_change(ZMAT1_SELECT_DATA, $(object_tmp).val());

					} else {
						tmp_tx = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_TX");
						visibility_data_comment(false, "\""+tmp_tx+"\"단계는<br><br>학습정보가 지원되지 않는 단계입니다.");
					}
				} else {
					//
				}
			} else {
				//
			}
		},
		Error: function($e){
			app_alert("단계 데이터가 없습니다.");
			JsonData = $e;
		}
	});
}

//단계로드
function DANGE_change_big() {
	loader.load( {
		Function: "ZTBSD_GM_001_019",
		Parameter: {
			MATNR: DANGE_SELECT_DATA
		},
		Success: function($data){
			JsonData = JSON.parse( $data );
			temp_max_num=0;
			//
			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
					if(entry["MAKTX"]!=" ") {
						$(object_tmp).append("<option value='"+entry["MATNR"]+"' >"+entry["MAKTX"]+"</option>");
					} else {
						$(object_tmp).append("<option value='"+entry["MATNR"]+"' >"+Right(entry["MATNR"],6)+"</option>");;
					}
					temp_max_num=temp_max_num+1
				}); 
				JINDO_SELECT_MAX=temp_max_num;
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX",JINDO_SELECT_MAX);
				LOADING_JINDO_SELECT_DATA = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("JINDO");
				if(LOADING_JINDO_SELECT_DATA!="") {
					$(object_tmp).val(LOADING_JINDO_SELECT_DATA).attr("selected", "selected");
					LOADING_JINDO_SELECT_DATA="";
					JINDO_change(ZMAT1_SELECT_DATA, $(object_tmp).val(), $(object_tmp).attr("STLKN"));
				} else {
					//
				}
			} else {
				//
			}
		},
		Error: function($e){
			app_alert("단계 데이터가 없습니다.");
			JsonData = $e;
		}
	});
}


//호수 로드
function JINDO_change_big() {
	var param = {
			i_subject_code : Right(ZMAT1_SELECT_DATA,4),
			i_stage_code : Right(DANGE_SELECT_DATA,4),
			i_ho_code : Right(JINDO_SELECT_DATA,6)
	}
	//
	pageParams_json = JSON.stringify( param );
	//
	loader.service({
		Function : 'sp_ap_it_tgd_s_c',
		Parameter : param,
		Success: function(data){
			setTimeout(function() { JINDO_change_big_Success(data); }, 100);
		},
		Error: function($e){
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			visibility_data_comment(false, "학습정보 데이터가 없습니다.");
		}
	});
}


//호수 로드 완료
function JINDO_change_big_Success(data) {
	index_num = 0;
	//
	var $section = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX);
	//
	$section.find('.'+ZMAT1_SELECT_DATA+'_category_math').css("display","none");
	$section.find('.'+ZMAT1_SELECT_DATA+'_category_language').css("display","none");
	$section.find('.'+ZMAT1_SELECT_DATA+'_category_chinese').css("display","none");
	$section.find('.'+ZMAT1_SELECT_DATA+'_category_koreanmaster').css("display","none");
	$section.find('.viewport').eq(0).css("display","");
	//
	$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_A').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_B').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_C').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_A').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_B').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_C').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_A').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B').html("");
	$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C').html("");
	//
	if($(data).find('Table1').find("RESCODE").text()!="0") {
		visibility_data_comment(false, "데이터가 정상적이지 않습니다. sp_ap_it_tgd_s_c<br><br>i_subject_code : "+Right(ZMAT1_SELECT_DATA,4)+"<br><br>i_stage_code : "+Right(DANGE_SELECT_DATA,4)+"<br><br>i_ho_code : "+Right(JINDO_SELECT_DATA,6)+"");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;
	}
	//
	if( $(data).find('Table').length>0 ){
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO",$(data).find('Table').length);
		$(data).find('Table').each(function(){
			index_num = index_num + 1;
			//
			tmp_IDX_NUM		= $(this).find( 'IDX_NUM' ).text();
			tmp_MENT_GBN	= $(this).find( 'MENT_GBN' ).text();
			tmp_DETAIL		= $(this).find( 'DETAIL' ).text();
			tmp_MENT_TEXT	= $(this).find( 'MENT_TEXT' ).text();
			tmp_MENT_TITLE	= String($(this).find( 'MENT_TITLE' ).text()).substring(0,1);
			tmp_MENT_SUB	= $(this).find( 'MENT_SUB' ).text();
			tmp_MENT_TEXT2	= $(this).find( 'MENT_TEXT2' ).text();
			//
			tmp_MENT_GBN=tmp_MENT_GBN.replace(/#n/g,"<br>");
			tmp_DETAIL=tmp_DETAIL.replace(/#n/g,"<br>");
			//
			if(tmp_MENT_TITLE=="A" && tmp_MENT_TEXT=="0") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_'+tmp_MENT_TITLE).html(tmp_MENT_GBN);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("국어")<0) {
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				}
			} else if(tmp_MENT_TITLE=="A") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
			}
			//
			if(tmp_MENT_TITLE=="B" && tmp_MENT_TEXT=="0") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').css("display","");
				$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_'+tmp_MENT_TITLE).html(tmp_MENT_GBN);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE).html(tmp_DETAIL);

				if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("국어")<0) {
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				}
			} else if(tmp_MENT_TITLE=="B") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE+tmp_MENT_TEXT).html(tmp_MENT_GBN);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT).html(tmp_DETAIL);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT).parent().find("h4").eq(Number(tmp_MENT_TEXT)-1).removeClass("none");
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				//
				if(Number(tmp_MENT_SUB)>0) {
					if(Number(tmp_MENT_TEXT2)==0) {
						$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE+tmp_MENT_TEXT+'_'+tmp_MENT_SUB).html(tmp_DETAIL);
					} else {
						$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT+'_'+tmp_MENT_SUB).html(tmp_DETAIL);
					}
				}
			}
			//
			if(tmp_MENT_TITLE=="C" && tmp_MENT_TEXT=="0") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_'+tmp_MENT_TITLE).html(tmp_MENT_GBN);
				$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_C').parent().parent().parent().parent().removeClass("none");
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("국어")<0) {
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				}
			} else if(tmp_MENT_TITLE=="C") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE+tmp_MENT_TEXT).html(tmp_MENT_GBN);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT).html(tmp_DETAIL);
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT).parent().find("h4").eq(Number(tmp_MENT_TEXT)-1).removeClass("none");
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE).html(tmp_DETAIL);
				//
				if(Number(tmp_MENT_SUB)>0) {
					if(Number(tmp_MENT_TEXT2)==0) {
						$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_'+tmp_MENT_TITLE+tmp_MENT_TEXT+'_'+tmp_MENT_SUB).html(tmp_DETAIL);
					} else {
						$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_'+tmp_MENT_TITLE+tmp_MENT_TEXT+'_'+tmp_MENT_SUB).html(tmp_DETAIL);
					}
				}
			}
		});
		//
		if( $section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_A').html()=="") {
			try
			{
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_A').parent().parent().parent().find("div").eq(0).css("display","none");
			}
			catch (e)
			{
				//
			}
		}
		//
		if( $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("수학")>=0 ) {
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_math').css("display","");
		}
		//
		if( $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("국어")>=0 ) {
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').css("display","none");
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_language').css("display","");
			$section.find('#'+ZMAT1_SELECT_DATA+'_MENT_GBN_A_DV').css("display","none");
		}
		//
		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("한글깨치기")>=0) {
			$section.find('.'+ZMAT1_SELECT_DATA+'_MENT_GBN_A').parent().parent().parent().find("div").eq(0).css("display","none");
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').css("display","none");
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_koreanmaster').css("display","");
		}
		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("한자")>=0) {
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').css("display","none");
			$section.find('.'+ZMAT1_SELECT_DATA+'_category_chinese').css("display","");
			if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C').html()=="") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C').parent().parent().addClass("none");
			}
		}
		//
		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX").indexOf("수학")>=0) {
			if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B1').html()=="") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B1').parent().find("h4").eq(0).addClass("none");
			}
			if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B2').html()=="") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B2').parent().find("h4").eq(1).addClass("none");
			}
			if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B1').html()=="" && $('.'+ZMAT1_SELECT_DATA+'_DETAIL_B2').html()=="") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').find("button").addClass("none");
			} else {
				$section.find('.'+ZMAT1_SELECT_DATA+'_category_math_B').find("button").removeClass("none");
			}
			if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C').html()=="") {
				$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C').parent().parent().parent().parent().addClass("none");
			}
		}
		//# 티칭 포인트 상세 / 주요 설명 방법 - 데이터가 없을 경우
		bool_detail_b_no = 2;
		if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B1').html()=="") {
			$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_B1').addClass("none");
			bool_detail_b_no = bool_detail_b_no - 1;
		}
		if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B2').html()=="") {
			$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_B2').addClass("none");
			bool_detail_b_no = bool_detail_b_no - 1;
		}
		if(bool_detail_b_no==0) {
			$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B').parent().find("div").eq(1).addClass("none");
		}
		//# -- END
		try
		{
			for(loop_no=1;loop_no<=4;loop_no++) {
				if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_B'+loop_no+'_1').find("span").html()=="") {
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_B'+loop_no+'_1').addClass("none");
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_B'+loop_no+'_1').addClass("none");
				}
			}
		}
		catch (e)
		{
			//
		}
		try
		{
			for(loop_no=1;loop_no<=4;loop_no++) {
				if($section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_C'+loop_no+'_1').find("span").html()=="") {
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_TITLE_C'+loop_no+'_1').addClass("none");
					$section.find('.'+ZMAT1_SELECT_DATA+'_DETAIL_C'+loop_no+'_1').addClass("none");
				}
			}
		}
		catch (e)
		{
			//
		}
		menu_text_reload_big();
		visibility_data_comment(true);
	} else {
		visibility_data_comment(false, "데이터 정보가 없습니다. <br><br>i_subject_code : "+Right(ZMAT1_SELECT_DATA,4)+"<br><br>i_stage_code : "+Right(DANGE_SELECT_DATA,4)+"<br><br>i_ho_code : "+Right(JINDO_SELECT_DATA,6)+"");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
	}
	top_scroll();
}
