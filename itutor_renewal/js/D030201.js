/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}


/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 종합 분석지");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );


});

// 페이지 파라미터 수신
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();
	} else {

	}

};

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

    
    


//결과분석지 로드
var load_data = function() {

    var soap_function ="";
    //navigation 초기 셋팅
    if(pageParams.grade_term=="A3" ){ //인지,언어,사회정서
    	$("#navSE").addClass("none");
        $("#navMA").addClass("none");
        $("#SE_SCORE").parent().addClass("none");
        $("#MA_SCORE").parent().addClass("none");
        $("#Nav .area-lnb ul li").width("23%");
        soap_function = "sp_it_wt_kid_est_rpt_a123_1_r";
    }else if(pageParams.grade_term=="A"){ //언어, 수리
        $("#navSE").addClass("none");
        $("#navCO").addClass("none");
        $("#navEM").addClass("none");
        $("#SE_SCORE").parent().addClass("none");
        $("#CO_SCORE").parent().addClass("none");
        $("#EM_SCORE").parent().addClass("none");
        
        $("#navLA").html('<a href="#" onclick="page_move_code(\'D030203.html\',\'LA\');">언어</a>');
        $("#navMA").html('<a href="#" onclick="page_move_code(\'D030203.html\',\'MA\');">수리</a>');
        
        $("#Nav .area-lnb ul li").width("31%");
        soap_function = "sp_it_wt_kid_est_rpt_a_1_r";
    }else{
        $("#navMA").addClass("none");
        $("#MA_SCORE").parent().addClass("none");
        $("#Nav .area-lnb  ul  li").width("18%");
        soap_function = "sp_it_wt_kid_est_rpt_a123_1_r";
    }


	var param = {
			in_est_seq:pageParams.POSNM
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : soap_function,
		Parameter : param,
		CursorCnt : '4',
		Success: function(data){

			if( $(data).find('Table').find( 'AREA_CODE' ).length>0 ){
				$(data).find('Table').each(function(){

					tmp_AREA_CODE	= $(this).find( 'AREA_CODE' ).text();
					tmp_TSCORE		= $(this).find( 'TSCORE' ).text();
					tmp_PERCENT		= $(this).find( 'PERCENT' ).text();
                    if(tmp_TSCORE=="" || tmp_TSCORE =="&nbsp;")tmp_TSCORE = "-";
                    if(tmp_PERCENT=="" || tmp_PERCENT =="&nbsp;")tmp_PERCENT = "-";

					switch(tmp_AREA_CODE) {
					case "TO":
						$("#TO_SCORE").html(tmp_TSCORE+"점");
						$("#TO_PERCENT").css("width",tmp_PERCENT+"%");
						$("#TO_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "LA":
						$("#LA_SCORE").html(tmp_TSCORE+"점");
						$("#LA_PERCENT").css("width",tmp_PERCENT+"%");
						$("#LA_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "MA":
						$("#MA_SCORE").html(tmp_TSCORE+"점");
						$("#MA_PERCENT").css("width",tmp_PERCENT+"%");
						$("#MA_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "SE":
						$("#SE_SCORE").html(tmp_TSCORE+"점");
						$("#SE_PERCENT").css("width",tmp_PERCENT+"%");
						$("#SE_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "EM":
						$("#EM_SCORE").html(tmp_TSCORE+"점");
						$("#EM_PERCENT").css("width",tmp_PERCENT+"%");
						$("#EM_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;
					case "CO":
						$("#CO_SCORE").html(tmp_TSCORE+"점");
						$("#CO_PERCENT").css("width",tmp_PERCENT+"%");
						$("#CO_PERCENT").find("span").html(tmp_PERCENT+"%");
						break;

					}
				});
			}

			$("#TOTAL_MENT1").html($(data).find('Table1').find( 'TOTAL_MENT1' ).text());
			$("#TOTAL_MENT2").html($(data).find('Table1').find( 'TOTAL_MENT2' ).text());
            $("#TOTAL_MENT3").html($(data).find('Table1').find( 'TOTAL_MENT3' ).text());
            
            
            //가이드멘트 
			if( $(data).find('Table2').find( 'AREA_NAME' ).length>0 ){
				$(data).find('Table2').each(function(){
    					tmp_AREA_NAME	= $(this).find( 'AREA_NAME' ).text();
    					tmp_GUIDE_MENT		= $(this).find( 'GUIDE_MENT' ).text();
    
    					tmpHTML="";
    					tmpHTML=""+
    					'<li class="title" ><strong>'+ tmp_AREA_NAME + '</strong></li>' +
                        '<li>' + tmp_GUIDE_MENT + '</li>'+
    					"\n";
    
    					$("#guide_ment_container").append(tmpHTML);

				});
			}
            
 
		},
		Error: function($e){
			app_alert("Error:"+$e);
		}
	});


}


// 상단 탭 클릭시
var page_move_code = function(page_url,code) {

    if(code != "TO"){
        if(pageParams.apply_chk.indexOf(code) == -1){
            app_alert("응시하지 않은 영역입니다.");
            return;
        }        
    }
    pageParams.AREA_CODE = code;
	app_changePage(page_url, pageParams, false );
}
