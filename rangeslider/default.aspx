<!doctype html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<title>jQuery UI Slider - Range slider</title>
	<link rel="stylesheet" href="style.css" />
	<link rel="stylesheet" href="jquery-ui.css" />
	<script src="jquery-1.10.1.min.js"></script>
	<script src="jquery-ui.js"></script>
	<script>
	$(function() {
		var sMin = 0;
		var sMax = 30000;
		var sAvg = ( sMin + sMax ) / 2;
		$( "#slider-range" ).slider({
			range: true,
			min: sMin,
			max: sMax,
			values: [ 0, 10000 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.values[ 0 ] + "원 ~ " + ui.values[ 1 ] + "원" );
				$( "#amount0" ).val( ui.values[ 0 ] + "원" );
				$( "#amount1" ).val( ui.values[ 1 ] + "원" );
			}
		});
		$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) + "원 ~ " + $( "#slider-range" ).slider( "values", 1 ) + "원" );
		$( "#amount0" ).val( $( "#slider-range" ).slider( "values", 0 ) + "원" );
		$( "#amount1" ).val( $( "#slider-range" ).slider( "values", 1 ) + "원" );
		$( "#min" ).val( sMin + "원" );
		$( "#max" ).val( sMax + "원" );
		$( "#avg" ).val( sAvg + "원" );
	});
	</script>
</head>
<body>

<div class="range-wrap">
	<div class="price-range"></div>
	<input type="text" id="min" class="txtleft"/><input type="text" id="avg" class="txtcenter"/><input type="text" id="max" class="txtright"/>
	<div id="slider-range"></div>
</div>
<div class="range-wrap" style="margin-top:30px;">
	선택한 가격의 범위는 <input type="text" id="amount" class="txtcenter"/>입니다.<br/>
	검색 시작값은 <input type="text" id="amount0" /><br/>
	검색 종료값은 <input type="text" id="amount1" /><br/>
	sMin과 sMax 변수값만 입력되면 평균값은 구해 출력됩니다.<br/>
	values 값은 최초 로딩시 기본 표시값이며, 해당 값이 sMin이나 sMax를 범위를 벗어날 경우 sMin이나 sMax의 범위내 값으로 출력됩니다.
	
</div>
</body>
</html>