
/**
 * 
 * 지난주 학습점검
 * 
 * 공통 - A020100.js
 * 싱크빅 - A020100_b.js
 * 싱크u - A020100_u.js
 * 
 * */

//에러 메세지
var msg_E001 = "스케쥴에서 전달받은 데이터가 없습니다.";
var msg_E00Z = "Error: 데이터가 없습니다.";


var JsonData;
var $container;
var pageParams;


//씽크U SOAP 과목 코드
var course_code = "";

//@ 호수변경 통해서 단계/호 조회하는 경우
var DANGE_CHANGE_DATA = "";
var JINDO_CHANGE_DATA = "";


MENU_CLICK_INDEX = 1;	//@ 과목 선택 INDEX 저장
ZMAT1_SELECT_DATA = ""; // 선택한 과목코드
DANGE_SELECT_DATA = ""; // 선택한 단계코드
JINDO_SELECT_DATA = ""; // 선택한 진도코드
BOOK_SELECT_DATA = "";  

LOADING_DANGE_SELECT_DATA = "";
LOADING_JINDO_SELECT_DATA = "";

var object_tmp="";

var HAS_CONTROL = true;

var tmp_SUBJECT_CODE="";

//오리지날 내용 저장을 위한 변수.
var ZMAT1_ORI = new Array();
var ZMAT1_TX_ORI = new Array();

var JINDO_ORI = new Array();
var JINDO_TX_ORI = new Array();

var DANGE_ORI = new Array();
var DANGE_TX_ORI = new Array();

 

/********************************************************************************/
//BASE logic 
/********************************************************************************/



//페이지 시작
$(document).ready(function(){
	app_endLoading();

	/* Tail */
	template_hanja = $('#modal_hanja').html();
	$('#modal_hanja').remove();

	$container	= $("#Contents .container");

	// 현재 페이지로 전달된 데이터 수신
	// 파라미터 : 함수명
	app_getRequestParameter( 'setData' );

});




//디바이스에서 페이지 데이터 반환 받을 함수.
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="''" && String($data)!='""' ) {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		pageParams_json = JSON.stringify( pageParams );
        


		// 업무처리 가능여부 저장
		if(pageParams.USED!=undefined){
			if(pageParams.USED=="true"){
				IS_USED = true;
			}
		}





		var name = pageParams.NAME1==undefined? pageParams.KUNWE_TX : pageParams.NAME1;

		app_changeTitle(name);
		dataLoad();

	} else {
		app_alert(msg_E001);
		return;
	}

};


/********************************************************************************/
//PAGE logic 
/********************************************************************************/

// 정답지 가능 과목
var filter = {
		'000000000000001090': '씽크U 수학',
		'000000000000001114': '씽크U 사회과학',
		'000000000000001131': '씽크U 국어',
		'000000000000001148': '씽크U 영어',
		'000000000000001162' : '씽크U한자',
		'000000000000001112' : '한글깨치기',							
		'000000000000001001': '국어',
		'000000000000001000': '수학',
		'000000000000001002': '한자',
		'000000000000001022': '바로셈',
		'000000000000001087': '바로독해',
		'000000000000001056': '스마트영어'
}

// 상담안 가능과목
var filterA020400 = {
		'000000000000001090': '씽크U 수학',
		'000000000000001000' : '수학',
		'000000000000001114' : '씽크U사회과학',
		'000000000000001148' : '씽크U영어',
		'000000000000001131' : '씽크U국어',
		'000000000000001162' : '씽크U한자',
		'000000000000001112' : '한글깨치기',
		'000000000000001001' : '국어',
		'000000000000001002' : '한자'
}
// 이번주학습정보 가능과목
var filterA020300 = {
		'000000000000001090': '씽크U 수학',
		'000000000000001000' : '수학',
		'000000000000001114' : '씽크U사회과학',
		'000000000000001148' : '씽크U영어',
		'000000000000001131' : '씽크U국어',
		'000000000000001162' : '씽크U한자',
		'000000000000001112' : '한글깨치기',
		'000000000000001001' : '국어',
		'000000000000001002' : '한자'
}


var record_check="";


//페이지 이동처리
var changePage = function(page_name){
	var url = page_name;
	tmpChecked = record_check.split(";");

	var tmp_SUBJECT_CODE="";

	if(!!pageParams) {
		$.each(pageParams.data, function(index, entry) {
            
//app_alert("test");
             //페이지 이동시에는 원본ZMAT1 으로 변경 2013.03.05 NDH

             pageParams.data[index].ZMAT1 = ZMAT1_ORI[index];
             pageParams.data[index].ZMAT1_TX = ZMAT1_TX_ORI[index];
             pageParams.data[index].JINDO = JINDO_ORI[index];
             pageParams.data[index].JINDO_TX = JINDO_TX_ORI[index];
             pageParams.data[index].DANGE = DANGE_ORI[index];
             pageParams.data[index].DANGE_TX = DANGE_TX_ORI[index]; 
/*
  			if(pageParams.data[index].ZMAT1==""||pageParams.data[index].ZMAT1==undefined){
  			   pageParams.data[index].ZMAT1 = ZMAT1_ORI[index];
            }
 			if(pageParams.data[index].ZMAT1_TX==""||pageParams.data[index].ZMAT1_TX==undefined){
 			   pageParams.data[index].ZMAT1_TX = ZMAT1_TX_ORI[index];  
 			}
            if(pageParams.data[index].JINDO==""||pageParams.data[index].JINDO==undefined){
               pageParams.data[index].JINDO = JINDO_ORI[index];    
            }
 			if(pageParams.data[index].JINDO_TX==""||pageParams.data[index].JINDO_TX==undefined){
 			    pageParams.data[index].JINDO_TX = JINDO_TX_ORI[index];    
 			}
 			if(pageParams.data[index].DANGE==""||pageParams.data[index].DANGE==undefined){
 			    pageParams.data[index].DANGE = DANGE_ORI[index];    
 			}
 			if(pageParams.data[index].DANGE_TX==""||pageParams.data[index].DANGE_TX==undefined){
 			    pageParams.data[index].DANGE_TX = DANGE_TX_ORI[index];    
 			}
*/  
     

			if(entry["ZMAT1"]==ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE=entry["ZMAT1"];
			}
			if(entry["VBELN"]==ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE=entry["ZMAT1"];
			}

			for(i = 0; i < tmpChecked.length; i++) { 
				if(tmpChecked[i]==entry["ZMAT1"] || tmpChecked[i]==entry["VBELN"]) {
					entry["result"]=$("#"+tmpChecked[i]+'_check_data').val();
					if(entry["result"]=="") entry["result"]="C";
					entry["record"]=$("#"+tmpChecked[i]+'_check_record').val();
				}
			}
            
   
            
		});
	}
    pageParams.referrerPage = "A020100.html";
	app_changePage( url, pageParams, false);
}

// 과목 정렬시 사용 데이터
var orderData = {

//		@ 학부모
		'000000000000001090' : 1, //'씽크U수학', - 정답지포함
		'000000000000001114' : 1, //'씽크U사회과학', - 정답지포함
		'000000000000001131' : 1, //'씽크U국어', - 정답지포함
		'000000000000001148' : 1, //'씽크U영어(방문형)', - 정답지포함
		'000000000000001162' : 1, //'씽크U한자', - 정답지포함
		'000000000000001000' : 1, //'수학', - 정답지포함
		'000000000000001002' : 1, //'한자', - 정답지포함
		'000000000000001112' : 1, //'한글깨치기', - 정답지포함
		'000000000000001001' : 1, //'국어' - 정답지포함

//		@ 정답지						
		'000000000000001022': 2, // '바로셈',
		'000000000000001087': 2, // '바로독해',
		'000000000000001056': 2, // '스마트영어'

		'000000000000000000' : 0
};

//과목 정렬 후 리스트 생성.
function dataLoad(){

	// 과목정렬
	if(!!pageParams) {

		try
		{
			pageParams.data.sort(function(a,b){
				return Number(a['ZMAT1'])-Number(b['ZMAT1']);
			});  
		}
		catch (e)
		{
		}



		$.each(pageParams.data, function(index, entry) {
			try
			{
				entry["SORT"]=orderData[entry["ZMAT1"]];
				if(typeof(entry["SORT"]) == "undefined" ) entry["SORT"]="3";
			}
			catch (e)
			{
				entry["SORT"]="3";
			}
		});

	}

	try
	{
		pageParams.data.sort(function(a,b){
			return Number(a['SORT'])-Number(b['SORT']);
		});  
	}
	catch (e)
	{
	}

	// 정렬한 데이터로 리스트 생성 
	if(!!pageParams) {

		$.each(pageParams.data, function(index, entry) {


///////ZMAT1_N, ZMAT1_P 

         //원본ZMAT1 저장후 페이지 변경시 넘겨줌.
         //sorting 된 값으로 저장하기 위해 setData에서 여기로 이동.
         //2013.03.05 NDH
             ZMAT1_ORI[index] = pageParams.data[index].ZMAT1;
             ZMAT1_TX_ORI[index] = pageParams.data[index].ZMAT1_TX;
             JINDO_ORI[index] = pageParams.data[index].JINDO;
             JINDO_TX_ORI[index] = pageParams.data[index].JINDO_TX;
             DANGE_ORI[index] = pageParams.data[index].DANGE;
             DANGE_TX_ORI[index] = pageParams.data[index].DANGE_TX;


          //ZMAT1_N 금주 과목 , ZMAT1_P 전주 과목  
          //ZMAT1_N, ZMAT1_P 추가로 인해 기존의 ZMAT1의 변수값을 대체.ZMAT1는 사용하지 않음.
          //2013.02.18 NDH
          //지난주 값은 내용이 없을 시 이번주(ZMAT1) 값으로 대체, ZMAT1_N,ZMAT1_NTX 사용안함
          //2013.02.27  NDH
          
          if($.trim(entry["ZMAT1_P"])==""){
             pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1;
             pageParams.data[index].ZMAT1_TX = pageParams.data[index].ZMAT1_TX;
          }else{
             pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1_P;
             pageParams.data[index].ZMAT1_TX = pageParams.data[index].ZMAT1_PTX;
             pageParams.data[index].DANGE = pageParams.data[index].DANGE_P;
             pageParams.data[index].JINDO = pageParams.data[index].JINDO_P;
             pageParams.data[index].DANGE_TX = pageParams.data[index].DANGE_PTX;
             pageParams.data[index].JINDO_TX = pageParams.data[index].JINDO_PTX;
          }

///////ZMAT1_N, ZMAT1_P 



			// 씽크U
			if(entry["ZMAT1_TX"].indexOf("씽크U")>=0) {

				try
				{
					if($.trim(entry["JUNIOR_PG"])=="X") { // 중등수학일 경우
						tmp_COURSE = ANSWERS_U_CODE[entry["ZMAT1"]+"_"+$.trim(entry["JUNIOR_PG"])].in_course_code;
						entry["COURSE"] = tmp_COURSE.split("_")[0];
					} else {
						entry["COURSE"] = ANSWERS_U_CODE[entry["ZMAT1"]].in_course_code;
					}

				}
				catch (e)
				{
					entry["COURSE"] = "";
				}


				tmp_section="";
				tmp_section=$('#section_u_tmp').html();

				tmp_section=tmp_section.replace(/#INDEX#/g, index); 
				tmp_section=tmp_section.replace(/#ZMAT1_TX#/g, entry["ZMAT1_TX"]); 
				tmp_section=tmp_section.replace(/#ZMAT1#/g, entry["VBELN"]); 



				tmp_section=tmp_section.replace(/#COURSE_CODE#/g, entry["COURSE"]);

				if($.trim(entry["JINDO_P"])=="" || $.trim(entry["DANGE_P"])=="") {
					tmp_section=tmp_section.replace(/#DANGE#/g, entry["DANGE"]); 
					tmp_section=tmp_section.replace(/#JINDO#/g, entry["JINDO"]); 
					tmp_section=tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_TX"]); 
					tmp_section=tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_TX"]); 
				} else {
					tmp_section=tmp_section.replace(/#DANGE#/g, entry["DANGE_P"]); 
					tmp_section=tmp_section.replace(/#JINDO#/g, entry["JINDO_P"]); 
					tmp_section=tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_PTX"]); 
					tmp_section=tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_PTX"]); 
				}


			} else { // 씽크Big

				tmp_section="";
				tmp_section=$('#section_tmp').html();

				tmp_section=tmp_section.replace(/#INDEX#/g, index); 
				tmp_section=tmp_section.replace(/#ZMAT1_TX#/g, entry["ZMAT1_TX"]); 
				tmp_section=tmp_section.replace(/#ZMAT1#/g, entry["ZMAT1"]); 

				tmp_section=tmp_section.replace(/#COURSE_CODE#/g, ""); 


				if($.trim(entry["JINDO_P"])=="" || $.trim(entry["DANGE_P"])=="") {
					tmp_section=tmp_section.replace(/#DANGE#/g, entry["DANGE"]); 
					tmp_section=tmp_section.replace(/#JINDO#/g, entry["JINDO"]); 
					tmp_section=tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_TX"]); 
					tmp_section=tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_TX"]); 
				} else {
					tmp_section=tmp_section.replace(/#DANGE#/g, entry["DANGE_P"]); 
					tmp_section=tmp_section.replace(/#JINDO#/g, entry["JINDO_P"]); 
					tmp_section=tmp_section.replace(/#DANGE_TX#/g, entry["DANGE_PTX"]); 
					tmp_section=tmp_section.replace(/#JINDO_TX#/g, entry["JINDO_PTX"]); 
				}

			}
			tmp_section=tmp_section.replace(/#FOOTER_USED#/g, entry["USED"]);
            tmp_section=tmp_section.replace(/#NEXT_S#/g, entry["NEXT_S"]);                                    

			// 엘리먼트 추가
			$container.append(tmp_section);


            //정답지 font-size 조절
            //NDH 2013.02.25
            //'정답지'버튼 클릭후 들어가는 화면
            $(".answers tbody").css("font-size","130%");//씽크U 
            $(".answer_tb tbody").css("font-size","130%");//씽크빅
             

			//# H2 색상 설정
			switch(Number(entry["SORT"])) {
			case 1:
				$("#"+entry["ZMAT1"]+"_head.menu"+index).addClass("subject_txt_color1").find("em").addClass("subject_txt_color1");
				$("#"+entry["VBELN"]+"_head.menu"+index).addClass("subject_txt_color1").find("em").addClass("subject_txt_color1");
				break;
			case 2:
				$("#"+entry["ZMAT1"]+"_head.menu"+index).addClass("subject_txt_color2").find("em").addClass("subject_txt_color2");
				$("#"+entry["VBELN"]+"_head.menu"+index).addClass("subject_txt_color2").find("em").addClass("subject_txt_color2");
				break;
			default:
				$("#"+entry["ZMAT1"]+"_head.menu"+index).addClass("subject_txt_color3").find("em").addClass("subject_txt_color3");
			$("#"+entry["VBELN"]+"_head.menu"+index).addClass("subject_txt_color3").find("em").addClass("subject_txt_color3");
			}


			try
			{
				$("#"+entry["ZMAT1"]+"_check.menu"+index).html("<option value='C'>성적선택해주세요</option>");
				$("#"+entry["ZMAT1"]+"_check.menu"+index).append("<option value='C'>미풀이</option>");
				$("#"+entry["ZMAT1"]+"_check.menu"+index).append("<option value='0'>모두 틀림</option>");
				$("#"+entry["ZMAT1"]+"_check.menu"+index).append("<option value='A'>모두 맞음</option>");

				switch(entry["result"]) {
				case "0":
					if(entry["record"]>0 && entry["result"]==0) 
						$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val("0");
					else 
						$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val("C");
					break;
				case "C":
					$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val("C");
					break;
				case "A":
					if(entry["result"]==entry["record"] && entry["result"]>0) 
						$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val("A");
					break;
				default:
					$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val(entry["result"]);
				}
				$('#'+entry["ZMAT1"]+'_check_data.menu'+index).val(entry["result"]);

			}
			catch (e)
			{
			}



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

		$('#Contents>.container>.section').each(function(){
			$(this).children(':not(h2)').hide();
			tmp_ZMAT1_SELECT_DATA = $(this).attr("id").split("_")[0];
			$("#"+tmp_ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT").html("");

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
		app_alert(msg_E00Z+" 03");
		//@ 로딩 완료
		return;
	}
}

//페이지 이동 체크(html 파일에 이벤트 연결)
var changePage_check = function(page) {

	tmp_SUBJECT_CODE="";
	if(!!pageParams) {
		$.each(pageParams.data, function(index, entry) {

			if(entry["ZMAT1"]==ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE=entry["ZMAT1"];
			}
			if(entry["VBELN"]==ZMAT1_SELECT_DATA) {
				tmp_SUBJECT_CODE=entry["ZMAT1"];
			}
		});
	}

	//
	var fText;
	var iCate; 
	if( page=='A020400.html' ){
		fText = '학부모상담안';
		iCate = 'KV';
		loader.sessionTotal( fText, iCate, function(){changePage(page)}, function(){changePage(page)}  )
	}else if(page=='A020300.html'){
		fText = '금주학습정보';
		iCate = 'KN';
		loader.sessionTotal( fText, iCate, function(){changePage(page)}, function(){changePage(page)}  )
	}else{
		changePage(page);
	}
}

//리스트 마우스 클릭 이벤트 설정
function set_h2_click() {

	$('#Contents>.container>.section').find('h2').click(function(e){

		click_left = Number(e.clientX);
		click_top = Number(e.clientY);


		tmp_SUBJECT_CODE="";
		if(!!pageParams) {
			$.each(pageParams.data, function(index, entry) {

				if(entry["ZMAT1"]==ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
				if(entry["VBELN"]==ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
			});
		}
		if(36>=click_top) {
			if(Number($("#local > ul > li").eq(2).offset().left)<click_left) {

				changePage('A020400.html');
				return;
			}
			if(Number($("#local > ul > li").eq(1).offset().left)<click_left) {

				changePage('A020300.html');
				return;
			}

			return;
		}



		//@ 과목 선택 INDEX 저장
		MENU_CLICK_INDEX = Number($(this).parent().attr("menu_index"));

		tmp_ZMAT1_SELECT_DATA = $(this).parent().attr("id").split("_")[0];
		tmp_SUBJECT_CODE="";
		if(!!pageParams) {
			$.each(pageParams.data, function(index, entry) {

				if(entry["ZMAT1"]==tmp_ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
				if(entry["VBELN"]==tmp_ZMAT1_SELECT_DATA) {
					tmp_SUBJECT_CODE=entry["ZMAT1"];
				}
			});
		}




		if(! $(this).find("button.toggle-button").hasClass('open')) { // 과목이 닫혀있을경우


			$('#Contents>.container>.section').each(function(){
				$(this).children(':not(h2)').hide();
				$(this).find("button.toggle-button").removeClass('open').text('보이기');

				if($(this).attr("CATEGORY")=="U") {
					$(this).find("h2>em").html("");
				}

				$(this).find('span.control').addClass('none');
				$(this).find('h2').removeClass('has-control');
			});



			$(this).find("button.toggle-button").addClass('open').text('숨기기').closest('div.section').children(':not(h2)').show();
			if( HAS_CONTROL ){
				$(this).find('span.control').removeClass('none');
				$(this).addClass('has-control');
			}

			ZMAT1_SELECT_DATA=tmp_ZMAT1_SELECT_DATA;
			top_scroll();


			// Load 했던 데이터 일경우
			if($(this).parent().attr("dataload_dange")=="true") {



				if(Number($("#"+tmp_ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO"))>0) {

					$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","");
					$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","none");
				} else {
					if( ZMAT1_SELECT_DATA=="000000000000001022" ){
						// 바로셈일때는 지우지 않음
					}else{
						$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","none");
						$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","");
					}

				}

				if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO")=="0") {
					if( ZMAT1_SELECT_DATA=="000000000000001022" ){
						// 바로셈일때는 지우지 않음
					}else{
						$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('span.control').addClass('none');
						$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('h2').removeClass('has-control');
					}
				}



				// 선택그룹 텍스트변경
				menu_text_reload(false);


			} else { // 로드하지 않은데이터는 로드
				dataload_dange(tmp_ZMAT1_SELECT_DATA);
			}


		} else { // 과목이 열려있을때


			$(this).find('span.control').addClass('none');
			$(this).removeClass('has-control');

			$('#Contents>.container>.section').each(function(){
				$(this).children(':not(h2)').hide();
				$(this).find("button.toggle-button").removeClass('open').text('보이기');

				if($(this).attr("CATEGORY")=="U") {
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

/*

단계 데이터 로드
1	I_GUBUN		 CHAR 	 1 		구분(2:단계)
2	I_ZMAT1		 CHAR 	 18 	과목
 */

function dataload_dange(zmat1_code) {

	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("dataload_dange","true");

	ZMAT1_SELECT_DATA=zmat1_code;

	DANGE_SELECT_DATA="";
	JINDO_SELECT_DATA="";

	object_tmp = "#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX;
	$(object_tmp).html("");

	// 씽크U
	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U") dataload_dange_u();

	// 씽크빅
	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="B") dataload_dange_big();
}



/*
 * 단계 변경시
	1	I_GUBUN		 CHAR 	 1 	구분(3: 호수)
	2	I_ZMAT1		 CHAR 	 18 	과목
	3	I_DANGE		 CHAR 	 18 	학습단계
 */
function DANGE_change(zmat1_code, dange_code) {

	ZMAT1_SELECT_DATA=zmat1_code;
	DANGE_SELECT_DATA=dange_code;

	JINDO_SELECT_DATA="";

	object_tmp = "#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX;
	$(object_tmp).html("");

	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U") DANGE_change_u();
	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="B") DANGE_change_big();
}






// 진도 변경시
function JINDO_change(zmat1_code, jindo_code, stlkn_code) {


	ZMAT1_SELECT_DATA	= zmat1_code;
	JINDO_SELECT_DATA	= jindo_code;
	STLKN_SELECT_DATA	= stlkn_code;

	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U"){
		JINDO_change_u();
	}else if( $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="B" ) {

		if($('#Contents .container').hasClass('section')) {
			$('#Contents .container').removeClass("section");
		}


		if(String(ZMAT1_SELECT_DATA).indexOf("1022")>=0){
			$("#"+ZMAT1_SELECT_DATA+"_BOOK.menu"+MENU_CLICK_INDEX + ' option[value="001"]' ).attr( 'selected', 'selected' );
		}

		JINDO_change_big();
	}

}



//<-- 통신부 완료 --> //




/**************************************************************************************************************************/
// 정답지 재 호출
function answer_reload() {

	set_answer_windows();

	/* 이전코드
	answer_windows(ZMAT1_SELECT_DATA,true);
	//*/
}

// 정답지 호수 변경시
function answer_windows_jindo_reload(select_data) {

	var param = {
			I_GUBUN: "3",
			I_ZMAT1: ZMAT1_ANSWER_SELECT_DATA,
			I_DANGE: $('#popContents_DANGE option:selected').val()
	};
	//
	sap_sch_request( 'jindo', param );


	/* 이전 정답지 코드
	zmat1_code = ZMAT1_SELECT_DATA;
	$("#popContents_JINDO").html("");

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

		if(select_data==tmp_STAGE_NAME) {

			$("#popContents_JINDO").append("<option value='"+tmp_DANGE_NAME+"' EDITION_SEQ='"+tmp_EDITION_SEQ+"' ORDER_SEQ='"+tmp_ORDER_SEQ+"' ERP_COURSE_CODE='"+tmp_ERP_COURSE_CODE+"' ERP_STAGE_CODE='"+tmp_ERP_STAGE_CODE+"' ERP_EDITION_CODE='"+tmp_ERP_EDITION_CODE+"'>"+tmp_DANGE_NAME+"</option>");
			temp_max_num=temp_max_num+1

		}
	});

	answer_windows(zmat1_code,true);
	//*/
}

var u_answerDangeList = {};
var is_u_answer_first = false;

// 정답지 열기
function answer_windows(zmat1_code, b_move) {
	//*
	is_u_answer_first = true;

	window.scrollTo(0, 1); // 기존 코드 동일하게 사용

	ZMAT1_ANSWER_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_COURSE_CODE");
	if(ZMAT1_ANSWER_SELECT_DATA==undefined){
		ZMAT1_ANSWER_SELECT_DATA = pageParams.data[MENU_CLICK_INDEX].ZMAT1
	}
	DANGE_ANSWER_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_STAGE_CODE");
	if(DANGE_ANSWER_SELECT_DATA==undefined){
		DANGE_ANSWER_SELECT_DATA = pageParams.data[MENU_CLICK_INDEX].DANGE;
	}
	JINDO_ANSWER_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_EDITION_CODE");
	if(JINDO_ANSWER_SELECT_DATA==undefined){
		JINDO_ANSWER_SELECT_DATA = pageParams.data[MENU_CLICK_INDEX].JINDO;
	}

	if( u_answerDangeList[ZMAT1_ANSWER_SELECT_DATA]==undefined ){
		var param = {
				I_GUBUN: "2",
				I_ZMAT1: ZMAT1_ANSWER_SELECT_DATA
		}
		sap_sch_request( 'dange', param );

	}else{
		sap_sch_dangeOk( u_answerDangeList[ZMAT1_ANSWER_SELECT_DATA] );
	}

	//*/

	/* 이전 정답지 코드
	$("#Document").css("display","none");
	$("#Popup").css("display","");
	$(".jindo_button").css("display","none");
	$(".answer_button").css("display","");
	$(".answers").css("display","");
	$("#jindo_tree").css("display","none");


	$("#popHeader .container").find("h1").html("정답지");

	if(b_move==false) {
//answer_windows_jindo_reload
		$("#popContents_DANGE").html($("#"+zmat1_code+"_DANGE.menu"+MENU_CLICK_INDEX).html());
		index = $('#'+zmat1_code+'_DANGE.menu'+MENU_CLICK_INDEX+' option').index($('#'+zmat1_code+'_DANGE.menu'+MENU_CLICK_INDEX+' option:selected'));
		$('#popContents_DANGE option:eq('+(index)+')').attr("selected", "selected");

		$("#popContents_JINDO").html($("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX).html());
		index = $('#'+zmat1_code+'_JINDO.menu'+MENU_CLICK_INDEX+' option').index($('#'+zmat1_code+'_JINDO.menu'+MENU_CLICK_INDEX+' option:selected'));
		$('#popContents_JINDO option:eq('+(index)+')').attr("selected", "selected");
		$("#popContents").attr("LISTMAX",$("#"+zmat1_code+"_section").attr("LISTMAX"));

		ZMAT1_ANSWER_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_COURSE_CODE");
		DANGE_ANSWER_SELECT_DATA = $("#"+f+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_STAGE_CODE");
		JINDO_ANSWER_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").attr("ERP_EDITION_CODE");
	} else {
		ZMAT1_ANSWER_SELECT_DATA = $("#popContents_JINDO option:selected").attr("ERP_COURSE_CODE");
		DANGE_ANSWER_SELECT_DATA = $("#popContents_JINDO option:selected").attr("ERP_STAGE_CODE");
		JINDO_ANSWER_SELECT_DATA = $("#popContents_JINDO option:selected").attr("ERP_EDITION_CODE");
	}

	outtime = setTimeout(function() {

		$('#ANSWER_TB').html("<tr><td colspan=2 style='text-align:center;'>데이터가 없습니다.</td></tr>");
	},4000);


	var param = {
			I_ZMAT1: ZMAT1_ANSWER_SELECT_DATA,
			I_DANGE: DANGE_ANSWER_SELECT_DATA,
			I_JINDO: JINDO_ANSWER_SELECT_DATA,
			I_STLKN: '',
			I_TUTOR: ''
	};

	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SEARCH",
		Parameter: {
			I_ZMAT1: ZMAT1_ANSWER_SELECT_DATA,
			I_DANGE: DANGE_ANSWER_SELECT_DATA,
			I_JINDO: JINDO_ANSWER_SELECT_DATA,
			I_STLKN: '',
			I_TUTOR: ''
		},
		Success: function($data){

			clearTimeout(outtime);

			JsonData = JSON.parse( $data );

			max_num = 0;
			num_cell = 1;
			$('#ANSWER_TB').html("");
			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					if(entry["Q_NUM"]=="1") {
						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row' colspan=2>"+entry["PART1_TX"]+"</th></tr>");
					}

					if(entry["PHOTO"]=="X") {

						var Imgsrc = "http://211.55.28.74:8080/itutor/"+entry["TEXT1"]; 

						Imgsrc = "<img src="+Imgsrc+" class='lgp' />";
						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+Imgsrc+"</td></tr>");

					} else {

						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+entry["TEXT1"]+"</td></tr>");

					}

					max_num = max_num+1;

				}); 

			} else {

			}

		},
		Error: function($e){
			clearTimeout(outtime);
			app_alert(msg_E00Z+" 02");

			JsonData = $e;
		}

	});
	//*/ 
}

// 정답지 화면 구성
function set_answer_windows(){
	$("#Document").css("display","none");
	$("#Popup").css("display","");
	$(".jindo_button").css("display","none");
	$(".answer_button").css("display","");
	$(".answers").css("display","");
	$("#jindo_tree").css("display","none");

	$("#popHeader .container").find("h1").html("정답지");

	ZMAT1_ANSWER_SELECT_DATA = pageParams.data[MENU_CLICK_INDEX].ZMAT1;
	DANGE_ANSWER_SELECT_DATA = $("#popContents_DANGE option:selected").val();
	JINDO_ANSWER_SELECT_DATA = $("#popContents_JINDO option:selected").val();

	outtime = setTimeout(function() {
		$('#ANSWER_TB').html("<tr><td colspan=2 style='text-align:center;'>해당 단계, 호수는 정답지가 없습니다.</td></tr>");
	},4000);

	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SEARCH",
		Parameter: {
			I_ZMAT1: ZMAT1_ANSWER_SELECT_DATA,
			I_DANGE: DANGE_ANSWER_SELECT_DATA,
			I_JINDO: JINDO_ANSWER_SELECT_DATA,
			I_STLKN: '',
			I_TUTOR: ''
		},
		Success: function($data){
			clearTimeout(outtime);
			JsonData = JSON.parse( $data );

			max_num = 0;
			num_cell = 1;
			$('#ANSWER_TB').html("");
			if( !!JsonData.Parameter ){
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {

					if(entry["Q_NUM"]=="1") {
						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row' colspan=2>"+entry["PART1_TX"]+"</th></tr>");
					}

					if(entry["PHOTO"]=="X") {

						var Imgsrc = "http://211.55.28.74:8080/itutor/"+entry["TEXT1"]; 

						Imgsrc = "<img src="+Imgsrc+" class='lgp' />";
						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+Imgsrc+"</td></tr>");

					} else {

						$('#ANSWER_TB').html($('#ANSWER_TB').html()+"<tr><th scope='row'>"+entry["Q_NUM"]+"</th><td id='ANSWER_1_DATA'>"+entry["TEXT1"]+"</td></tr>");

					}

					max_num = max_num+1;

				}); 

			} else {
				app_alert("해당 단계, 호수는 정답지가 없습니다.");
			}

		},
		Error: function($e){
			clearTimeout(outtime);
			app_alert("해당 단계, 호수는 정답지가 없습니다.");
			JsonData = $e;
		}
	});
}


// 정답지 화면 닫기
function answer_windows_close(zmat1_code) {

	$("#Popup").css("display","none");
	$("#Document").css("display","");
	$(".answers").css("display","none");

	top_scroll();
}


//** 정답지 호출을 위해, 단계/호수 조회
function sap_sch_request( loadType, param ){

	var successFn;
	if( loadType=='dange' ){
		successFn = sap_sch_dangeOk;
	}else{
		successFn = sap_sch_jindoOk;
	}

	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SCH_Z",
		Parameter: param,
		Success: function($data){
			var data = JSON.parse( $data ).Parameter;
			if( !!data ){
				successFn( data );
			}else{
				$('#ANSWER_TB').html("<tr><td colspan=2 style='text-align:center;'>데이터가 없습니다.</td></tr>");
			}
		},
		Error: function($e){
			$('#ANSWER_TB').html("<tr><td colspan=2 style='text-align:center;'>데이터가 없습니다.</td></tr>");
		}
	});
}

//정답지에서 사용할 단계로드 완료
function sap_sch_dangeOk(data){

	u_answerDangeList[pageParams.data[MENU_CLICK_INDEX].ZMAT1] = data;
	//
	var list = u_answerDangeList[pageParams.data[MENU_CLICK_INDEX].ZMAT1].T_EXPORTA;
	if( !!list ){
		if( list.length>0 ){
			$("#popContents_DANGE").empty();
			var o;
			var cd = DANGE_ANSWER_SELECT_DATA;
			var nms, nm;
			var isSelect = false;
			var html='';
			var i=0, len=list.length;
			for(;i<len;i+=1){
				o=list[i];
				// 이름 중복 사용으로 주석처리
				//nms = o.DANGE_TX.split('_');
				nm = o.DANGE_TX;//nms[nms.length-1];
				if( cd==o.DANGE ){
					isSelect = true;
					html += '<option value="'+o.DANGE+'" stlkn="'+o.STLKN+'" selected="selected">'+nm+'</option>'
				}else{
					html += '<option value="'+o.DANGE+'" stlkn="'+o.STLKN+'">'+nm+'</option>'
				}
			}
			//
			$("#popContents_DANGE").html(html);
			$("#popContents_DANGE").css('width', '100px');
			if( !isSelect ){
				$("#popContents_DANGE option:first").attr('selected', 'selected');
			}
			$("#popContents_DANGE").trigger( 'change' );
		}
	}
}

//정답지에서 사용할 진도 로드 완료
function sap_sch_jindoOk( data ){
	//
	var list = data.T_EXPORTA;
	if( !!list ){
		if( list.length>0 ){
			$("#popContents_JINDO").empty();
			var o;
			var cd = JINDO_ANSWER_SELECT_DATA;
			var nms, nm;
			var isSelect = false;
			var html='';
			var i=0, len=list.length;
			for(;i<len;i+=1){
				o=list[i];
				// 이름 중복 사용으로 주석처리
				//nms = o.JINDO_TX.split('_');
				nm = o.JINDO_TX;//nms[nms.length-1];
				if( cd==o.JINDO ){
					isSelect = true;
					html += '<option value="'+o.JINDO+'" stlkn="'+o.STLKN+'" selected="selected">'+nm+'</option>'
				}else{
					html += '<option value="'+o.JINDO+'" stlkn="'+o.STLKN+'">'+nm+'</option>'
				}
			}

			if( is_u_answer_first ){
				is_u_answer_first = false;
			}else{
				isSelect = false;
			}

			$("#popContents_JINDO").html(html);
			$("#popContents_JINDO").css('width', '100px');
			if( !isSelect ){
				$("#popContents_JINDO option:first").attr('selected', 'selected');
			}
			$("#popContents_JINDO").trigger( 'change' );
			//
		}
	}
}


//@ 호수변경
function jindo_windows(zmat1_code) {

	$("#Document").css("display","none");
	$("#Popup").css("display","");
	$(".jindo_button").css("display","");
	$(".answer_button").css("display","none");
	$(".answers").css("display","none");
	$("#jindo_tree").css("display","");

	$("#popHeader .container").find("h1").html("호수조회");

	tmp_DANGE_count		= $("#"+zmat1_code+"_DANGE.menu"+MENU_CLICK_INDEX+" option").size();
	tmp_DANGE_default	= $("#"+zmat1_code+"_DANGE.menu"+MENU_CLICK_INDEX+" option:selected").val();

	JINDO_SELECT_DATA	= $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").val();
	tmp_DANGE_default_no = 0;
	$("#jindo_tree").html("");

	$.data.tree={
			currentCode: zmat1_code,
			currentDange: -1,
			currentDangeTx: "",
			currentJindo: -1,
			currentJindoTx: ""
	};

	var $container = $('#jindo_tree');
	var html="";
	var menuName = "", menuCode = "";


	tmp_DANGE_count		= $("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option").size();
	for(tmpNo=0;tmpNo<tmp_DANGE_count;tmpNo++) {

		menuName = $("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").text();

		if($("#"+ZMAT1_SELECT_DATA+"_section").attr("CATEGORY")=="B") {
			menuCode = $("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").val();
			html += '<li ';
			if(DANGE_SELECT_DATA==menuCode) html += ' class="open hover" ';

			if(Number(tmp_DANGE_count)==1) {
				html += ' style="background:none;" ';
			}
			html += ' id="dange_' + menuCode + '">';
		}

		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U") {
			menuCode = $("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").attr("STAGE_SEQ");
			html += '<li ';
			if(DANGE_SELECT_DATA==menuName) html += ' class="open hover" ';

			if(Number(tmp_DANGE_count)==1) {
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




	if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="B") {

		html = '';
		tmp_JINDO_count		= $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option").size();

		for(tmpNo=0;tmpNo<tmp_JINDO_count;tmpNo++) {

			menuCode = $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").val();
			menuName = $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").text();

			html += '<li id="jindo_' + menuCode + '">';
			html += '<label>';
			html += '<input type="radio" for="r_'+DANGE_SELECT_DATA+'" name="jindo_change" id="r_'+menuCode+'" value="'+menuCode + '" ';

			if(menuCode==JINDO_SELECT_DATA) html += 'checked';

			html += '>';
			html += ' '+menuName+'';
			html += '</label>';
			html += '</li>'
		}
		$container = $('#dange_' + DANGE_SELECT_DATA);
		$ul = $container.find('ul');
		$ul.empty();
		$ul.append(html);



		$('#tree').treeview({
			persist: "location",
			collapsed: true,
			unique: true,
			toggle: function( idx, item){
				if( $(item).css('display')=='block' ){
					var treeData = $.data.tree;
					var cDatas = $(this).attr('id').split('_');
					treeData.currentDange = cDatas[1];
					treeData.currentDangeTx = cDatas[2];
					//
					dangeJindoLoad({
						I_GUBUN: '3',
						I_ZMAT1: treeData.currentCode,
						I_DANGE: treeData.currentDange
					});
				}
			}
		});

	}
	if($("#"+zmat1_code+"_section").attr("CATEGORY")=="U") {

		//@ 다른 단계 트리 구성위해 데이터 호출
		course_code = $("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("COURSE_CODE");


		


		DATA_STAGE_ARRAY = { 
				DATABASE:[] 
		};
		tmp_DANGE_count		= $('#'+ZMAT1_SELECT_DATA+'_DANGE.menu'+MENU_CLICK_INDEX+' option').size();

		for(tmpNo=0;tmpNo<tmp_DANGE_count;tmpNo++) {

			var nDATA = {
					"STAGE_NAME":$('#'+ZMAT1_SELECT_DATA+'_DANGE.menu'+MENU_CLICK_INDEX+' option:eq('+tmpNo+')').text(),
					"STAGE_SEQ":$('#'+ZMAT1_SELECT_DATA+'_DANGE.menu'+MENU_CLICK_INDEX+' option:eq('+tmpNo+')').attr("STAGE_SEQ")
			};
			DATA_STAGE_ARRAY.DATABASE.push(nDATA);

		}
		pageParams_json = JSON.stringify( DATA_STAGE_ARRAY );


		app_startLoading('잠시만 기다려주세요.');

		tmp_ALL_count		= $('#'+ZMAT1_SELECT_DATA+'_JINDO_ALL.menu'+MENU_CLICK_INDEX+' option').size();

		back_stage_name = "";
		back_stage_seq = "";
		for(tmpNo_ALL=0;tmpNo_ALL<tmp_ALL_count;tmpNo_ALL++) {
			html="";


			tmp_DATA			= $('#'+ZMAT1_SELECT_DATA+'_JINDO_ALL.menu'+MENU_CLICK_INDEX+' option:eq('+tmpNo_ALL+')').attr("DATA");
			tmp_DATA_split		= tmp_DATA.split("@@");
			tmp_STAGE_SEQ		= tmp_DATA_split[0];
			tmp_STAGE_NAME		= tmp_DATA_split[1];
			tmp_DANGE_SEQ		= tmp_DATA_split[2];
			tmp_DANGE_NAME		= tmp_DATA_split[3];

			if(back_stage_name!=tmp_STAGE_NAME) {


				tmp_DANGE_count = DATA_STAGE_ARRAY.DATABASE.length;
				for(tmpNo=0;tmpNo<tmp_DANGE_count;tmpNo++) {

					if(DATA_STAGE_ARRAY.DATABASE[tmpNo]["STAGE_NAME"]==tmp_STAGE_NAME) {
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
			try
			{
				if(String($ul.html()).indexOf("placeholder")>=0) $ul.empty();
			}
			catch (e)
			{
			}

			menuCode = tmp_DANGE_SEQ;
			menuName = tmp_DANGE_NAME;

			html += '<li id="jindo_' + menuCode + '">';
			html += '<label for="r_'+menuCode+'" onclick=\'radioCheck("r_'+menuCode+'");\'>';
			html += '<input type="radio" name="jindo_change" id="r_'+menuCode+'" dange="'+tmp_STAGE_SEQ+'"  jindo_tx="'+tmp_DANGE_NAME+'" value="'+menuCode + '" ';

			if(menuName==JINDO_SELECT_DATA) html += 'checked';

			html += '>';
			html += ' '+menuName+'';
			html += '</label>';
			html += '</li>'


				$ul.append(html);
		}

		$('#tree').treeview({
			persist: "location",
			collapsed: true,
			unique: true
		});

		app_endLoading();
	}


	window.scrollTo(0, 1);

}

// 단계/호수 로드
function dangeJindoLoad( params ){
	loader.load( {
		Function: "ZTBSD_GM_214_ANSWER_SCH_Z",
		Parameter: params,
		Success: function(rlt){
			var data = JSON.parse( rlt );
			if( !!data.Parameter ){
				if( params.I_GUBUN=='2' ){
					var arr = data.Parameter.T_EXPORTA;
					//makeTree( arr );
				}else if( params.I_GUBUN=='3' ){
					var arr = data.Parameter.T_EXPORTA;
					addTreeChild( arr );
				}
			}

		},
		Error: function(e){
			loadFailed('');
		}
	});
}


// 트리에 메뉴 추가
function addTreeChild( arr ){
	var treeData = $.data.tree;
	var $container = $('#dange_' + treeData.currentDange);
	var $ul = $container.find('ul');
	$ul.empty();

	if( arr.length<0 ){
		$ul.append('<span>조회결과가 없습니다.</span>');
		return false;
	}
	//
	var html="";
	var menuName = "", menuCode = "";
	var i=0, len=arr.length, obj=null;
	for( ;i<len;i+=1 ){
		obj = arr[i];
		menuName = ($.trim(obj.JINDO_TX).length==0)? obj.JINDO : obj.JINDO_TX;
		menuCode = obj.JINDO;
		html += '<li id="jindo_' + menuCode + '" style="left:-20px;">';
		html += '<label>';
		html += '<input type="radio" for="r_'+treeData.currentDange+'" name="jindo_change" id="r_'+menuCode+'" value="'+menuCode + '" >';
		html += ' '+menuName+'';
		html += '</label>';
		html += '</li>'
	}
	$ul.append(html);


}

// 로드 실패
function loadFailed(d){
	app_alert(msg_E00Z+" 01");
}

// 트리의 라디오 버튼 체크
function radioCheck(giftNumber) {
	$("input:radio[value='"+giftNumber+"']").attr("checked", "checked");
}

// 진도변경 창 닫기
function jindo_windows_close() {

	$("#Popup").css("display","none");
	$("#Document").css("display","");

	top_scroll();
}

// 진도변경 확인 클릭시
function jindo_windows_check_end() {


	if($('input:radio[name="jindo_change"]').is(":checked") == true) {

		var treeData = $.data.tree;
		var jvalues = $( 'input:radio[name=jindo_change]:checked' ).val();
		var DANGE = treeData.currentDange;
		var DANGE_TX = treeData.currentDangeTx;

		$.data.tree = null;

		jindo_windows_close();

		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="B") {

			if(DANGE==-1) {
				DANGE=DANGE_SELECT_DATA;
				$("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX).val(DANGE).attr("selected", "selected");
				$("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX).val(jvalues).attr("selected", "selected");

				JINDO_change(ZMAT1_SELECT_DATA, jvalues, '');
			} else {

				loader.load( {
					Function: "ZTBSD_GM_001_019",
					Parameter: {MATNR:DANGE},
					Success: function($data){
						object_tmp = "#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX;
						$(object_tmp).html("");
						var thtml= "";
						temp_max_num = 0;
						JsonData = JSON.parse( $data );
						if( !!JsonData.Parameter ){
							var arr = JsonData.Parameter.T_EXPORTA;
							$(arr).each(function(index, entry) {
								var tmpH;
								if( $.trim(entry["MAKTX"]).length==0 ){
									tmpH = "<option value='"+entry["MATNR"]+"' >"+Right(entry["MATNR"],6)+"</option>";
								}else{
									tmpH = "<option value='"+entry["MATNR"]+"' >"+entry["MAKTX"]+"</option>";
								}
								thtml += tmpH;

								temp_max_num = temp_max_num+1;
							});
							$(object_tmp).html(thtml);
							DANGE_SELECT_DATA = DANGE;

							$("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX).val(DANGE).attr("selected", "selected");
							$("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX).val(jvalues).attr("selected", "selected");
							JINDO_change(ZMAT1_SELECT_DATA, jvalues, '');
						} 
					},
					Error: function(e){
						loadFailed('');
					}
				});
			}


			return;
		}

		if(DANGE==-1) {
			DANGE=DANGE_SELECT_DATA;
		} else {
			DANGE_SELECT_DATA=DANGE;
		}

		if($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U") {

			tmp_DANGE_SELECT_DATA=$("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:selected").val();
			DANGE = $( 'input:radio[name=jindo_change]:checked' ).attr("dange");
			tmp_DANGE_count		= $('#'+ZMAT1_SELECT_DATA+'_DANGE option').size();

			for(tmpNo=0;tmpNo<tmp_DANGE_count;tmpNo++) {
				if($("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").attr("stage_seq")==DANGE) {
					$("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").attr("selected", "selected");
				}
			}

			JINDO_CHANGE_DATA = jvalues;

			DANGE_SELECT_DATA=$("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:selected").val();

			if(tmp_DANGE_SELECT_DATA!=DANGE_SELECT_DATA) {
				DANGE_change(ZMAT1_SELECT_DATA,DANGE_SELECT_DATA);
			} else {
				tmp_JINDO_count		= $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option").size();
				for(tmpNo=0;tmpNo<tmp_JINDO_count;tmpNo++) {
					if($("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").attr("EDITION_SEQ")==jvalues) {
						$("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+tmpNo+")").attr("selected", "selected");
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


// 과목 탭의 이전버튼 클릭시
function prev(zmat1_code) {

	event.cancelBubble = "true";

	JINDO_SELECT_MAX = $("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX");

	var index = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option").index($("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected")); 
	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTNO",index+1);

	JINDO_SELECT_NUM = $("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTNO");

	if(Number(JINDO_SELECT_NUM)>1 && Number(JINDO_SELECT_MAX)>1) {

		JINDO_SELECT_NUM=Number(JINDO_SELECT_NUM)-1;

		$("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+(index-1)+")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX).val();
		STLKN_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" > option:selected").attr("STLKN");

		JINDO_change(zmat1_code,JINDO_SELECT_DATA,STLKN_SELECT_DATA);
	} else {
		app_alert("이전 호가 없습니다.");
	}

	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX",JINDO_SELECT_MAX);

}

// 과목탭의 다음버튼 클릭시
function next(zmat1_code) {

	event.cancelBubble = "true";

	JINDO_SELECT_MAX = $("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX");

	var index = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option").index($("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected")); 
	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTNO",index+1);

	JINDO_SELECT_NUM = $("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTNO");

	if(Number(JINDO_SELECT_MAX)>Number(JINDO_SELECT_NUM)) {

		JINDO_SELECT_NUM=Number(JINDO_SELECT_NUM)+1;

		$("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" option:eq("+(index+1)+")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX).val();
		STLKN_SELECT_DATA = $("#"+zmat1_code+"_JINDO.menu"+MENU_CLICK_INDEX+" > option:selected").attr("STLKN");

		JINDO_change(zmat1_code,JINDO_SELECT_DATA,STLKN_SELECT_DATA);
	} else {
		app_alert("다음 호가 없습니다.");
	}

	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTMAX",JINDO_SELECT_MAX);
	$("#"+zmat1_code+"_section.menu"+MENU_CLICK_INDEX).attr("LISTNO",JINDO_SELECT_NUM);

}


//@ 정답지 팝업상의 호수 이동
// 정답지 창의 이전버튼 클릭시
function prev_answers(zmat1_code) {

	event.cancelBubble = "true";

	/* 이전 정답지 코드
	JINDO_SELECT_MAX = $("#popContents").attr("LISTMAX");
	 */
	JINDO_SELECT_MAX = $("#popContents_JINDO option").length; // 정답지 수정 추가

	var index = $("#popContents_JINDO option").index($("#popContents_JINDO option:selected")); 
	$("#popContents").attr("LISTNO",index+1);

	JINDO_SELECT_NUM = $("#popContents").attr("LISTNO");

	if(Number(JINDO_SELECT_NUM)>1 && Number(JINDO_SELECT_MAX)>1) {

		JINDO_SELECT_NUM=Number(JINDO_SELECT_NUM)-1;

		$("#popContents_JINDO option:eq("+(index-1)+")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#popContents_JINDO").val();
		STLKN_SELECT_DATA = $("#popContents_JINDO > option:selected").attr("STLKN");

		$("#popContents_JINDO").trigger('change'); // 정답지 수정 추가 ( answer_reload(); )
		/* 이전 정답지 코드
		//answer_windows(zmat1_code,true);
		 */
	} else {
		app_alert("이전 호가 없습니다.");
	}

	$("#popContents").attr("LISTMAX",JINDO_SELECT_MAX);
	$("#popContents").attr("LISTNO",JINDO_SELECT_NUM);

}

// 정답지 창의 다음버튼 클릭시
function next_answers(zmat1_code) {

	event.cancelBubble = "true";

	/* 이전 정답지 코드
	//JINDO_SELECT_MAX = $("#popContents").attr("LISTMAX");
	 */
	JINDO_SELECT_MAX = $("#popContents_JINDO option").length; // 정답지 수정 추가 ( answer_reload(); )

	var index = $("#popContents_JINDO option").index($("#popContents_JINDO option:selected")); 
	$("#popContents").attr("LISTNO",index+1);

	JINDO_SELECT_NUM = $("#popContents").attr("LISTNO");

	if(Number(JINDO_SELECT_MAX)>Number(JINDO_SELECT_NUM)) {

		JINDO_SELECT_NUM=Number(JINDO_SELECT_NUM)+1;

		$("#popContents_JINDO option:eq("+(index+1)+")").attr("selected", "selected");

		JINDO_SELECT_DATA = $("#popContents_JINDO").val();
		STLKN_SELECT_DATA = $("#popContents_JINDO > option:selected").attr("STLKN");

		$("#popContents_JINDO").trigger('change'); // 정답지 수정 추가

		/* 이전 정답지 코드
		//answer_windows(zmat1_code,true);
		 */
	} else {
		app_alert("다음 호가 없습니다.");
	}

	$("#popContents").attr("LISTMAX",JINDO_SELECT_MAX);
	$("#popContents").attr("LISTNO",JINDO_SELECT_NUM);

}

// 우측에서 파라미터 갯수만큼 글자 반환
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

// 이벤트 흐름 중단
function preventDefault(e) { e.preventDefault(); };

// 스크롤 상단으로 이동
function top_scroll() {

	$('#Document #Aside button.top-button').hide();
	if($(".answers").css("display")=="none") {
		setTimeout(function() { 

			window.scrollTo(0, $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).offset().top-34);	
			$('#Document #Aside button.top-button').hide();

		}, 100);
	} else {
		setTimeout(function() { 
			window.scrollTo(0, 1);
			$('#Document #Aside button.top-button').hide();
		}, 100);
	}
}

// 과목명 줄임말로 변경
var rename_zmat = function(zmat_name) {

	if(zmat_name=="바로셈") {
		zmat_name="바셈";
	}
	if(zmat_name=="씽크U국어") {
		zmat_name="씽U국";
	}
	if(zmat_name=="씽크U사회과학") {
		zmat_name="씽U사";
	}
	if(zmat_name=="씽크U수학") {
		zmat_name="씽U수";
	}
	if(zmat_name=="씽크U영어(방문형)") {
		zmat_name="씽U영(방)";
	}
	if(zmat_name=="씽크U한자") {
		zmat_name="씽U한자";
	}
	if(zmat_name=="바로독해") {
		zmat_name="바독";
	}
	if(zmat_name=="스마트영어") {
		zmat_name="스영";
	}
	if(zmat_name=="(신)한글깨치기") {
		zmat_name="(신)한깨";
	}
	if(zmat_name.indexOf("한글깨치기")>=0) {
		zmat_name="한글깨치기";
	}
	return zmat_name;
}

//@ getparam data
function menu_text_set() {
	try
	{
		tmp_ZMAT1_TX = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX");
		DANGE_TEXT = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_TX");
		JINDO_TEXT = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("JINDO_TX");


		tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);

		try
		{
			if(DANGE_TEXT.indexOf(tmp_ZMAT1_TX)>=0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
			} 
			if(DANGE_TEXT.indexOf("_")>=0) {
				DANGE_TEXT = DANGE_TEXT.split("_")[1];
			}
		}
		catch (e)
		{
			DANGE_TEXT="";

		}


		try
		{
			if(JINDO_TEXT.indexOf(DANGE_TEXT)>=0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
			} 
			if(JINDO_TEXT.indexOf("_")>=0) {
				JINDO_TEXT = JINDO_TEXT.split("_")[JINDO_TEXT.split("_").length-1];
			}
		}
		catch (e)
		{
			JINDO_TEXT="";
		}

		DANGE_JINDO_TEXT = DANGE_TEXT + "단계 &nbsp;" + JINDO_TEXT + "호";
		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계","단계");

		$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT",$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html());
	}
	catch (e)
	{
	}

}

// 싱크빅 과목탭 이름 변경
function menu_text_reload_big() {
	$("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).html( String($("#"+ZMAT1_SELECT_DATA+"_head.menu"+MENU_CLICK_INDEX).html()).split("&nbsp;&nbsp;")[1] );

	if(  $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option").length>0 ){
		DANGE_JINDO_TEXT="";
		DANGE_JINDO_TEXT = $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").text();

		$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT",$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html());
	}


}

// 과목탭 이름 재설정
function menu_text_reload(new_is) {

	DANGE_JINDO_TEXT="";
	if(new_is==true) {

		//# 단계명 편집
		try
		{
			tmp_ZMAT1_TX = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("ZMAT1_TX");

			tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);

			DANGE_TEXT = $("#"+ZMAT1_SELECT_DATA+"_DANGE.menu"+MENU_CLICK_INDEX+" option:selected").text();

			if(tmp_ZMAT1_TX=="(신)한깨" && DANGE_TEXT.indexOf(tmp_ZMAT1_TX)<0) {
				tmp_ZMAT1_TX="(신)한글깨치기";
			} 
			if(DANGE_TEXT.indexOf(tmp_ZMAT1_TX)>=0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
			} 
		}
		catch (e)
		{
			DANGE_TEXT="";
		}
		DANGE_TEXT = DANGE_TEXT.replace("_","");
		if(DANGE_TEXT.length>6) {
			DANGE_TEXT = Left(DANGE_TEXT,6)+"..";
		}

		//# 호수명 편집
		try
		{
			JINDO_TEXT = $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").text();
			if(JINDO_TEXT.indexOf(DANGE_TEXT)>=0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
			} 
			if(JINDO_TEXT.indexOf("_")>=0) {
				JINDO_TEXT = JINDO_TEXT.split("_")[JINDO_TEXT.split("_").length-1];
			}
		}
		catch (e)
		{
			JINDO_TEXT="";
		}

		try
		{
			if(JINDO_TEXT.indexOf("단계")>=0) {
				JINDO_TEXT = JINDO_TEXT.split("단계")[1];
			} 
		}
		catch (e)
		{
			JINDO_TEXT="";
		}

		if(JINDO_TEXT.length>6) {
			JINDO_TEXT = Left(JINDO_TEXT,6)+"..";
		}


		JINDO_TEXT_RE = $("#"+ZMAT1_SELECT_DATA+"_JINDO.menu"+MENU_CLICK_INDEX+" option:selected").text();
		DANGE_JINDO_TEXT = DANGE_TEXT;
		if(DANGE_JINDO_TEXT.indexOf("바로셈")>=0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("바로셈")[1];
		} 
		if(DANGE_JINDO_TEXT.indexOf("(")>=0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("(")[0];
		} 

		//# 단계 글씨가 있지 않을 경우
		if(DANGE_JINDO_TEXT.indexOf("단계")<0) { 
			DANGE_JINDO_TEXT = DANGE_TEXT + "단계 &nbsp;";
		} else {
			DANGE_JINDO_TEXT = DANGE_TEXT + " &nbsp;";
		}

		if(JINDO_TEXT_RE.indexOf("호")<0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT + "호";
		} else {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT;
		}


		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계","단계");

		$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html(DANGE_JINDO_TEXT);
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT",$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html());

	} else {
		$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT"));
	}
}

// 셀렉트 박스 value체크
function validity_select_value(valid_object, valid_value) {
	tmp_count		= $(valid_object+" option").size();
	for(tmpNo=0;tmpNo<tmp_count;tmpNo++) {
		if($(valid_object+" option:eq("+tmpNo+")").val()==valid_value) {
			return true;
		}
	}

	return false;
}

// 데이터 없을경우 메세지 표시
function visibility_data_comment(data_is, comment_data) {

	if(data_is==true) {
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","");
		$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","none");
	} else {


		if( ZMAT1_SELECT_DATA=="000000000000001022" || ZMAT1_SELECT_DATA=="000000000000001087" ){
			// 바로셈일때. 
            // 바로독해 일때, 추가. 2013.03.18 NDH
			var msg = "해당 권수는 정답지가 없습니다.";
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('.answer_tb').find('tbody').html('<tr><td colspan="2">'+msg+'</td></tr>');
            $(".wrong_answers").css("display","none"); // 맞은문제수 감추기 2013.03.29 NDH
		}else{
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_DATACONTENT").css("display","none");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").css("display","");

			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT").html(comment_data);
             $(".wrong_answers").css("display",""); // 맞은문제수 보이기 2013.03.29 NDH
		}



		if(comment_data=="계획된 진도가 없습니다.") {
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("RECORD_NO","0");

			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('span.control').addClass('none');
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find('h2').removeClass('has-control');

			$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html("");
			$("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT",$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html());

		}

    		//*  정답지 씽크U일때 추가
    		if( $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("CATEGORY")=="U" ){
    			if( $.trim($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("COURSE_CODE")).length>0 ){
    				var $tmpCon = $("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).find("div."+ZMAT1_SELECT_DATA+"_NOT_DATACONTENT");
    				var tmpHtmlT = ' <div class="selecting"><button type="button" class="button-style s-size global">정답지</button></div><div style="padding-top:24px">' + $tmpCon.html() + '</div>';
    
    				$tmpCon.css( 'padding-top', '0px' );
    				$tmpCon.html(tmpHtmlT);
    
    				//
    				$tmpCon.find( 'div.selecting>button' ).click(function(){
    					answer_windows( ZMAT1_SELECT_DATA )
    				});
    			}
    		}
    		//*/                


	}




	top_scroll();
}


// 왼쪽에서 파라미터 갯수만큼 문자 반환
function Left(Str, Num){
	if (Num <= 0)
		return "";
	else if (Num > String(Str).length)
		return Str;
	else
		return String(Str).substring(0, Num);
}

// 단계 진도 텍스트 반환
function get_dange_jindo_text( zTxt, dTxt, jTxt ){


	try
	{
		if(dTxt.indexOf(zTxt)>=0) {
			dTxt = dTxt.split(zTxt)[1];
		} 
		if(dTxt.indexOf("_")>=0) {
			dTxt = dTxt.split("_")[1];
		}
	}
	catch (e)
	{
		dTxt="";
	}


	try
	{
		if(jTxt.indexOf(dTxt)>=0) {
			jTxt = jTxt.split(dTxt)[1];
		} 
		if(jTxt.indexOf("_")>=0) {
			jTxt = jTxt.split("_")[jTxt.split("_").length-1];
		}
	}
	catch (e)
	{
		jTxt="";
	}

	var djTxt = dTxt + "단계 &nbsp;" + jTxt + "호";
	djTxt = djTxt.replace("단계단계","단계");

	return djTxt;
}
