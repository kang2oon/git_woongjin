/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}

var in_emp_no="";
var in_emp_name="";

var answer_img_url="";



var	apply_chk = Array(5); //SE,EM,LA,CO,MA
    apply_chk['SE'] = "N";
    apply_chk['EM'] = "N";
    apply_chk['LA'] = "N";
    apply_chk['CO'] = "N";
    apply_chk['MA'] = "N";

var	tmpArrayAnswer = Array(5); //SE,EM,LA,CO,MA
    tmpArrayAnswer['SE'] = new Array(3);//ANSWER_STATE, ANSWER_IMG_YN, ANSWER_DSP_IT
    tmpArrayAnswer['SE'][0] = new Array();
    tmpArrayAnswer['SE'][1] = new Array();
    tmpArrayAnswer['SE'][2] = new Array();
    tmpArrayAnswer['EM'] = new Array(3);//ANSWER_STATE, ANSWER_IMG_YN, ANSWER_DSP_IT
    tmpArrayAnswer['EM'][0] = new Array();
    tmpArrayAnswer['EM'][1] = new Array();
    tmpArrayAnswer['EM'][2] = new Array();
    tmpArrayAnswer['LA'] = new Array(3);//ANSWER_STATE, ANSWER_IMG_YN, ANSWER_DSP_IT
    tmpArrayAnswer['LA'][0] = new Array();
    tmpArrayAnswer['LA'][1] = new Array();
    tmpArrayAnswer['LA'][2] = new Array();
    tmpArrayAnswer['CO'] = new Array(3);//ANSWER_STATE, ANSWER_IMG_YN, ANSWER_DSP_IT
    tmpArrayAnswer['CO'][0] = new Array();
    tmpArrayAnswer['CO'][1] = new Array();
    tmpArrayAnswer['CO'][2] = new Array();
    tmpArrayAnswer['MA'] = new Array(3);//ANSWER_STATE, ANSWER_IMG_YN, ANSWER_DSP_IT
    tmpArrayAnswer['MA'][0] = new Array();
    tmpArrayAnswer['MA'][1] = new Array();
    tmpArrayAnswer['MA'][2] = new Array();                




/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT KIDS 답안수정");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );



});


//페이지파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );


        sp_it_wt_kid_est_regist_r();

		init_data();
		load_data();



	} else {

	}

};



//정보표시
var init_data = function() {
   	pageParams.ANSWER_SE = "";
   	pageParams.ANSWER_EM = "";
   	pageParams.ANSWER_LA = "";
   	pageParams.ANSWER_CO = "";
    pageParams.ANSWER_MA = ""; 
 

    //응시, 미응시 초기 체크
     if(pageParams.apply_chk != ""){
         var tmpApplyArr = pageParams.apply_chk.split('|');
         
 		for(var key in apply_chk){
 		  var tmpReturn = $.inArray(key,tmpApplyArr);
           if(tmpReturn > -1){
               apply_chk[key] = "Y";
               tmpApplyArr.splice(tmpReturn,1);
           }
 		}
     }

	$("#apply_chk").change(function() {
        var area_code = $("#area_code").val();
        if($("#apply_chk").val()=="Y"){
            apply_chk[area_code] ="Y";
        }else{
            apply_chk[area_code] ="N";
        }
	});     
     
    
    switch (pageParams.grade_term){
    	case "A3":
            $("#Nav .area-lnb ul li").width("31%");
    	    $("#navSE").addClass("none");
            $("#navMA").addClass("none");
    	break;
    	case "A":
            $("#Nav .area-lnb ul li").width("48%");
    	    $("#navSE").addClass("none");
            $("#navCO").addClass("none");
            $("#navEM").addClass("none");
    	break;   
    	default : //A1,A2
            $("#Nav .area-lnb  ul  li").width("23%");
            $("#navMA").addClass("none");
    }

   
    $("#nav"+pageParams.mode).addClass("active");
    $("#submitButton").html("채점");
    $("#area_code").val(pageParams.mode);
    $("#grade_term").val(pageParams.grade_term);
    $("#submitButton").attr("onclick","sp_it_wt_kid_est_regist_u()");
    
    
    


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




 //@ 기존 응시이력조회 (초기 한번만 실행)
 var sp_it_wt_kid_est_regist_r = function() {


 	tmpGRADE_TERM = pageParams.grade_term;

 	if(tmpGRADE_TERM=="") {
 		return;
 	}

	var param = {
            in_stage_code:tmpGRADE_TERM,
            in_area_code:"TO",
			in_est_seq:pageParams.POSNM
	};

 	loader.service({
        Function : 'sp_it_wt_kid_est_regist_r',
 		Parameter : param,
 		CursorCnt : '2',
 		Success: function(data){

 			$("#TB_DATA").html("");
 			if( $(data).find('Table').find( 'QST_NO' ).length>0 ){
 				$(data).find('Table').each(function(index){
 					tmp_QST_NO			= $(this).find( 'QST_NO' ).text();
                    tmp_AREA_CODE		= $(this).find( 'AREA_CODE' ).text();
 					tmp_ANSWER_STATE	= $(this).find( 'ANSWER_STATE' ).text();
                    tmp_ANSWER_IMG_YN	= $(this).find( 'ANSWER_IMG_YN' ).text();
 					tmp_ANSWER_DSP_IT	= $(this).find( 'ANSWER_DSP_IT' ).text();
                    tmp_QST_NO--;

        			switch(tmp_AREA_CODE) {
        			case "SE":
                        tmpArrayAnswer["SE"][0][tmp_QST_NO] = tmp_ANSWER_STATE;
                        tmpArrayAnswer["SE"][1][tmp_QST_NO] = tmp_ANSWER_IMG_YN;
                        tmpArrayAnswer["SE"][2][tmp_QST_NO] = tmp_ANSWER_DSP_IT;
        				break;
        			case "EM":
                        tmpArrayAnswer["EM"][0][tmp_QST_NO] = tmp_ANSWER_STATE;
                        tmpArrayAnswer["EM"][1][tmp_QST_NO] = tmp_ANSWER_IMG_YN;
                        tmpArrayAnswer["EM"][2][tmp_QST_NO] = tmp_ANSWER_DSP_IT;
        				break;
        			case "LA":
                        tmpArrayAnswer["LA"][0][tmp_QST_NO] = tmp_ANSWER_STATE;
                        tmpArrayAnswer["LA"][1][tmp_QST_NO] = tmp_ANSWER_IMG_YN;
                        tmpArrayAnswer["LA"][2][tmp_QST_NO] = tmp_ANSWER_DSP_IT;
        				break;
        			case "CO":
                        tmpArrayAnswer["CO"][0][tmp_QST_NO] = tmp_ANSWER_STATE;
                        tmpArrayAnswer["CO"][1][tmp_QST_NO] = tmp_ANSWER_IMG_YN;
                        tmpArrayAnswer["CO"][2][tmp_QST_NO] = tmp_ANSWER_DSP_IT;
        				break;
        			case "MA":
                        tmpArrayAnswer["MA"][0][tmp_QST_NO] = tmp_ANSWER_STATE;
                        tmpArrayAnswer["MA"][1][tmp_QST_NO] = tmp_ANSWER_IMG_YN;
                        tmpArrayAnswer["MA"][2][tmp_QST_NO] = tmp_ANSWER_DSP_IT;
        				break;

        			default:
        				return;
        			}

 				});

                    pageParams.ANSWER_SE=tmpArrayAnswer["SE"][0].join('$');
                    pageParams.ANSWER_EM=tmpArrayAnswer["EM"][0].join('$');
                    pageParams.ANSWER_LA=tmpArrayAnswer["LA"][0].join('$');
                    pageParams.ANSWER_CO=tmpArrayAnswer["CO"][0].join('$');
                    pageParams.ANSWER_MA=tmpArrayAnswer["MA"][0].join('$');
                    

             		setTimeout(function() {display_html();}, 1000);
                 
 			}else{

 			    app_alert("데이터를 가져오지 못했습니다.");    
 			}
            

 		},
 		Error: function($e){

 			app_alert("Error:"+$e);
 		}
 	});
    



 }






var display_html = function(){
    var tmpAreaCode = $("#area_code").val();
        $("#TB_DATA").html("");
        $("#apply_chk").val( apply_chk[tmpAreaCode]  );

 			if(tmpArrayAnswer[tmpAreaCode][0].length > 0 ){
			     for(var i=0;tmpArrayAnswer[tmpAreaCode][0].length > i; i++ ){


					tmp_QST_NO			= i+1;
					tmp_ANSWER_STATE	= tmpArrayAnswer[tmpAreaCode][0][i];
					tmp_ANSWER_IMG_YN	= tmpArrayAnswer[tmpAreaCode][1][i];
					tmp_ANSWER_DSP_IT	= tmpArrayAnswer[tmpAreaCode][2][i];


					checked1="";
					checked2="";
                    checked0="";

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
                    
				}

                
                
			}else{
			 app_alert('데이터가 없습니다.');
             return;
			}

    
    tab_select_area( tmpAreaCode );
}




//@  기존응시내역 수정
var sp_it_wt_kid_est_regist_u = function() {


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


	var gender = String(pageParams.PARGE);
	if( pageParams.PARGE==undefined ){
		gender = ' ';
	}

	if( pageParams.NAME1==undefined ){
		app_alert('고객명이 누락되었습니다.');
		return false;
	}



    var tmp_anserData="";
    var tmpAreaCode = $("#area_code").val();
    var count = tmpArrayAnswer[tmpAreaCode][0].length;

	for(exNo=1;exNo<=count;exNo++) {
		try
		{
			switch( $("input:radio[name=exno_"+exNo+"]:checked").val() ) {
			case "1":
				tmp_anserData=tmp_anserData+"1$";
				break;
			case "2":
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
				app_alert(e);
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



    var tmpCodeList = [];
    var tmpAnswerList = [];
    

    $("#local.area-lnb > ul > li").not('.none').each(function(){

       var tmpList = $(this).attr("id"); //navCO, navSE...
           tmpList = tmpList.substring(tmpList.length-2,tmpList.length); //CO, SE
           
		for(var key in apply_chk){
			var val  = apply_chk[key];

            if( tmpList ==key && val =="Y"  )
            {
                tmpCodeList.push(key); //CO|SE|EM
                tmpAnswerList.push(eval( 'pageParams.ANSWER_'+key));
            }

		}
       
    });

    
    if($("#apply_chk").val()=="N")
    {
		app_alert('답안수정을 하려면 응시로 선택해 주세요.');
        //app_showConfirm('응시한 과목이 없습니다.\n WAET 응시이력으로 돌아가시겠습니까? ', "경고", "weakSubmitOK","weakSubmitCancle");
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
        pageParams.apply_chk = area_code_list;
    var answer_list = tmpAnswerList.join('|');




	var param = {
			in_est_seq:pageParams.POSNM,
			in_est_date:String(tm_year+''+tm_month+''+tm_day),
			in_stage_code:pageParams.grade_term,
			in_age_seq:pageParams.age_seq,
			in_area_code_list:area_code_list,
			in_answer_list:answer_list
	};


	loader.service({
		Function : 'sp_it_wt_kid_est_regist_u',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
		  
			if( $(data).find('Table').find( 'EST_SEQ' ).length>0 && $(data).find('Table1').find('RET').text() == "0" ){ //정상 처리
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
                  app_alert( $(data).find('Table1').find('MSG').text() );
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
         
            var netx_area = tab_select_area($("#area_code").val());
            var next_area_name = areaCodeString(netx_area)+"영역";
            	pageParams.mode=netx_area;

			if( netx_area == ""  ) {

		      confirm_cancel();

			} else {
		      app_showConfirm(next_area_name+'도 변경하시겠습니까?','안내',"confirm_ok","confirm_cancel");			 
				
			}            

		},
		Error: function($e){
			app_alert($e);
		}
	});

}

//변경확인
var confirm_ok = function() {

	app_changePage( "D030101.html", pageParams, false );

} 

//변경취소
var confirm_cancel = function() {

    var firstCode =$("#local.area-lnb > ul > li").not('.none').first().attr("id"); //navCO
        firstCode = firstCode.substring(firstCode.length-2,firstCode.length);
        pageParams.mode=firstCode;
    //히스토리 삭제              
    app_goCancel();
	app_changePage( "D030200.html", pageParams,false );

} 

var tab_select_area = function(Varea_code ){
    

var grade_term =$("#grade_term").val();

    if(pageParams.grade_term=="A3" ){

        if(Varea_code=="CO") {
    		
    		$("#navCO").addClass("active");
    		$(".section_name").html("인지");

    		return "LA";
    	}else if(Varea_code=="LA") {
    
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");

    		return "EM";
    	}else if(Varea_code=="EM") {
    		$("#navEM").addClass("active");
    		$(".section_name").html("사회정서");
    		return "";
        }


    }else if(pageParams.grade_term=="A"){


        if(Varea_code=="LA") {
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");

    		return "MA";
        }else if(Varea_code=="MA") {
    
    		
    		$("#navMA").addClass("active");
    		$(".section_name").html("수리");
    		return "";
    	}
    

        
    }else{

    	if(Varea_code=="SE") {
    		$("#navSE").addClass("active");
    		$(".section_name").html("감각운동");
    		return "CO";
    	}else if(Varea_code=="CO") {
    
    		
    		$("#navCO").addClass("active");
    		$(".section_name").html("인지");

    		return "LA";
    	}else if(Varea_code=="LA") {
    
    		
    		$("#navLA").addClass("active");
    		$(".section_name").html("언어");
    		return "EM";
    	}else if(Varea_code=="EM") {
    
    		
    		$("#navEM").addClass("active");
    		$(".section_name").html("사회정서");
    		return "";
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

//탭클릭시
var set_area_code = function(mode) {
	pageParams.mode=mode;
	app_changePage( "D030101.html", pageParams, false );
    return;
}


//페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}


//새로고침
var refresh = function(){
	window.location.href = 'D030101.html' + '?dummy=' + (Math.random() * Math.random());
}