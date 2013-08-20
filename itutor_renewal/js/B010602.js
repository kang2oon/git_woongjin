/**
 * @휴회 수정
 */



var pageParams;
var outList;


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
	$data = $data.replace( /'/g, '"' );
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
	
	if( String($data)!="undefined" && !!$data && String($data)!="" && $data!='""'  ) {
		pageParams = JSON.parse( $data );
		
	};
	app_changeTitle( '휴회 예상 수정' );
	initPage();
};

/** ===============================================================================================================
 * 초기실행
 *  */
var initPage = function(){
	setDisplay();
	
};

/** ===============================================================================================================
 * 데이터 로드
 *  */

// 휴회 수정요청
var editOutList = function( param ){
	loader.load( {
        Function: "ZTBSD_GM_208_003",
        Parameter: param,
        Success: function($data){
        	msgCall( '성공적으로 수정하였습니다', '', 'addEndFn' );
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
}

// 수정확인
var addEndFn = function(){
	app_changePage( 'B010600.html', '', true );
}


// 화면구성
var setDisplay = function(){
	var obj = pageParams;
	// 이름
	$('#KUNWE_TX').text( obj.KUNWE_TX );
	
	// 학년
	$('#KATR1_TX').text( obj.KATR1_TX );
	
	// 최종진도
	$('#JINDO_TX').text( obj.JINDO_TX );
	
	// 예상월
	$('#SEL_SPMON').html( getMonth( obj.SPMON ) );
	
	// 휴회 가능성
	$('#SEL_PERCT option').each( function(){
		var $this = $(this);
		if( Number($this.val())==Number(obj.PERCT) ){
			$this.attr('selected', 'true');
		}
	} );
	
	// 사유
	
	var textVal = obj.TEXT1;
	textVal = textVal.replace( /&quot;/g, '"' );
	textVal = textVal.replace( /\<br\>/g, "\n" );
	$('#TEXT1').val( textVal );
	
	$('#cancelBtn').click(function(){
		app_goCancel();
	});
	$('#saveBtn').click(function(){
		saveInfo();
	});
}

// 저장 클릭시
var saveInfo = function(){
	var SPMON_1 = pageParams.SPMON;
	var SPMON = String($('#SEL_SPMON option:selected').val());
	if(SPMON=="select0"){
		msgCall("휴회예상월을 확인하여 주십시오.");
		return false;
	}
	
	var PERCT = $('#SEL_PERCT option:selected').val();
	if( PERCT=='select0' ){
		msgCall("휴회가능성을 확인하여 주십시오.");
		return false;
	};
	var TEXT1 = $('#TEXT1').val();
	if( $.trim(TEXT1).length==0 ){
		 msgCall("휴회 사유를 입력해 주세요.");
		 return false;
	}
	
	TEXT1 = TEXT1.replace(/\r\n/gi,"<br>");
	TEXT1 = TEXT1.replace(/\n/gi,"<br>");
	TEXT1 = TEXT1.replace(/@/gi,"[#]");
	TEXT1 = TEXT1.replace(/#/gi,"[@]");
	
	var VBELN = pageParams.VBELN;
	var param = {
		GUBUN: 'X',
		SPMON: SPMON_1,
		VBELN: VBELN,
		T_IMPORTA: [{
			VBELN: VBELN,
			SPMON: SPMON,
			PERCT: PERCT,
			TEXT1: TEXT1,
			I_CHK2: " "
		}]
	}
	editOutList(param);
}

// 예상월
var getMonth = function( sval ){
	var dt = new Date();
	var m = dt.getMonth()+1;
	var y = dt.getFullYear();
	var html = '<option value="select0">선택</option>';
	var i=0;
	var mon;
	var yy;
	var val;
	var selHtml='';
	for( ;i<3;i+=1 ){
		mon = m + i;
		yy = y;
		if( mon+i>12 ){
			mon -= 12;
			yy = y+1;
		}
		val = String(yy)+getDigitNum(mon);
		if( val==sval ){
			selHtml = 'selected="selected"';
		}else{
			selHtml = '';
		}
		html += '<option value="'+val+'" '+selHtml+'>'+yy+'년 '+mon+'월</option>';
	}
	return html;
}



/** ===============================================================================================================
 * Util Function
 *  */

// 객체 속성 유무
var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

// 페이지 새로고침
var refresh = function(){
	window.location.href = 'B010602.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창
var msgCall = function( $msg, $title, $fn ){
	app_alert( $msg, $title, $fn );
};

// 디지털 숫자형으로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String(Number($n));
	}else{
		return String(Number($n));
	}
};
