/**
 * 진도 검색
 */

var pageParams;
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
	
	levelLoad();
};

// 헤더변경
var changeHeaderText = function(){
	var obj = pageParams.jindoSearch.data;
	var text = obj.OLD_MATNR_TX + ' / ' + obj.OLD_JINDO_TX;
	$('#Header').find('h1').text(text);
}

// 단계 로드
var levelLoad = function(){
	loader.load( {
        Function: "ZTBSD_GM_001_018",
        Parameter: {
        	ZMAT1: pageParams.ZMAT1
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		init(data.T_EXPORTA);
        	}else{
        		msgCall( "선택과목의 단계가 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "과목데이터가 없습니다." );
        }
    });
};

// 호수 로드
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
        		findHoList = data.T_EXPORTA;
        		makeFindHoList();
        	}else{
        		msgCall( "선택단계의 진도가 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "선택단계의 진도가 없습니다." );
        }
    });
};





// 구성시작
var init = function( levelList ){
	if( levelList.length>0 ){
		setLevelFrm(levelList);
	}
	
	var $sel = $('#pop').find('#FIND_LEVEL');
	$sel.bind( 'change', findChangeHandle );
	
	var $srhBtn = $('#pop').find('button:submit');
	$srhBtn.bind( 'click', findClickHandle );
	
}

// 이벤트 제거
var removeEvent = function(){
	var $sel = $('#pop').find('#FIND_LEVEL');
	$sel.unbind( 'change', findChangeHandle );
	
	var $srhBtn = $('#pop').find('button:submit');
	$srhBtn.unbind( 'click', findClickHandle );
}

// 단계 변경시
var findChangeHandle = function(){
	var val = $('#pop').find('#FIND_LEVEL option:selected').val();
	hosuLoad( val );
}

// 검색 클릭시
var findClickHandle = function(){
	var val = $('#pop').find('#FIND_LEVEL option:selected').val();
	
	if( !$('#pop').find('#FIND_LEVEL option').is(':selected') || $('#pop').find('#FIND_LEVEL option:selected').val()=='select0' ){
		msgCall('단계가 선택되지 않았습니다.');
		return false;
	}
	
	var text = '0' + $('#pop').find('input:text').val();
	
	if( $.trim(text).length==0 || text=='호수검색' ){
		msgCall('검색어가 올바르지 않습니다');
		return false;
	}
	
	hosuLoad(val, text);
}

// 단계 셀렉트 구성
var setLevelFrm = function( levelList ){
	var $el = $('#pop').find('#FIND_LEVEL');
	$el.empty();
	var html='<option value="select0">단계</option>'
	var currentMatnr = pageParams.jindoSearch.data.OLD_MATNR;
	var selTxt = '';
	var selected = false;
	var obj;
	var i=0,len=levelList.length;
	for(;i<len;i+=1){
		obj = levelList[i];
		if( obj.MATNR==currentMatnr ){
			selected = true;
			selTxt = 'selected="selected"';
		}else{
			selTxt = '';
		}
		html+='<option value="'+obj.MATNR+'"'+selTxt+'>'+obj.MAKTX+'</option>'
	}
	$el.append(html);
	//
	if( selected ){
		hosuLoad( currentMatnr );
	}
}

// 호수 리스트 구성
var makeFindHoList = function(){
	var $el = $('#pop').find('tbody');
	$el.empty();
	var html='', obj;
	var val;
	var i=0, len=findHoList.length;
	for( ;i<len;i+=1 ){
		obj = findHoList[i];
		val=obj.MATNR;
		html += '<tr id="ho_'+i+'" >';
    	html += '<td id="name">'+obj.MAKTX+'</td>';
    	html += '<td id="value"><button type="button" class="button-style s-size global" onclick="selectJindo(' + String(val) + ',' + i +')" >선택</button></td>';
    	html += '</tr>';
	}
	$el.append(html);
}

// 진도 선택시
var selectJindo = function( data, idx ){
	
	var $el = $('#pop').find('#ho_'+idx);
	
	var MATNR = $('#pop').find('#FIND_LEVEL option:selected').val();
	var MATNR_TX = $('#pop').find('#FIND_LEVEL option:selected').text();
	var JINDO = findHoList[idx].MATNR;
	var JINDO_TX = $el.find('#name').text();
	
	var obj = pageParams.jindoSearch.data;
	var OLD_MATNR = obj.OLD_MATNR;
	var OLD_JINDO = obj.OLD_JINDO;
	
	if( OLD_MATNR==MATNR && OLD_JINDO==JINDO ){
		msgCall( '현재 진도와 수정 할 진도가 같습니다' );
	}else{
		var param = $.extend( obj, {
			MATNR: MATNR,
			MATNR_TX: MATNR_TX,
			JINDO: JINDO,
			JINDO_TX: JINDO_TX
		} );
		//
		pageParams.jindoSearch.data = param;
		app_changePage( pageParams.jindoSearch.returnUrl, pageParams, true );
	}
	
	
}





/** ===============================================================================================================
 * Util Function
 *  */

// 새로고침
var refresh = function(){
	window.location.href = 'B010511.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창 열기
var msgCall = function( $msg ){
	app_alert( $msg );
};
