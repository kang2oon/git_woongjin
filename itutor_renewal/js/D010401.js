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

	app_changeTitle("WEAT 연령 선택");
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

	$('#cancelBtn').click(function(){
		app_goCancel();
	});


	var param = {
			in_weat_type:"WEAT KIDS"
	};

	pageParams_json = JSON.stringify( param );

	loader.service({
		Function : 'sp_it_wt_cmn_age_r',
		Parameter : param,
		CursorCnt : '2',
		Success: function(data){
            

                        //따로 추가.
                        //6세(만5세 ~초등)통합으로 주석 2014.05.02 NDH
/*
                         for(var i=6; 1<=i;i--){
                             tmpHTML="";
         					tmpHTML=""+
         					'<tr>'+
                             '<td>초등'+i+'</td>' +
                             '<td><button class="button-style m-size"  onclick="page_move(\'notKids\',\''+ i +'\')" >선택</button></td>' +
                             '</tr>'+
         					"\n";
         
         					$("tbody").append(tmpHTML);
                         }
                         
                             tmpHTML="";
         					tmpHTML=""+
         					'<tr>'+
                             '<td>7세(만 6세)</td>' +
                             '<td><button class="button-style m-size"  onclick="page_move(\'notKids\',\'C\')" >선택</button></td>' +
                             '</tr>'+ 
         					"\n" +                            
         					'<tr>'+
                             '<td>6세(만 5세)</td>' +
                             '<td><button class="button-style m-size"  onclick="page_move(\'notKids\',\'B\')" >선택</button></td>' +
                             '</tr>'+
                             "\n"
 */
                            tmpHTML="";
         					tmpHTML=""+                          
         					'<tr>'+
                             '<td>6세(만 5세) ~ 초등</td>' +
                             '<td><button class="button-style m-size"  onclick="page_move(\'notKids\',\'B\')" >선택</button></td>' +
                             '</tr>'+
                             "\n"
        
        					$("tbody").append(tmpHTML);                        
                        

 			if( $(data).find('Table').length>0 ){
 			    var tmp_AGE_TEXT_ARR = new Array();
                var tmp_AGE_SEQ_ARR = new Array();
                var tmp_STAGE_CODE_ARR = new Array();


 				$(data).find('Table').each(function(index){
     					tmp_AGE_TEXT_ARR[index]	= $(this).find( 'AGE_TEXT' ).text();
     					tmp_AGE_SEQ_ARR[index]		= $(this).find( 'AGE_SEQ' ).text();
                        tmp_STAGE_CODE_ARR[index]  = $(this).find( 'STAGE_CODE' ).text();

 				});

                
                var arrLeng = tmp_AGE_TEXT_ARR.length;
                for(var i=arrLeng-1; 0<=i; i--){

     					tmp_AGE_TEXT	= tmp_AGE_TEXT_ARR[i];
     					tmp_AGE_SEQ		= tmp_AGE_SEQ_ARR[i];
                        tmp_STAGE_CODE  = tmp_STAGE_CODE_ARR[i];

     					tmpHTML="";
     					tmpHTML=""+
     					'<tr>'+
                         '<td>'+ tmp_AGE_TEXT + '</td>' +
                         '<td><button class="button-style m-size"  onclick="page_move(\''+ tmp_AGE_SEQ +'\',\''+ tmp_STAGE_CODE +'\')" >선택</button></td>' +
                         '</tr>'+
     					"\n";
     
     					$("tbody").append(tmpHTML);
                    
                }
                
                
                



            
/*
 			if( $(data).find('Table').length>0 ){
 				$(data).find('Table').each(function(){
     					tmp_AGE_TEXT	= $(this).find( 'AGE_TEXT' ).text();
     					tmp_AGE_SEQ		= $(this).find( 'AGE_SEQ' ).text();
                         tmp_STAGE_CODE  = $(this).find( 'STAGE_CODE' ).text();
     
     					tmpHTML="";
     					tmpHTML=""+
     					'<tr>'+
                         '<td>'+ tmp_AGE_TEXT + '</td>' +
                         '<td><button class="button-style m-size"  onclick="page_move(\''+ tmp_AGE_SEQ +'\',\''+ tmp_STAGE_CODE +'\')" >선택</button></td>' +
                         '</tr>'+
     					"\n";
     
     					$("tbody").append(tmpHTML);

 				});
 */

                
                
                
                
                
                
			}else{
    			app_alert("데이터를 가져오지 못했습니다.");
                return;			 
			}

		},
		Error: function($e){
			app_alert("Error:"+$e);
            return;
		}
	});


}




var page_move = function(age_seq,stage_code) {
    
    if(age_seq =="notKids"){
        var page_url = 'D020100.html'
            pageParams.mode = 'LA';
    }else{
        var page_url = 'D030100.html'
    }
    
    
    
    pageParams.age_seq = age_seq;
    pageParams.grade_term = stage_code;
	app_changePage(page_url, pageParams, false );
}
