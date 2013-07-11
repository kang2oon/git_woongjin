<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CSS 코드 작성 규칙 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="css_basic">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>CSS 코드 작성 규칙</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#basic">기본 규칙</a></li>
						<li><a href="#attribt">속성 규칙</a></li>
						<li><a href="#zindex">z-index 규칙</a></li>
						<li><a href="#declaration">CSS 선언 타입</a></li>
						<li><a href="#annotation">주석</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="basic"><i class="icon-chevron-right"></i> 기본 규칙</a></h3>
				<ol>
					<li>W3C Validation : CSS는 사용 가능한 Hack과 CSS3 속성을 제외하고 W3C Validation을 통과해야 한다.</li>
					<li>CSS 선언은 Script 선언보다 먼저 한다.
						<ol class="typei list_step2">
							<li>대부분의 브라우저 엔진에서는 style이 정의된 다음에 화면이 그려지므로 css 선언은 되도록 빨리하는 것이 좋다.</li>
							<li>head 태그에 style을 선언할 때 script 선언 보다 더 위에 위치하도록 할 것.
<pre class="mgtop5"><code data-language="html">&lt;head>
  &lt;link rel="stylesheet" type="text/css" href="something.css" /> &lt;!-- 스타일부터 선언 -->
  &lt;script type="text/javascript" src="something.js">&lt;/script> &lt;!-- 스크립트는 나중에 선언 -->
&lt;/head></code></pre>
							</li>
						</ol>
					</li>
					<li>영문소문자 사용 : 모든 속성은 영문 소문자로만 사용한다.
<pre class="mgtop5"><code data-language="css">.class{font-family:AppleGothic;} (O)
.class{Font-Family:AppleGothic;} (X)</code></pre>
					</li>
					<li>간결한 CSS 유지 : Hack 사용은 위험하니 어쩔 수 없는 경우를 제외하고 사용을 자제하는 것이 좋다.</li>
					<li>되도록 한줄에 정의할 것.
<pre class="mgtop5"><code data-language="css">h2{font-size:18px;border:1px solid blue;color:#ddd;} (O)
h2{
  font-size:18px;
  border:1px solid blue;
  color:#ddd;
} (△)</code></pre>
					</li>
					<li>줄임규칙을 사용 : CSS는 시계방향으로 정의함. (Top → Right → Bottom → Left)
<pre class="mgtop5"><code data-language="css">.test{margin:10px 20px 10px 20px;background:#ddd;} (O)
.test{margin-top:10px;margin-right:20px;margin-bottom:10px;margin-left:10px;background:#dddddd;} (X)</code></pre>
					</li>
					<li>빈 줄
						<ol class="typei list_step2">
							<li>의미있는 객체를 구분하기 위하여 코드 그룹 각 1줄씩 빈 줄을 넣을 수 있다. 단, 빈 줄의 간격은 1줄을 초과하지 않게 한다.</li>
							<li>빈 줄의 사용은 선택 사항이다.</li>
						</ol>
					</li>
					<li>인코딩
						<ol class="typei list_step2">
							<li>폰트 이름이 영문이 아닐 경우 이를 브라우저에서 바르게 표현하고, HTML에서 불러온 스타일을 제대로 렌더링하려면 반드시 CSS 인코딩을 선언해야 한다.</li>
							<li>HTML과 동일한 인코딩을 문서 첫 줄에 공백없이 선언한다.</li>
							<li>파일을 저장할 때는 반드시 선언한 인코딩과 동일한 인코딩을 선택한다.
<pre class="mgtop5"><code data-language="css">@charset "utf-8";</code></pre>
							</li>
						</ol>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="attribt"><i class="icon-chevron-right"></i> 속성 규칙</a></h3>
				<ol>
					<li>속성 선언 순서
						<ol class="typei list_step2">
							<li>속성을 선언할 때는 그 쓰임새가 레이아웃과 관련이 큰 것에서 시작하여 레이아웃과 무관한 것 순서로 선언한다.
								<table cellspacing="0" cellpadding="0">
									<caption>표2-2-1 속성 선언 순서</caption>
									<colgroup>
									<col width="40" />
									<col width="70" />
									<col />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">순서</th>
										<th scope="col">의미</th>
										<th scope="col">대표되는 속성</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td class="txtcenter">1</td>
										<td class="txtcenter">레이아웃</td>
										<td>display, visibility, overflow, float, clear, position, top, right, bottom, left, z-index</td>
									</tr>
									<tr>
										<td class="txtcenter">2</td>
										<td class="txtcenter">BOX</td>
										<td>width, height, margin, padding, border</td>
									</tr>
									<tr>
										<td class="txtcenter">3</td>
										<td class="txtcenter">배경</td>
										<td>background</td>
									</tr>
									<tr>
										<td class="txtcenter">4</td>
										<td class="txtcenter">폰트</td>
										<td>font, color, letter-spacing, text-align, text-decoration, text-indent, vertical-align, white-space</td>
									</tr>
									<tr>
										<td class="txtcenter">5</td>
										<td class="txtcenter">기타</td>
										<td>위에 언급되지 않은 나머지 속성들로 폰트의 관련 속성 이후에 선언하며, 기타 속성 내의 선언 순서는 무관함</td>
									</tr>
									</tbody>
								</table>
							</li>
							<li>밴더 속성과 핵 속성은 해당 속성 뒤에 선언한다.
<pre class="mgtop5"><code data-language="css">.btn{border:1px solid #f60;*border:2px solid #f60;border-radius:2px;-webkit-boderradius:2px;}</code></pre>
							</li>
						</ol>
					</li>
					<li>속성 값 축약
						<ol class="typei list_step2">
							<li>CSS 최적화를 위해 다음과 같이 속성 값을 축약한다.
								<table cellspacing="0" cellpadding="0">
									<caption>표2-2-2 속성 값 축약 예</caption>
									<colgroup>
									<col width="225" />
									<col width="175" />
									<col />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">축약 전</th>
										<th scope="col">축약 후</th>
										<th scope="col">설명</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>#555555</td>
										<td>#555</td>
										<td rowspan="2">16진수 컬러 코드 값<br/>
										동일한 값으로 이루어진 16진수 컬러 코드 값은 세 자릿 수로 축약하여 사용한다. 단, 인터넷 익스플러로 전용 속성인 CSS filter를 사용했을 경우 축약 속성을 인식하지 못하는 
										오류가 있기 때문에 속성 값을 축약하지 않는다.</td>
									</tr>
									<tr>
										<td>#ff4400</td>
										<td>#f40</td>
									</tr>
									<tr>
										<td>background-position:left center</td>
										<td>background:0 50%</td>
										<td>위치 값<br/>
										문자로 표현한 위치 값은 숫자로 변경한다.</td>
									</tr>
									<tr>
										<td>top:0px</td>
										<td>top:0</td>
										<td>0의 단위<br/>
										속성 값이 0 일 경우 단위를 표시하지 않는다.</td>
									</tr>
									<tr>
										<td>padding: 20px 20px 20px 20px</td>
										<td>padding:20px</td>
										<td rowspan="4">동일한 속성 값<br/>
										상, 우, 하, 좌의 속성 값이 동일하면 축약한다.</td>
									</tr>
									<tr>
										<td>margin:0 auto 0 auto</td>
										<td>margin:0 auto</td>
									</tr>
									<tr>
										<td>padding: 20px 30px 50px 30px</td>
										<td>padding:20px 30px 50px</td>
									</tr>
									<tr>
										<td>border-color:#ccc #eee #ccc #eee</td>
										<td>border-color:#ccc #eee</td>
									</tr>
									</tbody>
								</table>
							</li>
						</ol>
					</li>
					<li>약식 속성 사용 범위
						<p class="mgleft20">border 와 background 는 약식 송성을 우선적으로 사용하며, font 는 약식 속성을 사용하지 않는다.</p>
						<ol class="typeA list_step2 mgtop10">
							<li><span class="txtstrong">border</span>
								<ol class="typei list_step3">
									<li>속성 값 : border-width, border-style, border-color 순으로 선언한다.</li>
									<li>테두리 스타일 속성을 초기 선언할 때는 반드시 border 단일 속성을 사용하고, 이후 테두리의 부분적인 속성이 변경될 경우 border 관련 속성을 선언한다.</li>
									<li>작성 예
<pre class="mgtop5"><code data-language="css">.class{border:1px solid #ccc;}
.class_v1{border-color:#666;}
.class_v2{border-style:dotted;} 

.class2{border-top:1px solid #ccc;}
.class2_v1{border-top-color:#666;}
.class2_v2{border-top-style:dotted;}</code></pre>
									</li>
									<li>테두리의 상, 우, 하, 좌 스타일이 2개 이상 다르면, 공통 스타일을 약식으로 선언한 후 다른 부분은 관련 속성으로 선언한다.
<pre class="mgtop5"><code data-language="css">.class{border:1px solid #ddd;border-bottom:1px solid #eee;border-left:1px solid #eee;} (X)
.class{border:1px solid;border-color:#ddd #ddd #eee #eee;} (O)

.class2{border-top:1px solid #ddd;border-right:1px dotted #ddd;border-bottom:1px solid #eee;borderleft:1px dotted #eee;} (X)
.class2{border:1px;border-style:solid dotted;bordercolor:#ddd #ddd #eee #eee;} (O)</code></pre>
									</li>
								</ol>
							</li>
							<li><span class="txtstrong">background</span>
								<ol class="typei list_step3">
									<li>속성 값 : background-color, background-image, background-repeat, background-position, background-size, background-attachment, background-origin, 
									background-clip 순으로 선언한다.</li>
									<li>배경 스타일 속성을 초기 선언할 때는 반드시 background 단일 속성을 사용하며, 이후 배경의 부분적인 속성이 변경될 경우 background 관련 속성을 선언한다.</li>
									<li>작성 예
<pre class="mgtop5"><code data-language="css">.class{background:#ccc url('bg.gif') no-repeat;}
.class_v1{background-position:0 -50px;}
.class_v2{background-position:0 -100px;}</code></pre>
									</li>
								</ol>
							</li>
							<li><span class="txtstrong">font</span>
								<ol class="typei list_step3">
									<li>폰트 스타일은 약식 속성으로 서언하지 않는다.</li>
									<li>폰트 스타일을 약식 속성으로 선언하면 다음과 같은 문제가 발생한다.
<pre class="mgtop5"><code data-language="css">/* 아래와 같이 선언하면, font-weight:bold는 상속되지 않고 font 속성의 디폴트값인 font-weight:normal로 변경되기 때문에 불필요한 속성 값을 선언해야 하는 문제가 발생한다. */
.class{font-weight:bold;font-size:12px;font-family:dotum;}
.class p{font:15px gulim;}

/* 결국, class p의 폰트 스타일은 아래와 같아진다. */
.class p{font-family:gulim;font-style:normal;font-variant:normal;font-weight:normal;fontsize:15px;line-height:normal;}
</code></pre>
									</li>
									<li>한글 폰트 선언 : 한글 폰트만 선언할 경우 특정 브라우저에서 폰트를 올바르게 출력하지 못하는 경우가 있으므로 한글 폰트 선언 시 한글, 영문 폰트를 모두 선언한다.
<pre class="mgtop5"><code data-language="css">.class{font-family:'돋움';} (X)
.class{font-family:'돋움',dotum;} (O)
</code></pre>
									</li>
								</ol>
							</li>
						</ol>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="zindex"><i class="icon-chevron-right"></i> z-index 규칙</a></h3>
				<ol>
					<li>z-index 속성의 속성 값의 범위는 최소 10, 최고 1000이며, 10 단위로 증감한다. 단, 10단위 사이의 예외 변수가 발생하면 1단위 값을 지정할 수 있다.</li>
					<li>다음은 예시 가이드로, 각 서비스의 z-index 값은 상황에 맞게 선택적으로 선언한다.
						<img src="/images/img_zindex.png" alt="z-index 예시" class="mgleft20 mgtop5"/>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="declaration"><i class="icon-chevron-right"></i> CSS 선언 타입</a></h3>
				<p>CSS 선언 타입은 크게 세 가지로 분류하며, 용도에 맞게 사용한다.</p>
				<ol class="mgtop10">
					<li>External Type
						<ol class="typei list_step2">
							<li>CSS를 선언하는 가장 기본적인 방식으로, CSS 파일이 별도로 존재하는 형태이다. link 요소를 통해 HTML과 CSS 파일을 연결한다.</li>
							<li>작성 예
<pre class="mgtop5"><code data-language="html">&lt;link rel="stylesheet" type="text/css" href="../css/service_name.css" /></code></pre>
							</li>
						</ol>
					</li>
					<li>Internal Type
						<ol class="typei list_step2">
							<li>HTML 파일의 head 안에 스타일을 선언하는 방식으로, 단발성 페이지의 CSS 분량이 작을 경우 사용한다.</li>
							<li>작성 예
<pre class="mgtop5"><code data-language="html">&lt;head>
…
&lt;style type="text/css">
…
&lt;/style>
&lt;/head></code></pre>
							</li>
						</ol>
					</li>
					<li>Inline Type
						<ol class="typei list_step2">
							<li>HTML의 개별 요소에 style 속성을 이용하여 스타일을 선언하는 방식으로, 속성 값이 동적으로 변경되어야 하는 경우 사용한다.</li>
							<li>속성 값에 사용되는 %dhk rkxdms xmrtnrlghsms Charater entity references로 변환하지 않는다.</li>
							<li>작성 예
<pre class="mgtop5"><code data-language="html">&lt;div style="top:0;left:50%">
…
&lt;/div></code></pre>
							</li>
						</ol>
					</li>
				</ol>
				
				<h3 class="mgtop20"><a name="annotation"><i class="icon-chevron-right"></i> 주석</a></h3>
				<ol>
					<li>기본 형식
						<ol class="typei list_step2">
							<li>CSS 주석은 아래와 같이 표기하며, 기본 형식에 맞게 작성한다.
<pre class="mgtop5"><code data-language="css">/* 주석 내용 */</code></pre>
							</li>
							<li>주석 기호와 주석 내용 사이에는 반드시 공백 한 칸이 있어야 한다.</li>
							<li>주석 기호와 주석 내용 사이의 줄 바꿈은 허용하지 않는 다. 단, 주석 내용 간 줄바꿈은 허용한다.</li>
							<li>종료 주속은 사용하지 않는다.</li>
						</ol>
					</li>
					<li>작성자 정보 표기
						<ol class="typei list_step2">
							<li>작성자 표기는 CSS 인코딩 선언 다음 줄에 1회만 작성한다. </li>
							<li>작성자 정보에는 소속 부서, 영문 이름 이니셜, CSS 파일 생성날짜(YYMMDD 형식)를 작성하며, 유지보수만 담당하는 경우 모두 기입한다.</li>
							<li>작성자 정보 밑에는 빈 줄(한 줄)을 두어 스타일을 선언하는 문장과 구분되도록 한다. 
<pre class="mgtop5"><code data-language="css">@charset "utf-8";
/* CIT Service SM12 Team KJY 130705 */
빈 줄</code></pre>
							</li>
						</ol>
					</li>
					<li>의미있는 그룹 영역의 주석 표기
						<ol class="typei list_step2">
							<li>의미있는 객체를 구분하기 위한 주석은 영역의 윗부분에 표기한다.</li>
							<li>초기화와 레이아웃 스타일 그룹을 제외한 의미있는 그룹 영역의 주석 표기는 선택사항이다.</li>
							<li>작성 예
<pre class="mgtop5"><code data-language="css">/* 마이지식 SNB */
.my_snb{width:182px;}
.my_snb li .num{padding-left:4px;color:#919190;font-size:11px;letter-spacing:0;}
.my_snb li.on a,.my_snb li.on .num{color:#259e0b;}
.my_snb li a{color:#424242;}</code></pre>
							</li>
							<li>초기화 스타일 그룹 : CSS 초기 파일에 따라 초기화 속성은 /* Common */ 으로 그루핑한다.
<pre class="mgtop5"><code data-language="css">/* Common */
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin:0;padding:0;}
body,input,textarea,select,table{font-family:'돋움',Dotum,AppleGothic,sans-serif;fontsize:12px;}</code></pre>
							</li>
							<li>레이아웃 스타일 그룹 : 레이아웃을 위한 스타일 선언시 /* Layout */ 으로 그루핑한다.
<pre class="mgtop5"><code data-language="css">/* Layout */
#wrap{…}
#header{…}
#container{…}
#footer{…}</code></pre>
							</li>
						</ol>
					</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-07-03 강지영</li>
					<li>속성 규칙 추가 : 2013-07-04 강지영</li>
					<li>z-index 규칙 추가 : 2013-07-04 강지영</li>
					<li>CSS 선언 타입 추가 : 2013-07-05 강지영</li>
					<li>주석 추가 : 2013-07-05 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>