<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>코드 작성  규칙 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="html_write">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>코드 작성  규칙</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#basic">기본규칙</a></li>
						<li><a href="#global">전역 구조화 엘리먼트</a>
							<ol class="list_step2">
								<li><a href="#html">&lt;html&gt;</a></li>
								<li><a href="#head">&lt;head&gt;</a></li>
								<li><a href="#meta">&lt;meta&gt;</a></li>
								<li><a href="#title">&lt;title&gt;</a></li>
								<li><a href="#link">&lt;link&gt;</a></li>
								<li><a href="#script">&lt;script&gt;</a></li>
								<li><a href="#style">&lt;style&gt;</a></li>
							</ol>
						</li>
						<li><a href="#title">제목, 문단, 구분선 엘리먼트</a>
							<ol class="list_step2">
								<li><a href="#heading">Heading (&lt;h1&gt; ~ &lt;h2&gt;)</a></li>
								<li><a href="#p">p</a></li>
								<li><a href="#hr">hr</a></li>
							</ol>
						</li>
						<li><a href="#tableE">표 엘리먼트</a>
							<ol class="list_step2">
								<li><a href="#table">&lt;table&gt;</a></li>
								<li><a href="#caption">&lt;caption&gt;</a></li>
								<li><a href="#colgroup">&lt;colgroup&gt;</a></li>
								<li><a href="#col">&lt;col&gt;</a></li>
								<li><a href="#thead">&lt;thead&gt;</a></li>
								<li><a href="#tfoot">&lt;tfoot&gt;</a></li>
								<li><a href="#tbody">&lt;tbody&gt;</a></li>
								<li><a href="#tr">&lt;tr&gt;</a></li>
								<li><a href="#td">&lt;td&gt;</a></li>
								<li><a href="#th">&lt;th&gt;</a></li>
								<li><a href="#scope">td, th 공통 attribute</a></li>
							</ol>
						</li>
						<li><a href="#link">링크, 이미지, 이미지맵</a>
							<ol class="list_step2">
								<li><a href="#anchor">&lt;a&gt; (Anchor)</a></li>
								<li><a href="#img">&lt;img&gt;</a></li>
								<li><a href="#map">&lt;map&gt;</a></li>
								<li><a href="#area">&lt;area&gt;</a></li>
							</ol>
						</li>
						<li><a href="#formE">폼 엘리먼트</a>
							<ol class="list_step2">
								<li><a href="#form">&lt;form&gt;</a></li>
								<li><a href="#fieldset">&lt;fieldset&gt;, &lt;legend&gt;</a></li>
								<li><a href="#label">&lt;label&gt;</a></li>
								<li><a href="#input">&lt;input&gt;</a></li>
								<li><a href="#select">&lt;select&gt;</a></li>
								<li><a href="#option">&lt;option&gt;</a></li>
								<li><a href="#textarea">&lt;textarea&gt;</a></li>
								<li><a href="#button">&lt;button&gt;</a></li>
							</ol>
						</li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="basic"><i class="icon-chevron-right"></i> 기본규칙</a></h3>
				<ol>
					<li>특정 엘리먼트에 class, style을 선언할 때는 선언 순서를 준수한다. 다음과 같이 class와 style은 제일 뒷부분에 선언한다.
						<pre class="list_step2"><code data-language="html">&lt;input type="text" id="user-id" title="사용자 ID" class="input-text" style="width:100%"/></code></pre>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="global"><i class="icon-chevron-right"></i> 전역 구조화 엘리먼트</a></h3>
				<ol>
					<li><a name="html">&lt;html&gt;</a>
						<ol class="typei list_step2">
							<li>class Attribute 사용은 하지 않는다.</li>
							<li>XHTML DTD 선언시에는 다음과 같이 lang 애튜리뷰트를 선언한다.</li>
							<li>lang 애튜리뷰트는 User Agent가 언어르르 올바로 해석할 수 있게 도와주며, 검색과 음성 장치(Speech Synthesizers)에 활용된다.</li>
							<li>언어 코드는 모든 엘리먼드에 사용할 수 있지만 HTML 엘리먼트에 해당 문서의 주 언어 코드를 선언한다.</li>
							<li>개발팀에서 XML namespace를 정의하고자 할 때에는 아래와 같이 lang 애튜리뷰트 다음에 xmlns 애트립뷰터를 선언한다.</li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko"></code></pre>
					</li>
					<li><a name="head">&lt;head&gt;</a>
						<ol class="typei list_step2">
							<li>meta, title, link, script, style 순서로 엘리먼트를 선언한다.</li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;head>
  &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  &lt;meta http-equiv="Content-Script-Type" content="text/javascript"/>
  &lt;meta http-equiv="Content-Style-Type" content="text/css"/>
  &lt;title>브라우저 타이틀&lt;/title>
  &lt;link rel="stylesheet" type="text/css" href="/css/style.css"/>
  &lt;script type="text/javascript" src="/js/script.js">&lt;/script>
  &lt;style type="text/css">[stuff]&lt;/style>
&lt;/head>
</code></pre>
					</li>
					<li><a name="meta">&lt;meta&gt;</a>
						<ol class="typei list_step2">
							<li>문서의 기본 인코딩 및 뷰포트 등을 선언한다. (뷰포트는 모바일 서비스의 경우에만 선언)</li>
							<li>문서의 기본 인코딩, Viewport, 스크립트 형식, 스타일 형식 순서로 엘리먼트를 선언한다.</li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi"/>
&lt;meta http-equiv="Content-Script-Type" content="text/javascript"/>
&lt;meta http-equiv="Content-Style-Type" content="text/css"/>
</code></pre>
					</li>
					<li><a name="title">&lt;title&gt;</a>
						<ol class="typei list_step2">
							<li>현재 페이지의 제목을 선언한다.</li>
						</ol>
					</li>
					<li><a name="link">&lt;link&gt;</a>
						<ol class="typei list_step2">
							<li>rel, type, href 순서로 attribute를 선언한다</li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;link rel="stylesheet" type="text/css" href="style.css"></code></pre>
					</li>
					<li><a name="script">&lt;script&gt;</a>
						<ol class="typei list_step2">
							<li>type, src 순서로 애트리뷰트를 선언한다.</li>
							<li>script의 선언 위치는 head내에 선언하는 것을 원칙으로 하되, 성능상의 이슈 및 특별한 경우는 선언 위치를 변경한다. </li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;script type="text/javascript" src="script.js">&lt;/script>
&lt;script type="text/javascript">
  var d=document;
  ......
&lt;/script>
</code></pre>
					</li>
					<li><a name="style">&lt;style&gt;</a>
						<ol class="typei list_step2">
							<li>type attribute를 선언한다.</li>
							<li>하위에 선언이 되는 CSS는 &lt;style&gt; Element보다 1depth 들여쓴다. </li>
						</ol>
						<pre class="list_step2"><code data-language="html">&lt;style type="text/css">
  body{}
  ...
&lt;/style>
</code></pre>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="title"><i class="icon-chevron-right"></i> 제목, 문단, 구분선 엘리먼트</a></h3>
				<ol>
					<li><a  name="heading">Heading (&lt;h1&gt; ~ &lt;h2&gt;)</a>
						<ul class="list_step2">
							<li>의미 : HTML 구조상 문서 내부의 컨텐츠 제목을 정의한다.</li>
							<li>사용 : 각 부분별로 논리적인 규칙에 맞추어 Heading의 계층을 구성한다.</li>
						</ul>
					</li>
					<li><a  name="p">P</a>
						<ul class="list_step2">
							<li>의미 : 텍스트의 문단 요소로 사용한다.</li>
							<li>사용 : 의미상 문단을 구분하기 위한 용도로 사용하며, 시작 효과를 위해서나 문단으로써 의미가 없는 부분에 사용 하지 않는다.</li>
						</ul>
					</li>
					<li><a  name="hr">hr</a>
						<ul class="list_step2">
							<li>의미 : 문서 내에 구분선을 표시한다.</li>
							<li>사용 : 의미상으로 컨텐츠간의 경계를 표시할때 사용한다.</li>
						</ul>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="tableE"><i class="icon-chevron-right"></i> 표 엘리먼트</a></h3>
				<div>표는 다음과 같이 작성한다.
					<pre class="mgtop5"><code data-language="html">&lt;table cellspacing="0" cellpadding="0" summary="날짜별로 부산국제영화제 롯데시네마 센텀시티점에서 상영하는 영화의 제목과 상영시간, 예매 링크를 안내합니다">
  &lt;caption>롯데시네마 센텀시티점 BIFF 상영시간표&lt;/caption>
  &lt;colgroup>
  &lt;col width="113" />
  &lt;col width="232" />
  &lt;col width="261" />
  &lt;col width="63" />
 &lt;/colgroup>
  &lt;thead>
  &lt;tr>
    &lt;th scope="col">날짜&lt;/th>
    &lt;th scope="col">영화명&lt;/th>
    &lt;th scope="col">상영시간&lt;/th>
    &lt;th scope="col">예매&lt;/th>
  &lt;/tr>
  &lt;/thead>
  &lt;tbody>
  &lt;tr>
    &lt;th scope="row" rowspan="1">10월6일&lt;/th>
    &lt;td>15세 이상 관람가 오직 그대만&lt;/td>
    &lt;td>20:00&lt;/td>
    &lt;td>예매&lt;/td>
  &lt;/tr>
  &lt;/tbody>
&lt;/table>
</code></pre>
				</div>
				<ol>
					<li><a  name="table">&lt;table&gt;</a>
						<ul class="list_step2">
							<li>특이한 경우가 아니라면 레이아웃을 표현하기 위해 사용하지 않는다.</li>
							<li>cellspacing, cellpadding, summary 순서로 attribute를 선언한다.</li>
							<li>summary는 표의 내용을 요약하여 표기하되, th에 들어가있는 내용들을 전부 포함하여야 한다.</li>
						</ul>
					</li>
					<li><a  name="caption">&lt;caption&gt;</a>
						<ul class="list_step2">
							<li>표의 제목을 표현한다.</li>
						</ul>
					</li>
					<li><a  name="colgroup">&lt;colgroup&gt;</a>
						<ul class="list_step2">
							<li>td엘리먼트들을 열로 묶어 제어할 때 선언한다.</li>
						</ul>
					</li>
					<li><a  name="col">&lt;col&gt;</a>
						<ul class="list_step2">
							<li>테이블의 각 열의 너비 지정을 위해 선언한다.</li>
						</ul>
					</li>
					<li><a  name="thead">&lt;thead&gt;</a>
						<ul class="list_step2">
							<li>항목의 제목을 묶을때 사용한다.</li>
							<li>thead 자식 element는 th만 와야하며, td가 포함이 되는 경우에는 thead로 묶지 않는다.</li>
						</ul>
					</li>
					<li><a  name="tfoot">&lt;tfoot&gt;</a>
						<ul class="list_step2">
							<li>테이블의 하단을 묶을때 사용한다.</li>
							<li>thead와 tbody 사이에 위치하여야 하며, 필수항목은 아니다.</li>
							<li>※ 테이블을 인쇄할 때 테이블이 여러 페이지에 걸친 경우, 모든 페이지에 thead와 tfoot이 반복해서 출력된다.</li>
						</ul>
					</li>
					<li><a  name="tbody">&lt;tbody&gt;</a>
						<ul class="list_step2">
							<li>테이블의 본문을 묶을때 사용한다.</li>
						</ul>
					</li>
					<li><a  name="tr">&lt;tr&gt;</a>
						<ul class="list_step2">
							<li>각 테이블의 행을 표시한다. 자식 element로는 th 또는 td만이 위치할 수 있다.</li>
						</ul>
					</li>
					<li><a  name="td">&lt;td&gt;</a>
						<ul class="list_step2">
							<li>각 테이블의 셀 하나하나를 표시한다.</li>
						</ul>
					</li>
					<li><a  name="th">&lt;th&gt;</a>
						<ul class="list_step2">
							<li>테이블의 제목 셀을 표시한다 scope attribute로 현재의 셀이 어느 셀의 제목인지 범위를 명시해준다.</li>
						</ul>
					</li>
					<li><a  name="scope">td, th 공통 attribute</a>
						<ul class="list_step2">
							<li>rowspan : 수직 방향으로 셀을 결합한다.</li>
							<li>colspan : 수평방향으로 셀을 결합한다.</li>
						</ul>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="link"><i class="icon-chevron-right"></i> 링크, 이미지, 이미지맵</a></h3>
				<ol>
					<li><a  name="anchor">&lt;a&gt; (Anchor)</a>
						<ul class="list_step2">
							<li>의미 : 텍스트 및 이미지에 하이퍼텍스트를 설정한다.</li>
							<li>사용 : 인라인 요소로, 인라인요소와 텍스트를 포함 할 수 있다.</li>
							<li>속성
								<ol class="typei list_step3">
									<li>href : 하이퍼링크 주소 지정</li>
									<li>id, name : 앵커 식별자 지정</li>
									<li>title : 하이퍼링크의 보충 정보를 표시. 대다수의 브라우저에서 툴팁으로 표시된다.</li>
									<li>target : 하이퍼링크가 열릴 대상을 지정한다. _blank/_liarent/_self/_toli/각 프레임의 name.</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a  name="img">&lt;img&gt;</a>
						<ul class="list_step2">
							<li>의미 : 이미지를 삽입한다.</li>
							<li>사용 : 인라인 요소이며, 빈 요소로 종료태그가 없는 요소이다.</li>
							<li>속성
								<ol class="typei list_step3">
									<li>src : 삽입할 이미지의 파일명 혹은 url을 지정한다.</li>
									<li>alt(Alternative Text) : 이미지의 대체텍스트를 지정한다. IE에서는 툴팁으로 표시가 된다.</li>
									<li>width, height : 이미지의 가로/세로 크기를 지정한다.</li>
									<li>페이지 렌더링시 width, height 속성의 값만큼 영역을 확보하고 그 이외의 부분에 다른 부분을 표시함으로 이미지가 없어서 발생할 수있는 레아아웃 상의 어긋남을 사전에 방지하는 효과를 줄 수 있다.</li>
									<li>border : 이미지 테두리의 두께를 설정한다. 의미가 없는 표현만을 위한 속성이므로 CSS로 컨트롤 하는 것을 권장한다.</li>
									<li>longdesc : 이미지에 대한 자세한 설명이 있는 페이지의 경로를 지정한다. alt 속성을 보완하는 용도로 사용한다.</li>
									<li>align, hspace, vspace : 수평/수직 위치 및 상하/좌우 여백을 지정한다. 의미가 없는 표현만을 위한 속성이므로 CSS로 컨트롤 하는 것을 권장한다.</li>
									<li>usemap : 이미지맵의 name속성과 매칭시켜 이미지맵을 사용하게한다.</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a  name="map">&lt;map&gt;</a>
						<ul class="list_step2">
							<li>의미 : 블록요소로 이미지맵을 정의한다.</li>
							<li>주요 속성 : name, id속성. img요소의 usemap 속성값과 name속성의 값을 매칭시켜 연관시킴</li>
						</ul>
						<div class="list_step2 info_box">
							<span class="txtstrong">이미지 맵이란?</span><br/>
							이미지의 일부 영역에 링크를 두어 사용자에게 해당 정보를 제공할 수 있는 페이지로 이동하도록 만드는 기법
						</div>
					</li>
					<li><a  name="area">&lt;area&gt;</a>
						<ul class="list_step2">
							<li>의미 : 이미지맵의 영역을 지정한다.</li>
							<li>사용 : 빈 요소로 종료태그가 없다.</li>
							<li>속성
								<ol class="typei list_step3">
									<li>href : URL을 지정한다.</li>
									<li>alt : 이미지의 alt속성처럼 해당 하이퍼텍스트에 대한 대체 텍스트를 지정한다.</li>
									<li>shape : 영역의 형태를 지정 (default / rect / circle / poly)</li>
									<li>coords : 영역의 좌표 (이미지의 좌측 상단을 원점 0,0 으로 기준)를 쉼표로 구분하여 지정한다. shape속성값에 따라 지정방법이 조금씩 다르다.
										<ul class="list_step2">
											<li>rect : 사각형의 완쪽 상단 점 x,y좌표, 오른쪽 하단 점 x,y좌표</li>
											<li>circle : 원 중심의 x,y좌표, 원의 반지름</li>
											<li>poly : 첫번째 각의 x,y좌표, 두번째각의 x,y좌표...</li>
										</ul>
									</li>
								</ol>
								<pre><code data-language="html">&lt;img src="planets.gif" width="145" height="126" alt="Planets" usemap="#planetmap"/>

&lt;map name="planetmap">
  &lt;area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun"/>
  &lt;area shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury"/>
  &lt;area shape="poly" coords="10, 10, 124, 35,53, 88" href="venus.htm" alt="Venus"/>
&lt;/map>
</code></pre>
							</li>
						</ul>
					</li>
				</ol>
				<h3 class="mgtop20"><a name="formE"><i class="icon-chevron-right"></i> 폼 엘리먼트</a></h3>
				<div>일반적인 폼의 경우 아래와 같이 작성을 한다.
				<pre><code data-language="html">&lt;form action="#">
  &lt;fieldset>
    &lt;legend>검색&lt;/legend>
    &lt;label for="tfSearch">키워드 입력&lt;/label>
    &lt;input type="text" id="tfSearch" name="tfSearch" alt="검색어 입력창"/>
    &lt;input type="submit" value="검색"/>
  &lt;/fieldset>
&lt;/form>
</code></pre>
				</div>
				<ol>
					<li><a  name="form">&lt;form&gt;</a>
						<ul class="list_step2">
							<li>의미 : 폼의 최상위 요소로 폼을 구성한다.</li>
							<li>속성
								<ol class="typei list_step3">
									<li>action : 폼을 전송할 URL 지정, 서버 사이드 폼 핸들러이나 필수 선언 애튜리뷰트이기 때문에 반드시 선언한다.</li>
									<li>method : 폼의 데이터를 전송하는 방법
										<ul class="list_step2">
											<li>get : 간단한 데이터 전송시 사용하며, url에 파라미터 값을 붙여 전송한다. 데이터가 URL에 그대로 노출되어 보안유지가 안된다</li>
											<li>post : http헤더에 포함되어 서버로 전송이 되며, 일정크기 이상의 데이터 전송시 사용한다. 데이터가 URL에 노출되는 get 방식에 비해서 보안유지에 그나마 유리하다</li>
										</ul>
									</li>
									<li>css 로 디자인을 컨트롤하지 않는다.</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="fieldset">&lt;fieldset&gt;, &lt;legend&gt;</a>
						<ul class="list_step2">
							<li>의미 : 여러 폼 컨트롤을 폼 안에서 그룹화 하는 요소.</li>
							<li>주요 속성
								<ol class="typei list_step3">
									<li>fieldset 요소로 그룹화 하는 범위를 정의한 후 legend 요소로 그룹화한 범위의 제목을 표시</li>
									<li>legend요소는 fieldset 요소의 바로 뒤에 한번만 사용 가능하다.</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="label">&lt;label&gt;</a>
						<ul class="list_step2">
							<li>의미 : 폼 컨트롤에 레이블을 정의하는 요소.</li>
							<li>사용
								<ol class="typei list_step3">
									<li>label요소에 특정 텍스트를 레이블로 정의 함으로써 컨트롤과 관련시킬 수 있으며 동기화가 가능하다 (레이블과 체크박스 중 어느쪽을 선택해도 체크박스가 선택됨)</li>
									<li>명시적 레이블 부여
										<ul class="list_step2">
											<li>label 요소의 for 속성에 해당 컨트롤의 id속성과 같은 값을 지정</li>
											<li>하나의 컨트롤에 복수의 레이블을 지정 가능하다.</li>
											<li>label 요소와 컨트롤은 인접 할 필요가 없다 .
											<pre class="mgtop5"><code data-language="html">&lt;label for="male">남자&lt;/label> &lt;input type="radio" name="sex" id="male" value="m"/>
&lt;label for="female">여자&lt;/label> &lt;input type="radio" name="sex" id="female" value="f"/>
</code></pre>
											</li>
										</ul>
									</li>
									<li>암묵적 레이블 부여
										<ul class="list_step2">
											<li>label 요소의 범위에 텍스트와 컨트롤을 포함하는 방법</li>
											<li>하나의 컨트롤에 복수의 레이블 지정이 불가능하다.</li>
											<li>텍스트와 컨트롤은 반트시 label요소에 포함되어야 한다  .
											<pre class="mgtop5"><code data-language="html">&lt;label>남자 &lt;input type="radio" name="sex" id="male" value="m"/>&lt;/label>
&lt;label>여자 &lt;input type="radio" name="sex" id="female" value="f"/>&lt;/label>
</code></pre>
											</li>
										</ul>
									</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="input">&lt;input&gt;</a>
						<ul class="list_step2">
							<li>의미 : 인라인 요소이며 빈요소로, 폼 안에 기본적인 컨트롤을 생성한다.</li>
							<li>type 속성
								<ol class="typei list_step3">
									<li>text : 일반 텍스트 입력필드</li>
									<li>password : 비밀번호 입력필드, 대부분의 브라우저에서 입력한 텍스트를 "*" 등으로 감추어(masking) 표시한다</li>
									<li>checkbox : 복수 선택 가능한 체크박스</li>
									<li>radio : 한개만 선택 가능한 라디오버튼</li>
									<li>submit : 폼 송신 버튼</li>
									<li>reset : 폼 리셋 버튼 (입력 내용 전부를 초기화함)</li>
									<li>button : 범용 버튼</li>
									<li>image : 송신 이미지버튼 (src 속성과 alt 속성을 지정해야함)</li>
									<li>file : 송신파일 선택 필드</li>
									<li>hidden : 숨겨진 필드 (화면에는 표시되지 않으나, 서버로 전송할 데이터를 지정)</li>
								</ol>
							</li>
							<li>속성
								<ol class="typei list_step3">
									<li>name : 해당 컨트롤의 이름 (서버에서 처리할 데이터의 컨트롤에는 name 속성이 반드시 필요)</li>
									<li>value : 해당 컨트롤의 값</li>
									<li>size : text, password 컨트롤의 가로크기 (미 지정시 컨트롤의 폭은 브라우저에 따라 달라짐)</li>
									<li>maxlength : text, password 컨트롤의 최대 입력 문자수를 지정</li>
									<li>checked : 체크박스, 라디오버튼의 초기 선택 상태를 지정</li>
									<li>disabled : 해당 컨트롤을 포커스, 선택, 변경 등의 조작이 불가능하게 하고 데이터를 서버로 전송하지 않게함</li>
									<li>readonly : 컨트롤의 내용을 변경되지 않게 하지만 데이터는 전송한다.</li>
								</ol>
							</li>
							<li>예시
								<pre class="mgtop5"><code data-language="html">&lt;input type="submit" name="submit1" value="전송하기"/>
&lt;input type="password" name="password1" size="10" maxlength="10"/>
&lt;input type="radio" name="radio1" value="radio_value1" checked="checked"/>
</code></pre>
							</li>
						</ul>
					</li>
					<li><a name="select">&lt;select&gt;</a>
						<ul class="list_step2">
							<li>의미 : 셀렉트 메뉴 전체를 정의하는 요소</li>
							<li>주요 속성
								<ol class="typei list_step3">
									<li>name : 셀렉트메뉴의 이름 지정</li>
									<li>size : 표시 줄 수 지정을 하고 목록을 박스로 표시. 지정된 size를 넘는 항목의 선택을 위해 스크롤바가 자동으로 표시됨.</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="option">&lt;option&gt;</a>
						<ul class="list_step2">
							<li>의미 : 셀렉트메뉴의 항목을 정의하는 요소. select요소에는 한 개 이상의 option요소가 포함되어야한다.</li>
							<li>주요 속성
								<ol class="typei list_step3">
									<li>selected : 해당 항목이 선택된 상태 (선택된 option요소가 없을 경우 첫번째 option요소가 기본으로 선택)</li>
									<li>value : 선택된 항목의 값</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="textarea">&lt;textarea&gt;</a>
						<ul class="list_step2">
							<li>의미 : 여러 줄로 된 텍스트 필드를 생성하는 인라인 요소.</li>
							<li>속성
								<ol class="typei list_step3">
									<li>name, disabled, readonly : input 요소의 속성 설명과 동일</li>
									<li>rows : 표시 줄수를 지정 (입력 가능한 줄이 아닌, 브라우저에서 보여지는 줄의 수)</li>
									<li>cols : 표시 폭을 문자수로 지정</li>
								</ol>
							</li>
						</ul>
					</li>
					<li><a name="button">&lt;button&gt;</a>
						<ul class="list_step2">
							<li>의미 : 버튼을 생성하는 인라인요소. 기능적으로는 input요소로 생성하는 버튼과 같지만, 이미지나 텍스트 등을 포함 할 수 있어 유연한 디자인이 가능함.</li>
							<li>속성 : type (기본값이 브라우저에 따라 다를 수 있어, type을 기입해준다)
								<ol class="typei list_step3">
									<li>submit : 송신버튼</li>
									<li>reset : 리셋버튼</li>
									<li>button : 범용버튼</li>
								</ol>
							</li>
							<li>예시
								<pre class="mgtop5"><code data-language="html">&lt;button type="button">이미지 혹은 텍스트&lt;/button>
</code></pre>
							</li>
						</ul>
					</li>
				</ol>
				<hr/>
				<h3><i class="icon-time"></i> 변경이력</h3>
				<ol>
					<li>최초 제정 : 2013-06-17 강지영</li>
				</ol>
			</div>
		</div>
		<!--#include file="/inc/html/footer.aspx"-->
	</div>
</body>
</html>