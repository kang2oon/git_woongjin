/**
 * 
 * */

var pageParams;
var forcastList;
var deleteIdx;

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
	/*
	$('h1').click(function(){
		refresh();
	});
	//*/
	app_changeTitle( '휴회 예상 리스트' );
	//app_endLoading();
	loadData();
};



/** ===============================================================================================================
 * 데이터 로드
 *  */

var loadData = function(){
	forcastListLoad();
}

// 
var forcastListLoad = function(  ){
	// app_startLoading();
	loader.load( {
        Function: "ZTBSD_GM_208_001",
        Parameter: {},
        Success: function($data){
    		//app_endLoading();
    		$data = $data.replace( /\t/g, "" );
    		$data = $data.replace( /\n/g, "<br>" );
    		$data = $data.replace( /\r/g, "<br>" );
    		$data = $data.replace( /\n\r/g, "<br>" );
    		
    		var reg = /(([\:](?=\"))[^,|}]+[,|}])/g;
			$data = $data.replace(reg, function($1){
				var pre = $1.slice( 0,2 );
				var end = $1.slice( $1.length-2, $1.length );
				return pre + $1.replace( /(\:\")|(\"\,)|(\"\})/g, "" ).replace(/\"/g, "&quot;") + end;
			});
    		
        	var data = JSON.parse( $data ).Parameter;
        	//trace(data);
        	if( !!data ){
        		forcastList = data.T_EXPORTA;
        		makeList();
        	}else{
        		msgCall( "조회내용이 없습니다." );
        	}
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( $e );
        }
    });
};

var cancelRequestOut = function( param ){
	//app_startLoading();
	loader.load( {
        Function: "ZTBSD_GM_028_002",
        Parameter: param,
        Success: function($data){
    		//app_endLoading();
        	msgCall( '취소되었습니다.', '', 'cancelComplete' );
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( $e );
        }
    });
}

var cancelComplete = function(){
	refresh();
}

var addNoneMsg = function(){
}

var init = function(){
	$('.performing').find('button').click(function(){
		goRegistOutMember();
	});
}

var goRegistOutMember = function(){
	app_changePage( 'B010601.html', "", true );
}

var makeList = function(){
	var obj;
	var list = forcastList;
	var i=0, len=list.length;
	
	var btn1;
	var btn2;
	var btn3;
	var btn4;
	
	var html = '';
	if( len<1 ){
		html = '<li><div class="center" style="padding:15px;">휴회예상리스트가 없습니다.</div></li>';
	}else{
		for( ;i<len;i+=1 ){
			obj = forcastList[i];
			html+='<li id="list_'+i+'">';
			html+='<table class="recessMembers">';
			html+='<tbody>';
			html+='<tr>';
			html+='<td>';
			html+='<div class="forecastMember">';
			html+='<div class="name"><em>'+obj.KUNWE_TX +'('+obj.KATR1_TX+')'+'</em></div>';
			html+='<span>';
			
			btn1 = '<button type="button" class="button-style s-size global" onclick="requestCancelHandle('+i+')">요청취소</button>';
			btn2 = '<button type="button" class="button-style s-size global" onclick="requestHandle('+i+')">휴회요청</button>';
			btn3 = '<button type="button" class="button-style s-size global" onclick="deleteHandle('+i+')">삭제</button>';
			btn4 = '<button type="button" class="button-style s-size global" onclick="editHandle('+i+')">수정</button>';
			
			if( obj.STATS=='1' ){
			}else{
				btn1 = '';
			}
			
			if( obj.STATS==' ' || obj.STATS=='3' ){
				
				btn2 = '<button type="button" class="button-style s-size global" onclick="requestHandle('+i+')">휴회요청</button>';
				btn3 = '<button type="button" class="button-style s-size global" onclick="deleteHandle('+i+')">삭제</button>';
				btn4 = '<button type="button" class="button-style s-size global" onclick="editHandle('+i+')">수정</button>';
			
				if( obj.ZMAT1=="000000000000016546" || obj.ZMAT1=="000000000000016547" ){
					btn2 = '';
					btn3 = '';
				}else{
					btn2 = '<button type="button" class="button-style s-size global" onclick="requestHandle('+i+')">휴회요청</button>';
					btn3 = '<button type="button" class="button-style s-size global" onclick="deleteHandle('+i+')">삭제</button>';
				}
			}else{
				btn2 = '';
				btn3 = '';
				btn4 = '';
			}
			
			html+=btn1;
			html+=btn2;
			html+=btn3;
			html+=btn4;
			
			html+='</span>';
			html+='</div>';
			html+='</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>';
			html+='<em>등록일</em>';
			html+='<span> '+obj.ERDAT+'</span>';
			html+='</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>';
			html+='<em>최종진도</em>';
			html+='<span> '+ obj.JINDO_TX +'</span>';
			html+='</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>';
			html+='<em>휴회</em>';
			html+='<span> '+obj.STATS_TX+' / </span>';
			html+='<em>예상월</em>';
			html+='<span> '+obj.SPMON+' / </span>';
			html+='<em>가능성</em>';
			html+='<span> '+Number(obj.PERCT)+'% </span>';
			html+='</td>';
			html+='</tr>';
			html+='</tbody>';
			html+='</table>';
			html+='</li>';
		}
	}
	$('ul.memListline').html(html);
	
	init();
}

var requestHandle = function(idx){
	var obj = forcastList[idx];
	app_changePage( 'B010603.html', obj, true );
}

var requestCancelHandle = function(idx){
	var obj = forcastList[idx];
	var ABRUD_LIST = obj.ABRUD_H.split('/');
	ABRUD = ABRUD_LIST[0]+ABRUD_LIST[1]+ABRUD_LIST[2];
	//
	var param = {
		VBELN: obj.VBELN,
		REQGB: '21',
		ABRUD: ABRUD
	}
	cancelRequestOut(param);
}

var deleteHandle = function(idx){
	deleteIdx = idx;
	app_showConfirm( '선택한 데이터를 삭제 하시겠습니까', '', 'deleteOk', 'deleteCancel' )
}

var deleteOk = function(){
	var obj = forcastList[deleteIdx];
	var param = {
		GUBUN: 'D',
		VBELN: obj.VBELN,
		SPMON: obj.SPMON,
        T_IMPORTA: []  //빈키값이라도 집어넣어줘야 함. 앱에서 수정해서 안넣도 됨. 근데 그냥 넣어줌. 2013.04.18 NDH
	}
        ZTBSD_GM_208_003(param, 'deleteComplete');
}

var deleteCancel = function(){
}

var editHandle = function(idx){
	var obj = forcastList[idx];
	var param = {
		KUNWE_TX: obj.KUNWE_TX,
		KATR1_TX: obj.KATR1_TX,
		JINDO_TX: obj.JINDO_TX,
		SPMON: obj.SPMON,
		PERCT: obj.PERCT,
		TEXT1: obj.TEXT1,
		VBELN: obj.VBELN
	};
	app_changePage( 'B010602.html', param, true );
}


var ZTBSD_GM_208_003 = function( param, fn ){
	//app_startLoading();
	loader.load( {
        Function: "ZTBSD_GM_208_003",
        Parameter: param,
        Success: function($data){
    		//app_endLoading();
    		msgCall( '삭제되었습니다.', '', fn );
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( $e );
        }
    });
}

var deleteComplete = function(){
	refresh();
}




/** ===============================================================================================================
 * Util Function
 *  */


var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

var refresh = function(){
	window.location.href = 'B010600.html' + '?dummy=' + (Math.random() * Math.random());
}

var msgCall = function( $msg, $title, $fn ){
	app_alert( $msg, $title, $fn );
};