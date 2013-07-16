<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>N-WAX : 진단/분석 Tools - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
</head>
<body id="access_n-wax">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>진단/분석 Tools - N-WAX</h2>
				<!--#include file="menu_tools.aspx"-->
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> N-WAX 소개</h3>
				<div class="info_box mgtop5">
					<span class="txtstrong">N-WAX(NHN Web Accessibility eXtension)</span><br/>
					평가를 수행하는데 필요한 도구들을 일원화하고 체크리스트에 대응되도록 구성하여 쉽고 빠르게 웹 접근성 평가를 할 수 있도록 만들어진 도구<br/>
					서비스를 사용하기 위해 로그인을 하는 등 세션 정보가 요구되는 경우 및 자바스크립트, 플래시 등의 플러그인을 통한 동적으로 구성된 웹 페이지를 원활히 검사할 수 있도록 브라우저 확장 기능 형태로 제작
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 실행 방법 : 파이어폭스</h3>
				<ol>
					<li>평가를 원하는 웹 페이지를 열어놓은 상태에서 사다리 모양의 'N-WAX' 아이콘을 클릭하면 좌측 사이드 바에 N-WAX가 실행</li>
					<li>프레임 콘텐츠 포함 여부를 선택한 뒤 'Check Current Page!'를 클릭하여 체크리스트별 결과를 확인
						<img src="/images/img_nwax1.png" alt="N-WAX 실행" class="mgleft20 mgtop5"/>
					</li>
				</ol>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 실행 방법 : 크롬</h3>
				<ol>
					<li>설치 및 실행 방법 (구글 크롬)구글 크롬용 <a href="https://chrome.google.com/webstore/detail/n-wax/admmeghjkchphcaflaepejekpidhaelc?hl=ko" target="_blank">N-WAX 다운로드 링크</a> <i class="icon-external-link"></i>를 통해 N-WAX를 설치</li>
					<li>평가를 원하는 웹 페이지를 열어놓은 상태에서 사다리 모양의 'N-WAX' 아이콘을 클릭하면 좌측 사이드바에 N-WAX가 실행</li>
					<li>N-WAX 실행과 동시에 표시되는 체크리스트별 결과를 확인
						<img src="/images/img_nwax2.png" alt="N-WAX 실행" class="mgleft20 mgtop5"/>
					</li>
				</ol>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> N-WAX를 통해 진단할 수 있는 접근성 항목</h3>
				<ol>
					<li>대체 텍스트
						<ul class="list_step2">
							<li>이미지 요소(&lt;img&gt;, &lt;area&gt;, &lt;input type="image"&gt;, CSS Background Image)의 대체 텍스트를 표시</li>
							<li>&lt;object&gt;, &lt;embed&gt; 요소가 사용되었는지를 표시</li>
						</ul>
					</li>
					<li>명도 대비 (파이어폭스 전용)
						<ul class="list_step2">
							<li>페이지에서 사용된 색상을 마우스를 통해 선택하여 선택된 두 색의 명도 대비 표시</li>
						</ul>
					</li>
					<li>W3C Validation (파이어폭스 전용)
						<ul class="list_step2">
							<li>검사하는 페이지와 포함된 프레임 페이지의 W3C Validation 결과를 표시</li>
							<li>로그인 정보 등 세션 정보가 적용된 소스 코드로 Validation을 수행</li>
						</ul>
					</li>
					<li>표 제목
						<ul class="list_step2">
							<li>사용된 &lt;table&gt; 요소의 caption, summary 정보를 표시</li>
						</ul>
					</li>
					<li>표 구조화
						<ul class="list_step2">
							<li>사용된 &lt;table&gt; 요소의 행들이 &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;으로 그루핑 되었는지를 표시</li>
							<li>사용된 &lt;table&gt; 요소에 제목 셀이 제공되었는지를 표시</li>
						</ul>
					</li>
					<li>단순 열람 문서 형식
						<ul class="list_step2">
							<li>범용적으로 열람 가능한 pdf 문서 대신 doc, xls, ppt, hwp 등의 형식으로 제공된 문서를 표시</li>
						</ul>
					</li>
					<li>단축키
						<ul class="list_step2">
							<li>accesskey 속성으로 제공된 단축키 정보를 표시</li>
						</ul>
					</li>
					<li>주언어 명시
						<ul class="list_step2">
							<li>검사하는 페이지와 포함된 프레임 페이지에 선언된 주언어를 표시</li>
						</ul>
					</li>
					<li>키보드 포커스
						<ul class="list_step2">
							<li>onfocus="this.blur()", CSS의 outline 속성이 0으로 지정된 요소를 표시</li>
						</ul>
					</li>
					<li>페이지 제목
						<ul class="list_step2">
							<li>검사하는 페이지와 포함된 프레임 페이지에 선언된 페이지 제목을 표시</li>
						</ul>
					</li>
					<li>프레임 사용
						<ul class="list_step2">
							<li>프레임의 제목(title 속성)을 표시</li>
						</ul>
					</li>
					<li>콘텐츠 블록 제목
						<ul class="list_step2">
							<li>&lt;h1&gt;~&lt;h6&gt;과 포함된 텍스트를 표시</li>
						</ul>
					</li>
					<li>링크 텍스트
						<ul class="list_step2">
							<li>링크 요소(&lt;a&gt;, &lt;area&gt;)의 텍스트를 표시</li>
						</ul>
					</li>
					<li>의도하지 않은 기능
						<ul class="list_step2">
							<li>window.open 함수 혹은 onchange 이벤트가 사용된 요소와 내용을 표시</li>
						</ul>
					</li>
					<li>레이블
						<ul class="list_step2">
							<li>폼 입력 요소에 사용된 레이블(&lt;label&gt;, title 속성)을 표시</li>
						</ul>
					</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-16 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>