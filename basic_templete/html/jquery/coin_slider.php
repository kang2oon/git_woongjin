<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Coin Slider &gt; Slider &gt; jQuery &gt; 활용소스 템플릿</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<link rel="stylesheet" type="text/css" href="/inc/css/shCoreRDark.css" />
	<link rel="stylesheet" type="text/css" href="coin-slider/coin-slider-styles.css" />
</head>
<body class="easyui-layout">
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/header_footer.php'; ?>
	<?php include_once $_SERVER["DOCUMENT_ROOT"].'/inc/html/menubar.php'; ?>
	
	<div data-options="region:'center',title:'jQuery &gt; Slider &gt; Coin Slider'" style="padding:10px 0 0">
		<div class="easyui-tabs" data-options="fit:true,border:false,plain:true">
				<div title="Remark" style="padding:15px">
					<h2>Coin Slider</h2>
					<p>
						모자이크와 같은 특별한 이미지 전환 효과를 가지고 있는 이미지 슬라이더 입니다.<br/><br/>
						공식 사이트에 기재된 코인 슬라이더의 특징은 다음과 같습니다.<br/>
						<ol class="mgleftL">
							<li>Free to use under MIT licence</li>
							<li>Unique transition effects</li>
							<li>Flexible configuration</li>
							<li>Navigation box</li>
							<li>Linking images</li>
							<li>Compatible with Android and iPhone</li>
							<li>Valid markup</li>
							<li>Auto slide</li>
							<li>Lightweight (8kb only)</li>
							<li>Fully customizable using CSS</li>
						</ol><br/>
						호환브라우져의 경우 <span class="tstress2">Internet Explorer 6+, Firefox 2+, Safari 2+, Google Chrome 3+, Opera 9+</span> 입니다.
					</p>
					<div class="mgtopM"></div>
					<h2>다운로드 및 지원</h2>
					<div>
						<p>Coin Slider 공식 사이트</p>
						<div class="tbox1 mgtopS">홈페이지 : <a href="http://workshop.rs/projects/coin-slider/" target="_blank">http://workshop.rs/projects/coin-slider/</a></div>
					</div>
				</div>
				
				<div title="Preview" style="padding:10px">
					<div id="games">
						<a href="http://michaelspradlin.com/blog/2011/08/52-ways-you-can-get-your-reluctant-reader-hooked-on-comics/" target="_blank">
							<img src="coin-slider/images/Reinventing-Superman-while-Rebooting-DC-Comics.jpg" alt="Super Man" />
							<span>
								<b>Super Man</b><br />
								My advice is to hit your local comic shop and take advantage of this opportunity. Try a few of these new books on your reluctant reader. Ask them what they think 
								of Superman’s new costume?
							</span>
						</a>
						<a href="http://www.oilpainting-repro.com/catid/-comics-249.html" target="_blank">
							<img src="coin-slider/images/Marvel_NewAvengers1.jpg" alt="Captin America" />
							<span>
								<b>Captain America</b><br />
								The delay for the making of the reproduction is about 3 or 4 weeks but this delay can be extended by the painter if necessary.
							</span>
						</a>
						<a href="http://kaboomshark.com/did-the-arkham-timeline-become-unhinged-by-arkham-unhinged-and-arkham-origins/" target="_blank">
							<img src="coin-slider/images/batman.jpg" alt="Bat Man" />
							<span>
								<b>Bat Man</b><br />
								For many Batman fans, including myself, this October is a time for rejoicing because a new Batman video game will be hitting the shelves called Batman
							</span>
						</a>
						<a href="http://www.beyondhollywood.com/iron-man-2-dvd-and-blu-ray-cover-art-and-specs/" target="_blank">
							<img src="coin-slider/images/ironman.jpg" alt="Iron Man" />
							<span>
								<b>Iron Man</b><br />
								Paramount has released the DVD and Blu-ray cover art and specs for their upcoming release of “Iron Man 2″.
							</span>
						</a>
						<a href="http://www.destroythebrain.com/review/movie-review-the-amazing-spider-man" target="_blank">
							<img src="coin-slider/images/images.jpg" alt="Spider Man" />
							<span>
								<b>Spider Man</b><br />
								While I read comics during my childhood and leaned more towards Marvel than DC, I really didn’t read that much Spider-Man.
							</span>
						</a>
					</div>
				</div>
				
				<div title="Source" style="padding:10px">
					<h2>HOW TO USE</h2>
					<h3>Step1. jQuery, Coin Slider javascript file, CSS file을 다운로드 받은 후 이미지 슬라이더 삽입을 원하는 페이지에 include:</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;script type="text/javascript" src="jquery-1.10.2.js">&lt;/script>
						&lt;script type="text/javascript" src="coin-slider.min.js">&lt;/script>
						&lt;link rel="stylesheet" href="coin-slider-styles.css" type="text/css" /></pre>
					<h3>Step2. 이미지 슬라이더 콘텐츠를 삽입할 div를 생성하고 이미지와 이미지 설명 등을 작성 :</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;div id='coin-slider'>
							&lt;a href="img01_url" target="_blank">
								&lt;img src='img01.jpg' >
								&lt;span>
									Description for img01
								&lt;/span>
							&lt;/a>
							......
							......
							&lt;a href="imgN_url">
								&lt;img src='imgN.jpg' >
								&lt;span>
									Description for imgN
								&lt;/span>
							&lt;/a>
						&lt;/div></pre>
					<h3>Step3. 생성한 div의 아이디(클래스)에 맞춰 Coin Slider 함수 호출:</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;script type="text/javascript">
							$(document).ready(function() {
								$('#coin-slider').coinslider();
							});
						&lt;/script></pre>
					<div class="mgtopM"></div>
					<h2>LIST OF ALL OPTIONS</h2>
					<pre class="brush: js;toolbar: false;first-line: 1;">
						width: 565, // width of slider panel
						height: 290, // height of slider panel
						spw: 7, // squares per width
						sph: 5, // squares per height
						delay: 3000, // delay between images in ms
						sDelay: 30, // delay beetwen squares in ms
						opacity: 0.7, // opacity of title and navigation
						titleSpeed: 500, // speed of title appereance in ms
						effect: '', // random, swirl, rain, straight
						navigation: true, // prev next and buttons
						links : true, // show images as links
						hoverPause: true // pause on hover</pre>
					<h3>옵션 사용 예:</h3>
					<pre class="brush: xml;toolbar: false;first-line: 1;">
						&lt;script type="text/javascript">
							$(document).ready(function() {
								$('#coin-slider').coinslider({ width: 900, navigation: false, delay: 5000 });
							});
						&lt;/script></pre>
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
	<script type="text/javascript" src="coin-slider/coin-slider.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#games').coinslider();
		});
	</script>
</body>
</html>