<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CSS Hack - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="css_hack">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>CSS Hack</h2>
				<div class="info_box mgtop30">
					크로스브라우징을 진행하다보면 브라우저마다 HTML을 렌더링하는 방식이 조금씩 차이가 나고, 때로는 버그가 존재하는 관계로 모든  CSS 코드가 모든 웹브라우저에서 똑같이 보이지 않는다.
					따라서 이러한 특성을 이용하여 특성 브라우저를 제외하거나, 특정 브라우저에서만 CSS를 적용하는 기법을 CSS 핵(hack) 이라고 부른다.<br/>
					그래서 문법적으로 맞지 않거나, 특정 브라우저에만 적용되는 비표준인 경우가 많기 때문에 이러한 CSS 핵은 어쩔 수 없는 경우가 아니면 사용하지 않아야 한다. 또한 단순히 눈 앞의 문제만을
					해결하기 위해 핵을 사용하면 나중에 페이지를 수정하거나 브라우저의 버전이 올라갈 때에 문제가 생길 수 있다.<br/>
					CSS 핵은 이런게 있다는 것도 알아두고, CSS 핵을 사용하기에 앞서 근본적으로 디자인을 수정하거나 다른 표준 태그로 해결하는게 좋을 것 같다.
				</div>
				<h3 class="mgtop20"><a name="kind"><i class="icon-chevron-right"></i> Browser Specific Hacks</a></h3>
<pre class="mgtop5"><code data-language="css">Last updated on: April 20, 2013

/***** Selector Hacks ******/

/* IE6 and below */
* html #uno  { color: red }
 
/* IE7 */
*:first-child+html #dos { color: red } 
 
/* IE7, FF, Saf, Opera  */
html>body #tres { color: red }
 
/* IE8, FF, Saf, Opera (Everything but IE 6,7) */
html>/**/body #cuatro { color: red }
 
/* Opera 9.27 and below, safari 2 */
html:first-child #cinco { color: red }
 
/* Safari 2-3 */
html[xmlns*=""] body:last-child #seis { color: red }
 
/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:nth-of-type(1) #siete { color: red }
 
/* safari 3+, chrome 1+, opera9+, ff 3.5+ */
body:first-of-type #ocho {  color: red }
 
/* saf3+, chrome1+ */
@media screen and (-webkit-min-device-pixel-ratio:0) {
 #diez  { color: red  }
}
 
/* iPhone / mobile webkit */
@media screen and (max-device-width: 480px) {
 #veintiseis { color: red  }
}
 
/* Safari 2 - 3.1 */
html[xmlns*=""]:root #trece  { color: red  }
 
/* Safari 2 - 3.1, Opera 9.25 */
*|html[xmlns*=""] #catorce { color: red  }
 
/* Everything but IE6-8 */
:root *> #quince { color: red  }
 
/* IE7 */
*+html #dieciocho {  color: red }
 
/* Firefox only. 1+ */
#veinticuatro,  x:-moz-any-link  { color: red }
 
/* Firefox 3.0+ */
#veinticinco,  x:-moz-any-link, x:default  { color: red  }
 
 
 
/***** Attribute Hacks ******/
 
/* IE6 */
#once { _color: blue }
 
/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }
 
/* Everything but IE6 */
#diecisiete { color/**/: blue }
 
/* IE6, IE7, IE8 */
#diecinueve { color: blue\9; }
 
/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }
 
/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */</code></pre>
				<p>출처 : <a href="http://browserhacks.com/" target="_blank">http://browserhacks.com/</a> <i class="icon-external-link"></i></p>
				<h3 class="mgtop20"><a name="kind"><i class="icon-chevron-right"></i> IE를 위한 조건부 주석 사용하기</a></h3>
				<p>마이크로소프트사는 다른 버전의 IE를 목표로 조건부 주석을 포함시켰다.<br/>
				마크업, 자바스크립트, 자바스크립트 파일들, CSS, 외부 스타일 시트를 포함하여 조건부 주석 안에 그 어떤 것도 삽입 할 수 있다.<br/>
				조건부 주석을 사용하면 구체적인 IE 를 집어내걱나, 특정 버전 전, 후의 어떤 버전이라도 집어낼 수 있다.
				</p>
<pre class="mgtop5"><code data-language="html">&lt;!--[if lte IE 6]>
&lt;p>This message will only appear in versions of Internet Explorer less than or equal to version 6.&lt;/p>
&lt;![endif]--> 

&lt;!--[if gte IE 6]>
&lt;p>This message will only appear in versions of Internet Explorer greater than or equal to version 6.&lt;/p>
&lt;![endif]--> 

&lt;!--[if gt IE 6]>
&lt;p>This message will only appear in versions of Internet Explorer greater than version 6.&lt;/p>
&lt;![endif]-->

&lt;!--[if IE 5.5]>
&lt;p>This message will only appear in Internet Explorer 5.5.&lt;/p>
&lt;![endif]-->

&lt;!--Sample Conditional Stylesheet, IE6 and below-->
&lt;!--[if lte IE 6]>
&lt;link type="text/css" rel="stylesheet" href="css/ie6.css" />
&lt;![endif]-->
</code></pre>
				<p>조건부 스타일시트를 사용하면 다른 방법에 비해서 몇 가지 장점이 있다. <br/>
스타일시트는 다른 스타일시트와 구분되고, 다른 브라우저에 영향을 주는 등의 혼란이 없다. <br/>
IE6가 현저하게 시장점유율이 낮아진다면, 그 스타일시트를 제거하기만 하면 된다. <br/><br/>
조건부 파일을 사용하는 유일한 단점은 그것들이 추가적인 HTTP 요청을 브라우저를 위해서 페이지에 추가한다는 것이다. <br/>
이것이 스타일시트를 사용하는 것과 비교하면 수용 가능한 거래(trade-off)이긴 하지만, 조건부 외부 자바스크립트 파일을 사용하는데는 반대한다. <br/>
왜냐하면 자바스크립트 파일은 마치 블록커(Blocker)처럼 행동하고, 그들이 완전하게 로드되기전에는 다른 파일들이 로드 되는 것을 막을 것이기 때문이다. <br/>
만약 당신이 외부 파일에 조건부 자바스크립트를 필요로 한다면, 그 브라우저를 목표로 하는 자바스크립트만을 사용하라.</p>
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