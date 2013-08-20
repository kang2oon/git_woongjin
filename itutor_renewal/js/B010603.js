/**
 * @휴회 요청
 */



var pageParams;
var balance = 0;
var penData;
var IS_PEN_TABLE = false;


/** ===============================================================================================================
 * 최초시작
 *  */
$(document).ready( function () {
	app_endLoading();
	//
	app_getRequestParameter( 'setData' );
});


// value 값에 " 들어갈 시 &quot; 로 변환. 2013.03.11 NDH
var jsonChange = function(str) {

    var result = str.replace(/(:[\s]*")(.*)("[\s]*)$/, ("$1" + str.match(/:[\s]*"(.*)"[\s]*$/)[1].replace(/"/g, "&quot;") + "$3"));
    return result;

    
}


/** ===============================================================================================================
 * 페이지 파라미터 리턴 함수
 *  */
var setData = function( $data ){
	if( String($data)!="undefined" && !!$data && String($data)!="" && $data!='""'  ) {
		var data = $data.replace(/'/g, '"');

        
        //value 값에 " 들어갈 시 &quot; 로 변환. IOS 일 경우만.  2013.03.11 NDH
        if(!DEVICE_CHK){
            var tmpSplit = data.split(',');
            tmpSplit[28] =   jsonChange(tmpSplit[28]);  //TEXT1
            tmpSplit[4] =   jsonChange(tmpSplit[4]);    //TEXT2 
            tmpSplit[26] =   jsonChange(tmpSplit[26]);  //TEXT3
            data = tmpSplit.toString();
            
        }
       
        
        
		pageParams = JSON.parse( data );
	};
	app_changeTitle( '휴회 요청' );
	initPage();
};

/** ===============================================================================================================
 * 초기실행
 *  */
var initPage = function(){
	cashLoad();
	
};

/** ===============================================================================================================
 * 데이터 로드
 *  */

// 잔액 조회
var cashLoad = function(){
	loader.load( {
        Function: "ZTBSD_GET_BALANCE_ORDER",
        Parameter: {
        	VBELN: pageParams.VBELN
        },
        Success: function($data){
    		var data = JSON.parse( $data ).Parameter;
    		if( !!data ){
    			balance = data.AMOUNT;
    		}else{
    			balance = 0;
    		}
        	penTypeLoad();
        },
        Error: function($e){
        	balance = 0;
        	penTypeLoad();
        }
    });
}

// 전자펜 조회
var penTypeLoad = function(){
	loader.load( {
        Function: "ZTBSD_GM_021_SMART",
        Parameter: {
        	KUNWE: pageParams.KUNWE,
        	VBELN: pageParams.VBELN
        },
        Success: function($data){
    		var data = JSON.parse( $data ).Parameter;
    		if( !!data ){
    			penData = data.T_EXPORTA;
    		}
    		setDisplay();
        },
        Error: function($e){
        	setDisplay();
        }
    });
}

// 휴회 요청
var requestOut = function( param ){
	loader.load( {
        Function: "ZTBSD_GM_021_001",
        Parameter: param,
        Success: function($data){
        	msgCall( '성공적으로 요청 하였습니다', '', 'addEndFn' );
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
}

// 요청 확인
var addEndFn = function(){
	app_changePage( 'B010600.html', '', true );
}


// 달력 호출
var openCalendar = function(){
	app_openCalendar( 'setPickDate' );
};

//학습일 셋팅 :: 디바이스에서 반환받음.
var setPickDate = function( $date ){
	var dt = new Date();
	var yy = dt.getFullYear();
	var mm = dt.getMonth()+1;
	var dd = dt.getDate();
	
	var dates = $date.split('-');
	
	var cUtil = new CalendarUtil();
	var tmpDays = cUtil.getAllDay( {yy:Number(dates[0]), mm:Number(dates[1]), dd:Number(dates[2])} );
	var todayDays = cUtil.getAllDay( {yy:yy, mm:mm, dd:dd} );
	
	if( tmpDays < todayDays ){
		msgCall( '과거일자는 선택할 수 없습니다.' );
		return false;
	}
	
	if( tmpDays <= todayDays+1 ){
		msgCall( '현재일로 부터 1일 이후 부터 선택 할 수 있습니다.' );
		return false;
	}
	
	var maxMon = mm+1;
	var maxYear = yy;
	var maxDate = 1;
	if( maxMon>12 ){
		maxMon -= 12;
		maxYear += 1;
	}
	var maxDays = cUtil.getAllDay( {yy:maxYear, mm:maxMon, dd:maxDate} );
	if( maxDays<tmpDays ){
		msgCall( '휴회 시작일은 차월 1일을 넘길 수 없습니다.' );
		return false;
	}
	
	$('#ABRUD_INPUT').text( birth[0] + '년 ' + birth[1] + '월 ' + birth[2] + '일' );
};


// 화면구성
var setDisplay = function(){
	// 판매문서
	$('#VBELN').text( pageParams.VBELN );
	
	// 회원명
	$('#KUNWE_TX').text( pageParams.KUNWE_TX );
	
	// 과목
	$('#ZMAT1_TX').text( pageParams.ZMAT1_TX );
	
	// 학습개월수
	$('#STMON').text( pageParams.STMON );
	
	// 입회유형
	$('#AUGRU_TX').text( pageParams.AUGRU_TX );
	
	// 잔액
	$('#BALANCE').text( balance );
	
	// 휴회요청일
	var dt = new Date();
	var yy = dt.getFullYear();
	var mm = dt.getMonth()+1;
	var dd = dt.getDate();
	var today = yy + '/' + getDigitNum(mm) + '/' + getDigitNum(dd);
	$('#ABRUD_H').text( today );
	
	var smm = mm+1;
	var syy = yy;
	var startday;
	if( smm>12 ){
		smm -= 12;
		syy +=1;
	}
	startday = syy + '-' + getDigitNum(smm) + '-01';
	
	// 휴회 시작일
	$('#ABRUD_INPUT').val(startday);
	$('#ABRUD_INPUT').click(function(){
		openCalendar();
	})
	$('#ABRUD_BTN').click(function(){
		openCalendar();
	})
	
	// 교사명
	$('#TUTOR_TX').text(pageParams.TUTOR_TX);
	
	// 휴회 사유
	var textVal = pageParams.TEXT1;
	//textVal = textVal.replace( "<br>", "\r\n" );
	$('#TEXT1').val(textVal);
	
	if( pageParams.PENCHK=='X' ){
		$('#PEN_GB_TABLE').removeClass('none');
		if( !!penData ){
			if( penData.length>0 ){
				IS_PEN_TABLE = true;
				makePenTabel();
			}
		}
		if(!IS_PEN_TABLE){
			$('#BANGB3').attr('disabled', 'disabled');
		}
	}
	
	$('input:radio[name=BANGB]').change(function(){
		var val = $(this).val();
		var value='';
		switch( val ){
			case '0' :
				value = "Y";
			break;
			case '1' :
				value = "N";
			break;
			case '2' :
				if( IS_PEN_TABLE ){
				}else{
					$('input:radio[name=BANGB]:checked').removeAttr('checked');
					msgCall("이관의 경우 전자펜 수업이 있을 경우에만 선택 가능합니다.");
					return false;
				}
				value = "";
			break;
		};
	});
	
	// 취소
	$('#CANCEL_BTN').click(function(){
		app_goCancel();
	});
	
	// 요청
	$('#REQUEST_BTN').click(function(){
		requestCheck();
	});
}

// 요청 체크 / 요청
var requestCheck = function(){
	var LEVGB = $('#SEL_LEVEL option:selected').val();
	if( LEVGB=="select0" ){
		msgCall("재입회 등급을 선택하세요.");
		return false;
	}
	
	var BANGB = '';
	var VBELN_N = '';
	if( pageParams.PENCHK=='X' ){
		if( $('input:radio[name=BANGB]').is(':checked')==false ){
			msgCall("전자펜 반납유형을 선택해 주세요.");
			return false;
		}
		
		var gbVal = $('input:radio[name=BANGB]:checked').val();
		if( IS_PEN_TABLE && gbVal=="2" ){
			if( $('input:radio[name=penChk]').is(':checked')==false ){
				msgCall("전자펜 반납의 이관을 선택한 경우 전자펜 과목을 선택하여야 합니다.");
				return false;
			}
		}
		
		switch( gbVal ){
			case '0' :
				BANGB = "Y";
			break;
			case '1' :
				BANGB = "N";
			break;
			case '2' :
				BANGB = "";
			break;
		};
		
		VBELN_N = $('input:radio[name=penChk]:checked').val();
	}
	
	var ZCANCA = $('#TEXT1').val();
	if( $.trim(ZCANCA).length==0 ){
		msgCall("휴회 사유를 입력해 주세요.");
		return false;
	}
	ZCANCA = ZCANCA.replace(/\r\n/gi,"<br>");
	ZCANCA = ZCANCA.replace(/\n/gi,"<br>");
	ZCANCA = ZCANCA.replace(/@/gi,"[#]");
	ZCANCA = ZCANCA.replace(/#/gi,"[@]");
	
	var ABRUD_LIST = $('#ABRUD_H').text().split('/');
	var ABRUD = ABRUD_LIST[0]+ABRUD_LIST[1]+ABRUD_LIST[2];
	var LDATE_LIST = $('#ABRUD_INPUT').val().split('-');
	var LDATE = LDATE_LIST[0]+LDATE_LIST[1]+LDATE_LIST[2];
	
	var param = {
		S_IMPORTA:{
			VBELN: pageParams.VBELN,
			REQGB: "21",
			ABRUD: ABRUD,
			LDATE: LDATE,
			ZBIGO: "",
			LEVGB: LEVGB,
			ZCANCA: ZCANCA,
			BANGB: BANGB,
			VBELN_N: VBELN_N
		}
	};
	requestOut(param);
}

// 전자펜 화면구성
var makePenTabel = function(){
	var html='';
	var obj;
	var list=penData;
	var i=0, len=list.length;
	for(;i<len;i+=1){
		obj = list[i];
		html += '<tr>';
		html += '<td class="left">';
		html += '<input type="radio" name="penChk" id="penChk_'+i+'" value="'+obj.VBELN+'" />'; 
		html += '<label for="penChk_'+i+'">'+obj.ZMAT1_TX+'</label>';
		html += '</td>';
		html += '<td>'+obj.GWLDT+'</td>';
		html += '<td>'+obj.GWLDT_PEN+'</td>';
		html += '</tr>';
	}
	$('#PEN_TABLE').find('tbody').html( html );
	penData = null;
	//
	$('#PEN_TABLE').removeClass('none');
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
		val = yy+getDigitNum(mon);
		if( val==sval ){
			selHtml = 'selected="selected"';
		}else{
			selHtml = '';
		}
		html += '<option value="'+val+'" '+selHtml+'>'+mon+'월</option>';
	}
	return html;
}



/** ===============================================================================================================
 * Util Function
 *  */

// 객체 속성 포함 여부
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
	window.location.href = 'B010603.html' + '?dummy=' + (Math.random() * Math.random());
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
