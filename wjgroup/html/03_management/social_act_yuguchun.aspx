<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta name="description" content="웅진그룹 나눔스토리" />
	<meta name="keywords" content="HTML,CSS,XML,JavaScript, ASPX" />
	<meta name="author" content="kang2oon" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>나눔스토리 - 웅진그룹</title>
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
<body id="social_act_yuguchun">
	<ul id="skipNavi">
		<li><a href="#gnb">주메뉴 바로가기</a></li>
		<li><a href="#content">본문 바로가기</a></li>			
	</ul>

	<div id="wrap">
		<!--#include file="/header.aspx"-->
		<div id="content" class="clearfix">
			<div id="snb">
				<!--#include file="snb.aspx"-->
			</div>
			<div id="article">
				<div id="lnb" class="clearfix">
					<h2 class="fleft"><img src="/images/03_management/030202_title.gif" alt="사회공헌"/></h2>
					<ul>
						<li><a href="/"><img src="/images/common/loc_home.gif" alt="HOME"/></a></li>
						<li><a href="/html/03_management/system_vision.aspx">지속가능경영</a></li>
						<li><a href="/html/03_management/social_vision.aspx">사회공헌</a></li>
						<li><a href="/html/03_management/social_vision.aspx">사회공헌 개요</a></li>
					</ul>
				</div>
				<div class="section">
					<ul class="tab_social clearfix">
						<li><a href="/html/03_management/social_vision.aspx"><img src="/images/03_management/tab_030201.gif" alt="사회공헌 개요"/></a></li>
						<li class="selected"><a href="/html/03_management/social_act_yuguchun.aspx"><img src="/images/03_management/tab_030203.gif" alt="나눔 스토리"/></a></li>
					</ul>
					<h4 class="menu3_h4">환경사랑</h4>
					<h5>유구천 가꾸기</h5>
					<p class="mgtop5">유구천 가꾸기는 1사 1하천 운동으로 환경부, 공주시, 환경재단과 웅진그룹이 협약하여 충남 공주시 유구천을 깨끗한 하천으로 가꾸는 사업입니다. 2006년부터 2010년까지 5개년 계획을
					통해 유구천은 3급수에서 1급수 하천으로 변모하였습니다. 웅진은 유구천 가꾸기 사업을 더 확대하여 청정하천으로 만들기 위하여 노력하겠습니다.</p>
					<div id="yuguchun">
						<ul>
							<li class="tab selected"><img src="/images/03_management/tab_yuguchun1.png" alt="자연형하천공원" onclick="show('map1');hide('map2');hide('map3');"/></li>
							<li class="tab"><img src="/images/03_management/tab_yuguchun2.png" alt="수질정화식물지점" onclick="hide('map1');show('map2');hide('map3');"/></li>
							<li class="tab"><img src="/images/03_management/tab_yuguchun3.png" alt="친환경쌀 재배" onclick="hide('map1');hide('map2');show('map3');"/></li>
						</ul>
						
						<div id="map1" style="display:block;">
							<img src="/images/03_management/bg_yuguchun_map1.gif" alt="충남 공주시 유구천의 자연형 하천공원 안내 지도 입니다."/>
							<div class="yg_contnent">
								<h6>자연형 하천공원 - 흠미보</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu111.gif" alt="공사가 이루어지기 전에 하천의 상류와 하류가 둑으로 막혀있어서 물고기들이 상류로 이동할 수 없는 흠미보의 사진"/>
										<p class="yg_caption">과거 공사 전 흠미보의 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu112.gif" alt="공사 후에 물고기들이 위아래로 이동할 수 있는 어도와 돌망태를 설치한 흠미보의 사진"/>
										<p class="yg_caption">공사 후, 물고기들이 위아래로 이동할 수 있는 어도와 돌망태를 설치한 모습</p>
									</div>
								</div>
								<h6 class="mgtop15">자연형 하천공원 - 용곳보</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu121.gif" alt="공사가 이루어지기 전에 하천의 상류와 하류가 둑으로 막혀있어서 물고기들이 상류로 이동할 수 없는 용곳보의 사진"/>
										<p class="yg_caption">과거 공사 전 용곳보의 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu122.gif" alt="공사 후에 유구천 물고기들이 돌망태에 숨어서 알을 낳고 쉴 수 있는 쉼터가 조성된 용곳보의 사진"/>
										<p class="yg_caption">공사 후, 유구천 물고기들이 돌망태에 숨어서 알을 낳고 쉴 수<br/>있는 쉼터가 조성된 모습</p>
									</div>
								</div>
								<h6 class="mgtop15">자연형 하천공원 - 후영이보</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu131.gif" alt="자연석으로 설치된 자연형 어도를 따라 물고기가 노니는 후영이보의 사진"/>
										<p class="yg_caption">자연형 어도를 따라 물고기가 노니는<br/>후영이보</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu132.gif" alt="어도 설치를 통해 아름답게 변화한 후영이보의 사진"/>
										<p class="yg_caption">어도 설치를 통해 아름답게 변화한 모습</p>
									</div>
								</div>
								<h6 class="mgtop15">자연형 하천공원 - 주민공원</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu141.gif" alt="습지와 실개천 조성, 생태 블록 설치, 하천을 따른 자연석 설치 등의 노력을 통해 자연형 공원으로 조성된 주민공원의 사진"/>
										<p class="yg_caption">자연형 공원으로 변화된 모습<br/>(습지와 실개천 조성, 생태 블록 설치, 하천을 따른 자연석 설치 등)</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu142.gif" alt="유구의 주민들이 유구천을 따라 쉴 수 있도록 조성된 산책로의 사진"/>
										<p class="yg_caption">유구 주민들이 유구천을 따라 쉴 수 있도록 조성된 산책로</p>
									</div>
								</div>
								<h6 class="mgtop15">자연형 하천공원 - 구레들보</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu151.gif" alt="물고기가 자유롭게 이동할 수 있도록 어도와 돌망태가 설치된 구레들보의 사진"/>
										<p class="yg_caption">물고기가 자유롭게 이동할 수 있도록<br/>어도와 돌망태가 설치된 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu152.gif" alt="유구천과의 자연스러운 호환이 가능하도록 재조성된 구레들보의 사진"/>
										<p class="yg_caption">유구천 호환이 가능하도록 다시 만든 구레들보</p>
									</div>
								</div>
							</div>
						</div>
						
						<div id="map2" style="display:none;">
							<img src="/images/03_management/bg_yuguchun_map2.gif" alt="충남 공주시 유구천의 수질정화식물 지점 안내 지도 입니다."/>
							<div class="yg_contnent">
								<h6>수질정화식물지점 - 신영리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu211.gif" alt="식재지가 조성된 신영리의 사진"/>
										<p class="yg_caption">신영리 식재지가 조성된 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu212.gif" alt="식재지에 설치된 관찰데크에서 정기적으로 환경교육을 받고 있는 유구 어린이들의 사진"/>
										<p class="yg_caption">신영리 관찰데크에서 정기적으로<br/>환경교육을 받고 있는 유구 어린이들의 모습</p>
									</div>
								</div>
								<h6 class="mgtop15">수질정화식물지점 - 구계리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu221.gif" alt="계단형으로 조성된 구계리 식재지의 사진"/>
										<p class="yg_caption">계단형으로 조성된 구계리 식재지</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu222.gif" alt="식재지가 조성된 후에 꽃창포가 가득한 구계리 식재지의 봄 풍경 사진"/>
										<p class="yg_caption">꽃창포가 가득한 구계리 시재지의 봄 풍경</p>
									</div>
								</div>
								<h6 class="mgtop15">수질정화식물지점 - 신달리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu231.gif" alt="계단식으로 조성되어 계단을 따라 물이 정화되고 있는 신달리 식재지의 사진"/>
										<p class="yg_caption">계단식으로 조성되어 계단을 따라<br/>물이 정화되고 있는 신달리의 식재지</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu232.gif" alt="식재지가 조성된 후에 여름을 맞이하여 창포와 꽃창포가 무성해진 신달리 식재지의 사진"/>
										<p class="yg_caption">여름이 되자 창포, 꽃창포가 무성해진 신달리 식재지</p>
									</div>
								</div>
								<h6 class="mgtop15">수질정화식물지점 - 명곡리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu241.gif" alt="식재지 조성 전의 명곡리 하류 사진"/>
										<p class="yg_caption">식재지 조성 전의 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu242.gif" alt="명곡리 마을 하류에 조성된 식재지에서 생활하수가 정화되고 있는 사진"/>
										<p class="yg_caption">생활하수를 정화하는 명곡리 마을 하류 식재지</p>
									</div>
								</div>
								<h6 class="mgtop15">수질정화식물지점 - 덕곡리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu251.gif" alt="식재지 조성 전의 덕곡리 사진"/>
										<p class="yg_caption">식재지 조성 전의 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu252.gif" alt="식재지가 조성된 후에 꽃창포가 만개한 덕곡리 식재지의 사진"/>
										<p class="yg_caption">꽃창포가 만개한 덕곡리 식재지</p>
									</div>
								</div>
								<h6 class="mgtop15">수질정화식물지점 - 문금리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu261.gif" alt="식재지 조성 전의 문금리 사진"/>
										<p class="yg_caption">식재지 조성 전의 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu262.gif" alt="식재지가 조성된 후에 꽃창포와 연꽃과 부들이 만개한 문금리 식재지의 사진"/>
										<p class="yg_caption">꽃창포, 연꽃, 부들이 만개한 문금리 식재지</p>
									</div>
								</div>
							</div>
						</div>
						
						<div id="map3" style="display:none;">
							<img src="/images/03_management/bg_yuguchun_map3.gif" alt="충남 공주시 유구천의 친환경쌀 재배 지점 안내 지도 입니다."/>
							<div class="yg_contnent">
								<h6>친횐경쌀 재배 - 만천리/명곡리/추계리/연종리/문금리</h6>
								<div class="clearfix mgtop5">
									<div class="fleft"><img src="/images/03_management/img_yugu311.gif" alt="우렁이농법으로 재배되고 있는 유구미의 사진"/>
										<p class="yg_caption">우렁이 농법으로 재배되고 있는 유구미</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu312.gif" alt="웅진 식구들과 함께 모내기하는 사진"/>
										<p class="yg_caption">웅진 식구들과 함께 한 모내기</p>
									</div>
								</div>
								<div class="clearfix mgtop15">
									<div class="fleft"><img src="/images/03_management/img_yugu313.gif" alt="유구의 논길을 다니다 보면 만날 수 있는 우렁이알의 사진"/>
										<p class="yg_caption">유구의 논길을 다니다 보면 만날 수 있는 우러이알</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu314.gif" alt="벼를 제외한 잡풀을 먹고 자라는 우렁이의 사진"/>
										<p class="yg_caption">벼를 제외한 잡풀을 먹고 자라는 우렁이,<br/>제초제가 필요없는 친환경 우렁이 농법</p>
									</div>
								</div>
								<div class="clearfix mgtop15">
									<div class="fleft"><img src="/images/03_management/img_yugu315.gif" alt="땀 흘리며 지은 한 해의 결실 유구미를 웅진식구들과 함께 수확하는 사진"/>
										<p class="yg_caption">땀 흘리며 지은 한 해의 결실<br/>&lt;유구미&gt;를 웅진 식구들과 함께 수확하는 모습</p>
									</div>
									<div class="fright"><img src="/images/03_management/img_yugu316.gif" alt="유구미를 사서 이웃들에게 기부한 나눔행사의 사진"/>
										<p class="yg_caption">유구미를 사서 이웃들에게 기부한 나눔행사,<br/>&lt;사랑은 뜨겁게 지구는 차갑게&gt;의 실천</p>
									</div>
								</div>
							</div>
						</div> 

					</div>
					<h5 class="mgtop10">깨끗한 환경 가꾸기</h5>
					<p class="mgtop5">웅진은 숲, 하천, 바다 등 우리나라 환경을 개선하기 위하여 웅진케미칼의 서울숲과 광평천 가꾸기, 웅진폴리실리콘의 상주 남산공원 정화활동, 극동건설의 청계천 정화활동,
					렉스필드의 앵자봉 및 용담천 정화활동, 웅진씽크빅과 북센의 파주 출판단지 환경 정화활동 등 다양한 활동을 하고 있습니다.</p>
					<div class="bg_yuguchun">
						<h5>따뜻한 자원 재활용</h5>
						<p class="mgtop5">자원을 다시  활용해 이웃들과 함께 나누기 위하여 그룹 전체가 매년 또또사랑벼룩시장을 개최하며 계열사별로 아름다운 가게와 연계한 물품 재활용 활동을 합니다.
						이밖에 웅진 임직원을 대상으로 폐카트리지 수거 캠페인을 수익금으로 이웃사랑을 실천하고 고객을 대상으로 친환경 장바구니를 배포하는 등 자원 재활용을 위한 노력을 합니다.</p>
					</div>
					<h5>푸드뱅크 나눔활동</h5>
					<p class="mgtop5">웅진식품은 '푸드뱅크'에 동참하여 결식아동, 독거노인, 장애인, 무료급식소, 노숙자쉼터 등 소외계층에게 식품지원 복지서비스를 전달하는 식품 나눔 제도를 하고 있습니다.</p>
					<h4 class="menu3_h4">교육사랑</h4>
					<h5>다문화가정 자녀무료 한글교육서비스</h5>
					<p class="mgtop5">웅진씽크빅은 경기도와 협약을 맺고 경기도 지역의 저소득 다문화가정의 자녀에게 한글무료교육을 실시할 뿐 아니라 아이들에게 도서 및 문구 선물세트를 선물하고
					웅진씽크빅아트홀 공연 공연 어린이난타 뮤지컬 무료 관람 제공 등의 활동을 하고 있습니다.</p>
					<h5 class="mgtop10">도서 기증기부 '웅진 사랑의 북뱅크'</h5>
					<p class="mgtop5">웅진씽크빅의 도서 기증 시스템 '웅진 사랑의 북뱅크'를 통해 회사, 임직원, 고객들의 도서를 사회복지단체, 무료 공부방, 산간벽지 학교 등에 기증하여 문화적 소외계층이
					맘껏 책을 읽을 수 있도록 지원하고 있습니다.</p>
					<h4 class="menu3_h4">이웃사랑</h4>
					<h5>임직원 봉사활동</h5>
					<p class="mgtop5">웅진 임직원들은 연간 16시간의 의무 봉상 활동 시간을 준수하고 있으며, 배다니마을, 라파엘의 집, 부스러기 사랑나눔회, 무료급식, 성우보육원, 금천구 노인종합 복지관
					등을 방문하여 다양한 봉사활동을 펼치고 있습니다.</p>
					<h5 class="mgtop10">따뜻한 송년회</h5>
					<p class="mgtop5">웅진은 매년 우리 이웃들이 추운 겨울을 따뜻하게 보내기 위한 지원활동을 합니다. 저소득가정을 위한 사랑의 교복지원전달식, 이주민 가정을 위한 뜨개질 목도리 나눔,
					겨릭아동돕기 캠페인, 김치와 케잌 나누기 등을 통해 우리 이웃들에게 따뜻한 사랑을 나누고 있습니다.</p>
					<h5 class="mgtop10">행복한 홈스쿨</h5>
					<p class="mgtop5">2007년 캄보디아에 웅진씽크빅 행복한 홈스쿨 1호를 개소하였고, 2008년에는 베트남에 2호를 개소하여 해외 저소득층 아이들에게 교육기회를 제공하고 있습니다.</p>
					<table cellspacing="0" cellpadding="0" summary="설립지역별로 수혜대상 및 주요 프로그램에 대해 안내합니다." class="table_social">
						<caption>행복한 홈스쿨</caption>
						<colgroup>
							<col width="230"/>
							<col width="160" />
							<col />
						</colgroup>
						<thead>
						<tr>
							<th scope="col">설립지역</th>
							<th scope="col">수혜대상</th>
							<th scope="col">주요 프로그램</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>캄보디아 프놈펜 덤록마을</td>
							<td>190여명 인근 빈민아동</td>
							<td>한국어, 캄보디아어, 영어, 수학, 과학 등</td>
						</tr>
						<tr>
							<td>베트남 하노이시 빙폭성 탐즈엉군 협탁면</td>
							<td>320여명 인근 빈민아동</td>
							<td>학습교실, 컴퓨터 교실, 문예활동 및 독서실</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!--#include file="/footer.aspx"-->
	</div>
</body>
</html>