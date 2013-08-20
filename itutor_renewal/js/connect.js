/**
 * 데이터 요청.
 *  */


// 캡쳐중일때 endLoadiing 호출되지 않게 하기위한 Boolean값
var IS_CAPTUER = false; 

// 디버깅시 호출시간 산출을 위해 지정해 놓은 변수. 
var stime;
var etime;
var fname;
var dt = new Date();
//============================================

var loader = {
		onResult : null,
		onError : null,
		init : function() { // loader 초기화
			loader.onResult = null;
			loader.onError = null;
		},
		load : function( $params ){ // SAP 호출 **************************************************************************************
			
			if( !!app_startLoading ){
				app_startLoading();
			}
			
			dt = new Date();
			stime = dt.getTime();
			fname = $params.Function;
			//
			loader.onResult = $params.Success;
			loader.onError = $params.Error;
			
			$params.Success = "onDataResult";
			$params.Error = "onDataError";
			
			var jstr = JSON.stringify( $params );
			if(navigator.userAgent.toLowerCase().indexOf('android')>=0) {  // 안드로이드
				window.conn.request( jstr );
			} else { // 아이폰
				sendToApp( "request?#" + jstr );
			}
		},
		ajax : function( $params ){ // ajax 호출 **************************************************************************************
			if( !!app_startLoading ){
				app_startLoading();
			}
			//
			$.ajax( $params ).complete(function(){
				if( !!app_endLoading ){
					if( IS_CAPTUER==undefined ){
						app_endLoading();
					}else{
						if( IS_CAPTUER ){
				    	}else{
				    		app_endLoading();
				    	}
					}
				}
				//
				loader.init();
				if( !!queue ){
					queue.endFn();
				}
			});
		},
		service : function( $params ){ // soap 호출 **************************************************************************************
			if( !!app_startLoading ){
				app_startLoading();
			}
			//
			dt = new Date();
			stime = dt.getTime();
			fname = $params.Function;
			//
			loader.onResult = $params.Success;
			loader.onError = $params.Error;
			//
			var fn = $params.Function;
			switch( fn ){
				case 'sp_ap_it_sdm_s_c' : // 상담안조회
					//
					param = {
						Method : fn,
						Parameter : $params.Parameter,
						Success : "onServiceResult",
						Error : "onServiceError"
					};
					break;
				case 'sp_ap_it_tgd_s_c' : // 티칭가이드
					param = {
						Method : fn,
						Parameter : $params.Parameter,
						Success : "onServiceResult",
						Error : "onServiceError"
					};
					//
					break;
				default :
					param = {
						Method : 'fnInterface',
						Parameter : {
							strSPName : fn,
							strInputPM : getServiceParams( $params.Parameter ),
							strCursorCnt : $params.CursorCnt
						},
						Success : "onServiceResult",
						Error : "onServiceError"
					};
					//
					break;
			}

			//
			var jstr = JSON.stringify( param );
			
			//
			if(navigator.userAgent.toLowerCase().indexOf('android')>=0) {  // 안드로이드
				window.conn.requestSoap( jstr );
			} else { // 아이폰
				sendToApp( "requestSoap?#" + jstr );
			}
		},
		noticeService : function( $params ){ // 공지사항 호출 **************************************************************************************
			if( !!app_startLoading ){
				app_startLoading();
			}
			//
			dt = new Date();
			stime = dt.getTime();
			fname = $params.Function;
			//
			loader.onResult = $params.Success;
			loader.onError = $params.Error;
			//
			var fn = $params.Function;
			switch( fn ){
				case 'GetHeadNoticeLst' : // 본사공지 리스트 조회
					//
					param = {
						Method : fn,
						Parameter : $params.Parameter,
						Success : "onNoticeServiceResult",
						Error : "onServiceError"
					};
					
					
					break;
				case 'GetHeadNoticeView' : // 본사공지 원문글 조회
					param = {
						Method : fn,
						Parameter : $params.Parameter,
						Success : "onNoticeServiceResult",
						Error : "onServiceError"
					};
					//
					break;
			}
			//
			var jstr = JSON.stringify( param );
			//
			if(navigator.userAgent.toLowerCase().indexOf('android')>=0) {  // 안드로이드
				window.conn.requestNoticeSoap( jstr );
			} else { // 아이폰
				sendToApp( "requestNoticeSoap?#" + jstr );
			}
		},
		sessionTotal : function( fText, iCate , resultCallback, errorCallback  ){ // 교사별 메뉴이동 관리 RFC 호출 ************************************************
			loader.load( {
		        Function: "ZTBSD_GM_214_SESSION_TOTAL",
		        Parameter: {
		        	F_TEXT : fText, 
		        	I_CATE : iCate
		        },
		        Success: resultCallback,
		        Error: errorCallback
		    });
		}
};

// soap 파라미터 분리.
var getServiceParams = function( obj ){
	var str = '';
	for( var key in obj ){
		if( str.length>0 ){
			str += '||';
		}
		str += key + '=' + obj[key];
	}
	return str;
}

/**
 * @ soap 호출 성공
 * @ 결과데이터
 *  */
var onServiceResult = function( $params ){
	//trace($params);
	//
	if( !!app_endLoading ){
		if( IS_CAPTUER==undefined ){
			app_endLoading();
		}else{
			if( IS_CAPTUER ){
	    	}else{
	    		app_endLoading();
	    	}
		}
	}
	//
	if( !!loader.onResult ){
		var $rlt = $params.replace( /'/g, '"' );
		loader.onResult( createXMLFromString($rlt) );
		//
		if( !!queue ){
			queue.endFn();
		}
	}
}

/**
 * @ 공지사항 soap 호출 성공
 * @ 결과데이터
 *  */
var onNoticeServiceResult = function( $params ){
	
    //#n을 <br> 치환에서 빈란으로 변경. 2013.04.10 NDH
	$params = $params.replace( /#n/gi, '' );
	//
	if( !!app_endLoading ){
		if( IS_CAPTUER==undefined ){
			app_endLoading();
		}else{
			if( IS_CAPTUER ){
	    	}else{
	    		app_endLoading();
	    	}
		}
	}
	//
	if( !!loader.onResult ){
		var $rlt = $params.replace( /'/gi, '"' );
		$rlt = $rlt.replace( /&lt;/gi, '<' );
		$rlt = $rlt.replace( /&gt;/gi, '>' );
		loader.onResult( createXMLFromString($rlt) );
		//
		if( !!queue ){
			queue.endFn();
		}
	}
}

/**
 * @ soap 호출 실패
 * @ 결과데이터
 *  */
var onServiceError = function( $params ){
	//trace($params);
	if( !!app_endLoading ){
		if( IS_CAPTUER==undefined ){
			app_endLoading();
		}else{
			if( IS_CAPTUER ){
	    	}else{
	    		app_endLoading();
	    	}
		}
	}
	
	//*
	
	if( !!loader.onError ){
		var $rlt = $params.replace( /'/g, '"' );
		//loader.onError( createXMLFromString($rlt) );
		loader.onError( $params );
		//
		if( !!queue ){
			queue.endFn();
		}
	}
	//*/
}


/**
 * @ SAP 데이터 호출 성공.
 * @ 결과데이터
 *  */
var onDataResult = function( $params ){
	if( !!app_endLoading ){
		if( IS_CAPTUER==undefined ){
			app_endLoading();
		}else{
			if( IS_CAPTUER ){
	    	}else{
	    		app_endLoading();
	    	}
		}
	}
	//
	if( !!loader.onResult ){
		var $rlt = $params.replace( /'/g, '"' );
		loader.onResult( $rlt );
		//
		if( !!queue ){
			queue.endFn();
		}
	}
};

/**
 * @ SAP 데이터 호출 실패.
 * @ 결과데이터
 *  */
var onDataError = function( $params ){
	if( !!app_endLoading ){
		if( IS_CAPTUER==undefined ){
			app_endLoading();
		}else{
			if( IS_CAPTUER ){
	    	}else{
	    		app_endLoading();
	    	}
		}
	}
	//
	if( !!loader.onError ){
		loader.onError( $params );
		//
		if( !!queue ){
			queue.endFn();
		}
	}
};


/**
 * @ queue 함수.
 * @ (현재 사용안함)
 *  */
var queue = {
		cnt:0,
		total:0,
		queueCompleteHandler : null,
		init : function(){
			queue.cnt = 0;
			queue.total = 0;
			queue.queueCompleteHandler = null;
			queue.queueList = [];
		},
		reset : function(){
			queue.queueList = null;
		},
		endFn : function(){
			queue.chkQueueList();
		},
		addMethod : function( $fn, $param, $context ){
			queue.add( "normal", $fn, $param, $context );
		},
		addEventMethod : function( $fn, $param, $context ){
			queue.add( "event", $fn, $param, $context );
		}, 
		add : function( $type, $fn, $param, $context ){
			queue.total += 1;
			queue.queueList.push({
				 type:$type,
				 fn:$fn,
				 param:$param,
				 context:$context
			});
		},
		excute:function( $fn ){
			
			if( !!$fn ){
				queue.queueCompleteHandler = $fn;
			}
			
			var obj = queue.queueList[queue.cnt];
			var fn = obj.fn;
			var context = obj.context;
			//
			if( !!context ){
				fn.apply( context, [obj.param] );
			}else{
				fn.call( null, obj.param );
			}
			//
			if( obj.type=="event" ){
			}else{
				queue.chkQueueList();
			}
		},
		chkQueueList : function(){
			queue.cnt++;
			if( queue.cnt<queue.total ){
				queue.excute();
			}else{
				var fn = null;
				if( !!queue.queueCompleteHandler ){
					fn = queue.queueCompleteHandler;
				}
				
				queue.reset();
				queue.init();
				
				if( !!fn ){
					fn();
				}
			}
		}
		
};