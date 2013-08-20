/********************************************************************************/
//global Value
/********************************************************************************/

var $container;
var pageParams = {"data":[]}
var template_history_age;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지로드
$(document).ready(function(){

	app_endLoading();

	app_changeTitle("WEAT 응시이력");
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

	template_history_age = $('#modal_history_age').html();
	$('#modal_history_age').html("");
	$('#modal_history_age').remove();
});

//페이지파라미터 
var setData = function( $data ){

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		load_data();

	} else {

	}

};

//페이지이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams);
}

//응시이력조회
var load_data = function() {


	loader.load( {
		Function: "ZTBSD_GM_WEAT_004",
		Parameter: {
			KUNNR:pageParams.KUNNR
		},
		Success: function($data){

			JsonData = JSON.parse( $data );

			$("#NAME1").html(JsonData.Parameter.S_EXPORTA.NAME1);
			$("#GBDAT").html(JsonData.Parameter.S_EXPORTA.GBDAT);
			tmpAddress_info=JsonData.Parameter.S_EXPORTA.PSTLZ+"<br/>"+JsonData.Parameter.S_EXPORTA.ORT01+"<br/>"+JsonData.Parameter.S_EXPORTA.STRAS;
			$("#address_info").html(tmpAddress_info);

			pageParams.NAME1 = JsonData.Parameter.S_EXPORTA.NAME1;
			pageParams.PARGE = JsonData.Parameter.S_EXPORTA.PARGE;

			$("#weat_history").html("");

			if( !!JsonData.Parameter.T_EXPORTA ){
				var tmpHTML_head="";
                var tmpHTML_foot="";
                var tmpHTML="";
                var tmpGrade="";
                var tmpEntryArr = new Array();
				$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
                    

  					if($.trim(String(entry["KJUMS"]))=="-") entry["KJUMS"]="0";
  					if($.trim(String(entry["SJUMS"]))=="-") entry["SJUMS"]="0";
  					if($.trim(String(entry["AJUMS"]))=="-") entry["AJUMS"]="0";
  					if($.trim(String(entry["BJUMS"]))=="-") entry["BJUMS"]="0";
  					if($.trim(String(entry["CJUMS"]))=="-") entry["CJUMS"]="0";
                    
                              
 					tmpHTML_head="";
                    tmpHTML_foot="";
                    tmpHTML="";
                     
 					tmpHTML_head=""+
 					'<li><ul><div class="content">'+
 					"  <li>"+                    
 					'      <strong class="term">지국명</strong><span class="desc">'+entry["VKBUR_TX"]+'</span>\n'+
                     '       <span class="string-slash">/</span>\n'+
                     '       <strong class="term">교사명</strong><span class="desc">'+entry["TUTOR_TX"]+'</span>\n'+
 					'  </li>\n'+
 					'  <li>\n'+                    
 					'      <strong class="term">평가시행일</strong>\n'+
                     '       <span class="desc">'+entry["SDATE"]+'</span>\n'+
 					'  </li>\n';


                    //스테이지코드별 출력 조정
                      tmpEntryArr[0] = entry["KJUMS"];
                      tmpEntryArr[1] = entry["SJUMS"];
                      tmpEntryArr[2] = entry["AJUMS"];
                      tmpEntryArr[3] = entry["BJUMS"];
                      tmpEntryArr[4] = entry["CJUMS"];
                      
                      for(var i=0; i < tmpEntryArr.length; i++){
                          var tmpStrData = String(tmpEntryArr[i]);
                          if(tmpStrData!="0"){
                              var fData = tmpStrData.indexOf("(");
                              if(fData > -1)
                              { // 37(1A) <<  1A 부분 
                                  sData = tmpStrData.indexOf(")");
                                  tmpGrade = tmpStrData.substring(fData+1,sData);
                                  if(kids_grade_chk(tmpGrade)=='Y'){ //키즈
                                     if(tmpGrade=="A1"||tmpGrade=="A2"){
                     					tmpHTML+=
                     					'  <li>\n'+
                                         '<strong class="term">언어(T점수)</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">인지</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'CO\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["AJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">감각운동</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'SE\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["BJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">사회정서</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'EM\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["CJUMS"]+'</a></span>\n'+                                                                                             
                     					'  </li>\n';                                    
                                     }else if(tmpGrade=="A3"){
                     					tmpHTML+=
                     					'  <li>\n'+
                                         '<strong class="term">인지</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'CO\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["AJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">언어(T점수)</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">사회정서</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'EM\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["CJUMS"]+'</a></span>\n'+                                                                                             
                     					'  </li>\n'; 
                                    }else if(tmpGrade=="A"){
                     					tmpHTML+=
                     					'  <li>\n'+
                                         '<strong class="term">언어(T점수)</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">수리(T점수)</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'MA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["SJUMS"]+'</a></span>\n'+                                                                                            
                     					'  </li>\n'; 
                                     }else{
                     					tmpHTML+=
                     					'  <li>\n'+
                                         '<strong class="term">언어(T점수)</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">인지</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'CO\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["AJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">감각운동</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'SE\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["BJUMS"]+'</a></span>\n'+
                                         '<span class="string-slash">/</span>\n'+
                                         '<strong class="term">사회정서</strong>\n'+
                                         '<span class="desc"><a onclick="result_view(\'EM\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["CJUMS"]+'</a></span>\n'+                                                                                             
                     					'  </li>\n';
                                     }
    
    
                                       
                                 }else{ // 초등
                                     
                 					tmpHTML+=
                 					'  <li>\n'+
                                     '<strong class="term">언어(T점수)</strong>\n'+
                                     '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n'+
                                     '<span class="string-slash">/</span>\n'+
                                     '<strong class="term">수리(T점수)</strong>\n'+
                                     '<span class="desc"><a onclick="result_view(\'MA\',\''+entry["POSNM"]+'\',\''+tmpGrade+'\');" class="anchor box">'+entry["SJUMS"]+'</a></span>\n'+
                 					'  </li>\n';
                                 }
                                 break;
                                 
                              }else{ 
                                
                                
                              }
                              
                          }else{ //빈값(0)
                                 continue;
                          }
                          
                      }
                      
                        var intCnt = 0;
                       if(tmpHTML==""||tmpHTML==undefined){ 
                            //값이 안나올 경우(초등인 경우 4문제 이상 풀지 않으면 답안이 안나옴.)
                            //RFC 추가 2013.05.16 NDH
                            tmpHTML+='  <li>\n'
                                if(entry["KGUN2"]!="0"){
                                    if(intCnt>0) {
                                        tmpHTML+='<span class="string-slash">/</span>\n';
                                    }
                                    intCnt++;
                                    tmpHTML+='<strong class="term">언어(T점수)</strong>\n'+
                                      '<span class="desc"><a onclick="result_view(\'LA\',\''+entry["POSNM"]+'\',\''+entry["KGUN2"]+'\');" class="anchor box">'+entry["KJUMS"]+'</a></span>\n';
                                }
                                if(entry["SGUN2"]!="0"){
                                    if(intCnt>0) {
                                        tmpHTML+='<span class="string-slash">/</span>\n';
                                    }
                                    intCnt++;
                                    tmpHTML+='<strong class="term">수리(T점수)</strong>\n'+
                                      '<span class="desc"><a onclick="result_view(\'MA\',\''+entry["POSNM"]+'\',\''+entry["SGUN2"]+'\');" class="anchor box">'+entry["SJUMS"]+'</a></span>\n';
                                }
                                if(entry["AGUN2"]!="0"){
                                    if(intCnt>0) {
                                        tmpHTML+='<span class="string-slash">/</span>\n';
                                    }
                                    intCnt++;
                                    tmpHTML+='<strong class="term">인지(T점수)</strong>\n'+
                                      '<span class="desc"><a onclick="result_view(\'CO\',\''+entry["POSNM"]+'\',\''+entry["AGUN2"]+'\');" class="anchor box">'+entry["AJUMS"]+'</a></span>\n';
                                }
                                if(entry["BGUN2"]!="0"){
                                    if(intCnt>0) {
                                        tmpHTML+='<span class="string-slash">/</span>\n';
                                    }
                                    intCnt++;
                                    tmpHTML+='<strong class="term">감각운동</strong>\n'+
                                      '<span class="desc"><a onclick="result_view(\'SE\',\''+entry["POSNM"]+'\',\''+entry["BGUN2"]+'\');" class="anchor box">'+entry["BJUMS"]+'</a></span>\n';
                                }
                                if(entry["CGUN2"]!="0"){
                                    if(intCnt>0) {
                                        tmpHTML+='<span class="string-slash">/</span>\n';
                                    }
                                    intCnt++;
                                    tmpHTML+='<strong class="term">사회정서</strong>\n'+
                                      '<span class="desc"><a onclick="result_view(\'EM\',\''+entry["POSNM"]+'\',\''+entry["CGUN2"]+'\');" class="anchor box">'+entry["CJUMS"]+'</a></span>\n';
                                }
                                tmpHTML+='  </li>\n'


                       }
 

 					tmpHTML_foot+=
 					'  </ul></div></li>\n';
                      
                     $("#weat_history").append(tmpHTML_head+tmpHTML+tmpHTML_foot);
                
                     

                    
                    

//기존 출력 형식
/*


  					tmpData = $("#temp_weat_history").html();
  					tmpData=tmpData.replace(/#VKBUR_TX#/g, entry["VKBUR_TX"]); 
  					tmpData=tmpData.replace(/#TUTOR_TX#/g, entry["TUTOR_TX"]); 
  					tmpData=tmpData.replace(/#SDATE#/g, entry["SDATE"].replace(/\//g,".")); 

  					if($.trim(String(entry["KJUMS"]))=="-") entry["KJUMS"]="0";
  					if($.trim(String(entry["SJUMS"]))=="-") entry["SJUMS"]="0";
  					if($.trim(String(entry["AJUMS"]))=="-") entry["AJUMS"]="0";
  					if($.trim(String(entry["BJUMS"]))=="-") entry["BJUMS"]="0";
  					if($.trim(String(entry["CJUMS"]))=="-") entry["CJUMS"]="0";
                                      


  					tmpData=tmpData.replace(/#KJUMS#/g, entry["KJUMS"]);//KJUMS 언어영역점수
  					tmpData=tmpData.replace(/#SJUMS#/g, entry["SJUMS"]);//SJUMS 수리영역점수
                     tmpData=tmpData.replace(/#AJUMS#/g, entry["AJUMS"]);//AJUMS 인지영역점수
                     tmpData=tmpData.replace(/#BJUMS#/g, entry["BJUMS"]);//BJUMS 감각운동영역점수
                     tmpData=tmpData.replace(/#CJUMS#/g, entry["CJUMS"]);//CJUMS 사회정서영역점수
  					tmpData=tmpData.replace(/#POSNM#/g, entry["POSNM"]);//응시번호
                      
                      
                      var tmpEntryArr = new Array(entry["KJUMS"], entry["SJUMS"], entry["AJUMS"], entry["BJUMS"], entry["CJUMS"]);
                      //for(var key in tmpEntryArr){
                      for(var i=0; i < tmpEntryArr.length; i++){
                          var tmpStrData = String(tmpEntryArr[i]);
                          var fData = tmpStrData.indexOf("(");
                          if(fData > -1)
                          { //단계가 있다. ex>23(A) << A 값
                              sData = tmpStrData.indexOf(")");
                              tmpGrade = tmpStrData.substring(fData+1,sData);


                                   if(i == 0){//KJUMS 언어영역점수
                                       tmpData=tmpData.replace(/#KIDS_LA#/g, tmpGrade);
                                   }else if(i == 1){//SJUMS 수리영역점수
                                       tmpData=tmpData.replace(/#KIDS_MA#/g, tmpGrade);
                                   }else if(i == 2){//AJUMS 인지영역점수
                                       tmpData=tmpData.replace(/#KIDS_CO#/g, tmpGrade);
                                   }else if(i == 3){//BJUMS 감각운동영역점수
                                       tmpData=tmpData.replace(/#KIDS_SE#/g, tmpGrade);
                                   }else if(i == 4){//CJUMS 사회정서영역점수
                                       tmpData=tmpData.replace(/#KIDS_EM#/g, tmpGrade);
                                   }

                          }
                          
                      }
                      
                      
                     $("#weat_history").append(tmpData);                     
                      

                           
 */

					
                    
                    
                    
				}); 

			}
		},
		Error: function($e){
			app_alert($e);
		}
	});

}



//답안등록
var answerSubmit = function() {

	//pageParams.mode = 'LA';
    app_changePage( "D010401.html", pageParams, false );

}

//키즈면 Y, 초등이면 N
var kids_grade_chk = function(grade){
    switch (grade){ 
    	case "1A":
    	case "1B":
    	case "2A":
    	case "2B":
    	case "3A":
    	case "3B":
    	case "4A":
    	case "4B":
    	case "5A":
    	case "5B":
    	case "6A":
    	case "6B":
    	case "B":
    	case "C":
            return "N";
    	break;
    	default :
            return "Y";
    }

}

//결과보기 이동
var result_view = function(mode,POSNM,grade) {
    var url = '';
    var kids_chk = "";

    kids_chk = kids_grade_chk(grade);

    if(kids_chk =="Y"){//키즈
            url = 'D030200.html';
    }else{//초등
            url = 'D020200.html';
    }

    pageParams.grade_term = grade;
	pageParams.mode = mode;
	pageParams.POSNM = POSNM;

    app_changePage( url, pageParams, true );
}

//@ 상세정보 (html 파일에 onclick)
var detail_info = function() {

	pageParams.KUNNR = pageParams.KUNNR;
	pageParams.nextURL = "D010500.html";
	app_setRequestParameter("readyChange", pageParams);

}

//파라미터 저장후 반환함수
var readyChange=function() {

	app_changePage( pageParams.nextURL, pageParams, true );
}

//@ WEAT 응시 연령
var open_history_age = function() {

	app_showBlind(true);
	$('#Dialog').empty();
	$('#Dialog').append( template_history_age );
	//
	$('#Dialog').modal({
		onOpen : null,
		onShow : function(d){
			setModalStyle('#Dialog');
		},
		onClose : null,
		overlayClose : false,
		escClose : false,
		containerId : 'endCon',
		opacity : 60,
		overlayCss : {backgroundColor:"#000"}
	});

}

// 모달 취소클릭
var modal_history_cancel = function(e){
	modal_history_close();
};

// 모달 닫기
var modal_history_close = function(){
	$.modal.close();
	app_showBlind(false);
};

// 모달 응시연령 저장 클릭
var modal_history_save = function(e){

	if($('#endCon').find("input:radio[name=WEAT_HISTORY_AGE]:checked").length < 1) {

		app_alert("응시 연령 선택해주세요.");
		return;	
	} 

	tmpData = $('#endCon').find("input:radio[name=WEAT_HISTORY_AGE]:checked").val();

	modal_history_close();
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

