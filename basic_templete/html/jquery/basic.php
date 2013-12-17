<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>기본형 &gt; jQuery &gt; 활용소스 템플릿</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/shCoreRDark.css" />
</head>
<body class="easyui-layout">
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/header_footer.php'; ?>
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/menubar.php'; ?>
	
	<div data-options="region:'center',title:'jQuery &gt; 기본형'" style="padding:15px">
		<h2>JQuery 등록</h2>
		<p>
			웹 브라우저에서 외부 내용을 가져올 때, 링크를 걸어주면 됩니다.<br/><br/>
			index.html 이라는 테스트 페이지를 생성하고, 지난번 다운로드 받은 JQuery 스크립트 파일을 index.html 와 같은 폴더에 두고 작업을 진행하였습니다.<br/><br/>
			js 파일을 자바스크립트 파일이라는 것을 뜻합니다.<br/>
			index.html 페이지를 간단하게 만들었습니다.<br/>
			&lt;head&gt; 안 &lt;script&gt; 항목 안에 파일 경로 및 js 파일을 추가해주면 됩니다.<br/><br/>
			아래와 같이 다운로드 받은 경로를 넣어주셔도 되고, 항상 온라인 상에 연결되어 있는 경우 최신 JQuery 홈페이지에서 제공하는 url 주소를 넣어주셔도 됩니다.
		</p>
		<pre class="brush: xml;toolbar: false;first-line: 1;">
			&lt;!DOCTYPE html>
			&lt;html>
			&lt;head>
				&lt;script src="/js경로/jquery-1.10.2.js">&lt;/script>
			&lt;/head>
			&lt;body>
				Contents
			&lt;/body>
			&lt;/html></pre>
		<p>위와 같이 하면 별다른 등록없이 JQuery 라이브러리를 사용할 수 있습니다.</p>
		<div class="mgtopM"></div>
		<h2>ready</h2>
		<p>
			버튼을 누른다거나, 값을 바꿨을 때와 같은 어떤 액션을 사용하지 않고 웹페이지를 불러옴과 동시에 특정 명령 = 함수를 실행할 경우가 있습니다.<br/>
			웹 브라우저에서 화면에서 표시할 객체들 DOM 트리를 생성하고 난 후에 제일 처음 실행되는 코드를 JQuery에서는 아래와 같이 .ready를 써서 사용합니다.<br/>
			아래 내용들은 각각 달라보이지만, 전부다 ready 표현입니다.<br/>
			ready는 보통 html 문서가 끝나는 &lt;/html&gt; 아래 &lt;script&gt;로 작성하는 편입니다.
		</p>
		<pre class="brush: js;toolbar: false;first-line: 1;">
			$(document).ready(function() {
			});</pre>
			<pre class="brush: js;toolbar: false;first-line: 1;">
			$().ready(function() {
			});</pre>
			<pre class="brush: js;toolbar: false;first-line: 1;">
			$(function() {
			});</pre>
			<p>또는 load를 사용하기도 합니다.</p>
			<pre class="brush: js;toolbar: false;first-line: 1;">
			$(window).load(function() {
			});</pre>
		<p>ready 안에 코드를 집어넣으면 함수 및 명령을 넣어 보도록 하겠습니다.</p>
		<div class="mgtopM"></div>
		<h2>샘플</h2>
		<p>
			html 코드에서 ID를 찾으려면 document.getElementById을 써야 했습니다.<br/>
			JQuery 에서는 간단하게 표현할 수 있습니다.<br/><br/>
			document.getElementById("찾으려는ID") -> <span class="tstress2">$("#찾으려는ID")</span> 처럼 표시할 수 있습니다.<br/><br/>
			좀더 보기 쉽게 샘플 코드를 적어보도록 하겠습니다.<br/>
			body안에 div 코드를 2개 생성하였습니다.
		</p>
		<pre class="brush: xml;toolbar: false;first-line: 1;">
			&lt;body>
				&lt;div id="test1">&lt;/div>
				&lt;div id="test2">&lt;/div>
			&lt;/body></pre>
		<p>
			위의 내용을 웹 브라우저에서 실행하면 아무 내용이 없습니다.<br/>
			여기에 test1 값을 직접 넣지 않고, JQuery를 통해 ID를 찾아서 값을 넣어보도록 하겠습니다.<br/><br/>
			<span class="tstress2">$("#</span>  +  <span class="tstress2">test1</span>   + <span class="tstress2">")</span>  이렇게 ID를 찾도록 합니다.<br/>
			그 다음 속성에 해당하는 값을 집어넣으면 되는데, 텍스트 내용만 넣어줄 것이므로 text(할말)을 적어줍니다.<br/><br/>
			아래와 같이 하면 페이지 로드시 hello 라는 내용이 보입니다.
		</p>
		<pre class="brush: xml;toolbar: false;first-line: 1;">
			&lt;script type="text/javascript">
			$(document).ready(function() {
				$("#test1").text("hello");
			});
			&lt;/script></pre>
		<p>
			이 내용을 html 코드 상에서 구현한다면 아래와 같이 됩니다.<br/>
			문장 자체가 길어서 그런지 가독성도 떨어지고 대소문자를 구분해줘야해서 불편하네요 ㅠ.ㅠ
		</p>
		<pre class="brush: js;toolbar: false;first-line: 1;">
			document.getElementById("test1").innerText = "hello";</pre>
		<div class="mgtopM"></div>
	</div>
	
	<script type="text/javascript" src="/inc/js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/inc/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/inc/js/shCore.js"></script>
	<script type="text/javascript" src="/inc/js/shBrushCss.js"></script>
	<script type="text/javascript" src="/inc/js/shBrushJScript.js"></script>
	<script type="text/javascript" src="/inc/js/shBrushPhp.js"></script>
	<script type="text/javascript" src="/inc/js/shBrushXml.js"></script>	
	<script type="text/javascript">
		SyntaxHighlighter.all()
	</script>
</body>
</html>