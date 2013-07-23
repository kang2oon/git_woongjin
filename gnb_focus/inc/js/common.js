$(document).ready(function () {

	$('#gnb').find('div.dep2').addClass('off'); //포지션값으로 상단에 올려놓은 상태...

// 키보드 접근시 focus 이동~!!!! 시작~
	$('.dep1li').focusin(function() {
					$('div.dep2', this).removeClass('off'); 
	});
	$('.dep1li').mouseover(function() {
					$('div.dep2', this).removeClass('off'); 
	});

	$('.dep1li').focusout(function() {
					$('div.dep2', this).addClass('off'); 
	});
	$('.dep1li').mouseout(function() {
					$('div.dep2', this).addClass('off'); 
	});
	
});