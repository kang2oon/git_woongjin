// 탭 활성화
$(document).ready(function() {
	$('#tab li').each(function() {
		var dir_path = window.location.pathname;
		var href = $(this).find('a').attr('href');
		if (href == window.location.pathname) {
			$(this).addClass('current_tab');
			var selectedImg2 = $('.current_tab > a >img');
			var sURL2 = selectedImg2.attr('src').replace('_n.gif', '_o.gif');
			selectedImg2.attr("src", sURL2);
		}
	});
});