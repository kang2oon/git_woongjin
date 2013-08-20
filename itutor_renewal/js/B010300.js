/**
 * 과목입회
 *  */

// 전 페이지에서 가지고 와야 하는데이터
var pageParams;

var bookCode = "000000000000001069";
var plusCode = "000000000000001084";
var gungCode = "000000000000001154";

//201308813 씽크유중등과목7가지 프로모션 할인이벤트등록  Ohj
var UengCode = "000000000000001177"; //씽크U중등영어
var UchaCode = "000000000000001178"; //씽크U중등중국어
var UjpaCode = "000000000000001179"; //씽크U중등일본어
var UkorCode = "000000000000001167"; //씽크U중등국어
var UsinCode = "000000000000001168"; //씽크U중등과학
var UsocCode = "000000000000001175"; //씽크U중등사회
var UhisCode = "000000000000001176"; //씽크U중등역사

var startDate = "";

var scData;
var selectTime = '';
var selectMin = '';

var prevVBELN="";

// 입회구분 :: 2에선 안되고 3은 이것만 됨
var filterSbj = {
		"000000000000001050":"책읽기",
		"000000000000001069":"책읽기2",
		"000000000000001088":"영어책읽기",
		"000000000000001084":"책읽기플러스",
		"000000000000001134":"쿠키쿠",
		"000000000000001150":"쿠키쿠플러스",
		"000000000000001159":"쿠키쿠 아기유치원",
		"000000000000001163":"쿠키쿠 아기유치원플러스"
};

// 입회구분 :: 2,3둘다 안됨
var filterSame = {
		"000000000000001152":'씽크U수학(S)',
		"000000000000001153":'씽크U과학(S)',
		"000000000000001073":"희망한글",
		"000000000000001113":"희망국어",
		"000000000000001154":"씽크U궁것질"
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
	"000000000000001177":"씽크U중등영어",
	"000000000000001178":"씽크U중등중국어",
	"000000000000001179":"씽크U중등일본어",
	"000000000000001167":"씽크U중등국어",
	"000000000000001168":"씽크U중등과학",
	"000000000000001175":"씽크U중등사회",
	"000000000000001176":"씽크U중등역사"
};

// 책읽기 과목군
// 2013.03.19	ypkim
// 깨치기아기유치원, 깨치기아기유치원플러스 추가
var filterRead = {
		'000000000000001050':'책읽기', 
		'000000000000001069':'책읽기2',
		'000000000000001084':'책읽기플러스',
		'000000000000001088':'영어책읽기',
		'000000000000001134':'쿠키쿠',
		'000000000000001150':'쿠키쿠플러스',
		'000000000000001159':'깨치기아기유치원',
		'000000000000001163':'깨치기아기유치원플러스'
};

//입회사유 

//20130715 OHJ
var filterMiddle = {
		'000000000000001177':'씽크U중등영어',
		'000000000000001178':'씽크U중등중국어',
		'000000000000001179':'씽크U중등일본어',
		'000000000000001167':'씽크U중등국어',
		'000000000000001168':'씽크U중등과학',
		'000000000000001175':'씽크U중등사회',
		'000000000000001176':'씽크U중등역사'
		
};

// 입회사유 007
var filterReason007 = {
	"000000000000001073":"희망한글",
	"000000000000001113":"희망국어"
};

// 입회사유 100
var filterReason100 = {
	"000000000000001130":"(센터)방학특강"
};

// 입회사유 006
var filterReason006 = {
	"000000000000001006":"한글깨치기",
	"000000000000001112":"(신)한글깨치기",
	"000000000000001001":"국어",
	"000000000000001090":"씽크U수학",
	"000000000000001000":"수학",
	"000000000000001022":"바로셈",
	"000000000000001056":"스마트영어",
	"000000000000001114":"씽크U사회과학"
};

// 전자펜 활성화 그룹
var filterPen = {
	'000000000000001056':'스마트영어',
	'000000000000001088':'영어책읽기',
	'000000000000001134':'쿠키쿠'
};

// SMS
var filterSms = {
	'000000000000001090' : '씽크U수학',
	'000000000000001131' : '씽크U국어',
	'000000000000001114' : '씽크U사회과학'
};

// 씽크U리얼스피킹(1), (2)
// 2013.03.19	ypkim
// 리얼스피킹Day(1), 리얼스피킹Day(2) 추가
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

// 희망국어, 희망 한글
var filterHope = {
		'000000000000001113' : '희망국어',
		'000000000000001073' : '희망한글'
};

// 기타
var filterTypeA = {
		'000000000000001152' : '씽크U수학(S)',
		'000000000000001153' : '씽크U과학(S)',
		'000000000000001154' : '씽크U궁것질'
};

// 씽크U 제한 과목
var filterThinkU = {
		"000000000000001152":"씽크U수학(S)",
		"000000000000001153":"씽크U과학(S)"
};

// 약정할인 과목
var filterDiscount = {
		'000000000000001090' : '씽크U수학',
		'000000000000001000' : '씽크빅수학' //'수학' 으로 나옴.
};


// 기본 학습일 리미트
var stdDay = 7;
// 선택 과목 단계 구분 Boolean
var isSubject = false;
// 페이지에서 사용할 데이터들
var frmData = {
		typeIdx : 1,
		subjectList : null,
		subjectIdxList : null,
		subjectData : null,
		levelData : null,
		hosuData : null,
		lvElIdxList: null,
		currentLvIdx: 1,
		currentSbjIdx: -1 
};


/** ===============================================================================================================
 * 페이지 로드후 호출
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
	/*
	$('h2:contains("입회유형")').click(function(){
		app_startLoading();
		refresh();
	});
	//*/
	
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
        		$(document).trigger( 'sapResultEvent', ['test'] );
        		 var sbjList = [];
                 var sbjIdxObj = {};
                 var exa = frmData.subjectData.T_EXPORTA;
                 // 2013.02.07	ypkim
                 // T_EXPORTB, T_EXPORTC 사용 안함.
//                 var exb = frmData.subjectData.T_EXPORTB;
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
                 // 2013.02.07	ypkim
                 // T_EXPORTB, T_EXPORTC 사용 안함.
                 // inObj(exb);
                 // inObj(exc);
                 
                 frmData.subjectList = sbjList;
                 frmData.subjectIdxList = sbjIdxObj;
                 
                 init();
        	}else{
        		//app_endLoading();
        		msgCall( "과목데이터가 없습니다." );
        	};
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( "과목데이터가 없습니다." );
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
            	//len=(data.T_EXPORTA.length<4)? data.T_EXPORTA.length : 4;
            	len = 4;
            	for( ;i<=len;i+=1 ){
            		setLevel(i);
            	}
        	}else{
        		//app_endLoading();
        		msgCall( "선택과목의 단계가 없습니다." );
        	}
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( "과목데이터가 없습니다." );
        }
    });
};

// 호수로드
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
        		//app_endLoading();
        		msgCall( "선택단계의 진도가 없습니다." );
        	}
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( "선택단계의 진도가 없습니다." );
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
  app_alert(data);
        	if( !!data ){
        		if( !hasCode( filterMulti, frmData.subjectList[frmData.currentSbjIdx].code ) ){
            		setMultiJindo( data );
            	}
        	}else{
        		//app_endLoading();
        		msgCall( "연속진도 데이터가 없습니다" );
        	}
        },
        Error: function($e){
        	//app_endLoading();
        	msgCall( "연속진도 데이터가 없습니다" );
        }
    });
};

// 이벤트 부여 / 디스플레이
var init = function(){
	
	// 입회유형 선택시
	$(":input[name=JOIN_CLASS]").change( function(){
		frmData.typeIdx = $(this).val();
		initDisplay();
	} );
	
	// 과목변경시
	$('#JOIN_SUBJECT').change( function(e){
		e.stopPropagation();
		e.preventDefault();
		
		stdDay = 7;
		resetReason();
		resetClassInfo(); // 단계 호수 사유 초기화
		setPen();		// 전자펜
		setSms();		// sms
		setPeriod();    // 수업기간 설정
		setStudyCnt();  // 수업횟수
		
		
		
		var msg = '';
		
		var newVal = $('#JOIN_SUBJECT option:selected').val();
		
		if( newVal == plusCode ){
			if( pageParams.ZMAT1 != bookCode ){
				msg = "선택할 수 없는 과목입니다.";
				msgCall( msg );
				return false;
			}
			
		}
			
		
		if( newVal == gungCode ){
			if( hasCode( filterThinkU, pageParams.ZMAT1 ) ){
			}else{
				msg = '궁것질 과목은 수업중 과목에서 sky 과목을 선택해야 합니다.';
				msgCall( msg );
				return false;
			}
		}
	
		
		// 입회종류에 따른 구분.
		if( getSubjectFilter( frmData.typeIdx, newVal ) ){
			frmData.currentSbjIdx = frmData.subjectIdxList[newVal];
			levelLoad( $('#JOIN_SUBJECT option:selected').val() );
		}else{
			msg = "선택할 수 없는 과목입니다.";
			msgCall( msg );
			return false;
		}
		
		// 리얼 스피킹.
		if( hasCode( filterReal, newVal ) ){
			msg = '씽크 U 리얼스피킹 과목은 입회/과변 불가입니다.';
			msgCall( msg );
			return false;
		}
		
		// 희망한글
		if( hasCode( filterHope, newVal ) ){
			$('#JOIN_CAUSE option[value=007]').attr( 'selected', 'true' );
			$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
		}
        
		//약정할인. 2013.04.29 NDH 추가중
		// 씽크U 수학, 씽크빅 수학, 한글깨치기
		if( hasCode( filterDiscount, newVal ) ){
		  $("#cDiscounts_li").removeClass("none");
		}else{
		  $("#cDiscounts_li").addClass("none");
          $("#cDiscounts_val").attr("checked",false);
		}
		
		//
		
		if( hasCode(filterRead, newVal) ){
			$('#JOIN_CAUSE option[value=040]').attr( 'selected', 'true' );
			$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
		}
		
		//20130715 OHJ
		if( hasCode( filterMiddle, newVal ) ){
			$('#JOIN_CAUSE option[value=502]').attr( 'selected', 'true' );
  		$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
	 	}
		
		// 첫번째 단계만 활성화
		if( hasCode(filterMulti, newVal) ){
			setAbleClassInfo( [true, true, false, false, false]  );
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
		if( !hasCode( filterMulti, frmData.subjectList[frmData.currentSbjIdx].code) ){
			consecutiveLoad( $('#JOIN_STEP1_NUM option:selected').val() );
		}
	});
	
	// 사유 선택시
	$('#JOIN_CAUSE').change( function(){
		var fObj;
		var bool=true;
		var msg = '';
		switch( $('#JOIN_CAUSE option:selected').val() ){
		case "007" :
			fObj = filterReason007;
			msg = '희망한글, 희망국어 과목만 선택가능합니다.';
			break;
		case "100" :
			fObj = filterReason100;
			msg = '방학특강 과목만 선택가능합니다.';
			break;
		case "006" :
			fObj = filterReason006;
			msg = '선택할수 없는 과목군입니다.';
			break;
		case "101" :
			fObj = null;
			if( Number(pageParams.CNT) > 0 ){
				msg = "현재 수업 중인 과목이 있습니다";
				bool = false;
			}
			break;
		// 2013.02.07	ypkim
		case "040" :
			fObj = filterRead;
			msg = "책읽기 과목군만 선택가능합니다.";
			break;
		case "502" :
		 fObj = filterMiddle;
		 msg = '중등과목만 선택가능합니다.';
		 break;
		default :
			fObj = null;
			bool = true;
			break;
		}
		
		if( fObj==null ){
		}else{
			if( fObj[frmData.subjectList[frmData.currentSbjIdx].code]==undefined  ){
				bool = false;
			}else{
				bool = true;
			}
		}
		
		
		if( bool ){
		}else{
			$('#JOIN_CAUSE option[value=select0]').attr( 'selected', 'true' );
			msgCall( msg );
		}
	} );
	
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
	
	$('#JOIN_TIME_TEXT').click(function(){openTime();});
	$('#JOIN_TIME_BTN').click(function(){openTime();});
	
	
	
	
	stdDay = 7;
	setSubject(); // 과목 셀렉트 생성
	//setStudyTime(); // 수업시간 생성 - 스케쥴 데이터 로드 추가하면서 주석처리
	initDisplay(); // 초기화
	
	
	$(":input#JOIN_CLASS" + frmData.typeIdx ).attr( "checked", true );
	//app_alert(frmdata.typeidx);
	
	// 이전단계에서 선택한 과목중 thinkU 과목이 있는지 확인.
	if( hasCode( filterThinkU, pageParams.ZMAT1 ) ){
		setAbleClassInfo( [false, false, false, false, false] )
		$('#JOIN_SUBJECT option[value=' + gungCode +']').attr( 'selected', 'true' );
		//
		$('#JOIN_CAUSE option[value=047]').attr( 'selected', 'true' );
		$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
		stdDay = 5;
		//
		isSubject = true;
	}
	
	

//	app_alert(frmdata.typeidx);
	
	// 지정과목이 책읽기플러스 일경우 단계호수 비활성화
	// 2013.03.15	ypkim
	if( pageParams.ZMAT1 == bookCode ){
			$(":input#JOIN_CLASS" + 1 ).attr( "checked", true );
	//app_alert("책선택");
		setAbleClassInfo( [false, false, false, false, false] )
		$('#JOIN_SUBJECT option[value=' + plusCode +']').attr( 'selected', 'true' );
		//
		
		setPeriod();
		$('#JOIN_CAUSE option[value=040]').attr( 'selected', 'true' );
		$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
		
		isSubject = true;
	}
		
	if( isSubject ){
		$(":input#JOIN_CLASS1").attr( 'disabled', 'disabled' );
		$(":input#JOIN_CLASS2").attr( 'disabled', 'disabled' );
		$(":input#JOIN_CLASS3").attr( 'disabled', 'disabled' );
	}
	
};


// 초기화 / 각부분 셋팅
var initDisplay = function(){
	if( !isSubject ){
		resetSubject(); // 과목 초기화
		resetClassInfo(); // 단계 호수 사유 초기화
	}
	// 
	setPeriod();    // 수업기간 설정
	setStudyCnt();  // 수업횟수
	setPen();		// 전자펜
	setSms();		// sms
	resetStudyTime(); // 수업시간 리셋
	resetReason();   // 사유
	
	//$('#Contents').removeClass('none');
};


// 과목및 단계 활성 / 비활성
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

// 입회유형에따라 단계 활성 / 비활성
var resetClassInfo = function() {
	var enable = 4;
	if( frmData.typeIdx==3 ){
		enable=1
	}else{
		enable=4;
	}
	
	var i=1, len=4;
	for( ;i<=len;i+=1 ){
		$( '#JOIN_STEP'+i ).empty();
		$( '#JOIN_STEP'+i ).append('<option value="select0" selected="selected">선택</option>');
		$( '#JOIN_STEP' + i + '_NUM' ).empty();
		$( '#JOIN_STEP' + i + '_NUM' ).append('<option value="sezlect0" selected="selected">선택</option>');
		if( i<=enable ){
			if( $( '#JOIN_STEP'+i ).is(':disabled') ){
				$( '#JOIN_STEP'+i ).removeAttr('disabled');
			}
			if( $( '#JOIN_STEP' + i + '_NUM' ).is(':disabled') ){
				$( '#JOIN_STEP' + i + '_NUM' ).removeAttr('disabled');
			}
		}else{
			$( '#JOIN_STEP'+i ).attr( 'disabled', 'disabled' );
			$( '#JOIN_STEP' + i + '_NUM' ).attr( 'disabled', 'disabled' );
		}
	}
	//
};

// 과목셋팅
var setSubject = function(){
	var list = frmData.subjectList;
	var obj;
    var tmpCode;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
        
        //복_ 메뉴 추가 안함.
        //2013.02.28 NDH
        tmpCode =  obj.code.substr(-4,4);	
				//20130813 OHJ 씽크유중등 해제     
         if(tmpCode == "1170" || tmpCode == "1171" || tmpCode == "1172"){ //||tmpCode=="1177" ||tmpCode=="1178"||tmpCode=="1179" ||tmpCode=="1167" ||tmpCode=="1168"  ||tmpCode=="1176"||tmpCode=="1175"){
         	
        }else{
        $('#JOIN_SUBJECT').append( '<option value="' + obj.code + '">' + obj.name + '</option>' );    
        }
		
        
	};
};

// 과목 셀렉트박스 초기화
var resetSubject = function(){
	$('#JOIN_SUBJECT option[value=select0]').attr( 'selected', 'true' );
};

// 단계 셀렉트 설정
var setLevel = function( $idx ){
	$( '#JOIN_STEP'+$idx ).empty();
	$( '#JOIN_STEP'+$idx ).append('<option value="select0" selected="selected">선택</option>');
	//
	var list = frmData.levelData.T_EXPORTA;
	var obj;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
		
		$( '#JOIN_STEP'+$idx ).append( '<option value="' + obj.MATNR + '">' + obj.MAKTX + '</option>' );
	};
};

// 호수 셀렉트 설정
var setHosu = function( $idx ){
	$( '#JOIN_STEP' + $idx + '_NUM' ).empty();
	$( '#JOIN_STEP' + $idx + '_NUM' ).append('<option value="select0" selected="selected">선택</option>');
	//
	var list = frmData.hosuData.T_EXPORTA;
	var obj;
	var i=0, len=list.length;
	for( ;i<len;i+=1 ){
		obj = list[i];
		$('#JOIN_STEP' + $idx + '_NUM').append( '<option value="' + obj.MATNR + '">' + obj.MAKTX + '</option>' );
	};
};

// 멀티진도 셋팅
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

// 입회사유 초기화
var resetReason = function(){
	
	if(frmData.typeIdx==3){
		$('#JOIN_CAUSE option[value=040]').attr( 'selected', 'true' );
		$('#JOIN_CAUSE').attr( 'disabled', 'disabled' );
	}else{
		$('#JOIN_CAUSE').removeAttr( 'disabled' );
		$('#JOIN_CAUSE option[value=select0]').attr( 'selected', 'true' );
	}
	
	
};

// 수업기간 셋팅
var setPeriod = function(){
	
	var code = $('#JOIN_SUBJECT option:selected').val();
	var fObj = $.extend( {}, filterRead, filterPen );
	if( hasCode( fObj, code ) ){
		$('#JOIN_PERIOD_INPUT_GROUP').addClass('none');
		$('#JOIN_PERIOD_SELECT_GROUP').removeClass('none');
		//
		var val = '', txt = '';
		var dt = new Date();
		var yy = dt.getFullYear();
		var dd = dt.getDate();
		var mm = dt.getMonth();
		var tmm;
		var cUtil = new CalendarUtil();
		var days = [ '일', '월', '화', '수', '목', '금', '토' ];
		var day;
		
		$('#JOIN_PERIOD_SELECT').empty();
		$('#JOIN_PERIOD_SELECT').append( '<option value="select0">선택</option>' );
		
		if( 1+stdDay>dd ){
			day = days[cUtil.getDateToWeek( yy, mm+1 , 15 )];
			val = String(yy) + '-' + getDigitNum(String(mm+1)) + '-' + String(15) + '-' + day;
			txt = String(yy) + '년' + String(mm+1) + '월' + String(15) + '일';
			$('#JOIN_PERIOD_SELECT').append( '<option value="'+val+'" >'+txt+'</option>' );
		}

		//day = days[cUtil.getDateToWeek( yy, mm+2 , 15 )];
		tmm = mm+2;
		if( tmm>12 ){
			tmm -= 12;
			yy += 1;
		}
		
		day = days[cUtil.getDateToWeek( yy, tmm , 15 )];
		val = String(yy) + '-' + getDigitNum(String(tmm)) + '-' + String(15) + '-' + day;
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

// 수업시간 셋팅
var setStudyTime = function(){
	$('#JOIN_TIME_HOUR').empty();
	$('#JOIN_TIME_HOUR').append( '<option value="select0" selected="selected">시간선택</option>' );
	i=0, len=24;
	for( ;i<len;i+=1 ){
		$('#JOIN_TIME_HOUR').append( '<option value="' + getDigitNum(i) + '">' + getDigitNum(i) + '</option>' );
	}
	
	$('#JOIN_TIME_MIN').empty();
	$('#JOIN_TIME_MIN').append( '<option value="select0" selected="selected">분선택</option>' );
	i=0, len=60/10;
	for( ;i<len;i+=1 ){
		$('#JOIN_TIME_MIN').append( '<option value="' + getDigitNum(i*10) + '">' + getDigitNum(i*10) + '</option>' );
	}
};

// 수업시간 초기화
var resetStudyTime = function(){
	$('#JOIN_TIME_TEXT').val('선택');
};

// 수업횟수 셋팅
var setStudyCnt = function(){
	
	if( $('#STUDY_CNT').find('.inline-group').length>0 ){
		$('#STUDY_CNT').find('.field').html('');
	}
	
	var fn_addInput = function( tp ){
		
		var label1 = '';
		var label2 = '';
		var val1 = '';
		var val2 = '';
		
		if( tp=='2' ){
			val1 = '26';
			val2 = '52';
			label1 = '26주';
			label2 = '52주';
		}else{
			val1 = '6';
			val2 = '12';
			label1 = '6개월';
			label2 = '12개월';
		}
		
		var html='';
		html += '<span class="inline-group">';
	    html += '<span class="item">';
	    html += '<input type="radio" name="JOIN_NUMBER" id="JOIN_NUMBER1" class="graphic" value="'+val1+'" /> <label for="JOIN_NUMBER1">'+label1+'</label>';
	    html += '</span>';
	    html += '<span class="item">';
	    html += '<input type="radio" name="JOIN_NUMBER" id="JOIN_NUMBER2" class="graphic" value="'+val2+'" /> <label for="JOIN_NUMBER2">'+label2+'</label>';
	    html += '</span>';
		html += '</span>';
		
		$('#STUDY_CNT').find('.field').append(html);
		
	}
	
	switch( String(frmData.typeIdx) ){
		case "2" :
			fn_addInput('2');
			$('#STUDY_CNT').removeClass('none');	
			break;
		case "3" :
			fn_addInput('3');
			$('#STUDY_CNT').removeClass('none');
			break;
		default :
			$('#STUDY_CNT').addClass('none');
			break;
	}
	

};

// 전자펜 부분 설정
var setPen = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	//
	$('#JOIN_SALE').attr( 'checked', false );
	$('#JOIN_SALE_PAY').attr( 'checked', false );
	//
	if( hasCode( filterPen, code ) ){
		$('#PEN').removeClass('none');
	}else{
		$('#PEN').addClass('none');
	}
};

// sms설정
var setSms = function(){
	var code = $('#JOIN_SUBJECT option:selected').val();
	$('#JOIN_SMS1 option:first').attr( 'selected', 'true' );
	$('#JOIN_SMS2 option:first').attr( 'selected', 'true' );
	if( hasCode( filterSms, code ) ){
		$('#SMS').removeClass('none');
	}else{
		$('#SMS').addClass('none');
	}
};

// 달력호출
var openCalendar = function(){
	// 달력형태로 변경하면서 주석처리
	//app_openCalendar( 'setPickDate' );
    
    
    //파라미터 추가
    //패키지 할인 과목 할인 적용 문제로 인한 모달창 띄우기
    //2013.02.19 NDH
   	template_package = $('#modal_package').html();
    
    package_dialog();

                
	js_openCalendar();
};

// 달력객체
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

// 학습일 열기
var openTime = function(){
	// 학습일 부분 스케쥴 연동으로 변경하면서 주석처리
	//app_openTime( 'setPickTime' );

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

// 학습 스케쥴 구성
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

// 스케쥴 데이터 조회
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

// 스케쥴 정렬
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

// 스케쥴 타임테이블 구성
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

// 시간 선택시 호출받을 함수
var selectTimeHandle = function( t, m ){
	selectTime = String(t);
	selectMin = getDigitNum(m*10);
	//
	var msg = selectTime + '시' + selectMin + '분 으로 설정하시겠습니까'
	app_showConfirm(msg, '시간선택', 'selectOk', 'selectCancel');
}

// 컨펌창 ok 핸들러
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

//컨펌창 cancle 핸들러
var selectCancel = function(){
	selectTime = '';
	selectMin = '';
}



// 입회 종류 구분시 선택 가능 과목인지 확인하여 true, false 반환
var getSubjectFilter = function( $idx, $code ){
	var bool = true;
	var fObj = null;
	
	/*switch( String($idx) ){
	case "2" :
		fObj = $.extend( {}, filterSame, filterSbj );
		
		if( fObj[$code]==undefined ){
			bool = true;
		}else{
			bool = false;
		}
		
		break;
	case "3" :
		
		if( filterSbj[$code]==undefined ){
			bool = false;
		}else{
			if( filterSame[$code]==undefined ){
				bool = true;
			}else{
				bool = false;
			}
		}
		
		break;
	default :
		bool = true;
		break;
	}*/
	switch( String($idx) ){
  
	case "2" :
		fObj = $.extend( {}, filterSame, filterSbj );
		
		if( fObj[$code] == undefined ){
			bool = true;
		}else{
			bool = false;
		}
		break;
	case "3" :
		if( filterSbj[$code]==undefined ){
			bool = false;
		}else{
			if( filterSame[$code]==undefined ){
				bool = true;
			}else{
				bool = false;
			}
		}
		break;
	default :
		bool = true;
		break;
	}
	
	return bool;
};

// 객체에 속성명이 있는지 비교 하여 true, false 반환
var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

// 디지털 형식 숫자로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String(Number($n));
	}else{
		return String(Number($n));
	}
};

	


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
	// 2013.02.07	ypkim
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




// 20130813 Ohj
// 씽크유중등과목 프로모션 팝업안내창 선택시 이벤트  
// 컨펌창 cancel 핸들러
var selectthinkUCancel = function(){
		app_changePage( 'B010200.html', pageParams, false );
		return false;
}
//컨펌창 Ok 핸들
var selectthinkUOk = function(){

		var S_IMPORTA = {};
 
    var tmpHJGIFT = "";
    var isCHK = $("#cDiscounts_val").attr("checked");
    var isNONE = $("#cDiscounts_li").hasClass("none");

    if(isNONE){
       tmpHJGIFT=""; //비활성
    }else{
        if(isCHK){
            tmpHJGIFT="X"; //검정료
        }else{
            tmpHJGIFT="O"; //활성
        }
    }    
    S_IMPORTA.HJGIFT = tmpHJGIFT;

    
	var code = $('#JOIN_SUBJECT option:selected').val();
	
	// 문서유형(구분) 입회유형(일반, 장기, 책읽기) ZC11, ZC17, ZC17
	S_IMPORTA.AUART = ($('input[name=JOIN_CLASS]:checked').val()=="1")? "ZC11" : "ZC17";
	
	// 펜구매 체크시 다음달 15일로 고정해서
	// 펜구매( "X":구매, " ":비구매 ) / 할부유무( J01:일시불,  J02: 할부 )
	S_IMPORTA.PENGB = ( $('#JOIN_SALE').is(':checked') )? "X" : " ";
	
	if(  $('#JOIN_SALE').is(':checked') ){
		S_IMPORTA.AUGRU_PEN = ( $('#JOIN_SALE_PAY').is(':checked') )? "J02" : "J01";
	}else{
		S_IMPORTA.AUGRU_PEN = " ";
	}
	
	var len;
	if( hasCode(filterMulti, code) ){
		len = 1;
	}else{
		len = 4;
	}
	
	if( code==plusCode ){
	}else{
		var lvKeyNm = [ "MATNR", "MATNR2", "MATNR3", "MATNR4" ];
		var hoKeyNm = [ "SPMAT", "SPMAT2", "SPMAT3", "SPMAT4" ];
		var i=1;
		for( ;i<=len;i+=1 ){
			if( $( '#JOIN_STEP'+i+' option:selected' ).val()=="select0" ){
				msgCall( '단계 및 호수를 확인하여 주십시오.' );
				return false;
			}else{
				S_IMPORTA[lvKeyNm[i-1]] = $( '#JOIN_STEP'+i+' option:selected' ).val();
			}
			if( $( '#JOIN_STEP'+i+'_NUM option:selected' ).val()=="select0" ){
				msgCall( '단계 및 호수를 확인하여 주십시오.' );
				return false;
			}else{
				S_IMPORTA[hoKeyNm[i-1]] = $( '#JOIN_STEP'+i+'_NUM option:selected' ).val();
			}
		}
	}
	// 씽크U SMS정책
	S_IMPORTA.CHO1 = ' ';
	S_IMPORTA.CHO2 = ' ';
	if( hasCode( filterSms, code ) ){
		if( $('#JOIN_SMS1 option:selected').val() == "select0" || $('#JOIN_SMS2 option:selected').val() == "select0" ){
			msgCall( '메세지를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.CHO1 = $('#JOIN_SMS1 option:selected').val();
			S_IMPORTA.CHO2 = $('#JOIN_SMS2 option:selected').val();
		}
	}
	
	
	// 학습일
	var firstDate = "";
	if( hasCode( filterRead, code ) ){
		firstDate = $('#JOIN_PERIOD_SELECT option:selected').val();
	}else{
		firstDate = startDate;
	}
	var dt = firstDate.slice( 0, firstDate.lastIndexOf('-') );
	var dd = firstDate.slice( firstDate.lastIndexOf('-')+1, firstDate.length );
	
	//
	if( firstDate.length==0 || firstDate=="select0" ){
		msgCall( '학습일을 선택하세요.' );
		return false;
	}else{
		//첫수업일
		S_IMPORTA.FBUDA = dt.replace(/-/g, '');

		//수업요일
		var days = { '일':'7', '월':'1', '화':'2', '수':'3', '목':'4', '금':'5', '토':'6' };
		var tdd = days[dd]
		S_IMPORTA.DAYWK = tdd;
		//첫수업일 GWLDT
		S_IMPORTA.GWLDT_PEN = ' ';
		if( $('#JOIN_SALE' ).is(':checked') ){
			S_IMPORTA.GWLDT_PEN = dt.replace(/-/g, '');//첫수업일 전자펜일때여기에도 추가
		}
	}
	
	//수업시간 ****************************
	if( $('#JOIN_TIME_TEXT').val()=='선택' || $('#JOIN_TIME_TEXT').val().length==0 ){
		msgCall( '학습시간을 선택하세요.' );
		return false;
	}else{
		var arr = $('#JOIN_TIME_TEXT').val().split('-');
		var hour;
		if( arr[0]=='오후' ){
			hour = String( Number(arr[1]) + 12 );
		}else{
			hour = arr[1];
		}
		S_IMPORTA.QTIME = hour + ":" + arr[2] + ":00";
	}
	/* 이전 학습시간 선택 체크
	if( $('#JOIN_TIME_HOUR option:selected').val()=='select0' || $('#JOIN_TIME_MIN option:selected').val()=='select0' ){
		msgCall( '학습시간을 선택하세요.' );
		return false;
	}else{
		S_IMPORTA.QTIME = $('#JOIN_TIME_HOUR option:selected').val() + ":" + $('#JOIN_TIME_MIN option:selected').val() + ":00";
	}
	*/
	
	//수업횟수(체험학습) ****************************
	if( String(frmData.typeIdx)=="1" ){
	}else{
		if( $('input[name=JOIN_NUMBER]:checked').val() == undefined ){
			msgCall( '수업횟수를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.STQTY = $('input[name=JOIN_NUMBER]:checked').val();
		}
	}

	//입회사유
	S_IMPORTA.MTYPE = " ";
	S_IMPORTA.VBELN_BP = " ";
	if( code==plusCode ){
		S_IMPORTA.VBELN_BP = pageParams.VBELN; // 판매 관리 문서 번호 
	}else{
		if( $('#JOIN_CAUSE option:selected').val() == "select0" ){
			msgCall( '입회사유를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.MTYPE = $('#JOIN_CAUSE option:selected').val();
		}
	}
	
	// 회원조회
	
	S_IMPORTA.BSTCD1 = pageParams.STCD1; //주민등록번호 STCD1
	S_IMPORTA.PSTLZ = pageParams.PSTLZ; //우편번호 PSTLZ 
	S_IMPORTA.NAME1 = pageParams.NAME1; //이름 NAME1
	S_IMPORTA.KUNWE = pageParams.KUNWE;// 납품처 회원번호 자녀코드 KUNWE
	S_IMPORTA.KUNAG = pageParams.KUNNR;// 판매처 : 보호자 번호 (앞에서 넘어온 KUNNR)
	//S_IMPORTA.MTYPE = pageParams.MTYPE
	
	S_IMPORTA.SLEVT = ' ' // 이벤트 선물건
	
	
	// 결재관련 이전 정보가 있으면 " " 으로 전송
	S_IMPORTA.BANKL = pageParams.BANKL;// 은행 키
	S_IMPORTA.BANKN = pageParams.BANKN;// 은행 계정 정보 
	S_IMPORTA.KOINH = pageParams.KOINH;// 계정 보유자 명
	S_IMPORTA.ATDAT = pageParams.ATDAT;// 자동이체일
	
	// 지정
	S_IMPORTA.VKORG = "1000";// 판매조직 
	S_IMPORTA.VTWEG = "10";// 유통경로
	
	
	// 증빙 - 현재 날짜(YYYYMMDD)
	var date = new Date();
	S_IMPORTA.AUDAT = String(date.getFullYear())+getDigitNum( String(date.getMonth()+1) )+ getDigitNum(String(date.getDate()) );
	
	addClass( { S_IMPORTA:S_IMPORTA } );

}

// 저장 버튼 클릭
var submitHandle = function(){

//20130813 OHJ 씽크유 중등 프로모션 이벤트
  var PrevVbeln =pageParams.VBELN;   
  var msg = '회비할인 패키지를 적용 안하고 등록 하시겠습니까?';
  var newVal = $('#JOIN_SUBJECT option:selected').val();
	var S_IMPORTA = {};
 
 //기존의 입회는 그대로 진행
 	if(pageParams.ZMAT1 == ' '){
 			//	app_alert('basic save');
 	}
 	//이전 010200 페이지에서 라디오 버튼을 선택한 씽크유중등 과목이 있을때
 	if( pageParams.ZMAT1 == UengCode  || pageParams.ZMAT1 ==UchaCode || pageParams.ZMAT1 == UjpaCode ||
				 pageParams.ZMAT1 ==UkorCode || pageParams.ZMAT1 == UsinCode || pageParams.ZMAT1 == UsocCode || pageParams.ZMAT1 == UhisCode){
 		
 				// 이전에서 선택된 값들이므로 그냥 그대로 저장됨
 	//이전 과목중 중등 프로모션에 해당하는 과목을 들었으나 라디오버튼을 택하지 않고 온 경우
 	}else{
					if( pageParams.ZMAT1 != newVal){
							app_showConfirm(msg, '회비할인 패키지 안내', 'selectthinkUOk', 'selectthinkUCancel');
			 			  return ;
					}
	}
		
		
    //약정할인 체크 2014.04.20 NDH
    var tmpHJGIFT = "";
    var isCHK = $("#cDiscounts_val").attr("checked");
    var isNONE = $("#cDiscounts_li").hasClass("none");

    if(isNONE){
       tmpHJGIFT=""; //비활성
    }else{
        if(isCHK){
            tmpHJGIFT="X"; //검정료
        }else{
            tmpHJGIFT="O"; //활성
        }
    }    
    S_IMPORTA.HJGIFT = tmpHJGIFT;

    
	var code = $('#JOIN_SUBJECT option:selected').val();
	
	// 문서유형(구분) 입회유형(일반, 장기, 책읽기) ZC11, ZC17, ZC17
	S_IMPORTA.AUART = ($('input[name=JOIN_CLASS]:checked').val()=="1")? "ZC11" : "ZC17";
	
	// 펜구매 체크시 다음달 15일로 고정해서
	// 펜구매( "X":구매, " ":비구매 ) / 할부유무( J01:일시불,  J02: 할부 )
	S_IMPORTA.PENGB = ( $('#JOIN_SALE').is(':checked') )? "X" : " ";
	
	if(  $('#JOIN_SALE').is(':checked') ){
		S_IMPORTA.AUGRU_PEN = ( $('#JOIN_SALE_PAY').is(':checked') )? "J02" : "J01";
	}else{
		S_IMPORTA.AUGRU_PEN = " ";
	}
	
	var len;
	if( hasCode(filterMulti, code) ){
		len = 1;
	}else{
		len = 4;
	}
	
	if( code==plusCode ){
	}else{
		var lvKeyNm = [ "MATNR", "MATNR2", "MATNR3", "MATNR4" ];
		var hoKeyNm = [ "SPMAT", "SPMAT2", "SPMAT3", "SPMAT4" ];
		var i=1;
		for( ;i<=len;i+=1 ){
			if( $( '#JOIN_STEP'+i+' option:selected' ).val()=="select0" ){
				msgCall( '단계 및 호수를 확인하여 주십시오.' );
				return false;
			}else{
				S_IMPORTA[lvKeyNm[i-1]] = $( '#JOIN_STEP'+i+' option:selected' ).val();
			}
			if( $( '#JOIN_STEP'+i+'_NUM option:selected' ).val()=="select0" ){
				msgCall( '단계 및 호수를 확인하여 주십시오.' );
				return false;
			}else{
				S_IMPORTA[hoKeyNm[i-1]] = $( '#JOIN_STEP'+i+'_NUM option:selected' ).val();
			}
		}
	}
	
	
	// 씽크U SMS정책
	S_IMPORTA.CHO1 = ' ';
	S_IMPORTA.CHO2 = ' ';
	if( hasCode( filterSms, code ) ){
		if( $('#JOIN_SMS1 option:selected').val() == "select0" || $('#JOIN_SMS2 option:selected').val() == "select0" ){
			msgCall( '메세지를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.CHO1 = $('#JOIN_SMS1 option:selected').val();
			S_IMPORTA.CHO2 = $('#JOIN_SMS2 option:selected').val();
		}
	}
	
	
	// 학습일
	var firstDate = "";
	if( hasCode( filterRead, code ) ){
		firstDate = $('#JOIN_PERIOD_SELECT option:selected').val();
	}else{
		firstDate = startDate;
	}
	var dt = firstDate.slice( 0, firstDate.lastIndexOf('-') );
	var dd = firstDate.slice( firstDate.lastIndexOf('-')+1, firstDate.length );
	
	//
	if( firstDate.length==0 || firstDate=="select0" ){
		msgCall( '학습일을 선택하세요.' );
		return false;
	}else{
		//첫수업일
		S_IMPORTA.FBUDA = dt.replace(/-/g, '');

		//수업요일
		var days = { '일':'7', '월':'1', '화':'2', '수':'3', '목':'4', '금':'5', '토':'6' };
		var tdd = days[dd]
		S_IMPORTA.DAYWK = tdd;
		//첫수업일 GWLDT
		S_IMPORTA.GWLDT_PEN = ' ';
		if( $('#JOIN_SALE' ).is(':checked') ){
			S_IMPORTA.GWLDT_PEN = dt.replace(/-/g, '');//첫수업일 전자펜일때여기에도 추가
		}
	}
	
	//수업시간 ****************************
	if( $('#JOIN_TIME_TEXT').val()=='선택' || $('#JOIN_TIME_TEXT').val().length==0 ){
		msgCall( '학습시간을 선택하세요.' );
		return false;
	}else{
		var arr = $('#JOIN_TIME_TEXT').val().split('-');
		var hour;
		if( arr[0]=='오후' ){
			hour = String( Number(arr[1]) + 12 );
		}else{
			hour = arr[1];
		}
		S_IMPORTA.QTIME = hour + ":" + arr[2] + ":00";
	}
	/* 이전 학습시간 선택 체크
	if( $('#JOIN_TIME_HOUR option:selected').val()=='select0' || $('#JOIN_TIME_MIN option:selected').val()=='select0' ){
		msgCall( '학습시간을 선택하세요.' );
		return false;
	}else{
		S_IMPORTA.QTIME = $('#JOIN_TIME_HOUR option:selected').val() + ":" + $('#JOIN_TIME_MIN option:selected').val() + ":00";
	}
	*/
	
	//수업횟수(체험학습) ****************************
	if( String(frmData.typeIdx)=="1" ){
	}else{
		if( $('input[name=JOIN_NUMBER]:checked').val() == undefined ){
			msgCall( '수업횟수를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.STQTY = $('input[name=JOIN_NUMBER]:checked').val();
		}
	}
	
	//입회사유
	S_IMPORTA.MTYPE = " ";
	S_IMPORTA.VBELN_BP = " ";
	if( code==plusCode ){
		S_IMPORTA.VBELN_BP = pageParams.VBELN; // 판매 관리 문서 번호 
	}else{
		if( $('#JOIN_CAUSE option:selected').val() == "select0" ){
			msgCall( '입회사유를 선택하세요.' );
			return false;
		}else{
			S_IMPORTA.MTYPE = $('#JOIN_CAUSE option:selected').val();
		}
	}
	
	// 회원조회
	
	S_IMPORTA.BSTCD1 = pageParams.STCD1; //주민등록번호 STCD1
	S_IMPORTA.PSTLZ = pageParams.PSTLZ; //우편번호 PSTLZ 
	S_IMPORTA.NAME1 = pageParams.NAME1; //이름 NAME1
	S_IMPORTA.KUNWE = pageParams.KUNWE;// 납품처 회원번호 자녀코드 KUNWE
	S_IMPORTA.KUNAG = pageParams.KUNNR;// 판매처 : 보호자 번호 (앞에서 넘어온 KUNNR)
	//S_IMPORTA.MTYPE = pageParams.MTYPE
	
	S_IMPORTA.SLEVT = ' ' // 이벤트 선물건
	
	
	// 결재관련 이전 정보가 있으면 " " 으로 전송
	S_IMPORTA.BANKL = pageParams.BANKL;// 은행 키
	S_IMPORTA.BANKN = pageParams.BANKN;// 은행 계정 정보 
	S_IMPORTA.KOINH = pageParams.KOINH;// 계정 보유자 명
	S_IMPORTA.ATDAT = pageParams.ATDAT;// 자동이체일
	
	// 지정
	S_IMPORTA.VKORG = "1000";// 판매조직 
	S_IMPORTA.VTWEG = "10";// 유통경로
	
	
	// 증빙 - 현재 날짜(YYYYMMDD)
	var date = new Date();
	S_IMPORTA.AUDAT = String(date.getFullYear())+getDigitNum( String(date.getMonth()+1) )+ getDigitNum(String(date.getDate()) );


	// OHJ 	20130813 씽크유중등 과목 프로모션 해당 과목의 값들은 다시 가입번호를 입력해서 넘겨줘야한다.
	if( pageParams.ZMAT1 == UengCode  || pageParams.ZMAT1 ==UchaCode || pageParams.ZMAT1 == UjpaCode ||
				 pageParams.ZMAT1 ==UkorCode || pageParams.ZMAT1 == UsinCode || pageParams.ZMAT1 == UsocCode || pageParams.ZMAT1 == UhisCode){ 		
 		S_IMPORTA.VBELN_BP = PrevVbeln;
	}

	addClass( { S_IMPORTA:S_IMPORTA } );
};

	
  
// 과목추가
var addClass = function( $param ){
	loader.load( {
        Function: "ZTBSD_GM_001_002",
        Parameter: $param,
        Success: function($data){
            msgCall( '입회성공', '', 'addEndFn' );
        },
        Error: function($e){
        	msgCall( $e );
        }
    });
};

// 과목추가후 메세지창 확인 클릭시 호출
var addEndFn = function(){
	app_changePage( 'B010200.html', pageParams, false );
}



//@ 패키지 할인 주의 모달창 2013.02.19 NDH
var package_dialog = function() {

	app_showBlind(true);
	$('#Dialog').empty();
	$('#Dialog').append( template_package );
	//
			$('#Dialog').modal({
				opacity : 50,
				overlayCss : {
					backgroundColor : "#dad8d1"
                    //background : url('../image/bg_Document.png') no-repeat center top;
				}
			});

}

// 패키지 할인 주의 모달창 닫기 2013.02.19 NDH
var modal_package_close = function(){
	$.modal.close();
	app_showBlind(false);
};



/** ===============================================================================================================
 * Util Function
 *  */

// 그래픽 폼 셋팅 css관련
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

// 디지털 형식 숫자로 반환
var getDigitNum = function( $n ){
	if( Number($n)<10 ){
		return '0' + String($n);
	}else{
		return String($n);
	}
};


// 새로고침
var refresh = function(){
	window.location.href = 'B010300.html' + '?dummy=' + (Math.random() * Math.random());
}


// 메세지 창 열기
var msgCall = function( $msg, $title, $callback ){
	app_alert( $msg, $title, $callback );
};


