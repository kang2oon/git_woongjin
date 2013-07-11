<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>RESET - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="css_reset">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>RESET</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<h3>CSS 리셋이란?</h3>
					모든 브라우저는 기본 스타일을 가지고 있다. 문제는 그러한 기본 스타일이 각 브라우저마다 다르다는 것.<br/>
					CSS 리셋은 특정 브라우저에서만 적용되는 스타일을 제거하고 모든 브라우저에서 동일하게 보이도록 하는데 그 목적이 있다. <br/><br/>
					가장 널리 사용되는 CSS 리셋은 에릭마이어의 리셋과 YUI2 리셋이다. <br/>
					에릭마이어(Eric Meyer) Reset : <a href="http://meyerweb.com/eric/tools/css/reset/" target="_blank">http://meyerweb.com/eric/tools/css/reset/</a> <i class="icon-external-link"></i><br/>
					YUI 2 Reset : <a href="http://developer.yahoo.com/yui/reset/" target="_blank">http://developer.yahoo.com/yui/reset/</a> <i class="icon-external-link"></i><br/><br/>
					그외 Reset5 라는 CSS Reset이 존재하는데 에릭마이어의 CSS 리셋을 기본으로 HTML5 대응을 위해 html5doctor.com 의 HTML5 Reset를 조합하여 제작되었다. <br/>
					Reset5 : <a href="https://code.google.com/p/reset5/" target="_blank">https://code.google.com/p/reset5/</a> <i class="icon-external-link"></i>
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 제안 RESET</h3>
				<ol>
					<li>Reset5 리셋에 clear 속성을 추가하여 사용할 것은 제안한다.</li>
					<li>단, CSS 리셋을 사용함에 있어 3가지 우려가 존재한다.
						<ol class="typei list_step2">
							<li>모든 요소의 값을 '0'으로 만들어 버리면 각 값을 다시 재지정해야 한다 이것은 파일 사이즈의 증가 원인이 될 수 있다.</li>
							<li>브라우저의 기본 값을 지정한 뒤에 다시 적절한 값을 재지정하는 것을 잊어버릴 수 있다.</li>
							<li>어떤 리셋은 키보드에 의존하여 메뉴를 조작하는 사용자에게 불편을 줄 수 있다. (예 : a:focus{outline:0;})</li>
						</ol>
					</li>
				</ol>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> RESET CSS Source</h3>
<pre class="mgtop5"><code data-language="css">/*
kang2oon CSS Reset (add clearfix class)

Based on Eric Meyer's CSS Reset
and html5doctor.com HTML5 Reset

Copyright (c) 2011 736 Computing Services Limited
Released under the MIT license. http://opensource.736cs.com/licenses/mit
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, i, center, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, audio, canvas, details, figcaption,
figure, footer, header, hgroup, mark, menu, meter, nav,
output, progress, section, summary, time, video {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
}

body {
	line-height: 1;
}

article, aside, dialog, figure, footer, header, 
hgroup, nav, section, blockquote { 
	display: block;
}

nav ul {
	list-style: none;
}

ol {
	list-style: decimal;
}

ul {
	list-style: disc;
}

ul ul {
	list-style: circle;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

ins {
	text-decoration: underline;
}

del {
	text-decoration: line-through;
}

mark {
	background: none;
}

abbr[title], dfn[title] {
	border-bottom:1px dotted #000;
	cursor:help;
}

/* tables still need 'cellspacing="0"' in the markup */
table {
	border-collapse: collapse;
	border-spacing: 0;
}

hr {
	display: block;
	height: 1px;
	border: 0;	
	border-top: 1px solid #ccc;
	margin: 1em 0;
	padding: 0;
}

input[type="submit"], input[type="button"], button {
    padding: 0 !important;
    margin: 0 !important;
}

input, select, a img {
	vertical-align: middle;
}

.clearfix:after {
	content: ".";
	display: block;
	clear: both;
	visibility: hidden;
	line-height: 0;
	height: 0;
}
.clearfix {
	display: block;
	*zoom:1;
}
 
html[xmlns] .clearfix {
	display: block;
}
 
* html .clearfix {
	height: 1%;
}
</code></pre>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-05 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>