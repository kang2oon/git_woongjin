/**
 * 진도변경
 */

var pageParams;
var progressList;
var progressData;
var findHoList;


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
	changeHeaderText();
	setPlan();
};


// 헤더 텍스트 변경
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
        Function: "ZTBSD_CHANGE_PLAN_PROGRESS",
        Parameter: {
        	VBELN: pageParams.VBELN,
        	GUBUN: 'X'
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		progressList = data.T_EXPORTA;
        		progressData = {
        			REQGB: data.REQGB,
        			MTYPE: data.MTYPE,
        			ZZVIG: data.ZZVIG,
        		};
        		//
        		makeJindoTabel();
        	}else{
        		msgCall( "조회내용이 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
};

// 저장 / 변경
var saveAndChange = function( T_IMPORTA ){
	var param = {
		CHK_S: 'X',
		T_IMPORTA: T_IMPORTA
	};
	//
	loader.load( {
        Function: "ZTBSD_CHANGE_PROGRESS",
        Parameter: param,
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		msgCall("진도수정이 정상처리 되었습니다.");
        		refresh();
        	}
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
};



// 진도 테이블 구성
var makeJindoTabel = function(){
	var date = new Date();
	var yy = date.getFullYear();
	var mm = date.getMonth()+1;
	var dd = date.getDate();
	var IS_BOOKS = false;
	var fObj = {
		'000000000000001050' : '',
		'000000000000001069' : '',
		'000000000000001084' : ''
	};
	
	var html = '', tdHtml='';
	var obj;
	var searchData;
	var bn, dt, tp, fn, rg, dateArr, d_yy, d_mm, totMon;
	var MTYPE = progressData.MTYPE;
	var OLD_JINDO, OLD_MATNR;
	var ZMART, RECGB, TRANGB, ZMAT1;
	var i=0,len = progressList.length;
	
	if( !!pageParams.jindoSearch ){
		searchData = pageParams.jindoSearch.data;
		if( !!searchData ){
			OLD_MATNR = searchData.OLD_MATNR;
			OLD_JINDO = searchData.OLD_JINDO;
		}
	}
	
	for(;i<len;i+=1){
		obj = progressList[i];
		if( false ){
			bn = '저장';
			fn = 'saveJindoHandle';
		}else{
			bn = '수정';
			fn = 'modifyJindoHandle';
		}
		dt = obj.STDAT;
		if( dt.length>8 ){
			dateArr = dt.split( '/' );
			d_yy = dateArr[0];
			d_mm = dateArr[1];
			totMon =  ((Number(d_yy) - Number(yy)) * 12) + ( Number(d_mm) - Number(mm) );
		}
		 
		ZMAT1 = obj.ZMAT1
		ZMART = obj.JMART;
		RECGB = obj.RECGB;
		TRANGB = obj.TRANGB;
		
		if (ZMART=="ZP03") {
			tp = "정기";
		}else if (ZMART=="ZP04") {
			tp = "긴급";
		}
		
		rg='';
		if (RECGB=="X") {
			rg = "확";
		}else {
			rg = "예";
		}
		
		
		if ( ( hasCode( fObj, ZMAT1 ) && dd>10 ) || ( hasCode( fObj, ZMAT1 ) && (totMon < 3) ) ){
			IS_BOOKS = true;
		}
		
		if(ZMART=="ZP03"||ZMART=="ZP04") {
			if ((TRANGB == "X") && (MTYPE=="040"||MTYPE=="041")) {
				tdHtml = '<label><font color="blue" onclick="gotoUrl('+obj.REGINO+')"><u>'+tp+'</u></font></label>';
			}else {
				tdHtml = tp;
			}
		}else if(IS_BOOKS) {
			tdHtml = '';
		}else {
			tdHtml = '<button type="button" onclick="saveJindoHandle('+i+')" class="button-style s-size global">저장</button>';
		}
		
		//
		html += '<tr id="row'+i+'">';
		html += '<td>';
		html += '<div class="stepNum">';
		html += '<ul>';
		html += '<li>'+ obj.JINDO_TX + '</li>';
		if( OLD_JINDO==obj.JINDO && OLD_MATNR==obj.MATNR ){
			html += '<li class="on">'+ searchData.JINDO_TX +'</li>';
		}
		html += '</ul>';
		html += '<div class="stepButtonWrap">'
		html += '<button type="button" onclick="modifyJindoHandle('+i+')" class="button-style s-size global">변경</button>'
		html += '</div>'
		html += '</div>';
		html += '</td>';
		html += '<td id="date">';
		html += '<span class="date_txt">'+ dt + ' ' + rg +' </span>';
		html += tdHtml;
		html += '</td>';
		html += '</tr>';
	}
	$('#page').find('tbody').html( html );
}

// 사용안함.
var getLi = function(idx){
	var html = '';
	var i=0;len=1;
	for(;i<len;i+=1){
		html += '<li class="on">'+i+'</li>';
	}
	return html;
}


/*

진도 저장


VBELN(판매 문서)
SEQNO(일련번호)
POSNR(판매 문서 품목)
MATNR(자재 번호)
JINDO(수업호수)
RECGB(진도구분(X:확정진도 / SPACE:예정진도))
CHGGB(처리구분(X:SAP / SPACE:WEB))
STDAT(정상수업일)
*/ 
var saveJindoHandle = function(idx){
	var currentIdx = Number(idx);
	var $tbody = $('#page').find('tbody');
	var $el = $('#row'+idx);
	
	if( $el.find('li.on').length>0 ){
		var srhObj = pageParams.jindoSearch.data;
		var VBELN, SEQNO, POSNR, MATNR, JINDO, RECGB, CHGGB, STDAT;
		var listObj, index;
		var IS_MODIFY = false;
		// 날짜체크
		var today=new Date();
		var tm_year = today.getFullYear();
		var tm_month = today.getMonth()+1;
		var tm_day = today.getDate();
		var tm_hour = today.getHours();
		var tm_min = today.getMinutes();
		var tm_sec = today.getSeconds();
		
		if(tm_month < 10) tm_month = '0' + tm_month;
		if(tm_day < 10) tm_day = '0' + tm_day;
		if(tm_hour < 10) tm_hour = '0' + tm_hour;
		if(tm_min < 10) tm_min = '0' + tm_min;
		
		var totDate = tm_year + "" + tm_month + "" + tm_day;
		var totTime = tm_hour + "" + tm_min;
		
		
		STDAT = progressList[idx].STDAT;
		var stoday = STDAT.replace(/[^0-9]/g, '');
		
		if(stoday == totDate && 1330 <= totTime){
        	msgCall("수업예정일이 오늘인 진도는 당일 1시 30분부터은 진도추가가 불가합니다.");
        	return false;
        }
        
        // 입력
        var inputArr = [];
        $tbody.find('tr').each(function(){
        	index = Number( $(this).attr('id').replace(/[^0-9]/g, '') );
        	listObj = progressList[index];
        	
        	VBELN = listObj.VBELN;
			SEQNO = listObj.SEQNO;
			POSNR = listObj.POSNR;
			RECGB = listObj.RECGB;
			CHGGB = 'X';
			STDAT = listObj.STDAT.replace(/[^0-9]/g, '');
        	//
        	IS_MODIFY = false;
        	if ( RECGB=="X") {
	            //확정 진도인 경우
	            if( currentIdx == index ){
	            	IS_MODIFY = true;
	            	MATNR = srhObj.MATNR;
					JINDO = String(srhObj.JINDO);
	            }
	        } else {
	            //예정진도인 경우
	            if ( currentIdx == index) {
	                //변경번호인 경우
	                IS_MODIFY = true;
	                MATNR = srhObj.MATNR;
					JINDO = String(srhObj.JINDO);
	            } else if ( index < currentIdx ) {
	                //변경번호보다 작으면 변경작업에 포함시키고 예정 원단계와 호수를 변경된 값으로 설정한다.
	                IS_MODIFY = true;
	                MATNR = listObj.MATNR;
					JINDO = String(listObj.JINDO);
	            }
	        }
        	//
        	if( IS_MODIFY ){
        		inputArr.push({
        			VBELN: VBELN,
        			SEQNO: SEQNO,
        			POSNR: POSNR,
        			MATNR: MATNR,
        			JINDO: JINDO,
        			RECGB: RECGB,
        			CHGGB: CHGGB,
        			STDAT: STDAT
        		})
        	};
        });
        //
		saveAndChange( inputArr );
	}else{
		msgCall('수정호수를 선택해 주십시오.');
	}
}

// 진도 수정 
var modifyJindoHandle = function(idx){
	var obj = progressList[idx];
	
	var param = {
		OLD_MATNR:obj.MATNR,
		OLD_MATNR_TX:obj.MATNR_TX,
		OLD_JINDO:obj.JINDO,
		OLD_JINDO_TX:obj.JINDO_TX
	};
	pageParams.jindoSearch = {};
	pageParams.jindoSearch.returnUrl = 'B010500.html';
	pageParams.jindoSearch.data = param;
	
	app_changePage( 'B010501.html', pageParams, false );
}



/** ===============================================================================================================
 * Util Function
 *  */

// url 이동
var gotoUrl = function(shipNo) {
	var url = "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1="+shipNo;
	app_goSite( url );
}

// 객체가 속성을 가지고 있는지 확인후 true, false 반환
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
	window.location.href = 'B010500.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창 
var msgCall = function( $msg ){
	app_alert( $msg );
};


