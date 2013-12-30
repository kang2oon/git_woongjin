/** 
 * 
 * 회원정보 상세
 * 
 *  */



//페이지 파라미터를 담을 변수
var pageParams;

//과목변경시 라디오 버튼 생성할 과목 코드
var filterCheck = {
		"000000000000001069":"책읽기2",
		'000000000000001152':'씽크U수학(S)',
		'000000000000001153':'씽크U과학(S)',
		"000000000000001177":"씽크U중등영어",
		"000000000000001178":"씽크U중등중국어",
		"000000000000001179":"씽크U중등일본어",
		"000000000000001167":"씽크U중등국어",
		"000000000000001168":"씽크U중등과학",
		"000000000000001175":"씽크U중등사회",
		"000000000000001176":"씽크U중등역사"
};

//회원기본정보데이터
var memberData = null;

//회원상세정보데이터
var memberDetailData = null;

//학년정보데이터
var classData = null;

//기본이미지 url
var noImgUrl = '../image/null_noimage_portrait.8bit.png';

var IS_PAYMENT = false;

//우편번호, 과목변경, 과목입회, 사진변경, 휴회, 진도변경,
//1, 2, 3, 4, 5, 6
var SAVE_TYPE = '';

var IS_CHECKING_ACCOUNT = false;

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
		$data = $data.replace(/'/g, '"');
		pageParams = JSON.parse( $data );
	
		//
		init();
	};
};

/** ===============================================================================================================
 * 초기실행
 *  */
var init = function(){
	app_changeTitle( pageParams.NAME1 );

	memberLoad();
};


/** ===============================================================================================================
 * 회원정보 로드
 *  */

var memberLoad = function(){
	loader.load( {
		Function: "ZTBSD_GM_005_004",
		Parameter: {
			NAME1: pageParams.NAME1,	
			KUNWE: pageParams.KUNWE,
			M502D_H:pageParams.M502D_H
		},
		Success: function($data){
			
;			

			if( !!$data && $data.replace(/\s/g,'').length>0 ){
				var data = JSON.parse( $data ).Parameter;

			//var k = data.M502D_H;
			//alert(k);
				if( !!data ){
					memberData = data.T_EXPORTA;
					
		
					var vbeln = memberData[0].VBELN;

			if( memberData.length > 0 ){
						IS_PAYMENT = false;
					}else{
						IS_PAYMENT = true;
					}

					memberDetailLoad( vbeln );
				}else{
					//
					msgCall(" 회원정보를 불러오지 못했습니다. \n  다시 시도해 주세요. ");
				}
			}else{
				//
				msgCall(" 회원정보를 불러오지 못했습니다. \n  다시 시도해 주세요. ");
			}
		},
		Error: function($e){
			msgCall(" 회원정보를 불러오지 못했습니다. \n  다시 시도해 주세요. ");
		}
	});
};

/** ===============================================================================================================
 * 회원상세정보 로드
 *  */

var memberDetailLoad = function( $vbeln ){
	loader.load( {
		Function: "ZTBSD_GM_001_012",
		Parameter: {
			VBELN: $vbeln
		},
		Success: function($data){
			if( !!$data && $data.replace(/\s/g,'').length>0 ){
				memberDetailData = JSON.parse( $data ).Parameter.S_EXPORTA;

				if( !!memberDetailData ){
					classLoad();
				}else{
					msgCall("회원상세정보를 조회하지 못했습니다.");
				}
			}else{
				msgCall("회원상세정보를 조회하지 못했습니다.");
			}
		},
		Error: function($e){
			msgCall("회원상세정보를 조회하지 못했습니다.");
		}
	});
};


/** ===============================================================================================================
 * 학년정보 로드
 *  */


var classLoad = function(){
	loader.load( {
		Function: "ZTBSD_GM_214_KATR1_TEXT",
		Parameter: null,
		Success: function($data){
			if( !!$data && $data.replace(/\s/g,'').length>0 ){
				classData = JSON.parse( $data ).Parameter.T_EXPORTA;
				if( !!memberDetailData ){
					settingPage();
				}else{
					//
					msgCall("학년정보 조회에 실패했습니다.");
				}
			}else{
				//
				msgCall("학년정보 조회에 실패했습니다.");
			}
		},
		Error: function($e){
			//
			msgCall("학년정보 조회에 실패했습니다.");
		}
	});
};


/** ===============================================================================================================
 * 은행정보 로드
 *  */

var bankLoad = function( fn ){
	loader.load( {
		Function: "ZTBTR_BANK_LIST",
		Parameter: null,
		Success: function($data){
			if( !!$data && $data.replace(/\s/g,'').length>0 ){
				var list =  JSON.parse( $data ).Parameter.T_BANKS;
				fn( list );
			}else{
				//
				msgCall("은행정보를 가져오지못했습니다.");
			}
		},
		Error: function($e){
			//
			msgCall("은행정보를 가져오지못했습니다.");
		}
	});
}





/** ===============================================================================================================
 * 페이지 구성
 *  */

var settingPage = function(){
	setUserInfo();
	setUserDetailInfo();
	setSubjectInfo();
	setImage();
};


/** ===============================================================================================================
 * Set User Image
 *  */
//처음 이미지 로드 / 이벤트 부여
var setImage = function(){

	var KUNWE = memberDetailData.KUNWE;

	$('#MEMBER_IMG').bind( 'error', pictureError );

	$('#MEMBER_IMG').click(function(){
		app_setProfilePicture( 'setPicture', memberDetailData.KUNWE );
	});

	app_getProfilePicture( 'setPicture', KUNWE );
}

//이미지 로드 에러
var pictureError = function(){
	$('#MEMBER_IMG').attr( 'src', noImgUrl );
}

//디바이스 통신후 결과 반환 함수
var setPicture = function( $url ){

	var src = $url + '?dummy=' + ( Math.random() * Math.random() );

	$('#MEMBER_IMG').removeAttr( 'src' );
	$('#MEMBER_IMG').attr( 'src', src );

};




/** ===============================================================================================================
 * 회원기본정보 구성
 *  */

var setUserInfo = function(){
	var obj = memberDetailData;
	//
	// 회원번호
	$('#MEMBER_CD').append(obj.KUNWE);
	// 이름
	$('#MEMBER_NAME').append(obj.KUNWE_TX);
	// 성별
	var gender = (obj.PARGE=="1")? "남자" : "여자";
	$('#MEMBER_GENDER').append(gender);

}

/** ===============================================================================================================
 * 회원상세정보 구성
 *  */

var setUserDetailInfo = function(){

	var userData = pageParams.userData;
	var zipData = {}; 
	if( !!pageParams.zipCode ){ // B010201.html에서 넘겨받은 우편번호 확인
		if( !!pageParams.zipCode.data ){
			zipData = {
					PSTLZ_C : pageParams.zipCode.data.PSTLZ,
					STRAS_C : pageParams.zipCode.data.STRAS,
					ORT01_C : pageParams.zipCode.data.ORT01
			};
		};
	}
	var zipDataP = {}; 
	if( !!pageParams.zipCodeP ){ // B010202.html에서  넘겨받은 우편번호 확인 부모
		if( !!pageParams.zipCodeP.data ){
			zipDataP = {
					PSTLZ : pageParams.zipCodeP.data.PSTLZ,
					STRAS : pageParams.zipCodeP.data.STRAS,
					ORT01 : pageParams.zipCodeP.data.ORT01
			};
		};
	}    




	// 사용자가 입력한 데이터와 로드한 데이터 합치기
    var obj = $.extend( {}, memberDetailData, userData, zipData, zipDataP );
    
    
    //우편번호 입력시 상세정보로 보이기. 2013.03.25 NDH
    var $member_detail_info = $('button.toggle-button').first(); //회원상세정보 div
    var $subject_info = $('button.toggle-button:eq(1)');         //과목정보 div
    if( !!pageParams.zipCode || !!pageParams.zipCodeP){
        $member_detail_info.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').removeClass('none');
        $subject_info.removeClass('open').text('보이기').closest('div.section').children(':not(h2)').addClass('none');
    }else{
        
        $subject_info.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').removeClass('none');

    }
    
            
    //우편번호, 부모 우편번호, 입력 데이터 초기화. 2013.03.22 NDH
	try { delete pageParams.zipCode; }	catch (e) {  }  zipData = null;
    try { delete pageParams.zipCodeP; }	catch (e) {  }  zipDataP = null;
    try { delete pageParams.userData; }	catch (e) {  }  userData = null;
    
    
	var html, i, len, cObj;


	// 학년정보 넣기
	i=0, len = classData.length, html='';
	for(;i<len;i+=1){
		cObj = classData[i];
		if( obj.KATR1==cObj.KATR1 ){
			html += '<option value="' + cObj.KATR1 + '" selected="selected" >' + cObj.VTEXT + '</option>';
		}else{
			html += '<option value="' + cObj.KATR1 + '" >' + cObj.VTEXT + '</option>';
		}
	}
	$('#MEMBER_CLASS').append( html );

	// 생년월일
	var brith = obj.GBDAT.split('-');
	$('#MEMBER_BIRTHDAY').text( brith[0] + '년 ' + brith[1] + '월 ' + brith[2] + '일' );

	//성별
	var gbchk = ( obj.GBCHK=='X' )? '1' : '2';
	$('input:radio[name=MEMBER_BIRTHDAY_TYPE][value=' + gbchk + ']').attr( 'checked', 'true' );
	$('input:radio[name=MEMBER_BIRTHDAY_TYPE]').change(function(a,b){
		//
	});

	//전화1
	var memberTelArr = getPhoneNumberList( obj.TELF1_C );
	var tn = memberTelArr[0];
	if( $('#MEMBER_TEL1 option[value=' + tn + ']').length==0 ){
		$('#MEMBER_TEL1 option[value=select0]').val(tn);
	}
	$('#MEMBER_TEL1 option[value=' + tn +']').attr( 'selected', 'selected' );
	$('#MEMBER_TEL2').val( memberTelArr[1] + '-' + memberTelArr[2] );

	//전화2
	var memberCelArr = getCellNumberList( obj.TELF2_C );
	var tn = memberCelArr[0];
	if( $('#MEMBER_CEL1 option[value=' + tn + ']').length==0 ){
		$('#MEMBER_CEL1 option[value=select0]').val(tn);
	}
	$('#MEMBER_CEL1 option[value=' + tn +']').attr( 'selected', 'selected' );

	$('#MEMBER_CEL2').val( memberCelArr[1] + '-' + memberCelArr[2] );

	// 회원주소
	var zipCodes = obj.PSTLZ_C.split('-');
	$('#MEMBER_ADDRESS1').val(zipCodes[0]);
	$('#MEMBER_ADDRESS2').val(zipCodes[1]);
	$('#MEMBER_ADDRESS3').val(obj.ORT01_C);
	$('#MEMBER_ADDRESS4').val(obj.STRAS_C);



	// 학부모이름
	$('#MEMBER_P_NAME').append( obj.KUNNR_TX );

	// 학부모전화1
	var parentTelArr = getPhoneNumberList( obj.TELF1 );
	var tn = parentTelArr[0];
	if( $('#MEMBER_P_TEL1 option[value=' + tn + ']').length==0 ){
		$('#MEMBER_P_TEL1 option[value=select0]').val(tn);
	}
	$('#MEMBER_P_TEL1 option[value=' + tn +']').attr( 'selected', 'selected' );
	$('#MEMBER_P_TEL2').val( parentTelArr[1] + '-' + parentTelArr[2] );

	// 학부모전화2
	var parentCelArr = getCellNumberList( obj.TELF2 );

	var tn = parentCelArr[0];
	if( $('#MEMBER_P_CEL1 option[value=' + tn + ']').length==0 ){
		$('#MEMBER_P_CEL1 option[value=select0]').val(tn);
	}
	$('#MEMBER_P_CEL1 option[value=' + tn +']').attr( 'selected', 'selected' );
	$('#MEMBER_P_CEL2').val( parentCelArr[1] + '-' + parentCelArr[2] );

	// 학부모주소
	var zipCodes = obj.PSTLZ.split('-');
	$('#MEMBER_P_ADDRESS1').val(zipCodes[0]);
	$('#MEMBER_P_ADDRESS2').val(zipCodes[1]);
	$('#MEMBER_P_ADDRESS3').val(obj.ORT01);
	$('#MEMBER_P_ADDRESS4').val(obj.STRAS);
    
	// 학부모 이메일
	var fullEmail = $.trim( obj.EMAIL );
	var parentEmailArr = fullEmail.split('@');
	var mailDomain;
	var sameDomain = false;
	if( fullEmail.indexOf('@')>0 ){
		$('#MEMBER_P_EMAIL1').val( parentEmailArr[0] );
		mailDomain = parentEmailArr[1];
	}else{
		mailDomain = "";
	}

	var emails = [
	              {val:"naver.com", txt:"naver.com"},
	              {val:"nate.com", txt:"nate.com"},
	              {val:"dreamwiz.com", txt:"dreamwiz.com"},
	              {val:"yahoo.co.kr", txt:"yahoo.co.kr"},
	              {val:"empal.com", txt:"empal.com"},
	              {val:"unitel.co.kr", txt:"unitel.co.kr"},
	              {val:"gmail.com", txt:"gmail.com"},
	              {val:"korea.com", txt:"korea.com"},
	              {val:"chol.com", txt:"chol.com"},
	              {val:"paran.com", txt:"paran.com"},
	              {val:"freechal.com", txt:"freechal.com"},
	              {val:"hanmail.net", txt:"hanmail.net"},
	              {val:"hotmail.com", txt:"hotmail.com"},
	              {val:"self", txt:"기타메일"}
	              ];

	i=0,len=emails.length,html='';
	for( ;i<len;i+=1 ){
		cObj = emails[i];
		if( obj.val==mailDomain ){
			sameDomain = true;
			html += '<option value="' + cObj.val + '" selected="selected" >' + cObj.txt + '</option>';
		}else{
			html += '<option value="' + cObj.val + '" >' + cObj.txt + '</option>';
		}
	}
	if( !sameDomain ){
		if( mailDomain.length>0 ){
			$('#MEMBER_P_EMAIL2').append( '<option value="' + mailDomain + '" selected="selected" >' + mailDomain + '</option>' );
		}
	}
	$('#MEMBER_P_EMAIL2').append(html);

	// event
	// 생일 날짜 변경
	$('#MEMBER_BIRTHDAY').click(function(){
		openCalendar();
	});
	$('#MEMBER_BIRTHDAY_BTN').click(function(){
		openCalendar();
	});

	// 이메일 변경
	$('#MEMBER_P_EMAIL2').change(function(){
		if( $('#MEMBER_P_EMAIL2 option:selected').val()=='self' ){
			$('#MEMBER_P_EMAIL3').val('');
			$('#MEMBER_P_EMAIL3').removeClass( 'none' );
		}else{
			$('#MEMBER_P_EMAIL3').addClass( 'none' );
		}
	});

	// 과목입회 클릭
	$('#NEW_SUBJECT_BTN').click(function(){
		
		if (timeCheck() == false)
		{
			msgCall( '오후 6시 이후에는 과목입회가 불가능 합니다.' );
			return;
		}
	
		if( IS_PAYMENT ){				// 과목이 없을때 ( 계좌 입력 활성화 )
		
			if( IS_CHECKING_ACCOUNT ){  // 계좌조회가 정상적으로 이루어진 상태

				var obj = {};
				checkPaymentInfo( obj );
				checkPaymentDate( obj );
				if( checkPaymentTable( obj, 'all' ) ){
					newSbjHandle();
				}
			}else{						// 계좌조회 하지 않음
				msgCall('계좌조회가 필요합니다');
			}
		}else{							// 과목이 있음( 계좌조회 필요없음 )

			newSbjHandle();
		}
	});

	//*** 우편번호
	$('button:contains("우편번호1")').click(function(){
		pageParams.zipCode = {};
		pageParams.zipCode.returnUrl = 'B010200.html';
		saveFrmData('1');
	});
	//*** 우편번호
	$('button:contains("우편번호2")').click(function(){
		pageParams.zipCodeP = {};
		pageParams.zipCodeP.returnUrl = 'B010200.html';
		saveFrmData('7');
	});    

	$('#SAVE_INFO_BTN').click(submitHandle);

};

//전화번호 배열로 반환
var getPhoneNumberList = function( phoneNum ){
	var areaCode = [ '02', '051', '053', '032', '062',
	                 '042', '052', '044', '031', '033',
	                 '043', '041', '063', '061', '054',
	                 '055', '064', '070', '050' ];
	//
	var phoneNumArr = [];
	var i=0, len=areaCode.length;

    //넘어온 번호에 areaCode 없는 지역번호 체크 NDH 2013.02.22     
    var checkAreaCode = false;
    if(phoneNum != undefined || phoneNum != "")
    {
    	for(;i<len;i+=1){
    		if( phoneNum.indexOf( areaCode[i] ) > -1 ){
    		  checkAreaCode =true;
              break;
    		}
    	}
        if(!checkAreaCode){
            phoneNumArr =  ["","000","0000"];
            //app_alert('지역 번호가 바르지 않습니다.');
            return phoneNumArr;
        }
    }    
    
    
	for(;i<len;i+=1){
		if( phoneNum.indexOf( areaCode[i] ) > -1 ){
			phoneNumArr.push( areaCode[i] );
			var tmpNum = phoneNum.slice( areaCode[i].length, phoneNum.length );
			if( tmpNum.length == 7 ){
				phoneNumArr.push( tmpNum.slice( 0, 3 ) );
				phoneNumArr.push( tmpNum.slice( 3, 7 ) );
			}else{
				phoneNumArr.push( tmpNum.slice( 0, 4 ) );
				phoneNumArr.push( tmpNum.slice( 4, 8 ) );
			}
			return phoneNumArr;
		}
	}
};

//핸드폰번호 배열로 반환
var getCellNumberList = function( phoneNum ){
	var areaCode = [ '010', '011', '016', '017', '018', '019' ];
	//
	var phoneNumArr = [];
	var i=0, len=areaCode.length;
    
    //넘어온 번호에 areaCode 없는 지역번호 체크 NDH 2013.02.22     
    var checkAreaCode = false;
    if(phoneNum != undefined || phoneNum != "")
    {
    	for(;i<len;i+=1){
    		if( phoneNum.indexOf( areaCode[i] ) > -1 ){
    		  checkAreaCode =true;
              break;
    		}
    	}
        if(!checkAreaCode){
            phoneNumArr =  ["","000","0000"];
            //app_alert('지역 번호가 바르지 않습니다.');
            return phoneNumArr;
        }
    }
    
    
    
	for(;i<len;i+=1){
		if( phoneNum.indexOf( areaCode[i] ) > -1 ){
			phoneNumArr.push( areaCode[i] );
			var tmpNum = phoneNum.slice( areaCode[i].length, phoneNum.length );
			if( tmpNum.length == 7 ){
				phoneNumArr.push( tmpNum.slice( 0, 3 ) );
				phoneNumArr.push( tmpNum.slice( 3, 7 ) );
			}else{
				phoneNumArr.push( tmpNum.slice( 0, 4 ) );
				phoneNumArr.push( tmpNum.slice( 4, 8 ) );
			}
			return phoneNumArr;
		}
	}
};

//달력열기
var openCalendar = function(){
	app_openCalendar( 'setPickDate' );
};

//학습일 셋팅 :: 안드로이드에서 반환받음.
var setPickDate = function( $date ){

	var dt = new Date();
	var yy = dt.getFullYear();
	var mm = dt.getMonth()+1;
	var dd = dt.getDate();
	var birth = $date.split('-');

	var cUtil = new CalendarUtil();
	var tmpDays = cUtil.getAllDay( {yy:Number(birth[0]), mm:Number(birth[1]), dd:Number(birth[2])} );
	var todayDays = cUtil.getAllDay( {yy:yy, mm:mm, dd:dd} );

	if( tmpDays>todayDays ){
		msgCall( '생년월일을 확인해 주세요' );
	}else{
		$('#MEMBER_BIRTHDAY').text( birth[0] + '년 ' + birth[1] + '월 ' + birth[2] + '일' );
	}

};


/** ===============================================================================================================
 * 회원정보수정 클릭
 *  */

var getDetailFrmData = function(){
	var obj = {};
	var valA = '', valB = '';

	// 학년정보 넣기
	if( $('#MEMBER_CLASS option').is(':selected') ){
		valA = $.trim( $('#MEMBER_CLASS option:selected').val() );
		if( valA!='select0' ){
			obj.KATR1 = valA;
		}
	}
	// 생년월일
	valA = $('#MEMBER_BIRTHDAY').text().replace( /[\s,일]/g, '' ).replace( /[년,월]/g, '-' );
	if( valA.length>0 ){
		obj.GBDAT = valA;
	}

	// 양력/음력
	obj.GBCHK = ( $('input:radio[name=MEMBER_BIRTHDAY_TYPE]:checked').val()=='1' )? 'X' : ' ';


	//전화1
	if( $('#MEMBER_TEL1 option').is(':selected') ){
		valA = $.trim( $('#MEMBER_TEL1 option:selected').val() );
		if( valA=='select0' ){
			valA = '';
		}
	}
	valB = $.trim( $('#MEMBER_TEL2').val().replace( /-/g, '' ) );
	if( valA.length>0 || valB.length>0){
		obj.TELF1_C = valA + valB;
	}

	//전화2
	if( $('#MEMBER_CEL1 option').is(':selected') ){
		valA = $.trim( $('#MEMBER_CEL1 option:selected').val() );
		if( valA=='select0' ){
			valA = '';
		}
	}
	valB = $.trim( $('#MEMBER_CEL2').val().replace( /-/g, '' ) );
	if( valA.length>0 || valB.length>0){
		obj.TELF2_C = valA + valB;
	}

	//회원 우편번호
	valA = $('#MEMBER_ADDRESS1').val() + '-' + $('#MEMBER_ADDRESS2').val();
	if( valA.length>1 ){
		obj.PSTLZ_C = valA;
	}

	//주소1
	valA = $('#MEMBER_ADDRESS3').val();
	if(valA.length>0){
		obj.ORT01_C = valA;
	}

	//주소2
	valA = $('#MEMBER_ADDRESS4').val();
	if( valA.length>0 ){
		obj.STRAS_C = valA;
	}


	// 학부모전화1
	if( $('#MEMBER_P_TEL1 option').is(':selected') ){
		valA = $.trim( $('#MEMBER_P_TEL1 option:selected').val() );
		if( valA=='select0' ){
			valA = '';
		}
	}
	valB = $.trim( $('#MEMBER_P_TEL2').val().replace( /-/g, '' ) );
	if( valA.length>0 || valB.length>0){
		obj.TELF1 = valA + valB;
	}


	// 학부모전화2
	if( $('#MEMBER_P_CEL1 option').is(':selected') ){
		valA = $.trim( $('#MEMBER_P_CEL1 option:selected').val() );
		if( valA=='select0' ){
			valA = '';
		}
	}
	valB = $.trim( $('#MEMBER_P_CEL2').val().replace( /-/g, '' ) );
	if( valA.length>0 || valB.length>0){
		obj.TELF2 = valA + valB;
	}
	//학부모 우편번호
	valA = $('#MEMBER_P_ADDRESS1').val() + '-' + $('#MEMBER_P_ADDRESS2').val();
	if( valA.length>1 ){
		obj.PSTLZ = valA;
	}

	//학부모 주소1
	valA = $('#MEMBER_P_ADDRESS3').val();
	if(valA.length>0){
		obj.ORT01 = valA;
	}

	//학부모 주소2
	valA = $('#MEMBER_P_ADDRESS4').val();
	if( valA.length>0 ){
		obj.STRAS = valA;
	}
    
	// 학부모 이메일
	valA = $.trim( $('#MEMBER_P_EMAIL1').val() );

	var tempEmailDomain = $('#MEMBER_P_EMAIL2 option:selected').val();

	if( tempEmailDomain=='select0' ){
		valB = '';
	}else{
		valB = $('#MEMBER_P_EMAIL2 option:selected').val();
	}
	if( tempEmailDomain=="self" ){
		valB = $('#MEMBER_P_EMAIL3').val();
	};
	if( $.trim( valA ).length==0 && $.trim( valB ).length==0  ){
		obj.EMAIL = '';
	}else{
		obj.EMAIL = valA + "@" + valB;
	}


	return obj;
}

//저장버튼 클릭시
var submitHandle = function(){

	var obj = {};
	var orgObj = memberDetailData;
	var trim = function( str ){
		return str.replace( /\s/g, '' );
	}


	// 학년정보 넣기
	obj.KATR1 = $('#MEMBER_CLASS option:selected').val();
	// 생년월일
	obj.GBDAT = $('#MEMBER_BIRTHDAY').text().replace( /[\s,일]/g, '' ).replace( /[년,월]/g, '-' );
	// 양력/음력
	obj.GBCHK = ( $('input:radio[name=MEMBER_BIRTHDAY_TYPE]:checked').val()=='1' )? 'X' : ' ';
	//전화1
	obj.TELF1_C = $('#MEMBER_TEL1 option:selected' ).val() + $('#MEMBER_TEL2').val().replace( /-/g, '' );

	//전화2
	if( $('#MEMBER_CEL1 option:selected' ).val()=='select0' ){
		msgCall( '핸드폰 번호를 확인하세요' );
		return false;
	}
	if( trim($('#MEMBER_CEL2').val().replace( /-/g, '' )).length>=7 && trim($('#MEMBER_CEL2').val().replace( /-/g, '' )).length<=8 ){
	}else{
		msgCall( '핸드폰 번호를 확인하세요' );
		return false;
	}
	obj.TELF2_C = $('#MEMBER_CEL1 option:selected' ).val() + $('#MEMBER_CEL2').val().replace( /-/g, '' );
	// 우편번호
	obj.PSTLZ_C = $('#MEMBER_ADDRESS1').val() + '-' + $('#MEMBER_ADDRESS2').val();
	//주소1
	obj.ORT01_C = $('#MEMBER_ADDRESS3').val();
	//주소2
	if( trim( $('#MEMBER_ADDRESS4').val() ).length < 1 ){
		msgCall( '올바른 주소가 아닙니다' );
		return false;
	}
	obj.STRAS_C = $('#MEMBER_ADDRESS4').val();
    
    
    
	// 학부모전화1
	obj.TELF1 = $('#MEMBER_P_TEL1 option:selected' ).val() + $('#MEMBER_P_TEL2').val().replace( /-/g, '' );
	// 학부모전화2
	if( $('#MEMBER_P_CEL1 option:selected' ).val()=='select0' ){
		msgCall( '핸드폰 번호를 확인하세요' );
		return false;
	}

	if( trim($('#MEMBER_P_CEL2').val()).replace( /-/g, '' ).length>=7 || trim($('#MEMBER_P_CEL2').val()).replace( /-/g, '' ).length<=8 ){
	}else{
		msgCall( '핸드폰 번호를 확인하세요' );
		return false;
	}


	obj.TELF2 = $('#MEMBER_P_CEL1 option:selected' ).val() + $('#MEMBER_P_CEL2').val().replace( /-/g, '' );
	// 학부모 이메일
	/* 필수입력 제외
	if( trim($('#MEMBER_P_EMAIL1').val()).length<4 ){
		msgCall( '이메일 주소를 입력해 주십시오.' );
		return false;
	}
	 */
//	var tempEmailDomain = $('#MEMBER_P_EMAIL2 option:selected').val();
//	if( tempEmailDomain=='select0' ){
//		tempEmailDomain = "";
//		// 필수입력제외
//		//msgCall( '이메일 주소를 선택해 주십시오.' );
//		//return false;
//	}
//	if( tempEmailDomain=="self" ){
//		tempEmailDomain = $('#MEMBER_P_EMAIL3').val();
//		/* 필수 입력 제외
//		if( trim(tempEmailDomain).length<4 ){
//			msgCall( '이메일 주소를 입력해 주십시오.' );
//			return false;
//		}
//		//*/
//	};
//	if( $.trim(tempEmailDomain).length>0 ){
//		tempEmailDomain = "@" + tempEmailDomain; 
//	}
//	obj.EMAIL = $('#MEMBER_P_EMAIL1').val();


	//학부모 우편번호
	obj.PSTLZ = $('#MEMBER_P_ADDRESS1').val() + '-' + $('#MEMBER_P_ADDRESS2').val();
	//학부모주소1
	obj.ORT01 = $('#MEMBER_P_ADDRESS3').val();
	//학부모주소2
	if( trim( $('#MEMBER_P_ADDRESS4').val() ).length < 1 ){
		msgCall( '올바른 주소가 아닙니다' );
		return false;
	}
	obj.STRAS = $('#MEMBER_P_ADDRESS4').val();    
    
    
    

	var updated = false;

	for( var key in obj ){
		if( obj[key]!=memberDetailData[key] ){
			updated = true;
		};
	};



	if( updated ){
		var data = $.extend( {}, memberDetailData, obj );
		var updateData = {
				parent : getUpdateParentData(data),
				child : getUpdateChildData(data)
		};
		//
		updateCustomer( updateData, 'X' );
	}else{
	    app_alert("변경된 내역이 없습니다.");
	}

};

//고객정보 업데이트
var updateCustomer = function( data, child ){
	var obj;
	if( child=='X' ){ // 자녀정보 저장여부
		obj = data.child;
	}else{
		obj = data.parent;
	};
	//
	loader.load( {
		Function: "ZTBSD_CHANGE_CUSTOMER",
		Parameter: obj,
		Success: function($data){
			if( child=='X' ){
				updateCustomer( data, ' ' );
			}else{
                //refresh 주석처리하고, app_changePage로 변경. 2013.03.22 NDH
			    //refresh();    
			    
			    // 2013.03.27	ypkim
			    // 정보 저장 후 화면 리로딩 없이 유지하기 위해 주석처리함.
                // app_changePage("B010200.html",pageParams,false);
                app_alert("저장되었습니다.");



			}
		},
		Error: function($data){
			msgCall( "자녀정보 저장에 실패하였습니다.");
		}
	});

}

//자녀정보 저장을 위한 데이터 구성
var getUpdateChildData = function(data){
	var obj = {
			STCD1:memberData.STCD1,
			KUNNR:data.KUNWE,
			NAME1:data.KUNWE_TX,
			NAME2:' ',
			TELF1:data.TELF1_C,
			TELF2:data.TELF2_C,
			PSTLZ:data.PSTLZ_C,
			ORT01:data.ORT01_C,
			STRAS:data.STRAS_C,
			ADRNR:data.ORT01_C + ' ' + data.STRAS_C,
			SMTP_ADDR:' ',
			KUNPA:' ',
			GBDAT:data.GBDAT,
			GBCHK:data.GBCHK,
			PARGE:data.PARGE,
			KATR1:data.KATR1,
			KATR5:' ',
			STCD4:' '
	};
	return {
		CUSTOMER:obj,
		CHILD:'X'
	};
};

//부모정보 저장을 위한 데이터 구성
var getUpdateParentData = function(data){
	var obj = {
			STCD1:memberData.STCD1,
			KUNNR:data.KUNNR,
			NAME1:data.KUNNR_TX,
			NAME2:' ',
			TELF1:data.TELF1,
			TELF2:data.TELF2,
			PSTLZ:data.PSTLZ,
			ORT01:data.ORT01,
			STRAS:data.STRAS,
			ADRNR:data.ORT01 + ' ' + data.STRAS,
			SMTP_ADDR:data.EMAIL,
			KUNPA:' ',
			GBDAT:' ',
			GBCHK:' ',
			PARGE:' ',
			KATR1:' ',
			KATR5:' ',
			STCD4:' '
	};
	return {
		CUSTOMER:obj,
		CHILD:' '
	};
};



/** ===============================================================================================================
 * 페이지 파라미터 저장, 페이지 이동
 *  */

//파리미터 저장후 반환 할 함수 리스트
var saveTypeFnList = {
		'0' : 'savedFrmData',		// 아무것도 없음
		'1' : 'goFindZip',			// 우편번호
		'2' : 'goAddSubject',		// 과목입회
		'3' : 'goChangeSubject',	// 과목변경
		'4' : 'goChangeJindo',		// 진도변경
		'5' : 'goChangeJindoBaro', 	// 바로샘 진도변경
		'6' : 'goRemoveSubject', 	// 휴회
        '7' : 'goFindZipP'      	// 우편번호 (부모 )
};

//파라미터 저장후 반환 받은후 함께 넘겨줄 데이터
var saveTypeFnListParameters = {};

//폼데이터 저장
var saveFrmData = function( type, params ){

	if(type==undefined) {
		type='0'
	};

	if( !!params ){
		saveTypeFnListParameters[type] = params;
	};

	pageParams.userData = getDetailFrmData();
	//
	if( IS_PAYMENT ){
		pageParams.paymentData = getPaymentFrmData();
	}
	//
	app_setRequestParameter( saveTypeFnList[type], pageParams );
}

//기본 함수(처리내용 없음)
var savedFrmData = function(){
	//
}

// 2013.03.27	ypkm
// 우편번호 화면에서 이전 버튼 클릭 시 일간으로 이동을 회원상세화면으로 이동하도록 수정 
// app_changePage 의 마지막 파라미터를 false -> true 로 바꿈
//우편번호 찾기
var goFindZip = function(){
	app_changePage( 'B010201.html', pageParams, true );
}
//부모 우편번호 찾기
var goFindZipP = function(){
	app_changePage( 'B010202.html', pageParams, true );
}

//입회 이동
var goAddSubject = function(){
	app_changePage( 'B010300.html', saveTypeFnListParameters['2'], true );
}

//과목변경 이동
var goChangeSubject = function(){
	app_changePage( 'B010400.html', saveTypeFnListParameters['3'], true );
}

//진도변경 이동
//진도변경페이지에서 저장 후 이전으로 돌아가지 않는 문제. false 처리.2013.04.17 NDH
var goChangeJindo = function(){
	app_changePage( 'B010500.html', saveTypeFnListParameters['4'], false );
}

//바로샘 진도 변경 이동
var goChangeJindoBaro = function(){
	app_changePage( 'B010510.html', saveTypeFnListParameters['5'], true );
}

//휴회요청 이동
var goRemoveSubject = function(){
	app_changePage( 'B010601.html', saveTypeFnListParameters['6'], true );
}




/** ===============================================================================================================
 * 과목정보 테이블 구성
 *  */

//과목정보 테이블 구성
var setSubjectInfo = function(){
	if( IS_PAYMENT ){ // 결재 여부
		bankLoad( setPayment );
	}else{
		$('#subjectListTable').removeClass( 'none' );
		setSubjectTable();
	}
};

//결재 정보 데이터 object에 담아 반환
var getPaymentFrmData = function(){
	var obj = {};
	checkPaymentInfo( obj );
	checkPaymentDate( obj );
	return obj;
}

//결제 정보 테이블 생성
var setPayment = function( bankList ){
	var $el = $('#payTable');
	var i=0,len=bankList.length;
	var obj, html='';
	for(;i<len;i+=1){
		obj = bankList[i];
		html += '<option value="'+obj.BANKL+'">'+ obj.BANKA +'</option>'
	};
	$el.find('#CLASS_JOIN_ACCOUT_BANK').append( html );

	var paymentData = pageParams.paymentData;
	if( !!paymentData ){
		// 예금주명
		if( !!paymentData.KOINH ){
			$el.find('#CLASS_JOIN_NAME').val( paymentData.KOINH );
		}

		//주민번호
		if( !!paymentData.STCD1 ){
			$el.find('#CLASS_JOIN_SSNUM1').val( paymentData.STCD1 );
		}

		// 계좌번호
		if( !!paymentData.BANKN ){
			$el.find('#CLASS_JOIN_ACCOUT').val( paymentData.BANKN );
		}

		// 이체일
		if( !!paymentData.ATDAT ){
			if( $el.find('#CLASS_JOIN_ACCOUT_DATE option[value='+obj.ATDAT+']').length>0 ){
				$el.find('#CLASS_JOIN_ACCOUT_DATE option[value='+obj.ATDAT+']').attr( 'selected', 'selected' );
			}
		}

		// 은행코드
		if( !!paymentData.BANKL ){
			if( $el.find('#CLASS_JOIN_ACCOUT_BANK option[value='+obj.BANKL+']').length>0 ){
				$el.find('#CLASS_JOIN_ACCOUT_BANK option[value='+obj.BANKL+']').attr( 'selected', 'selected' );
			}
		}
	}

	$el.find('input:text').change(function(){
		IS_CHECKING_ACCOUNT = false;
	})
	$el.find('#CLASS_JOIN_ACCOUT_BANK').change(function(){
		IS_CHECKING_ACCOUNT = false;
	})
	$el.find('button#checkingAccount').click( function(){
		//
		var obj = {};
		checkPaymentInfo( obj );
		if( checkPaymentTable( obj ) ){
			loader.load( {
				Function: "ZTBTR_WB_WFXB",
				Parameter: { 'I_ZTBTRSCM01' : {
					BANKL : obj.BANKL,
					BANKN : obj.BANKN,
					STCD1 : obj.STCD1,
					KOINH : obj.KOINH
				}, I_VKORG:'1000' },
				Success: function($data){
					var data = JSON.parse( $data ).Parameter;
					if( !!data ){
						if( data.E_ZTBTRSCM02.RETCD=='1000' ){
							IS_CHECKING_ACCOUNT = true;
							msgCall( '사용가능한 계좌입니다.' );
						}else{
							IS_CHECKING_ACCOUNT = false;
							msgCall(data.E_ZTBTRSCM02.RETCD);
						}
					}
				},
				Error: function($e){
					IS_CHECKING_ACCOUNT = false;
					msgCall('사용할 수 없는 계좌입니다.');
				}
			});
		};
	});

	$('#payTable').removeClass( 'none' );

}

//이체일 체크
var checkPaymentDate = function( obj ){
	var $el = $('#payTable');
	var valA='';
	// 이체일
	if( $el.find('#CLASS_JOIN_ACCOUT_DATE option').is(':selected') ){
		valA = $el.find('#CLASS_JOIN_ACCOUT_DATE option:selected').val();
		if( valA!='select0' ){
			obj.ATDAT = valA;
		}
	}
};

//결재정보 체크
var checkPaymentInfo = function( obj ){
	var $el = $('#payTable');
	var valA='';

	// 예금주명
	valA = $.trim( $el.find('#CLASS_JOIN_NAME').val() );
	if( valA.length>0 ){
		obj.KOINH = valA;
	}

	//주민번호
	valA = $.trim( $el.find('#CLASS_JOIN_SSNUM1').val() ).replace( '/-/g', '' );
	if( valA.length>0 ){
		obj.STCD1 = valA;
	}

	// 계좌번호
	valA = $.trim( $el.find('#CLASS_JOIN_ACCOUT').val() ).replace( '/-/g', '' );
	if( valA.length>0 ){
		obj.BANKN = valA;
	}

	// 은행코드
	if( $el.find('#CLASS_JOIN_ACCOUT_BANK option').is(':selected') ){
		valA = $.trim( $el.find('#CLASS_JOIN_ACCOUT_BANK option:selected').val() );
		if( valA!='select0' ){
			obj.BANKL = valA;
		}
	}
};


//결재 테이블 생성
var checkPaymentTable = function( obj, type ){
	var checkList = ['KOINH', 'STCD1', 'BANKN', 'BANKL'];
	var propKey;
	//
	if( type=='all' ){
		checkList.push('ATDAT');
	}
	var i=0, len=checkList.length; 
	//
	for(;i<len;i+=1){
		propKey = checkList[i];
		switch( propKey ){
		case 'KOINH' : 
			if( obj[propKey]==undefined ){
				msgCall( '예금주명을 입력해 주세요' );
				return false;
			}
			break;
		case 'STCD1' : 
			if( obj[propKey]==undefined ){
				msgCall( '주민번호를 입력해 주세요' );
				return false;
			}else{
				if( ValidSerial(obj[propKey]) ){
				}else{
					return false;
				}
			}
			break;
		case 'BANKN' : 
			if( obj[propKey]==undefined ){
				msgCall( '계좌번호를 입력해 주세요' );
				return false;
			}
			break;
		case 'ATDAT' : 
			if( obj[propKey]==undefined ){
				msgCall( '이체일을 입력해 주세요' );
				return false;
			}
			break;
		case 'BANKL' : 
			if( obj[propKey]==undefined ){
				msgCall( '은행코드를 입력해 주세요' );
				return false;
			}
			break;
		}
	}
	return true;
}

//과목테이블 생성
var setSubjectTable = function(){
	var i,len,html,obj,j;
	//
	html = '', j=0;
	i=0, len=memberData.length;
	
	
	
	for(;i<len;i+=1){
		obj = memberData[i];
		//
		html += '<tr><td class="button-right">';
		if( hasCode( filterCheck, obj.ZMAT1 ) ){
			html += '<input type="radio" value="' + i + '" name="CLASS_SEL" id="CLASS_SEL'+j+'" class="graphic" /> <label for="CLASS_SEL'+j+'">';
			html += obj.ZMAT1_TX + '</label>';
			j++;
		}else{
			html += obj.ZMAT1_TX + '<br/>';
		}
		html += '<button type="button" id=sbj_"' + i + '" onclick="changeSbjHandle('+i+')" class="button-style s-size global">과목변경</button></td>';
		html += '<td class="button-right">' + obj.JINDO_TX;
		html += '<br /><button type="button" id=lv_"' + i + '" onclick="changeJindoHandle('+i+')" class="button-style s-size global">진도변경</button></td>';
		html += '<td><button type="button" id=del_"' + i + '" onclick="deleteSbjHandle('+i+')" class="button-style s-size global">휴회신청</button></td>';
		html += '</tr>';
	}
	$('#SUBJECT_BODY').append(html);
}


/** ===============================================================================================================
 * 과변버튼클릭
 *  */

var changeSbjHandle = function( $i ){
	var obj = memberData[$i],
	fObj = null,
	code = obj.ZMAT1,
	cnt = obj.STCNT,
	reqgb = obj.REQGB;
	mtype = obj.MTYPE,
	params = {
			NAME1 : pageParams.NAME1,
			KUNWE : obj.KUNWE,
			VBELN : obj.VBELN,
			STCNT : cnt,
			MTYPE : mtype,
			BOOK2_ORG : obj.BOOK2_ORG,
			ZMAT1 : code,
			ZMAT1_TX : obj.ZMAT1_TX,
			MATNR_TX : obj.MATNR_TX,
			JINDO_TX : obj.JINDO_TX,
			REQGB : reqgb,
			AUART : obj.AUART,
			THUX : obj.THUX,
			PENCHK : obj.PENCHK,
			M502D : obj.M502D,
	};
	//
	// ******** test ****************************************************************

//	ypkim	2013.02.21	테스트 진행 위해 주석처리 함.
	if( code == '000000000000001154' ){
		msgCall( '씽크U 궁것질은 과목변경을 할 수 없습니다.' );
		return false;
	}

	if( code=="000000000000001069" && obj.BOOK2_ORG!="X" ){
		msgCall( '책읽기2 과목은 자기계약이어야 과목변경이 가능합니다.' );
		return false;
	};
	
	// 2013.02.07 ypkim
	// 과변 불가 과목 추가.
	if (code=="000000000000001063" || code=="000000000000001064" ||
		  code=="000000000000001065" || code=="000000000000001169")
	{
		msgCall( '과변 준비중인 과목입니다.' );
		return false;
	}
	
	if (code=="000000000000001170" || code=="000000000000001171" ||
		  code=="000000000000001172")
	{
		msgCall( '과변이 불가한 과목입니다.' );
		return false;
	}
	// 2013.02.07	ypkim 수정 End
	
	fObj = {
			'000000000000001050':'책읽기', 
			'000000000000001069':'책읽기2',
			'000000000000001084':'책읽기플러스',
			'000000000000001088':'영어책읽기',
			'000000000000001134':'쿠키쿠',
			'000000000000001152':'씽크U수학(S)',
			'000000000000001153':'씽크U과학(S)'
	};
	if( hasCode( fObj, code ) ){
		if( Number(cnt)<1 ){
			msgCall( '책읽기 과목은 수업횟수가 1회 이상이어야 과목변경이 가능합니다.' );
			return false;
		}
	}else{
		if( Number(cnt)<4 ){
			msgCall( '해당 과목은 수업횟수가 4회 이상이어야 과목변경이 가능합니다.' );
			return false;
		}
	}



	if( $.trim(reqgb).length>0 ){
		msgCall('회원변경중인 계약입니다.');
		return false;
	}

	fObj = {
			"000000000000001115":"씽크U영어_주1",
			"000000000000001116":"씽크U영어_주2",
			"000000000000001117":"씽크U영어_주3",
			'000000000000001050':'책읽기', 
			'000000000000001069':'책읽기2',
			'000000000000001084':'책읽기플러스',
			'000000000000001088':'영어책읽기',
			'000000000000001134':'쿠키쿠'
	};
	if( hasCode( fObj, code ) ){
		var date = new Date();
		if( date.getHours()>=18 ){
			msgCall( '책읽기 과목은 오후 6시 이후에는 과목 변경을 할 수 없습니다.' );
			return false;
		}
	}
	fObj = {
			"098":"", 
			"099":"", 
			"598":"", 
			"599":"", 
			"010":"", 
			"011":"", 
			"070":"", 
			"071":"", 
			"050":"", 
			"051":"", 
			"060":"", 
			"061":"", 
			"080":"", 
			"081":""
	};

	if( hasCode( fObj, mtype ) ){
		msgCall( '선택하신 과목의 입회 경로를 확인하세요.' );
		return false;
	}

	if( code=="000000000000001154" ){
		msgCall( '씽크U 궁것질은 과목변경을 할 수 없습니다.' );
		return false;
	}
	
	// 2013.02.15	ypkim
	if (timeCheck() == false)
	{
		msgCall( '오후 6시 이후에는 과목변경이 불가능 합니다.' );
		return false;
	}

	saveFrmData( '3', params );
};



/** ===============================================================================================================
 * 진도변경 버튼 클릭시
 *  */
var changeJindoHandle = function( $i ){
	var obj = memberData[$i],
	fObj = null,
	code = obj.ZMAT1,
	cnt = obj.STCNT,
	mtype = obj.MTYPE,
	params = {
			NAME1 : pageParams.NAME1,
			VBELN : obj.VBELN,
			ZMAT1 : code,
			ZMAT1_TX : obj.ZMAT1_TX
	};



	if( Number(params.ZMAT1)==1022 ){
		saveFrmData( '5', params );
	}else{
		saveFrmData( '4', params );
	}
}


/** ===============================================================================================================
 * 휴회버튼 클릭시( 연결안됨 )
 *  */
var deleteSbjHandle = function( $i ){
	var obj = memberData[$i];
	saveFrmData( '6', {NAME1:pageParams.NAME1} );
};


/** ===============================================================================================================
 * 입회버튼 클릭
 *  */

var newSbjHandle = function(){
	var STCD1 = " ",
	STCNT = " ",
	BANKL = " ",
	BANKN = " ",
	KOINH = " ",
	ATDAT = " ",
	ZMAT1 = " ",
	CNT = 0,
	MTYPE = " ";
	

	if( !!memberData ){
		CNT = memberData.length;
	}

	if( $('input:radio[name=CLASS_SEL]').is(':checked') ){
		var cObj = memberData[ Number( $('input:radio[name=CLASS_SEL]:checked').val() ) ];
		STCD1 = cObj.STCD1;
		STCNT = cObj.STCNT;
		ZMAT1 = cObj.ZMAT1;
		MTYPE = cObj.MTYPE;
	
	}

	var params = {
			VBELN : memberDetailData.VBELN,
			NAME1 : memberDetailData.KUNWE_TX,
			STCD1 : STCD1,
			PSTLZ : memberDetailData.PSTLZ,
			KUNWE : memberDetailData.KUNWE,
			KUNNR : memberDetailData.KUNNR,
			STCNT : STCNT,
			BANKL : BANKL,
			BANKN : BANKN,
			KOINH : KOINH,
			ATDAT : ATDAT,
			ZMAT1 : ZMAT1,
			MTYPE : MTYPE,
			CNT : CNT		
	};

	saveFrmData( '2', params );
};




/** ===============================================================================================================
 * Util Function
 *  */

//오브젝트에 해당 코드가 있는지 Boolean 값으로 반환
var hasCode = function( $list, $code ){
	var bool = true;
	if( $list[$code]==undefined ){
		bool = false;
	}else{
		bool = true;
	}
	return bool;
};

//메세지창
var msgCall = function( $msg ){
	app_alert( $msg );
};

//페이지 새로고침
var refresh = function(){
	window.location.href = 'B010200.html' + '?dummy=' + (Math.random() * Math.random());
}

//숫자만 입력
var returnOnlyNumber = function( event ){
	if ( event.keyCode!=8 && ((event.keyCode<48)||(event.keyCode>57)) ){
		event.returnValue=false;
	}
}

//전화번호 반환
var returnPhoneNumber = function( event ){
	if ( event.keyCode!=8 && ((event.keyCode<48)||(event.keyCode>57)) ){
		event.returnValue=false;
	}else{
		getAddHypenNum(event);
	};
}

//전화번호의 하이픈 추가
var getAddHypenNum = function( event ){
	var numStr='';
	var str = event.currentTarget.value;
	var nstr = $.trim( str.replace(/-/g, '') );
	if( nstr.length <= 8 && nstr.length>0 ){
		if( nstr.length>3 && nstr.length<8 ){
			numStr = nstr.slice(0, 3) + '-' + nstr.slice(3, nstr.length);
		}else if( nstr.length==8 ){
			numStr = nstr.slice(0, 4) + '-' + nstr.slice(4, nstr.length);
		}else{
			numStr = nstr;
		}

		if( numStr==1 ){
			event.currentTarget.value = numStr;
		}else{
			event.currentTarget.value = numStr.slice( 0, numStr.length-1 );
			event.currentTarget.value += numStr.slice( numStr.length-1, numStr.length);
		}


	}
	//
	event.returnValue=false;
}

//주민번호 검사
function ValidSerial( juminno ) {
	var objIdNoFront = juminno.substr(0,6);
	var objIdNoRear = juminno.substr(6,7);
	var chk = 0;
	var yy = objIdNoFront.substring(0,2);
	var mm = objIdNoFront.substring(2,4);
	var dd = objIdNoFront.substring(4,6);
	var sex = objIdNoRear.substring(0,1);

	if (objIdNoRear.split(" ").join("") == "") {
		msgCall("주민등록번호를 입력하세요.");
		return false;
	}

	if (objIdNoFront.length != 6) {
		msgCall("주민등록번호 앞자리를 입력하세요.");
		return false;
	}

	if (objIdNoRear.length != 7 ) {
		msgCall("주민등록번호 뒷자리를 입력하세요.");
		return false;
	}

	if( isNaN(objIdNoFront) || isNaN(objIdNoRear) ){
		msgCall("주민등록번호는 숫자만 가능합니다.");
		return false;
	}


	if ((objIdNoFront.length != 6) || (mm < 1 || mm > 12 || dd < 1)) {
		msgCall ("주민등록번호 앞자리가 올바르지 않습니다.");
		return false;
	}

	if ((sex != 1 && sex != 2 && sex != 3 && sex != 4 ) || ( objIdNoRear.length != 7 )) {
		return false;
	}

	return true;
}

/** 
 * =============================================================================================================== */





