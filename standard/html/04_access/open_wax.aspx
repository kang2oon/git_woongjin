<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>Open WAX : 진단/분석 Tools - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
</head>
<body id="access_openwax">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>진단/분석 Tools - Open WAX</h2>
				<!--#include file="menu_tools.aspx"-->
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> Open WAX 소개</h3>
				<div class="info_box mgtop5">
					<span class="txtstrong">OpenWAX(Open Web Accessibility eXtension)</span><br/>
					웹 접근성 진단을 쉽게 할 수 있도록 제작된 도구<br/>
					사용하는 브라우저에 맞는 OpenWAX를 설치 후 진단을 원하는 웹페이지에 접속 후 OpenWAX 실행<br/>
					- 파이어폭스/크롬용 OpenWAX, IE용 OpenWAX Bookmarlet로 이용가능
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 실행 방법 : 파이어폭스</h3>
				<ol>
					<li>접근성 진단을 원하는 사이트에 접속 후 툴바에서 OpenWAX 아이콘을 클릭하여 OpenWAX를 실행
						<img src="/images/img_openwax1.png" alt="OpenWAX 실행" class="mgleft20 mgtop5"/>
					</li>
					<li>상세설명
						<div class="clearfix mgleft20">
							<div class="fleft"><img src="/images/img_openwax2.png" alt="OpenWAX"/></div>
							<div class="fright mgtop10" style="width:350px;">
								<span class="txtsize13 txtstrong">WAX Score</span><br/>
								<img src="/images/img_wax_score.png" alt="WAX Score" class="mgtop10"/><br/>
								접근성 점수로 기계적으로 검사할 수 있는 접근성 관련 항목들을 100점 만점 수치화하여 표시<br/><br/>
								<span class="txtstrong">각 배점 설명</span>
								<ol>
									<li>대체 텍스트(30점): 전체 이미지 대비 대체 텍스트가 제공된 이미지를 10점 만점으로 환산.</li>
									<li>키보드 포커스(10점): onfocus 이벤트에 blur() 함수를 실행하여 키보드 포커스를 없애는 경우, CSS의 outline 속성이 0으로 설정된 경우 0점</li>
									<li>프레임 제목(10점): 페이지에 프레임이 제공되었다면 프레임에 제목(title 속성)이 제공된 비율을 10점 만점으로 환산.</li>
									<li>링크 텍스트(10점): 전체 링크 대비 링크 텍스트가 제공된 링크를 10점 만점으로 환산.</li>
									<li>기본 언어(10점): 페이지에 기본 언어가 명시되었는지를 점수로 환산. 프레임을 포함하여 검사하는 경우 기본 언어가 명시된 비율로 점수가 계산.</li>
									<li>의도하지 않은 실행(10점): onclick 이벤트에 window.open이 포함된 경우 새 창 알림(title 속성, target="_blank")이 제공된 비율을 10점 만점 환산.</li>
									<li>레이블(20점): 전체 폼 서식 대비 레이블이 제공된 폼 서식의 비율을 20점 만점으로 환산.</li>
								</ol>
							</div>
						</div>
						<div class="mgleft20 mgtop20">
							<span class="txtsize13 txtstrong">1~21번까지의 접근성 지표</span><br/>
							<p>1~21번까지의 접근성 지표에는 접근성 검사 수행 결과가 표시되며, (X)표시 빨간 배경색(이하 오류항목)이 표시되는 항목은 대부분 접근성 오류, (!)표시 노란 배경색(이하
							의심항목)이 표시되는 항목은 접근성 오류가 의심되는 항목.</p>
							<img src="/images/img_openwax3.png" alt="상세 항목" class="mgtop10"/>
							<ul class="mgtop10">
									<li>1. 적절한 대체 텍스트
										<ul class="list_step2">
											<li>img: &lt;img&gt;, &lt;area&gt;, &lt;input type="image"&gt; 요소의 alt 속성을 표시</li>
											<li>bg: CSS Background image가 지정된 요소의 텍스트 콘텐츠를 표시</li>
											<li>object: &lt;object&gt;, &lt;embed&gt;, &lt;video&gt;, &lt;audio&gt;, &lt;canvas&gt;, &lt;svg&gt; 요소를 표시</li>
										</ul>
									</li>
									<li>5. 텍스트 콘텐츠의 명도 대비 - 전경색과 배경색을 선택하면 명도 대비를 표시해주는 지표</li>
									<li>8. 초점 이동 - 키보드 초점이 표시되지 않는 형태로 제작된 코드를 일부 찾아줌</li>
									<li>12. 건너뛰기 링크 - 페이지에 사용된 최초 10개의 해시 링크를 표시</li>
									<li>13. 제목 제공
										<ul class="list_step2">
											<li>&lt;title&gt;, &lt;frame&gt;, &lt;iframe&gt;, &lt;h1&gt; ~ &lt;h6&gt; : 헤딩 태그를 표시</li>
										</ul>
									</li>
									<li>14.  적절한 링크 텍스트 - &lt;a&gt;, &lt;area&gt; 요소의 텍스트를 표시</li>
									<li>15. 기본 언어 표시 - &lt;html&gt; 태그에 선언된 lang, xml:lang 속성을 표시</li>
									<li>16. 사용자 요구에 따른 실행 - onclick 이벤트 핸들러 자바스크립트 코드에 window.open 포함된 경우 및 onchange 이벤트 핸들러 선언된 요소 표시</li>
									<li>18. 표의 구성(caption, summary)(th) - &lt;table&gt; 요소의 &lt;caption&gt;, &lt;th&gt; 와 summary가 표시</li>
									<li>21. 마크업 오류 방지</li>
								</ul>
						</div>
					</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-15 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>