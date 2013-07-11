<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CSS 폰트 단위 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" media="all" href="/inc/css/theme.css"/>
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
	<script type="text/javascript" charset="utf-8" src="/inc/js/rainbow-custom.min.js"></script>
</head>
<body id="css_font">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>CSS 폰트 단위</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					일반적으로 많은 사람들이 em 단위를 쓰면 해상도에 따라서 크기가 달라진다고 오해하는 경우가 많습니다.<br/>
					하지만 em 을 쓰는 이유는 IE6과 같이 zoom 기능을 제공하지 않는 부라우저에서 브라우저의 글꼴 크기 옵션을 조절했을 때 동작하게 하기 위함이다. 최근의 브라우저들이 모두 zoom 기능을
					지원하고 있는 덕분에 사실 em 대신 px 를 사용해도 무방하다. 더 이상 em 단위를 사용함으로서 취할 수 있는 이득이 거의 없기 때문이다. <br/>
					하지만 Responsive Web Design을 추구하는 작업을 하거나, 화면 크기에 따라서 동적으로 body의 font-size를 조절하는 특수한 작업을 하실 경우에는 em을 활용하여 scaleable한 UI를
					구성할 수도 있다. 또한 해외 웹사이트의 대부분은 em을 사용하거나 유동성 부분 때문에 em이 표준으로 자리잡아가고 있다. <br/><br/>
					<h3>권장단위</h3>
					상대적인 단위인 em을 사용시 보다 유동적인 환경으로 접근성을 구현할 수 있지만, 브라우저 간의 디자인 요소(간격의 오차)를 고려하는 경우에는 제약이 많다. 이에 다른 단위보다는 PC에서는
					브라우저 호환성을 위해 px 단위의 사용을 권장한다. <br/>
					단, 모바일과 같이 유동적인 레이아웃을 구현하기 위해서는 상대단위(em, %)를 권장하고 있다.
				</div>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 단위별 폰트의 특징</h3>
				<ol>
					<li>Pixels (px) : 화면 해상도에 대한 상대크기
						<p class="mgleft20">화면 스크린의 화소를 단위로 하는 방식이다. 그런데 이 방식은 각 화면의 해상도, 특히 ppi에 따라서 크기가 달라지는 문제가 있기 때문에 문제가 있다.</p>
					</li>
					<li>EMs (em) : 지정되거나 상속받은 (또는 상위 엘리먼트)에 대한 백분율 상대 크기
						<p class="mgleft20">브라우저의 표준서체 크기를 1em으로 정의하고, 이 크기에 상대적으로 지정하는 방식이다. 그러므로, 이용자가 브라우저의 환경설정에서 표준 서체의 크기를 
						변경하면 서체 크기가 이에 따라서 가변적으로 변경된다.</p>
					</li>
					<li>Percent (%) : 지정되거나 상속받은 (또는 상위 엘리먼트)에 대한 백분율 상대 크기
						<p class="mgleft20">em과 동일하지만, 표준 서체의 크기를 100%로 지정하는 것이 다르다.</p>
					</li>
					<li>Point (pt) : 1포인트는 0.72인치
						<p class="mgleft20">전통적인 서체의 크기 단위이다. 1인치가 72pt이고, 통상의 PC 화면 해상도가 96dpi 이므로 12pt이면 16px에 해당한다. 우리가 가장 많이 사용하는 대부분의 
						브라우저(IE, Chrome, Firefox 등)의 표준 서체 크기가 16px이다. 문제는 브라우저의 환경설정에서 표준 서체의 크기를 변경가능하게 해 놓았다는 것이다. 이용자의 필요에 따라 서체를 
						보다 크게 또는 작게 보고자 변경했을 때, 만약 사이트의 서체가 pt(point)를 기준으로 작성되었다면, 이 사이트는 이용자의 서체 크기 변경에도 불구하고 서체가 고정되는 문제가 있는 
						것이다.</p>
					</li>
				</ol>
				<h3 class="mgtop20"><i class="icon-chevron-right"></i> 편리한 작업을 위한 CSS 단위별 폰트 크기</h3>
				<table cellspacing="0" cellpadding="0">
					<caption>표2-4-1 단위별 폰트 크기</caption>
					<colgroup>
					<col width="25%" />
					<col width="25%" />
					<col width="25%" />
					<col width="25%" />
					</colgroup>
					<thead>
					<tr>
						<th scope="col">Pixels (px)</th>
						<th scope="col">EMs (em)</th>
						<th scope="col">Percent (%)</th>
						<th scope="col">Point (pt)</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td class="txtcenter">6px</td>
						<td class="txtcenter">0.375em</td>
						<td class="txtcenter">37.5%</td>
						<td class="txtcenter">5pt</td>
					</tr>
					<tr>
						<td class="txtcenter">7px</td>
						<td class="txtcenter">0.438em</td>
						<td class="txtcenter">43.8%</td>
						<td class="txtcenter">5pt</td>
					</tr>
					<tr>
						<td class="txtcenter">8px</td>
						<td class="txtcenter">0.5em</td>
						<td class="txtcenter">50%</td>
						<td class="txtcenter">6pt</td>
					</tr>
					<tr>
						<td class="txtcenter">9px</td>
						<td class="txtcenter">0.563em</td>
						<td class="txtcenter">56.3%</td>
						<td class="txtcenter">7pt</td>
					</tr>
					<tr>
						<td class="txtcenter">10px</td>
						<td class="txtcenter">0.625em</td>
						<td class="txtcenter">62.5%</td>
						<td class="txtcenter">8pt</td>
					</tr>
					<tr>
						<td class="txtcenter">11px</td>
						<td class="txtcenter">0.688em</td>
						<td class="txtcenter">68.8%</td>
						<td class="txtcenter">8pt</td>
					</tr>
					<tr>
						<td class="txtcenter">12px</td>
						<td class="txtcenter">0.75em</td>
						<td class="txtcenter">75%</td>
						<td class="txtcenter">9pt</td>
					</tr>
					<tr>
						<td class="txtcenter">13px</td>
						<td class="txtcenter">0.813em</td>
						<td class="txtcenter">81.3%</td>
						<td class="txtcenter">10pt</td>
					</tr>
					<tr>
						<td class="txtcenter">14px</td>
						<td class="txtcenter">0.875em</td>
						<td class="txtcenter">87.5%</td>
						<td class="txtcenter">11pt</td>
					</tr>
					<tr>
						<td class="txtcenter">15px</td>
						<td class="txtcenter">0.938em</td>
						<td class="txtcenter">93.8%</td>
						<td class="txtcenter">11pt</td>
					</tr>
					<tr>
						<td class="txtcenter">16px</td>
						<td class="txtcenter">1em</td>
						<td class="txtcenter">100%</td>
						<td class="txtcenter">12pt</td>
					</tr>
					<tr>
						<td class="txtcenter">17px</td>
						<td class="txtcenter">1.063em</td>
						<td class="txtcenter">106.3%</td>
						<td class="txtcenter">13pt</td>
					</tr>
					<tr>
						<td class="txtcenter">18px</td>
						<td class="txtcenter">1.125em</td>
						<td class="txtcenter">112.5%</td>
						<td class="txtcenter">14pt</td>
					</tr>
					<tr>
						<td class="txtcenter">19px</td>
						<td class="txtcenter">1.188em</td>
						<td class="txtcenter">118.8%</td>
						<td class="txtcenter">14pt</td>
					</tr>
					<tr>
						<td class="txtcenter">20px</td>
						<td class="txtcenter">1.25em</td>
						<td class="txtcenter">125%</td>
						<td class="txtcenter">15pt</td>
					</tr>
					<tr>
						<td class="txtcenter">21px</td>
						<td class="txtcenter">1.313em</td>
						<td class="txtcenter">131.3%</td>
						<td class="txtcenter">16pt</td>
					</tr>
					<tr>
						<td class="txtcenter">22px</td>
						<td class="txtcenter">1.375em</td>
						<td class="txtcenter">137.5%</td>
						<td class="txtcenter">17pt</td>
					</tr>
					<tr>
						<td class="txtcenter">23px</td>
						<td class="txtcenter">1.438em</td>
						<td class="txtcenter">143.8%</td>
						<td class="txtcenter">17pt</td>
					</tr>
					<tr>
						<td class="txtcenter">24px</td>
						<td class="txtcenter">1.5em</td>
						<td class="txtcenter">150%</td>
						<td class="txtcenter">18pt</td>
					</tr>
					<tr>
						<td class="txtcenter">26px</td>
						<td class="txtcenter">1.6em</td>
						<td class="txtcenter">160%</td>
						<td class="txtcenter">20pt</td>
					</tr>
					<tr>
						<td class="txtcenter">29px</td>
						<td class="txtcenter">1.8em</td>
						<td class="txtcenter">180%</td>
						<td class="txtcenter">22pt</td>
					</tr>
					<tr>
						<td class="txtcenter">32px</td>
						<td class="txtcenter">2em</td>
						<td class="txtcenter">200%</td>
						<td class="txtcenter">24pt</td>
					</tr>
					<tr>
						<td class="txtcenter">35px</td>
						<td class="txtcenter">2.2em</td>
						<td class="txtcenter">220%</td>
						<td class="txtcenter">26pt</td>
					</tr>
					<tr>
						<td class="txtcenter">36px</td>
						<td class="txtcenter">2.25em</td>
						<td class="txtcenter">225%</td>
						<td class="txtcenter">27pt</td>
					</tr>
					<tr>
						<td class="txtcenter">37px</td>
						<td class="txtcenter">2.3em</td>
						<td class="txtcenter">230%</td>
						<td class="txtcenter">28pt</td>
					</tr>
					<tr>
						<td class="txtcenter">38px</td>
						<td class="txtcenter">2.35em</td>
						<td class="txtcenter">235%</td>
						<td class="txtcenter">29pt</td>
					</tr>
					<tr>
						<td class="txtcenter">40px</td>
						<td class="txtcenter">2.45em</td>
						<td class="txtcenter">245%</td>
						<td class="txtcenter">30pt</td>
					</tr>
					<tr>
						<td class="txtcenter">42px</td>
						<td class="txtcenter">2.55em</td>
						<td class="txtcenter">255%</td>
						<td class="txtcenter">32pt</td>
					</tr>
					<tr>
						<td class="txtcenter">45px</td>
						<td class="txtcenter">2.75em</td>
						<td class="txtcenter">275%</td>
						<td class="txtcenter">34pt</td>
					</tr>
					<tr>
						<td class="txtcenter">48px</td>
						<td class="txtcenter">3em</td>
						<td class="txtcenter">300%</td>
						<td class="txtcenter">36pt</td>
					</tr>
					</tbody>
				</table>
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