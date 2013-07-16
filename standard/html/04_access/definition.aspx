<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>웹 접근성 정의 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
</head>
<body id="access_definition">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>웹 접근성 정의</h2>
				<div class="info_box mgtop20">
					웹이란 '<span class="txtstrong">장애의 구애 없이 모든 사람들이 손쉽게 정보를 공유할 수 있는 공간</span>'
					<p class="txtright txtgray">by 팀 버너스 리</p>
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 웹 접근성 및 정보통신 접근성에 대한 주요 정의</h3>
				<ol>
					<li class="mgtop10">장애인·노인 등의 정보통신 접근성 향상을 위한 권장지침
						<p class="mgleft20">정보통신 제품과 서비스를 활용하고자 하는 사람에게 이의 활용 가능성이 제공되는 것</p>
					</li>
					<li class="mgtop10">웹 접근성 이니셔티브 (<a href="http://www.w3.org/WAI/intro/accessibility.php" target="_blank">WAI: Web Accessibility Initiative</a> <i class="icon-external-link"></i>)
						<p class="mgleft20">장애를 가진 사람들도 웹을 이용할 수 있도록 보장하는 것으로, 장애를 가진 사람들이 웹 콘텐츠를 인지하고(Perceivable), 운영하고(Operable), 
						이해하고(Understandable), 기술에 상관없이 이용할 수 있도록 견고한(Robust)하게 웹콘텐츠를 만드는 것</p>
					</li>
					<li class="mgtop10">Wikipedia
						<p class="mgleft20">표준 브라우저 뿐만 아니라 다양한 사용자 에이전트(User Agent)를 사용하는 사람들이 웹 페이지에 접근하기 쉽게 만드는 것으로, 이를 통해 장애인들도 웹을 
						사용할 수 있도록 보장하는 것</p>
					</li>
					<li class="mgtop10">한국정보화진흥원
						<p class="mgleft20">어떠한 사용자(장애인, 노인 등), 어떠한 기술환경에서도 사용자가 전문적인 능력 없이 웹 사이트에서 제공하는 모든 정보에 접근할 수 있도록 보장하는 것</p>
					</li>
				</ol>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 웹 접근성 진단/분석 목적</h3>
				<ul>
					<li>신규 구축하려는 웹사이트나 유지보수를 담당하는 웹사이트를 대상으로 외부 웹 접근성 인증을 받거나 전문가 집단을 통하지 않고도 최소한의 웹 접근성을 준수하고자 함.</li>
					<li>웹 마스터의 입장에서 웹 접근성 진단/분석을 할 수 있는 Tools에 대해 안내
						<ol class="list_step2">
							<li>파이어폭스/크롬 브라우저를 동한 부가기능 Add-on 파일 설치 후 이용</li>
							<li><a href="/html/04_access/korea.aspx" target="_blank">한국형 웹 접근성 지침 2.0</a> <i class="icon-external-link"></i> 기준으로 체크</li>
						</ol>
					</li>
				</ul>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 장애인 차별 금지 법(이하 장차법)</h3>
				<ul>
					<li>2008년 4월 11일부터 시행된 "장애인 차별 금지 및 권리 구제 등에 관한 법률"은 장애인이 교육, 고용 등 일상생활에서 장애로 차별을 당하지 않도록 법으로 금지하고 장애를 이유로 
					억울하게 차별받은 장애인을 효과적으로 구제하기 위해 마련된 법</li>
					<li>차별행위가 발생하는 경우 손해배상, 입증책임, 벌칙(3년 이하의 징역 또는 3천만원 이하의 벌금)이 따르게 되는 법으로서 기존의 유사 법률보다 좀 더 구체적이고 강제력이 부여됨</li>
					<li>2013년 4월 11일, 모든 법인이 해당하며 정당한 편의제공이 의무화됨</li>
				</ul>
				<div class="mgtop10 clearfix">
					<div class="fleft"><iframe width="355" height="266" src="//www.youtube.com/embed/WbIPv3ODUMM" frameborder="0" title="장차법애니메이션(자막+수화)1"></iframe></div>
					<div class="fright"><iframe width="355" height="266" src="//www.youtube.com/embed/-i_k4-yJ5o0" frameborder="0" title="장차법애니메이션(자막+수화)2"></iframe></div>
				</div>
				<div class="info_box mgtop10">
					<span class="txtstrong">장차법 관련 참조 링크</span>
					<ul>
						<li><a href="http://www.wah.or.kr/Accessibility/korealaw_view2.asp" target="_blank">웹 접근성 연구소 - 우리나라 법률</a> <i class="icon-external-link"></i></li>
						<li><a href="http://ddask.net/bbs/board.php?bo_table=rule1&amp;wr_id=1" target="_blank">장애인 차별금지추진연대 - 제정 의의</a> <i class="icon-external-link"></i></li>
						<li><a href="http://www.law.go.kr/lsEfInfoP.do?lsiSeq=129970#0000" target="_blank">장애인차별금지 및 권리구제 등에 관한 법률 시행령</a> <i class="icon-external-link"></i></li>
						<li><a href="http://www.wah.or.kr/campaign/contents/raw.asp" target="_blank">웹 접근성 캠페인</a> <i class="icon-external-link"></i></li>
					</ul>
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 국내외 웹 접근성 법률 및 제도</h3>
				<p class="txtcenter mgtop10"><img src="/images/0_01_08.png" alt="국내외 웹접근성 현황" style="border:1px solid #ccc;"/></p>
				<p class="mgtop10"><a href="http://www.w3.org/TR/WCAG/" target="_blank">WCAG</a> <i class="icon-external-link"></i> 의 내용을 바탕으로 하여 나라별로
				오래전부터 시행되고 있음.</p>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-09 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>