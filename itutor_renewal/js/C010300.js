
/**
 * 
 * 공지사항
 * 
 * */

var tutorId;
var currentData = {
	seqNo:"",
	files:"N"
};

var IS_FIRST = true;
var noticeTotal = 0;
var pageTotal = 0;
var pageGroupTotal = 0;
var maxPageLen = 8;
var maxPageGroupLen = 5;

var currentPageIdx = 0;
var currentPageGroupIdx = 0;

/** ===============================================================================================================
 * 최초시작
 *  */

$(document).ready( function () {
	app_endLoading();
	//테이블생성되서 스크롤 생기는 문제로 백그라운드 흰색 변경. 2013.04.10 NDH
    $("body").css("background","white");
	initPage();
});



/** ===============================================================================================================
 * 초기실행
 *  */
var initPage = function(){
	app_changeTitle( '예비 고객 LIST' );
	app_getTutorInfo( 'setTutorInfo' );
};

// 교사정보 수신
var setTutorInfo = function( str ){
	if( String(str)!="undefined" && !!str && String(str)!="" ) {
		var data = str.replace(/'/g, '"');
		//
		tutorId = JSON.parse( data ).PERNR;
		listLoad(1);
		app_alert(tutorId);
	};
}

// 공지사항 리스트 요청
var listLoad = function( page, cnt ){
	var listCnt = (cnt==undefined)? maxPageLen : String(cnt);
	loader.noticeService( {
        Function: "GetHeadNoticeLst",
        Parameter: {
        	nListCnt: listCnt,
        	nPage: String( page ),
        	strSFlag: "%",
        	strKeyword: "",
        	strEmpNo: String( tutorId )
        },
        Success: function(rlt){
        	setPaging(rlt);
        	setPageUi();
        	makeList(rlt);
        },
        Error: function($e){
        	msgCall($e)
        }
    });
}

// 공지사항 상세 요청
var detailLoad = function( param ){
	loader.noticeService( {
        Function: "GetHeadNoticeView",
        Parameter: param,
        Success: function(rlt){
        	makeDetail(rlt);

            
        },
        Error: function($e){
        	msgCall($e)
        }
    });
}

// 하단 페이징 설정
var setPaging = function( data ){
	var $data = $(data);
	if( $data.find('Table').length>0 ){
		var $table = $($data.find('Table')[0]);
		noticeTotal = Number( $table.find('TOTAL_CNT').text() );
		pageTotal = Math.ceil( noticeTotal / maxPageLen );
		pageGroupTotal = Math.ceil( pageTotal / maxPageGroupLen );
		
		changePageIdx( Math.floor((noticeTotal - Number( $table.find('RNUM').text() ))/maxPageLen)+1 );
		
		if(IS_FIRST){
			IS_FIRST = false;
			$('button.btn_prev').click(function(){
				changePageIdx( ((currentPageGroupIdx-2)*maxPageGroupLen) + 1 );
				listLoad(currentPageIdx);
			});
			$('button.btn_next').click(function(){
				changePageIdx( currentPageGroupIdx*maxPageGroupLen + 1 );
				listLoad(currentPageIdx);
			});
			
			$('.pagingWrap').removeClass( 'none' );
		}
	}
}

// 페이지 번호 설정
var changePageIdx = function(cidx){
	currentPageIdx = cidx;
	if(currentPageIdx<1){
		currentPageIdx = 1;
	}
	if(currentPageIdx>pageTotal){
		currentPageIdx = currentPageIdx;
	}
	
	var tmpGpIdx = currentPageGroupIdx;
	currentPageGroupIdx = Math.ceil(currentPageIdx/maxPageGroupLen);
}

// 페이지 클릭시
var clickPageIdx = function( i ){
	currentPageIdx = Number(i);
	setPageUi();
	listLoad(currentPageIdx);
}

// 페이징 이전다음버튼 화면구성
var setPageUi = function(  ){
	
	var $prev = $('button.btn_prev');
	var $next = $('button.btn_next');
	if( pageGroupTotal>1 ){
		
		if( currentPageGroupIdx<=1 ){
			$prev.addClass( 'none' );
		}else{
			$prev.removeClass( 'none' );
		}
		if( currentPageGroupIdx>=pageGroupTotal ){
			$next.addClass( 'none' );
		}else{
			$next.removeClass( 'none' );
		}
		
	}else{
		$prev.addClass( 'none' );
		$next.addClass( 'none' );
	}
	
	makePagingGroup();
}

// 페이징 페이지번호 화면구성
var makePagingGroup = function(){
	var sidx = ((currentPageGroupIdx-1)*maxPageGroupLen)+1;
	var $group = $('.pagingWrap').find('span');
	$group.empty();
	
	var html='';
	var i=sidx, len=sidx+maxPageGroupLen;
	if( len>pageTotal+1 ){
		len = pageTotal+1;
	}
	for( ;i<len;i+=1 ){
		if( i==currentPageIdx ){
			html += '<strong>'+i+'</strong>';
		}else{
			html += '<a href="javascript:clickPageIdx(\''+i+'\')">'+i+'</a>';
		}
	}
	//
	$group.html( html );
}

// 리스트 만들기
var makeList = function( data ){
	var $data = $(data);
	var markup = '';
	var html = '';
	var $table;
	
	
	if( $data.find('Table').length>0 ){
		$data.find('Table').each(function(){
			$table = $(this);
			//
			html = '';
			html += '<div class="section">';
			html += '<h2 id="seq_'+$table.find('SEQ_NO').text()+'" style="padding-right: 30px;">';
			html += '<strong class="wrap">'+$table.find('TITLE').text()+'</strong>';
			if( $table.find('ADDFILE_TAG').text()=="Y" ){
				html += '<span class="ico_file"></span>';
			}
			html += '<button type="button" class="toggle-button blind">보이기</button>';
			html += '</h2>';
			html += '<div id="view_'+$table.find('SEQ_NO').text()+'" class="viewport none">';
			html += '</div>';
			html += '</div>';
			html += '<hr />';
			//
			markup =  markup + html; 
		});
	}
	
	//
	$('.container').html(markup);
	
	$('.container').find('h2').each(function(){
		$(this).click( listClick );
	});
	
	
};

// 리스트 클릭시
var listClick = function(){
	var seqNo = $(this).attr('id').replace(/[^0-9]/g, '');
	var $switch;
	
	// old close
	if(currentData.seqNo!=""){
		$switch = $('#seq_'+currentData.seqNo).find('button.toggle-button');
		$switch.removeClass('open').text('보이기').closest('div.section').children(':not(h2)').addClass('none');
	}
	
	if( currentData.seqNo!=seqNo ){
		// set
		currentData.seqNo = seqNo;
		currentData.files = ($('#seq_'+currentData.seqNo).find('span.ico_file').length>0)? "Y" : "N";
		
		// new open
		$switch = $('#seq_'+currentData.seqNo).find('button.toggle-button');
		$switch.addClass('open').text('숨기기').closest('div.section').children(':not(h2)').removeClass('none');
		
		// load
		var $view = $('div#view_'+currentData.seqNo);
		if( $view.html()=="" ){
			detailLoad({
				nSeqNo : seqNo,
				strSFlag : '%',
				strKeyword : '',
				strEmpNo : String( tutorId )
			});
		}
	}else{
		currentData.seqNo = "";
		currentData.files = "N";
	}
	
}

// 상세 보기 
var makeDetail = function(data){
	var $table;
    
	$(data).find('Table').each(function(){
		if($(this).find('STEP').text()=="main"){
			$table = $(this);
            return false;
            
		}
	});

	if( !!$table ){
		var seqNo = $table.find('SEQ_NO');
		var html = '';
		html += '<div class="title-list">';
		html += '<ul>';
		html += '<li>';
		html += '<div class="content">';
		html += '<ul>';
		html += '<li>';
		html += '<strong class="term">작성자</strong>';
		html += '<span class="desc">'+$table.find("REG_DEPT_NAME").text()+'</span>';
		html += '<span class="string-slash">/</span>';
		html += '<span class="desc">'+$table.find("REG_EMP_NAME").text()+'</span>';
		html += '</li>';
		html += '<li>';

        //첨부파일이 2개 이상 일경우 처리 2013.04.23 NDH
		if( currentData.files=="Y" ){
			html += '<strong class="term">첨부파일</strong>';
            var file_html = "";
            $(data).find('Table1').each(function(){
                var dir_path = $(this).find('DIR_PATH').text();
                var file_name = $(this).find('FILE_NAME').text();
                //http:// 안넘어오는 패스 제외 2013.05.22
                if(dir_path.indexOf('http://')==-1){
                    file_html += '<span class="desc" style="text-decoration: line-through;">'+file_name+'</span>';
                }else{
                    file_html += '<span class="desc"><a href="javascript:goSite(\''+dir_path+file_name+'\')" class="anchor box" target="_blank" >'+$(this).find('FILE_NAME').text()+'</a></span>';    
                }
    			 
            }); 
			
		html += file_html;
		}
		html += '</li>';
		html += '</ul>';
		html += '</div>';
		html += '</li>';
		html += '</ul>';
		html += '</div>';
		html += '<div class="noticeView">';
		
		var contents = $table.find("CONTENT").text();
        
        //html 특수문자 치환. 2013.04.10 NDH
		contents = contents.replace( /&amp;nbsp;/gi, ' ' )
                           .replace( /&amp;/gi, '&' )
                           .replace( /nbsp;/gi, ' ' )
                           .replace( /&quot;/gi, '"' )
                           .replace( /&lt;/gi, '<' )
                           .replace( /&gt;/gi, '>' );
        
		html += contents;
		html += '</div>';
		
		$('div#view_'+currentData.seqNo).html(html);
	}
}

// 외부링크
var goSite = function(url){
	app_goSite( url );
}

// 메세지창
var msgCall = function( $msg, $title, $callback ){
	app_alert( $msg, $title, $callback );
};


