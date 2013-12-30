/**
 * 진도 검색
 */

/*
 var param = {
		VBELN:obj.VBELN,
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
 */

var pageParams;
var GUBUN = '';
var IS_STD = true;
var stmatList=[];
var hoList;
var currentIdx = -1;
var currentSubIdx = [];
var selectCnt=0;


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
	init();
};

// 헤더변경
var changeHeaderText = function(){
	var text = pageParams.MATNR_ATX;
	if( GUBUN=='X' ){
		text += ' / ' + pageParams.JINDO_ATX;
	}else{
		text += ' / ' + getSmatTxt( pageParams.SMAT1_ATX );
		text += ', ' + getSmatTxt( pageParams.SMAT2_ATX );
		text += ', ' + getSmatTxt( pageParams.SMAT3_ATX );
		text += ', ' + getSmatTxt( pageParams.SMAT4_ATX );
	}
	$('#Header').find('h1').text(pageParams.ZMAT1_TX);
}

//빈데이터 문자열 변경
var getSmatTxt = function( txt ){
	var tt = ''
	if( $.trim(txt).length==0 ){
		tt = '-'
	}else{
		tt = txt;
	}
	return tt;
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

// 호수로드
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

// 구성시작
var init = function(){
	var $radio = $('input:radio[name=GUBUN_RADIO]');
	
	$radio.change(function(){
		GUBUN = $(this).val();
		var gb = (GUBUN=='N')? ' ' : GUBUN;
		//
		hoList = null;
		stmatList = [];
		selectCnt=0;
		resetBody();
		//
		if( GUBUN=='X' ){
			$('#FIND_N').addClass('none');
			$('#FIND_X').removeClass('none');
			$('#numSearch').width('230px');
			$('#numSearch').removeAttr('disabled');
			$('thead>tr>th:first').text('단계 및 호수');
		}else{
			$('#FIND_N').removeClass('none');
			$('#FIND_X').addClass('none');
			$('#numSearch').width('286px');
			$('#numSearch').attr('disabled', 'disabled');
			$('thead>tr>th:first').text('주교재 코드명');
		}
		//
		levelLoad( gb );
	});
	
	$('#FIND_X').find('button').on( 'click', findStdho );
	$('#FIND_N').find('#mainBtn').on( 'click', findMainAids );
	$('#FIND_N').find('#subBtn').on( 'click', findSubAids );
	$('#saveBtn').on( 'click', saveJindo );
	
	// 표준 여부 체크
	if( pageParams.CHECK=='X' ){
		GUBUN = 'X';
	}else{
		GUBUN = 'N';
	}
	$('input:radio[value='+GUBUN+']').attr( 'checked', true );
	$('input:radio[value='+GUBUN+']').trigger( 'change' );
	
	changeHeaderText();
}

// 리스트 지움
var resetBody = function(){
	$('#numSearch').val('');
	$('tbody').empty();
}


// 단계 셀렉트 구성
var setLevel = function( levelData ){
	var $sel = $('select');
	$sel.off( 'change', levelChangeHandle );
	$sel.empty();
	var html='<option value="select0">바로셈 단계선택</option>';
	var i=0, len=levelData.length;
	var obj;
	var selTxt='';
	var MATNR, MAKTX;
	for( ;i<len;i+=1 ){
		obj = levelData[i];
		MATNR = obj.MATNR;
		MAKTX = obj.MAKTX;
		html += '<option value="'+MATNR+'" >'+MAKTX+'</option>';
	}
	$sel.append(html);
	//
	var currentMatnr = pageParams.MATNR;
	$sel.on( 'change', levelChangeHandle );
	if( $('select option[value='+currentMatnr+']').length>0 ){
		$('select option[value='+currentMatnr+']').attr('selected', 'selected');
	}else{
		if( $('select option').length>1 ){
			$($('select option')[1]).attr('selected', 'selected');
		}
	}
	//
	if( $('select option').is(':selected') && $('select option:selected').val()!='select0' ){
		$sel.trigger( 'change' );
	}
}

// 단계셀렉트 변경시
var levelChangeHandle = function(){
	resetBody();
	var selVal = $('select option:selected').val();
	var text = $('select option:selected').text();
	if( selVal!='select0' ){
		if( GUBUN=='X' ){
			currentIdx = -1;
			hoList = null;
			hosuLoad(selVal);
		}else{
			stmatList = [];
			selectCnt=0;
			aidsLoad( selVal, '1', aidsMainCallback );
		}
	}else{
		text = '';
	}
	text += ' / '
	// 단계명이 길어 표시하지 않기로함 
	//$('#newLabel').text(text);
}

// 테이블 구성
var makeTable = function( data, rowFunc, clickHandleNm, nameKey, startN ){
	var $tbody = $('tbody');
	$tbody.empty();
	//
	if( !!rowFunc ){
		var list=data;
		var obj;
		var html='';
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
	html += '<tr>';
	html += '<td>'+nm+'</td>';
	html += '<td><input type="radio" name="hoRadio" id="hoRadio'+idx+'" value="'+idx+'" onchange="'+fn+'('+idx+')" ></td>';
	html += '</tr>';
	return html;
}

// 주교재 테이블 로우
var getMainRow = function( nm, idx, fn ){
	var html='';
	html += '<tr>';
	html += '<td>'+nm+'</td>';
	html += '<td><button type="button" onclick="'+fn+'('+idx+')" class="button-style s-size global">선택</button></td>';
	html += '</tr>';
	return html;
}

// 부교재 테이블 로우
var getSubRow = function( nm, idx, fn, val ){
	var html='';
	html += '<tr>';
	html += '<td>'+nm+'</td>';
	html += '<td>';
	html += '<label for="chk'+idx+'">';
	html += '<input type="checkbox" name="chk'+idx+'" id="chk'+idx+'" onclick="'+fn+'('+idx+')" value="'+val+'" class="" />';
	html += '</label>';
	html += '</td>';
	html += '</tr>';
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
		obj.STMAT;//번호
		/* 단계명이 길어 표시하지 않기로함.
		var text = $('#newLabel').text().split( '/' )[0];
		text += ' / '
		text += obj.STMAT_TX;
		$('#newLabel').text(text);
		//*/
		$('#numSearch').val(obj.STMAT_TX);
		stmatList[0] = obj;
	}
}

// 부교재 선택시
var subSelectHandle = function( idx ){
	if( $('#chk'+idx).is(':checked') ){
		selectCnt ++;
		if( selectCnt>3 ){
			$('#chk'+idx).attr('checked', false);
			selectCnt = 3;
			msgCall( '부교재는 최대 3개까지 선택가능합니다.' );
		}
	}else{
		selectCnt --;
	}
}

// 표준진도 검색
var findStdho = function(){
	var selVal = $('select option:selected').val();
	if( selVal=='select0' ){
		msgCall( '단계가 선택되지 않았습니다.' );
		return false;
	}
	
	var inputVal = $('#numSearch').val();
	if($.trim(inputVal).length==0){
		msgCall( '검색어가 입력되지 않았습니다.' );
		return false;
	}
	hosuLoad( selVal, inputVal );
}

// 주교재검색
var findMainAids = function(){
	
	stmatList = [];
	$('#numSearch').val('');
	
	var selVal = $('select option:selected').val();
	if( selVal=='select0' ){
		msgCall( '단계가 선택되지 않았습니다.' );
		return false;
	}
	selectCnt=0;
	aidsLoad( selVal, '1', aidsMainCallback );
}

// 부교재 검색
var findSubAids = function(){
	var selVal = $('select option:selected').val();
	if( selVal=='select0' ){
		msgCall( '단계가 선택되지 않았습니다.' );
		return false;
	}
	
	if( !!stmatList[0] ){
	}else{
		msgCall('주교재를 선택해 주십시오.');
		return false;
	}
	selectCnt=0;
	aidsLoad( selVal, '2', aidsSubCallback );
}

// 진도 저장
var saveJindo = function(){
	
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
	
	
	var STDAT = pageParams.STDAT;
	var stoday = STDAT.replace(/[^0-9]/g, '');
	
	if(stoday == totDate && 1330 <= totTime){
    	msgCall("수업예정일이 오늘인 진도는 당일 1시 30분부터은 진도추가가 불가합니다.");
    	return false;
    }
    
    
    var selVal = $('select option:selected').val();
	if( selVal=='select0' ){
		msgCall( '단계가 선택되지 않았습니다.' );
		return false;
	}
	
	var param = {
		VBELN: pageParams.VBELN,
	};
	
	var obj;
	if( GUBUN=='X' ){
		currentIdx = Number( $('input:radio[name=hoRadio]:checked').val() );
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
	}else{
		if( !!stmatList[0] ){
		}else{
			msgCall('주교재를 선택해 주십시오.');
			return false;
		}
		
		if($('input:checkbox:checked').length==0){
			msgCall('부교는 1개 이상 선택해야 합니다.');
			return false;
		}
		
		
		var i=0, len=4, tmpList=[];
		for( ;i<len;i+=1 ){
			tmpList[i] = ' ';
		}
		tmpList[0] = stmatList[0].STMAT;
		subCnt=0;
		$('input:checkbox:checked').each(function(){
			var index = Number($(this).attr('id').replace(/[^0-9]/g, ''));
			subCnt++;
			tmpList[subCnt] = hoList[index].STMAT;
		})
		
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
	
	if( $.trim( pageParams.SEQNO ).length==0 ){
		addJindo(param);
	}else{
		param = $.extend( param, {SEQNO: pageParams.SEQNO} );
		changeJindo(param);
	}
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

//ZTBSD_CHANGE_PLAN_PROGRESS_B2
/*

	교재 변경

VBELN
MATNR
JINDO
CHECK
SMAT1
SMAT2
SMAT3
SMAT4
*/

var changeJindo = function( param ){
	loader.load( {
        Function: "ZTBSD_CHANGE_PLAN_PROGRESS_B2",
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
	app_goCancel();
}


/** ===============================================================================================================
 * Util Function
 *  */

// 새로고침
var refresh = function(){
	window.location.href = 'B010511.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창 띄우기
var msgCall = function( $msg, $title, $fn ){
	app_alert( $msg, $title, $fn );
};
