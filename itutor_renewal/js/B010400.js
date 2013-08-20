/**
 * 과목변경
 *  */
// 전 페이지에서 가지고 와야 하는데이터
var pageParams;

var bookCode = "000000000000001069";
var plusCode = "000000000000001084";
var gungCode = "000000000000001154";
var startDate = "";


var filterSbj = {
		"000000000000001159":"쿠키쿠 아기유치원",
		"000000000000001163":"쿠키쿠 아기유치원플러스"
};



// 멀티진도 불가
var filterMulti = {
	"000000000000001050":"책읽기",
	"000000000000001069":"책읽기2",
	"000000000000001084":"책읽기플러스",
	"000000000000001088":"영어책읽기",
	"000000000000001115":"씽크U영어_주1",
	"000000000000001116":"씽크U영어_주2",
	"000000000000001117":"씽크U영어_주3",
	"000000000000001130":"(센터)방학특강",
	"000000000000001134":"쿠키쿠",
	"000000000000001150":"쿠키쿠플러스",
	"000000000000001152":"씽크U수학(S)",
	"000000000000001153":"씽크U과학(S)",
	"000000000000001154":"씽크U궁것질",
	"000000000000001159":"쿠키쿠 아기유치원",
	"000000000000001163":"쿠키쿠 아기유치원플러스"
};

// 책읽기 과목군
var filterRead = {
		'000000000000001050':'책읽기', 
		'000000000000001069':'책읽기2',
		'000000000000001084':'책읽기플러스',
		'000000000000001088':'영어책읽기',
		'000000000000001134':'쿠키쿠',
		'000000000000001150':'쿠키쿠플러스',
		'000000000000001159':'쿠키쿠 아기유치원',
		'000000000000001163':'쿠키쿠 아기유치원플러스',
		'000000000000001159':'깨치기아기유치원',
		'000000000000001163':'깨치기아기유치원플러스'
};

// 학습센터
var filterCenter = {
		"000000000000001115":"씽크U영어_주1",
		"000000000000001116":"씽크U영어_주2",
		"000000000000001117":"씽크U영어_주3"
}


// 전자펜 활성화 그룹
var filterPen = {
	'000000000000001056':'스마트영어',
	'000000000000001088':'영어책읽기',
	'000000000000001134':'쿠키쿠'
};

// SMS
var filterSms = {
	'000000000000001090' : '씽크U수학',
	'000000000000001091' : '씽크U수학(2)',
	'000000000000001131' : '씽크U국어',
	'000000000000001114' : '씽크U사회과학'
};

// 씽크U리얼스피킹(1), (2)
var filterReal = {
		'000000000000001155' : '씽크U리얼스피킹(1)',
		'000000000000001156' : '씽크U리얼스피킹(2)',
		'000000000000001165' : '리얼스피킹Day(1)',
		'000000000000001166' : '리얼스피킹Day(2)'
};

// 씽크U궁것질
var filterGung = {
		'000000000000001154' : '씽크U궁것질'
};

// 2013.02.07	ypkim
var filterNewWelFare1= {
	'000000000000001063' : '(09)책생각키우기',
	'000000000000001064' : '(09)책생각키우기2',
	'000000000000001065' : '(09)책생각열기',
	'000000000000001169' : '(13)책생각키우기'
};


// 2013.02.07	ypkim
var filterNewWelFare2 = {
	'000000000000001170' : '복_(신)한글깨치기',
	'000000000000001171' : '복_호기심깨치기',
	'000000000000001172' : '복_국어'
};

// 2-4단계 비활성 , 달력 사용안함
var filterLv1 = {
		'000000000000001050':'책읽기',
		'000000000000001069':'책읽기2',
		'000000000000001088':'영어책읽기',
		'000000000000001084':'책읽기플러스',
		'000000000000001134':'쿠키쿠',
		'000000000000001150':'쿠키쿠플러스',
		'000000000000001152':'씽크U수학(S)',
		'000000000000001153':'씽크U과학(S)',
		'000000000000001154':'씽크U궁것질',
		'000000000000001159':'쿠키쿠 아기유치원',
		'000000000000001163':'쿠키쿠 아기유치원플러스',
		'000000000000001159':'깨치기아기유치원',
		'000000000000001163':'깨치기아기유치원플러스'
};

// 콤보박스 기준날짜 변경시 궁것질추가.
var filterThinkU = {
		'000000000000001152':'씽크U수학(S)',
		'000000000000001153':'씽크U과학(S)',
};

// 기준날짜
var stdDay = 7;
// 페이지에서 사용할 데이터
var frmData = {
		subjectList : null,
		subjectIdxList : null,
		subjectData : null,
		levelData : null,
		hosuData : null,
		bookData : null,
		lvElIdxList: null,
		currentLvIdx: 1,
		currentSbjIdx: -1 
};


/** ===============================================================================================================
 * 최초시작
 *  */
var readyInit = function(){
	app_endLoading();
	//
	app_getRequestParameter( 'setData' );
}


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
	
	app_changeTitle( pageParams.NAME1 );
	subjectLoad();
};



// 과목로드
var subjectLoad = function(){
	loader.load( {
        Function: "ZTBSD_GM_001_003",
        Parameter: null,
        Success: function($data){
        	frmData.subjectData = JSON.parse( $data ).Parameter;
        	if( !!frmData.subjectData ){
        		 var sbjList = [];
                 var sbjIdxObj = {};
                 var exa = frmData.subjectData.T_EXPORTA;
                 var exb = frmData.subjectData.T_EXPORTB;
//                 var exc = frmData.subjectData.T_EXPORTC;
                 
                 var inObj = function( arr ){
                 	var i=0, len = arr.length, obj;
                 	for( ;i<len;i+=1 ){
                 		obj = arr[i];
                 		sbjIdxObj[obj.MATNR] = sbjList.length;
                 		sbjList.push({
                 			code: obj.MATNR,
                 			name: obj.MAKTX
                 		});
                 	};
                 };
                 
                 inObj(exa);
                 inObj(exb);
//                 inObj(exc);
                 
                 frmData.subjectList = sbjList;
                 frmData.subjectIdxList = sbjIdxObj;
                 
                 bookChkLoad();
        	}else{
        		msgCall( "과목데이터가 없습니다.");
        	};
        },
        Error: function($e){
        	msgCall( "과목데이터가 없습니다.");
        }
    });
};

// 책읽기 체크
var bookChkLoad = function(){
	loader.load( {
        Function: "ZTBSD_GM_209_003",
        Parameter: {
        	KUNWE: pageParams.KUNWE
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	frmData.bookData = data;
        	init();
        },
        Error: function($data){
        	init();
        }
	});
	
};
// 단계로드
var levelLoad = function( $code ){
	loader.load( {
        Function: "ZTBSD_GM_001_018",
        Parameter: {
        	ZMAT1: $code
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	frmData.levelData = data;
        	if( !!data ){
        		var i=1,
            	len = 4;
            	for( ;i<=len;i+=1 ){
            		setLevel(i);
            	}
        	}else{
        		msgCall( "해당과목의 단계가 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "해당과목의 단계가 없습니다." );
        }
    });
};

// 호수 로드
var hosuLoad = function( $level ){
	loader.load( {
        Function: "ZTBSD_GM_001_019",
        Parameter: {
        	MATNR: $level
        },
        Success: function($data){
        	frmData.hosuData = JSON.parse( $data ).Parameter;
        	if( !!frmData.hosuData ){
        		setHosu(frmData.currentLvIdx);
        	}else{
        		msgCall( "진도데이터가 없습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "진도데이터가 없습니다." );
        }
    });
};

// 멀티진도
var consecutiveLoad = function( $val ){
	loader.load( {
        Function: "ZTBSD_ADD_PROGRESS_SP_ST",
        Parameter: {
        	SPMAT: $val,
        	COUNT: " "	// 사용하지 않으나 space를 넣지 않으면 에러남
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		if( !hasCode( filterMulti, frmData.subjectList[frmData.currentSbjIdx].code ) ){
            		setMultiJindo( data );
            	}
        	}else{
        		msgCall( "연속진도 데이터가 업습니다." );
        	}
        },
        Error: function($e){
        	msgCall( "연속진도 데이터가 없습니다." );
        }
    });
};

// 씽크U과목 변경 확인
var uConfirmOk = function(){
	//
};

//씽크U과목 변경 취소
var uConfirmCancle = function(){
	app_goCancel();
};

// 로직 시작
var init = function(){
	
	if( pageParams.THUX=="X" ){
		var msg = "씽크U 과목 변동 요청 시 관리 교사실적 ‘-1’ 차감됩니다. 실행 하시겠습니까";
		app_showConfirm( msg, '', 'uConfirmOk', 'uConfirmCancle' )
	}

	
	$('#JOIN_SUBJECT').change( function(){
		stdDay = 7;
		setAbleClassInfo( [true, true, true, true, true] )
		resetClassInfo(); // 단계 호수 초기화
		setPen();		// 전자펜
		setSms();		// sms
		setPeriod();    // 수업기간 설정
		setBookTable(); // 책읽기 테이블
		
		var msg = '';
		var code = $('#JOIN_SUBJECT option:selected').val();
		
		// 쿠키쿠 아기유치원, 쿠키쿠 아기유치원 플러스
		if( hasCode( filterSbj, code ) && msg.length==0 ){
			msg = '선택하신 과목은 아이튜터에서 과목변경이 불가 입니다.';
			msgCall( msg );
			return false;
		}
		
		// 리얼 스피킹.
		if( hasCode( filterReal, code ) && msg.length==0 ){
			msg = '씽크 U 리얼스피킹 과목은 입회/과변 불가 입니다.';
			msgCall( msg );
			return false;
		}
		
		// 궁것질 제외.
		if( hasCode( filterGung, code ) && msg.length==0 ){
			msg = '궁것질 과목은 과목 변경을 할 수 없습니다.';
			msgCall( msg );
			return false;
		}
		
		
		// 2013.02.07	ypkim 과변 불가 과목 추가 filterNewWelFare1
		if (hasCode( filterNewWelFare1, code ) && msg.length==0)
		{
			msg = '과변 준비 중인 과목입니다.';
			msgCall( msg );
			return false;
		}
		
		if (hasCode( filterNewWelFare2, code ) && msg.length==0)
		{
			msg = '선택하신 과목은 아이튜터에서 과목변경이 불가 입니다.';
			msgCall( msg );
			return false;
		}
		
		
		// 책읽기 플러스 선택시 처리 *****************************************
		if( code==plusCode && msg.length==0 ){
			if( pageParams.ZMAT1!=bookCode && msg.length==0 ){
				msg = '책읽기2 과목이 없습니다. 책읽기 플러스 과목을 제외한 다른 과목을 선택하여 주십시요.';
				msgCall( msg );
			return false;
			}
		}
		
		
		// 변경할 과목이 기존과 같을때
		if( code==pageParams.ZMAT1 && msg.length==0 ){
			msg = "수강 중인 과목과 변경하려는 과목이 같습니다. 과목을 확인하여 주십시요.";
			msgCall( msg );
			return false;
		}

		
		// 첫번째 단계만 활성화
		if( hasCode(filterLv1, code) && msg.length==0 ){
			setAbleClassInfo( [true, true, false, false, false]  );
		}
		
		if( code==plusCode ){
			setAbleClassInfo( [true, false, false, false, false] );
		}
		
		// 단계 전체 비활성화 : 책읽기 - 책읽기2
		if( pageParams.ZMAT1=='000000000000001050' && msg.length==0 ){
			if( code=='000000000000001069' ){
				setAbleClassInfo( [true, false, false, false, false] );
			}
		}
		
		// 단계 전체 비활성화 : 책읽기2 - 책읽기
		if( pageParams.ZMAT1=='000000000000001069' && msg.length==0 ){
			if( code=='000000000000001050' ){
				setAbleClassInfo( [true, false, false, false, false] );
			}
		}
		
		
		
		
		// 선택에따른 결과처리.
		if(msg.length>0){
			msgCall( msg );
		}else{
			frmData.currentSbjIdx = frmData.subjectIdxList[code];
			levelLoad( code );
		}
	});
	
	// 단계선택시
	var i=1, len=4, listObj={}, lvId;
	for( ;i<=len;i+=1 ){
		lvId = 'JOIN_STEP'+String(i);
		listObj[ lvId ] = i;
		$( '#'+lvId ).change( function(){
			frmData.currentLvIdx = frmData.lvElIdxList[this.id];
			hosuLoad( $('#' + this.id + ' option:selected').val() );
		});
	};
	frmData.lvElIdxList = listObj;
	
	// 첫번째 호수 선택시
	$('#JOIN_STEP1_NUM').change( function(){
		if( !hasCode( filterMulti, frmData.subjectList[frmData.currentSbjIdx].code ) ){
			consecutiveLoad( $('#JOIN_STEP1_NUM option:selected').val() );
		}
	});
	
	// 전자펜 클릭시
	$('#JOIN_SALE').change(function(){
		if( $(this).is(':checked') ){
			$('#JOIN_SALE_PAY').removeAttr('disabled');
		}else{
			$('#JOIN_SALE_PAY').attr('checked', false);
			$('#JOIN_SALE_PAY').attr('disabled', 'disabled');
		};
	});
	
	// 달력 호출 이벤트
	$('#JOIN_DATE').click(function(){openCalendar();});
	$('#JOIN_DATE_BTN').click(function(){openCalendar();});
	
	// 수업시간
	$('#JOIN_TIME_TEXT').click(function(){openTime();});
	$('#JOIN_TIME_BTN').click(function(){openTime();});
	
	stdDay = 7;
	setDefaultInfo();
	setSubject(); // 과목 셀렉트 생성
	//setStudyTime(); // 수업시간 생성 - 변경으로 주석처리
	initDisplay(); // 초기화
	//
};

// 초기화 / 화면셋팅
var initDisplay = function(){
	resetSubject(); // 과목 초기화
	resetClassInfo(); // 단계 호수 사유 초기화
	// 
	setPeriod();    // 수업기간 설정
	setPen();		// 전자펜
	setSms();		// sms
	resetStudyTime(); // 수업시간 리셋
};

// 기본정보 - 변경전 수업정보
var setDefaultInfo = function(){
	$('#T_SUBJECT').html( pageParams.ZMAT1_TX );
	$('#T_LEVEL').html( pageParams.MATNR_TX );
	$('#T_JINDO').html( pageParams.JINDO_TX );
};


// 과목 / 단계 활성및 비활성
var setAbleClassInfo = function( $arr ){
	if( $arr[0] ){
		$('#JOIN_SUBJECT').removeAttr( 'disabled' );
	}else{
		$('#JOIN_SUBJECT').attr( 'disabled', 'disabled' );
	}
	//
	var i=1, len=4;
	for( ;i<=len;i+=1 ){
		if( $arr[i] ){
			$( '#JOIN_STEP'+i ).removeAttr( 'disabled' );
			$( '#JOIN_STEP' + i + '_NUM' ).removeAttr( 'disabled' );
		}else{
			$( '#JOIN_STEP'+i ).attr( 'disabled', 'disabled' );
			$( '#JOIN_STEP' + i + '_NUM' ).attr( 'disabled', 'disabled' );
		}
	}
};

// 단계 활성 / 비활성
var resetClassInfo = function() {
	$( '#JOIN_STEP'+i ).removeAttr( 'disabled' );
	$( '#JOIN_STEP' + i + '_NUM' ).removeAttr( 'disabled' );
	//
	var i=1, len=4;
	for( ;i<=len;i+=1 ){
		$( '#JOIN_STEP'+i ).empty();
		$( '#JOIN_STEP'+i ).append('<option value="select0" selected="selected">선택하세요</option>');
		$( '#JOIN_STEP' + i + '_NUM' ).empty();
		$( '#JOIN_STEP' + i + '_NUM' ).append('<option value="select0" selected="selected">선택하세요</option>');
	}
};

// 과목셀렉트 구성
var setSubject = function(){
	var list = frmData.subjectList;
	var obj;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
        
        
        
        
        //복_ 메뉴 추가 안함.
        //2013.03.04 NDH
        tmpCode =  obj.code.substr(-4,4);
        if(tmpCode == "1170" || tmpCode == "1171" || tmpCode == "1172"  ){
        }else{
        $('#JOIN_SUBJECT').append( '<option value="' + obj.code + '">' + obj.name + '</option>' );    
        }        
        
        
        
		//$('#JOIN_SUBJECT').append( '<option value="' + obj.code + '">' + obj.name + '</option>' );
	};
};
// 과목셀렉트 초기화
var resetSubject = function(){
	$('#JOIN_SUBJECT option[value=select0]').attr( 'selected', 'true' );
};

// 단계셀렉트 구성
var setLevel = function( $idx ){
	$( '#JOIN_STEP'+$idx ).empty();
	$( '#JOIN_STEP'+$idx ).append('<option value="select0" selected="selected">선택하세요</option>');
	//
	var list = frmData.levelData.T_EXPORTA;
	var obj;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
		
		$( '#JOIN_STEP'+$idx ).append( '<option value="' + obj.MATNR + '">' + obj.MAKTX + '</option>' );
	};
};

// 호수 셀렉트 구성
var setHosu = function( $idx ){
	$( '#JOIN_STEP' + $idx + '_NUM' ).empty();
	$( '#JOIN_STEP' + $idx + '_NUM' ).append('<option value="select0" selected="selected">선택하세요</option>');
	//
	var list = frmData.hosuData.T_EXPORTA;
	var obj;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
		$('#JOIN_STEP' + $idx + '_NUM').append( '<option value="' + obj.MATNR + '">' + obj.MAKTX + '</option>' );
	};
	//
};

// 멀티진도 구성
var setMultiJindo = function( $data ){
	if( !!$data ){
		var arr = $data.T_EXPORTA;
		var obj, idx, lvId, hsId;
		var i=0, len=arr.length;
		for( ;i<len;i+=1 ){
			obj = arr[i];
			idx = i+2;
			lvId = '#JOIN_STEP' + idx + ' option';
			hsId = '#JOIN_STEP' + idx + '_NUM option';
			setLevel( idx );
			setHosu( idx );
			
			$( lvId+'[value=' + obj.MATNR + ']' ).attr( 'selected', 'true' );
			$( hsId+'[value=' + obj.JINDO + ']' ).attr( 'selected', 'true' );
		}
	}
};


// 수업기간 설정
var setPeriod = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	//
	if( hasCode( filterLv1, code ) ){
		
		var fObj = $.extend( {}, filterThinkU, { '000000000000001154':'씽크U궁것질' } );
		if( hasCode( fObj, code ) ){
			stdDay = 5;
		}else{
			stdDay = 7;
		}
		
		$('#JOIN_PERIOD_INPUT_GROUP').addClass('none');
		$('#JOIN_PERIOD_SELECT_GROUP').removeClass('none');
		//
		var val = '', txt = '';
		var dt = new Date();
		var yy = dt.getFullYear();
		var dd = dt.getDate();
		var mm = dt.getMonth();
		var cUtil = new CalendarUtil();
		var days = [ '일', '월', '화', '수', '목', '금', '토' ];
		var day;
		
		$('#JOIN_PERIOD_SELECT').empty();
		$('#JOIN_PERIOD_SELECT').append( '<option value="select0">선택하세요</option>' );
		
		if( 1+stdDay>dd ){
			day = days[cUtil.getDateToWeek( yy, mm+1 , 15 )];
			val = String(yy) + '-' + String(mm+1) + '-' + String(15) + '-' + day;
			txt = String(yy) + '년' + String(mm+1) + '월' + String(15) + '일';
			$('#JOIN_PERIOD_SELECT').append( '<option value="'+val+'" >'+txt+'</option>' );
		}
		//day = days[cUtil.getDateToWeek( yy, mm+1 , 15 )];
		tmm = mm+2;
		if( tmm>12 ){
			tmm -= 12;
			yy += 1;
		}
		day = days[cUtil.getDateToWeek( yy, tmm , 15 )];
		val = String(yy) + '-' + String(tmm) + '-' + String(15) + '-' + day;
		txt = String(yy) + '년' + String(tmm) + '월' + String(15) + '일';
		$('#JOIN_PERIOD_SELECT').append( '<option value="'+val+'">'+txt+'</option>' );
		$('#JOIN_PERIOD_SELECT').on( 'change', function(){
			var tmpDtStr = $('#JOIN_PERIOD_SELECT option:selected').val();
			if( tmpDtStr!='select0' ){
				var tmpDtArr = tmpDtStr.split('-');
				$('#JOIN_PERIOD_SELECT_GROUP').find('#JOIN_DATE_PRINTDAY').val( tmpDtArr[3]+'요일' );
			}
		} );
		$($('#JOIN_PERIOD_SELECT option')[1]).attr('selected', 'selected');
		$('#JOIN_PERIOD_SELECT').trigger( 'change' );
	}else{
		$('#JOIN_PERIOD_SELECT').off( 'change' );
		$('#JOIN_PERIOD_SELECT_GROUP').addClass('none');
		$('#JOIN_DATE').val('');
		$('#JOIN_DATE_PRINTDAY').each(function(){
			$(this).val('');
		});
		$('#JOIN_PERIOD_INPUT_GROUP').removeClass('none');
	}
	
};

// 수업시간 설정
var setStudyTime = function(){
	$('#JOIN_TIME_HOUR').empty();
	$('#JOIN_TIME_HOUR').append( '<option value="select0" selected="selected">선택</option>' );
	i=0, len=24;
	for( ;i<len;i+=1 ){
		$('#JOIN_TIME_HOUR').append( '<option value="' + getDigitNum(i) + '">' + getDigitNum(i) + '</option>' );
	}
	
	$('#JOIN_TIME_MIN').empty();
	$('#JOIN_TIME_MIN').append( '<option value="select0" selected="selected">선택</option>' );
	i=0, len=60/10;
	for( ;i<len;i+=1 ){
		$('#JOIN_TIME_MIN').append( '<option value="' + getDigitNum(i*10) + '">' + getDigitNum(i*10) + '</option>' );
	}
};

// 수업시간 폼 초기화
var resetStudyTime = function(){
	$('#JOIN_TIME_TEXT').val('선택');
};

// 전자펜 설정
var setPen = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	//
	$('#JOIN_SALE').attr( 'checked', false );
	$('#JOIN_SALE_PAY').attr( 'checked', false );
	$('#JOIN_SALE_PAY').attr( 'disabled', 'disabled' );
	//
	if( hasCode( filterPen, code ) ){
		$('#PEN').removeClass( 'none' );
		$('#PAYTYPE').removeClass( 'none' );
		if( pageParams.PENCHK=="X" ){
			$('input:radio[name=JOIN_SALE_RETURN]').attr( 'checked', false );
			$('#PEN_RETURN').removeClass( 'none' );
		}
	}else{
		$('#PEN').addClass( 'none' );
		$('#PAYTYPE').addClass( 'none' ); 
		$('#PEN_RETURN').addClass( 'none' );
	}
};

//sms 설정
var setSms = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	$('#JOIN_SMS1 option:first').attr( 'selected', 'true' );
	$('#JOIN_SMS2 option:first').attr( 'selected', 'true' );
	if( hasCode( filterSms, code ) ){
		$('#SMS').removeClass( 'none' );
	}else{
		$('#SMS').addClass( 'none' );
	}
};

// 책일기 테이블 구성
var setBookTable = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	//
	$('#BOOK_TABLE_BODY').empty();
	if( code==plusCode ){
		if(!!frmData.bookData){
			var data = frmData.bookData.T_EXPORTA;
			$('#BOOK_TABLE').removeClass( 'none' );
			//
			var i=0, len=data.length, obj, markup='';
			for(;i<len;i+=1){
				obj = data[i];
				markup += '<tr>';
				//markup += '<td><input type="radio" name="JOIN_MODIFY_SEL" id="JOIN_MODIFY_SEL' + String(i+1) + '" value="' + String(i) + '" /></td>';
				//markup += '<td><label for="JOIN_MODIFY_SEL' + String(i+1) + '">' + obj.VBELN + '</label></td>';
				markup += '<td><label for="JOIN_MODIFY_SEL'+String(i+1)+'">'
				markup += '<input type="radio" name="JOIN_MODIFY_SEL" id="JOIN_MODIFY_SEL' + String(i+1) + '" value="' + String(i) + '" /></label></td>';
				markup += '<td><label for="JOIN_MODIFY_SEL' + String(i+1) + '">' + obj.VBELN + '</label></td>';
				markup += '<td>' + obj.MATNR_TX + '</td>';
				markup += '<td>' + obj.JINDO_TX + '</td>';
				markup += '</tr>'; 
			};
			$('#BOOK_TABLE_BODY').append( markup );
		}
	}else{
		$('#BOOK_TABLE').addClass( 'none' );
	}
}

// 책읽기 데이터 반환
var getCurrentBookData = function($idx){
	if(!!frmData.bookData){
		var data = frmData.bookData.T_EXPORTA[$idx];
	}
	return data;
}

// 달력호출
var openCalendar = function(){
	js_openCalendar();
};

// 달력 객체
var js_calendar = {
	IS_INIT : false,
	calDiv : null,
	calUi : null,
	currentYear : 0,
	currentMonth : 0,
	currentDay : 0,
	closeHandle : null,
	selectHandle : null, 
	dayTextList : ['일', '월', '화', '수', '목', '금', '토'],
	getToday : function(){
		var dt = new Date();
		var y = dt.getFullYear();
		var m = dt.getMonth() + 1;
		var d = dt.getDate();
		return { yy:y, mm:m, dd:d };
	},
	init : function( setting ){
		if( !!setting ){
			var that = js_calendar;
			
			if( setting.close!=undefined ){
				that.closeHandle = setting.close;
			}
			if( setting.select!=undefined ){
				that.selectHandle = setting.select;
			}
			//
			if( setting.selector!=undefined ){
				that.calDiv = $(setting.selector);
			}
			
			if( setting.uiSelector!=undefined ){
				that.calUi = $(setting.uiSelector);
			}
			
			
			var html = '';
			var i, len;
			html += '<table cellspacing="0">';
			html += '<colgroup>';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '<col style="width: 14%;" />';
            html += '</colgroup>';
			html += '<thead>';
			html += '<tr>';
			i = 0, len = that.dayTextList.length;
			for( ;i<len;i+=1 ){
				html += '<th>'+that.dayTextList[i]+'</th>';
			}
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
			html += '</tbody>';
			
			html += '</tfoot>';
			html += '</table>';
			that.calDiv.html(html);
		}
	},
	addEvent : function(){
		var that = js_calendar;
		that.calUi.find('#calCloseBtn').on( 'click', that.close );
		that.calUi.find('#calPrevBtn').on( 'click', that.prevMonth );
		that.calUi.find('#calNextBtn').on( 'click', that.nextMonth );
	},
	removeEvent :function(){
		var that = js_calendar;
		var $tbody = that.calDiv.find('tbody');
		$tbody.find('td').each( function(){
			if( $(this).hasClass('padding') ){
			}else{
				$(this).off( 'click', that.selectDate );
			}
		});
		that.calUi.find('#calCloseBtn').off( 'click', that.close );
		that.calUi.find('#calPrevBtn').off( 'click', that.prevMonth );
		that.calUi.find('#calNextBtn').off( 'click', that.nextMonth );
	},
	prevMonth : function(){
		var that = js_calendar;
		var mm = that.currentMonth -1;
		if( mm<1 ){
			mm = 12;
			that.currentYear -= 1;
		}
		
		that.currentMonth = mm;
		that.currentDay = 0;
		that.makeCalendar( that.currentYear, that.currentMonth, that.currentDay, true );
	},
	nextMonth : function(){
		var that = js_calendar;
		var mm = that.currentMonth +1;
		if( mm>12 ){
			mm = 1;
			that.currentYear += 1;
		}
		that.currentMonth = mm;
		that.currentDay = 0;
		that.makeCalendar( that.currentYear, that.currentMonth, that.currentDay, true );
	},
	selectDate : function( e ){
		e.stopPropagation();
		//
		var that = js_calendar;
		var cUtil = new CalendarUtil();
		var dayN = cUtil.getDateToWeek( Number(that.currentYear), Number(that.currentMonth), Number($(this).text()) );
		var yy = that.currentYear;
		var mm = that.getDigitNum( that.currentMonth );
		var dd = that.getDigitNum( $(this).text() );
		var day = that.dayTextList[dayN];
		//
		var selectDate = yy + '-' + mm + '-' + dd + '-' + day;
		that.selectHandle( selectDate );
	},
	close : function(){
		var that = js_calendar;
		that.removeEvent();
		if( !!that.closeHandle ){
			that.closeHandle();
		}
	},
	open : function( selector ){
		var that = js_calendar; 
		var today = that.getToday();
		that.currentYear = today.yy;
		that.currentMonth = today.mm;
		that.currentDay = today.dd;
		
		that.makeCalendar( that.currentYear, that.currentMonth, that.currentDay );
		that.addEvent();
	},
	makeCalendar : function( year, mon, date, opened ){
		//
		var that = js_calendar; 
		that.calUi.find('#calDateLabel').text( that.currentYear + '/' + that.getDigitNum( that.currentMonth ) );
		
		
		var today = that.getToday();
		//
		var $tbody = that.calDiv.find('tbody'); 
		
		var html='';
		var cUtil = new CalendarUtil();
		var fstDay = cUtil.getDateToWeek( year, mon, 1 );
		var totalDate = cUtil.getMonToDay( year, mon );
		var totalRowCnt = Math.ceil( (totalDate + fstDay) / 7 );
		
		var cnt=0;
		var i=0, len=totalRowCnt;
		var j, jLen;
		for( ;i<len;i+=1 ){
			
			html+='<tr>';
			j=cnt+1, jLen=j+7;
			if(i==0){
				jLen -= fstDay;
				if( fstDay>0 ){
					html+='<td class="padding" colspan="'+fstDay+'" ></td>';
				}
			}
			for(;j<jLen;j+=1){
				if( totalDate>=j ){
					html+='<td'
					if( that.currentDay==j ){
						html+=' class="today"';
					}
					html+='>';
					html+=j+'</td>';
					
				}
				cnt++;
			}
			if( (jLen-1)>totalDate ){
				html+='<td class="padding" colspan="'+( 7 - ((totalDate - (jLen - 7)) + 1) )+'" ></td>';
			}
			
			html+='</tr>';
		}
		
		if($.trim($tbody.html()).length>0){
			$tbody.find('td').each( function(){
				if( $(this).hasClass('padding') ){
				}else{
					$(this).off( 'click', that.selectDate );
				}
			});
			$tbody.empty();
		}
		
		$tbody.html(html);
		$tbody.find('td').each( function(){
			if( $(this).hasClass('padding') ){
			}else{
				$(this).on( 'click', that.selectDate );
			}
		});
	},
	getDigitNum : function( nstr ){
		if( Number(nstr)<10 ){
			return '0' + String(nstr);
		}else{
			return String(nstr);
		}
	}
}

// 달력 열기
var js_openCalendar = function(){
	if( js_calendar.IS_INIT==false){
		js_calendar.IS_INIT = true;
		js_calendar.init({
			close : function(){
				app_showBlind(false);
				//
				$('#Contents').removeClass( 'Jindo_Inquire' );
				$('#calendarContainer').addClass('none');
				$('#Contents').addClass( 'Join_Class' );
				$('#mainContainer').removeClass('none');
			},
			select : function( date ){
				if( setPickDate(date) ){
					js_calendar.close();
				}else{
				}
			},
			selector : '.js_calendar',
			uiSelector : '.pagingCalWrap'
		});
	};
	//
	app_showBlind(true);
	//
	$('#Contents').removeClass( 'Join_Class' );
	$('#mainContainer').addClass('none');
	getUrl('#Document');
	$('#Contents').addClass( 'Jindo_Inquire' );
	$('#calendarContainer').removeClass('none');
	//
	js_calendar.open();
}

// 시간 호출
var openTime = function(){
	
	var code = $('#JOIN_SUBJECT option:selected').val();
	var firstDate = "";
	if( hasCode( filterRead, code ) ){
		firstDate = $('#JOIN_PERIOD_SELECT option:selected').val();
	}else{
		firstDate = startDate;
	}
	var dt = firstDate.slice( 0, firstDate.lastIndexOf('-') );
	var dd = firstDate.slice( firstDate.lastIndexOf('-')+1, firstDate.length );
	var days = { '일':'7', '월':'1', '화':'2', '수':'3', '목':'4', '금':'5', '토':'6' };
	
	if( $.trim(firstDate).length==0 ){
		msgCall('학습일이 선택되지 않았습니다.');
		return false;
	}
	
	app_showBlind(true);
	
	$('#Document').css('padding-top', '34px');
	
	$('#Contents').removeClass( 'Join_Class' );
	$('#mainContainer').addClass('none');
	
	getUrl('#Document');
	
	$('#Header').removeClass('none');
	$('#Contents').addClass( 'Jindo_Inquire' );
	$('#subContainer').removeClass('none');
	
	setTimeTable(days[dd]);
}


// 스케쥴 화면 호출
var setTimeTable = function(dd){
	$('#Aside').click(function(){
		$('#Header').addClass('none');
		$('#Contents').removeClass( 'Jindo_Inquire' );
		$('#Contents').addClass( 'Join_Class' );
		app_showBlind(false);
		app_startLoading();
		refresh();
	});
	//
	var days = [ '일', '월', '화', '수', '목', '금', '토', '일' ];
	
	if(!!dd){
		$('#Header').find('h1').html( days[Number(dd)]+'요일');
	}else{
		$('#Header').find('h1').html( '' );
	}
	//
	scLoad(dd);
}

// 스케쥴 데이터 호출
var scLoad = function( daywk ){
	loader.load( {
        Function: "ZTBSD_GM_214_SC_LIST",
        Parameter: {
        	I_WEEK: 'N',
        	I_SORT: 'A',
        	I_DAYWK: daywk,
        	I_COLL: 'X'
        },
        Success: function($data){
        	var data = JSON.parse( $data ).Parameter;
        	if( !!data ){
        		scData = data.T_EXPORTC;
        	}
        	if( !!scData ){
        		scSortData( daywk );
        	}else{
        		timeTableDisplay();
        	}
        },
        Error: function($e){
        	timeTableDisplay();
        }
    });
};

// 스케쥴 데이터 정렬
var scSortData = function( daywk ){
	var list = {};
	var tmpTime, tmpMin, tmpQtimes;
	var obj;
	var i=0, len=scData.length;
	for( ;i<len;i+=1 ){
		obj = scData[i];
		//
		if( obj.DAYWK==daywk ){
			tmpQtimes = obj.QTIME.split(':');
			tmpTime = Number( tmpQtimes[0] );
			tmpMin = Math.floor( Number( tmpQtimes[1] ) )*0.1;
			//
			if( list[tmpTime]==undefined ){
				list[tmpTime] = [ '', '', '', '', '', '' ];
			}
			//
			if( list[tmpTime][tmpMin]=='' ){
				list[tmpTime][tmpMin] = obj.KUNWE_TX;
			}else{
				list[tmpTime][tmpMin] = '<br />' + obj.KUNWE_TX;
			}
		}
	}
	
	timeTableDisplay( list );
}

// 스케쥴 화면 구성
var timeTableDisplay = function( list ){
	if( list==undefined || list==null ){
		list = {};
	}
	var html = ''; 
	var timeStr='';
	var student='';
	var i=9, len=24;
	var j, jLen
	for( ;i<len;i+=1 ){
		timeStr = String(i);
		//
		html += '<tr>';
		html += '<td class="day_time">'+timeStr+'시</td>';
		//
		j=0;
		for( ;j<6;j+=1 ){
			student = '';
			classTxt = '';
			if( list[i]!=undefined ){
				student = list[i][j];
			}
			html += '<td class="hyper2" onclick="selectTimeHandle('+i+','+j+')" >'+student+'</td>';
		}
		html += '</tr>';
	};
	//
	$('#subContainer').find('tbody').html( html );
}

// 시간 선택시
var selectTimeHandle = function( t, m ){
	selectTime = String(t);
	selectMin = getDigitNum(m*10);
	//
	var msg = selectTime + '시' + selectMin + '분 으로 설정하시겠습니까'
	app_showConfirm(msg, '시간선택', 'selectOk', 'selectCancel');
}

// 선택한 시간 설정
var selectOk = function(){
	
	$('#Contents').removeClass( 'Jindo_Inquire' );
	$('#Header').addClass('none');
	$('#subContainer').addClass('none');
	
	$('#Contents').addClass( 'Join_Class' );
	$('#mainContainer').removeClass('none');
	
	$('#Document').css('padding-top', '0px');
	app_showBlind(false);
	
	
	var gb = "오전";
	var h = selectTime;
	if( Number(selectTime)>12 ){
		h = Number(selectTime) - 12;
	}
	if( Number(selectTime)>11 ){
		gb = "오후";
	}
	var t = gb + "-" + getDigitNum(h) + '-' + selectMin;
	setPickTime( t );
}

// 선택한 시간 사용안함
var selectCancel = function(){
	selectTime = '';
	selectMin = '';
}






// 객체가 속성명을 가지고 있는지 확인후 true, false 반환
var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

// 디지털숫자형태로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String($n);
	}else{
		return String($n);
	}
};

// 오늘 날짜 반환
var getTodayDate = function(){
	var date = new Date();
	var todayDate = String(date.getFullYear())+'-'+getDigitNum(String(date.getMonth()+1))+'-'+getDigitNum(String(date.getDate()));
	return todayDate;
}

// 첫 수업일 반환
var getStduyDate = function( code ){
	var sObj;
	var firstDate = "";
	if( hasCode( filterLv1, code ) ){
		firstDate = $('#JOIN_PERIOD_SELECT option:selected').val();
	}else{
		firstDate = startDate;
	}
	var dt = firstDate.slice( 0, firstDate.lastIndexOf('-') );
	var dd = firstDate.slice( firstDate.lastIndexOf('-')+1, firstDate.length );
	//
	if( firstDate.length==0 || firstDate=="select0" ){
	}else{
		sObj = {};
		//첫수업일
		var tdt = dt.split('-');
		sObj.LDATE = getDigitNum( tdt[0] ) + getDigitNum( tdt[1] ) + getDigitNum( tdt[2] );
		//수업요일
		var days = { '일':'7', '월':'1', '화':'2', '수':'3', '목':'4', '금':'5', '토':'6' };
		var tdd = days[dd]
		sObj.DAYWK = tdd;
		//첫수업일 GWLDT
		if( $('#JOIN_SALE' ).is(':checked') ){
			sObj.GWLDT_PEN = getDigitNum( tdt[0] ) + getDigitNum( tdt[1] ) + getDigitNum( tdt[2] );//첫수업일 전자펜일때여기에도 추가
		}
	}
	//
	return sObj;
}

// 수업시간 반환
var getStudyTime = function(){
	
	var sObj;
	if( $('#JOIN_TIME_TEXT').val()=='선택' || $('#JOIN_TIME_TEXT').val().length==0 ){
	}else{
		sObj = {};
		var arr = $('#JOIN_TIME_TEXT').val().split('-');
		var hour;
		if( arr[0]=='오후' ){
			hour = String( Number(arr[1]) + 12 );
		}else{
			hour = arr[1];
		}
		sObj.QTIME = hour + ":" + arr[2] + ":00";
	}
	
	return sObj;
}

//학습일 셋팅 :: 안드로이드에서 반환받음.
var setPickDate = function( $date ){
	
	var resetCal = function(){
		startDate = "";
		$('#JOIN_DATE').val('');
		$('#JOIN_DATE_PRINTDAY').each(function(){
			$(this).val('');
		});
	}
	
	var cUtil = new CalendarUtil();
	
	var date = new Date();
	var todayDate = String(date.getFullYear())+'-'+String(date.getMonth()+1)+'-'+String(date.getDate());
	
	var selDate = $date.slice( 0, $date.lastIndexOf('-') );
	var selDay = $date.slice( $date.lastIndexOf('-')+1, $date.length );
	
	var gab = cUtil.getTotalDay( selDate, todayDate );
	
	if( gab<=2 ){
		resetCal();
		msgCall( '2일 이후 부터 선택 가능합니다.' );
		//
		return;
	}
	
	var nextDate;
	if( String(date.getMonth()+2)>12 ){
		nextDate = String(date.getFullYear()+1)+'-'+String(1)+'-'+String(7);
	}else{
		nextDate = String(date.getFullYear())+'-'+String(date.getMonth()+2)+'-'+String(7);
	}
	gab = cUtil.getTotalDay( selDate, nextDate );
	
	//
	if( gab>1 ){
		resetCal();
		var mn = date.getMonth()+2;
		if(mn>12){
			mn = mn-12;
		}
		msgCall( String(mn) + '월 ' + '7일 이후는 선택이 불가능합니다.' );
		//
		return false;
	}
	
	
	
	//
	startDate = $date;
	var dates = $date.split('-');
	$('#JOIN_DATE').val( dates[0] + '년' + dates[1] + '월' + dates[2] + '일' );
	$('#JOIN_PERIOD_INPUT_GROUP').find('#JOIN_DATE_PRINTDAY').val( dates[3]+'요일' );
	
	return true;
};

// 학습시간셋팅 :: 디바이스에서 반환받음.
var setPickTime = function( $time ){
	$('#JOIN_TIME_TEXT').val( $time );
}

// 셀렉트 박스의 선택 여부 반환
var chkDefaultSelect = function( $code ){
	if( $code=='select0' ){
		return false;
	}else{
		return true;
	}
}

// 일반, 책읽기, 씽크U 구분 값 반환
var chkSubjectType = function( $code ){
	if( hasCode(filterRead, $code) ){
		return 1;
	}else if( hasCode(filterThinkU, $code) ){
		return 2;
	}else if( hasCode(filterCenter, $code) ){
		return 3;
	}else{
		return 0;
	}
}

// 변경 클릭시
var submitHandle = function(){
	var sObj = {};
	var code = $('#JOIN_SUBJECT option:selected').val();
	var i=0, len=0;
	
	if( !chkDefaultSelect(code) ){
		msgCall( '과목을 선택해 주세요.' );
		return false;
	}else{
		sObj.ZMAT1 = code;
	}
	
	// 책읽기 플러스 테이블 선택된것
	
	if( code==plusCode ){
		if( pageParams.ZMAT1!=bookCode ){
			msgCall( '책읽기2 과목이 없습니다. 책읽기 플러스 과목을 제외한 다른 과목을 선택하여 주십시요.' );
		}
	}
	
	
	if( pageParams.ZMAT1==bookCode && code==plusCode ){
		if( !!frmData.bookData ){
			if( $('input:radio[name=JOIN_MODIFY_SEL]').is(':checked') ){
				var bookIdx = Number( $('input:radio[name=JOIN_MODIFY_SEL]:checked').val() );
				var bdata = getCurrentBookData( bookIdx );
				sObj.VBELN_BP = bdata.VBELN;
			}else{
				msgCall( '책읽기2 과목의 진도를 선택해 주세요.' );
				return false;
			};
		}
	}
	
	if( code==plusCode ){
		if( $('input:radio[name=JOIN_MODIFY_SEL]').is(':checked') ){
			var bookIdx = Number( $('input:radio[name=JOIN_MODIFY_SEL]:checked').val() );
			var bdata = getCurrentBookData( bookIdx );
			sObj.VBELN_BP = bdata.VBELN;
		}else{
			msgCall( '책읽기2 과목의 진도를 선택해 주세요.' );
			return false;
		};
	}
	
	var lvKeyNm = [ "MATNR", "MATNR2", "MATNR3", "MATNR4" ];
	var hoKeyNm = [ "JINDO", "JINDO2", "JINDO3", "JINDO4" ];
	
	if( hasCode(filterLv1, code) || hasCode(filterMulti, code) ){
		len = 1;
	}else{
		len = 4;
	}

		
	var tmpObj = {
		'000000000000001050':'책읽기',
		'000000000000001069':'책읽기2'
	};
	if( hasCode(tmpObj, pageParams.ZMAT1) ){
		if( hasCode(tmpObj, code) ){
			len=0;
		}
	};
	
	if( code==plusCode ){
		len = 0;
	}
	
	i=1;
	for( ;i<=len;i+=1 ){
		if( $( '#JOIN_STEP'+i+' option:selected' ).val()=="select0" ){
			msgCall( '단계 및 호수를 확인하여 주십시오.' );
			return false;
		}else{
			sObj[lvKeyNm[i-1]] = $( '#JOIN_STEP'+i+' option:selected' ).val();
		}
		if( $( '#JOIN_STEP'+i+'_NUM option:selected' ).val()=="select0" ){
			msgCall( '단계 및 호수를 확인하여 주십시오.' );
			return false;
		}else{
			sObj[hoKeyNm[i-1]] = $( '#JOIN_STEP'+i+'_NUM option:selected' ).val();
		}
	}
	
	var dateObj = getStduyDate( code );
	if( !!dateObj ){
		//첫수업일
		sObj.LDATE = dateObj.LDATE;
		//수업요일
		sObj.DAYWK = dateObj.DAYWK;
		//첫수업일 GWLDT
		if( dateObj.GWLDT_PEN!=undefined ){
			sObj.GWLDT_PEN = dateObj.GWLDT_PEN;//첫수업일 전자펜일때여기에도 추가
		}
	}else{
		msgCall( '학습일을 선택하세요.' );
		return false;
	}
	
	//수업시간
	var timeObj = getStudyTime();
	if( !!timeObj ){
		sObj.QTIME = timeObj.QTIME;
	}else{
		msgCall( '학습시간을 선택하세요.' );
		return false;
	}
	
	// 씽크U SMS정책
	if( hasCode( filterSms, code ) ){
		if( $('#JOIN_SMS1 option:selected').val() == "select0" || $('#JOIN_SMS2 option:selected').val() == "select0" ){
			msgCall( '메세지를 선택하세요.' );
			return false;
		}else{
			sObj.CHO1 = $('#JOIN_SMS1 option:selected').val();
			sObj.CHO2 = $('#JOIN_SMS2 option:selected').val();
		}
	}
	
	if( hasCode( filterPen, code ) ){
		sObj.PENGB = ( $('#JOIN_SALE').is(':checked') )? "X" : " ";
		
		if(  $('#JOIN_SALE').is(':checked') ){
			sObj.AUGRU_PEN = ( $('#JOIN_SALE_PAY').is(':checked') )? "J02" : "J01";
		}else{
			sObj.AUGRU_PEN = " ";
		}
		
		if( pageParams.PENCHK=="X" ){
			if( $('input:radio[name=JOIN_SALE_RETURN]').is( ':checked' ) ){
				var banIdx = $('input:radio[name=JOIN_SALE_RETURN]:checked').val();
				if( banIdx=="0" ){
					sObj.BANGB = "Y";
				}else if( banIdx=="1" ){
					sObj.BANGB = "N";
				}else if( banIdx=="2" ){
					sObj.PENTR = "X";
				}
			}else{
				msgCall('전자펜 반납여부를 선택해 주세요.');
				return false;
			}
		}
	}

	//
	updateSubject( chkSubjectType( pageParams.ZMAT1 ), chkSubjectType( code ), sObj );
}

// 과목변경위해 타입별 분기
var updateSubject = function( beforeSbj, newSbj, sObj ){
	//ZTBSD_GM_020_001
	var a1 = beforeSbj==0 && newSbj==0;		// 일반 - 일반
	//ZTBSD_GM_025_002
	var b1 = beforeSbj==0 && newSbj==1,		// 일반 - 책읽기
	b2 = beforeSbj==1 && newSbj==1,			// 책읽기 - 책읽기
	b3 = beforeSbj==0 && newSbj==2,			// 일반 - 싱크U
	b4 = beforeSbj==2 && newSbj==1,			// 싱크U - 책읽기
	b5 = beforeSbj==3 && newSbj==2;			// 학습센터 - 싱크U
	//ZTBSD_GM_025_003
	var c1 = beforeSbj==1 && newSbj==0,		// 책읽기 - 일반
	c2 = beforeSbj==2 && newSbj==0,			// 싱크U - 일반
	c3 = beforeSbj==1 && newSbj==2;			// 책읽기 - 싱크U
	//ZTBSD_GM_025_004
	var d1 = beforeSbj==2 && newSbj==2,		// 싱크U - 싱크U
	d2 = beforeSbj==3 && newSbj==3;			// 학습센터 - 학습센터
	//
	if( a1 ){
		fn001(sObj);
	}else if( b1 || b2 || b3 || b4 || b5 ){
		fn002(sObj);
	}else if( c1 || c2 || c3 ){
		fn003(sObj);
	}else if( d1 || d2 ){
		fn004(sObj);
	}else{
		var msgList = ['일반', '책읽기', '씽크U', '학습센터']
		msgCall( msgList[beforeSbj] + '과목군은 ' + msgList[newSbj] + '과목군으로 과변 불가합니다' );
	}
};

// 데이터 유무에따라 반환
var insertValue = function( $val ){
	var val = ($val==undefined)? "" : $val;
	return val;
}

// B타입데이터
var getImportB = function( $type, fObj ){
	var sObj = {};
	//
	$.extend( sObj, {
		VBELN : pageParams.VBELN,
		REQGB : "31",
		ABRUD : getTodayDate().replace(/-/g,''),
		ZMAT1 : insertValue( fObj.ZMAT1 ),
		MATNR : insertValue( fObj.MATNR ),
		JINDO : insertValue( fObj.JINDO ),
		LDATE : insertValue( fObj.LDATE ),
		BANGB : insertValue( fObj.BANGB )
	});
	
	//
	if( $type!=2 ){
		$.extend( sObj, {
			VBELN_BP : insertValue( fObj.VBELN_BP )
		});
	}
	if( $type!=3 ){
		$.extend( sObj, {
			MATNR2 : insertValue( fObj.MATNR2 ),
			MATNR3 : insertValue( fObj.MATNR3 ),
			MATNR4 : insertValue( fObj.MATNR4 ),
			JINDO2 : insertValue( fObj.JINDO2 ),
			JINDO3 : insertValue( fObj.JINDO3 ),
			JINDO4 : insertValue( fObj.JINDO4 ),
			DAYWK : insertValue( fObj.DAYWK ),
			QTIME : insertValue( fObj.QTIME ),
			PENGB : insertValue( fObj.PENGB ),
			AUGRU_PEN : insertValue( fObj.AUGRU_PEN ),
			GWLDT_PEN : insertValue( fObj.GWLDT_PEN ),
			PENTR : insertValue( fObj.PENTR ),
			CHO1 : insertValue( fObj.CHO1 ),
			CHO2 : insertValue( fObj.CHO2 )
		} );
	}
	//
	

	return sObj;
}

// A타입데이터
var getImportA = function( $type ){
	var keys = [ "VBELN", "AUART", "AUART_N", "VKORG", "VTWEG", "KUNAG", "KUNWE", "AUGRU", "ZMAT1", "MTYPE_P", "MTYPE", "TUTOR", "ITUTOR", "IKUNNR", "AUDAT", "FBUDA", "FBUDE", "MATNR", "SPMAT", "STQTY", "DAYWK", "QTIME", "ANGDT", "BNDDT", "KNUMA", "USRID", "GDATE", "GJAMT", "GJMON", "KWMENG", "VRKME", "STCD1", "PSTLZ", "NAME1", "BAUID", "KUNDG", "INTRO", "ZZVIG", "BGRADE", "RDISCHK", "DISCHK" ];
	var sObj = {};
	var i=0, len=keys.length;
	for( ;i<len;i+=1 ){
		sObj[keys[i]] = "";
	}
	//
	var code = $('#JOIN_SUBJECT option:selected').val();
	var mtype = "041";
	switch( chkSubjectType(code) ){
	case 2 : //think
		mtype = "046";
		break;
	case 3 : //center
		mtype = "600";
		break;
	default :
		mtype = "041";
		break;
	}
	
	if( $type==2 ){
		if( !hasCode(filterRead, code) ){
			mtype = " ";
		}
	}
	
	
	var dateObj = getStduyDate( code );
	var timeObj = getStudyTime();
	//
	$.extend( sObj, {
		VBELN : pageParams.VBELN,
		AUART : pageParams.AUART,
		AUART_N : "ZC11",
		KUNWE : pageParams.KUNWE,
		MTYPE_P : pageParams.MTYPE,
		FBUDA : dateObj.LDATE
	});
	
	if ( $type == 1 || $type == 2 ){
		$.extend( sObj, {
			MTYPE : mtype
		});
	}
	
	if( $type!=3 ){
		$.extend( sObj, {
			DAYWK : dateObj.DAYWK,
			QTIME : timeObj.QTIME
		});
	}
	//
	
	return sObj;
}

// 일반 - 일반
var fn001 = function( params ){
	
	var S_IMPORTA = getImportB( 0, params );
	var data = {S_IMPORTA:S_IMPORTA};
	
	updateCall( 'ZTBSD_GM_020_001', data );
}

// 일반 - 책읽기
// 책읽기 - 책읽기
// 일반 - 싱크U
// 싱크U - 책읽기
// 학습센터 - 싱크U
var fn002 = function( params ){

	var S_IMPORTB = getImportB( 1, params );
	var S_IMPORTA = getImportA(1);
	var data = {S_IMPORTA:S_IMPORTA, S_IMPORTB:S_IMPORTB};
	
	updateCall( 'ZTBSD_GM_025_002', data );
}

// 책읽기 - 일반
// 싱크U - 일반
// 책읽기 - 싱크U
var fn003 = function( params ){

	var S_IMPORTB = getImportB( 2, params );
	var S_IMPORTA = getImportA(2);
	var data = {S_IMPORTA:S_IMPORTA, S_IMPORTB:S_IMPORTB};

	updateCall( 'ZTBSD_GM_025_003', data );
}

//싱크U - 싱크U
//학습센터 - 학습센터
var fn004 = function( params ){
	var S_IMPORTB = getImportB( 3, params );
	var S_IMPORTA = getImportA(3);
	var data = {S_IMPORTA:S_IMPORTA, S_IMPORTB:S_IMPORTB};
	
	updateCall( 'ZTBSD_GM_025_004', data );
}

// 과목변경
var updateCall = function( fn, data ){
	//app_startLoading();

	loader.load( {
        Function: fn,
        Parameter: data,
        Success: function($data){
        	//app_endLoading();
        	msgCall( '과목이 변경되었습니다', '', 'updateEndFn' );
        },
        Error: function($data){
        	//app_endLoading();
        	msgCall( $data );
        }
	});
}

// 과목변경후 확인 클릭시
var updateEndFn = function(){
	app_changePage( 'B010200.html', pageParams, false );
}


/** ===============================================================================================================
 * Util Function
 *  */

// 그래픽객체 폼 css관련함수
var resetInputGraphics = function( selector ){
	$('input.graphic').find( selector ).each(function(){
		var $form = $(this);
		var target = $form.attr('id');
		var $label = $('label[for="' + target + '"]');

		$label.find('>span:first')
		.find('>button').removeClass("graphic cbr-type").addClass(function(){
			if($form.is(':disabled')) return "disabled";
		}).addClass(function(){
			if($form.is(':checked')) return "check";
		}).parents('label').children().off('click').on('click', function(){
			if($.browser.msie && $.browser.version < 9) $form.toArray()[0].click();
		});
	});
};

// 디지털 숫자형으로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String(Number($n));
	}else{
		return String(Number($n));
	}
};

// 새로고침
var refresh = function(){
	window.location.href = 'B010400.html' + '?dummy=' + (Math.random() * Math.random());
}

// 메세지창 띄우기
var msgCall = function( $msg, $title, $callback ){
	app_alert( $msg, $title, $callback );
};









