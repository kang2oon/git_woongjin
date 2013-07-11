<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 CI 의미" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>CI 의미 - 웅진그룹</title>
	<link rel="stylesheet" type="text/css" href="/inc/css/style.css" />
	<script type='text/javascript' src='/inc/js/common.js'></script>
	<script type='text/javascript' src='/inc/js/jquery-1.10.1.min.js'></script>
	<script type="text/javascript">
		$(document).ready(function () {
			$(".tab").click(function() {
				$(".tab ").removeClass("selected");
				$(this).addClass("selected")
			})
		})
	</script>
</head>
<body id="ci_mean">
	<ul id="skipNavi">
		<li><a href="#gnb">주메뉴 바로가기</a></li>
		<li><a href="#snb">보조메뉴 바로가기</a></li>
		<li><a href="#article">본문 바로가기</a></li>
	</ul>

	<div id="wrap">
		<!--#include file="/header.aspx"-->
		<div id="content" class="clearfix">
			<div id="snb">
				<!--#include file="snb.aspx"-->
			</div>
			<div id="article">
				<div id="lnb" class="clearfix">
					<h2 class="fleft"><img src="/images/01_introduce/010301_title.gif" alt="CI 의미"/></h2>
					<ul>
						<li><a href="/"><img src="/images/common/loc_home.gif" alt="HOME"/></a></li>
						<li><a href="/html/01_introduce/wj_group.aspx">웅진소개</a></li>
						<li><a href="/html/01_introduce/ci.aspx">CI</a></li>
						<li><a href="/html/01_introduce/ci.aspx">CI 의미</a></li>
					</ul>
				</div>
				<div class="section">
					<h3>웅진의 CI는<span class="menu1_important">더 큰 세계를 향한</span><br/>
					<span class="menu1_important">창의성, 또또사랑, 지속가능기업</span>을 의미합니다.</h3>
					<div id="ci_introduce" class="clearfix">
						<div class="fleft" style="top:210px;left:27px;">
							<a href="http://www.woongjin.com/download.aspx?filepath=/FILE/CI_JPG.zip&amp;filename=CI_JPG.zip"><img src="/images/01_introduce/btn_jpg.gif" alt="웅진 CI JPG 다운로드"/></a> <a href="http://www.woongjin.com/download.aspx?filepath=/FILE/CI_AI.zip&amp;filename=CI_AI.zip"><img src="/images/01_introduce/btn_ai.gif" alt="웅진 CI AI 다운로드"/></a>
						</div>
						<div id="ci_motive" class="clearfix">
							<div id="detail_motive1" class="fleft" style="display:block;"><img src="/images/01_introduce/roll_banner_1.gif" alt="고객에 대한 사랑 인간애를 통해 고객중심의 긍정적 적극적 서비스를 표현"/></div>
							<div id="detail_motive2" class="fleft" style="display:none;"><img src="/images/01_introduce/roll_banner_2.gif" alt="변화에 대한 사랑 새싹의 성장은 변화로부터 비롯된다는 의미로 변화를 통해 성장을 모색하는 경영정신을 표현"/></div>
							<div id="detail_motive3" class="fleft" style="display:none;"><img src="/images/01_introduce/roll_banner_3.gif" alt="사회에 대한 사랑 손으로 감싼다 포용한다는 의미로 사회에 대한 포용력있는 사랑을 표현"/></div>
							<div id="detail_motive4" class="fleft" style="display:none;"><img src="/images/01_introduce/roll_banner_4.gif" alt="일에 대한 사랑 높은 목표와 의지를 갖고 업무의 핵심을 보며 적극적인 자세로 신바람나게 일하는 사람을 표현"/></div>
							<div id="detail_motive5" class="fleft" style="display:none;"><img src="/images/01_introduce/roll_banner_5.gif" alt="도전에 대한 사랑 과거에 만족하지 않고 항상 도전을 통해 높은 이상(별)을 추구한다는 의미"/></div>
							<div id="detail_motive6" class="fleft" style="display:none;"><img src="/images/01_introduce/roll_banner_6.gif" alt="조직에 대한 사랑 하나의 단결된 조직으로 협동과 공정을 중시하는 기업문화를 표현"/></div>
							<ul>
								<li class="tab selected"><img src="/images/01_introduce/btn_ci_roll_1.gif" alt="고객에 대한 사랑" onclick="show('detail_motive1');hide('detail_motive2');hide('detail_motive3');hide('detail_motive4');hide('detail_motive5');hide('detail_motive6');"/></li>
								<li class="tab"><img src="/images/01_introduce/btn_ci_roll_2.gif" alt="변화에 대한 사랑" onclick="hide('detail_motive1');show('detail_motive2');hide('detail_motive3');hide('detail_motive4');hide('detail_motive5');hide('detail_motive6');"/></li>
								<li class="tab"><img src="/images/01_introduce/btn_ci_roll_3.gif" alt="사회에 대한 사랑" onclick="hide('detail_motive1');hide('detail_motive2');show('detail_motive3');hide('detail_motive4');hide('detail_motive5');hide('detail_motive6');"/></li>
								<li class="tab"><img src="/images/01_introduce/btn_ci_roll_4.gif" alt="일에 대한 사랑" onclick="hide('detail_motive1');hide('detail_motive2');hide('detail_motive3');show('detail_motive4');hide('detail_motive5');hide('detail_motive6');"/></li>
								<li class="tab"><img src="/images/01_introduce/btn_ci_roll_5.gif" alt="도전에 대한 사랑" onclick="hide('detail_motive1');hide('detail_motive2');hide('detail_motive3');hide('detail_motive4');show('detail_motive5');hide('detail_motive6');"/></li>
								<li class="tab"><img src="/images/01_introduce/btn_ci_roll_6.gif" alt="조직에 대한 사랑" onclick="hide('detail_motive1');hide('detail_motive2');hide('detail_motive3');hide('detail_motive4');hide('detail_motive5');show('detail_motive6');"/></li>
							</ul>
						</div>
					</div>
					<h4 class="menu1_h4">창의성</h4>
					<p class="font13 txtstrong">웅진의 창의성을 담고 있습니다.</p>
					<p>독특하고 파격적인 구조는 웅진의 창의적인 아이디어와 역발상을 반영합니다.</p>
					<h4 class="menu1_h4">또또사랑</h4>
					<p class="font13 txtstrong">또또사랑을 바탕으로 한 밝고 따뜻한 기업문화를 표현합니다.</p>
					<p>6개의 심볼 모티브는 또또사랑의 요소가 조화롭게 공존하는 웅진의 기업문화를 나타내고, 자유롭고 생생한 느낌의 터치는<br/>인간 중심, 감성적인 기업 특성을 표현합니다.</p>
					<h4 class="menu1_h4">지속가능기업</h4>
					<p class="font13 txtstrong">100년, 200년이 지나도 계속 발전해가는 지속가능기업이 되겠다는 의지를 나타냅니다.</p>
					<p>옆으로, 위 아래로 이어져 있는 동그라미는 고객, 사회와 영원히 함께하고 싶은 마음을 표현한 것입니다.<br/>
					힘차게 굴러가는 바퀴처럼, 웅진 식구들과 고객이 서로 연결되어 무궁한 사업 발전으로 이어지는 비전을 의미합니다.</p>
				</div>
			</div>
		</div>
		<!--#include file="/footer.aspx"-->
	</div>
</body>
</html>