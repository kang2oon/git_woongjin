<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CSS Selector - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="css_select">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>CSS Selector</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#kind">선택자 종류</a></li>
						<li><a href="#use">선택자 사용 방식</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<div class="info_box mgtop30">
					CSS에서 가장 중요한 개념은 선택자(Selector)라고 할 수 있다. 선택자(Selector)가 있어야 선언된 CSS가 어디에 적용될지를 결정할 수 있기 때문입니다. 특히 CSS는 상속의 개념을
					가지므로 선택자(Selector)에 대한 확실한 이해가 없이는 CSS를 제대로 활용하지 못합니다.
				</div>
				<h3 class="mgtop20"><a name="kind"><i class="icon-chevron-right"></i> 선택자 종류</a></h3>
				<ol>
					<li>전체(공통) 선택자 (Universal Selector)
						<ol class="typei list_step2">
							<li>모든 태그에 대한 속성을 지정할 수 있으나, 사용빈도가 매우 낮음.</li>
							<li>선언은 *(별표)로 선언
<pre class="mgtop5"><code data-language="css">/* 전체 선택자 */
*{color:red;}
div *{font-size:10px;}</code></pre>
							</li>
						</ol>
					</li>
					<li>타입 선택자 (Type Selector)
						<ol class="typei list_step2">
							<li>HTML Tag를 지정하여 선언
<pre class="mgtop5"><code data-language="css">/* 타입 선택자 */
h1{font-size:20px;}
ul{overflow:hidden;}
a{color:red;}
p{text-decoration:underline;}</code></pre>
							</li>
						</ol>
					</li>
					<li>ID, CLASS 선택자 (ID, CLASS Selector)
						<ol class="typei list_step2">
							<li>엘리먼트에 직접 id, class 선택자명을 지정</li>
							<li>id는 #으로 class는 .(점)으로 구분하여 선언
<pre class="mgtop5"><code data-language="css">/* ID, CLASS 선택자 */
#bodyContent{width:100%;}
.clr{clear:both;}
.datetime{font-size:10px;}
#divNews .tab1{width:50px;height:50px;}
#divNews ul{background-color:red;}</code></pre>
							</li>
						</ol>
					</li>
					<li>유사클래스 선택자
						<ol class="typei list_step2">
							<li>해당 엘리먼트의 상태에 따라 구분짓는 선택자</li>
							<li>HTML 문서 상에는 없으나 CSS에서는 존재하는 것처럼 작성</li>
							<li>IE6에선 a 태그만 지정이 가능하고 그 외 브라우저는 지원여부가 조금씩 다름
<pre class="mgtop5"><code data-language="css">/* 유사클래스 선택자 */
a:link{color:blue;text-decoration:none;} /* 방문하지 않은 링크 */
a:visited{color:red;text-decoration:none;} /* 방문했던 링크 */
a:hover, a:active{color:black;text-decoration:underline;} /* 마우스 오버시와 클릭시 */</code></pre>
							</li>
						</ol>
					</li>
					<li>하위(자손) 선택자
						<ol class="typei list_step2">
							<li>특정 엘리먼트 하위의 엘리먼트를 지정할 때 사용</li>
							<li>공백(space)으로 구분함</li>
							<li>타입, id, class 선택자와도 함께 사용 가능
<pre class="mgtop5"><code data-language="css">/* 하위 선택자 */
ul li{height:30px;}
ul li a{color:red;}
table tr td{text-align:left;}</code></pre>
							</li>
						</ol>
					</li>
					<li>자식 선택자
						<ol class="typei list_step2">
							<li>하위(자손) 선택자와 다르게 엘리먼트 하위의 모든 엘리먼트가 아닌 특정 엘리먼트의 직접적인 하위의 자식 엘리먼트만 지정할 때 사용</li>
							<li>&gt; 로 구분
<pre class="mgtop5"><code data-language="css">/* 자식 선택자 */
div > a{font-size:20px;}</code></pre>
							</li>
						</ol>
					</li>
					<li>인접(이웃) 선택자
						<ol class="typei list_step2">
							<li>서로 이웃한 형제 엘리먼트 중에서 바로 뒤에 있는 요소만 선택한다.</li>
							<li>+ 로 구분
<pre class="mgtop5"><code data-language="css">/* 인접(이웃) 선택자 */
h1 + div{background-color:blue;}</code></pre>
							</li>
						</ol>
					</li>
					<li>형제 선택자
						<ol class="typei list_step2">
							<li>이웃 선택자와는 조금 다르게, 서로 이웃한 형제 엘리먼트 중에서 처음 요소를 제외한 뒤에 있는 모든 요소를 선택한다. </li>
							<li>~ 로 구분
<pre class="mgtop5"><code data-language="css">/* 인접(이웃) 선택자 */
div ~ p{background-color:#aaa;}</code></pre>
							</li>
						</ol>
					</li>
					<li>속성 선택자
						<ol class="typei list_step2">
							<li>여러가지 태그 안에 있는 속성을 특정하여 요소를 선택한다.</li>
							<li>[ ] 로 구분</li>
							<li>작성 예
								<ol class="typeA list_step3">
									<li>[속성] : 해당 속성이 정의된 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">a[target]{background-color:yellow;}</code></pre>
									</li>
									<li>[속성=값] : 해당 속성이 정의되어 있고, 그 값이 해당 값과 일치하는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">a[target='_blank']{background-color:yellow;}</code></pre>
									</li>
									<li>[속성!=값] : 해당 속성이 정의되어 있고, 그 값과 해당 값이 일치하지 않는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">p[position!='absolute']{background-color:yellow;}</code></pre>
									</li>
									<li>[속성^=값] : 해당 속성이 정의되어 있고, 그 값의 시작 단어와 해당 값이 일치하는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">a[href^='http']{background-color:yellow;}</code></pre>
									</li>
									<li>[속성$=값] : 해당 속성이 정의되어 있고, 그 값의 종료 단어와 해당 값이 일치하는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">a[href$='.jpg']{border:none;}</code></pre>
									</li>
									<li>[속성*=값] : 해당 속성이 정의되어 있고, 그 값에 해당 값이 포함되는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">img[title*='웅진홀딩스']{border:none;}</code></pre>
									</li>
									<li>[속성|=값] : 해당 속성이 정의되어 있고, 그 값이 해당 값과 일치하거나 해당 갓으로 시작하고 '-' 기호로 이어지는 모든 엘리먼트를 선택한다.
<pre class="mgtop5"><code data-language="css">[lang|='en']{background-color:yellow;}</code></pre>
									</li>
								</ol>
							</li>
						</ol>
					</li>
					<li>가상 선택자
						<ol class="typei list_step2">
							<li>:first-child - 지정된 요소의 첫 번째 하위(자식) 요소를 선택</li>
							<li>:first-letter - 지정된 요소의 첫 번째 문자를 선택</li>
							<li>:first-line -지정된 요소의 첫 번째 줄을 선택</li>
							<li>:last-child - 지정된 요소의 마지막 하위(자식) 요소를 선택</li>
							<li>:nth-child(순서) - 지정된 요소의 하위(자식) 요소 중 해당 순서의 요소를 선택</li>
							<li>:before - 지정된 요소의 앞 부분을 선택</li>
							<li>:after - 지정된 요소의 뒷 부분을 선택</li>
							<li>:lang(language) - 지정된 요소 중 언어가 괄호 안의 지정된 언어로 시작되는 요소를 선택</li>
							<li>작성 예
<pre class="mgtop5"><code data-language="css">li{color:#000;}
li:first-child{font-weight:bold;}
li:last-child{color:#FCF;}
li:nth-child(2){background-color:#AAA;color:#FFF;}</code></pre>
							</li>
						</ol>
					</li>
					<li>속성 선언 뒤 !important 를 선언하면 우선 순위에 상관없이 우선 적용된다.
<pre class="mgtop5"><code data-language="css">.info{width:100% !important;}</code></pre>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="use"><i class="icon-chevron-right"></i> 선택자 사용 방식</a></h3>
				<p>보다 빠른 웹페이지 성능 개선을 위해 많은 개발자들이 노력하고 있는데, CSS의 선택자 사용 방식을 통해 성능을 개선시킬 수 있는 다양한 방식이 연구되고 있으며, 그 중 알려진 몇 가지 
				방식을 소개하고자 한다.</p>
				<ol class="mgtop10">
					<li>OOCSS(권장)
						<ol class="typei list_step2">
							<li>공통 클래스를 불러다 놓고 각 엘리먼트에 세부적인 클래스를 추가하는 방식</li>
							<li>CSS
<pre class="mgtop5"><code data-language="css">.bg_comm{float:left;height:15px;background:url(comm.png) no-repeat;text-indent:-9999px;}
.link1{width:50px;background-position:0 0;}
.link2{width:25px;background-position:0 -25px;}</code></pre>
							</li>
							<li>HTML
<pre class="mgtop5"><code data-language="html">&lt;a href="#" class="bg_comm link1">링크1&lt;/a>
&lt;a href="#" class="bg_comm link2">링크2&lt;/a></code></pre>
							</li>
						</ol>
					</li>
					<li>Sass @extend
						<ol class="typei list_step2">
							<li>공통 클래스를 따로 만들지 않고 각 엘리먼트의 여러 클래스를 콤마로 구분하여 공통 스타일을 정의한 후, 아래에서 세부적인 스타일을 추가하는 방식</li>
							<li>CSS
<pre class="mgtop5"><code data-language="css">.link1, .link2, .link3{float:left;height:15px;background:url(comm.png) no-repeat;text-indent:-9999px;}
.link1{width:50px;background-position:0 0;}
.link2{width:25px;background-position:0 -25px;}
.link3{width:20px;background-position:0 -50px;}</code></pre>
							</li>
							<li>HTML
<pre class="mgtop5"><code data-language="html">&lt;a href="#" class="link1">링크1&lt;/a>
&lt;a href="#" class="link2">링크2&lt;/a>
&lt;a href="#" class="link3">링크3&lt;/a></code></pre>
							</li>
						</ol>
					</li>
					<li>Long / Bloated
						<ol class="typei list_step2">
							<li>클래스에 각각의 스타일을 정의하는 방식</li>
							<li>CSS
<pre class="mgtop5"><code data-language="css">.link1{float:left;width:50px;height:15px;background:url(comm.png) no-repeat 0 0;text-indent:-9999px;}
.link2{float:left;width:25px;height:15px;background:url(comm.png) no-repeat 0 -25px;text-indent:-9999px;}
.link3{float:left;width:20px;height:15px;background:url(comm.png) no-repeat 0 -50px;text-indent:-9999px;}</code></pre>
							</li>
							<li>HTML
<pre class="mgtop5"><code data-language="html">&lt;a href="#" class="link1">링크1&lt;/a>
&lt;a href="#" class="link2">링크2&lt;/a>
&lt;a href="#" class="link3">링크3&lt;/a></code></pre>
							</li>
						</ol>
					</li>
					<li>CSS 선택자 사용 방식에 따라 그에 따른 성능이 브라우저별로 다르게 나타나며, 도식화하면 아래 그림과 같다.
					<p class="mgleft20">아래 그림에서 보듯이 막대 그래프가 높을수록 그만큼 렌더링되는 시간이 오래 걸리며 막대그래프가 낮을수록 해당 CSS 선택자의 사용 방식의 효율성이 더 좋음을 알 
					수 있다.</p>
					<img src="/images/2_02_01.gif" alt="" class="mgleft20 mgtop10" style="width:700px;"/>
					<p>출처 : <a href="http://screwlewse.com/2010/08/different-css-techniques-and-their-performance/" target="_blank">screwlewse.com</a> <i class="icon-external-link"></i></p>
					</li>
				</ol>
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