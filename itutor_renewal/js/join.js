/**
 * @신규가입
 */

// 토큰아이디
var tkId = "";

$(document).ready(function(){
	app_endLoading();
	init();
});

// 시작
var init = function(){
	
	$('#CANCEL_DIV').width('100%');
	$('#CANCEL_DIV').removeClass('none');
	$('#CANCEL_BTN').click(function(){
		//loginUrl 변수의 url 경로는 join.html, join_admin.html 상단에 정의 되어있음.
		window.location.href = loginUrl;
	});
	
	$('#JOIN_BTN').html('확인');
	$('#JOIN_BTN').on( 'click', checkMemberHandle );
	
	$('#DELETE_BTN').click(function(){
		if(!$(this).hasClass('none')){
			var id = $.trim( $('#JOIN_ID').val() );
			if( id!='교사번호' && id.length<8 ){
				msgCall('교사번호를 입력해 주세요.');
				return false;
			}
			//
			app_showConfirm( '가입해지 하시겠습니까', '', 'deleteOk', 'deleteCancel' );
		}
	});
	$('#CANCEL_BTN').click(function(){
		app_startLoading();
		//loginUrl 변수의 url 경로는 join.html, join_admin.html 상단에 정의 되어있음.
		window.location.href = loginUrl;
	});
};


// 가입해지
var deleteOk = function(){
	var id = $.trim( $('#JOIN_ID').val() );
	deleteMember( id );
}

// 가입해지 취소
var deleteCancel = function(){
	// ...
}


// 입력창 체크
var checkMemberHandle = function(){
	var id = $.trim( $('#JOIN_ID').val() );
	var pwd = $.trim( $('#JOIN_PWD').val() );
	
	if( id!='교사번호' && id.length<8 ){
		msgCall('교사번호를 입력해 주세요.');
		return false;
	}
	
	if( pwd!='주민번호' && pwd.length<13 ){
		msgCall('주민번호를 입력해 주세요.');
		return false;
	}
	checkMember(id, pwd);
}

// ** 교사 가입여부 확인
var checkMember = function( pernr, regNo ){
	loader.load( {
        Function: "ZTBSD_GM_214_JOIN_CHECK",
        Parameter: {
            I_PERNR: pernr,
            I_REGNO: regNo
        },
        Success: function( rlt ){
        	var data = JSON.parse( rlt );
            if( !!data.Parameter ){
        		setCheckOk( data.Parameter.S_EXPORTA );
        	}
        },
        Error: function($e){
        	if( $.trim($e).length==0 ){
        		msgCall('씽크빅 선생님이 아닙니다.');
        	}else{
        		msgCall($e);
        	}
        }
    });
}

// 가입여부 확인후 데이터 통신 완료시 호출 되는 함수.
var setCheckOk = function( obj ){
	if( obj.ADDGB=="Y" ){
		msgCall('이미 가입된 교사입니다.');
		$('#DELETE_DIV').width('50%');
		$('#CANCEL_DIV').width('50%');
		$('#DELETE_DIV').removeClass('none');
	}else{
		msgCall('가입 가능한 교사입니다.');
		$('#CANCEL_DIV').width('100%');
		$('#DELETE_DIV').addClass('none');
		//
		$('#JOIN_ID').attr('disabled', 'disabled');
		$('#JOIN_PWD').attr('disabled', 'disabled');
		//
		$('#JOIN_BTN').html('승인');
		$('#JOIN_BTN').off( 'click', checkMemberHandle );
		$('#JOIN_BTN').on( 'click', pushMemberHandle );
	}
	setTutorTable(obj);
}

// 가입여부 출력
var setTutorTable = function( obj ){
	var $el = $('.txt_mmeber_confirm');
	var html = '';
	html += '<span>'+obj.ENAME+' '+obj.PERNR+' '+obj.STEXT02+'</span>';
	if(obj.ADDGB=="Y"){
		html += '<em>가입 <img src="../image/ico_join_o.png" alt="" width="17" height="17" /></em>';
	}else{
		html += '<em>미가입 <img src="../image/ico_join_x.png" alt="" width="17" height="17" /></em>';
	}
	//
	$el.empty();
	$el.html(html);
	$el.removeClass('none');
}

// ** 승인
var pushMemberHandle = function(){
	app_startLoading();
	app_getDeviceID('returnDiviceId');
}

// 디바이스 아이디 반환함수
var returnDiviceId = function( id ){
	app_endLoading();
	if( $.trim(id).length==0 ){
		msgCall("승인이 정상적으로 이루어지지 않았습니다.");
	}else{
		msgCall("승인이 완료 되었습니다.");
		//
		tkId = id;
		$('#JOIN_BTN').html('가입');
		$('#JOIN_BTN').off( 'click', pushMemberHandle );
		$('#JOIN_BTN').on( 'click', joinMemberHandle );
	}
}

// ** 가입
var joinMemberHandle = function(){
	var id = $.trim( $('#JOIN_ID').val() );
	var pwd = $.trim( $('#JOIN_PWD').val() );
	
	if( id!='교사번호' && id.length<8 ){
		msgCall('교사번호를 입력해 주세요.');
		return false;
	}
	
	if( pwd!='주민번호' && pwd.length<13 ){
		msgCall('주민번호를 입력해 주세요.');
		return false;
	}
	
	app_showConfirm( '해당정보로 가입 하시겠습니까', '', 'joinMember', 'joinMemberCancel' );
}

// 가입 취소
var joinMemberCancel = function(){
	//...
}

// 회원가입
var joinMember = function(){
	// 
	var osGubun = (DEVICE_CHK)? 'A' : 'I';
	var iTkId = (DEVICE_CHK)? tkId : '';
	
	var id = $.trim( $('#JOIN_ID').val() );
	var pwd = $.trim( $('#JOIN_PWD').val() );
	
	loader.load( {
        Function: "ZTBSD_GM_214_JOIN",
        Parameter: {//I_TELF2, I_DIVID2, I_OS_GUBUN, I_TK_ID
            I_PERNR: id,
            I_REGNO: pwd,
            I_TK_ID: iTkId
        },
        Success: function( rlt ){
        	msgCall('정상적으로 처리되었습니다.', '가입완료', 'joinComplete');
        },
        Error: function($e){
        	msgCall($e);
        }
    });
}

// 가입완료.
var joinComplete = function(){
	//loginUrl 변수의 url 경로는 join.html, join_admin.html 상단에 정의 되어있음.
	window.location.href = loginUrl;
}

// ** 해지
var deleteMember = function( pernr ){
	//
	app_startLoading();
	app_cancelJoin( 'deleteComplete', pernr );
}

// 해지 완료
var deleteComplete = function( bool ){
	if( bool=='true' ){
		$('#JOIN_ID').val('교사번호');
		$('#JOIN_PWD').val('주민번호');
		$('.txt_mmeber_confirm').empty();
		$('#DELETE_DIV').addClass('none');
		$('#CANCEL_DIV').width('100%');
	}
	app_endLoading();
}



/**
 * utils
 * */
// 메세지창
var msgCall = function( msg, title, fn ){
	app_alert( msg, title, fn );
};

// 새로고침
var refresh = function(){
    window.location.href = 'join.html' + '?dummy=' + (Math.random() * Math.random());
}
