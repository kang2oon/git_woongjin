<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 웹 스타일 가이드" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>Markup 개요 - 웅진그룹 웹 스타일 가이드</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type="text/javascript" charset="utf-8" src="/inc/js/common.js"></script>
</head>
<body id="html_summary">
	<!--#include file="/inc/html/skip.aspx"-->
	<div id="wrap">
		<!--#include file="/inc/html/header.aspx"-->
		<div class="clearfix">
			<div id="snb"><!--#include file="snb.aspx"--></div>
			<div id="content">
				<h2>Markup 개요</h2>
				<div id="shortcut_on" class="info_box mgtop20">
					<ol class="typeA">
						<li><a href="#necessity">필요성</a></li>
						<li><a href="#term">용어 정리</a></li>
					</ol>
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_on');show('shortcut_off');return true;">접기</a></div>
				</div>
				<div id="shortcut_off" class="info_box mgtop20" style="display:none;">
					<div class="btn_showhide"><a href="javascript:none;" onclick="hide('shortcut_off');show('shortcut_on');return true;">펼치기</a></div>
				</div>
				<h3 class="mgtop20"><a name="necessity"><i class="icon-chevron-right"></i> 필요성</a></h3>
				<p>마크업 개발은 프런트-엔드 페이지으이 기본 골격을 형성하기 때문에 디자인, 브라우저, 스크립트, 성능, 접근성 등과 긴밀한 관계가 있다. <br/>
				즉, 마크업 개발을 잘 해야 모든 브라우저에서 콘텐츠를 손실없이, 빠르고 쉽게 사용자들에게 전달할 수 있다. 이러한 조건을 만족시키시 위해 마크업 
				개발자가 지켜야할 표준을 제시한다.<br/>
				또한, 유지보수에 투자되는 비용을 최소화하기 위해 통일된 코드 작성법을 제시한다. 코드를 최초로 작성한 사람이 끝까지 유지보수 할 확률은 매우 낮다.
				따라서, 최초 개발자가 아닌 사람도 코드를 빠르고 정확하게 이해할 수 있도록 작성하는 것은 코드의 유지보수 비용을 절감하고 업무 효율을 높이는데
				결정적인 역할을 한다.<br/>
				마크업 가이드를 준수하면 프로젝트 멤버 간 코드 공유도 쉬워지고, 일관성 있게 코드를 작성할 수 있다.</p>
				<h3 class="mgtop20"><a name="term"><i class="icon-chevron-right"></i> 용어 정리</a></h3>
				<ol>
					<li>엘리먼트(Element)
						<ol class="typei list_step2">
							<li>HTML 문서를 구성하는 요소를 의미한다.</li>
						</ol>
					</li>
					<li>애트리뷰트(Attribute)
						<ol class="typei list_step2">
							<li>엘리먼트에 부여할 수 있는 특성을 의미한다. 기본값이 설정되어 있으나 애트리뷰트를 선언하여 다른 값으로 설정할 수 있다.</li>
						</ol>
					</li>
					<li>선택자(Selector)
						<ol class="typei list_step2">
							<li>엘리먼트에 CSS 스타일을 적용하기 위한 패턴이다.</li>
							<li>대표적인 선택자는 아래와 같이 4가지 종류이다.</li>
							<li>기타 선택자(하위 선택자, 자식 선택자, 형제 선택자 ...)에 대한 자세한 내용은 CSS Guide에서 자세히 확인할 수 있다.</li>
						</ol>
						<div class="width700 list_step2">
							<table>
								<caption>선택자 안내</caption>
								<colgroup>
									<col width="190"/><col width="140"/><col/>
								</colgroup>
								<thead>
									<tr>
										<th scope="col">이름</th>
										<th scope="col">패턴</th>
										<th scope="col">설명</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="txtcenter">공통 선택자(Universal Selector)</td>
										<td>*</td>
										<td>공통 선택자(Universal Selector)는 *로 표현되는 선택자입니다.<br/>어떤 엘리먼트와도 일치함</td>
									</tr>
									<tr>
										<td class="txtcenter">타입 선택자(Type Selector)</td>
										<td>p, div, span, table ...</td>
										<td>타입 선택자(Type Selector)는 p, div, span, table, td, form...등과 같은 HTML 태그를 선택하는 선택자 입니다.<br/>해당 엘리먼트와 일치함</td>
									</tr>
									<tr>
										<td class="txtcenter">ID 선택자(ID Selector)</td>
										<td>#id</td>
										<td>#이라는 지시어를 사용하면서 element의 아이디값을 지정해주면 됩니다. 즉 특정 element에만 스타일을 지정한다는 의미입니다.<br/>해당 엘리먼트의 id 애트리뷰트 값과 일치함</td>
									</tr>
									<tr>
										<td class="txtcenter">Class 선택자(Class Selector)</td>
										<td>.class</td>
										<td>.이라는 지시어를 사용하면서 element의 클래스값을 지정해주면 됩니다. 특정 element에만 스타일을 지정한다는 의미로 ID 선택자와 차이점이라면 클래스의 경우는 한 문서에 동일한 이름의 클래스가 여러개 위치해도 괜찮으나 아이디는 유일해야 한다는 차이가 있습니다.
										<br/>해당 엘리먼트의 class 애트리뷰트 값과 일치함</td>
									</tr>
								</tbody>
							</table>
						</div>
					</li>
					<li>속성(Property)
						<ol class="typei list_step2">
							<li>엘리먼트에 부여한 CSS 스타일의 특성을 의미한다. 기본값이 설정되어 있으나 속성을 선언하여 다른 값으로 설정할 수 있다.</li>
						</ol>
					</li>
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