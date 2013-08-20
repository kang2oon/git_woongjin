
/**
 * 
 * 지난주 학습점검
 * 
 * 공통 - A020100.js
 * 싱크빅 - A020100_b.js
 * 싱크u - A020100_u.js
 * 
 * */

// 단계 데이터 로드
function dataload_dange_big() {

    //첫 수업일이 아직 안된 것 제외 NDH
	if( $.trim($("#"+ZMAT1_SELECT_DATA+"_next_s.menu"+MENU_CLICK_INDEX).val())=="X" ) {
			visibility_data_comment(false, "첫 수업일이 도래 하지 않았습니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
	}
    
            
	//# 비관리과목 제외 처리
	if($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).hasClass('subject_txt_color3')) {

		visibility_data_comment(false, "유아 및 비관리 과목은 지난주학습정보를<br>지원하지 않습니다.");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
		return;

	}
	//# 비관리과목 제외 처리 끝



	//# 정답지 비관리 제외
	if($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).hasClass('subject_txt_color1')) {

		if( filter[tmp_SUBJECT_CODE]==undefined ){

			visibility_data_comment(false, "정답지 관리 과목이 아닙니다.");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");
			return;
		}

	}
	//# 정답지 비관리 제외
    
            
	menu_text_set();



	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SCH_Z",
		Parameter: {
			I_GUBUN: "2",
			I_ZMAT1: ZMAT1_SELECT_DATA
		},
		Success: function($data){
			JsonData = JSON.parse( $data );

			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					if(entry["DANGE_TX"]!=" ") {
						$(object_tmp).append("<option value='"+entry["DANGE"]+"'>"+entry["DANGE_TX"]+"</option>");
					} else {
						$(object_tmp).append("<option value='"+entry["DANGE"]+"'>"+Right(entry["DANGE"],6)+"</option>");;
					}
				}); 

				LOADING_DANGE_SELECT_DATA = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE");



				if(LOADING_DANGE_SELECT_DATA!="") {

					if( $(object_tmp+' option[value='+LOADING_DANGE_SELECT_DATA+']').length==0 ){
						var o = pageParams.data[MENU_CLICK_INDEX];
						var nm = o.DANGE_PTX;
						$(object_tmp).append( '<option value="'+LOADING_DANGE_SELECT_DATA+'" stlkn="">'+nm+'</option>' );
					}
					$(object_tmp).val(LOADING_DANGE_SELECT_DATA).attr("selected", "selected");
                    
                    //이거 뭐임..
					LOADING_DANGE_SELECT_DATA="";
					$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE",LOADING_DANGE_SELECT_DATA);


					if( validity_select_value(object_tmp, LOADING_DANGE_SELECT_DATA)==false ) {
						HAS_CONTROL = false;
						$("#"+ZMAT1_SELECT_DATA+"_section" ).find('span.control').addClass('none');
						$("#"+ZMAT1_SELECT_DATA+"_section" ).find('h2').removeClass('has-control');

					}

					DANGE_change(ZMAT1_SELECT_DATA, $(object_tmp).val());


				} else {

				}

			} else {

				var msg = "해당 단계, 호수는 정답지가 없습니다.";
				if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0){
					msg = "해당 권수는 정답지가 없습니다."
				}
				visibility_data_comment(false, msg );

			}

		},
		Error: function($e){
			var msg = "해당 단계, 호수는 정답지가 없습니다.";
			if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0){
				msg = "해당 권수는 정답지가 없습니다."
			}
			visibility_data_comment(false, msg );
		}
	});
}

// 단계 변경시
function DANGE_change_big() {

	//@ 바로셈 권수 검색
	if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0) 
	{
		$("#"+ZMAT1_SELECT_DATA+"_BOOK.menu"+MENU_CLICK_INDEX).show();
	} else {
		$("#"+ZMAT1_SELECT_DATA+"_BOOK.menu"+MENU_CLICK_INDEX).hide();
	}

	$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LAST_DANGE", DANGE_SELECT_DATA);


	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SCH_Z",
		Parameter: {
			I_GUBUN: "3",
			I_ZMAT1: ZMAT1_SELECT_DATA,
			I_DANGE: DANGE_SELECT_DATA
		},
		Success: function($data){
			JsonData = JSON.parse( $data );

			temp_max_num=0;
			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					if(entry["JINDO_TX"]!=" ") {
						$(object_tmp).append("<option value='"+entry["JINDO"]+"' STLKN='"+entry["STLKN"]+"'>"+entry["JINDO_TX"]+"</option>");
					} else {
						$(object_tmp).append("<option value='"+entry["JINDO"]+"' STLKN='"+entry["STLKN"]+"'>"+Right(entry["JINDO"],6)+"</option>");;
					}

					temp_max_num=temp_max_num+1
				}); 

				JINDO_SELECT_MAX=temp_max_num;
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX",JINDO_SELECT_MAX);

				LOADING_JINDO_SELECT_DATA = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("JINDO");
				LOADING_STLKN_SELECT_DATA = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("STLKN");

				if(LOADING_JINDO_SELECT_DATA!="") {

					if( $(object_tmp+' option[value='+LOADING_JINDO_SELECT_DATA+']').length==0 ){
						var o = pageParams.data[MENU_CLICK_INDEX];
						var nm = o.JINDO_PTX;
						$(object_tmp).append( '<option value="'+LOADING_JINDO_SELECT_DATA+'" stlkn="">' +nm+'</option>' );
					}

					$(object_tmp).val(LOADING_JINDO_SELECT_DATA).attr("selected", "selected");
					LOADING_JINDO_SELECT_DATA="";
					LOADING_STLKN_SELECT_DATA="";

					JINDO_change(ZMAT1_SELECT_DATA, $(object_tmp).val(), $(object_tmp).attr("STLKN"));
                    

				} else {

				}

			} else {

			}
		},
		Error: function($e){
			top_scroll();

			var msg = "해당 단계, 호수는 정답지가 없습니다.";
			if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0){
				msg = "해당 권수는 정답지가 없습니다."
			}
			visibility_data_comment(false, msg );
		}
	});
}

// 바로셈 권 변경시
var BOOK_change = function() {

	BOOK_SELECT_DATA	= $("#"+ZMAT1_SELECT_DATA+"_BOOK.menu"+MENU_CLICK_INDEX).val();
}

// 진도 셀렉트 변경
function JINDO_change_big() {

	var Tmp_Parameter={};
	var LoadFunction;



	//@ 바로셈 권수 검색
	if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0) 
	{
		BOOK_change();
		LoadFunction="ZTBSD_GM_214_ANSWER_SEARCH_B";
		Tmp_Parameter = {
				I_ZMAT1: ZMAT1_SELECT_DATA,
				I_DANGE: DANGE_SELECT_DATA,
				I_JINDO: JINDO_SELECT_DATA,
				I_BOOKS: BOOK_SELECT_DATA
		};
	} else {
		LoadFunction="ZTBSD_GM_214_ANSWER_SEARCH";
		Tmp_Parameter = {
				I_ZMAT1: ZMAT1_SELECT_DATA,
				I_DANGE: DANGE_SELECT_DATA,
				I_JINDO: JINDO_SELECT_DATA,
				I_STLKN: STLKN_SELECT_DATA
		};
	}

	$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("LAST_JINDO", JINDO_SELECT_DATA);
	menu_text_reload_big();


	try
	{
		if( filterA020400[tmp_SUBJECT_CODE]==undefined ){
			$('#'+ZMAT1_SELECT_DATA+'_check.menu'+MENU_CLICK_INDEX+' option:selected').parent().parent().parent().css("display","none");
		}
	}
	catch (e)
	{
	}


	loader.load( {
		Function: LoadFunction,
		Parameter:Tmp_Parameter,
		Success: function($data){

			JsonData = JSON.parse( $data );
			max_num = 0;
			num_cell = 1;

			tmp_object = "#"+ZMAT1_SELECT_DATA+"_ANSWER_TB.menu"+MENU_CLICK_INDEX;
			$(tmp_object).html("");

			if( !!JsonData.Parameter ){


				/** ==================================================================================== start
				 * 맞은 갯수 셀렉트 박스 초기화.
				 * 
				 * 2012.11.22 / 유정석
				 * 호 변경시 기존목록 남는것 삭제, 기존에 선택후 호변경하면 초기화되지 않는것 수정.
				 * */

				var $opt = $('#'+ZMAT1_SELECT_DATA+'_check.menu'+MENU_CLICK_INDEX+' option:selected');
				$opt.removeAttr('selected');

				if( $("#"+ZMAT1_SELECT_DATA+"_check.menu"+MENU_CLICK_INDEX+" option:contains('개 맞음')").length > 0 ){
					$("#"+ZMAT1_SELECT_DATA+"_check.menu"+MENU_CLICK_INDEX+" option:contains('개 맞음')").each(function(){
						$(this).remove();
					});
				}

				$opt = $( $('#'+ZMAT1_SELECT_DATA+'_check.menu'+MENU_CLICK_INDEX+' option')[0] );
				$opt.attr('selected', 'true');

				$('#'+ZMAT1_SELECT_DATA+'_check_data.menu'+MENU_CLICK_INDEX).val('');

				/** 
				 * 맞은 갯수 셀렉트 박스 초기화.
				 *==================================================================================== end */

				part_name_cnt=0;
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					//@ 바로셈 권수 검색
					if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0) 
					{

						var Imgsrc = "http://211.55.28.74:8080/itutor/"+entry["TEXT2"]; 

						Imgsrc = "<img src="+Imgsrc+" class='lgp' />";
						$(tmp_object).html($(tmp_object).html()+"<tr><td colspan=2>"+Imgsrc+"</td></tr>");

					} else {

						if(entry["Q_NUM"]=="1") {
							$(tmp_object).html($(tmp_object).html()+"<tr><th scope='row' colspan=2>"+entry["PART1_TX"]+"</th></tr>");

							part_name_cnt=part_name_cnt+1;

						}

						if(entry["PHOTO"]=="X") {

							var Imgsrc = "http://211.55.28.74:8080/itutor/"+entry["TEXT1"]; 

							Imgsrc = "<img src="+Imgsrc+" class='lgp' />";
							$(tmp_object).html($(tmp_object).html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+Imgsrc+"</td></tr>");

						} else {

							$(tmp_object).html($(tmp_object).html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+entry["TEXT1"]+"</td></tr>");

						}
					}

					max_num = max_num+1;

				}); 

				count_num=1;
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
					$("#"+ZMAT1_SELECT_DATA+"_check.menu"+MENU_CLICK_INDEX).append("<option value='"+(max_num-count_num)+"'>"+(max_num-count_num)+"개 맞음</option>");
					count_num = count_num+1;
				}); 



				if(max_num>0) {
					$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('div.'+ZMAT1_SELECT_DATA+'_NOT_DATACONTENT').css("display","none");
				}

				$("#"+ZMAT1_SELECT_DATA+"_check_record").val(max_num);


				if($('#'+ZMAT1_SELECT_DATA+'_check_data.menu'+MENU_CLICK_INDEX).val()>0) {
					$('#'+ZMAT1_SELECT_DATA+'_check.menu'+MENU_CLICK_INDEX).val($('#'+ZMAT1_SELECT_DATA+'_check_data.menu'+MENU_CLICK_INDEX).val()).attr("selected", "selected");

				}



			} else {
				$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('div.'+ZMAT1_SELECT_DATA+'_DATACONTENT').css("display","none");

			}

			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO",max_num);

			$("select[name="+ZMAT1_SELECT_DATA+"_check].menu"+MENU_CLICK_INDEX+" option[value="+max_num+"]").remove();


			top_scroll();
		},
		Error: function($e){
			top_scroll();

			var msg = "해당 단계, 호수는 정답지가 없습니다.";
			if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0){
				msg = "해당 권수는 정답지가 없습니다."
			}
			visibility_data_comment(false, msg );
			return;
		}
	});
}