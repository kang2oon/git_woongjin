<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>퍼블리싱 규칙 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="html_rule">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>퍼블리싱 규칙</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#basic">기본규칙</a>
							<ol class="list_step2">
								<li><a href="#basic10">(X)HTML/CSS/SCRIPT 분리</a></li>
								<li><a href="#basic11">W3C Validation</a></li>
								<li><a href="#basic12">영문 소문자 사용</a></li>
								<li><a href="#basic13">애트리뷰트 값 표기</a></li>
								<li><a href="#basic14">entity 코드 사용</a></li>
								<li><a href="#basic20">정확한 문서 구조 준수</a></li>
								<li><a href="#basic30">모든 요소는 완벽하게 중첩되어야 한다</a></li>
								<li><a href="#basic31">모든 속성값은 속성이 함께 선언되어야 한다</a></li>
								<li><a href="#basic32">모든 요소는 닫아야 한다</a></li>
								<li><a href="#basic33">block 요소와 inline 요소를 구분하십시오</a></li>
							</ol>
						</li>
						<li><a href="#indent">들여쓰기 규칙</a></li>
						<li><a href="#blank_line">빈 줄 규칙</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="basic"><i class="icon-chevron-right"></i> 기본규칙</a></h3>
				<ol>
					<li><a name="basic10">(X)HTML/CSS/SCRIPT 분리</a>
						<p class="list_step2">문서의 내용과 디자인과 행동을 분리한다. 분리하는 목적은 CSS와 javascript 없이도 문서를 이용할 수 있게 하는데 있다.</p>
					</li>
					<li><a name="basic11">W3C Validation</a>
						<p class="list_step2">HTML은 해당 DTD의 명세에 맞게 작성하며, W3C Validation을 통과해야 한다.<br/>
						<a href="http://validator.kldp.org/" target="_blank">http://validator.kldp.org/</a> <i class="icon-external-link"></i></p>
					</li>
					<li><a name="basic12">영문 소문자 사용</a>
						<div class="list_step2">DTD를 제외한 모든 엘리먼트와 애트리뷰트는 소문자로 작성한다.
<pre><code data-language="html">&lt;img SRC="bad.gif" alt="bad" onMouseover="this.src='bad.jpg'"/> (X)
&lt;img src="good.gif" alt="good" onmouseover="this.src='good.jpg'"/> (O)</code></pre>
						</div>
					</li>
					<li><a name="basic13">애트리뷰트 값 표기</a>
						<div class="list_step2">애트리뷰트 값은 큰 따옴표("")로 묶는다. 단, 중첩 속성이 경우에 한해 작은 따옴표('')를 허용한다.
<pre><code data-language="html">&lt;img src=bad.gif alt=bad/> (X)
&lt;img src='bad.gif' alt='bad'/> (X)
&lt;img src="good.gif" alt="good"/> (O)</code></pre>
						</div>
					</li>
					<li><a name="basic14">entity 코드 사용</a>
						<ol class="typei list_step2">
							<li>특수기호는  entity name을 사용하여 entity 코드로 변환한다. entity number는 사용하지 않는다.</li>
							<li>entity 코드는 ISO-8859-1을 기준으로 하며, 아래 경로에서 확인할 수 있다.<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTML ISO-8859-1 Reference : <a href="http://w3schools.com/tags/ref_entities.asp" target="_blank">http://w3schools.com/tags/ref_entities.asp</a> <i class="icon-external-link"></i></li>
							<li>text나 URL, script에 포함된 특수 문자는 제외시킨다.<br/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자동으로 생성되는 링크의 경로나 이미지의 alt값에도 entity 코드가 바르게 적용되도록 한다.</li>
						</ol> 
					</li>
					<li><a name="basic20">정확한 문서 구조 준수</a>
						<p class="list_step2">문서의 기본 구조는 다음과 같이 해당페이지의 기본정보를 포함하는 head와 본문을 포함하는 body를 갖는다.</p>
						<div class="width700 list_step2 mgtop5">
<pre><code data-language="html">&lt;html>
  &lt;head>
    (해당 페이지 기본 정보)
  &lt;/head>
  &lt;body>
    (해당 페이지 본문)
  &lt;/body>
&lt;/html></code></pre>
						</div>
						<p class="list_step2">다음과 같은 기본 구조를 갖는다.</p>
						<ul class="list_step2">
							<li>XHTML
<pre><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
&lt;html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
  &lt;head>
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    &lt;title> Woongjin 서비스명 &lt;/title>
  &lt;/head>
  &lt;body>
    ...
  &lt;/body>
&lt;/html></code></pre>
							</li>
							<li>HTML5
<pre><code data-language="html">&lt;!DOCTYPE html>
&lt;html lang="ko">
  &lt;head>
    &lt;meta charset="utf-8"/>
    &lt;title>Woongjin 서비스명&lt;/title>
  &lt;/head>
  &lt;body>
    ...
  &lt;/body>
&lt;/html></code></pre>
							</li>
							<li>HTML
<pre><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
&lt;html lang="ko">
  &lt;head>
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    &lt;title> Woongjin 서비스명 &lt;/title>
  &lt;/head>
  &lt;body>
    ...
  &lt;/body>
&lt;/html></code></pre>
							</li>
						</ul>
					</li>
					<li><a name="basic30">모든 요소는 완벽하게 중첩되어야 한다.</a>
<pre class="list_step2"><code data-language="html">&lt;p>This is a &lt;strong>bad&lt;/p>example&lt;/strong> (X)
&lt;p>This is a &lt;strong>good&lt;/strong>example&lt;/p> (O)</code></pre>
					</li>
					<li><a name="basic31">모든 속성값은 속성이 함께 선언되어야 한다.</a>
<pre class="list_step2"><code data-language="html">&lt;option value="wrong" selected>bad example&lt;/option> (X)
&lt;option value="right" selected="selected">good example&lt;/option> (O)</code></pre>
					</li>
					<li><a name="basic32">모든 요소는 닫아야 한다.</a>
<pre class="list_step2"><code data-language="html">&lt;img src="good_sample.gif" alt="좋은 예제 이미지" />
&lt;input type="text" /> &lt;hr /> &lt;br /></code></pre>
					<p class="list_step2">Empty 엘리먼트도 닫아주어야 한다. (단, HTML 4.01 은 제외)</p>
<pre class="list_step2"><code data-language="html">&lt;div>&lt;/div> &lt;p>&lt;/p> &lt;strong>&lt;/strong></code></pre>
					<p class="list_step2">FireBug 사용시 Non-Empty 엘리먼트 내에 내용이 없으면 위와 같이 Empty 엘리먼트 처럼 닫아주는데 이와같이 사용하면 절대로 안된다.</p>
					</li>
					<li><a name="basic33">block 요소와 inline 요소를 구분하십시오.</a>
						<ul class="list_step2">
							<li>block 요소
								<div class="list_step2">
									<ul>
										<li>줄을 바꿔 각각 독립된 줄에 표시된다.</li>
										<li>height, line-height, maring-top, margin-bottom을 다룰 수 있습니다.</li>
										<li>별도의 CSS 컨트롤이 없다면 해당 문서 크기만큼의 너비를 가지며, 문서의 위에서부터 차곡차곡 쌓이는 형태로 표시된다.</li>
										<li>인라인 요소와 텍스트 혹은 또 다른 블록요소를 포함 할 수 있다.</li>
									</ul>
								</div>
<pre class="list_step3"><code data-language="html">&lt;div>, &lt;form>, &lt;ul>, &lt;ol>, &lt;li>, &lt;dl>, &lt;dt>, &lt;dd></code></pre>
							</li>
							<li>inline 요소
								<div class="list_step2">
									<ul>
										<li>다른 인라인 요소와 같은 줄에 표시된다.</li>
										<li>별도의 CSS컨트롤이 없다면 해당 문서의 좌측부터 우측으로 나열되는 형태로 표시된다.</li>
										<li>height, line-height, maring-top, margin-bottom을 선언할 수 없습니다.</li>
										<li>img를 제외하고, width를 선언할 수 없습니다.</li>
										<li>또 다른 인라인 요소와 텍스트를 포함 할 수 있으나, 블록요소를 포함할 수는 없다.</li>
									</ul>
								</div>
<pre class="list_step3"><code data-language="html">&lt;a>, &lt;img>, &lt;select>, &lt;input></code></pre>
							</li>
						</ul>
						<p class="list_step2 txtimportant">p태그 안에서 div태그를 사용하지 마십시오. p태그는 inline 요소를 사용하도록 지정된 태그입니다. div는 block 요소이므로, p태그 안에서 div를 사용하면 유효성 검사에서 실패하게 됩니다.</p>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="indent"><i class="icon-chevron-right"></i> 들여쓰기 규칙</a></h3>
				<p class="list_step3">들여쓰기를 하면 코드의 가독성이 높아지고 전체 HTML 구조를 쉽게 파악할 수 있다. 다음과 같은 들여쓰기 규칙을 준수한다.<br/>
				마크업의 중첩이 깊어질 때마다 자식 엘리먼트는 1탭 들여쓰고, 1탭의 크기는 공백 4칸으로 설정한다.</p>
				<h3 class="mgtop20"><a name="blank_line"><i class="icon-chevron-right"></i> 빈 줄 규칙</a></h3>
				<ol>
					<li>의미 있는 객체를 구분하기 위하여 코드 그룹 각 1줄씩 빈 줄을 만드는 것은 허용한다. 빈 줄의 간격은 1줄을 초과하지 않는다.</li>
					<li>빈 줄을 사용하는 것은 선택 사항이다.</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-06-13 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>