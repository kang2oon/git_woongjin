/*
 사용안함
 * */

var type = 'text';

$(document).ready(function(){
	
	$('#TEXTAREA').val();
	
	$('#CANCEL').click(function(){
		$('#TEXTAREA').val('');
	});
	
	$('#TYPE').click(function(){
		if( type=='text' ){
			//type = 'voice';
		}else{
			//type = 'text';
		}
		
		var param = getParam();
		var jstr = JSON.stringify( param );
		app_setVoiceNote( jstr );
		//setTypeButton();
	});
	
	$('#SAVE').click(function(){
		//
		
		var param = getParam();
		
		if( type=='text' ){
			var str = $('#TEXTAREA').val();
			if( str.replace(/\s/g, '').length==0 ){
				app_alert( '메모를 입력하세요.' );
				return false;
			}
			param.CONTENTS = str;
		}
		
		var jstr = JSON.stringify( param );
		app_setNote( jstr );
		
	});
	//
	type = 'text';
	setTypeButton();
	
	//*
	var parentGp = $('.container');
	var parentGpH = Number( $(document).attr('documentElement').clientHeight );
	//parentGpH = Number( $(parentGp).css('height').replace( /px/, '' ) );
	//parentGpH += Number( $(parentGp).css("padding-bottom").replace( /px/, '' ) );
	//parentGpH += Number( $(parentGp).css("padding-top").replace( /px/, '' ) );
	//parentGpH += Number( $(parentGp).css("border-top-width").replace( /px/, '' ) );
	//parentGpH += Number( $(parentGp).css("border-bottom-width").replace( /px/, '' ) );
	
	console.debug(parentGpH);
	
	var btnGp = $('#BTN_GROUP');
	var btnGpH = Number( $(btnGp).css('height').replace( /px/, '' ) );
	btnGpH += Number( $(btnGp).css("padding-bottom").replace( /px/, '' ) );
	btnGpH += Number( $(btnGp).css("padding-top").replace( /px/, '' ) );
	btnGpH += Number( $(btnGp).css("border-top-width").replace( /px/, '' ) );
	btnGpH += Number( $(btnGp).css("border-bottom-width").replace( /px/, '' ) );
	
	console.debug(btnGpH);
	console.debug($('#TEXTAREA').css('height'));
	console.debug(String(parentGpH - btnGpH) + 'px');
	$('#TEXTAREA').css( 'height', String(parentGpH - btnGpH) + 'px' )
	//*/
});

var getParam = function(){
	
	var dt = new Date();
	var wk = (dt.getDay()==0)? 7 : dt.getDay();
	var date = '', mm, dd;
	date += String( dt.getFullYear() );
	date += getDigitNumString( dt.getMonth()+1 );
	date += getDigitNumString( dt.getDate() );
	
	var param = {
			KUNWE : '0092647279',
			KUNWE_TX: '김동식',
			DAYWK : wk,
			DATE: date
	};
	
	return param;
}


var setTypeButton = function(){
	if( type=='text' ){
		$('#TYPE').html('음성메모');
		$('#TEXTAREA').removeAttr( 'disabled' );
	}else{
		$('#TYPE').html('메모');
		$('#TEXTAREA').attr( 'disabled', 'disabled' );
	}
}

var getDigitNumString = function( n ){
	var numStr;
	if( n<10 ){
		numStr = '0' + n;
	}else{
		numStr = String(n);
	}
	return numStr;
};