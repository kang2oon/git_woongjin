<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>DTD 및 인코딩 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="html_dtd">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>DTD 및 인코딩</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#about_dtd">DTD란?</a></li>
						<li><a href="#dtd_rule">DTD 기본 형식</a></li>
						<li><a href="#dtd_kind">DTD 종류</a></li>
						<li><a href="#default_dtd">기본 DTD</a></li>
						<li><a href="#encording">인코딩 선언</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="about_dtd"><i class="icon-chevron-right"></i> DTD란?</a></h3>
				<ul>
					<li>브라우저에게 웹페이지의 문서종류를 알려주는 선언문으로, 해당 문서의 최상단에 선언한다.</li>
					<li>DTD는 브라우저가 올바른 화면표시(Rendering)를 하기 위해 반드시 필요하다.</li>
					<li>DTD를 사용하면 브라우저들의 렌더링을 표준에 맞춰 렌더링을 하게끔 하기 때문에 다양한 환경에서 상호 운용성을 보장할 수 있다.</li>
				</ul>
				<h3 class="mgtop20"><a name="dtd_rule"><i class="icon-chevron-right"></i> DTD 기본 형식</a></h3>
<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></code></pre>
				<ul>
					<li><span class="txtstrong">&lt;!DOCTYPE</span><br/>
					<span class="list_step3">일반적으로 html이나 xhtml으로, 최상위 엘리먼트는 html이므로 html로 작성</span>
					</li>
					<li><span class="txtstrong">PUBLIC</span><br/>
					<span class="list_step3">PUBLIC 또는 SYSTEM 을 설정, PUBLIC(국제적 공용문서) / SYSTEM(내부적, 제한적 문서)</span>
					</li>
					<li><span class="txtstrong">"-//W3C//DTD XHTML 1.0 Transitional//EN"</span><br/>
					<span class="list_step3">비공인 인증인 W3C기관에 의해 XHTML1.0을 transitional 방식의 영어 공용어를 출력하며</span>
					</li>
					<li><span class="txtstrong">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></span><br/>
					<span class="list_step3">참조할 DTD문서는 <a href="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" target="_blank">http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd</a> <i class="icon-external-link"></i> 이다.</span>
					</li>
					<li><span class="txtstrong">Strict</span><br/>
					<span class="list_step3">선언된 (x)HTML 버전의 문법과 구조를 정확하게 사용한다. 지원하지 않는 엘리먼트를 사용해서는 안된다.</span>
					</li>
					<li><span class="txtstrong">Transitional</span><br/>
					<span class="list_step3">과도기적으로 사용하기 위한 선언으로, strict보다 유연하다. 선언된 버전 이외의 문법과 구조를 허용한다.</span>
					</li>
					<li><span class="txtstrong">Frameset</span><br/>
					<p class="list_step3">Transitional 속성과 더불어, frameset(iframe, frame)을 지원한다.<br/>
					※ frameset은 문서의 구조에 관한 엘리먼트이기 떄문에, transitional에서 frameset을 사용해도 화면표시가 일어난다.<br/>&nbsp;&nbsp;&nbsp;&nbsp;따라서, 사실상 frameset은 transitional과 동일하게 취급된다.</p>
					</li>
				</ul>
				<h3 class="mgtop20"><a name="dtd_kind"><i class="icon-chevron-right"></i> DTD 종류</a></h3>
				<ul>
					<li>XHTML
						<ul class="list_step2">
							<li>엄격(Strict) DTD
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"></code></pre>
							</li>
							<li>변이(Transitional) DTD <span class="txtstrong txtimportant">// 권장</span>
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></code></pre>
							</li>
							<li>프레임셋(Frameset) DTD
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"></code></pre>
							</li>
						</ul>
					</li>
					<li>HTML5
						<pre class="list_step2 mgtop5"><code data-language="html">&lt;!DOCTYPE html></code></pre>
					</li>
					<li>HTML
						<ul class="list_step2">
							<li>엄격(Strict) DTD
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"></code></pre>
							</li>
							<li>변이(Transitional) DTD
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"></code></pre>
							</li>
							<li>프레임셋(Frameset) DTD
								<pre class="mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd"></code></pre>
							</li>
						</ul>
					</li>
				</ul>
				<h3 class="mgtop20"><a name="default_dtd"><i class="icon-chevron-right"></i> 기본 DTD</a></h3>
				<ul>
					<li>HTML 문서는 반드시 DTD를 선언한다.</li>
					<li>신규 HTML 문서를 작성할 때 기본 DTD는 'XHTML 1.0 Transitional'을 사용한다.
						<pre class="list_step3 mgtop5"><code data-language="html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></code></pre>
					</li>
					<li>XHTML 1.0 Transitional DTD 는 다음과 같은 이유로 사용한다.
						<ol class="list_step2">
							<li>XHTML 문서는 하나의 XML 문서로서 문법적으로 정확해야 하기 때문에, HTML과 달리 표준 XML 라이브러리를 이용한 자동화된 처리가 가능하다.</li>
							<li>최근의 웹 브라우저들은 XHTML을 정확하게 표현해 주며, XHTML이 거의 HTML에 포함되기 때문에 구형의 브라우저에서도 별 문제가 없다. </li>
						</ol>
					</li>
					<li>아래와 같은 경우 DTD 설정별 표준 문법으로 마크업 하더라도 브라우저에서 Quirks Mode로 인식하여 바르게 해석되지 않으므로 주의한다.
						<ol class="list_step2">
							<li>DTD가 선언되지 않은 경우(html 태그 문서로 시작)</li>
							<li>선언한 DTD 앞에 다른 문자가 오는 경우
								<pre class="mgtop5"><code data-language="html">&lt;!-- //html 문서 시작 -->&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"></code></pre>
							</li>
						</ol>
					</li>
				</ul>
				<h3 class="mgtop20"><a name="encording"><i class="icon-chevron-right"></i> 인코딩 선언</a></h3>
				<ul>
					<li>HTML 문서는 반드시 인코딩 정보를 선언한다,</li>
					<li>인코딩 설정은 DB의 인코딩 방식과도 관련이 있으므로 반드시 담당 개발자와 협의하여 정해야 한다.</li>
					<li>신규 HTML 문서를 작성할 때 기본 인코딩은 utf-8 을 원칙으로 한다.
						<div class="list_step2">utf-8은 다국어 지원이 가능하며, euc-kr 보다 표현 가능한 한글(고어, 음절 등)이 더 많다.
							<pre class="mgtop5"><code data-language="html">&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></code></pre>
							<span class="txtimportant">※ 파일 저장시 반드시 설정한 인코딩으로 저장한다.</span>
						</div>
					</li>
				</ul>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-06-14 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>