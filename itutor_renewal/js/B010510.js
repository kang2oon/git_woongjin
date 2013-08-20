/**
 * 바로셈 진도변경
 */


/**
 * 진도변경
 */
/*
VBELN		: 계약번호.
NAME1		: 회원명. 
ZMAT1		: 과목코드. 
ZMAT1_TX	: 과목명. 
*/

var pageParams;
var progressList;
var levelList;
var progressData;


//


var GUBUN = '';
var IS_STD = true;
var stmatList=[];
var hoList;
var currentIdx = -1;
var currentSubIdx = [];
var selectCnt=0;

var diffDT;

/** ===============================================================================================================
 * 최초시작
 *  */
$(document).ready( function () {
	app_endLoading();
	//
	app_getRequestParameter( 'setData' );
});


/** ===============================================================================================================
 * 페이지 파라미터 리턴 함수
 *  */
var setData = function( $data ){
	if( String($data)!="undefined" && !!$data && String($data)!="" ) {
		var data = $data.replace(/'/g, '"');
		pageParams = JSON.parse( data );
		//
		initPage();
	};
};

/** ===============================================================================================================
 * 초기실행
 *  */
var initPage = function(){
	app_changeTitle( '진도조회/수정' );
//	changeHeaderText();
    setTimeout(function() { init(); }, 1500);
	setPlan();
	    
    
        
};

// 헤더 변경
var changeHeaderText = function(){
	var text = pageParams.NAME1 + '/' + pageParams.ZMAT1_TX;
	$('#Header').find('h1').text(text);
}


/** ===============================================================================================================
 * 데이터 로드
 *  */

// 진도 조회 호출
var setPlan = function(){
	planLoad();
}

// 진도 조회 // 001_018
var planLoad = function(){
	loader.load( {
        Function: "ZTBSD_CHANGE_PLAN_PROGRESS_B",
        Parameter: {
        	VBELN: pageParams.VBELN,
        	MOBILE: 'X'
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		progressList = data.T_EXPORTA;
        		progressData = data.S_EXPORTA;
        		makeJindoTabel();
        	}else{
        		msgCall( "조회내용이 없습니다." );
        	}
        },
        Error: function($e){
        	//msgCall( 'error : ' + $e );
            msgCall( "조회내용이 없습니다" );
        }
    });
};





/*

진도 리스트 구성

VBELN 0(판매 문서)
SEQNO 1(일련번호)
STDAT 2(정상수업일)
MATNR 3(학습단계)
JINDO 4(수업호수)
CHECK 5(표준진도 CHECK)
SMAT1 6(주학습교재)
SMAT2 7(부교재1)
SMAT3 8(부교재2)
SMAT4 9(부교재3)
JMDAT 10(교재주문일)
JMART 11(주문유형)
MATNR_ATX 12(학습단계명)
JINDO_ATX 13(호수명)
SMAT1_ATX 14(주학습교재명)
SMAT2_ATX 15(부교재1명)
SMAT3_ATX 16(부교재2명)
SMAT4_ATX 17(부교재3명)
JMART_TX 18(주문유형명)
*/

var makeJindoTabel = function(){
	var fn_replaceEmptyString = function( ss ){
		var rss=ss;
		if( $.trim(ss).length==0 ){
			rss = '-';
		}
		return rss;
	}
	var list = progressList;
	var html='';
	var obj;
	var i=0, len=list.length;
	var JMART, JMART_VAl, JMDAT, CHECK, CHECK_VAL, SMAT1_ATX_VAL, SMAT2_ATX_VAL, SMAT3_ATX_VAL, SMAT4_ATX_VAL
	for(;i<len;i+=1){
		obj = list[i];
		
		obj.VBELN;// 0(판매 문서)
		obj.SEQNO;// 1(일련번호)
		obj.STDAT;// 2(정상수업일)
		obj.MATNR;// 3(학습단계)
		obj.JINDO;// 4(수업호수)
		obj.SMAT1;// 6(주학습교재)
		obj.SMAT2;// 7(부교재1)
		obj.SMAT3;// 8(부교재2)
		obj.SMAT4;// 9(부교재3)
		
		CHECK = obj.CHECK;// 5(표준진도 CHECK)
		JMDAT = obj.JMDAT;// 10(교재주문일)
		JMART = obj.JMART;// 11(주문유형)
		
		obj.MATNR_ATX;// 12(학습단계명)
		obj.JINDO_ATX;// 13(호수명)
		
		SMAT1_ATX_VAL = fn_replaceEmptyString( obj.SMAT1_ATX );// 14(주학습교재명)
		SMAT2_ATX_VAL = fn_replaceEmptyString( obj.SMAT2_ATX );// 15(부교재1명)
		SMAT3_ATX_VAL = fn_replaceEmptyString( obj.SMAT3_ATX );// 16(부교재2명)
		SMAT4_ATX_VAL = fn_replaceEmptyString( obj.SMAT4_ATX );// 17(부교재3명)
		CHECK_VAL = fn_replaceEmptyString( CHECK );
		
		switch( JMART ){
			case 'ZP03' :
				JMART_VAl = '정기';
			break;
			case 'ZP04' :
				JMART_VAl = '긴급';
			break;
			case ' ' :
				JMART_VAl = ' ';
			break;
		}
		
		
		html += '<li id="row'+i+'">';
		html += '<table class="recessMembers">';
		html += '<tbody>';
		html += '<tr>';
		html += '<td>';
		html += '<em>수업일</em>';
		html += '<span> '+obj.STDAT+' / </span>';
		html += '<em>단계</em>';
		html += '<span> '+obj.MATNR_ATX+'</span>';
		html += '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td>';
		html += '<em>표준주차</em>';
		html += '<span> '+obj.JINDO_ATX+' / </span>';
		html += '<em>표준</em>';
		html += '<span> '+CHECK_VAL+'</span>';
		html += '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td>';
		html += '<em>표준진도</em>';
		html += '<span> '
		html += SMAT1_ATX_VAL + ', '
		html += SMAT2_ATX_VAL + ', '
		html += SMAT3_ATX_VAL + ', '
		html += SMAT4_ATX_VAL
		html += '</span>';
		html += '</td>';
		html += '</tr>';
		html += '<tr>';
		html += '<td>';
		html += '<em>출고요청일 </em>';
		html += '<span> '+JMDAT+' '+JMART_VAl+'</span>';
		html += '</td>';
		html += '</tr>';
		html += '</tbody>';
		html += '</table>';
		if( $.trim(JMDAT).length==0 ){
			html += '<div class="positionWrap">';
			html += '<button type="button" onclick="modifyJindoHandle('+i+')" class="button-style s-size global">진도변경</button>';
			html += '</div>';
		}
		html += '</li>';
        
        
        
        
        //가장 큰 날짜 구하기.
        var dtTmp = new Date(obj.STDAT);     
        
        if(i==0)
        {
          diffDT = dtTmp;
        }else{
            if(diffDT < dtTmp )  diffDT = dtTmp;
        }

        
	}
    
    
    
    //수업 예정일
    //날짜 비교 값이 있으면 그거에 +7일 해서 출력. 
    //없으면 오늘 일에서 +7일 출력.
    //2013.04.13 NDH
    if(!!diffDT){
        var myDate = new Date(diffDT);
    }else{
        var myDate = new Date();
    }
    
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth + 7);
    var class_date = myDate.getFullYear() + "/" + (myDate.getMonth() +1 ) + "/" + myDate.getDate(); 
    $("#class_date").text(  class_date  );
    
    
    
	//
	$('#Contents').find('ul').append(html);
}

// 진도변경 클릭
var modifyJindoHandle = function(idx){
	
	var obj = progressList[idx];
	
	
	var param = {
		VBELN:obj.VBELN,
		NAME1: pageParams.NAME1,
		ZMAT1: pageParams.ZMAT1, 
		ZMAT1_TX: pageParams.ZMAT1_TX, 
		SEQNO:obj.SEQNO,
		STDAT:obj.STDAT,
		CHECK:obj.CHECK,
		MATNR:obj.MATNR,
		MATNR_ATX:obj.MATNR_ATX,
		JINDO_ATX:obj.JINDO_ATX,
		SMAT1_ATX:obj.SMAT1_ATX,
		SMAT2_ATX:obj.SMAT2_ATX,
		SMAT3_ATX:obj.SMAT3_ATX,
		SMAT4_ATX:obj.SMAT4_ATX
	};
	
	app_changePage( 'B010511.html', param, true );
	
}




/** ===============================================================================================================
 * Util Function
 *  */
// 외부링크
var gotoUrl = function(shipNo) {
	var url = "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1="+shipNo;
	app_goSite( url );
}

// 객체의 속성포함 여부 반환
var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

// 새로고침
var refresh = function(){
	window.location.href = 'B010510.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창 띄우기
var msgCall = function( $msg, $title, $fn ){
	app_alert( $msg, $title, $fn );
};





//////여기서 부터 진도 추가 기능 2013.04.12 NDH


// 구성시작
var init = function(){
	var $radio = $('input:radio[name=GUBUN_RADIO]');
	
	$radio.change(function(){
		GUBUN = $(this).val();
		var gb = (GUBUN=='N')? ' ' : GUBUN;
		//
		hoList = null;



		//
		if( GUBUN=='X' ){
            $("#std_jindo").show();
            $("#sujung_jindo").hide();	  

		}else{
            $("#std_jindo").hide();
            $("#sujung_jindo").show();
		}
      
		//
		levelLoad( gb );
	});
	
	$('#saveBtn').on( 'click', saveJindo );
	
	// 표준 여부 체크
	if( pageParams.CHECK=='X' ){ //X 표준진도, N 수정진도
		GUBUN = 'X';

	}else{
		GUBUN = 'N';

	}
    

    $('input:radio[value='+GUBUN+']').attr( 'checked', true );  
	$('input:radio[value='+GUBUN+']').trigger( 'change' );
	
	changeHeaderText();
}


// 단계로드
var levelLoad = function( gubun ){
	loader.load( {
        Function: "ZTBSD_GET_DANGE_BARO_2",
        Parameter: {
        	GUBUN: gubun
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
			if( !!data ){
				setLevel( data.T_EXPORTA );
			}else{
				msgCall( "단계를 불러오지 못했습니다." );
			}
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
}

// 단계 셀렉트 구성
var setLevel = function( levelData ){
    
    
	var $sel = $('#dange');
	$sel.off( 'change', levelChangeHandle );
	$sel.empty();
	var html='<option value="select0">바로셈 단계선택</option>';
	var i=0, len=levelData.length;
	var obj;
	var selTxt='';
	var MATNR, MAKTX;
	for( ;i<len;i+=1 ){

		obj = levelData[i];
		MATNR = obj.MATNR;  //단계번호
		MAKTX = obj.MAKTX;  //단계명
		html += '<option value="'+MATNR+'" >'+MAKTX+'</option>';
	}
	$sel.append(html);


	//
//	var currentMatnr = pageParams.MATNR;
	$sel.on( 'change', levelChangeHandle );
//	if( $('select#dange option[value='+currentMatnr+']').length>0 ){
//		$('select#dange option[value='+currentMatnr+']').attr('selected', 'selected');
//	}else{
//		if( $('select#dange option').length>1 ){
//			$($('select#dange option')[1]).attr('selected', 'selected');
//		}
//	}
	//
	if( $('select#dange option').is(':selected') && $('select#dange option:selected').val()!='select0' ){
		$sel.trigger( 'change' );
	}
}

// 단계셀렉트 변경시
var levelChangeHandle = function(){

	var selVal = $('select#dange option:selected').val();
	var text = $('select#dange option:selected').text();
	if( selVal!='select0' ){
		if( GUBUN=='X' ){
			currentIdx = -1;
			hoList = null;
			hosuLoad(selVal);
		}else{

			aidsLoad( selVal, '1', aidsMainCallback );
		}
	}else{
		text = '';
	}
	text += ' / '
	// 단계명이 길어 표시하지 않기로함 
	//$('#newLabel').text(text);
}




// 호수로드(표준진도 에서만 동작)
var hosuLoad = function( $level, $ho ){
	var param = {MATNR: $level};
	if( $ho==undefined ){
	}else{
		param = $.extend( param, {MATHO: $ho} )
	}

	
	loader.load( {
        Function: "ZTBSD_GM_001_019",
        Parameter: param,
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		hoList = data.T_EXPORTA;

        		makeTable( hoList, getStdRow, 'stdJindoSelectHandle', 'MAKTX' );
        	}else{
        		msgCall( "선택단계의 진도가 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "선택단계의 진도가 없습니다." );
        }
    });
}

// 교재로드
var aidsLoad = function( matnr, matgb, successFn ){
	loader.load( {
        Function: "ZTBSD_GET_TEACHING_AIDS",
        Parameter: {
        	VBELN: pageParams.VBELN,
        	MATNR: matnr,
        	MATGB: matgb
        },
        Success: successFn,
        Error: function($e){
        	msgCall( $e );
        }
    });
};


// 주교재 로드시 콜백함수
var aidsMainCallback = function( $data ){
    
	var data = JSON.parse( $data ).Parameter;
	if( !!data ){
		hoList = data.T_EXPORTA;
		makeTable( data.T_EXPORTA, getMainRow, 'mainSelectHandle', 'STMAT_TX' );
	}else{
		msgCall( "선택단계의 주 교재가 없습니다." );
	}
}

// 부교재 로드시 콜백함수
var aidsSubCallback = function( $data ){
	//
	var data = JSON.parse( $data ).Parameter;
	if( !!data ){
		hoList = data.T_EXPORTA;
		makeTable( data.T_EXPORTA, getSubRow, 'subSelectHandle', 'STMAT_TX', 1 );
	}else{
		msgCall( "선택단계의 주 교재가 없습니다." );
	}
}




// 테이블 구성
var makeTable = function( data, rowFunc, clickHandleNm, nameKey, startN ){

	if( GUBUN=='X' ){ //X 표준진도, N 수정진도
        var $tbody = $('#std_jucha');
	}else{
        if(startN==undefined){
            var $tbody = $("#smat1");
           	var html='<option value="select0">주교재 선택</option>';
        }else{
            var $tbody = $('#smat2Select');
        }
	}



	$tbody.empty();
	//
	if( !!rowFunc ){

		var list=data;
		var obj;
		//var html='';
		var i=0,len=list.length;
		if(startN==undefined){
			i=0;
		}else{
			i=startN;
		}
		for(;i<len;i+=1){
			obj = list[i];
			html += rowFunc( obj[nameKey], i, clickHandleNm )
			
		}
		$tbody.append(html);


	}
}

// 표준진도 테이블 로우
var getStdRow = function( nm, idx, fn ){
    var html='';
	html += '<option value="'+idx+'"  >'+nm+'</option>';
	return html;
}

// 주교재 테이블 로우
var getMainRow = function( nm, idx, fn ){
    var html='';
	html += '<option value="'+idx+'"  >'+nm+'</option>';
	return html;
}

// 부교재 테이블 로우
var getSubRow = function( nm, idx, fn, val ){
    var html='';
	html += '<option name="chk'+idx+'" id="chk'+idx+'"    touchstart="'+fn+'('+idx+')"  value="'+idx+'"  >'+nm+'</option>';
	return html;
}

// 표준진도 호수 선택시 
var stdJindoSelectHandle = function( idx ){
    
	currentIdx = idx;
	if( !!hoList ){
		/* 단계명이 길어 표시하지 않기로함
		var obj = hoList[currentIdx];
		obj.MATNR;//번호
		var text = $('#newLabel').text().split( '/' )[0];
		text += ' / '
		text += obj.MAKTX;
		$('#newLabel').text(text);
		*/
	}
}

// 주교재 선택시
var mainSelectHandle = function( idx ){

	currentIdx = idx;
	if( !!hoList ){
		var obj = hoList[currentIdx];
		//obj.STMAT;//번호
		/* 단계명이 길어 표시하지 않기로함.
		var text = $('#newLabel').text().split( '/' )[0];
		text += ' / '
		text += obj.STMAT_TX;
		$('#newLabel').text(text);
		//*/

        var selVal = $('select#dange option:selected').val();
		stmatList[0] = obj;
    	aidsLoad( selVal, '2', aidsSubCallback );
	}      
}

// 부교재 선택시
var subSelectHandle = function( idx ){


    $("input:text").text("").val("");

    $("#smat2Select > option:selected").each(function (index){
        $("input:text").eq(index).val( $(this).text() );    
        if(index > 2 ){
    		msgCall( '부교재는 최대 3개까지 선택가능합니다.' );
            $("input:text").text("").val("");
            return false;
        }


        
    });

		
}



// 진도 저장
var saveJindo = function(){
    

    
	// 날짜체크
//	var today=new Date();
//	var tm_year = today.getFullYear();
//	var tm_month = today.getMonth()+1;
//	var tm_day = today.getDate();
//	var tm_hour = today.getHours();
//	var tm_min = today.getMinutes();
//	var tm_sec = today.getSeconds();
//	
//	if(tm_month < 10) tm_month = '0' + tm_month;
//	if(tm_day < 10) tm_day = '0' + tm_day;
//	if(tm_hour < 10) tm_hour = '0' + tm_hour;
//	if(tm_min < 10) tm_min = '0' + tm_min;
//	
//	var totDate = tm_year + "" + tm_month + "" + tm_day;
//	var totTime = tm_hour + "" + tm_min;
//	
//	
//	var STDAT = pageParams.STDAT;
//	var stoday = STDAT.replace(/[^0-9]/g, '');
//	
//	if(stoday == totDate && 1330 <= totTime){
//    	msgCall("수업예정일이 오늘인 진도는 당일 1시 30분부터은 진도추가가 불가합니다.");
//    	return false;
//    }


    
    var selVal = $('select option:selected').val();
	if( selVal=='select0' ){
		msgCall( '단계가 선택되지 않았습니다.' );
		return false;
	}
    var saveSmat1 = $('select#smat1  option:selected').val();
	if( saveSmat1=='select0' ){
		msgCall( '주교재가 선택되지 않았습니다.' );
		return false;
	}
  

	var param = {
		VBELN: pageParams.VBELN,
	};

	var obj;
	if( GUBUN=='X' ){ //표준진도

		currentIdx = Number( $('select#std_jucha  option:selected').val() );
		if( !!hoList && currentIdx>-1 ){
			obj = hoList[currentIdx];
			param = $.extend( param, {
				CHECK: GUBUN,
				MATNR: selVal,
				JINDO: obj.MATNR,
				SMAT1: ' ',
				SMAT2: ' ',
				SMAT3: ' ',
				SMAT4: ' '
			} );
		}else{
			msgCall('수정호수를 선택해 주십시오.');
			return false;
		}

//
//
//        var saveStd_jucha = $('select#std_jucha  option:selected').val();
//        alert(saveStd_jucha);
//			param = $.extend( param, {
//				CHECK: GUBUN,
//				MATNR: saveDange,
//				JINDO: saveStd_jucha,
//				SMAT1: ' ',
//				SMAT2: ' ',
//				SMAT3: ' ',
//				SMAT4: ' '
//			});

	}else{
		if( !!stmatList[0] ){
		}else{
			msgCall('주교재를 선택해 주십시오.');
			return false;
		}
		
//		if($('input:checkbox:checked').length==0){
//			msgCall('부교는 1개 이상 선택해야 합니다.');
//			return false;
//		}

		var i=0, len=4, tmpList=[];
		for( ;i<len;i+=1 ){
			tmpList[i] = ' ';
		}
		tmpList[0] = stmatList[0].STMAT;

                        
        $("#smat2Select > option:selected").each(function (index){
			tmpList[index] = hoList[index].STMAT; 
        });        
        
                                        
		
		param = $.extend( param, {
			CHECK: ' ',
			MATNR: selVal,
			JINDO: ' ',
			SMAT1: tmpList[0],
			SMAT2: tmpList[1],
			SMAT3: tmpList[2],
			SMAT4: tmpList[3]
		} );


                	
        
	}


		addJindo(param);

}

//ZTBSD_SAVE_TEACHING_AIDS
/*

교재 추가

VBELN
MATNR
JINDO
CHECK
SMAT1
SMAT2
SMAT3
SMAT4
*/
var addJindo = function( param ){
	loader.load( {
        Function: "ZTBSD_SAVE_TEACHING_AIDS",
        Parameter: {S_IMPORTA:param},
        Success: function($data){
        	msgCall( '변경완료', '', 'saveEndFn' );
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
}



// 변경후 확인 버튼 클릭시
var saveEndFn = function(){
	//app_goCancel();
    refresh();
}

