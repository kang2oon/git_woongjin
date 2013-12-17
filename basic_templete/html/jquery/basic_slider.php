<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Basic Slider &gt; Slider &gt; jQuery &gt; 활용소스 템플릿</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/shCoreRDark.css" />
	<link rel="stylesheet" type="text/css" href="basic-slider/bjqs.css" />
</head>
<body class="easyui-layout">
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/header_footer.php'; ?>
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/menubar.php'; ?>
	
	<div data-options="region:'center',title:'jQuery &gt; Slider &gt; Basic Slider'" style="padding:10px 0 0">
		<div class="easyui-tabs" data-options="fit:true,border:false,plain:true">
				<div title="Remark" style="padding:15px">
					<h2>Basic Slider</h2>
					<p>
						Basic-slider은 쵀대한 간단하고 가볍게 개발되었습니다.<br/>
					</p>
					<div class="mgtopM"></div>
					<h2>다운로드 및 지원</h2>
					<div>
						<p>Basic-Slider 공식 사이트</p>
						<div class="tbox1 mgtopS">홈페이지 : <a href="http://www.basic-slider.com/" target="_blank">http://www.basic-slider.com/</a></div>
					</div>
				</div>
				
				<div title="Preview" style="padding:10px">
					<h2>Example</h2>
					<p>
						Basic-Slider과 Easy UI의 충돌로 이미지 사이즈가 0 로 변하는 버그가 있네요. Easy UI의 코드와 일부 충돌이 있는듯 하여 새창으로 예시를 제공합니다.<br/><br/>
						<div class="tcenter"><div class="btn"><a href="basic-slider/index.html" target="_blank">샘플보기</a></div></div>
					</p>
				</div>
				
				<div title="Source" style="padding:10px">
					<h2>HOW TO USE</h2>
					<h3>Step1. jQuery, Coin Slider javascript file, CSS file을 다운로드 받은 후 이미지 슬라이더 삽입을 원하는 페이지에 include:</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;script type="text/javascript" src="jquery-1.10.2.js">&lt;/script>
						&lt;script src="bjqs.min.js">&lt;/script>
						&lt;link type="text/css" rel="Stylesheet" href="bjqs.css" /></pre>
					<h3>Step2. 이미지 슬라이더 콘텐츠를 삽입할 div를 생성하고 이미지와 이미지 설명 등을 작성 :</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;div id="my-slideshow">
							&lt;ul class="bjqs">
								&lt;li><!-- Any content you like -->&lt;/li>
								&lt;li><!-- Can go inside these slides-->&lt;/li>
							&lt;/ul>
						&lt;/div></pre>
					<h3>Step3. 생성한 div의 아이디(클래스)에 맞춰 Coin Slider 함수 호출:</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;script type="text/javascript">
							jQuery(document).ready(function($) {
							    $('#my-slideshow').bjqs({
							        'height' : 320,
							        'width' : 620,
							        'responsive' : true
							    });
							});
						&lt;/script></pre>
					<div class="mgtopM"></div>
					<h2>LIST OF ALL OPTIONS</h2>
					<pre class="brush: js;toolbar: false;first-line: 1;">
						// width and height need to be provided to enforce consistency
						// if responsive is set to true, these values act as maximum dimensions
						width : 700,
						height : 300,
						
						// animation values
						animtype : 'fade', // accepts 'fade' or 'slide'
						animduration : 450, // how fast the animation are
						animspeed : 4000, // the delay between each slide
						automatic : true, // automatic
						
						// control and marker configuration
						showcontrols : true, // show next and prev controls
						centercontrols : true, // center controls verically
						nexttext : 'Next', // Text for 'next' button (can use HTML)
						prevtext : 'Prev', // Text for 'previous' button (can use HTML)
						showmarkers : true, // Show individual slide markers
						centermarkers : true, // Center markers horizontally
						
						// interaction values
						keyboardnav : true, // enable keyboard navigation
						hoverpause : true, // pause the slider on hover
						
						// presentational options
						usecaptions : true, // show captions for images using the image title tag
						randomstart : true, // start slider at random slide
						responsive : true // enable responsive capabilities (beta)</pre>
					<div class="mgtopM"></div>
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
	<script type="text/javascript" src="basic-slider/js/bjqs-1.3.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#banner-fade').bjqs({
				height      : 320,
				width       : 620,
				responsive  : true
			});
		});
	</script>
</body>
</html>