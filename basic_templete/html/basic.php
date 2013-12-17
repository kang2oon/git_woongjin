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
	
	<div data-options="region:'center',title:'jQuery &gt; 기본형'" style="padding:10px 0 0">
		<div class="easyui-tabs" data-options="fit:true,border:false,plain:true">
				<div title="Remark" style="padding:15px">
					<h2>JQuery 란?</h2>
					<p>
						JQuery를 간단하게 말하면 JavaScript Library 라고 보면 됩니다.<br/>
						JavaScript를 좀 더 쉽게 사용하도록 만들어졌습니다.<br/><br/>
						DOM 형식의 JavaScript 코드는 복잡하고 긴 편입니다. 그에 반해 JQuery는 좀더 직관적으로 보이게 하도록 짧고 단순하게 되어 있습니다.<br/><br/>
						예를 들어 html 문서 내에 ID를 호출 하는 경우, JavaScript 는 document.getElementById('ID') 라고 써야 합니다.<br/>
						반면 JQuery 는 $('#ID') 로 표시할 수 있습니다.<br/><br/>
						위의 예제만 보아도 JQuery는 JavaScript 보다 알기 쉽고 간단하게 사용할 수 있습니다.<br/><br/>
						요즘에 Html5 에서는 Name을 잘 쓰지 않았지만, 예전에는 ID 와 함께 쓰인적이 있습니다.<br/>
						이들을 호출할 때는 각각 document.getElementById 와 document.getElement<span class="tstress1">s</span>ByName 라고 쓰입니다.<br/><br/>
						근데 문장이 길다보니 헷갈리는게 Id 앞에 Element 에는 s가 없는데 Name 앞에 Element 에는 s가 붙어 있습니다.<br/>
						이렇게 문장이 길다보니 눈에 잘 안 띄는 부분에서 오타가 나거나 보기 어려웠습니다.<br/><br/>
						그러한 이유로 JQuery 가 오래되지 않았음에도 불구하고 급속도로 퍼져서 웹 개발자라고 한다면 많이 사용하고 있습니다.
					</p>
					<div class="mgtopM"></div>
					<h2>JQuery 특징</h2>
					<p>
						<span class="tstorng">1) 가벼움</span><br/>
						웹에서 가볍다고 하면 용량과도 관계 있습니다.<br/>
						아무리 좋은 라이브러리하고 하더라도 용량이 크면 다운로드 받고 불러오는 시간 때문에 무겁다는 느낌을 가져옵니다.<br/>
						좋은 기능을 가지면서도 용량이 적은 수록 가볍고 좋다고 느껴집니다.<br/><br/>
						JQuery의 현재 최신 버전인 jquery-1.10.2.min.js 경우 90.9KB 정도의 파일 크기를 가지고 있고 웹에서 동작할 때는 32KB 정도 사용한다고 합니다.<br/><br/>
						<span class="tstorng">2) CSS 셀렉터</span><br/>
						기존에 CSS는 스타일 파일(확장자 .css)를 통해서 구현이 가능했었습니다.<br/>
						웹 화면에서 스크립트 명령으로 JavaScript를 사용가능했지만, 불편한 점이 많아서 사용하기 힘들었습니다.<br/>
						JQuery에서는 CSS를 간단한 코드로 변경가능하도록 적용해서 훨씬 쉽게 사용할 수 있도록 하였습니다.<br/><br/>
						<span class="tstorng">3) 크로스 브라우저</span><br/>
						최근에 웹 브라우저는 Internet Explorer, Chrome, Firefox, Safari 등.. 다양하게 사용되고 있습니다.<br/>
						웹 개발자가 아니더라도 인터넷 컨텐츠를 사용하려면 웹 브라우저를 사용하게 됩니다.<br/>
						주변 사람들을 보아도 각각 선호하는 브라우저가 달라서 JavaScript 로 만든다면, 어떤 브라우저에서는 동작하고 다른 브라우저에서는 동작하지 않는 문제가 있습니다.<br/>
						그런 문제를 JQuery 에서는 간단하게 지원합니다. JQuery 코드로 이벤트를 구현하면 브라우저에 상관없이 지원하게 됩니다.
					</p>
				</div>
				<div title="Preview" style="padding:10px">
					
				</div>
				<div title="Source" style="padding:10px">
					<pre class="brush: css;toolbar: false;first-line: 1;">
						/* Common */
						html, body, textarea{font-family:'Nanum Gothic';font-size:12px;margin:0;padding:0;line-height:160%;}
						div{position:relative;}
						caption{display:none;}
						a{color:inherit;text-decoration:none;}
						a:hover{text-decoration:underline;}
						
						.fleft {float: left;}
						.fright{float:right;}
						.tborder{border:1px solid #f06;}
						
						h1{font-size:23px;color:#fff;}
						.footer{font-size:11px;color:#999;}</pre>
				</div>
			</div>
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