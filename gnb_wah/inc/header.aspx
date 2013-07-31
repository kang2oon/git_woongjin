<div id="header">
	<h1><a href="/"><img src="/images/header/top_logo.gif" alt="웅진홀딩스"/></a></h1>
	<!-- GNB -->
	<div id="tnb">
		<ul>
			<li><a href="javascript:void(0);"><img src="/images/header/top_mu00_1.gif" alt="기업회생 게시판 바로가기"/></a></li>
			<li><a href="javascript:void(0);"><img src="/images/header/top_mu00_2.gif" alt="지속가능경영"/></a></li>
			<li><a href="javascript:void(0);"><img src="/images/header/top_mu00_3.gif" alt="윤리제보"/></a></li>
			<li><a href="javascript:void(0);"><img src="/images/header/top_mu00_4.gif" alt="SITEMAP"/></a></li>
		</ul>
	</div>
	<div id="gnb" class="clearfix">
		<div id="gnbitem">
			<ul class="clearfix">
				<li class="menu1">
					<a href="/holdings/holdings_company_01.aspx"><img src="/images/header/top_mu01_n.gif" alt="회사소개" class="menu_gnb"/></a>
					<div class="gnbsub">
						<ul>
							<li><a href="/holdings/holdings_company_01.aspx"><img src="/images/header/top01_mu01_n.gif" alt="회사소개"/></a></li>
							<li><a href="/holdings/holdings_company_02.aspx"><img src="/images/header/top01_mu02_n.gif" alt="CEO소개"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu03_n.gif" alt="계열사 구성"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu04_n.gif" alt="경영정신"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu05_n.gif" alt="CI"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu06_n.gif" alt="인사제도"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu07_n.gif" alt="기업문화"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu09_n.gif" alt="혁신경영"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top01_mu10_n.gif" alt="상생정신"/></a></li>
						</ul>
					</div>
				</li>
				<li class="menu2">
					<a href="/it/it_itservice_02.aspx"><img src="/images/header/top_mu02_n.gif" alt="사업분야" class="menu_gnb"/></a>
					<div class="gnbsub">
						<ul>
							<li><a href="/it/it_itservice_02.aspx"><img src="/images/header/top02_mu04_n.gif" alt="IT서비스&amp;솔루션"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top02_mu01_n.gif" alt="콜센터"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top02_mu03_n.gif" alt="FM사업"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top02_mu05_n.gif" alt="무안경3D광고"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top02_mu07_n.gif" alt="고객사"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top02_mu08_n.gif" alt="Best Practice"/></a></li>
						</ul>
					</div>
				</li>
				<li class="menu3">
					<a href="javascript:void(0);"><img src="/images/header/top_mu03_n.gif" alt="지속가능경영" class="menu_gnb"/></a>
					<div class="gnbsub">
						<ul>
							<li><a href="javascript:void(0);"><img src="/images/header/top03_mu01_n.gif" alt="윤리경영"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top03_mu02_n.gif" alt="사회공헌"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top03_mu03_n.gif" alt="환경경영"/></a></li>
						</ul>
					</div>
				</li>
				<li class="menu4">
					<a href="javascript:void(0);"><img src="/images/header/top_mu04_n.gif" alt="고객지원" class="menu_gnb"/></a>
					<div class="gnbsub">
						<ul>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu01_n.gif" alt="공지사항"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu02_n.gif" alt="기업회생 게시판"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu03_n.gif" alt="사업별문의안내"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu04_n.gif" alt="문의하기"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu05_n.gif" alt="찾아오시는길"/></a></li>
							<li><a href="javascript:void(0);"><img src="/images/header/top04_mu06_n.gif" alt="사이트맵"/></a></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

<script type="text/javascript">
	var GNB = new fnTopMenu1_Type1;
	GNB.DivName = "gnbitem";
	GNB.fnName = "GNB";
	GNB.DefaultMenu = 0;
	GNB.DefaultSubMenu = 0;
		
	GNB.Start();	
	
	$(function() {
		$('#gnbitem li').each(function() {
			var dir_path = window.location.pathname.substring(1,3);
//			alert(dir_path);
			var href = $(this).find('a').attr('href');
			if (dir_path == 'ho') {
				$('.menu1').addClass('current');
				$('.current > div').css('display', 'block');
				var selectedImg = $('.current .menu_gnb');
				var sURL = selectedImg.attr('src').replace('_n.gif', '_o.gif');
				selectedImg.attr("src", sURL);
			} 
			if (dir_path == 'it') {
				$('.menu2').addClass('current');
				$('.current > div').css('display', 'block');
				var selectedImg = $('.current .menu_gnb');
				var sURL = selectedImg.attr('src').replace('_n.gif', '_o.gif');
				selectedImg.attr("src", sURL);
			}
		});
		
		$('#gnbitem li li').each(function() {
			var href = $(this).find('a').attr('href');
			if (href == window.location.pathname) {
				$(this).addClass('currentsub');
				var selectedImg1 = $('.currentsub > a > img');
				var sURL1 = selectedImg1.attr('src').replace('_n.gif', '_o.gif');
				selectedImg1.attr("src", sURL1);
			}
		});
	});
	
//	$(function() {
//		$('#gnbitem li').each(function() {
//			var href = $(this).find('a').attr('href');
//			if (href == window.location.pathname) {
//				$(this).addClass('current');
//				
//				$('.current > div').css('display', 'block');
//				
//				var selectedImg = $('.current .menu_gnb');
//				var sURL = selectedImg.attr('src').replace('_n.gif', '_o.gif');
//				selectedImg.attr("src", sURL);
//				
//			}
//		 });

//	});  

</script>