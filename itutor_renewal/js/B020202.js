/********************************************************************************/
//global Value
/********************************************************************************/

var $container;

/********************************************************************************/
//BASE logic 
/********************************************************************************/

//페이지 로드
$(document).ready(function(){

	app_endLoading();
	$container	= $("#Contents .container");
	app_getRequestParameter( 'setData' );

});

//페이지 파라미터 수신
var setData = function( $data ){

	app_changeTitle("회비 카드결제 약관동의");

	if(String($data)!="undefined" && !!$data && String($data)!="(null)") {
		pageParams = $data.replace(/\'/g,'"');
		pageParams = JSON.parse( pageParams );

		set_data();
	} else {

	}


};

// 페이지 이동
var changePage = function(page_name){
	var url = page_name;
	app_changePage( url, pageParams );
}

// 기본화면구성
var set_data = function() {

	$("#NAME1").html(pageParams.NAME1);
	$("#PAY_CARD_PERSON_SSNUM").html(String(pageParams.PAY_CARD_PERSON_SSNUM).substring(0, 6)+"-XXXXXXX");

	try
	{
		if(pageParams.AGREEMENT_CHECK=="X") {
			$("#PAY_CARD_EDUFREE1").attr("checked","checked");
		}

		if(pageParams.SIGNATURE) {
			setSignImg(pageParams.SIGNATURE);
		}
	}
	catch (e)
	{
	}
}

//@ 항목 데이터 저장
var saveJson = function() {

	if($("#AGREEMENT_CHECK").attr("checked")=="checked") {
		pageParams.AGREEMENT_CHECK = "X";
	} else {
		pageParams.AGREEMENT_CHECK = " ";
	}
	pageParams.SIGNATURE = $("#signature").val();

	pageParams_json = JSON.stringify( pageParams );

	app_setRequestParameter("readyChange", pageParams);
}

// 페이지 이동
var readyChange=function() {
	app_changePage( 'B020203.html', pageParams );
}

// 확인클릭시
var policySubmit = function() {

	if($("#AGREEMENT_CHECK").attr("checked")!="checked") {
		app_alert("약관에 동의해주세요.");
		return;
	}
	if($("#signature").val()=="") {
		//app_alert("보호자 사인이 없습니다.");
		sign_drew();
		return;
	}

	saveJson();

}

// 싸인이미지 요청
var sign_drew = function() {
	app_setSign( 'setSignImg' );
}

/**
 * 싸인 데이터 적용
 *  */
var setSignImg = function( data ){
	// 테스트용 : 전달받은 데이터 div에 표시
	$('#signature').val(data);
	//
	var src = 'data:image/jpg;base64,'+ data;

	// ** 이미지 태그에 적용
	addImageSrc( src );
};

/**
 * 이미지 태그 소스에 넣기
 *  */
var addImageSrc = function( src ){
	// 적용
	$('#imgEl').attr('src', src);
};