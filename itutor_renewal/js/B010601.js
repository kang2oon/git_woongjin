/**
 * 휴회 예상회원 등록
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
	if( String($data)!="undefined" && !!$data && String($data)!="" && $data!='""' && $data!=="''"  ) {
		var data = $data.replace(/'/g, '"');
		pageParams = JSON.parse( data );
	};
	app_changeTitle( '휴회 예상 등록' );
	initPage();
};

/** ===============================================================================================================
 * 초기실행
 *  */
var initPage = function(){
	
	insertNoneListEl('회원을 검색해 주세요.');
    
    
/*
 	if( pageParams==undefined || pageParams=="" ){
 		setFindFrm();
 	}else{
 		if( !!pageParams.NAME1 ){
 			searchListLoad( pageParams.NAME1 );
 		}
 	}
 */
    /*
     검색 안되는 문제. findBtn 아이디 값을 찾지 못함.
     위의 내용 주석처리하고 아래 처럼 바꿈.
     2013.04.17 NDH
     */
 	setFindFrm();
	if( !!pageParams.NAME1 ){
		searchListLoad( pageParams.NAME1 );
	}
 
};

/** ===============================================================================================================
 * 데이터 로드
 *  */



// 리스트 조회
var searchListLoad = function( nm ){
	
	var name = (nm==undefined)? "" : nm ;
	
	loader.load( {
        Function: "ZTBSD_GM_208_002",
        Parameter: {
        	NAME1 : nm
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		outList = data.T_EXPORTA;
        		makeList();
        	}else{
        		msgCall( "조회내용이 없습니다." );
        		insertNoneListEl('조회내용이 없습니다.');
        	}
        },
        Error: function($e){
        	insertNoneListEl('조회내용이 없습니다.');
        	msgCall( $e );
        }
    });
};


// 휴회 요청 등록
var addOutList = function( param ){
	loader.load( {
        Function: "ZTBSD_GM_208_003",
        Parameter: param,
        Success: function($data){
        	msgCall( '성공적으로 등록하였습니다', '', 'addEndFn' );
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
}

// 등록 확인
var addEndFn = function(){
	app_changePage( 'B010600.html', '', true );
}

// 검색 이벤트 등록
var setFindFrm = function(){
	$('#findBtn').click(function(){
		var val = $('input:text').val();
		if( $.trim(val).length==0 ){
			msgCall('회원명을 입력하여 주십시오.');
			return false;
		}
		//
		$('ul.memListline').empty();
		searchListLoad(val);
	})
}

// 리스트 생성
var makeList = function(){
	var obj;
	var dt = new Date();
	var mon = dt.getMonth()+1;
	var yy = dt.getFullYear();
	var html = '';
	var list=outList;
	var i=0,len=list.length;
	if( len>0 ){
		for(;i<len;i+=1){
			obj = list[i];
			html += '<li id="list_'+i+'">';
			html += '<table class="recessMembers">';
			html += '<colgroup>';
			html += '<col style="width:68px;"/>';
			html += '<col style="width:auto;"/>';
			html += '<col style="width:auto;"/>';
			html += '<col style="width:auto;"/>';
			html += '<col style="width:auto;"/>';
			html += '</colgroup>';
			html += '<tbody>';
			html += '<tr>';
			html += '<td colspan="5">';
			html += '<span class="check-button">';
			html += '<input type="checkbox" name="listChk_'+i+'" id="listChk_'+i+'" class="" />';
			html += '<label for="a1"><span class="recMemberName">'+obj.KUNWE_TX +'('+obj.KATR1_TX+')'+'</span></label>';
			html += '</span>';
			html += '</td>';
			html += '</tr>';
			html += '<tr>';
			html += '<th scope="row">최종진도</th>';
			html += '<td colspan="4">'+ obj.JINDO_TX +'</td>';
			html += '</tr>';
			html += '<tr>';
			html += '<th scope="row"><label for="">예상월</label></th>';
			html += '<td>';
			html += '<select id="mon">';
			html += getMonth(yy, mon);
			html += '</select>';
			html += '</td>';
			html += '<td>/</td>';
			html += '<th scope="row">';
			html += '<label for="">가능성</label>';
			html += '</th>';
			html += '<td>';
			html += '<select id="rate">';	
			html += '<option value="select0" selected="selected">선택</option>';
			html += '<option value="20">20</option>';
			html += '<option value="60">60</option>';
			html += '<option value="100">100</option>';
			html += '</select>';
			html += '</td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td colspan="5">';
			html += '<textarea placeholder="요청사유 및 교사상담내용" title="요청사유 및 교사상담내용" class="placeholder" style="height:60px;"></textarea>';
			html += '</td>';
			html += '</tr>';
			html += '</tbody>';
			html += '</table>';
			html += '</li>';
		}
		$('.performing').removeClass('none');
		$('.performing').find('button').on('click', saveHandle);
		$('ul.memListline').html(html);
	}else{
		$('.performing').find('button').off('click', saveHandle);
		$('.performing').addClass('none');
		insertNoneListEl('조회내용이 없습니다.');
	}
}

// 조회 내용 없을때 화면 생성
var insertNoneListEl = function(txt){
	$('ul.memListline').empty();
	var html = '<li><div class="center" style="padding:15px;">'+txt+'</div></li>';
	$('ul.memListline').html(html);
}

// 예상월
var getMonth = function( y, m ){
	var html = '<option value="select0" selected="selected">선택</option>';
	var i=0;
	var mon;
	for( ;i<3;i+=1 ){
		mon = m + i;
		if( mon+i>12 ){
			mon -= 12;
			y+=1;
		}
		html += '<option value="'+y+getDigitNum(mon)+'">'+mon+'월</option>';
	}
	return html;
}

// 휴회 예상 등록 리스트 추가 
var saveHandle = function(){
	var $checkedEls = $('input:checkbox:checked');
	if( $checkedEls.length==0 ){
		msgCall('휴회예상 리스트가 없습니다.');
		return false;
	}else{
		var obj, arr=[], data;
		var i=0, len = $checkedEls.length;
		for(;i<len;i+=1){
			var idx = Number($($checkedEls[i]).attr('id').replace(/[^0-9]/g, ''));
			var $li = $( '#list_' + idx );
			var monVal = $li.find('select#mon option:selected').val();
			if( monVal=='select0' ){
				msgCall("휴회예상월을 확인하여 주십시오.");
				return false;
			};
			var rateVal = $li.find('select#rate option:selected').val();
			if( rateVal=='select0' ){
				msgCall("휴회가능성을 확인하여 주십시오.");
				return false;
			};
			var textVal = $li.find('textarea').val();
			if( $.trim(textVal).length==0 || textVal=='요청사유 및 교사상담내용' ){
				 msgCall("휴회 사유를 입력해 주세요.");
				 return false;
			}
			
			textVal = textVal.replace(/\r\n/gi,"<br>");
			textVal = textVal.replace(/\n/gi,"<br>");
			textVal = textVal.replace(/@/gi,"[#]");
			textVal = textVal.replace(/#/gi,"[@]");
			
			data = outList[idx];
			
			obj = {
				VBELN: data.VBELN,
				I_CHK2: ' ', // 상담요청('X':상담요청)
				SPMON: monVal,
				PERCT: rateVal,
				TEXT1: textVal
			};
			arr.push( obj );
		}
		
		var param = {
			GUBUN: ' ',
			T_IMPORTA: arr
		}
		
		addOutList( param );
	};
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
	window.location.href = 'B010601.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창
var msgCall = function( $msg, $title, $fn ){
	app_alert( $msg, $title, $fn );
};

// 디지털숫자형으로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String(Number($n));
	}else{
		return String(Number($n));
	}
};
