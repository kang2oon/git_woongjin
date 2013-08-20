/**
 * 디버깅용 Boolean 값
 *  */
var DEBUG = false;


/**
 * 디바이스 체크
 * true - Android
 * false - IOS
 *  */
var DEVICE_INFO = {};
var DEVICE_CHK;

if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
	DEVICE_CHK = false;
	DEVICE_INFO.iOSInfo = {
		userAgent: null,
		version: null, // major versions of iOS: 4,5,6
		minor: null, // minor versions: 1, for 5.1
		update: null, // optional minor version update: 2, for 5.1.2
		device: null, // iPhone, iPod, iPad
		phone: false, // treat iPhone and iPods both as phones
		tablet: false // iPad and maybe rumored iPad mini
	};
	
	if (/CPU like Mac OS X/i.test(navigator.userAgent)) {
		DEVICE_INFO.iOSInfo.version = 1;
	} else if (/OS [2-6]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent)){
		// [0] = source, [1] major version, [2] minor version, [3] optional minor version update
		var parts = /OS ([2-6])_(\d)(?:_(\d))? like Mac OS X/i.exec(navigator.userAgent);
		DEVICE_INFO.iOSInfo.version = parts[1];
		DEVICE_INFO.iOSInfo.minor = parts[2];
		DEVICE_INFO.iOSInfo.update = parts[3];
	}
}else{
	DEVICE_CHK = true;
}



/** ======================================================================================================================||
 * 
 * 디바이스 연동 함수.
 * 
 * ====================================================================================================================|| */



/**
 * @ DEVICE 연동 
 * @ 링크 이동
 * @ 이동할 링크, 전달할 파라미터문자열, 히스토리저장여부
 *  */
var app_changePage = function( url, param, saved ){
	app_startLoading('잠시만 기다려주세요.');
	//
	var jstr = JSON.stringify( param );
	if( saved==undefined ){
		saved = true;
	}
	//
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.changePage( url, jstr, saved );
	} else { // 아이폰
		sendToApp( "changePage?#" + url + "?#" + jstr + "?#" + saved );
	}
};


/**
 * @ DEVICE 연동 
 * @ 이전페이지로 이동
 *  */
var app_goCancel = function(){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.cancel();
	} else { // 아이폰                                                             
		sendToApp( "cancel" );
	}
};


/**
 * @ DEVICE 연동 
 * @ 페이지 이동후 파라미터를 가져오기위해 호출
 * @ 반환받을 함수명
 *  */
var app_getRequestParameter = function( fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getRequestParameter( fn );
	} else { // 아이폰
		sendToApp( "getRequestParameter?#" + fn );
	}
};

/**
 * @ DEVICE 연동 
 * @ 저장되어있는 현재페이지의 파라미터를 변경
 * @ 반환받을 함수명, 새로 변경할 데이터 문자열
 *  */
var app_setRequestParameter = function( fn, param ){
	var jstr = JSON.stringify( param );
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setRequestParameter( fn, jstr );
	} else { // 아이폰
		sendToApp( "setRequestParameter?#" + fn + "?#" + jstr );
	}
};

/**
 * @ DEVICE 연동 
 * @ 헤더 타이틀 변경
 * @ 변경할 제목 명
 *  */
var app_changeTitle = function( title ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.changeTitle( title );
	} else { // 아이폰
		sendToApp( "changeTitle?#" + title );
	}
};

/**
 * @ DEVICE 연동 
 * @ 로딩 시작
 * @ 로딩화면에 출력할 메세지(사용안함)
 *  */
var app_startLoading = function( msg ){
	if(msg==undefined) msg='\n잠시만\n기다려주세요.??';
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.startLoading( msg );
	} else { // 아이폰
		sendToApp( "startLoading?#" + msg );
	}
};

/**
 * @ DEVICE 연동 
 * @ 로딩 멈춤
 *  */
var app_endLoading = function(){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.endLoading();
	} else { // 아이폰
		sendToApp( "endLoading" );
	}
};

/**
 * @ DEVICE 연동 
 * @ 로그인
 * @ 아이디및 패스워드 json형식의 문자열, 아이디 저장여부 
 *  */
var app_login = function( param, bool ){
	var jstr = JSON.stringify( param );
	//
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.login( jstr, bool );
	} else { // 아이폰
		sendToApp( "login?#" + jstr + "?#" + bool );
	}
};

/**
 * @ DEVICE 연동 
 * @ 저장된 아이디 반환받을 함수.
 * @ 반환받을 함수명.
 *  */
var app_getSavedID = function( $fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getSavedID( $fn );
	} else { // 아이폰
		sendToApp( "getSavedID?#" + $fn );
	}
};

/**
 * @ DEVICE 연동 
 * @ 로그인한 아이디 반환.
 * @ 반환받을 함수명.
 *  */
var app_getLoginID = function( $fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getLoginID( $fn );
	} else { // 아이폰
		sendToApp( "getLoginID?#" + $fn );
	}
};

/**
 * @ DEVICE 연동 
 * @ 로그인한 교사번호 반환.
 * @ 반환받을 함수명.
 *  */
var app_getTutorID = function( $fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getTutorID( $fn );
	} else { // 아이폰
		sendToApp( "getTutorID?#" + $fn );
	}
};

/**
 * @ DEVICE 연동 
 * @ 달력호출.
 * @ 반환받을 함수명.
 *  */
var app_openCalendar = function( $fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.openCalendar( $fn );
	} else { // 아이폰
		sendToApp( "openCalendar?#" + $fn );
	}
};


/**
 * @ DEVICE 연동 
 * @ 시간호출.
 * @ 반환받을 함수명.
 *  */
var app_openTime = function( $fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.openTime( $fn );
	} else { // 아이폰
		sendToApp( "openTime?#" + $fn );
	}
};

/**
 * @ DEVICE 연동 
 * @ 회원이미지 가져오기
 * @ 반환받을 함수명, 회원번호
 *  */
var app_getProfilePicture = function( $fn, $code ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getProfilePicture( $fn, $code );
	} else { // 아이폰
		sendToApp( "getProfilePicture?#" + $fn + "?#" + $code );
	}
}

/**
 * @ DEVICE 연동 
 * @ 회원 이미지 변경
 * @ 이미지 변경후 완료 콜백 함수명, 회원번호
 *  */
var app_setProfilePicture = function( $fn, $code ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setProfilePicture( $fn, $code );
	} else { // 아이폰
		sendToApp( "setProfilePicture?#" + $fn + "?#" + $code );
	}
}

/**
 * @ DEVICE 연동 
 * @ 메모저장
 * @ 메모 저장후 완료 콜백 함수명, 메모저장시 필요값(회원번호, 회원명, 저장 날짜 및 시간, 메모내용)
 *  */
var app_setNote = function( $fn, $contents ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setNote( $fn, $contents );
	} else { // 아이폰
		sendToApp( "setNote?#" + $fn + "?#" + $contents );
	}
}

/**
 * @ DEVICE 연동 
 * @ 음성메모 녹음 호출
 * @ 이미지 변경후 완료 콜백 함수명, 메모저장시 필요값(회원번호, 회원명, 저장 날짜 및 시간)
 *  */
var app_setVoiceNote = function( $fn, $contents ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setVoiceNote( $fn, $contents );
	} else { // 아이폰
		sendToApp( "setVoiceNote?#" + $fn + "?#" + $contents );
	}
}

/**
 * @ DEVICE 연동 
 * @ 업무종료, 일간스케쥴로 이동
 *  */
var app_endLearning = function(){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.endLearning();
	} else { // 아이폰
		sendToApp( "endLearning?#" );
	}
}

/**
 * @ DEVICE 연동 
 * @ alert 창
 * @ 메세지, 타이틀, 확인버튼 클릭시 호출받을 함수명.
 *  */
var app_alert = function( msg, title, fn ){
	
	if( fn==undefined ){
		fn = "";
	}
	
	if( title==undefined ){
		title = "안내";
	}
	if( msg==undefined ){
		msg = "";
	}
	
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.showAlert( fn, title, msg );
	} else { // 아이폰
		sendToApp( "showAlert?#" + fn + "?#" + title + "?#" + msg );
	}
	
}

/**
 * @ DEVICE 연동 
 * @ confirm 창
 * @ 메세지, 타이틀, 확인버튼 클릭시 호출받을 함수명, 취소버튼 클릭시 호출받을 함수명.
 *  */
var app_showConfirm = function( msg, title, ok, cancle ){
	
	if( title==undefined ){
		title = "";
	}
	if( msg==undefined ){
		msg = "";
	}
	
	if( ok==undefined ){
		ok = "";
	}
	
	if( cancle==undefined ){
		cancle = "";
	}
	
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.showConfirm( title, msg, ok, cancle );
	} else { // 아이폰
		sendToApp( "showConfirm?#" + title + "?#" + msg + "?#" + ok + "?#" + cancle );
	}
}

/**
 * @ DEVICE 연동 
 * @ 네이티브 상, 하단 네비게이션 활성 및 비활성.
 * @ true - 네이티브 상, 하단 활성
 * @ false - 네이티브 상, 하단 비활성
 *  */
var app_showBlind = function( bool ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.showBlind( bool );
	} else { // 아이폰
		sendToApp( "showBlind?#" + bool );
	}
};

/**
 * @ DEVICE 연동 
 * @ 싸인창 호출
 * @ 싸인기능완료후 호출받을 함수명.
 *  */
var app_setSign = function( fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setSign( fn );
	} else { // 아이폰
		sendToApp( "setSign?#" + fn );
	}
}

/**
 * @ DEVICE 연동 
 * @ 외부 링크이동
 * @ 이동할 주소.
 *  */
var app_goSite = function( url ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.goSite( url );
	} else { // 아이폰
		sendToApp( "goSite?#" + url );
	}
}

/**
 * @ DEVICE 연동 
 * @ 교사정보 가져오기
 * @ 반환받을 함수명.
 *  */
var app_getTutorInfo = function( fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getTutorInfo( fn );
	} else { // 아이폰
		sendToApp( "getTutorInfo?#" + fn );
	}
}

/**
 * @ DEVICE 연동 
 * @ 업무 완료여부 저장
 * @ 학생코드, 학습시간.
 *  */
var app_setLearningState = function( userCd, qtime ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.setLearningState( userCd, qtime );
	} else { // 아이폰
		sendToApp( "setLearningState?#" + userCd +"?#"+ qtime );
	}
}

/**
 * @ DEVICE 연동 
 * @ 업무 완료여부 가져올 함수.
 * @ 반환받을 함수명, 학생코드, 학습시간.
 *  */
var app_getLearningState = function( fn, userCd, qtime ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getLearningState( fn, userCd, qtime );
	} else { // 아이폰
		sendToApp( "getLearningState?#" + fn +"?#"+ userCd +"?#"+ qtime );
	}
}

/**
 * @ DEVICE 연동 
 * @ 디바이스 고유코드 반환.
 * @ 반환받을 함수명.
 *  */
var app_getDeviceID = function( fn ){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.getDeviceID( fn );
	} else { // 아이폰
		sendToApp( "getDeviceID?#" + fn );
	}
}

/**
 * @ DEVICE 연동 
 * @ 상담화면 전송
 * @ 전송결과 반환받을 함수명, 부모아이디
 *  */
var app_sendLearningToThinktalk = function(fn, pid){
	//sendLearningToThinktalk
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.sendLearningToThinktalk( fn, pid );
	} else { // 아이폰
		sendToApp( "sendLearningToThinktalk?#" + fn + "?#" + pid );
	}
}

/**
 * @ DEVICE 연동 
 * @ 칭찬메세지 전송
 * @ 전송결과 반환받을 함수명, 부모아이디, 메세지.
 *  */
var app_sendPraiseMessageToThinktalk = function( fn, pid, msg ){
	//sendPraiseMessageToThinktalk
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.sendPraiseMessageToThinktalk( fn, pid, msg );
	} else { // 아이폰
		sendToApp( "sendPraiseMessageToThinktalk?#" + fn + "?#" + pid + "?#" + msg );
	}
}

/**
 * @ DEVICE 연동 
 * @ 가입해지.
 * @ 해지후 완료호출 받을 함수명, 교사아이디.
 *  */
var app_cancelJoin = function(fn, id){
	if( DEVICE_CHK ) {  // 안드로이드
		window.conn.cancelJoin( fn, id );
	} else { // 아이폰
		sendToApp( "cancelJoin?#" + fn + "?#" + id );
	}
}


/**
 * @ DEVICE 연동 
 * @ ios와 연동을 위해 함수 호출을하기 위해 만든 함수. 
 * @ 연동문자열
 *  */
var sendToApp = function( $val ) {
	var src = String( "toapp://"+$val );
    var src2  = src.replace(/\n/gi,"%0A"); //줄바꿈 적용. 2013.02.20. NDH
	var html = "<IFRAME id='toAppFrame' style='' src='"+src2+"' frameborder='no' scrolling='0' width='0' height='0'></IFRAME>";
	$('body').append(html);
	$('#toAppFrame').remove();
};



/** ======================================================================================================================||
 * 
 * 기타 함수.
 * 
 * ====================================================================================================================|| */


/**
 * @ 숫자로 변경가능한 문자열.
 * @ 3자리마다 콤마찍기
 *  */
var commaFormat = function( nstring ){     
	 var num = parseFloat(nstring)
	 , formatting = function( number ){
		 if(number==0) return 0;       
		 var reg = /(^[+-]?\d+)(\d{3})/;     
		 var n = (number + '');       
		 while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');       
		 return n; 
	 };     
	 if( isNaN(nstring) ) return "0";       
	 return formatting( num ); 
}; 

//GET 방식으로 넘어온 파라미터 object 형태로 분리해서 반환. //사용 안함
var queryStringToObject = function(){
	var param;
	if( location.search.indexOf("?")>-1 ){
		param = {};
		var pstr = location.search.replace( '?', '' );
		var arr = pstr.split('&');
		var p1, p2;
		var i=0, len=arr.length;
		for( ;i<len; i+=1 ){
			p1 = arr[i];
			p2 = p1.split('=');
			param[p2[0]] = p2[1];
		}
	}
	return param;
};


// 문자형식의 데이터 XML문서로 변환
var createXMLFromString = function(string) {
	var xmlDocument;
	var xmlParser;
	if(window.ActiveXObject){   //IE일 경우
	   xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
	   xmlDocument.async = false;
	   xmlDocument.loadXML(string);
	} else if (window.XMLHttpRequest) {   //Firefox, Netscape일 경우
	   xmlParser = new DOMParser();
	   xmlDocument = xmlParser.parseFromString(string, 'text/xml');
	} else {
	   return null;
	}
	return xmlDocument;
};


// ** 정답지용 씽크U코드
var ANSWERS_U_CODE = {
		'000000000000001090': {in_course_code:'MA01', uname:'초등수학', name:'씽크U수학'},//씽크U수학
		'000000000000001090_X': {in_course_code:'MA02', uname:'중등수학', name:'씽크U수학'},//씽크U수학
		'000000000000001114': {in_course_code:'SOSC', uname:'사회과학', name:'씽크U사회과학'},//씽크U사회과학
		'000000000000001131': {in_course_code:'KORN', uname:'국어', name:'씽크U국어'},//씽크U국어
		'000000000000001162': {in_course_code:'CHCH', uname:'한자', name:'씽크U한자'},//씽크U한자
		'000000000000001148': {in_course_code:'ENGP', uname:'영어', name:'씽크U영어(방문형)'}//씽크U영어(방문형)
};
var ANSWERS_U_SUBJECT = {
		'MA02': {ZMAT1:'000000000000001090', uname:'중등수학', name:'씽크U수학'},//씽크U수학
		'SOSC': {ZMAT1:'000000000000001114', uname:'사회과학', name:'씽크U사회과학'},//씽크U사회과학
		'KORN': {ZMAT1:'000000000000001131', uname:'국어', name:'씽크U국어'},//씽크U국어
		'CHCH': {ZMAT1:'000000000000001162', uname:'한자', name:'씽크U한자'},//씽크U한자
		'ENGP': {ZMAT1:'000000000000001148', uname:'영어', name:'씽크U영어(방문형)'}//씽크U영어(방문형)
};


// 2013.02.15	ypkim
// 단말기의 현재시간을 얻어 18시 이후면 false 값을 리턴 함.
// 과목입회, 과목변경, 회원입회 시 사용 됨. 
var timeCheck = function()
{
	var res = true;
	
	var date = new Date();
	var hour = date.getHours();

	if (Number(hour) >= 18)
	{
		res = false;
	}
	
	return res;
}





// 디버그용 멀티 얼럿
var trace = function(){
    var i=0, len=arguments.length, alstr='';
    for( ;i<len;i+=1 ){
        alstr += String(arguments[i])
        if( i<len-1 ){
        	alstr += ', ';
        }
    }
    app_endLoading();
    
    
//  var  html = "<div id='debug'>" + alstr + "</div>";
//    
//    $('body').append(html);
//    //$("#debug").remove();    
    
    
    
    alert(alstr);
};

// 디버그용 오브젝트 키값으로 분리하여 얼럿창에 출력
var traceObj = function( o ){
	var sss = '';
	for( var key in o ){
		sss += key + ' : ' + o[key] + '\n';
	}
	trace( sss );
}



var debug = function ( val ){
    var typeIs;
        typeIs = typeof val;
    
    switch (typeIs){ 
	case "object":
         traceObj(val);
	break;

	case "undefined":
         alert("이거슨 undefined" );
	break;

	default :
        trace(val);
    }

}

