var IS_PLUS_10MIN_USED = false;
var IS_FINISHED = false;
var pageParams = null;

//20120716 OHJ 상담안 관리 과목 코드를 모두 뺌.
//씽크빅u
var code001 = "000000000000001114";
var code002 = "000000000000001131";
var code003 = "000000000000001148";
var code004 = "000000000000001162";
var code005 = "000000000000001090";
//씽크빅
var code006 = "000000000000001000";
var code007 = "000000000000001112";
var code008 = "000000000000001001";
var code009 = "000000000000001002";


var filter = {
	'000000000000001114': '씽크U사회과학',
	'000000000000001131': '씽크U국어',
	'000000000000001148': '씽크U영어(방문형)',
	'000000000000001162': '씽크U한자',
	'000000000000001090': '씽크U수학',
	'000000000000001000': '수학',
	'000000000000001002': '한자',
	'000000000000001112': '한글깨치기',
	'000000000000001001': '국어'
}
var filterA020300 = {
	'000000000000001114': '씽크U사회과학',
	'000000000000001131': '씽크U국어',
	'000000000000001148': '씽크U영어',
	'000000000000001162': '씽크U한자',
	'000000000000001090': '씽크U수학',
	'000000000000001000': '수학',
	'000000000000001112': '한글깨치기',
	'000000000000001001': '국어',
	'000000000000001002': '한자'
}
var filterA020100 = {
	'000000000000001114': '씽크U 사회과학',
	'000000000000001131': '씽크U 국어',
	'000000000000001148': '씽크U 영어',
	'000000000000001162': '씽크U한자',
	'000000000000001090': '씽크U수학',
	'000000000000001000': '수학',
	'000000000000001112': '한글깨치기',
	'000000000000001001': '국어',
	'000000000000001002': '한자',
	'000000000000001022': '바로셈',
	'000000000000001087': '바로독해',
	'000000000000001056': '스마트영어'
}
// 2013.03.27	ypkim	
// 상담안 출력 기준이 바뀜
// 씽크빅 과목의 경우 이번주 진도를 기준으로 상담안 출력
// 씽크 U 과목의 경우 지난주 진도를 기준으로 상담안 출력 
// 씽크 U 과목인지 체크하기위한 필터 처리
var filterThinkU = {
	'000000000000001114': '씽크U 사회과학',
	'000000000000001131': '씽크U 국어',
	'000000000000001148': '씽크U 영어',
	'000000000000001162': '씽크U한자',
	'000000000000001090': '씽크U수학'
}
var isFirst = true;
var IS_CAPTUER = false;

//20130618 OHJ
//이미 전송된 상담안에 대해 처리
//but 저장은 안되서 페이지가 넘어가면 원점 
var IS_SEND_FINISHED = false;
var IS_KID = false;

var pageData = {
	sbjList: null,
	idList: null,
	idxList: null,
	chkCode: "",
	chkDangeCode: "",
	chkJindoCode: "",
	tabIdxList: null,
	tabList: null,
	currentIdx: -1,
	currentDangeIdx: -1,
	currentJindoIdx: -1,
	currentCode: "",
	currentCodeTx: "",
	currentDange: "",
	currentDangeTx: "",
	currentJindo: "",
	currentJindoTx: "",
	currentEType: "",
	dangeList: null,
	jindoList: null,
	eTypeList: null
};
var captureTempData;
var udatas = {
	editionList: null,
	editionDatas: null,
	ordSeq: "",
	currentType: ""
};
var template_memo = "";
var template_end = "";
//
var sdm_b;
var sdm_u_wlist;
var sdm_u_wdata;
var sdm_u_mlist;
var sdm_u_mdata;
var captureIdx = -1;
var next_s;

//오리지날 내용 저장을 위한 변수.
var ZMAT1_ORI = new Array();
var ZMAT1_TX_ORI = new Array();
var JINDO_ORI = new Array();
var JINDO_TX_ORI = new Array();
var DANGE_ORI = new Array();
var DANGE_TX_ORI = new Array();

//씽크빅인지 씽크유인지
var chkThinkUB = "";
var pageParamsChange = "N";

/********************************************************************************/
// BASE logic
/********************************************************************************/
// 페이지 시작
$(document).ready(function() {
	app_endLoading();
	//
	template_memo = $('#modal_memo').html();
	$('#modal_memo').remove();
	template_end = $('#modal_end').html();
	$('#modal_end').remove();
	//
	app_getRequestParameter('setData');

});

// 페이지파라미터 수신
var setData = function($data) {
	//
	$data = $data.replace(/'/g, '"');
	if ( !! $data && $data != '""' && $data != "''") {
		pageParams = JSON.parse($data);


		//씽크빅만 인식
		$.each(pageParams.data, function(index, entry) {
			if (pageParams.referrerPage == "A020300.html") {

				ZMAT1 = pageParams.data[index].ZMAT1_SHARE;
				DANGE_CODE = pageParams.data[index].DANGE_SHARE;
				HO_CODE = pageParams.data[index].JINDO_SHARE;

				ZMAT1       == undefined ? sendChk = false : 
                ZMAT1       == ""        ? sendChk = false : 
                HO_CODE     == undefined ? sendChk = false :
                HO_CODE     == ""        ? sendChk = false : 
                DANGE_CODE  == undefined ? sendChk = false : 
                DANGE_CODE  == ""        ? sendChk = false : sendChk = true;

				if (sendChk) {
					pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1_SHARE;
					pageParams.data[index].DANGE = pageParams.data[index].DANGE_SHARE;
					pageParams.data[index].JINDO = pageParams.data[index].JINDO_SHARE;
					pageParams.data[index].ZMAT1_SHARE = "";
					pageParams.data[index].DANGE_SHARE = "";
					pageParams.data[index].JINDO_SHARE = "";
				}


			}

		});



		//
		//원본ZMAT1 저장후 페이지 변경시 넘겨줌.
		//sorting 된 값으로 저장하기 위해 setData에서 여기로 이동.
		//2013.03.05 NDH
		$.each(pageParams.data, function(index, entry) {
			ZMAT1_ORI[index] = pageParams.data[index].ZMAT1;
			ZMAT1_TX_ORI[index] = pageParams.data[index].ZMAT1_TX;
			JINDO_ORI[index] = pageParams.data[index].JINDO;
			JINDO_TX_ORI[index] = pageParams.data[index].JINDO_TX;
			DANGE_ORI[index] = pageParams.data[index].DANGE;
			DANGE_TX_ORI[index] = pageParams.data[index].DANGE_TX;
		});

		var i = 0,
			len = pageParams.data.length,
			obj;
		for (; i < len; i += 1) {
			obj = pageParams.data[i];
		}
		if (pageParams.PLUS_10MIN_USED != undefined) {
			if (pageParams.PLUS_10MIN_USED == "true") {
				IS_PLUS_10MIN_USED = true;
			}
		}
		//
		//IS_PLUS_10MIN_USED = true;
		setFinished();
	}
};
// 업무종료여부 요청
var setFinished = function() {
	app_getLearningState('returnFinished', pageParams.KUNWE, pageParams.QTIME);
}

// 업무종료여부 수신
var returnFinished = function(bool) {
	IS_FINISHED = (bool == 'true') ? true : false;
	//
	initDisplay();
}

// 페이지 시작
var initDisplay = function() {
	setFooter();
	var name = (pageParams.NAME1 == undefined) ? pageParams.KUNWE_TX : pageParams.NAME1;
	app_changeTitle(name);
	setNaviEvt();
	sortData();
	//makeList();
}

// 상단 네비게이션 탭 이벤트
var setNaviEvt = function() {
	$('#local>ul>li>a').each(function(idx, item) {
		var urls = ["A020100.html", "A020300.html", "A020400.html"];
		$(item).attr('src', urls[idx]);
		$(item).click(function(e) {
			//e.stopPropagation();
			var src = $(this).attr('src');
			switch (src) {
			case 'A020100.html':
				break;
			case 'A020300.html':
				break;
			case 'A020400.html':
				// 테스트용, 새로고침 
				// window.location.href = src + '?dummy=' + (Math.random() * Math.random());
				return false;
				break;
			}
			//
			//
			var fText;
			var iCate;
			if (src == 'A020300.html') {
				fText = '금주학습정보';
				iCate = 'KN';
				loader.sessionTotal(fText, iCate, function() {
					changePage(src)
				}, function() {
					changePage(src)
				})
			} else {
				changePage(src);
			}
		});
	});
};

// 페이지 이동
var changePage = function(page_name) {
	var url = page_name;
	if ( !! pageParams) {
		$.each(pageParams.data, function(index, entry) {
			//페이지 이동시에는 원본ZMAT1 으로 변경 2013.03.05 NDH

/*
  			pageParams.data[index].ZMAT1 = ZMAT1_ORI[index];
  			pageParams.data[index].ZMAT1_TX = ZMAT1_TX_ORI[index];
  			pageParams.data[index].JINDO = JINDO_ORI[index];
  			pageParams.data[index].JINDO_TX = JINDO_TX_ORI[index];
  			pageParams.data[index].DANGE = DANGE_ORI[index];
  			pageParams.data[index].DANGE_TX = DANGE_TX_ORI[index];
 */
			if (pageParams.data[index].ZMAT1 == "" || pageParams.data[index].ZMAT1 == undefined) {
				pageParams.data[index].ZMAT1 = ZMAT1_ORI[index];
			}
			if (pageParams.data[index].ZMAT1_TX == "" || pageParams.data[index].ZMAT1_TX == undefined) {
				pageParams.data[index].ZMAT1_TX = ZMAT1_TX_ORI[index];
			}
			if (pageParams.data[index].JINDO == "" || pageParams.data[index].JINDO == undefined) {
				pageParams.data[index].JINDO = JINDO_ORI[index];
			}
			if (pageParams.data[index].JINDO_TX == "" || pageParams.data[index].JINDO_TX == undefined) {
				pageParams.data[index].JINDO_TX = JINDO_TX_ORI[index];
			}
			if (pageParams.data[index].DANGE == "" || pageParams.data[index].DANGE == undefined) {
				pageParams.data[index].DANGE = DANGE_ORI[index];
			}
			if (pageParams.data[index].DANGE_TX == "" || pageParams.data[index].DANGE_TX == undefined) {
				pageParams.data[index].DANGE_TX = DANGE_TX_ORI[index];
			}


		});
	}
	pageParams.referrerPage = "A020400.html";
	app_changePage(url, pageParams, false);
}

// 데이터 정렬, 지난주학습정보화면에서 한번에 정렬함.
var sortData = function() {
/*
	var sortBig = {
		'000000000000001090' : '000000000000001090',
		'000000000000001114' : '000000000000001114',
		'000000000000001131' : '000000000000001131',
		'000000000000001162' : '000000000000001162',
		'000000000000001148' : '000000000000001148'
	}
	
	var sortU = {
		'000000000000001112' : '000000000000001112',
		'000000000000001001' : '000000000000001001',
		'000000000000001000' : '000000000000001000',
		'000000000000001002' : '000000000000001002'
	}
	
	var sortA = {
		'000000000000001022' : '000000000000001022',
		'000000000000001087' : '000000000000001087',
		'000000000000001056' : '000000000000001056'
	}
	
	var getSortGroupIdx = function( zcd ){
		var idx;
		if( sortBig[zcd]!=undefined ){
			idx = 0;
			return idx;
		}
		if( sortU[zcd]!=undefined ){
			idx = 0;
			return idx;
		}
		if( sortA[zcd]!=undefined ){
			idx = 2;
			return idx;
		}
		idx = 3;
		return idx;
	};
	
	var i, len, obj, arr;
	var tmpListArr = [];
	var zCode, cdi;
	arr = pageParams.data;
	i=0, len=arr.length;
	for( ;i<len;i+=1 ){
		obj = arr[i];
		zCode = obj.ZMAT1;
		
		cdi = getSortGroupIdx(zCode);
		if(tmpListArr[cdi]==undefined || tmpListArr[cdi]==null ){
			tmpListArr[cdi] = [];
		}
		tmpListArr[cdi].push( obj );
	}
	
	var j,jLen,tmpArr;
	arr = [];
	i=0, len = tmpListArr.length;
	for(;i<len;i+=1){
		tmpArr = tmpListArr[i];
		if(tmpArr!=undefined && tmpArr!=null ){
			j = 0;
			jLen = tmpArr.length;
			for( ;j<jLen;j+=1 ){
				arr.push( tmpArr[j] );
			}
		}
	}
	pageParams.data = arr;
	*/
	//ZMAT1의 변수값을 ZMAT1_P 으로 대체
	//ZMAT1는 사용하지 않음.
	//2013.03.13 NDH
	$.each(pageParams.data, function(index, entry) {
		// 2013.03.27	ypkim
		// 씽크 U과목인지 체크하여 씽크 U 과목일 경우만 지난주 진도를 이번주 진도에 대입함.

		if (pageParams.data[index].ZMAT1 == '000000000000001114' || pageParams.data[index].ZMAT1 == '000000000000001131' || pageParams.data[index].ZMAT1 == '000000000000001148' || pageParams.data[index].ZMAT1 == '000000000000001162' || pageParams.data[index].ZMAT1 == '000000000000001090') {
			pageParams.data[index].ZMAT1 = pageParams.data[index].ZMAT1_P;
			pageParams.data[index].ZMAT1_TX = pageParams.data[index].ZMAT1_PTX;
			pageParams.data[index].DANGE = pageParams.data[index].DANGE_P;
			pageParams.data[index].JINDO = pageParams.data[index].JINDO_P;
			pageParams.data[index].DANGE_TX = pageParams.data[index].DANGE_PTX;
			pageParams.data[index].JINDO_TX = pageParams.data[index].JINDO_PTX;
		}

	});
	makeList();
}

// 아코디언 리스트 생성
var makeList = function() {
	var i, len, obj, arr;
	var $container = $("#Contents.Learn_Manage>.container");
	var template = $container.html();
	var tempHtml;
	var html = '';
	var tabIdxList;
	var tabList;
	var idxList = {};
	var idList = [];
	var sbjList = {}
	var zCode, dCode, jCode, currentCode, currentDange, currentJindo, currentCodeTx, currentDangeTx, currentJindoTx, currentIdx;
	$container.empty();
	arr = pageParams.data;

	i = 0, len = arr.length;
	for (; i < len; i += 1) {
		obj = arr[i];
		zCode = obj.ZMAT1;
		sbjList[i] = obj;
		idxList[zCode] = i;
		idList.push(zCode)
		tempHtml = template.replace(/#ZMAT1_TX#/g, obj.ZMAT1_TX);
		tempHtml = tempHtml.replace(/#ZMAT1#/g, 'sbj' + i);
		tempHtml = tempHtml.replace(/#subject_txt_color#/g, 'subject_txt_color' + obj.SORT);
		
		//OHJ 20130716-----------------------------------------------------
		// 상담안 제공 과목을 따로 코드로 12개를 뻈다.
		// 씽크U와 씽크빅 과목
		// 해당하는 것이 회원 리스트에 있을때 관리 과목이므로 상담안을 전송할 수 있게 한다. 
		if(obj.ZMAT1 == code001 || obj.ZMAT1 == code002 || obj.ZMAT1 == code003 || obj.ZMAT1 == code004 ||obj.ZMAT1 == code005 || obj.ZMAT1 == code006 || obj.ZMAT1 == code007 || obj.ZMAT1 == code008 || obj.ZMAT1 == code009 ){
			//app_alert('아세요? \n 관리 과목이 포함되어 있네요?');
			IS_KID=true;
		}
		//---------------------------------------------------------------------
		
		// 스케줄에서 클릭한 값(SELECT)로 오픈되도록 수정. 2013.05.21 NDH
		if (pageParams.SELECT == obj.ZMAT1) {
			var selectCode = 'sbj' + i;
		}
		
		//if( obj.checked=='Y' ){
		if (i == 0) {
			pageParams.data.checked = 'Y';
			currentCode = zCode;
			currentDange = obj.DANGE;
			currentJindo = obj.JINDO;
			currentCodeTx = obj.ZMAT1_TX;
			currentDangeTx = obj.DANGE_TX;
			currentJindoTx = obj.JINDO_TX;
			currentIdx = i;
			//html = tempHtml + '<hr />' + html;
		} else {
			pageParams.data.checked = '';
		};
		html += tempHtml;
		if (i < len - 1) {
			html += '<hr />';
		}
	}
	//
	$container.append(html);


	if (tabList == null) {
		tabList = [];
	}
	if (tabIdxList == null) {
		tabIdxList = {};
	}
	$container.find('div.section').each(function(idx, item) {
		$(this).children(':not(h2)').hide().andSelf().find('h2 .toggle-button').removeClass('open').text('보이기');
		//
		var $h2 = $(item).find('h2');
		var id = $(this).attr('id');
		$h2.attr('id', '#' + id);
		tabList.push($h2);
		tabIdxList[i] = idx;
		$h2.bind('click', listClickHandle);
		$(this).find('.control').addClass('none');
	});
	pageData.tabList = tabList;
	pageData.tabIdxList = tabIdxList;
	pageData.idxList = idxList;
	pageData.idList = idList;
	pageData.sbjList = sbjList;
	pageData.currentCode = currentCode;
	pageData.currentDange = currentDange;
	pageData.currentJindo = currentJindo;
	pageData.currentCodeTx = currentCodeTx;
	pageData.currentDangeTx = currentDangeTx;
	pageData.currentJindoTx = currentJindoTx;

	//pageData.currentIdx = currentIdx;
	if (currentCode == '' || currentCode == undefined) {
		//app_endLoading();
	} else {
		// 스케줄에서 클릭한 값(SELECT)로 오픈되도록 수정. 2013.05.21 NDH
		//$('#sbj'+currentIdx+'>h2').trigger( 'click' );
		$('#' + selectCode + '>h2').trigger('click');
	}
	$container.removeClass('none');
}

// 리스트 클릭 이벤트 핸들러
var listClickHandle = function(e) {
	isFirst = true;
	var pd = pageData;

	var $btn;
	var orgIdx;
	var $this = $(this);
	var currentIdx = Number($this.attr('id').slice(4, $this.attr('id').length));
	var currentCode = pd.idList[currentIdx];
/*
	if( filter[currentCode]==undefined ){
		var sortA = {
			'000000000000001022' : '000000000000001022',
			'000000000000001087' : '000000000000001087',
			'000000000000001056' : '000000000000001056'
		}
		if( sortA[currentCode]==undefined ){
			app_alert( '해당 과목은 비관리 과목이므로 지난주학습점검, 이번주학습정보, 학부모상담자료를 제공하지 않습니다.' );
		}else{
			app_alert( '이번주학습정보와 학부모상담자료를 제공하지 않는 과목입니다.' );
		}
		return false;
	};
	//*/
	var idx = currentIdx;
	// NDH    2013.02.14 
	// 첫 수업일이 아직 안된 것 제외
	next_s = pd.sbjList[idx].NEXT_S;
	if (pd.currentIdx > -1) { //선택한 탭 닫을때
		$btn = (pd.tabList[pd.currentIdx]).find('button.toggle-button');
		$btn.removeClass('open').text('보이기').closest('div.section').children(':not(h2)').hide();
		$this = (pd.tabList[pd.currentIdx]);
		orgIdx = pd.currentIdx;
		pageParams.data[orgIdx].checked = "";
/* 진도변경 삭제로 주석처리
		$this.find('button.prev-button').unbind( 'click', prevButtonHandle );
		$this.find('button.next-button').unbind( 'click', nextButtonHandle );
		$this.find('.control').addClass('none');
		$this.removeClass('has-control');
		//*/
		// 타이틀 변경
		$this.find('h2>strong.wrap').empty();
		$this.find('strong.wrap').text(pd.currentCodeTx);
	}
	if (idx != pd.currentIdx) { // 탭 열때
		$this = $(this);
		pd.currentIdx = idx;
		pd.currentCode = currentCode;
		pd.currentDange = pd.sbjList[idx].DANGE;
		pd.currentJindo = pd.sbjList[idx].JINDO;
		orgIdx = currentIdx;
		pageParams.data[orgIdx].checked = "Y";
		pd.currentCodeTx = pd.sbjList[idx].ZMAT1_TX;
		pd.currentDangeTx = pd.sbjList[idx].DANGE_TX;
		pd.currentJindoTx = pd.sbjList[idx].JINDO_TX;
		$btn = $this.find('button.toggle-button');
		$btn.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').show();
		udatas.currentType = "1";
/* 진도변경 삭제로 주석처리
		$this.find('button.prev-button').bind( 'click', prevButtonHandle );
		$this.find('button.next-button').bind( 'click', nextButtonHandle );
		$this.find('.control').removeClass('none');
		$this.addClass('has-control');
		//*/


		moveSubjectTop(); // 스크롤 이동
		checkSbjCode(currentCode); // 싱크빅, 싱크U 분리
	} else { // 선택한 탭 닫을때
		pd.currentIdx = -1;
		pd.currentCode = "";
		pd.currentDange = "";
		pd.currentJindo = "";
		pd.currentCodeTx = "";
		pd.currentDangeTx = "";
		pd.currentJindoTx = "";

	}
	
		//20130617 OHJ 탭내부에서 선택한 값이 다른 탭에서도 적용되게 수정
		pageParams.SELECT=pd.currentCode;
	
};

// 상담내용 로드
var sdmLoad = function() {
	var currentIdx = pageData.currentIdx;
	if (!sdm_b) {
		sdm_b = {};
	}
	//
	if (sdm_b[currentIdx] == undefined) {} else {
/*//호출때마다 로드 하려고 주석처리.
 		sdmLoadComplete( sdm_b[currentIdx] );
 		return false;
 */
	}

	loader.service({
		Function: "sp_ap_it_sdm_s_c",
		Parameter: {
			i_subject_code: String(Number(pageData.currentCode)),
			i_stage_code: String(Number(pageData.currentDange)),
			i_ho_code: String(Number(pageData.currentJindo))
		},
		Success: function(rlt) {
			sdm_b[pageData.currentIdx] = rlt;
			sdmLoadComplete(rlt);
		},
		Error: function($e) {
			addNone('big');
			if (IS_CAPTUER) {
				captureNext();
			}
		}
	});
}

// 상담내용 로드 완료
var sdmLoadComplete = function(rlt) {
	if ($(rlt).find('Table').length > 0) {
		setThinkBig(rlt);
	} else {
		addNone('big');
		if (IS_CAPTUER) {
			captureNext();
		}
	}
}

// 씽크U 주간, 월간 등 구분하여 호출
var loadUData = function(val) {

	//menu_text_reload(true)
	switch (val) {
	case '2':
		// 월간
		hosu_btn_view("m");
		monthlyListLoad();
		break;
	case '3':
		break;
	case '4':
		break;
	default:
		// 주간
		hosu_btn_view("w");
		dangeLoadU("CL03");
		break;
	}
};

// 씽크빅, 씽크U 구분
var checkSbjCode = function(currentCode) {

	//app_startLoading();
	if (filter[currentCode] == undefined) {
		var msg;
		var sortA = {
			'000000000000001022': '000000000000001022',
			'000000000000001087': '000000000000001087',
			'000000000000001056': '000000000000001056'
		}
/*
		if( sortA[currentCode]==undefined ){
			msg = '해당 과목은 비관리 과목이므로 지난주학습점검, 이번주학습정보, 학부모상담자료를 제공하지 않습니다.';
		}else{
			msg = '이번주학습정보와 학부모상담자료를 제공하지 않는 과목입니다.';
		}
		//*/
		if (ANSWERS_U_CODE[currentCode] == undefined) {
			msg = '유아 및 비관리 과목은 학부모 상담안을<br/>제공 하지 않습니다.';
			
		} else {
			msg = '비관리 과목군입니다.';
		}
		
		//
		addNone('big', msg);
		return false;
	}
	// NDH    2013.02.14 
	// 첫 수업일이 아직 안된 것 제외
	if (next_s == "X") {
		msg = '첫 수업일이 도래 하지 않았습니다.';
		addNone('big', msg);
		return false;
	}
	//
	if (ANSWERS_U_CODE[currentCode] == undefined) { // 씽크빅
		sdmLoad();
		chkThinkUB = 'B';
	} else { // 씽크U
		setThinkU();
		chkThinkUB = 'U';
	}
}

// 수학 - 초등, 중등 구분
var getMathVal = function(currentIdx) {
	var mathVal = '';
	var currentCode = pageData.idList[currentIdx];
	if (currentCode == '000000000000001090') {
		if (pageData.sbjList[currentIdx].JUNIOR_G == "X") {
			mathVal = '_X'
		};
	};
	return mathVal;
}

// 씽크U :: 주간일 경우 단계호 조회
var dangeLoadU = function(in_menu_code) {


	var currentIdx = pageData.currentIdx;
	if (!sdm_u_wlist) {
		sdm_u_wlist = {};
	}
	if (sdm_u_wlist[currentIdx] == undefined) {} else {
/*//호출때마다 로드 하려고 주석처리.
 		dangeLoadUComplete(sdm_u_wlist[currentIdx]);
 		return false;
 */
	}
	// soap 단계_호 조회
	var currentCode = pageData.currentCode;
	// ANSWERS_U_CODE
	var mathVal = getMathVal(currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	var erpCode = pageData.sbjList[currentIdx].VBELN;
	//
	loader.service({
		Function: 'sp_it_cls_edition_menu_s_r',
		Parameter: {
			in_course_code: in_course_code,
			in_erp_order_no: erpCode,
			in_menu_code: in_menu_code
		},
		CursorCnt: '2',
		Success: function(rlt) {
			sdm_u_wlist[pageData.currentIdx] = rlt;
			dangeLoadUComplete(rlt);
		},
		Error: function() {
			addNone();
			if (IS_CAPTUER) {
				captureNext();
			}
		}
	});
}

//씽크U :: 주간 단계/호 조회
var dangeLoadUComplete = function(rlt) {

	var editionList = {};
	var editionDatas = {};
	var stageList = [];
	var hasY = false;


	$("#jindo_tree").html("");

	var currentIdx = pageData.currentIdx;
	var currentCode = pageData.currentCode;
	var currentDange = pageData.currentDange;
	var currentDangeTx = pageData.currentDangeTx;
	var currentJindo = pageData.currentJindo;
	var currentJindoTx = pageData.currentJindoTx
	var erpCode = pageData.sbjList[currentIdx].VBELN;

	var $container = $('#jindo_tree');
	var html = "";
	var menuName = "",
		menuCode = "";
	var arr = [];
	var ho_list = [];
	var count = 0;


	split_STATE_NAME = "";
	SELECTED_STATE_NAME = "";
	DATA_STAGE_ARRAY = {
		DATABASE: []
	};


	if ($(rlt).find('STAGE_SEQ').length > 0) {
        insertUTemplate();
		$(rlt).find('Table').each(function() {
			//EDITION_SEQ
			//STAGE_SEQ
			//STAGE_NAME
			//EDITION_NAME
			//STUDY_SUBJECT
			//DEFAULT_YN
			//REVISE_YN
			//EDITION_TYPE
			//ERP_COURSE_CODE
			//ERP_STAGE_CODE
			//ERP_EDITION_CODE
			//ORDER_SEQ
			var stageSeq = $(this).find('STAGE_SEQ').text();
			var stageNm = $(this).find('STAGE_NAME').text();
			var editionSeq = $(this).find('EDITION_SEQ').text();
			var editionType = $(this).find('EDITION_TYPE').text();


			var stageIdx = 0;
			var tempEList = [];
			if ($(this).find('DEFAULT_YN').text() == 'Y' && isFirst == true) {
				// if ($(this).find('DEFAULT_YN').text() == 'Y' ) {
				hasY = true;
				isFirst = false;
				pageData.currentDange = stageSeq;
				pageData.currentDangeTx = stageNm;
				pageData.currentJindo = editionSeq;
				pageData.currentJindoTx = $(this).find('EDITION_NAME').text();
				pageData.currentEType = editionType;


			}


			if (editionList[stageSeq] == undefined) {
				stageList.push({
					STAGE_SEQ: stageSeq,
					STAGE_NAME: stageNm
				});
				stageIdx++;
				//
				editionList[stageSeq] = [];
			};
			editionList[stageSeq].push({
				EDITION_SEQ: editionSeq,
				EDITION_NAME: $(this).find('EDITION_NAME').text()
			});
			editionDatas[stageSeq] = {};
			editionDatas[stageSeq][editionSeq] = this;
		});



		/////////호수 추가///////////////
		//단계 생성
		tmp_DANGE_count = $(rlt).find('Table').length;
		$(rlt).find('Table').each(function(index) {
			tmp_STAGE_NAME = $(this).find('STAGE_NAME').text();
			tmp_STAGE_SEQ = $(this).find('STAGE_SEQ').text();
			tmp_HO_SEQ = $(this).find('EDITION_SEQ').text();
			tmp_HO_NAME = $(this).find('EDITION_NAME').text();

			if (split_STATE_NAME != tmp_STAGE_NAME) {

				html += '<li ';
				if (currentDange == tmp_STAGE_SEQ) {
					html += ' class="open hover" ';
				}

				if (Number(tmp_DANGE_count) == 1) {
					html += ' style="background:none;" ';
				}


				html += ' id="dange_' + tmp_STAGE_SEQ + '">';
				html += '<span>' + tmp_STAGE_NAME + '</span>';
				html += '<ul><li><span class="placeholder">&nbsp;</span></li></ul>';
				html += '</li>';
				split_STATE_NAME = tmp_STAGE_NAME;
				count++;
				var nDATA = {
					"STAGE_NAME": tmp_STAGE_NAME,
					"STAGE_SEQ": tmp_STAGE_SEQ
				};
				DATA_STAGE_ARRAY.DATABASE.push(nDATA);
			}
		});
		html = '<ul id="tree">' + html + '</ul>';
		$container.append(html);


		back_stage_name = "";
		back_stage_seq = "";
		count = 0;


		//진도 생성 start
		$(rlt).find('Table').each(function(index) {

			html = "";
			tmp_STAGE_NAME = $(this).find('STAGE_NAME').text();
			tmp_STAGE_SEQ = $(this).find('STAGE_SEQ').text();
			tmp_HO_SEQ = $(this).find('EDITION_SEQ').text();
			tmp_HO_NAME = $(this).find('EDITION_NAME').text();
			tmp_EDITION_TYPE = $(this).find('EDITION_TYPE').text();


			if (back_stage_name != tmp_STAGE_NAME) {
				tmp_DANGE_count = DATA_STAGE_ARRAY.DATABASE.length;
				for (tmpNo = 0; tmpNo < tmp_DANGE_count; tmpNo++) {
					if (DATA_STAGE_ARRAY.DATABASE[tmpNo]["STAGE_NAME"] == tmp_STAGE_NAME) {
						tmp_STAGE_SEQ = DATA_STAGE_ARRAY.DATABASE[tmpNo]["STAGE_SEQ"]
						break;
					}
				}
				back_stage_name = tmp_STAGE_NAME;
				back_stage_seq = tmp_STAGE_SEQ;
			} else {
				tmp_STAGE_SEQ = back_stage_seq;
			}

			$container = $('#dange_' + tmp_STAGE_SEQ);
			$ul = $container.find('ul');
			try {
				if (String($ul.html()).indexOf("placeholder") >= 0) $ul.empty();
			} catch (e) {}
			menuCode = tmp_HO_SEQ;
			menuName = tmp_HO_NAME;

			html += '<li id="jindo_' + menuCode + '" style="left:-20px;">\n';
			html += '<label for="r_' + menuCode + '" onclick=\'radioCheck("r_' + menuCode + '");\'>\n';
			html += '<input type="radio"  name="jindo_change" id="r_' + menuCode + '" \
            value="' + menuCode + '" dange_name="' + tmp_STAGE_NAME + '" dange_code="' + tmp_STAGE_SEQ + '" ';
            
			if (menuCode == pageData.currentJindo) {
				//if (menuName == pageData.currentJindoTx) {
				html += 'checked="checked"';
			}
			html += '>\n';
			html += ' ' + menuName + '';
			html += '</label>\n';
			html += '</li>\n\n';


			$ul.append(html);


		}); //진도 생성 end


		if (hasY) {

/*두번째불러올때부터 데이터 안 가져옴 삭제 예정.
 			addNone();
 			return;
 */
		}
		// insert U data
		udatas.editionList = editionList;
		udatas.editionDatas = editionDatas;
		udatas.ordSeq = $(rlt).find('ORDER_SEQ').text();

		var $section = $('#sbj' + pageData.currentIdx);

		//
		var currentCode = pageData.currentCode;
		var mathVal = getMathVal(pageData.currentIdx);
		var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
		setUEditionType(); // 정리호 상담안 제거

/*
 		if ('ENGP' == in_course_code && pageData.currentEType == "P") {
 			addNone('U', '싱크U 영어 정리호는<br>상담안을 제공하지 않습니다.');
 			return false;
 		}
 */
		//

		$('#tree').treeview({
			persist: "location",
			collapsed: true,
			unique: true,
/*
                                     			toggle: function( idx, item){
                                     				if( $(item).css('display')=='block' ){
                                     					var cDatas = $(this).attr('id').split('_');
                                     					pageData.currentDange = cDatas[1];
                                     					pageData.currentDangeTx = cDatas[2];

                                     				}
                                     			}
                         */
		});
		app_endLoading();


		weeklyLoad();
	} else {
		addNone();
		if (IS_CAPTUER) {
			captureNext();
		}
	}
}

//씽크U :: 주간월간 셀렉트박스 셋팅(예외처리)
var setUEditionType = function() {
	var currentCode = pageData.currentCode;
	var mathVal = getMathVal(pageData.currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	var $section = $('#sbj' + pageData.currentIdx);
	// 싱크U 한자 월간상담안 제거.
	if ('CHCH' == in_course_code) {
		$section.find('#week_month_select option[value=2]').remove();
	}
	// 싱크U 영어 정리호 월간상담안 제거
	if ('ENGP' == in_course_code && pageData.currentEType == "P") {
		$section.find('#week_month_select option[value=2]').remove();
		addNone('U', '싱크U 영어 정리호는<br>상담안을 제공하지 않습니다.');
		return false;
	}
}

//씽크U ::: 주간 상담안 로드
var weeklyLoad = function() {

	//상담안이 존재할 때.
  //IS_KID = true;
	var currentIdx = pageData.currentIdx;
	if (!sdm_u_wdata) {
		sdm_u_wdata = {};
	}
	if (sdm_u_wdata[currentIdx] == undefined) {} else {
/*//호출때마다 로드 하려고 주석처리.
 		weeklyLoadComplete(sdm_u_wdata[currentIdx]);
 		return false;
 */
	}
	var currentCode = pageData.currentCode;
	//ANSWERS_U_CODE
	var mathVal = getMathVal(currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	var jindo_code = pageData.currentJindo;


	loader.service({
		Function: 'sp_it_cls_rpt_type_week_r',
		Parameter: {
			in_course_code: in_course_code,
			in_order_seq: udatas.ordSeq,
			in_edition_seq: jindo_code
		},
		CursorCnt: '2',
		Success: function(rlt) {
			sdm_u_wdata[pageData.currentIdx] = rlt;
			weeklyLoadComplete(rlt);

		},
		Error: function() {
			addNone();
			if (IS_CAPTUER) {
				captureNext();
			}
		}
	});
}

//씽크U :: 주간상담안 로드 완료
var weeklyLoadComplete = function(rlt) {
	if ($(rlt).find('Table').length > 0) {
		setWeekContents(rlt);
	} else {

		addNone();
		if (IS_CAPTUER) {
			captureNext();
		}
	}
}

//씽크U :: 주간 상담안 디스플레이
function setWeekContents(data) {


/*
	 * MEMBER_NAME
	 * STAGE_NAME
	 * EDITION_NAME
	 * MY_SCORE1
	 * MY_SCORE2
	 * AVG_SCORE1
	 * AVG_SCORE2
	 * ANSWER_CNT1
	 * ANSWER_CNT2
	 * STUDY_SUBJECT
	 * NEXT_STUDY_SUBJECT
	 * MENT
	 * 
	 */
	var currentCode = pageData.currentCode;
	//ANSWERS_U_CODE
	var currentIdx = pageData.currentIdx;
	var mathVal = getMathVal(currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	//var $conBody = $('#sbj' + pageData.currentIdx).find('.viewport #contentsBody');
	var $conBody = $('#sbj' + pageData.currentIdx).find('.viewport #contentsBody');

	$data = $(data);
	if ($data.find('Table').length > 0) {
		$data.find('Table').each(function() {
			$conBody.find('#score').empty();
			$conBody.find('#langTitle').empty();
			$conBody.find('#lang').empty();
			$conBody.find('#STUDY').empty();
			$conBody.find('#NEXT_STUDY').empty();
			$conBody.find('#NAME').empty();
			$conBody.find('#MENT').empty();
			//
			if (in_course_code == 'KORN') {
				$conBody.find('div.Learn_Manage_Weekly').addClass('Subject_Type_' + in_course_code);
			}
			if (in_course_code == 'SOSC') {
				//$conBody.find('div.Learn_Manage_Weekly').removeClass( 'Learn_Manage_Weekly' );
				$conBody.find('div.Learn_Manage_Weekly').addClass('Subject_Type_' + in_course_code);
			}
			var stext = '',
				reg, visible = false;
			if (in_course_code == "SOSC") {
				var tempA = $data.find('STAGE_NAME').text().toLowerCase() == "i";
				var tempBObj = {
					'48': '48',
					'49': '49',
					'50': '50',
					'51': '51',
					'52': '52'
				};
				var tempB = tempBObj[$data.find('EDITION_NAME').text()] == undefined;
				if (pageData.currentEType == "H40" && !(tempA && !tempB)) {
					$conBody.find('#countColumn').addClass('none');
					$conBody.find('#scoreColumn').css('width', '100%');
					$conBody.find('#scoreTitle').text('이번 호 학습 내용');
					$conBody.find('#score').append('<em>이번 호에는 다음 학기에 배울 내용을 체험학습과 실험을 중심으로 공부하였습니다.</em>');
				} else {
					$conBody.find('#scoreTitle').text('사회과목 점수');
					stext = $data.find('MY_SCORE1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#score').append('<em><span>' + Math.floor(Number(stext) * 10) / 10 + '</span>점</em>');
					} else {
						if (!visible) visible = false;
					}
				}
			} else if (in_course_code == 'CHCH') {
				$conBody.find('#countColumn').css('width', '50%');
				$conBody.find('#scoreColumn').css('width', '50%');
				var tempUnitStr = '';
				// 정리호 일때 푼 예상문제 풀이점수 출력.(정리호 코드가없어 임의로 작업)
				if ($data.find('STAGE_NAME').text().indexOf("A") > -1 && Number($data.find('EDITION_NAME').text().replace(/[^\d]/g, '')) % 4 == 0) {
					tempUnitStr = "점";
					$conBody.find('#scoreTitle').text('점수');
					stext = $data.find('AVG_SCORE1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#score').append('<em><span>' + Math.floor(Number(stext) * 10) / 10 + '</span>' + tempUnitStr + '</em>');
					} else {
						if (!visible) visible = false;
					}
				} else {
					tempUnitStr = "자";
					$conBody.find('#scoreTitle').text('새로운 한자 수');
					stext = $data.find('ANSWER_CNT1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#score').append('<em>' + stext + ' ' + tempUnitStr + '</em>');
					} else {
						if (!visible) visible = false;
					}
				}
				//
			} else if (in_course_code == 'KORN') {
				// 국어 독서호 점수 나오지 않게 수정
				if (pageData.currentEType == "DS") {
					$conBody.find('#scoreColumn').addClass('none');
					$conBody.find('#countColumn').css('width', '100%');
				} else {
					$conBody.find('#scoreTitle').text('점수');
					stext = $data.find('MY_SCORE1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#score').append('<em><span>' + Math.floor(Number(stext) * 10) / 10 + '</span>점</em>');
					} else {
						if (!visible) visible = false;
					}
				}
			} else {
				$conBody.find('#scoreTitle').text('점수');
				stext = $data.find('MY_SCORE1').text();
				if (stext.length > 0) {
					visible = true;
					$conBody.find('#score').append('<em><span>' + Math.floor(Number(stext) * 10) / 10 + '</span>점</em>');
				} else {
					if (!visible) visible = false;
				}
			}
			if (in_course_code == 'SOSC') {
				$conBody.find("#count").removeClass('count');
				$conBody.find("#count").addClass('score');
				$conBody.find('#langTitle').text('과학과목 점수');
				stext = $data.find('MY_SCORE2').text();
				if (stext.length > 0) {
					visible = true;
					$conBody.find('#lang').append('<em><span>' + Math.floor(Number(stext) * 10) / 10 + '</span>점</em>');
				} else {
					if (!visible) visible = false;
				}
			} else if (in_course_code == 'KORN') {
				if (pageData.currentEType == "DS") {
					$conBody.find('#langTitle').text('읽은 글자 수');
					stext = $data.find('ANSWER_CNT1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#lang').append('&middot; ' + stext + ' 자<br />');
					} else {
						if (!visible) visible = false;
					}
				} else {
					$conBody.find('#langTitle').text('읽고 쓴 글자수');
					stext = $data.find('ANSWER_CNT1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#lang').append('&middot; 읽기: ' + stext + '자<br />');
					} else {
						if (!visible) visible = false;
					}
					stext = $data.find('ANSWER_CNT2').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#lang').append('&middot; 쓰기: ' + stext + '자');
					} else {
						if (!visible) visible = false;
					}
				}
			} else if (in_course_code == 'CHCH') {
				// 정리호 일때 푼 예상문제 풀이점수 출력.(정리호 코드가없어 임의로 작업)
				if ($data.find('STAGE_NAME').text().indexOf("A") > -1 && Number($data.find('EDITION_NAME').text().replace(/[^\d]/g, '')) % 4 == 0) {
					$conBody.find('#langTitle').text('적용급수');
					stext = $data.find('ANSWER_CNT1').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#lang').append(stext + ' 급');
					} else {
						if (!visible) visible = false;
					}
				} else {
					$conBody.find('#langTitle').text('누적 한자 수');
					stext = $data.find('ANSWER_CNT2').text();
					if (stext.length > 0) {
						visible = true;
						$conBody.find('#lang').append(stext + ' 자');
					} else {
						if (!visible) visible = false;
					}
				}
			} else if (in_course_code == 'ENGP') {
				$conBody.find('#langTitle').text('학습 시간');
				stext = $data.find('ANSWER_CNT1').text();
				if (stext.length > 0) {
					visible = true;
					$conBody.find('#lang').append(stext + ' 분');
				} else {
					if (!visible) visible = false;
				}
			} else {
				$conBody.find('#langTitle').text('푼 문항 수');
				stext = $data.find('ANSWER_CNT1').text();
				if (stext.length > 0) {
					visible = true;
					$conBody.find('#lang').append(stext + ' 문항');
				} else {
					if (!visible) visible = false;
				}
			}
			if (visible) {} else {
				$conBody.find('div.Learn_Manage_Weekly').addClass('none')
			}
			if (in_course_code == 'SOSC') {
				reg = /##/g;
			} else {
				reg = /#n/g;
			}
			stext = $data.find('STUDY_SUBJECT').text().replace(reg, '<br/>');
			// $$$
			//
			if (stext.length > 0) {
				$conBody.find('#STUDY').append(stext);
			} else {
				$conBody.find('#STUDY_TOP_DIV').addClass('none');
			}
			if ($conBody.find('div.Learn_Manage_Weekly').hasClass('none') && $conBody.find('#STUDY_TOP_DIV').hasClass('none')) {
				$conBody.find('#WEEK_TOP_DIV').addClass('none');
			}
			stext = $data.find('NEXT_STUDY_SUBJECT').text().replace(reg, '<br/>&middot; ');
			if (stext.length > 0) {
				stext = '&middot; ' + stext;
				$conBody.find('#NEXT_STUDY').append(stext);
			} else {
				$conBody.find('#NEXT_STUDY_TOP_DIV').addClass('none');
			}
			stext = $data.find('MENT').text().replace(/#n/g, '<br/>');
			if (in_course_code == 'CHCH') {
				stext = "";
			}
			if (in_course_code == 'MA02') {
				stext = "";
			}
			if (stext.length > 0) {
				var name = pageParams.NAME1 == undefined ? pageParams.KUNWE_TX : pageParams.NAME1;
				stext = ('$회원명$ 회원님을 칭찬해주세요!').replace(/\$회원명\$/, name);
				$conBody.find('#NAME').append(stext);
				stext = $data.find('MENT').text().replace(/#n/g, '<br/>');
				$conBody.find('#MENT').append(stext);
			} else {
				$conBody.find('#MENT_TOP_DIV').addClass('none');
			}

		});
	}
	if (IS_CAPTUER) {
		captureNext();
	}
	menu_text_set();
	//주간상담안의 종착역...
    
}


/*
 * YEAR
 * MONTH
 * DEFAULT_YM
 * 
 * ORDER_SEQ
 * 
 * 월간상담안 단계 / 호 조회
 */

var monthlyListLoad = function() {

	var currentIdx = pageData.currentIdx;
	if (!sdm_u_mlist) {
		sdm_u_mlist = {};
	}
	if (sdm_u_mlist[currentIdx] == undefined) {} else {
/*//호출때마다 로드 하려고 주석처리.	   
		monthlyListLoadComplete(sdm_u_mlist[currentIdx]);
		return false;
*/
	}
	// soap 단계_호 조회
	var currentCode = pageData.currentCode;
	// ANSWERS_U_CODE
	var mathVal = getMathVal(currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	var erpCode = pageData.sbjList[currentIdx].VBELN;
	loader.service({
		Function: "sp_it_cls_rpt_mon_cal_r",
		Parameter: {
			in_course_code: in_course_code,
			in_erp_order_no: erpCode
		},
		CursorCnt: '2',
		Success: function(rlt) {
			sdm_u_mlist[pageData.currentIdx] = rlt;
			monthlyListLoadComplete(rlt);
		},
		Error: loadFailed
	});
};

var monthlyListLoadComplete = function(rlt) {
	var $data = $(rlt);
	var $section = $('#sbj' + pageData.currentIdx);

        
        
        
if($.trim($section.find("#hosu_search_u_month").html())==""){
 	var addDateOpt="";
    $data.find('Table').each(function(idx,entry){
        dateVal = $(this).find('YEAR').text() + $(this).find('MONTH').text();
        dateTx  = $(this).find('YEAR').text() + "년 " + $(this).find('MONTH').text() + "월";
        
		if ($(this).find('DEFAULT_YM').text() == 'Y') {
            addDateOpt += "<option value='" + dateVal + "' selected >" + dateTx + "</option>";
        }else{
            addDateOpt += "<option value='" + dateVal + "' >" + dateTx + "</option>";
        }
    });
    $section.find("#hosu_search_u_month").html(addDateOpt);
    
}



	var dtStr = $section.find("#hosu_search_u_month option:selected").val();
	if (dtStr == "" || dtStr == undefined) {
		//dtStr = String(dt.getFullYear()) + getDigitNum(String(dt.getMonth() + 1));
        app_alert('시간데이터가 없습니다.');
	}


	//thinkULoadTypeCheck( 'm', monthlyDataLoad, [in_course_code, $data.find('Table1').find('ORDER_SEQ').text(), dtStr] );
	var mathVal = getMathVal(pageData.currentIdx);
	var in_course_code = ANSWERS_U_CODE[pageData.currentCode + mathVal].in_course_code;
	var ordSeq = $data.find('Table1').find('ORDER_SEQ').text();
	
    if (ordSeq == "" || ordSeq == undefined) {
		app_alert("조회할 수 없는 과목입니다.");
	} else {
		monthlyDataLoad(in_course_code, ordSeq, dtStr);
	}

}

/*
 * MEMBER_NAME
 * MY_SCORE1
 * MY_SCORE2
 * AVG_SCORE1
 * AVG_SCORE2
 * ANSWER_CNT1
 * ANSWER_CNT2
 * 
 * STAGE_NAME
 * EDITION_NAME
 * EDITION_SUBJECT1
 * EDITION_SUBJECT2
 * EDITION_SUBJECT3
 * 
 * 월간 상담안 조회
 * 
 */

function monthlyDataLoad(in_course_code, ordSeq, date) {
	var currentIdx = pageData.currentIdx;
	if (!sdm_u_mdata) {
		sdm_u_mdata = {};
	}
	if (sdm_u_mdata[currentIdx] == undefined) {} else {
/*//호출때마다 로드 하려고 주석처리.	   
		monthlyDataLoadComplete(sdm_u_mdata[currentIdx]);
		return false;
*/
	}
	loader.service({
		Function: "sp_it_cls_rpt_type_monthly_r",
		Parameter: {
			in_course_code: in_course_code,
			in_order_seq: ordSeq,
			in_ym: date
		},
		CursorCnt: '3',
		Success: function(rlt) {
			sdm_u_mdata[pageData.currentIdx] = rlt;
			monthlyDataLoadComplete(rlt);
		},
		Error: loadFailed
	});
}

// 월간 상담안 조회 완료
var monthlyDataLoadComplete = function(rlt) {
	var $data = $(rlt);
	if ($data.find('MEMBER_NAME').length > 0) {
		insertUTemplate();
		displayMonthly($data);
	} else {
		addNone();
		if (IS_CAPTUER) {
			captureNext();
		}
	}
}

// 월간 상담안 디스플레이
function displayMonthly($data) {
	var currentCode = pageData.currentCode;
	//ANSWERS_U_CODE
	var currentIdx = pageData.currentIdx;
	var mathVal = getMathVal(currentIdx);
	var in_course_code = ANSWERS_U_CODE[currentCode + mathVal].in_course_code;
	var $conBody = $('#sbj' + pageData.currentIdx).find('.viewport #contentsBody');

	var dt = new Date();
	//var month = (dt.getMonth() + 1);
	var selDate = $("#hosu_search_u_month option:selected").val();
	var month = Number(Right(selDate, 2));

	if ($data.find('MEMBER_NAME').length > 0) {
		if (in_course_code == 'KORN' || in_course_code == 'SOSC') {
			$conBody.find('div.Learn_Manage_Monthly').addClass('Subject_Type_' + in_course_code);
		}
		var el = $conBody.find('#MONTH_TOP_DIV');
		var txt = '',
			stext = '',
			visible = false;
		$data.find('Table').each(function() {
			el.find('#MEMBER_NAME').text($(this).find('MEMBER_NAME').text() + ' (이)가 이번달 공부한 내용이예요.');
			if (in_course_code == "SOSC") {
				el.find('#MON').text(month + '월 사회과목 점수');
				//
				stext = $(this).find('MY_SCORE1').text();
				if (stext.length > 0) {
					visible = true;
					txt = '<em><span>' + stext + '</span>점</em>';
					stext = $(this).find('AVG_SCORE1').text();
				} else {
					if (!visible) visible = false;
				}
				if (stext.length > 0) {
					visible = true;
					txt += ' / 평균' + stext + '점<br />';
					el.find('#score').append(txt);
				} else {
					if (!visible) visible = false;
				}
			} else {
				el.find('#MON').text(month + '월 점수');
				//
				stext = $(this).find('MY_SCORE1').text();
				if (stext.length > 0) {
					visible = true;
					txt = '<em><span>' + stext + '</span>점</em>';
					stext = $(this).find('AVG_SCORE1').text();
				} else {
					if (!visible) visible = false;
				}
				if (stext.length > 0) {
					visible = true;
					txt += ' / 평균' + stext + '점';
					el.find('#score').append(txt);
				} else {
					if (!visible) visible = false;
				}
			}
			if (in_course_code == "SOSC") {
				el.find("#count").removeClass('count');
				el.find("#count").addClass('score');
				el.find('h4#ANSWER_TITLE').text(month + '월 과학과목 점수');
				//
				stext = $(this).find('MY_SCORE2').text();
				if (stext.length > 0) {
					visible = true;
					txt = '<em><span>' + stext + '</span>점</em>';
				} else {
					if (!visible) visible = false;
				}
				stext = $(this).find('AVG_SCORE2').text();
				if (stext.length > 0) {
					visible = true;
					txt += ' / 평균' + stext + '점';
					el.find('div#ANSWER_CNT').append(txt);
				} else {
					if (!visible) visible = false;
				}
			} else if (in_course_code == "KORN") {
				el.find('h4#ANSWER_TITLE').text(month + '월에 읽고 쓴 글자수');
				stext = $(this).find('ANSWER_CNT1').text();
				if (stext.length > 0) {
					visible = true;
					el.find('div#ANSWER_CNT').append('&middot; 읽기: ' + stext + '자<br />');
				} else {
					if (!visible) visible = false;
				}
				stext = $(this).find('ANSWER_CNT2').text();
				if (stext.length > 0) {
					visible = true;
					el.find('div#ANSWER_CNT').append('&middot; 쓰기: ' + stext + '자');
				} else {
					if (!visible) visible = false;
				}
			} else {
				el.find('h4#ANSWER_TITLE').text(month + '월에 푼 문항 수');
				stext = $(this).find('ANSWER_CNT1').text();
				if (stext.length > 0) {
					visible = true;
					el.find('div#ANSWER_CNT').append(stext + '문항');
				} else {
					if (!visible) visible = false;
				}
			}
			stext = $(this).find('MENT').text();
			if (stext.length > 0) {
				txt = stext.replace(/#n/g, '<br />');
				$conBody.find('#MENT').html(txt);
			} else {
				$conBody.find('#MENT_TOP_DIV').addClass('none');
			}
		});
		if (visible) {} else {
			$conBody.find('div.Learn_Manage_Monthly').addClass('none')
		}
		if ($conBody.find('div.Learn_Manage_Monthly').hasClass('none') && $conBody.find('#MENT_TOP_DIV').hasClass('none')) {
			$conBody.find('#MONTH_TOP_DIV').addClass('none');
		}
	}
	var tId = '#template_table>#';
	switch (in_course_code) {
	case 'SOSC':
		tId += 'SOSC';
		break;
	case 'KORN':
		tId += 'KORN';
		break;
	default:
		tId += 'DEFAULT';
		break;
	}
	var html = $(tId).html();
	html = html.replace(/#ZMAT1#/g, in_course_code);
	$conBody.find('#NEXT_STUDY').append(html);
	//
	var tbody = $conBody.find('#NEXT_STUDY>table>tbody');
	var template = tbody.html();

	var tmpHtml = '';
	var inList = {};
	tbody.empty();
	//
	html = '';
	if ($data.find('Table1').length > 0) {
		$data.find('Table1').each(function() {
			tmpHtml = template;
			var preStr = '';
			var stageNm = $(this).find('STAGE_NAME').text().replace(/단계/g, '');
			var editionNm = $(this).find('EDITION_NAME').text().replace(/호/g, '');;
			var editionSbj1 = $(this).find('EDITION_SUBJECT1').text();
			var editionSbj2 = $(this).find('EDITION_SUBJECT2').text();
			var editionSbj3 = $(this).find('EDITION_SUBJECT3').text();
			var keyNm = stageNm + '_' + editionNm;
			//
			if (in_course_code == 'SOSC') { // 사회과학
				if (editionSbj1 == '사회') {
					preStr = "SO_";
				} else {
					preStr = "SC_";
				}
				//
				if (inList[keyNm] == undefined) {
					inList[keyNm] = true;
					tmpHtml = tmpHtml.replace(/#SE1#/, 'SO_' + keyNm);
					tmpHtml = tmpHtml.replace(/#SE2#/, 'SC_' + keyNm);
					tmpHtml = tmpHtml.replace(/#STAGE_NAME#/, stageNm);
					tmpHtml = tmpHtml.replace(/#EDITION_NAME#/, editionNm);
					tmpHtml = tmpHtml.replace('#' + preStr + 'EDITION_SUBJECT1#', editionSbj1);
					tmpHtml = tmpHtml.replace('#' + preStr + 'EDITION_SUBJECT2#', editionSbj2);
					//
					html = tmpHtml;
					tbody.append(html);
				} else {
					var scObj = tbody.find('#' + preStr + keyNm + '>#' + preStr + 'EDITION_SUBJECT1');
					var sbjtxt = scObj.text();
					scObj.text(sbjtxt.replace('#' + preStr + 'EDITION_SUBJECT1#', editionSbj1));
					scObj = tbody.find('#' + preStr + keyNm + '>#' + preStr + 'EDITION_SUBJECT2');
					sbjtxt = scObj.text();
					scObj.text(sbjtxt.replace('#' + preStr + 'EDITION_SUBJECT2#', editionSbj2));
					//
					scObj = null;
					sbjtext = null;
				}
			} else { // 국어및 일반과목
				tmpHtml = tmpHtml.replace(/#STAGE_NAME#/, stageNm);
				tmpHtml = tmpHtml.replace(/#EDITION_NAME#/, editionNm);
				tmpHtml = tmpHtml.replace(/#EDITION_SUBJECT1#/, editionSbj1);
				tmpHtml = tmpHtml.replace(/#EDITION_SUBJECT2#/, editionSbj2);
				tmpHtml = tmpHtml.replace(/#EDITION_SUBJECT3#/, editionSbj3);
				html += tmpHtml;
			}
		});
		if (in_course_code != 'SOSC') {
			tbody.append(html);
		}
	} else {
		$conBody.find('#NEXT_STUDY_TOP_DIV').addClass('none');
	}
	//app_endLoading();
	if (IS_CAPTUER) {
		captureNext();
	}

	menu_text_set();
};

// 씽크U html 파일 append
var setThinkU = function() {

	var pd = pageData,
		currentCode = pd.currentCode;
	//
	var $section = $('#sbj' + pd.currentIdx);

	if ($section.has('div.viewport').length > 0) {
		//$section.find('div.selecting>button').unbind( 'click', changeJindo );
		$section.find('#hosu_search_u_month').unbind('change', changeUType);
		$section.find('#week_month_select').unbind('change', changeUType);
		$section.find('div.viewport').remove();
	};
	var template = $("#template_body_u").html();
	$section.append(template);

	//
	// 이벤트
	//$section.find('div.selecting>button').bind( 'click', changeJindo );

	if (udatas.currentType == "" || udatas.currentType == undefined) {
		udatas.currentType = '1';
	}
	$section.find('#hosu_search_u_month').bind('change', changeUType);


	var $select = $section.find('#week_month_select');
	$select.bind('change', changeUType);
	$select.find('option[value=' + udatas.currentType + ']').attr('selected', 'selected');
	$select.trigger('change');


}

// 주간, 월간 셀렉트 박스 이벤트 핸들러
var changeUType = function(e) {
	var pd = pageData,
		currentCode = pd.currentCode;
	var $section = $('#sbj' + pd.currentIdx);
	var val = $section.find("#week_month_select option:selected").val();


/*
  	if (udatas.currentType != val) {
  		$(e.currentTarget).find('option[value=' + udatas.currentType + ']').removeAttr('selected');
  	}
 */
	udatas.currentType = val;
	$section.find("#week_month_select").find('option[value=' + udatas.currentType + ']').attr('selected', 'selected');
	if ($section.find('.viewport #contentsBody').length > 0) {
		$section.find('.viewport #contentsBody').remove();
	};

	//
	loadUData(val);
}


/*

영어 
일반 : B 
정리 : P 


*** 수학
본호 : B
형성테스트 : H
총정리 : C


*** 한자 
A 1-24
복습호 4,8,12,16,20,24
일반호 나머지

*** 국어
일반호 : IB
독서호 : DS
정리호 : JR
보강호 : BG


*** 사회과학
본호 : 			H1
형성테스트호 : 	H2
총정리호 : 		H3
방학호 : 		H40
예비중등호 : 		H41

 */
// 로드 타입 체크
var thinkULoadTypeCheck = function(tp, fn, arg) {
	// *****************************
	var displayed = true;
	var msg;
	var mathVal = getMathVal(pageData.currentIdx);
	var in_course_code = ANSWERS_U_CODE[pageData.currentCode + mathVal].in_course_code;
	switch (in_course_code) {
	case 'MA01':
		break;
	case 'MA02':
		break;
	case 'SOSC':
		break;
	case 'KORN':
		break;
	case 'CHCH':
		break;
	case 'ENGP':
		if (pageData.currentEType == "P") {
			displayed = false;
			msg = '씽크U영어 정리호는<br> 상담안을 지원하지 않습니다.'
		} else {
			displayed = true;
		}
		break;
	}
	if (displayed) {
		fn.apply(undefined, arg);
	} else {
		addNone(tp, msg);
	}
}

// 씽크U html 템플릿 반환
var insertUTemplate = function() {
	var pd = pageData,
		currentCode = pd.currentCode;
	var $section = $('#sbj' + pd.currentIdx);
	var val = $section.find('#week_month_select option:selected').val();
	var template;
	switch (val) {
	case '2':
		template = $('#template_month').html();
		break;
	case '3':
		break;
	case '4':
		break;
	default:
		template = $('#template_week').html();
		break;
	}
	//
    $section.find('.viewport #contentsBody').remove();
	$section.find('.viewport').append(template);

};

// 씽크빅 상담 셋팅
var setThinkBig = function(rlt) {
	var pd = pageData,
		currentCode = pd.currentCode;
	//
	var $section = $('#sbj' + pd.currentIdx);
	if ($section.has('div.viewport').length > 0) {
		//$section.find('div.selecting>button').unbind( 'click', changeJindo );
		$section.find('#hosu_search_u_month').unbind('change', changeUType);
		$section.find('div.viewport').remove();
	};
	var template = $("#template_body").html();
	$section.append(template);
	//
	var list = {};
	var currentIdx = pd.currentIdx;
	var sbj = pd.sbjList[currentIdx];
	var recordStr = sbj.record,
		resultTp, resultStr;
	var firstContents = [];
	$(rlt).find('Table').each(function() {
		var mtitle = $(this).find('MENT_TITLE').text(),
			mtext = $(this).find('MENT_TEXT').text(),
			stitle = $(this).find('MENT_SUB').text(),
			mtext2 = $(this).find('MENT_TEXT2').text(),
			detail = $(this).find('DETAIL').text(),
			gb = mtitle.slice(0, 1),
			idx = Number(mtitle.slice(1, mtitle.length));
		if (list[gb] == undefined) {
			list[gb] = [];
		}
		if (list[gb][idx] == null) {
			list[gb][idx] = {};
		}
		//
		switch (gb) {
		case "A":
			if (pd.currentDange == sbj.DANGE && pd.currentJindo == sbj.JINDO) {
				if (recordStr == "" || recordStr == undefined) {
					resultTp = "2";
				} else {
					var nstr = sbj.result;
					if (isNaN(Number(nstr))) {
						if (nstr == 'A') {
							resultTp = "0";
							resultStr = recordStr;
						} else {
							resultTp = "2";
						}
					} else {
						if (resultStr == "" || resultStr == undefined) {
							resultTp = "2";
						} else {
							resultTp = "1";
							resultStr = nstr;
						}
					}
				}
			} else {
				resultTp = "2";
			}
			if (resultTp == '2') {
				resultStr = "0"
			}
			if (mtext == "1" && stitle == "0" && mtext2 == '0') {
				firstContents[idx] = detail;
			}
			break;
		case "B":
		case "C":
		case "D":
			resultTp = '0';
			break;
		}
		if (mtext == "0" && stitle == "0" && mtext2 == "0") {
			list[gb][idx]['title'] = detail;
		}
		if (mtext == "1" && stitle == "0" && mtext2 == resultTp) {
			list[gb][idx]['contents'] = detail;
		}
	});
	var chkArr = ['A', 'B', 'C', 'D'],
		checked = false;
	var i = 0,
		len = chkArr.length;
	for (; i < len; i += 1) {
		if (list[chkArr[i]] == undefined) {} else {
			checked = true;
		}
	}
	if (checked) {
		i = 0, len = list['A'].length;
		var aObj;
		for (; i < len; i += 1) {
			aObj = list['A'][i];
			if (aObj.contents == undefined) {
				list['A'][i].contents = firstContents[i]
			}
		}
		//
		//
		var typeKey;
		var $div = $section.find('.learning'),
			html = '';
		var name = pageParams.NAME1 == undefined ? pageParams.KUNWE_TX : pageParams.NAME1;
		if ( !! list['A']) {
			html += '<div class="section">';
			html += '<h3><strong class="wrap">' + name + '(이)가 지난주 배운 내용이예요</strong></h3>'
			html += getSdmString(list, 'A');
			html += '</div>';
		}
		if ( !! list['B']) {
			html += '<div class="section">';
			html += '<h3><strong class="wrap">' + name + '(이)가 이번주에 배운 내용이예요</strong></h3>'
			html += getSdmString(list, 'B');
			html += '</div>';
		}
		if ( !! list['D']) {
			html += '<div class="section">';
			html += '<h3><strong class="wrap">' + name + '(이)가 다음주에 배울 내용이예요</strong></h3>'
			if ('000000000000001000' == currentCode) {
				typeKey = 'D';
			} else {
				typeKey = 'C';
			}
			html += getSdmString(list, typeKey);
			html += '</div>';
		}
		//국어 학습 Tip, 
		if ('000000000000001000' == currentCode) {
			typeKey = 'C';
		} else {
			typeKey = 'D';
		}
		html += getSdmTipString(list, typeKey);
		html = html.replace(/\$회원명\$/g, name);
		html = html.replace(/\$과정테스트 전체 문항 수\$/g, '<span class="color-point" >' + recordStr + '</span>');
		html = html.replace(/\$과정테스트 전체 문항수\$/g, '<span class="color-point" >' + recordStr + '</span>');
		html = html.replace(/\$맞은 문제 수\$/g, '<span class="color-point" >' + resultStr + '</span>');
		$div.append(html);
		html = '';
		pd.currentDangeTx = $(this).find('STAGE_NAME').text();
		pd.currentJindoTx = $(this).find('HO').text();
		// 진도변경 사용하지 않아 삭제
		//$section.find('div.selecting>button').bind( 'click', changeJindo );

		jindo_windows(false); //setThinkBig

	} else {
		addNone();
	}
	//app_endLoading();
	if (IS_CAPTUER) {
		captureNext();
	}

}

// 일반 상담내용 카테고리 반환
var getSdmString = function(list, key) {
	var html = '';
	var arr = list[key];
	var title;
	var contents;
	if ( !! arr) {
		var i = 0,
			len = arr.length,
			obj;
		for (; i < len; i += 1) {
			obj = arr[i];
			title = obj['title'];
			contents = obj['contents'];
			//
			html += '<div class="article">'
			if ( !! title) {
				html += '<h4><em class="wrap">' + title.replace(/#n/g, '<br/>') + '</em></h4>';
			}
			if ( !! contents) {
				html += '<div class="content">' + contents.replace(/#n/g, '<br/>') + '</div>';
			}
			html += '</div>'
		}
	}
	return html;
}

// 상담팁 카테고리 반환
var getSdmTipString = function(list, key) {
	var arr = list[key];
	var html = '';
	if ( !! arr) {
		var title;
		var contents;
		html += '<div class="study_tip">';
		html += '<div class="hiligh-box">';
		html += '<div class="postit">';
		html += '<h3 class="title"><em>학습팁</em></h3>';
		html += '<div class="content">';
		var i = 0,
			len = arr.length,
			obj;
		for (; i < len; i += 1) {
			obj = arr[i];
			title = obj['title'];
			contents = obj['contents'];
			//
			if ( !! title) {
				html += '<h4 class="subject">' + title.replace(/#n/g, '<br/>') + '</h4>';
			}
			if ( !! contents) {
				html += '<div class="text">&middot; ' + contents.replace(/#n/g, '<br/>');
			}
		}
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
	}
	return html;
}

/* 진도변경 삭제로 사용안함
var changeJindo = function(e){
	var pd = pageData, currentCode = pd.currentCode;
	pd.currentDange = pd.sbjList[currentCode].DANGE;
	pd.currentJindo = pd.sbjList[currentCode].JINDO;
	pd.currentDangeTx = pd.sbjList[currentCode].DANGE_TX;
	pd.currentJindoTx = pd.sbjList[currentCode].JINDO_TX;
	// 타이틀 변경
	var $h2 = pd.tabList[pd.currentIdx];
	$h2.find('strong.wrap').text( pd.currentCodeTx + ' ' + pd.currentDangeTx + ' ' + pd.currentJindoTx );
}
//*/
var checkCode = function(cd, arr, key) {
	var i = 0,
		len = arr.length,
		stat = false;
	for (; i < len; i += 1) {
		if (cd == arr[i][key]) {
			stat = true;
			break;
		};
	};
	return stat;
}

// 데이터 로드실패 공통 메세지 출력
var loadFailed = function(e) {
	//app_endLoading();
	//app_alert('데이터가 없습니다.');
	app_alert("학부모 상담내용이 제공되지 않는 과목입니다.");
	if (IS_CAPTUER) {
		captureNext();
	}
};

// 메모 저장 완료 콜백
var callbackSave = function() {
	//app_endLoading();
}

// 음성메모 저장 완료 콜백
var callbackSaveVoice = function() {
	//app_endLoading();
	modal_memo_close();
}

// 메모 팝업 이벤트 추가
var modal_memo_addEvent = function() {
	var $div = $('#memoCon');
	$div.find('button#CANCEL').bind('click', modal_memo_cancel);
	$div.find('button#VOICE').bind('click', modal_memo_voice);
	$div.find('button#SAVE').bind('click', modal_memo_save);
};

// 메모 팝업 이벤트 제거
var modal_memo_removeEvent = function() {
	var $div = $('#memoCon');
	$div.find('button#CANCEL').unbind('click', modal_memo_cancel);
	$div.find('button#VOICE').unbind('click', modal_memo_voice);
	$div.find('button#SAVE').unbind('click', modal_memo_save);
};

// 메모 닫기
var modal_memo_close = function() {
	modal_memo_removeEvent();
	$.modal.close();
	app_showBlind(false);
};

// 메모 취소
var modal_memo_cancel = function(e) {
	$('#TEXTAREA').val('');
	modal_memo_close();
};

// 음성메모 열기
var modal_memo_voice = function(e) {
	//app_alert('준비중입니다.');
	var param = getParam();
	var jstr = JSON.stringify(param);
	//app_startLoading();
	app_setVoiceNote('callbackSaveVoice', jstr);
};

// 메모 저장
var modal_memo_save = function(e) {
	var param = getParam();
	var str = $('#TEXTAREA').val();
	if (str.replace(/\s/g, '').length == 0) {
		app_alert('메모를 입력하세요.');
		return false;
	}
	param.CONTENTS = str;
	var jstr = JSON.stringify(param);
	//app_startLoading();
	modal_memo_close();
	app_setNote('callbackSave', jstr);
};
// 메모저장시 전달할 파라미터 반환
var getParam = function() {
	var dt = new Date();
	var wk = (dt.getDay() == 0) ? 7 : dt.getDay();
	var date = '',
		mm, dd;
	date += String(dt.getFullYear());
	date += getDigitNumString(dt.getMonth() + 1);
	date += getDigitNumString(dt.getDate());
	var time = dt.getHours() + dt.getMinutes() + dt.getSeconds();
	var name = pageParams.NAME1 == undefined ? pageParams.KUNWE_TX : pageParams.NAME1;
	var param = {
		KUNWE: pageParams.KUNWE,
		KUNWE_TX: name,
		DATE: pageParams.DATE,
		QTIME: pageParams.QTIME
	};
	return param;
}
// 팝업 이벤트 추가
var modal_end_addEvent = function() {
	var $div = $('#endCon');
	$div.find('#SUBMIT').bind('click', modal_end_close);
};
// 학습종료팝업 이벤트 제거
var modal_end_removeEvent = function() {
	var $div = $('#endCon');
	$div.find('#SUBMIT').unbind('click', modal_end_close);
};
// 학습종료팝업 닫기
var modal_end_close = function() {
	var $div = $('#endCon');
	var $radio = $div.find('input:radio[name=PRAISE_FORM]:checked');
	if ($radio.length == 0) {
		app_alert('칭찬메세지를 선택해 주세요.');
		return false;
	}
	var msgList = o_praise_message.getMsg(pageParams.NAME1);
	var msg = msgList[Number($radio.val())];
	/** 잠깐 막음
	 requestSendMsgCallback('true');
	 return false;
	 // ************************************************************/
	requestSendMsg(msg);
};
// 칭찬메세지 전송요청
var requestSendMsg = function(msg) {
	//pageParams.KUNNR // 부모
	//pageParams.KUNWE // 학생
	var kunnr = pageParams.KUNNR;
	app_startLoading();
	modal_end_removeEvent();
	$.modal.close();
	app_showBlind(false);
	//
	app_sendPraiseMessageToThinktalk('requestSendMsgCallback', kunnr, msg);
}
// 칭찬메세지 전송요청 콜백
var requestSendMsgCallback = function(bool) {
	app_endLoading();
	if (bool == 'true') {
		app_alert('칭찬메시지가 전송되었습니다. 이 것으로 ' + pageParams.NAME1 + ' 회원의 방문학습 관리가 끝났습니다. 고생하셨습니다. 선생님!', '업무종료', 'finishedStudyProcess');
	} else {
		//app_alert( '칭찬메세지 전송을 실패했습니다.', '전송실패', 'finishedStudyProcess'  );
		app_alert('칭찬메시지가 전송되었습니다.', '전송성공', 'finishedStudyProcess');
	}
}
// 학습종료 완료여부 설정
var finishedStudyProcess = function() {
	app_setLearningState(pageParams.KUNWE, pageParams.QTIME);
	app_endLearning();
	return;
}
// 하단메뉴 설정
var setFooter = function() {
	var $footer = $('#Footer');
	$footer.removeClass('none');
	// 메모 클릭시
	$footer.find('button#memo').click(function(e) {
		app_showBlind(true);
		$('#Dialog').empty();
		$('#Dialog').append(template_memo);
		//
		$('#Dialog').modal({
			onOpen: null,
			onShow: function(d) {
				modal_memo_addEvent();
			},
			onClose: null,
			overlayClose: false,
			escClose: false,
			containerId: 'memoCon',
			opacity: 60,
			overlayCss: {
				backgroundColor: "#000"
			}
		});
	});
	// 10분 후는 제거.2013.05.14 NDH 
	// 10분 전인지 확인 / 앱에서 보내주는 값.
	//if (pageParams.PLUS_10MIN_USED == "true")
	if (IS_PLUS_10MIN_USED) {

		// 전송 클릭시
		$footer.find('button#send').click(function(e) {

	//상담안 전송시 이미 전송된 건에 대해서 on/off 처리되고 실제 
	//자료가 전송되는것은 아니다.
	//20130716 OHJ
			if (IS_KID==false){
				app_alert('상담안을 제공하는 과목이 아닙니다.');
				return false;
			}				
			if(IS_SEND_FINISHED == true){
				IS_CAPTUER = false;
				app_alert('회원모에게 이미 전송된 상담안입니다.');
				return false;
			
			}

			/** 잠깐 막음
			 app_alert('씽크맘 연동 준비 중입니다.');
			 return false;
			 // ************************************************************/
			app_startLoading();
			captureTempData = pageData;
			IS_CAPTUER = true;
			captureIdx = 0;
			captureStart();
			//app_alert('씽크맘 연동 준비 중입니다.');
		});
		// 학습종료 클릭시
		$footer.find('button#end').click(function(e) {
			// 종료된 업무인지 확인
			if (IS_FINISHED) {
				//아래 메세지 주석처리 요청. 2013.05.21 NDH
				//app_alert('이미 종료된 업무입니다.','','app_endLearning');
				app_endLearning();
				return;
			}
			//씽크U한자
			if ('000000000000001162' == pageData.currentCode) {
				finishedStudyProcess();
			}
			//
			app_showBlind(true);
			$('#Dialog').empty();
			//template = template_end;
			var html = '';
			var msgList = o_praise_message.getMsg(pageParams.NAME1);
			var i = 0,
				len = msgList.length;
			for (; i < len; i += 1) {
				html += '<li><input type="radio" name="PRAISE_FORM" id="PRAISE_FORM' + String(i + 1) + '" class="graphic" value="' + i + '" /><label for="PRAISE_FORM' + String(i + 1) + '"><span class="wrap">';
				html += msgList[i];
				html += '</span></label></li>';
				//template = template.replace( '$msg'+i+'$', msgList[i]);
			}
			var template = template_end.replace(/\<ul\>\<\/ul\>/g, '<ul>' + html + '</ul>');
			$('#Dialog').append(template);
			//
			$('#Dialog').modal({
				onOpen: null,
				onShow: function(d) {
					setModalStyle('#Dialog');
					modal_end_addEvent();
				},
				onClose: null,
				overlayClose: false,
				escClose: false,
				containerId: 'endCon',
				opacity: 60,
				overlayCss: {
					backgroundColor: "#000"
				}
			});
		});
	} else { // -10분 초과시
		$footer.find('button#send').click(function(e) {
			//*
			IS_CAPTUER = false;
			app_alert('방문시간 10분 전부터 상담안 전송이 가능합니다.');
			//*/
		});
		//
		$footer.find('button#end').click(function(e) {
			//아래 메세지 주석처리 요청. 2013.05.21 NDH
			//app_alert('수업시간 10분전 부터 사용할 수 있는 기능 입니다.', '','app_endLearning');
			//app_alert('수업시간 10분전 부터 수업시간10분 후 까지만 사용할 수 있는 기능 입니다.');
			app_endLearning();
			return;
		});
	};
}
// 모달 스타일 적용

function setModalStyle(id) {
	$(id).find('input.graphic').each(function() {
		var $form = $(this);
		var target = $form.attr('id');
		var $label = $('label[for="' + target + '"]');
		if ($form.is(':checkbox')) {
			$label.prepend('<span class="graphic-checkbox"><\/span>');
		} else if ($form.is(':radio')) {
			$label.prepend('<span class="graphic-radio ' + this.name + '-Radio"><\/span>');
		}
		$label.find('>span:first').append('<button type="button" title="' + this.title + '"  class="' + $form.attr('class') + '"><\/button>').find('>button').removeClass("graphic cbr-type").addClass(function() {
			if ($form.is(':disabled')) return "disabled";
		}).addClass(function() {
			if ($form.is(':checked')) return "check";
		}).parents('label').children().on('click', function() {
			if ($.browser.msie && $.browser.version < 9) $form.toArray()[0].click();
		});
		$form.hide().click(function() {
			if ($form.is(':checkbox')) {
				if ($form.get(0).checked !== true) {
					$label.find('>span:first>button').removeClass("check");
				} else {
					$label.find('>span:first>button').addClass("check");
				}
			} else if ($form.is(':radio')) {
				if ($form.get(0).checked === true) {
					$('span.' + this.name + '-Radio>button').removeClass("check");
					$label.find('>span:first>button').addClass("check");
				}
			}
		});
	});
}
// 스크롤 이동

function moveSubjectTop() {
	window.scrollTo(0, $("#sbj" + pageData.currentIdx).offset().top - 34);
}
// 데이터 없을때 대체 메세지

function addNone(type, msg) {
	if (msg == undefined || msg == '') {
		msg = '상담안이 없습니다.';
	}
	//app_endLoading();
	//
	var $section = $('#sbj' + pageData.currentIdx);
	var $container;
	if (type == 'big') { // 씽크빅일때
		if ($section.has('#contentsBody').length > 0) {
			$section.find('#contentsBody').remove();
		};
		$container = $section;
	} else {
		if ($section.find('.viewport #contentsBody').length > 0) {
			$section.find('.viewport #contentsBody').remove();
		};
		$container = $section.find('.viewport');
	}
	$container.append($('#template_none').html().replace(/#msg#/g, msg));
};
/* 진도변경삭제로 사용하지 않음
var prevButtonHandle = function(e){
	e.stopPropagation();
}

var nextButtonHandle = function(e){
	e.stopPropagation();
}
//*/
// 캡쳐 시작
// 탭을 하나씩 연다
var captureStart = function() {
	var pd = pageData;
	var tabList = pd.tabList;
	var sbjList = pd.sbjList;
	var $this, $btn;
	if (filter[pd.sbjList[captureIdx].ZMAT1] == undefined) {
		captureNext();
	} else {
		pageParams.data[captureIdx].checked = "Y";
		$this = pd.tabList[captureIdx];
		pd.currentIdx = captureIdx;
		pd.currentCode = pd.idList[captureIdx];
		pd.currentDange = pd.sbjList[captureIdx].DANGE;
		pd.currentJindo = pd.sbjList[captureIdx].JINDO;
		pd.currentCodeTx = pd.sbjList[captureIdx].ZMAT1_TX;
		pd.currentDangeTx = pd.sbjList[captureIdx].DANGE_TX;
		pd.currentJindoTx = pd.sbjList[captureIdx].JINDO_TX;
		$btn = $this.find('button.toggle-button');
		if ($btn.text() != '숨기기') {
			$btn.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').show();
			checkSbjCode(pd.idList[captureIdx]);
		} else {
			captureNext();
		}
	}
}
var requestGab;
// 다음에 열 메뉴탭
var captureNext = function() {
	captureIdx++;
	if (captureIdx < pageData.tabList.length) {
		if (captureIdx > -1) {
			pageParams.data[captureIdx].checked = "";
		}
		captureStart();
	} else {
		IS_CAPTUER = false;
		captureIdx = -1;
		$('#Footer').addClass('none');
		requestGab = setInterval(requestCapture, 1500);
		requestCapture();
	}
}
// 캡쳐 요청
var requestCapture = function() {
	clearInterval(requestGab);
	requestGab = null;
	//
	//pageParams.KUNNR // 부모
	//pageParams.KUNWE // 학생
	var kunnr = pageParams.KUNNR;
	app_sendLearningToThinktalk('sendCallback', kunnr);
	
}
// 전송완료후 메세지 출력
var sendCallback = function(bool) {
	
	//20130618 OHJ 이미 전송된 상담안 처리
	//but, 다른 탭으로 이동했다 왔을때는 초기화됨.
	if (bool == 'true') {
		IS_SEND_FINISHED =  true;
		app_alert('성공적으로 전송하였습니다.', '전송완료', 'finishCapture');
		
	} else {
		//app_alert('전송을 실패하였습니다.', '전송실패', 'finishCapture');
		IS_SEND_FINISHED = true;
		app_alert('성공적으로 전송하였습니다.', '전송 완료', 'finishCapture');
	}
}
// 캡쳐후 전송 완료
var finishCapture = function() {
	pageData = captureTempData;
	captureTempData = null;
	//
	var pd = pageData;
	var tabList = pd.tabList;
	var sbjList = pd.sbjList;
	var sbjObj;
	var $this, $btn;
	var i = 0,
		len = tabList.length;
	for (; i < len; i += 1) {
		sbjObj = sbjList[i];
		$this = tabList[i];
		$btn = $this.find('button.toggle-button');
		if (i == pd.currentIdx) {
			pd.currentIdx = i;
			pd.currentCode = pd.idList[i];
			pd.currentDange = sbjObj.DANGE;
			pd.currentJindo = sbjObj.JINDO;
			pd.currentCodeTx = sbjObj.ZMAT1_TX;
			pd.currentDangeTx = sbjObj.DANGE_TX;
			pd.currentJindoTx = sbjObj.JINDO_TX;
			pageParams.data[i].checked = "Y";
			$btn.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').show();
		} else {
			pageParams.data[i].checked = "";
			$btn.removeClass('open').text('보이기').closest('div.section').children(':not(h2)').hide();
			$this.find('strong.wrap').text(sbjObj.ZMAT1_TX);
		}
	}
	//
	checkSbjCode(pd.idList[pd.currentIdx]);
	$('#Footer').removeClass('none');
	app_endLoading();
}
//숫자를 디지털 숫자형으로 반환
var getDigitNumString = function(n) {
	var numStr;
	if (n < 10) {
		numStr = '0' + n;
	} else {
		numStr = String(n);
	}
	return numStr;
};
//숫자를 디지털 숫자형으로 반환
var getDigitNum = function($n) {
	if (Number($n) < 10) {
		return '0' + String($n);
	} else {
		return String($n);
	}
};
//@ 호수변경

function jindo_windows(bgExec) {

	if (bgExec == true || bgExec == undefined) {
		$("#Document").css("display", "none");
		$("#Popup").css("display", "");
		$(".jindo_button").css("display", "");
		$("#popHeader .container").find("h1").html("호수조회");
	}


	var currentIdx = pageData.currentIdx;
	var currentCode = pageData.currentCode;
	var currentDange = pageData.currentDange;
	var currentDangeTx = pageData.currentDangeTx;
	var currentJindo = pageData.currentJindo;
	var currentJindoTx = pageData.currentJindoTx
	var erpCode = pageData.sbjList[currentIdx].VBELN;
	var $section = $('#sbj' + pageData.currentIdx);

	var $container = $('#jindo_tree');
	var html = "";
	var menuName = "",
		menuCode = "";
	if (chkThinkUB == "B") {
		$("#jindo_tree").html("");
		// 단계 로드
		loader.load({
			Function: "ZTBSD_GM_001_018",
			Parameter: {
				ZMAT1: currentCode
			},
			Success: function($data) {
				JsonData = JSON.parse($data);
				if ( !! JsonData.Parameter) {
					$.each(JsonData.Parameter.T_EXPORTA, function(index, entry) {
						if (entry["MAKTX"] != " ") {
							menuName = entry["MAKTX"];
							menuCode = entry["MATNR"];
						} else {
							menuName = Right(entry["MATNR"], 6);
							menuCode = entry["MATNR"];
						}
						html += '<li ';
						if (currentDange == menuCode) {
							html += ' class="open hover" ';
						}
						if (Number(index) == 1) {
							html += ' style="background:none;" ';
						}
						html += ' id="dange_' + menuCode + '">';
						html += '<span>' + menuName + '</span>';
						html += '<ul><li><span class="placeholder">&nbsp;</span></li></ul>';
						html += '</li>';
					});
					html = '<ul id="tree">' + html + '</ul>';
					$container.append(html);

					dangeJindoLoadB({
						VBELN: erpCode,
						MATNR: pageData.currentDange
					});

					$('#tree').treeview({
						persist: "location",
						collapsed: true,
						unique: true,
						toggle: function(idx, item) {
							if ($(item).css('display') == 'block') {
								var cDatas = $(this).attr('id').split('_');
								pageData.currentDange = cDatas[1];
								pageData.currentDangeTx = cDatas[2];
								dangeJindoLoadB({
									VBELN: erpCode,
									MATNR: pageData.currentDange
								});
							}
						}

					});
				} else {
					//데이터 없음
				}
			},
			Error: function($e) {
				app_alert("단계 데이터가 없습니다.");
				JsonData = $e;
			}
		});
	} else { //씽크U

		var val = $section.find('#week_month_select option:selected').val();
		switch (val) {
		case '2':
			//dangeJindoLoadUmonth();
            monthlyListLoad();
			break;
		case '3':
			break;
		case '4':
			break;
		default:
			dangeLoadU("CL01");
			break;
		}


	} //씽크유 end
	window.scrollTo(0, 1);

}
// 씽크빅 진도 로드

function dangeJindoLoadB(params) {
	loader.load({
		Function: "ZTBSD_GM_214_JINDO_SEARCH",
		//Function : "ZTBSD_GM_001_019",
		Parameter: params,
		Success: function(rlt) {
			var data = JSON.parse(rlt);
			if ( !! data.Parameter) {
				var arr = data.Parameter.T_EXPORTA;
				addTreeChild(arr);
			}
		},
		Error: loadFailed

/*
          Error: function($e){
              app_alert("학부모 상담내용이\n 제공되지 않는 과목입니다.","","jindo_windows_close");
              //app_alert($e)
              

          }
 */

	});
}



// 트리에 메뉴 추가
function addTreeChild(arr) {

	var $container = $('#dange_' + pageData.currentDange);
	var $ul = $container.find('ul');
	$ul.empty();
	if (arr.length < 0) {
		$ul.append('<span>조회결과가 없습니다.</span>');
		return false;
	}
	//
	var html = "";
	var menuName = "",
		menuCode = "";
	var i = 0,
		len = arr.length,
		obj = null;
	for (; i < len; i += 1) {
		obj = arr[i];
		menuName = ($.trim(obj.MAKTX).length == 0) ? obj.MATNR : obj.MAKTX;
		menuCode = obj.MATNR;
		html += '<li id="jindo_' + menuCode + '" style="left:-20px;">';
		html += '<label for="r_' + menuCode + '" onclick=\'radioCheck("r_' + menuCode + '");\'>';
		html += '<input type="radio" for="r_' + pageData.currentDange + '" name="jindo_change" id="r_' + menuCode + '" \
                 value="' + menuCode + '" ';

		if (menuCode == pageData.currentJindo) {
			var $section = $('#sbj' + pageData.currentIdx);
			$section.find('h2>strong.wrap').text(arr[i].MAKTX);
			html += 'checked';
		}
		html += '>';
		html += ' ' + menuName + '';
		html += '</label>';
		html += '</li>'
	}
	$ul.append(html);

}
// 로드 실패

/*
 function loadFailed() {
 	//app_alert('로드 실패');
 	//
 }
 */
// 트리 선택된것 체크

function radioCheck(giftNumber) {
	$("input:radio[value='" + giftNumber + "']").attr("checked", "checked");
}
// 호수조회 취소


// 호수조회 확인
function jindo_windows_check_end() {

	if ($('input:radio[name="jindo_change"]').is(":checked") == true) {
		var ho_code = $('input:radio[name=jindo_change]:checked').val();
		var ho_name = $('input:radio[name=jindo_change]:checked').parent().text();
		var dange_name = $('input:radio[name=jindo_change]:checked').attr("dange_name");
		var dange_code = $('input:radio[name=jindo_change]:checked').attr("dange_code");

		//var zmat_code = $('input:radio[name=jindo_change]:checked').attr("zmat_code");
		var $section = $('#sbj' + pageData.currentIdx);
		var val = $section.find('#week_month_select option:selected').val();
		udatas.currentType = val;
		pageData.currentJindoTx = ho_name;
		pageData.currentJindo = ho_code;

		if (dange_name == "" || dange_name == undefined) {
			dange_name = pageData.currentDangeTx;
		} else {
			pageData.currentDangeTx = dange_name;
		}
		if (dange_code == "" || dange_code == undefined) {
			dange_code = pageData.currentDange;
		} else {
			pageData.currentDange = dange_code;
		}


		// 이번주 학습 씽크빅 연동
		pageParams.data[pageData.currentIdx].ZMAT1_SHARE = pageData.currentCode;
		pageParams.data[pageData.currentIdx].JINDO_SHARE = ho_code;
		pageParams.data[pageData.currentIdx].DANGE_SHARE = dange_code;

		jindo_windows_close();
		//checkSbjCode(pageData.currentCode);

		if (chkThinkUB == "B") { //씽크빅
			sdmLoad();
		} else {
			dangeLoadU("CL03");
		}

	} else {
		app_alert("변경하실 호를 선택해주세요.");
		return;
	}
}

function jindo_windows_close() {
	$("#Popup").css("display", "none");
	$("#Document").css("display", "");
	window.scrollTo(0, 1);
	//top_scroll();
}


// 과목명 줄임말로 변경
var rename_zmat = function(zmat_name) {

	if (zmat_name == "바로셈") {
		zmat_name = "바셈";
	}
	if (zmat_name == "씽크U국어") {
		zmat_name = "씽U국";
	}
	if (zmat_name == "씽크U사회과학") {
		zmat_name = "씽U사";
	}
	if (zmat_name == "씽크U수학") {
		zmat_name = "씽U수";
	}
	if (zmat_name == "씽크U영어(방문형)") {
		zmat_name = "씽U영(방)";
	}
	if (zmat_name == "씽크U한자") {
		zmat_name = "씽U한자";
	}
	if (zmat_name == "바로독해") {
		zmat_name = "바독";
	}
	if (zmat_name == "스마트영어") {
		zmat_name = "스영";
	}
	if (zmat_name == "(신)한글깨치기") {
		zmat_name = "(신)한깨";
	}
	if (zmat_name.indexOf("한글깨치기") >= 0) {
		zmat_name = "한글깨치기";
	}
	return zmat_name;
}

function menu_text_set() {

	try {
		tmp_ZMAT1_TX = pageData.currentCodeTx;
		DANGE_TEXT = pageData.currentDangeTx;
		JINDO_TEXT = pageData.currentJindoTx;




		tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);

		try {
			if (DANGE_TEXT.indexOf(tmp_ZMAT1_TX) >= 0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
				if (DANGE_TEXT.indexOf("_") >= 0) {
					DANGE_TEXT = DANGE_TEXT.split("_")[1];
				}
			}
		} catch (e) {
			DANGE_TEXT = "";
		}

		try {
			if (JINDO_TEXT.indexOf(DANGE_TEXT) >= 0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
				if (JINDO_TEXT.indexOf("_") >= 0) {
					JINDO_TEXT = JINDO_TEXT.split("_")[1];
					if (JINDO_TEXT.indexOf("_") >= 0) {
						JINDO_TEXT = JINDO_TEXT.split("_")[1];
						if (JINDO_TEXT.indexOf("_") >= 0) {
							JINDO_TEXT = JINDO_TEXT.split("_")[1];
						}
					}
				}
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		DANGE_JINDO_TEXT = pageData.currentCodeTx + " &nbsp;" + DANGE_TEXT + "단계  &nbsp;" + JINDO_TEXT + "호";
		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계", "단계");
		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("호호", "호");

		var $section = $('#sbj' + pageData.currentIdx);
		$section.find('h2>strong.wrap').html("");
		$section.find('h2>strong.wrap').html(DANGE_JINDO_TEXT);


	} catch (e) {}

}


// 과목탭 이름 재설정

function menu_text_reload(new_is) {

	DANGE_JINDO_TEXT = "";
	if (new_is == true) {

		//# 단계명 편집
		try {

			tmp_ZMAT1_TX = pageData.currentCodeTx;
			DANGE_TEXT = pageData.currentDangeTx;



			tmp_ZMAT1_TX = rename_zmat(tmp_ZMAT1_TX);



			if (tmp_ZMAT1_TX == "(신)한깨" && DANGE_TEXT.indexOf(tmp_ZMAT1_TX) < 0) {
				tmp_ZMAT1_TX = "(신)한글깨치기";
			}
			if (DANGE_TEXT.indexOf(tmp_ZMAT1_TX) >= 0) {
				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
			}
		} catch (e) {
			DANGE_TEXT = "";
		}
		DANGE_TEXT = DANGE_TEXT.replace("_", "");
		if (DANGE_TEXT.length > 6) {
			DANGE_TEXT = Left(DANGE_TEXT, 6) + "..";
		}

		//# 호수명 편집
		try {
			JINDO_TEXT = pageData.currentJindoTx;
			if (JINDO_TEXT.indexOf(DANGE_TEXT) >= 0) {
				JINDO_TEXT = JINDO_TEXT.split(DANGE_TEXT)[1];
			}
			if (JINDO_TEXT.indexOf("_") >= 0) {
				JINDO_TEXT = JINDO_TEXT.split("_")[JINDO_TEXT.split("_").length - 1];
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		try {
			if (JINDO_TEXT.indexOf("단계") >= 0) {
				JINDO_TEXT = JINDO_TEXT.split("단계")[1];
			}
		} catch (e) {
			JINDO_TEXT = "";
		}

		if (JINDO_TEXT.length > 6) {
			JINDO_TEXT = Left(JINDO_TEXT, 6) + "..";
		}


		JINDO_TEXT_RE = pageData.currentJindoTx;
		DANGE_JINDO_TEXT = DANGE_TEXT;
		if (DANGE_JINDO_TEXT.indexOf("바로셈") >= 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("바로셈")[1];
		}
		if (DANGE_JINDO_TEXT.indexOf("(") >= 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.split("(")[0];
		}

		//# 단계 글씨가 있지 않을 경우
		if (DANGE_JINDO_TEXT.indexOf("단계") < 0) {
			DANGE_JINDO_TEXT = DANGE_TEXT + "단계 &nbsp;";
		} else {
			DANGE_JINDO_TEXT = DANGE_TEXT + " &nbsp;";
		}

		if (JINDO_TEXT_RE.indexOf("호") < 0) {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT + "호";
		} else {
			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT;
		}


		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계", "단계");

		var $section = $('#sbj' + pageData.currentIdx);
		$section.find('h2>strong.wrap').html("");
		$section.find('h2>strong.wrap').html(DANGE_JINDO_TEXT);


	} else {
		var $section = $('#sbj' + pageData.currentIdx);
		$section.find('h2>strong.wrap').html($section.find('h2>strong.wrap').html());
		//$("#"+ZMAT1_SELECT_DATA+"_DANGE_JINDO_TEXT.menu"+MENU_CLICK_INDEX).html($("#"+ZMAT1_SELECT_DATA+"_section.menu"+MENU_CLICK_INDEX).attr("DANGE_JINDO_TEXT"));
	}
}



/*


 // 과목탭 이름 재설정
 function menu_text_reload() {


 	var DANGE_JINDO_TEXT="";
     var tmp_ZMAT1_TX = "";
     var DANGE_TEXT = "";
     var JINDO_TEXT = "";
     
     		
         
         //tmp_ZMAT1_TX = rename_zmat(pageData.currentCodeTx);
         tmp_ZMAT1_TX = pageData.currentCodeTx;
 DANGE_TEXT = pageData.currentDangeTx;
 JINDO_TEXT = pageData.currentJindoTx;



 			if(DANGE_TEXT.indexOf(tmp_ZMAT1_TX)>=0) {
 				DANGE_TEXT = DANGE_TEXT.split(tmp_ZMAT1_TX)[1];
 			} 



 		JINDO_TEXT_RE = JINDO_TEXT;
 		DANGE_JINDO_TEXT = DANGE_TEXT;



 		//# 단계 글씨가 있지 않을 경우
 		if(DANGE_JINDO_TEXT.indexOf("단계")==-1) {
 			DANGE_JINDO_TEXT = DANGE_TEXT + "단계 &nbsp;";
 		} else {
 			DANGE_JINDO_TEXT = DANGE_TEXT + " &nbsp;";
 		}

 		if(JINDO_TEXT_RE.indexOf("호")==-1) {
 			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT + "호";
 		} else {
 			DANGE_JINDO_TEXT = DANGE_JINDO_TEXT + JINDO_TEXT;
 		}


 		DANGE_JINDO_TEXT = DANGE_JINDO_TEXT.replace("단계단계","단계");
         DANGE_JINDO_TEXT = tmp_ZMAT1_TX + " &nbsp;" +DANGE_JINDO_TEXT;




 }
 */

var hosu_btn_view = function(chk) {

	var $section = $('#sbj' + pageData.currentIdx);

	switch (chk) {
	case "w":
		$section.find("#hosu_search_u_weak").show();
		$section.find("#hosu_search_u_month").hide();
		break;

	case "m":
		$section.find("#hosu_search_u_weak").hide();
		$section.find("#hosu_search_u_month").show();
		break;

	default:
		$section.find("#hosu_search_u_weak").hide();
		$section.find("#hosu_search_u_month").hide();

	}

}



// 우측에서 파라미터 갯수만큼 글자 반환
function Right(str, n) {
	if (n <= 0) return "";
	else if (n > String(str).length) return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}